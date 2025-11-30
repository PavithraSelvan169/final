import 'zone.js/node';
import express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

import { AppServerModule } from './dist/genai_innovations/server/main.server.mjs';
import { ngExpressEngine } from '@nguniversal/express-engine';

const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/genai_innovations/browser');

const indexHtml = existsSync(join(DIST_FOLDER, 'index.original.html'))
  ? 'index.original.html'
  : 'index.html';

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModule,
  })
);

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

app.get('*', (req, res) => {
  res.render(indexHtml, { req });
});

app.listen(PORT, () => {
  console.log(`✅ Angular Universal running on http://localhost:${PORT}`);
});
