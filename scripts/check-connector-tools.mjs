#!/usr/bin/env node
// check-connector-tools.mjs — drift check for the AI agent connector page's tools
// table (oxjob #1279). The reverse of the server's own `check-docs`: that one asks
// "did the help pages the server bundles change?", this one asks "does the page
// still describe the tools the server actually ships?".
//
// Source of truth is the server's registerTool() calls in the sibling checkout
// ~/ox/openalex-mcp-server (the live endpoint needs OAuth, so tools/list is not
// reachable unauthenticated). Tools gated off in production are expected to be
// absent from the page: the page documents what a reader can actually use.
//
//   node scripts/check-connector-tools.mjs
//   node scripts/check-connector-tools.mjs --server ../openalex-mcp-server
//
// Exit 0 in sync, 1 on drift, 2 if the server checkout isn't there (skip, not fail:
// a docs-only CI box has no reason to hold the server repo).

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGE = join(ROOT, 'content/access/connector.md');

// Tools registered but switched off in production, so the page must NOT list them.
// Keep in step with the server's env gating (src/index.ts `features`).
const GATED_OFF = new Set(['find_experts']);

const argIdx = process.argv.indexOf('--server');
const SERVER = argIdx > -1
  ? join(process.cwd(), process.argv[argIdx + 1])
  : join(ROOT, '..', 'openalex-mcp-server');

if (!existsSync(join(SERVER, 'src'))) {
  console.log(`skip: no server checkout at ${SERVER} (pass --server <path>)`);
  process.exit(2);
}

// --- what the server registers
const registered = new Set();
for (const f of readdirSync(join(SERVER, 'src')).filter((f) => f.endsWith('.ts'))) {
  const src = readFileSync(join(SERVER, 'src', f), 'utf8');
  for (const m of src.matchAll(/registerTool\(\s*["']([a-z_]+)["']/g)) registered.add(m[1]);
}
const expected = new Set([...registered].filter((t) => !GATED_OFF.has(t)));

// --- what the page documents
const page = readFileSync(PAGE, 'utf8');
const documented = new Set(
  [...page.matchAll(/^\|\s*`([a-z_]+)`/gm)].map((m) => m[1]),
);

const missing = [...expected].filter((t) => !documented.has(t)).sort();
const extra = [...documented].filter((t) => !expected.has(t)).sort();

// --- the page's own count sentence ("The agent chooses among fourteen tools")
const WORDS = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
  'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
const countM = page.match(/chooses among ([a-z-]+) tools/);
const claimed = countM ? WORDS.indexOf(countM[1]) : -1;
const countWrong = claimed > -1 && claimed !== expected.size;

for (const t of missing) console.error(`MISSING: server ships \`${t}\`, the page's table doesn't list it`);
for (const t of extra) console.error(`EXTRA:   the page lists \`${t}\`, the server doesn't ship it in production`);
if (countWrong) {
  console.error(`COUNT:   the page says "${countM[1]}" tools; production ships ${expected.size} (${WORDS[expected.size] ?? expected.size})`);
}

if (missing.length || extra.length || countWrong) {
  console.error(`\ndrift: ${expected.size} tools in production, ${documented.size} documented.`);
  process.exit(1);
}
console.log(`in sync: ${expected.size} production tools documented` +
  (GATED_OFF.size ? ` (gated off, correctly absent: ${[...GATED_OFF].join(', ')})` : ''));
