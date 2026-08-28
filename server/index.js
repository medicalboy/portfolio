import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { profile } from './data/profile.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5050;

const app = express();

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/profile', (_req, res) => {
  res.json(profile);
});

// In production the built client is served from the same origin.
const dist = path.resolve(__dirname, '../client/dist');
if (existsSync(dist)) {
  app.use(express.static(dist));
  app.get(/^\/(?!api\/).*/, (_req, res) => {
    res.sendFile(path.join(dist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Content API on http://localhost:${PORT}`);
  if (existsSync(dist)) console.log(`Serving client build from ${dist}`);
});
