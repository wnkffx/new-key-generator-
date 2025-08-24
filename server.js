const express = require('express');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Archivo donde se guardan las keys
const KEYS_FILE = path.join(__dirname, 'keys.json');

// Funciones para leer/escribir keys
const loadKeys = () => {
    if(!fs.existsSync(KEYS_FILE)) return {};
    return JSON.parse(fs.readFileSync(KEYS_FILE));
};
const saveKeys = (keys) => fs.writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2));

// Generar nueva key
app.post('/generate-key', (req, res) => {
    const { expiresInDays } = req.body;
    const key = nanoid(10);
    const expiresAt = Date.now() + (expiresInDays || 7) * 24 * 60 * 60 * 1000;

    const keys = loadKeys();
    keys[key] = { used: false, expiresAt };
    saveKeys(keys);

    res.json({ success: true, key, expiresAt });
});

// Validar key
app.post('/validate-key', (req, res) => {
    const { key } = req.body;
    const keys = loadKeys();
    const record = keys[key];

    if(!record) return res.json({ success: false, error: 'Key inválida' });
    if(record.used) return res.json({ success: false, error: 'Key ya usada' });
    if(record.expiresAt && Date.now() > record.expiresAt) return res.json({ success: false, error: 'Key expirada' });

    record.used = true;
    keys[key] = record;
    saveKeys(keys);

    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server escuchando en http://localhost:${PORT}`));