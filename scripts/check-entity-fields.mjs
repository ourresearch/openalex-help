#!/usr/bin/env node
// check-entity-fields.mjs — drift check for the Entities tab field dictionaries
// (oxjob #354 Pass R §3). Precedent: sync-query-docs.mjs.
//
// For each entity page under content/entities/ that has an `## Attributes` section,
// this compares the page's `### \`field\`` headings against:
//   1. the real top-level keys of live API objects (union over a diverse sample), and
//   2. the entity's property catalog at api.openalex.org/properties.
// It reports MISSING (a real API field the page never documents) and EXTRA (a
// documented field that no longer exists in the API or catalog — i.e. stale).
//
// This is what keeps the handbook from rotting the way the Zendesk KB did.
// Run it in the grind and re-run it whenever the API surface changes:
//   node scripts/check-entity-fields.mjs            # all configured entities
//   node scripts/check-entity-fields.mjs works authors   # just these
// Exit code is nonzero if any entity has drift (so CI can gate on it).

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MAILTO = 'team@openalex.org';
const API = 'https://api.openalex.org';

// slug -> { endpoint?, propKey? }. endpoint + propKey default to the slug.
// Only entities whose page documents the SAME object the list endpoint returns
// are listed. Component entities (authorships, locations, raw-affiliation-strings)
// are intentionally omitted: their pages document the object as embedded in a
// work (e.g. work.locations[] — is_oa/pdf_url/version/…), which is a different
// shape from the standalone /locations Walden row, so the list endpoint is the
// wrong oracle for them. They're self-verified against a live work object.
const ENTITIES = {
  works: { page: 'works/attributes' }, // dictionary split onto a child page (2026-08-07)
  sources: { page: 'sources/attributes' }, // same split (2026-08-08)
  authors: {}, institutions: {}, publishers: {},
  funders: {}, topics: {}, keywords: {}, awards: {}, concepts: {},
  subfields: {}, fields: {}, domains: {}, sdgs: {},
  'work-types': {}, 'source-types': {}, 'institution-types': {},
  countries: {}, continents: {}, languages: {}, licenses: {}, indexes: {},
};

// API object keys that are never documented as their own field (internal /
// per-request extras), so they shouldn't count as MISSING.
const IGNORE_KEYS = new Set(['relevance_score', 'abstract', 'ngrams_url', 'cited_by_api_url']);

async function getJSON(url) {
  const res = await fetch(url, { headers: { 'User-Agent': `openalex-help check-entity-fields (${MAILTO})` } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

// Union of top-level object keys across a diverse sample of the entity's objects.
async function sampleKeys(endpoint) {
  const keys = new Set();
  for (const qs of [`sample=25&per_page=25`, `per_page=50`]) {
    try {
      const data = await getJSON(`${API}/${endpoint}?${qs}&mailto=${MAILTO}`);
      for (const obj of data.results ?? []) for (const k of Object.keys(obj)) keys.add(k);
      if (keys.size) break; // sample worked; don't also pull per_page
    } catch {
      /* some vocab endpoints reject sample=; fall through to per_page */
    }
  }
  return keys;
}

// The `### \`field\`` headings inside the page's `## Fields` section.
function pageFields(md) {
  const start = md.search(/^##\s+Attributes\s*$/m);
  if (start === -1) return null;
  const rest = md.slice(start + 1);
  const end = rest.search(/^##\s+(?!#)/m); // next H2
  const section = end === -1 ? rest : rest.slice(0, end);
  const fields = [];
  for (const m of section.matchAll(/^###\s+`([^`]+)`/gm)) {
    const name = m[1];
    if (!name.includes('.')) fields.push(name); // skip dotted sub-field anchors
  }
  return fields;
}

async function propKeys(propKey) {
  try {
    const data = await getJSON(`${API}/properties?mailto=${MAILTO}`);
    const ent = data.properties?.[propKey];
    if (!ent) return new Set();
    // top-level (non-dotted) property names only
    return new Set(Object.keys(ent).filter((k) => !k.includes('.')));
  } catch {
    return new Set();
  }
}

const only = process.argv.slice(2);
const slugs = only.length ? only : Object.keys(ENTITIES);
let drift = 0;
let checked = 0;

for (const slug of slugs) {
  const cfg = ENTITIES[slug];
  if (!cfg) { console.error(`! ${slug}: not a configured entity`); drift++; continue; }
  const path = join(ROOT, 'content', 'data', `${cfg.page ?? slug}.md`);
  if (!existsSync(path)) { console.log(`· ${slug}: no page yet (skipped)`); continue; }
  const fields = pageFields(readFileSync(path, 'utf8'));
  if (fields === null) { console.log(`· ${slug}: page has no "## Attributes" section (skipped)`); continue; }

  const endpoint = cfg.endpoint ?? slug;
  const pk = cfg.propKey ?? slug;
  let apiKeys, props;
  try {
    [apiKeys, props] = await Promise.all([sampleKeys(endpoint), propKeys(pk)]);
  } catch (e) {
    console.error(`! ${slug}: API error — ${e.message}`);
    drift++;
    continue;
  }
  checked++;

  const documented = new Set(fields);
  const missing = [...apiKeys].filter((k) => !documented.has(k) && !IGNORE_KEYS.has(k)).sort();
  const known = new Set([...apiKeys, ...props]);
  const extra = fields.filter((f) => !known.has(f)).sort();

  if (!missing.length && !extra.length) {
    console.log(`✓ ${slug}: ${fields.length} fields, no drift`);
  } else {
    drift++;
    console.log(`✗ ${slug}: ${fields.length} documented / ${apiKeys.size} live keys`);
    if (missing.length) console.log(`    MISSING (in API, not on page): ${missing.join(', ')}`);
    if (extra.length) console.log(`    EXTRA   (on page, not in API/catalog): ${extra.join(', ')}`);
  }
}

console.log(`\n${checked} entit${checked === 1 ? 'y' : 'ies'} checked; ${drift} with drift.`);
process.exit(drift ? 1 : 0);
