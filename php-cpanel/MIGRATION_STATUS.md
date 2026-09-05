# Control de equivalencia funcional

La aplicación TypeScript/Workers continúa siendo la referencia funcional. La edición PHP no se declarará estable hasta completar y validar esta matriz.

## Núcleo completado en el primer hito

- [x] Paquete PHP independiente, sin modificar el runtime existente.
- [x] Wizard de requisitos del servidor.
- [x] Conexión a una base MySQL existente.
- [x] Creación opcional por API UAPI de cPanel.
- [x] Creación automática de tablas, índices y datos iniciales.
- [x] Creación del primer administrador con `password_hash()`.
- [x] Login, sesiones seguras, CSRF, cierre de sesión y limitación de intentos.
- [x] Persistencia separada de borrador y contenido publicado.
- [x] PHP mail, Sendmail y SMTP propio mediante PHPMailer.
- [x] Registro del formulario y rotación de 180 días.
- [x] Carga local de imágenes con validación de MIME y bloqueo de PHP.
- [x] Renderer inicial de módulos públicos y diseño responsive.

## En portabilidad y validación

- [x] Editor visual de teléfonos múltiples y sus selectores.
- [x] Drag and drop de módulos; orden y submenús del menú mediante controles visuales.
- [x] Editor visual de información rápida por filas, columnas y posiciones.
- [x] Editor visual completo de servicios/productos.
- [ ] Galería visual de hasta 24 imágenes, carga y CTA completada; paginación pública pendiente.
- [ ] Editor WYSIWYG y multimedia para las dos secciones libres.
- [ ] Esquemas globales y colores por sección.
- [ ] Configurador completo de header, footer y logos.
- [ ] Redes sociales estándar, URLGO.me y red personalizada.
- [x] Google reCAPTCHA v2 con clave secreta protegida.
- [x] Registro descargable del formulario.
- [ ] Recuperación de contraseña por correo y gestión de roles.
- [ ] Importación/exportación JSON y respaldo ZIP completados; CSV/TXT pendiente.
- [ ] Páginas legales con header/footer idénticos a la portada.
- [ ] Pruebas de equivalencia en escritorio y smartphone.
- [ ] ZIP instalable final y manual definitivo.
