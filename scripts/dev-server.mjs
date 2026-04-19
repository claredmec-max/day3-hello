import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

http
  .createServer((req, res) => {
    const raw = (req.url || '/').split('?')[0];

    let reqPath;
    try {
      reqPath = decodeURIComponent(raw === '/' ? '/index.html' : raw);
    } catch {
      res.statusCode = 400;
      res.end('Bad request');
      return;
    }

    const filePath = path.resolve(root, `.${reqPath}`);
    const relativePath = path.relative(root, filePath);

    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }

      res.setHeader('Content-Type', mime[path.extname(filePath)] || 'application/octet-stream');
      res.end(data);
    });
  })
  .listen(4173, () => console.log('Dev server running at http://localhost:4173'));
