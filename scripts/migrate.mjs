#!/usr/bin/env node
// Zendesk KB → Markdown migration (oxjob #354).
//
// Reads the raw Help Center export (scripts/data/zendesk_kb_articles_raw.jsonl,
// 136 articles) plus the section lookup, applies a disposition (migrate to a
// tab / retire / redirect-out) to every article, converts the GitBook-era HTML
// body to clean Markdown, and writes:
//
//   content/<tab>/<slug>.md      — one file per migrated article, provenance frontmatter
//   scripts/dispositions.tsv     — audit table: every inventoried article + action + reason
//   scripts/redirects.generated  — _redirects fragment (old article URL → new path / target)
//   scripts/images-to-localize.tsv — GitBook proxy image URLs still referenced (localize later)
//
// The dispositions here ARE the reviewable per-article grind (ACCEPTANCE Test 2:
// migrated ∪ retired == inventory, one-line reason each). Section defaults set
// the baseline; OVERRIDES move individual articles across the Help/Docs line or
// mark cruft. Run: `node scripts/migrate.mjs` from the repo root. Idempotent —
// it clears migrated content dirs of previously-migrated files first.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '..');
const DATA = path.join(__dirname, 'data');

// ── Section → default disposition ────────────────────────────────────────────
// action: 'migrate' (needs tab), 'retire' (Zendesk/GitBook cruft, redirect to
// nearest topic), or 'redirect' (lives elsewhere now).
const SECTION_DEFAULTS = {
  'Hello':                      { action: 'migrate', tab: 'help' },
  'Welcome':                    { action: 'migrate', tab: 'help' },
  'Announcements':              { action: 'retire', reason: 'Zendesk default sample article' },
  'Community':                  { action: 'migrate', tab: 'help' }, // REVIEW: news/events — may belong on forum/blog, not docs
  'FAQ':                        { action: 'retire', reason: 'Zendesk default sample FAQ (not OpenAlex content)' },
  'How do I...?':               { action: 'migrate', tab: 'help' },
  'General':                    { action: 'migrate', tab: 'help' },
  'Reference':                  { action: 'migrate', tab: 'docs' },
  'Data':                       { action: 'migrate', tab: 'docs' },
  'Unpaywall':                  { action: 'migrate', tab: 'docs' },
  'Unsub':                      { action: 'redirect', target: 'https://docs.unsub.org/', reason: 'Unsub product docs live at docs.unsub.org (#669 supplies exact mapping)' },
  'Summarize research':         { action: 'migrate', tab: 'learn' },
  'Summarize research impacts': { action: 'migrate', tab: 'learn' },
  'Partnership development':    { action: 'migrate', tab: 'learn' },
  'Libraries':                  { action: 'migrate', tab: 'learn' },
  'Publishers':                 { action: 'migrate', tab: 'learn' },
};

// ── Per-article overrides (the hand-curated grind) ───────────────────────────
// Keyed by Zendesk article id. Each moves an article off its section default,
// with a reason. `review: true` flags a call I'm not sure of for Jason.
const OVERRIDES = {
  // — Hello section: real content, but the old KB landing is superseded —
  '24348257451671': { action: 'retire', reason: 'Old KB landing page — superseded by new site home hero' },
  '24396686889751': { action: 'migrate', tab: 'help', reason: 'About us — general audience' },
  '24397762024087': { action: 'migrate', tab: 'help', reason: 'Pricing — general audience' },

  // — General: pull the data-scope explainer into Docs —
  '27190301279127': { action: 'migrate', tab: 'docs', reason: 'Data-scope/coverage explainer — reference material' },
  // zd#8966 origin article stays in Help (it is a user how-to); content spring-cleaned separately.
  '27283405287319': { action: 'migrate', tab: 'help', reason: 'zd#8966 origin — claim/curate author profile how-to (SPRING-CLEAN: rewrite to rebuilt flow)', review: true },

  // — Reference: support-desk & explicitly-nontechnical items belong in Help —
  '27550505470999': { action: 'migrate', tab: 'help', reason: 'Support-ticket SLA — help-desk content' },
  '27190165185559': { action: 'migrate', tab: 'help', reason: 'Explicitly the non-technical explanation — Help audience' },
  '33835155110423': { action: 'migrate', tab: 'help', reason: 'OA curation-request rejections — user troubleshooting' },

  // — Data: user-facing "why is X wrong / how do I fix" troubleshooting → Help —
  '27204855162007': { action: 'migrate', tab: 'help', reason: 'Institution missing works — user troubleshooting' },
  '27282148869399': { action: 'migrate', tab: 'help', reason: 'Change alternate names — user how-to' },
  '29664482972183': { action: 'migrate', tab: 'help', reason: 'Fix wrong date field — user troubleshooting' },
  '27547114373271': { action: 'migrate', tab: 'help', reason: 'Closed-vs-OA labeling — user troubleshooting' },
  '27891614701207': { action: 'migrate', tab: 'help', reason: 'counts_by_year vs UI — user-facing discrepancy' },
  '29663215171479': { action: 'migrate', tab: 'help', reason: 'Cannot find publisher — user troubleshooting' },
  '27188355855639': { action: 'migrate', tab: 'help', reason: 'Repository records missing — user troubleshooting' },

  // — Community: the two heaviest are durable reference-ish; keep, flag rest —
  // (User Meeting 26KB, Webinars 52KB kept in Help; the 4 lighter news/events flagged review via section default)
};

// ── HTML → Markdown ──────────────────────────────────────────────────────────
const td = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
});
td.use(gfm);

const imagesToLocalize = [];

// Remote images vendored into public/images/zendesk/ (they die when the Zendesk
// Guide / GitBook space is retired). Keyed by a substring of the decoded URL.
const LOCAL_IMAGES = {
  'uploads%2FHk254kXRAMOIXVCYDDT9%2Fopenalex-overview-diagram.png': '/images/zendesk/openalex-overview-diagram.png',
  'uploads/Hk254kXRAMOIXVCYDDT9/openalex-overview-diagram.png': '/images/zendesk/openalex-overview-diagram.png',
};

// GitBook proxied images: src=https://ourresearch.gitbook.io/~gitbook/image?url=<ENCODED real url>&...
// Decode to the underlying file URL; swap known remote images (GitBook files,
// Zendesk article attachments) for the local copies in public/images/zendesk/;
// record anything still remote for later localization.
td.addRule('gitbookImage', {
  filter: 'img',
  replacement: (_content, node) => {
    let src = node.getAttribute('src') || '';
    const alt = node.getAttribute('alt') || '';
    const m = src.match(/[?&]url=([^&]+)/);
    if (src.includes('gitbook.io/~gitbook/image') && m) {
      try { src = decodeURIComponent(m[1]); } catch { /* keep proxy url */ }
    }
    const att = src.match(/\/hc\/article_attachments\/(\d+)/);
    if (att) src = `/images/zendesk/${att[1]}.png`;
    for (const [needle, local] of Object.entries(LOCAL_IMAGES)) {
      if (src.includes(needle)) { src = local; break; }
    }
    if (src.includes('gitbook') || src.includes('article_attachments')) imagesToLocalize.push(src);
    return src ? `![${alt}](${src})` : '';
  },
});

// ── Helpers ──────────────────────────────────────────────────────────────────
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['’"]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 70)
    .replace(/-+$/g, '');
}

function firstParagraph(md) {
  for (const block of md.split(/\n{2,}/)) {
    const t = block.trim();
    if (!t || t.startsWith('#') || t.startsWith('![') || t.startsWith('|')) continue;
    const plain = t.replace(/[*_`#>[\]]/g, '').replace(/\]\(.*?\)/g, '').replace(/\s+/g, ' ').trim();
    if (plain.length >= 20) return plain.length > 180 ? plain.slice(0, 177).trimEnd() + '…' : plain;
  }
  return '';
}

const y = (s) => JSON.stringify(s == null ? '' : String(s)); // YAML-safe scalar via JSON

// ── Load ─────────────────────────────────────────────────────────────────────
const sections = JSON.parse(fs.readFileSync(path.join(DATA, 'sections.json'), 'utf8'));
const articles = fs
  .readFileSync(path.join(DATA, 'zendesk_kb_articles_raw.jsonl'), 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((l) => JSON.parse(l));

// ── Clear previously-migrated files (idempotent re-runs) ─────────────────────
for (const tab of ['help', 'docs', 'api', 'learn']) {
  const dir = path.join(REPO, 'content', tab);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    // Only clear Zendesk-sourced files — Mintlify-ported files (mintlify-port.mjs)
    // also carry source_id and must survive this script's re-runs.
    if (f.endsWith('.md') && fs.readFileSync(p, 'utf8').includes('source_url: "https://help.openalex.org')) fs.unlinkSync(p);
  }
}

// ── Disposition + convert ────────────────────────────────────────────────────
const slugsByTab = {};
const dispositions = [];
let migrated = 0, retired = 0, redirected = 0;

for (const a of articles) {
  const section = sections[String(a.section_id)] || `section-${a.section_id}`;
  const def = SECTION_DEFAULTS[section] || { action: 'migrate', tab: 'help' };
  const ov = OVERRIDES[a.id] || {};
  const action = ov.action || def.action;
  const tab = ov.tab || def.tab || null;
  const reason = ov.reason || def.reason || `${section} → ${tab || action}`;
  const review = ov.review ? 'review' : '';

  const row = { id: a.id, section, title: a.title, action, tab: tab || '', slug: '', target: '', reason, review };

  if (action === 'migrate') {
    let slug = slugify(a.title);
    slugsByTab[tab] ||= new Set();
    let s = slug, n = 2;
    while (slugsByTab[tab].has(s)) s = `${slug}-${n++}`;
    slug = s;
    slugsByTab[tab].add(slug);
    row.slug = slug;

    // Hand-authored override (e.g. spring-cleaned articles) wins verbatim over
    // the raw→md conversion, so re-runs never clobber curated content.
    const overridePath = path.join(__dirname, 'overrides', `${a.id}.md`);
    if (fs.existsSync(overridePath)) {
      fs.mkdirSync(path.join(REPO, 'content', tab), { recursive: true });
      fs.writeFileSync(path.join(REPO, 'content', tab, `${slug}.md`), fs.readFileSync(overridePath, 'utf8'));
      row.review = row.review || 'curated';
      migrated++;
      dispositions.push(row);
      continue;
    }

    let body = td.turndown(a.body || '').replace(/\n{3,}/g, '\n\n').trim();
    const desc = firstParagraph(body);
    const labels = (() => { try { return JSON.parse((a.label_names || '[]').replace(/'/g, '"')); } catch { return []; } })();
    const tags = [...new Set([section.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), ...labels])]
      .filter((t) => t && t !== 'migrated-from-freshdesk');

    const fm = [
      '---',
      `title: ${y(a.title)}`,
      desc ? `description: ${y(desc)}` : null,
      `tags: ${JSON.stringify(tags)}`,
      `source_id: ${y(a.id)}`,
      `source_url: ${y(a.html_url)}`,
      `source_updated: ${y((a.updated_at || '').slice(0, 10))}`,
      '---',
      '',
    ].filter((l) => l !== null).join('\n');

    fs.mkdirSync(path.join(REPO, 'content', tab), { recursive: true });
    fs.writeFileSync(path.join(REPO, 'content', tab, `${slug}.md`), fm + body + '\n');
    migrated++;
  } else if (action === 'redirect') {
    row.target = ov.target || def.target || '';
    redirected++;
  } else {
    retired++;
  }
  dispositions.push(row);
}

// ── Write audit artifacts ────────────────────────────────────────────────────
const tsv = ['id\tsection\taction\ttab\tslug\ttarget\treview\treason\ttitle'];
for (const r of dispositions) {
  tsv.push([r.id, r.section, r.action, r.tab, r.slug, r.target, r.review, r.reason, r.title].join('\t'));
}
fs.writeFileSync(path.join(__dirname, 'dispositions.tsv'), tsv.join('\n') + '\n');

// _redirects fragment: /hc/en-us/articles/<id>-* → new path (301). We match the
// article id prefix so any old title-slug variant of the URL redirects.
const red = ['# Zendesk KB → new IA (generated by scripts/migrate.mjs — do not hand-edit this block)'];
for (const r of dispositions) {
  const from = `/hc/en-us/articles/${r.id}-*`;
  if (r.action === 'migrate') red.push(`${from}  /${r.tab}/${r.slug}/  301`);
  else if (r.action === 'redirect') red.push(`${from}  ${r.target}  301`);
  else red.push(`${from}  /help/  301   # retired: ${r.reason}`);
}
fs.writeFileSync(path.join(__dirname, 'redirects.generated'), red.join('\n') + '\n');

// Inject the Zendesk block into public/_redirects between markers (idempotent).
// The Mintlify 56-page rules live outside this block and are untouched.
const BEGIN = '# >>> zendesk-kb (generated by scripts/migrate.mjs) >>>';
const END = '# <<< zendesk-kb <<<';
const block = [BEGIN, ...red.slice(1), END].join('\n');
const redirectsPath = path.join(REPO, 'public', '_redirects');
let current = fs.readFileSync(redirectsPath, 'utf8');
if (current.includes(BEGIN)) {
  current = current.replace(new RegExp(`${BEGIN}[\\s\\S]*?${END}`), block);
} else {
  current = current.trimEnd() + '\n\n' + block + '\n';
}
fs.writeFileSync(redirectsPath, current);

const imagesTsv = path.join(__dirname, 'images-to-localize.tsv');
if (imagesToLocalize.length) {
  fs.writeFileSync(imagesTsv, 'remote_url\n' + [...new Set(imagesToLocalize)].join('\n') + '\n');
} else if (fs.existsSync(imagesTsv)) {
  fs.unlinkSync(imagesTsv);
}

// ── Summary ──────────────────────────────────────────────────────────────────
const byTab = {};
for (const r of dispositions) if (r.action === 'migrate') byTab[r.tab] = (byTab[r.tab] || 0) + 1;
console.log(`Articles: ${articles.length}`);
console.log(`  migrated:   ${migrated}  (${Object.entries(byTab).map(([k, v]) => `${k}:${v}`).join('  ')})`);
console.log(`  retired:    ${retired}`);
console.log(`  redirected: ${redirected}`);
console.log(`  images to localize: ${new Set(imagesToLocalize).size}`);
console.log(`  reviewed flags: ${dispositions.filter((r) => r.review).length}`);
console.log('Wrote scripts/dispositions.tsv, scripts/redirects.generated' + (imagesToLocalize.length ? ', scripts/images-to-localize.tsv' : ''));
