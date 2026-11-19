#!/usr/bin/env node
/**
 * Serve dist/ with the headers from dist/_headers applied.
 *
 * Cloudflare applies _headers in production; the Astro dev server does not.
 * Without this, a hash-based CSP can only be verified after deploying,
 * which is the wrong order — a stale hash silently breaks the theme
 * toggle and the scroll reveals for every visitor.
 */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve as resolvePath, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// The folder itself, without a trailing separator, and everything below it.
const DIST = resolvePath(fileURLToPath(new URL('../dist/', import.meta.url)));
const PORT = Number(process.env.PORT ?? 4322);
// Only this machine: the server is for tests and checks, and an address in the
// local network would hand dist/ – and, before the path check below, any file –
// to every device on it. Hosts other than these are refused (DNS rebinding).
const HOST = '127.0.0.1';
const HOSTS = new Set([`127.0.0.1:${PORT}`, `localhost:${PORT}`, `[::1]:${PORT}`]);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

/** Parse _headers into [pattern, {header: value}] pairs. */
async function parseHeaders() {
  let raw = '';
  try {
    raw = await readFile(join(DIST, '_headers'), 'utf8');
  } catch {
    return [];
  }
  const rules = [];
  let current = null;
  for (const line of raw.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (!line.startsWith(' ') && !line.startsWith('\t')) {
      current = { pattern: line.trim(), headers: {} };
      rules.push(current);
    } else if (current) {
      const i = line.indexOf(':');
      if (i > 0) current.headers[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return rules;
}

/**
 * The 200 rewrites from _redirects – Cloudflare serves the target and keeps the
 * address, as for every link into the app (/app/* /app/ 200). Without them the
 * page behind those links could only be tested at /app/ itself.
 */
async function parseRewrites() {
  let raw = '';
  try {
    raw = await readFile(join(DIST, '_redirects'), 'utf8');
  } catch {
    return [];
  }
  return raw
    .split('\n')
    .map((line) => line.trim().split(/\s+/))
    .filter(([from, to, status]) => from && !from.startsWith('#') && to && status === '200')
    .map(([from, to]) => ({ from, to }));
}

const rules = await parseHeaders();
const rewrites = await parseRewrites();

const matches = (pattern, path) =>
  pattern.endsWith('*') ? path.startsWith(pattern.slice(0, -1)) : pattern === path;

async function resolve(urlPath) {
  // Never leave dist/: "/../package.json" or "/..%2f..%2fetc/hosts" stay outside.
  const base = resolvePath(DIST, `.${urlPath}`);
  if (base !== DIST && !base.startsWith(DIST + sep)) return null;
  const candidates = [base, join(base, 'index.html')];
  for (const c of candidates) {
    try {
      if ((await stat(c)).isFile()) return c;
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

createServer(async (req, res) => {
  if (!HOSTS.has(req.headers.host ?? '')) {
    res.writeHead(421).end();
    return;
  }
  let path;
  try {
    path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  } catch {
    // A broken escape such as "%E0%A4%A" – answer instead of crashing the server.
    res.writeHead(400).end();
    return;
  }
  const rewrite = (await resolve(path)) ? null : rewrites.find((r) => matches(r.from, path));
  const file = await resolve(rewrite ? rewrite.to : path);

  // A header that several matching rules set: Cloudflare sends one line per rule, and
  // HTTP reads that as one comma-separated list – which is what goes out here.
  const headers = {};
  for (const rule of rules) {
    if (matches(rule.pattern, path)) {
      for (const [k, v] of Object.entries(rule.headers)) headers[k] = headers[k] ? `${headers[k]}, ${v}` : v;
    }
  }
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);

  if (!file) {
    // As Cloudflare does (not_found_handling "404-page"): the nearest 404.html,
    // from the requested folder up to the root – /de/… gets the German one.
    const folders = path.split('/').slice(1, -1);
    let notFound = null;
    for (let depth = folders.length; depth >= 0 && !notFound; depth--) {
      notFound = await resolve(`/${[...folders.slice(0, depth), '404.html'].join('/')}`);
    }
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    res.end(notFound ? await readFile(notFound) : 'Not found');
    return;
  }

  res.setHeader('Content-Type', TYPES[extname(file)] ?? 'application/octet-stream');
  res.writeHead(200);
  res.end(await readFile(file));
}).listen(PORT, HOST, () => {
  console.log(`dist/ with _headers applied on http://${HOST}:${PORT}`);
});
