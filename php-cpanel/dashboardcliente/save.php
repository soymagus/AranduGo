<?php
require dirname(__DIR__).'/bootstrap.php';
use AranduGo\Auth;use AranduGo\Csrf;use AranduGo\SiteRepository;use AranduGo\Support;
Auth::requireLogin();Csrf::verify();$body=json_decode(file_get_contents('php://input'),true);$data=$body['data']??null;if(!is_array($data))Support::json(['ok'=>false,'error'=>'Datos inválidos'],422);if(count($data['gallery']??[])>24)Support::json(['ok'=>false,'error'=>'La galería admite hasta 24 imágenes'],422);SiteRepository::save($data,!empty($body['publish']));Support::json(['ok'=>true]);
