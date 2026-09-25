import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../docs/', import.meta.url));
const prefix = '/workshop-agentforce-vibes/';
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.md': 'text/markdown',
  '.json': 'application/json',
  '.rsc': 'text/x-component',
};

createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, 'http://127.0.0.1:4173').pathname,
    );
    if (pathname === '/' || pathname === prefix.slice(0, -1)) {
      res.writeHead(302, { Location: prefix });
      res.end();
      return;
    }
    if (!pathname.startsWith(prefix)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    let file = path.resolve(
      root,
      pathname.slice(prefix.length) || 'index.html',
    );
    if (!file.startsWith(root)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const data = await readFile(file);
    res.writeHead(200, {
      'Content-Type': `${mime[path.extname(file)] || 'application/octet-stream'}; charset=utf-8`,
      'Cache-Control': 'no-store',
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(4173, '127.0.0.1', () =>
  console.log(`Preview: http://127.0.0.1:4173${prefix}`),
);
