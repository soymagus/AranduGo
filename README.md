# Arandu Go

Plataforma de micro-sitios modulares para negocios locales. Incluye una página pública responsive y un Panel de control privado en `/dashboardcliente/`.

## Funciones actuales

- Contenido comercial editable y publicación de borradores.
- Módulos activables y reordenables.
- Header y footer configurables, con inicial, logo o logo más texto.
- Esquemas globales y colores independientes por sección.
- Galería de hasta 24 imágenes con paginación, texto y CTA.
- Dos secciones libres con editor enriquecido, imágenes y acceso desde el menú.
- Carga de imágenes organizada por cliente y tipo de contenido.
- Mapa de Google, redes sociales y formulario de contacto con captcha opcional.
- Importación y exportación de contenido; respaldo ZIP con archivos e imágenes.

## Tecnología

Aplicación TypeScript/React basada en Vinext, con persistencia D1 y almacenamiento R2. El despliegue de referencia utiliza Cloudflare Workers mediante ChatGPT Sites.

## Desarrollo

```bash
npm run install:ci
npm run build
```

El archivo `.openai/hosting.json` contiene únicamente identificadores y nombres lógicos de bindings; no almacena credenciales.
