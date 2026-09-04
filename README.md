# Arandu Go

Plataforma de micro-sitios modulares para negocios locales. Incluye una página pública responsive y un Panel de control privado en `/dashboardcliente/`.

## Funciones actuales

- Contenido comercial editable y publicación de borradores.
- Módulos activables y reordenables.
- Header configurable con inicial o logo, nombre opcional, altura de hasta 250 px y control de proporciones.
- Esquemas globales y colores independientes por sección.
- Galería de hasta 24 imágenes con paginación, texto y CTA.
- Dos secciones libres con editor enriquecido, imágenes, videos de YouTube y acceso desde el menú.
- Carga de imágenes organizada por cliente y tipo de contenido.
- Mapa de Google, redes sociales y formulario de contacto con distintos desafíos CAPTCHA.
- Control de indexación y páginas de Términos de Servicio y Política de Privacidad.
- Importación y exportación de contenido; respaldo ZIP con archivos e imágenes.

## Tecnología

Aplicación TypeScript/React basada en Vinext, con persistencia D1 y almacenamiento R2. El despliegue de referencia utiliza Cloudflare Workers mediante ChatGPT Sites.

## Desarrollo

```bash
npm install
npm run build
```

El archivo `.openai/hosting.json` contiene únicamente identificadores y nombres lógicos de bindings; no almacena credenciales.
