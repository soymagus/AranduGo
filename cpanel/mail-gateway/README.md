# Gateway de correo para cPanel

Este componente permite que Arandu Go entregue formularios mediante PHP mail, SMTP local o Gmail sin publicar credenciales en el panel del cliente.

1. Suba esta carpeta fuera de `public_html` cuando cPanel permita definir un subdominio con document root propio.
2. Ejecute `composer install --no-dev --optimize-autoloader`.
3. Copie `config.example.php` como `config.php`, complete las credenciales y aplique permisos 600.
4. Publique únicamente `mail-gateway.php` por HTTPS.
5. Configure en Arandu Go `CONTACT_MAIL_GATEWAY_URL` y `CONTACT_MAIL_GATEWAY_SECRET`.

No confirme `config.php` en Git ni reutilice la contraseña normal de Gmail: utilice una contraseña de aplicación.
