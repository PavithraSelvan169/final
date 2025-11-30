import express from 'express';
import fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { render } from './dist/genai_innovations/server/main.server.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const app = express();
const PORT = process.env.PORT || 4000;

// Serve static files
app.use(express.static(join(__dirname, 'dist/genai_innovations/browser'), { index: false }));

// Catch-all: render SSR
app.get('*', async (req, res) => {
  try {
    const indexHtml = await fs.promises.readFile(join(__dirname, 'dist/genai_innovations/browser/index.html'), 'utf-8');
    const html = await render(req.originalUrl, { document: indexHtml });
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Angular SSR listening on http://localhost:${PORT}`);
});
