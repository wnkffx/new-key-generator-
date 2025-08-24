API Server Auxilio
-----------------

Rutas disponibles:

GET  /api/keys       => Devuelve todas las keys
POST /api/use-key    => Marca una key como usada
                       JSON body: { "key": "ABC123" }

Instrucciones:

1. Hacer push a GitHub.
2. En Render, crear un "Web Service" apuntando al repo.
3. Build Command: npm install
4. Start Command: npm start
5. Usar la URL de Render en tu panel Auxilio para validar keys.
