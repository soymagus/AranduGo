<?php
require dirname(__DIR__).'/bootstrap.php';
use AranduGo\Auth;use AranduGo\Database;use AranduGo\Support;
Auth::requireLogin();$pdo=Database::connection();$table=Database::table('contact_messages');$pdo->exec("DELETE FROM {$table} WHERE created_at < DATE_SUB(NOW(), INTERVAL 180 DAY)");$rows=$pdo->query("SELECT id,name,email,phone,timezone,delivered,created_at FROM {$table} ORDER BY created_at DESC LIMIT 2000")->fetchAll();
if(($_GET['format']??'')==='txt'){header('Content-Type: text/plain; charset=utf-8');header('Content-Disposition: attachment; filename="arandu-go-formularios.txt"');foreach($rows as $row)echo implode("\t",[$row['created_at'],$row['timezone'],$row['name'],$row['email'],$row['phone'],$row['delivered']?'ENTREGADO':'REGISTRADO'])."\n";exit;}Support::json(['ok'=>true,'rows'=>$rows]);
