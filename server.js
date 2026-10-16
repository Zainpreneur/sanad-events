'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3001);
const HOST = process.env.HOST || '0.0.0.0';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
};

const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.json', '.svg', '.txt']);

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    ...headers
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    return send(res, 400, 'Bad request');
  }

  if (pathname.endsWith('/')) pathname += 'index.html';

  const target = path.normalize(path.join(ROOT, pathname));
  if (!target.startsWith(ROOT)) return send(res, 403, 'Forbidden');

  fs.stat(target, (err, stat) => {
    if (err || !stat.isFile()) return send(res, 404, 'Not found');

    const ext = path.extname(target).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    const encoding = String(req.headers['accept-encoding'] || '').toLowerCase();
    const wantsGzip = COMPRESSIBLE.has(ext) && encoding.includes('gzip');

    const headers = {
      'Content-Type': type,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache',
      Vary: 'Accept-Encoding'
    };

    if (wantsGzip) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      fs.createReadStream(target).pipe(zlib.createGzip({ level: 6 })).pipe(res);
      return;
    }

    headers['Content-Length'] = stat.size;
    res.writeHead(200, headers);
    fs.createReadStream(target).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Sanad running at http://localhost:${PORT}`);
});