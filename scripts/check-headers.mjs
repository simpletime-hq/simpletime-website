#!/usr/bin/env node
/**
 * Verify that the built dist/_headers is exactly the expected transformation of
 * public/_headers, and that a real HTTP server actually serves those headers.
 *
 * scripts/csp-headers.mjs swaps 'unsafe-inline' for hashes of the inline code
 * Astro emitted. That rewrite is the only difference the build is allowed to
 * make: if anything else drifts — a dropped security header, a widened CSP
 * directive, a hash that no longer matches the code it is supposed to cover —
 * the site ships a weaker policy than the one that was reviewed, and nothing
 * else catches it.
 *
 * The hashes are recomputed here from dist/**\/*.html using the same selection
 * rules as csp-headers.mjs, so a stale hash left behind by an edited page is a
 * failure rather than a syntactically valid lie.
 *
 * Static comparison alone is not enough, because _headers is only meaningful
 * once something parses and applies it. So the positive run also boots the
 * existing scripts/serve-dist.mjs and asserts the headers come back on a page,
 * a localised page, and a miss — and that the miss really is the 404 body.
 *
 * Modes:
 *   (default)              static comparison + live server checks
 *   --static-only          skip the live server
 *   --headers <path>       validate a different built artifact (implies --static-only)
 *   --negative-self-test   prove each rejection actually fires
 *   --fail-after-ready     throw once the server is up, to exercise teardown
 *   --port <n>             port for the live server (default 4399)
 */

import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createServer } from 'node:net';
import { readFile, readdir, stat } from 'node:fs/promises';
import { request as httpRequest } from 'node:http';
import { join } from 'node:path';

const ROOT = new URL('../', import.meta.url).pathname;
const SOURCE_HEADERS = join(ROOT, 'public', '_headers');
const DIST = join(ROOT, 'dist');
const BUILT_HEADERS = join(DIST, '_headers');
const NOT_FOUND_PAGE = join(DIST, '404.html');
const SERVER = join(ROOT, 'scripts', 'serve-dist.mjs');

/** The non-CSP security headers public/_headers is expected to carry. */
const SECURITY_HEADERS = [
  'X-Content-Type-Options',
  'Cross-Origin-Opener-Policy',
  'X-Permitted-Cross-Domain-Policies',
  'Referrer-Policy',
  'X-Frame-Options',
  'Permissions-Policy',
];

/**
 * HSTS is deliberately neither required nor forbidden: it is an edge concern,
 * so adding or dropping it must not make this harness fail.
 */
const UNGOVERNED_HEADERS = new Set(['strict-transport-security']);

/** The only CSP directives csp-headers.mjs is allowed to rewrite. */
const HASHED_DIRECTIVES = ['script-src', 'style-src'];

/**
 * Hosts a hashed directive may name after its placeholder – the Atriya server
 * the visitor statistics script comes from. They must come through the build
 * unchanged, after the hashes; any other source is rejected.
 */
const EXTERNAL_SOURCES = { 'script-src': ['https://intern.atriya.io'], 'style-src': [] };

/** base64 of a 32-byte digest is 43 chars plus one '=' of padding. */
const SHA256_TOKEN = /^'sha256-[A-Za-z0-9+/]{43}='$/;

/** Kept identical to scripts/csp-headers.mjs — see recomputeHashes(). */
const EXECUTABLE_TYPES = new Set(['', 'module', 'text/javascript', 'application/javascript']);

const SITE_RULE = '/*';
const CSP = 'Content-Security-Policy';
const PROBE_PATH = '/**stweb003_probe**/';
const MAX_HEADER_LINE = 2000;
const MAX_BODY_BYTES = 1024 * 1024;
const READY_TIMEOUT_MS = 15_000;
const TERM_TIMEOUT_MS = 5_000;
const KILL_TIMEOUT_MS = 5_000;

// ---------------------------------------------------------------- parsing ---

/**
 * Parse a Cloudflare _headers file, rejecting the shapes that would otherwise
 * be silently dropped and make a later comparison look clean.
 */
function parseHeadersFile(raw, label) {
  const rules = [];
  const problems = [];
  const seenPatterns = new Set();
  let current = null;

  raw.split('\n').forEach((line, index) => {
    const lineNo = index + 1;
    const at = `${label}:${lineNo}`;
    if (!line.trim() || line.trim().startsWith('#')) return;

    if (!line.startsWith(' ') && !line.startsWith('\t')) {
      const pattern = line.trim();
      if (seenPatterns.has(pattern)) {
        problems.push(`${at}: duplicate rule pattern "${pattern}"`);
      }
      seenPatterns.add(pattern);
      current = { pattern, headers: [], names: new Set() };
      rules.push(current);
      return;
    }

    const i = line.indexOf(':');
    const name = i > 0 ? line.slice(0, i).trim() : '';
    if (i <= 0 || !name) {
      problems.push(`${at}: indented line is not a "Name: value" header: ${JSON.stringify(line)}`);
      return;
    }
    if (!current) {
      problems.push(`${at}: header "${name}" appears before any rule pattern`);
      return;
    }

    const key = name.toLowerCase();
    if (current.names.has(key)) {
      problems.push(`${at}: duplicate header "${name}" in rule "${current.pattern}"`);
    }
    current.names.add(key);
    current.headers.push([name, line.slice(i + 1).trim()]);
  });

  return { rules, problems };
}

const findRule = (rules, pattern) => rules.find((r) => r.pattern === pattern);

const headerValue = (rule, name) =>
  rule?.headers.find(([k]) => k.toLowerCase() === name.toLowerCase())?.[1];

/** Parse a CSP value into ordered [directive, tokens[]] pairs. */
function parseCsp(value, label) {
  const entries = [];
  const problems = [];
  const seen = new Set();
  for (const part of value.split(';').map((p) => p.trim()).filter(Boolean)) {
    const [name, ...tokens] = part.split(/\s+/);
    const key = name.toLowerCase();
    if (seen.has(key)) problems.push(`${label}: duplicate CSP directive "${name}"`);
    seen.add(key);
    entries.push([key, tokens]);
  }
  return { entries, problems };
}

// ------------------------------------------------------- hash recomputation ---

const sha256 = (body) => `'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`;

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/**
 * Recompute the hashes the CSP is supposed to contain, using exactly the
 * selection rules scripts/csp-headers.mjs uses: inline only (no src), an
 * executable type only, and ld+json deliberately skipped. Any divergence here
 * would make this check agree with a wrong policy.
 */
async function recomputeHashes() {
  const files = await htmlFiles(DIST);
  const hashes = { 'script-src': new Set(), 'style-src': new Set() };

  for (const file of files) {
    const html = await readFile(file, 'utf8');

    for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      const [, attrs, body] = match;
      if (/\ssrc=/.test(attrs)) continue;
      const type = (attrs.match(/type="([^"]*)"/)?.[1] ?? '').toLowerCase();
      if (!EXECUTABLE_TYPES.has(type)) continue;
      hashes['script-src'].add(sha256(body));
    }

    for (const match of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
      hashes['style-src'].add(sha256(match[1]));
    }
  }

  return { hashes, pages: files.length };
}

// ------------------------------------------------------------ static check ---

/**
 * Compare a built artifact against public/_headers.
 * Returns every problem found rather than throwing on the first.
 */
function validateStatic(sourceRaw, builtRaw, expected) {
  const problems = [];
  const source = parseHeadersFile(sourceRaw, 'public/_headers');
  const built = parseHeadersFile(builtRaw, 'built _headers');
  problems.push(...source.problems, ...built.problems);

  builtRaw.split('\n').forEach((line, i) => {
    if (line.length > MAX_HEADER_LINE) {
      problems.push(`built _headers:${i + 1} is ${line.length} chars, over the ${MAX_HEADER_LINE} limit`);
    }
  });

  const sourceSite = findRule(source.rules, SITE_RULE);
  const builtSite = findRule(built.rules, SITE_RULE);
  if (!sourceSite) return [`public/_headers has no "${SITE_RULE}" rule`, ...problems];
  if (!builtSite) return [`built _headers has no "${SITE_RULE}" rule`, ...problems];

  // Every rule other than the site-wide one must survive the build untouched.
  const patterns = (rules) => rules.map((r) => r.pattern).join(', ');
  if (patterns(source.rules) !== patterns(built.rules)) {
    problems.push(`rule patterns changed:\n  public: ${patterns(source.rules)}\n  built:  ${patterns(built.rules)}`);
  }
  for (const sourceRule of source.rules) {
    if (sourceRule.pattern === SITE_RULE) continue;
    const builtRule = findRule(built.rules, sourceRule.pattern);
    if (!builtRule) {
      problems.push(`rule "${sourceRule.pattern}" is missing from the built _headers`);
      continue;
    }
    const flatten = (r) => r.headers.map(([k, v]) => `${k}: ${v}`).join(' | ');
    if (flatten(sourceRule) !== flatten(builtRule)) {
      problems.push(
        `rule "${sourceRule.pattern}" changed:\n  public: ${flatten(sourceRule)}\n  built:  ${flatten(builtRule)}`,
      );
    }
  }

  // The six non-CSP security headers must come through value-equal.
  const governed = (rule) =>
    rule.headers
      .map(([k]) => k)
      .filter((k) => k.toLowerCase() !== CSP.toLowerCase() && !UNGOVERNED_HEADERS.has(k.toLowerCase()));
  const sourceGoverned = governed(sourceSite);
  if (sourceGoverned.length !== SECURITY_HEADERS.length) {
    problems.push(
      `public/_headers "${SITE_RULE}" carries ${sourceGoverned.length} non-CSP security headers, expected ${SECURITY_HEADERS.length}: ${sourceGoverned.join(', ')}`,
    );
  }
  const builtGoverned = governed(builtSite);
  if (builtGoverned.join(', ') !== sourceGoverned.join(', ')) {
    problems.push(
      `non-CSP security headers changed:\n  public: ${sourceGoverned.join(', ')}\n  built:  ${builtGoverned.join(', ')}`,
    );
  }
  for (const name of SECURITY_HEADERS) {
    const want = headerValue(sourceSite, name);
    const got = headerValue(builtSite, name);
    if (want === undefined) problems.push(`public/_headers is missing ${name}`);
    else if (got === undefined) problems.push(`built _headers is missing ${name}`);
    else if (want !== got) problems.push(`${name} changed:\n  public: ${want}\n  built:  ${got}`);
  }

  problems.push(...validateCsp(headerValue(sourceSite, CSP), headerValue(builtSite, CSP), expected));
  return problems;
}

/** Only the hashed directives may differ, and only by the hashes dist actually needs. */
function validateCsp(sourceValue, builtValue, expected) {
  const problems = [];
  if (!sourceValue) return [`public/_headers has no ${CSP}`];
  if (!builtValue) return [`built _headers has no ${CSP}`];

  const source = parseCsp(sourceValue, 'public/_headers CSP');
  const built = parseCsp(builtValue, 'built _headers CSP');
  problems.push(...source.problems, ...built.problems);

  const builtByName = new Map(built.entries);
  const names = (list) => list.map(([n]) => n).join(' ');
  if (names(source.entries) !== names(built.entries)) {
    problems.push(`CSP directives changed:\n  public: ${names(source.entries)}\n  built:  ${names(built.entries)}`);
  }

  for (const [name, sourceTokens] of source.entries) {
    const builtTokens = builtByName.get(name);
    if (!builtTokens) {
      problems.push(`CSP directive ${name} is missing from the built _headers`);
      continue;
    }

    if (!HASHED_DIRECTIVES.includes(name)) {
      if (sourceTokens.join(' ') !== builtTokens.join(' ')) {
        problems.push(
          `CSP directive ${name} changed:\n  public: ${sourceTokens.join(' ')}\n  built:  ${builtTokens.join(' ')}`,
        );
      }
      continue;
    }

    // Precondition: the source really is the placeholder we expect to rewrite,
    // followed only by the external sources this directive may name.
    const placeholder = sourceTokens.slice(0, 2).join(' ');
    const sourceHosts = sourceTokens.slice(2);
    if (placeholder !== "'self' 'unsafe-inline'") {
      problems.push(
        `public/_headers ${name} is "${sourceTokens.join(' ')}", expected "'self' 'unsafe-inline'"`,
      );
    }
    const unknownHosts = sourceHosts.filter((h) => !(EXTERNAL_SOURCES[name] ?? []).includes(h));
    if (unknownHosts.length) {
      problems.push(`public/_headers ${name} names unexpected sources: ${unknownHosts.join(' ')}`);
    }
    if (builtTokens.includes("'unsafe-inline'")) {
      problems.push(`built ${name} still allows 'unsafe-inline'`);
    }
    if (builtTokens[0] !== "'self'") {
      problems.push(`built ${name} does not start with 'self': ${builtTokens.join(' ')}`);
    }
    const builtHosts = builtTokens.slice(builtTokens.length - sourceHosts.length);
    if (sourceHosts.length && builtHosts.join(' ') !== sourceHosts.join(' ')) {
      problems.push(
        `built ${name} changed its external sources:\n  public: ${sourceHosts.join(' ')}\n  built:  ${builtHosts.join(' ')}`,
      );
    }

    const present = builtTokens.slice(1, builtTokens.length - sourceHosts.length);
    for (const token of present) {
      if (!SHA256_TOKEN.test(token)) {
        problems.push(`built ${name} has token ${token}, which is not a valid SHA-256 source`);
      }
    }

    // Syntax is not enough: the hashes have to be the ones dist/ needs.
    if (expected?.error) {
      problems.push(`cannot recompute expected ${name} hashes: ${expected.error}`);
      continue;
    }
    const want = expected.hashes[name];
    // An empty set on either side makes the comparison below vacuously true,
    // which is exactly how a CSP that hashes nothing would slip through.
    let empty = false;
    if (want.size < 1) {
      problems.push(`no inline ${name} content was found in dist/, so the expected hash set is empty`);
      empty = true;
    }
    if (present.length < 1) {
      problems.push(`built ${name} carries no hashes`);
      empty = true;
    }
    if (empty) continue;

    const have = new Set(present);
    const missing = [...want].filter((h) => !have.has(h));
    const extra = [...have].filter((h) => !want.has(h));
    if (missing.length) {
      problems.push(`built ${name} is missing ${missing.length} hash(es) that dist/ requires: ${missing.join(' ')}`);
    }
    if (extra.length) {
      problems.push(`built ${name} has ${extra.length} stale or unexpected hash(es): ${extra.join(' ')}`);
    }
    if (have.size !== present.length) {
      problems.push(`built ${name} repeats a hash token`);
    }
  }
  return problems;
}

// -------------------------------------------------------------- live check ---

/**
 * GET a path, capturing at most MAX_BODY_BYTES of the body. A response that
 * would exceed the cap is reported as truncated rather than buffered, so a
 * misbehaving server cannot exhaust memory here.
 */
function request(port, path) {
  return new Promise((resolve, reject) => {
    const req = httpRequest({ host: '127.0.0.1', port, path, method: 'GET' }, (res) => {
      const chunks = [];
      let total = 0;
      let truncated = false;
      let settled = false;
      const settle = () => {
        if (settled) return;
        settled = true;
        resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks), bytes: total, truncated });
      };

      res.on('data', (chunk) => {
        total += chunk.length;
        if (total > MAX_BODY_BYTES) {
          truncated = true;
          res.destroy();
          return;
        }
        chunks.push(chunk);
      });
      res.on('end', settle);
      res.on('close', settle);
      res.on('error', (err) => (truncated ? settle() : reject(err)));
    });
    req.on('error', reject);
    req.setTimeout(5_000, () => req.destroy(new Error(`request to ${path} timed out`)));
    req.end();
  });
}

const portIsFree = (port) =>
  new Promise((resolve) => {
    const probe = createServer();
    probe.once('error', () => resolve(false));
    probe.once('listening', () => probe.close(() => resolve(true)));
    probe.listen(port, '127.0.0.1');
  });

/**
 * Resolve to `value` after `ms` without holding the event loop open — for
 * losing sides of a Promise.race, which must not delay exit.
 */
const after = (ms, value) =>
  new Promise((resolve) => {
    const t = setTimeout(() => resolve(value), ms);
    t.unref?.();
  });

/**
 * A deliberate wait, which must keep the loop alive: polling with an unref'd
 * timer lets node exit mid-wait once nothing else is referenced.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isAlive = (child) => child.exitCode === null && child.signalCode === null;

/**
 * Signal the whole process group. The server is spawned detached so it leads
 * its own group; killing the group means a helper the server spawned cannot
 * outlive this harness. Falls back to the direct child if the group is gone.
 */
function signalGroup(pid, signal) {
  try {
    process.kill(-pid, signal);
    return 'group';
  } catch (err) {
    if (err.code === 'ESRCH') return 'already-gone';
    try {
      process.kill(pid, signal);
      return 'direct-child';
    } catch (inner) {
      return `failed (${inner.code ?? inner.message})`;
    }
  }
}

/** True once no process in the group answers signal 0. */
function groupIsGone(pid) {
  try {
    process.kill(-pid, 0);
    return false;
  } catch (err) {
    return err.code === 'ESRCH';
  }
}

/** SIGTERM the group, wait, SIGKILL the group, wait. Never leave anything behind. */
async function teardown(child, exited) {
  const pid = child.pid;
  const steps = [];
  let result = { code: null, signal: null };

  if (isAlive(child)) {
    steps.push(`SIGTERM->${signalGroup(pid, 'SIGTERM')}`);
    if ((await Promise.race([exited, after(TERM_TIMEOUT_MS, 'timeout')])) === 'timeout') {
      steps.push(`SIGKILL->${signalGroup(pid, 'SIGKILL')}`);
      await Promise.race([exited, after(KILL_TIMEOUT_MS, 'timeout')]);
    }
  } else {
    steps.push('already exited');
  }

  if (isAlive(child)) steps.push('child still running after SIGKILL');
  else result = await exited;

  // The child can exit while something it spawned keeps the group alive — a
  // descendant that ignores SIGTERM outlives its parent otherwise.
  if (!groupIsGone(pid)) {
    steps.push(`group survivors: SIGKILL->${signalGroup(pid, 'SIGKILL')}`);
    const deadline = Date.now() + KILL_TIMEOUT_MS;
    while (!groupIsGone(pid) && Date.now() < deadline) await delay(50);
  }

  return { pid, code: result.code, signal: result.signal, gone: groupIsGone(pid), steps, reaped: !isAlive(child) };
}

async function startServer(port) {
  if (!(await portIsFree(port))) {
    throw new Error(`port ${port} is already in use (EADDRINUSE) — refusing to start the server`);
  }

  const child = spawn(process.execPath, [SERVER], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false,
    detached: true,
  });

  let stderr = '';
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (chunk) => {
    stderr += chunk;
  });
  child.stdout.resume();

  const spawned = new Promise((resolve, reject) => {
    child.once('spawn', resolve);
    child.once('error', (err) => reject(new Error(`could not start ${SERVER}: ${err.message}`)));
  });
  const exited = new Promise((resolve) => child.once('exit', (code, signal) => resolve({ code, signal })));

  await spawned;
  if (!Number.isInteger(child.pid) || child.pid <= 0) {
    throw new Error(`server started without a usable pid (${child.pid})`);
  }

  return { child, exited, stderr: () => stderr };
}

async function waitForReady(port, { child, exited, stderr }) {
  const deadline = Date.now() + READY_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (!isAlive(child)) {
      const { code, signal } = await exited;
      const why = /EADDRINUSE/.test(stderr()) ? ' (EADDRINUSE)' : '';
      throw new Error(
        `server exited before becoming ready${why} — code ${code}, signal ${signal}\n${stderr().trim()}`,
      );
    }
    try {
      await request(port, '/');
      return;
    } catch {
      await delay(150);
    }
  }
  throw new Error(`server was not ready on port ${port} within ${READY_TIMEOUT_MS}ms`);
}

/** Assert a response carries exactly the headers the built artifact promises. */
function checkHeaders(label, res, expectedStatus, builtSite) {
  const problems = [];
  if (res.status !== expectedStatus) {
    problems.push(`${label}: expected HTTP ${expectedStatus}, got ${res.status}`);
  }
  for (const name of [...SECURITY_HEADERS, CSP]) {
    const want = headerValue(builtSite, name);
    const got = res.headers[name.toLowerCase()];
    if (got === undefined) problems.push(`${label}: ${name} is missing from the response`);
    else if (got !== want) problems.push(`${label}: ${name} is\n  ${got}\nexpected\n  ${want}`);
  }
  return problems;
}

/** The body checks — a 404 that returns an empty body still "has the headers". */
function checkBody(label, res, { html = true, sameAs = null } = {}) {
  const problems = [];
  if (res.truncated) {
    problems.push(`${label}: body exceeded the ${MAX_BODY_BYTES}-byte cap (${res.bytes}+ bytes read)`);
    return problems;
  }
  if (html) {
    const type = res.headers['content-type'] ?? '';
    if (!type.startsWith('text/html')) problems.push(`${label}: content-type is "${type}", expected text/html`);
  }
  if (res.body.length === 0) problems.push(`${label}: body is empty`);
  if (sameAs && !res.body.equals(sameAs.bytes)) {
    problems.push(
      `${label}: body is not byte-identical to ${sameAs.name} (${res.body.length} vs ${sameAs.bytes.length} bytes)`,
    );
  }
  return problems;
}

/**
 * A leaked server is a harness failure, not a log line. The two ways teardown
 * can fall short are diagnosed separately: the group can still hold a
 * survivor, and the child itself can refuse to die.
 */
function teardownProblems(t) {
  const problems = [];
  const trail = t.steps.join(', ');
  if (!t.gone) {
    problems.push(`teardown: process group ${t.pid} still has members after [${trail}]`);
  }
  if (!t.reaped) {
    problems.push(`teardown: server child ${t.pid} never exited after [${trail}]`);
  }
  return problems;
}

async function liveChecks(port, builtSite, { failAfterReady, simulateTeardownFailure } = {}) {
  let notFound;
  try {
    notFound = { name: 'dist/404.html', bytes: await readFile(NOT_FOUND_PAGE) };
  } catch (err) {
    return [`cannot read ${NOT_FOUND_PAGE}, so the 404 body cannot be verified: ${err.message}`];
  }

  // Collected outside the try so a teardown failure cannot be discarded by a
  // `return` that was already prepared inside it.
  const problems = [];
  const server = await startServer(port);
  try {
    await waitForReady(port, server);
    if (failAfterReady) {
      throw new Error('forced harness failure after server start (--fail-after-ready)');
    }

    for (const [label, path] of [['GET /', '/'], ['GET /de/', '/de/']]) {
      const res = await request(port, path);
      problems.push(...checkHeaders(label, res, 200, builtSite), ...checkBody(label, res));
    }

    const label = `GET ${PROBE_PATH}`;
    const res = await request(port, PROBE_PATH);
    problems.push(
      ...checkHeaders(label, res, 404, builtSite),
      ...checkBody(label, res, { sameAs: notFound }),
    );
  } finally {
    let t = await teardown(server.child, server.exited);
    // Test hook: the server really was torn down above; only the verdict is
    // falsified, so the gating path can be exercised end to end.
    if (simulateTeardownFailure === 'gone' || simulateTeardownFailure === 'both') t = { ...t, gone: false };
    if (simulateTeardownFailure === 'reaped' || simulateTeardownFailure === 'both') t = { ...t, reaped: false };

    console.log(
      `check-headers: server pid ${t.pid} — ${t.steps.join(', ')}; exit code ${t.code}, signal ${t.signal}; ` +
        `child ${t.reaped ? 'reaped' : 'NOT REAPED'}; process group ${t.gone ? 'gone' : 'STILL PRESENT'}`,
    );
    const failures = teardownProblems(t);
    for (const p of failures) console.error(`check-headers: ${p}`);
    problems.push(...failures);
  }

  return problems;
}

// ------------------------------------------------------------ negative mode ---

/**
 * Each rejection this harness relies on gets its own deliberately broken
 * fixture. A check that cannot fail is not evidence of anything.
 */
async function negativeSelfTest() {
  const sourceRaw = await readFile(SOURCE_HEADERS, 'utf8');
  const builtRaw = await readFile(BUILT_HEADERS, 'utf8');
  const expected = await recomputeHashes().catch((err) => ({ error: err.message }));

  const mutateHash = (raw) =>
    raw.replace(/'sha256-([A-Za-z0-9+/])/, (m, c) => `'sha256-${c === 'A' ? 'B' : 'A'}`);
  // Dropped from script-src, which carries several, so the artifact still has
  // a hash left and the case really tests "missing" and not "empty".
  const dropHash = (raw) => raw.replace(/(script-src 'self') 'sha256-[A-Za-z0-9+/]{43}='/, '$1');
  const addHash = (raw) =>
    raw.replace(
      /(script-src 'self')/,
      `$1 'sha256-${'A'.repeat(43)}='`,
    );
  const stripHashes = (raw) => raw.replace(/(style-src 'self')(\s+'sha256-[A-Za-z0-9+/]{43}=')+/, '$1');
  const NO_EXPECTED_HASHES = { hashes: { 'script-src': new Set(), 'style-src': new Set() }, pages: 0 };

  const cases = [
    ['unprocessed artifact (unsafe-inline survives)', sourceRaw, "built script-src still allows 'unsafe-inline'"],
    ['stale hash (one character flipped)', mutateHash(builtRaw), 'stale or unexpected hash'],
    ['missing hash (one removed)', dropHash(builtRaw), 'is missing 1 hash(es) that dist/ requires'],
    ['extra hash (one invented)', addHash(builtRaw), 'stale or unexpected hash'],
    ['another host slipped into script-src', builtRaw.replace(/(script-src [^;]*)/, '$1 https://evil.example'), 'changed its external sources'],
    ['built directive with no hashes at all', stripHashes(builtRaw), 'built style-src carries no hashes'],
    ['no inline content found, so nothing to hash', builtRaw, 'expected hash set is empty', NO_EXPECTED_HASHES],
    ['malformed indented line without a colon', builtRaw.replace('\n/_astro/*', '\n  this-is-not-a-header\n/_astro/*'), 'is not a "Name: value" header'],
    ['header before any rule pattern', `  X-Content-Type-Options: nosniff\n${builtRaw}`, 'appears before any rule pattern'],
    ['duplicate rule pattern', `${builtRaw}\n/_astro/*\n  Cache-Control: public, max-age=1\n`, 'duplicate rule pattern'],
    ['duplicate header name, different case', builtRaw.replace('\n  X-Frame-Options: DENY', '\n  X-Frame-Options: DENY\n  x-frame-options: SAMEORIGIN'), 'duplicate header "x-frame-options"'],
    ['duplicate CSP header in one rule', builtRaw.replace(/\n(  Content-Security-Policy: [^\n]*)/, '\n$1\n$1'), `duplicate header "${CSP}"`],
    ['duplicate CSP directive', builtRaw.replace('  Content-Security-Policy: default-src', '  Content-Security-Policy: default-src \'none\'; default-src'), 'duplicate CSP directive'],
    ['header line over the length limit', builtRaw.replace('\n/_astro/*', `\n  X-Padding: ${'p'.repeat(2100)}\n/_astro/*`), `over the ${MAX_HEADER_LINE} limit`],
  ];

  let failed = 0;
  let total = 0;
  for (const [name, fixture, expectedProblem, expectedOverride] of cases) {
    total++;
    const problems = validateStatic(sourceRaw, fixture, expectedOverride ?? expected);
    const caught = problems.some((p) => p.includes(expectedProblem));
    if (!caught) failed++;
    console.log(`${caught ? 'PASS' : 'FAIL'}  ${name}`);
    if (!caught) {
      console.error(`        expected a problem containing: ${expectedProblem}`);
      console.error(`        got ${problems.length} problem(s):`);
      for (const p of problems) console.error(`          - ${p.split('\n')[0]}`);
    }
  }

  // The 404 body comparison must distinguish two real pages, not just "is HTML".
  try {
    const notFound = await readFile(NOT_FOUND_PAGE);
    const index = await readFile(join(DIST, 'index.html'));
    const same = { name: 'dist/404.html', bytes: notFound };
    const asRes = (body) => ({ body, bytes: body.length, truncated: false, headers: { 'content-type': 'text/html; charset=utf-8' } });

    const positive = checkBody('404 body vs itself', asRes(notFound), { sameAs: same });
    const negative = checkBody('index body vs 404', asRes(index), { sameAs: same });
    const truncatedCase = checkBody('oversized body', { body: Buffer.alloc(0), bytes: MAX_BODY_BYTES + 1, truncated: true, headers: {} }, { sameAs: same });

    for (const [name, problems, want] of [
      ['404 body matches itself', positive, false],
      ['404 body comparison rejects a different page', negative, true],
      ['oversized body is rejected as truncated', truncatedCase, true],
    ]) {
      total++;
      const pass = (problems.length > 0) === want;
      if (!pass) failed++;
      console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}`);
      if (!pass) for (const p of problems) console.error(`          - ${p}`);
    }
  } catch (err) {
    total++;
    failed++;
    console.error(`FAIL  404 body comparison fixtures unavailable: ${err.message}`);
  }

  // A teardown that fell short must produce problems, separately diagnosed.
  const steps = ['SIGTERM->group', 'SIGKILL->group'];
  for (const [name, verdict, wantCount, wantText] of [
    ['clean teardown produces no problems', { pid: 4242, gone: true, reaped: true, steps }, 0, null],
    ['survivor in the group is a failure', { pid: 4242, gone: false, reaped: true, steps }, 1, 'still has members'],
    ['unreaped child is a failure', { pid: 4242, gone: true, reaped: false, steps }, 1, 'never exited'],
    ['survivor and unreaped are diagnosed separately', { pid: 4242, gone: false, reaped: false, steps }, 2, null],
  ]) {
    total++;
    const problems = teardownProblems(verdict);
    const pass = problems.length === wantCount && (!wantText || problems.some((p) => p.includes(wantText)));
    if (!pass) failed++;
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}`);
    if (!pass) {
      console.error(`        expected ${wantCount} problem(s)${wantText ? ` containing "${wantText}"` : ''}`);
      for (const p of problems) console.error(`          - ${p}`);
    }
  }

  console.log(`\ncheck-headers: ${total - failed}/${total} negative cases rejected as expected`);
  return failed ? 1 : 0;
}

// -------------------------------------------------------------------- main ---

function parseArgs(argv) {
  const opts = {
    headers: BUILT_HEADERS,
    staticOnly: false,
    negative: false,
    failAfterReady: false,
    simulateTeardownFailure: null,
    port: 4399,
  };
  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '--headers': opts.headers = argv[++i]; opts.staticOnly = true; break;
      case '--static-only': opts.staticOnly = true; break;
      case '--negative-self-test': opts.negative = true; break;
      case '--fail-after-ready': opts.failAfterReady = true; break;
      case '--simulate-teardown-failure': opts.simulateTeardownFailure = argv[++i]; break;
      case '--port': opts.port = Number(argv[++i]); break;
      default: throw new Error(`unknown argument: ${argv[i]}`);
    }
  }
  if (opts.simulateTeardownFailure && !['gone', 'reaped', 'both'].includes(opts.simulateTeardownFailure)) {
    throw new Error(`--simulate-teardown-failure must be gone, reaped or both, got ${opts.simulateTeardownFailure}`);
  }
  if (!Number.isInteger(opts.port) || opts.port <= 0 || opts.port > 65535) {
    throw new Error(`invalid --port: ${opts.port}`);
  }
  return opts;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.negative) return negativeSelfTest();

  try {
    if (!(await stat(BUILT_HEADERS)).isFile()) throw new Error('not a file');
  } catch (err) {
    throw new Error(`${BUILT_HEADERS} does not exist: ${err.message}`);
  }

  let builtRaw;
  try {
    builtRaw = await readFile(opts.headers, 'utf8');
  } catch (err) {
    throw new Error(`${opts.headers} does not exist or is unreadable: ${err.message}`);
  }
  const sourceRaw = await readFile(SOURCE_HEADERS, 'utf8');
  const expected = await recomputeHashes().catch((err) => ({ error: err.message }));
  if (!expected.error) {
    console.log(
      `check-headers: recomputed ${expected.hashes['script-src'].size} script + ` +
        `${expected.hashes['style-src'].size} style hash(es) from ${expected.pages} built page(s)`,
    );
  }

  const problems = validateStatic(sourceRaw, builtRaw, expected);
  if (problems.length === 0) {
    console.log(`check-headers: ${opts.headers} matches the expected transformation of public/_headers`);
  }

  if (!opts.staticOnly) {
    if (problems.length > 0) {
      console.error('check-headers: skipping live checks because the static comparison failed');
    } else {
      const builtSite = findRule(parseHeadersFile(builtRaw, 'built _headers').rules, SITE_RULE);
      problems.push(...(await liveChecks(opts.port, builtSite, opts)));
      if (problems.length === 0) console.log('check-headers: live responses carry the expected headers and bodies');
    }
  }

  if (problems.length > 0) {
    console.error(`check-headers: ${problems.length} problem(s)`);
    for (const p of problems) console.error(`  - ${p}`);
    return 1;
  }
  console.log('check-headers: OK');
  return 0;
}

process.exitCode = await main().catch((err) => {
  console.error(`check-headers: ${err.message}`);
  return 1;
});
