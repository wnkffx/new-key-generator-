API Server de Keys - Sistema de Gestión

REQUISITOS:
- Node.js (versión 14 o superior)
- npm (viene con Node.js)

ARCHIVOS:
- server.js       : Servidor principal de Node.js
- package.json    : Dependencias
- public/index.html : Panel web para generar keys
- keys.json       : Archivo donde se guardan las keys (se genera automáticamente)

INSTALACIÓN Y USO:

1. Extraer el contenido del ZIP en una carpeta.
2. Abrir terminal o CMD en la carpeta del proyecto.
3. Ejecutar:
   npm install
   node server.js
4. Abrir navegador en:
   http://localhost:3000
5. Desde el panel web, puedes generar nuevas keys.
6. Las keys se guardan en keys.json y se pueden validar desde cualquier HTML usando:
   POST http://localhost:3000/validate-key
   {
     "key": "TU_KEY_AQUI"
   }

NOTA:
- Las keys tienen fecha de expiración configurable (por defecto 7 días).
- Cada key solo puede ser usada una vez.
- Para usarlo en Android/Chrome, el servidor debe estar corriendo y accesible desde la red.