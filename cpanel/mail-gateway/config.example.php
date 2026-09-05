<?php
return [
    'gateway_secret' => 'CAMBIAR_POR_UN_SECRETO_LARGO_Y_ALEATORIO',
    'from_email' => 'formularios@tudominio.com',
    'from_name' => 'Arandu Go',
    'smtp_local' => [
        'host' => 'mail.tudominio.com',
        'port' => 465,
        'security' => 'ssl',
        'username' => 'formularios@tudominio.com',
        'password' => 'CONTRASENA_DEL_CORREO',
    ],
    'gmail' => [
        'host' => 'smtp.gmail.com',
        'port' => 587,
        'security' => 'tls',
        'username' => 'cuenta@gmail.com',
        'password' => 'CONTRASENA_DE_APLICACION_DE_16_CARACTERES',
    ],
];
