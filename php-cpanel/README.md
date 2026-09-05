# Arandu Go PHP para cPanel

Edición independiente de Arandu Go, diseñada para PHP 8.1+, MySQL/MariaDB y almacenamiento local. No modifica ni reemplaza la aplicación original basada en Workers.

## Instalación preliminar

1. Subir el contenido de esta carpeta al document root del dominio o subdominio.
2. Ejecutar `composer install --no-dev --optimize-autoloader`.
3. Verificar permisos de escritura en `config`, `storage` y `uploads` durante la instalación.
4. Abrir `/install/` y completar el asistente.
5. Al finalizar, ingresar en `/dashboardcliente/`.

El wizard puede conectarse a una base previamente creada o intentar crear base, usuario y permisos mediante la API UAPI de cPanel. El token de cPanel se utiliza solamente durante el proceso y no se guarda.

## Correo

La configuración protegida admite:

- PHP `mail()`.
- Sendmail local.
- SMTP propio, incluido el SMTP de una cuenta del dominio o Gmail con contraseña de aplicación.

## Estado

Este directorio contiene el primer hito de portabilidad: instalador, esquema, autenticación, configuración, persistencia JSON, entrega de formularios, carga segura de imágenes y renderer público inicial. Consulte `MIGRATION_STATUS.md` antes de considerarlo una versión final de producción.
