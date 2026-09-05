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

- [ ] Editor visual completo de teléfonos múltiples y sus selectores.
- [ ] Drag and drop de módulos y menú con submenús.
- [ ] Editor visual de información rápida por filas, columnas y posiciones.
- [ ] Editor visual completo de servicios/productos.
- [ ] Galería visual paginada de hasta 24 imágenes, carga y CTA.
- [ ] Editor WYSIWYG y multimedia para las dos secciones libres.
- [ ] Esquemas globales y colores por sección.
- [ ] Configurador completo de header, footer y logos.
- [ ] Redes sociales estándar, URLGO.me y red personalizada.
- [ ] Google reCAPTCHA con claves protegidas.
- [ ] Registro descargable del formulario.
- [ ] Recuperación de contraseña por correo y gestión de roles.
- [ ] Importación JSON/CSV/TXT y respaldo ZIP completo.
- [ ] Páginas legales con header/footer idénticos a la portada.
- [ ] Pruebas de equivalencia en escritorio y smartphone.
- [ ] ZIP instalable final y manual definitivo.
