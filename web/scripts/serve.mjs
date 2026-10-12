import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { build, root, normalizeBase } from './build.mjs';

let base;
if (process.argv.includes('--no-build')) {
  base = JSON.parse(await readFile(path.join(root, 'dist/build.json'), 'utf8')).base;
} else { ({ base } = await build(normalizeBase(process.env.BASE || '/'))); }
const dist = path.join(root, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.ttf': 'font/ttf', '.otf': 'font/otf', '.woff2': 'font/woff2', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname === base.slice(0, -1)) { res.writeHead(301, { Location: base }); return res.end(); }
    if (!pathname.startsWith(base)) throw new Error('404');
    const file = path.resolve(dist, pathname.slice(base.length));
    if (file !== dist && !file.startsWith(`${dist}${path.sep}`)) throw new Error('404');
    const info = await stat(file);
    if (info.isDirectory() && !pathname.endsWith('/')) { res.writeHead(301, { Location: `${pathname}/${url.search}` }); return res.end(); }
    const target = info.isDirectory() ? path.join(file, 'index.html') : file;
    const content = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(path.join(dist, '404.html')));
  }
});
const portIndex = process.argv.indexOf('--port');
const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : process.env.PORT || 4173);
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}${base}es/aguacate/`));
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
