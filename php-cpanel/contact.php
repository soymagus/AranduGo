<?php
require __DIR__.'/bootstrap.php';
use AranduGo\Database; use AranduGo\Mailer; use AranduGo\SiteRepository; use AranduGo\Support;
if($_SERVER['REQUEST_METHOD']!=='POST')Support::redirect('');
if(!empty($_POST['website']))Support::redirect('');
$d=SiteRepository::published();$name=trim($_POST['name']??'');$email=filter_var($_POST['email']??'',FILTER_VALIDATE_EMAIL);$message=trim($_POST['message']??'');$phone=trim($_POST['phone']??'');
if($name===''||!$email||mb_strlen($message)<5)exit('Datos inválidos.');
if(($d['contactForm']['captchaType']??'none')==='integrated'&&empty($_POST['human']))exit('Verificación requerida.');
$recipient=filter_var($d['contactForm']['recipientEmail']??$d['business']['email']??'',FILTER_VALIDATE_EMAIL);$safe=fn($v)=>htmlspecialchars((string)$v,ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8');$delivered=false;
if($recipient)$delivered=Mailer::send($recipient,$email,$name,'Nueva consulta de '.$name,'<h2>Nueva consulta</h2><p><b>Nombre:</b> '.$safe($name).'</p><p><b>Correo:</b> '.$safe($email).'</p><p><b>Teléfono:</b> '.$safe($phone).'</p><p>'.nl2br($safe($message)).'</p>',"Nombre: $name\nCorreo: $email\nTeléfono: $phone\n\n$message");
$pdo=Database::connection();$table=Database::table('contact_messages');$pdo->exec("DELETE FROM {$table} WHERE created_at < DATE_SUB(NOW(), INTERVAL 180 DAY)");$stmt=$pdo->prepare("INSERT INTO {$table}(name,email,phone,message,timezone,delivered) VALUES(?,?,?,?,?,?)");$stmt->execute([$name,$email,$phone,!empty($d['contactForm']['keepMessageCopy'])?$message:null,$d['contactForm']['timezone']??'UTC',$delivered?1:0]);
header('Location: '.Support::url('?enviado=1#contacto'));exit;
