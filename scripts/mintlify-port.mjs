#!/usr/bin/env node
// Mintlify dev-docs → new-IA port (oxjob #354).
//
// Reads the vendored Mintlify corpus (scripts/data/mintlify/, snapshotted from
// ourresearch/docs — the developers.openalex.org site) and places every page in
// the new IA: API mechanics → content/api/, snapshot/bulk-download → content/docs/,
// recipes → content/learn/. MDX components (Note/Warning/Card/Steps/Tooltip/…)
// are converted to plain Markdown; internal links are rewritten to new paths.
//
// Writes:
//   content/<tab>/<slug>.md            — provenance frontmatter (source_url = old dev-docs URL)
//   scripts/mintlify-dispositions.tsv  — audit table (56 pages: ported or redirected)
//   public/_redirects                  — "mintlify" block between markers (idempotent)
//
// Run: `node scripts/mintlify-port.mjs` from the repo root. Idempotent — clears
// previously-ported files (source_url containing developers.openalex.org) first.
// Old dev-docs URLs reach these rules via the developers.openalex.org/* zone
// wildcard → help.openalex.org/<path> (see work/build-spec.md).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '..');
const SRC = path.join(__dirname, 'data', 'mintlify');

// ── FROZEN (oxjob #354 decision D01, 2026-07-28) ─────────────────────────────
// content/ is canonical now: the corpus is being hand-rewritten (the Docs
// rewrite passes). Re-running this generator clears + regenerates the Mintlify-
// sourced files, which would clobber those hand edits. Kept for provenance only.
if (!process.env.I_UNDERSTAND_THIS_CLOBBERS_CONTENT) {
  console.error(
    'FROZEN: content/ is canonical (oxjob #354 D01, 2026-07-28).\n' +
    'Re-running mintlify-port.mjs deletes and regenerates the Mintlify-sourced files\n' +
    'in content/, clobbering hand rewrites. Edit content/*.md directly instead.\n' +
    'To override (almost certainly wrong): I_UNDERSTAND_THIS_CLOBBERS_CONTENT=1 node scripts/mintlify-port.mjs'
  );
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(path.join(SRC, 'manifest.json'), 'utf8'));

// ── Page map (the per-page grind) ────────────────────────────────────────────
// Every .mdx in the corpus appears exactly once: {tab, slug} ports it,
// {redirect} points its old URL somewhere without porting (dup/index pages).
const PAGES = {
  // Landing + quickstart
  'index':      { redirect: '/api/', reason: 'Mintlify site landing — superseded by the new site home + API tab landing' },
  'quickstart': { tab: 'api', slug: 'quickstart' },

  // Guides → API tab (REST mechanics)
  'guides/key-concepts':        { tab: 'api', slug: 'key-concepts' },
  'guides/authentication':      { redirect: '/api/authentication/', reason: 'Short teaser duplicating api-reference/authentication (same title) — full page ported instead' },
  'guides/get':                 { tab: 'api', slug: 'get-single-entities' },
  'guides/filtering':           { tab: 'api', slug: 'filtering' },
  'guides/searching':           { tab: 'api', slug: 'searching' },
  'guides/semantic-search':     { tab: 'api', slug: 'semantic-search' },
  'guides/sort':                { tab: 'api', slug: 'sorting' },
  'guides/page-through-results':{ tab: 'api', slug: 'paging' },
  'guides/grouping':            { tab: 'api', slug: 'grouping' },
  'guides/selecting-fields':    { tab: 'api', slug: 'selecting-fields' },
  'guides/autocomplete':        { tab: 'api', slug: 'autocomplete' },
  'guides/aboutness':           { tab: 'api', slug: 'tag-aboutness' },
  'guides/collections':         { tab: 'api', slug: 'collections' },
  'guides/curation-authors':    { tab: 'api', slug: 'author-curation' },
  'guides/llm-quick-reference': { tab: 'api', slug: 'llm-quick-reference' },
  'guides/deprecations':        { tab: 'api', slug: 'deprecations' },

  // Recipes → Learn tab (tagged api-interface, joining the 11 GUI recipes)
  'guides/recipes':                           { tab: 'learn', slug: 'quick-api-recipes' },
  'guides/recipe-oa-trends':                  { tab: 'learn', slug: 'track-open-access-trends' },
  'guides/recipe-find-collaborators':         { tab: 'learn', slug: 'find-collaborators' },
  'guides/recipe-funder-portfolio':           { tab: 'learn', slug: 'analyze-a-funders-portfolio' },
  'guides/recipe-cited-journals':             { tab: 'learn', slug: 'find-most-cited-journals' },
  'guides/recipe-sdg-landscape':              { tab: 'learn', slug: 'map-an-sdg-research-landscape' },
  'guides/recipe-audit-author-profile-works': { tab: 'learn', slug: 'audit-an-author-profiles-works' },

  // Download / snapshot → Docs tab (build-spec: docs = data semantics, snapshot, explainers)
  'download/overview':           { tab: 'docs', slug: 'downloading-openalex-data', title: 'Downloading OpenAlex data' },
  'download/download-to-machine':{ tab: 'docs', slug: 'download-to-your-machine' },
  'download/snapshot-format':    { tab: 'docs', slug: 'snapshot-data-format' },
  'download/changefiles':        { tab: 'docs', slug: 'download-changefiles' },
  'download/full-text-pdfs':     { tab: 'docs', slug: 'full-text-pdfs' },
  'download/openalex-cli':       { tab: 'docs', slug: 'openalex-cli' },

  // API reference → API tab
  'api-reference/introduction':   { tab: 'api', slug: 'introduction' },
  'api-reference/authentication': { tab: 'api', slug: 'authentication' },
  'api-reference/errors':         { tab: 'api', slug: 'errors' },
  'api-reference/works':          { tab: 'api', slug: 'works' },
  'api-reference/authors':        { tab: 'api', slug: 'authors' },
  'api-reference/sources':        { tab: 'api', slug: 'sources' },
  'api-reference/institutions':   { tab: 'api', slug: 'institutions' },
  'api-reference/topics':         { tab: 'api', slug: 'topics' },
  'api-reference/publishers':     { tab: 'api', slug: 'publishers' },
  'api-reference/funders':        { tab: 'api', slug: 'funders' },
  'api-reference/awards':         { tab: 'api', slug: 'awards' },
  'api-reference/keywords':       { tab: 'api', slug: 'keywords' },
  'api-reference/concepts':       { tab: 'api', slug: 'concepts' },
  'api-reference/continents':     { tab: 'api', slug: 'continents' },
  'api-reference/countries':      { tab: 'api', slug: 'countries' },
  'api-reference/domains':        { tab: 'api', slug: 'domains' },
  'api-reference/fields':         { tab: 'api', slug: 'fields' },
  'api-reference/subfields':      { tab: 'api', slug: 'subfields' },
  'api-reference/sdgs':           { tab: 'api', slug: 'sdgs' },
  'api-reference/licenses':       { tab: 'api', slug: 'licenses' },
  'api-reference/languages':      { tab: 'api', slug: 'languages' },
  'api-reference/indexes':        { tab: 'api', slug: 'indexes' },
  'api-reference/institution-types': { tab: 'api', slug: 'institution-types' },
  'api-reference/source-types':   { tab: 'api', slug: 'source-types' },
  'api-reference/work-types':     { tab: 'api', slug: 'work-types' },
};

// ── Old path → new URL (for internal-link + redirect rewriting) ──────────────
const newUrl = (p) => {
  const m = PAGES[p];
  if (!m) return null;
  return m.redirect || `/${m.tab}/${m.slug}/`;
};

// ── MDX → Markdown transforms ────────────────────────────────────────────────
function blockquote(label, inner) {
  const body = inner.trim().split('\n').map((l) => `> ${l}`.trimEnd()).join('\n');
  return `\n> **${label}:**\n${body}\n`;
}

function transform(body, srcPath) {
  let out = body;

  // Cost-badge tooltips (wrap only an Icon): keep the headline as plain text.
  out = out.replace(/<Tooltip[^>]*headline="([^"]*)"[^>]*>[\s\S]*?<\/Tooltip>/g, ' ($1)');
  out = out.replace(/<Tooltip[^>]*>([\s\S]*?)<\/Tooltip>/g, '$1');
  out = out.replace(/<Icon[^>]*\/>/g, '');

  // Callouts → labelled blockquotes.
  for (const [comp, label] of [['Note', 'Note'], ['Warning', 'Warning'], ['Tip', 'Tip'], ['Info', 'Info']]) {
    out = out.replace(new RegExp(`<${comp}>([\\s\\S]*?)<\\/${comp}>`, 'g'), (_, inner) => blockquote(label, inner));
  }

  // Cards → link list items; drop the group wrapper.
  out = out.replace(/<CardGroup[^>]*>/g, '').replace(/<\/CardGroup>/g, '');
  out = out.replace(/<Card\s+title="([^"]+)"[^>]*?href="([^"]+)"[^>]*\/>/g,
    (_, title, href) => `- **[${title}](${href})**`);
  out = out.replace(/<Card\s+title="([^"]+)"[^>]*?href="([^"]+)"[^>]*>([\s\S]*?)<\/Card>/g,
    (_, title, href, inner) => `- **[${title}](${href})** — ${inner.trim().replace(/\s+/g, ' ')}`);
  out = out.replace(/<Card\s+title="([^"]+)"[^>]*>([\s\S]*?)<\/Card>/g,
    (_, title, inner) => `- **${title}** — ${inner.trim().replace(/\s+/g, ' ')}`);

  // Steps → numbered bold headings.
  out = out.replace(/<Steps>([\s\S]*?)<\/Steps>/g, (_, inner) => {
    let n = 0;
    return inner
      .replace(/<Step\s+title="([^"]+)"[^>]*>/g, (_m, t) => `**${++n}. ${t}**\n`)
      .replace(/<\/Step>/g, '');
  });

  // CodeGroup wrappers: the fenced blocks inside stand on their own.
  out = out.replace(/<\/?CodeGroup[^>]*>/g, '');

  // Internal links → new paths (keep anchors). Links to pages that don't exist
  // in the new IA (e.g. openapi-generated endpoint pages) are unlinked — the
  // link text stays, the dead href goes.
  out = out.replace(/\[([^\]]*)\]\((\/[a-z0-9-/]+?)(#[^)]*)?\)/g, (m, text, p, anchor = '') => {
    const target = newUrl(p.replace(/\/$/, '').replace(/^\//, '')) || (p === '/' ? '/api/' : null);
    if (target) return `[${text}](${target}${anchor})`;
    console.warn(`  ! unmapped internal link ${p} in ${srcPath} — unlinked`);
    return text;
  });

  const leftover = out.match(/<[A-Z][A-Za-z]*[\s>]/g);
  if (leftover) console.warn(`  ! unconverted components in ${srcPath}: ${[...new Set(leftover)].join(' ')}`);

  return out.replace(/ {2,}\(/g, ' (').replace(/\n{3,}/g, '\n\n').trim();
}

const y = (s) => JSON.stringify(s == null ? '' : String(s));

// ── Clear previously-ported files (idempotent re-runs) ───────────────────────
for (const tab of ['help', 'docs', 'api', 'learn']) {
  const dir = path.join(REPO, 'content', tab);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (f.endsWith('.md') && fs.readFileSync(p, 'utf8').includes('source_url: "https://developers.openalex.org'))
      fs.unlinkSync(p);
  }
}

// ── Port ─────────────────────────────────────────────────────────────────────
const dispositions = [];
let ported = 0, redirected = 0;

for (const [p, m] of Object.entries(PAGES)) {
  const srcFile = path.join(SRC, `${p}.mdx`);
  if (!fs.existsSync(srcFile)) { console.error(`MISSING vendored source: ${p}.mdx`); process.exitCode = 1; continue; }

  if (m.redirect) {
    dispositions.push({ path: p, action: 'redirect', to: m.redirect, reason: m.reason });
    redirected++;
    continue;
  }

  const raw = fs.readFileSync(srcFile, 'utf8');
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const fmRaw = fmMatch ? fmMatch[1] : '';
  const get = (k) => (fmRaw.match(new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, 'm')) || [])[1] || '';
  const title = m.title || get('title') || p;
  const description = get('description');

  const body = transform(raw.slice(fmMatch ? fmMatch[0].length : 0), p);
  const tags = m.tab === 'learn' ? ['recipes', 'api'] : [p.split('/')[0] === 'download' ? 'downloads' : 'api'];

  const fm = [
    '---',
    `title: ${y(title)}`,
    description ? `description: ${y(description)}` : null,
    `tags: ${JSON.stringify(tags)}`,
    `source_id: ${y(p)}`,
    `source_url: ${y(`https://developers.openalex.org/${p === 'index' ? '' : p}`)}`,
    `source_updated: ${y(manifest[`${p}.mdx`] || '')}`,
    '---',
    '',
  ].filter((l) => l !== null).join('\n');

  fs.mkdirSync(path.join(REPO, 'content', m.tab), { recursive: true });
  fs.writeFileSync(path.join(REPO, 'content', m.tab, `${m.slug}.md`), fm + body + '\n');
  dispositions.push({ path: p, action: 'port', to: `/${m.tab}/${m.slug}/`, reason: '' });
  ported++;
}

// ── Audit table ──────────────────────────────────────────────────────────────
fs.writeFileSync(
  path.join(__dirname, 'mintlify-dispositions.tsv'),
  'path\taction\tnew_url\treason\n' +
    dispositions.map((d) => [d.path, d.action, d.to, d.reason].join('\t')).join('\n') + '\n'
);

// ── _redirects block (between markers, idempotent) ───────────────────────────
// Old dev-docs paths arrive here via the developers.openalex.org zone wildcard.
// Specific rules first, then safety wildcards for unenumerated paths (openapi-
// generated endpoint pages etc.).
// 'index' needs no rule: the old landing URL is '/', which the zone wildcard
// already lands on the new site home.
const rules = dispositions.filter((d) => d.path !== 'index').map((d) => `/${d.path}  ${d.to}  301`);
rules.push('/guides/*  /api/  301', '/api-reference/*  /api/  301', '/download/*  /docs/  301');

const BEGIN = '# >>> mintlify (generated by scripts/mintlify-port.mjs) >>>';
const END = '# <<< mintlify <<<';
const block = [BEGIN, ...rules, END].join('\n');
const redirectsPath = path.join(REPO, 'public', '_redirects');
let current = fs.readFileSync(redirectsPath, 'utf8');
current = current.includes(BEGIN)
  ? current.replace(new RegExp(`${BEGIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), block)
  : current.trimEnd() + '\n\n' + block + '\n';
fs.writeFileSync(redirectsPath, current);

// ── Summary ──────────────────────────────────────────────────────────────────
const byTab = {};
for (const d of dispositions) if (d.action === 'port') {
  const tab = d.to.split('/')[1];
  byTab[tab] = (byTab[tab] || 0) + 1;
}
console.log(`Pages: ${Object.keys(PAGES).length}`);
console.log(`  ported:     ${ported}  (${Object.entries(byTab).map(([k, v]) => `${k}:${v}`).join('  ')})`);
console.log(`  redirected: ${redirected}`);
console.log('Wrote scripts/mintlify-dispositions.tsv + _redirects mintlify block');
