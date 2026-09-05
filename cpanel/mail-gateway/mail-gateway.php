<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$configFile = __DIR__ . '/config.php';
$autoloadFile = __DIR__ . '/vendor/autoload.php';
if (!is_file($configFile) || !is_file($autoloadFile)) {
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'gateway_not_configured']);
    exit;
}

$config = require $configFile;
$authorization = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$expected = 'Bearer ' . ($config['gateway_secret'] ?? '');
if (!$config['gateway_secret'] || !hash_equals($expected, $authorization)) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'error' => 'unauthorized']);
    exit;
}

$payload = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_json']);
    exit;
}

$transport = (string) ($payload['transport'] ?? 'phpmail');
$recipient = filter_var($payload['recipient'] ?? '', FILTER_VALIDATE_EMAIL);
$replyTo = filter_var($payload['email'] ?? '', FILTER_VALIDATE_EMAIL);
$name = trim((string) ($payload['name'] ?? ''));
$business = trim((string) ($payload['business'] ?? 'Comercio'));
$phone = trim((string) ($payload['phone'] ?? ''));
$message = trim((string) ($payload['message'] ?? ''));

if (!$recipient || !$replyTo || $name === '' || mb_strlen($message) < 5 || !in_array($transport, ['phpmail', 'smtp_local', 'gmail'], true)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid_payload']);
    exit;
}

require $autoloadFile;

try {
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    if ($transport === 'phpmail') {
        $mail->isMail();
    } else {
        $profile = $config[$transport] ?? null;
        if (!is_array($profile)) {
            throw new RuntimeException('Perfil de correo no configurado');
        }
        $mail->isSMTP();
        $mail->Host = (string) $profile['host'];
        $mail->Port = (int) $profile['port'];
        $mail->SMTPAuth = true;
        $mail->Username = (string) $profile['username'];
        $mail->Password = (string) $profile['password'];
        $mail->SMTPSecure = $profile['security'] === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    }
    $mail->setFrom((string) $config['from_email'], (string) $config['from_name']);
    $mail->addAddress($recipient);
    $mail->addReplyTo($replyTo, $name);
    $mail->isHTML(true);
    $mail->Subject = 'Nueva consulta de ' . $name;
    $safe = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $mail->Body = '<h2>Nueva consulta desde ' . $safe($business) . '</h2>'
        . '<p><strong>Nombre:</strong> ' . $safe($name) . '</p>'
        . '<p><strong>Correo:</strong> ' . $safe((string) $replyTo) . '</p>'
        . '<p><strong>Teléfono:</strong> ' . $safe($phone) . '</p>'
        . '<p><strong>Mensaje:</strong></p><p>' . nl2br($safe($message)) . '</p>';
    $mail->AltBody = "Nueva consulta desde {$business}\nNombre: {$name}\nCorreo: {$replyTo}\nTeléfono: {$phone}\n\n{$message}";
    $mail->send();
    echo json_encode(['ok' => true]);
} catch (Throwable $error) {
    error_log('Arandu Go mail gateway: ' . $error->getMessage());
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'delivery_failed']);
}
