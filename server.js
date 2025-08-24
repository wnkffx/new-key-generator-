const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Keys de ejemplo
let keys = {
  "ABC123": { used: false, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 }, // 7 días
  "DEF456": { used: false, expiresAt: Date.now() + 15 * 24 * 60 * 60 * 1000 }, // 15 días
  "GHI789": { used: false, expiresAt: null } // permanente
};

// Obtener todas las keys
app.get('/api/keys', (req, res) => {
  res.json(keys);
});

// Validar y usar key
app.post('/api/use-key', (req, res) => {
  const { key } = req.body;
  if (!key || !keys[key]) {
    return res.status(400).json({ error: "Key inválida" });
  }

  const now = Date.now();
  const record = keys[key];

  if (record.used) {
    return res.status(400).json({ error: "Key ya usada" });
  }

  if (record.expiresAt && now > record.expiresAt) {
    return res.status(400).json({ error: "Key expirada" });
  }

  record.used = true;
  keys[key] = record;
  res.json({ success: true, message: "Key validada correctamente" });
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
