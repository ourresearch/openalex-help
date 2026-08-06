#!/usr/bin/env node
// Sync the OQL/OQO query-language docs from their canonical home in
// openalex-elastic-api (served read-only at api.openalex.org/query/spec/<slug>,
// oxjob #361/#530) into this site's content/ tree (oxjob #354 Pass J).
//
// UNLIKE migrate.mjs / mintlify-port.mjs (which are FROZEN because content/ is
// canonical for their pages), THIS script is meant to be re-run: for the OQL
// pages, elastic-api is the source of truth — they must never drift from the
// engine. Do not hand-edit the files it writes (marked generated: true);
// change the artifacts in openalex-elastic-api/docs/ instead, then re-run:
//
//   node scripts/sync-query-docs.mjs
//
// NOTE (2026-08-05, oxjob #354 Access reorg): content/docs/oql.md (the OQL
// Overview) is now HAND-MAINTAINED — an editorial synthesis of the upstream
// guide + cheatsheet artifacts — and is deliberately NOT in PAGES below. When
// the upstream artifacts change, port relevant changes into it by hand.
//
// NOTE (2026-08-05, oxjob #354 Pass S): content/docs/oql-spec.md is ALSO
// hand-maintained now — a user-facing editorial rendering of the upstream spec
// + grammar artifacts (de-numbered headings, internal provenance refs purged).
// Port upstream spec/grammar changes into it by hand; the elastic-api artifact
// remains the internal/normative original.
//
// Alpha-status banners were removed for OQL GA (Pass S, 2026-08-05) — don't
// reintroduce them here.
//
// Idempotent: files are only rewritten when the upstream body actually changed
// (source_updated stamps the last *change*, not the last run).

import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://api.openalex.org/query/spec";
const MAILTO = "mailto=help-site-sync@openalex.org";
const TODAY = new Date().toISOString().slice(0, 10);

// One entry per page we publish. `body` builds the markdown body from the
// fetched artifact(s); the leading H1 is stripped (frontmatter title replaces it).
const PAGES = [
  {
    file: "content/api/oql.md",
    slug: "api",
    title: "OQL API",
    description:
      "Executing and translating OQL over HTTP — endpoints, query formats, and reading results.",
    body: (t) =>
      stripH1(t)
        .replaceAll("https://api.openalex.org/query/spec/schema", "/docs/oqo-schema/")
        // upstream anchor doesn't survive this site's heading slugger
        .replaceAll("#reading-results-meta-x-query", "#reading-results-metax_query")
        // OQL went GA (Pass S): strip the upstream alpha framing
        .replace(/treat exact field-level details as[\s>]+alpha, like the rest of OQL\./, "treat exact field-level details as\n> subject to change.")
        .replace("OQL and its API are in alpha and under active development", "OQL and its API are under active development"),
  },
  {
    file: "content/docs/oqo-schema.md",
    slug: "oqo",
    title: "OQO",
    description:
      "OQO (OpenAlex Query Objects) — the machine-readable JSON twin of OQL, built for agents and tools, with its JSON Schema.",
    json: true,
    body: (t) => `OQO (OpenAlex Query Objects) is the machine-readable twin of [OQL](/docs/oql/): the same queries, expressed as JSON data instead of text.

Every OQL query parses into an OQO object, and every OQO object renders back to canonical OQL — two views of one query. The difference is the audience. **OQL is built for humans**: you can read it aloud, type it in the search box, and paste it in an email. **OQO is built for machines — and especially for AI agents.** A JSON tree with a published schema is much easier for software to get right than a string: nothing to quote or escape, no parsing, and a query can be constructed, validated, and modified field by field.

Use OQO when:

- **An agent is writing the query.** Generating valid JSON against a schema is the thing agents are best at; generating a novel query *language* invites syntax errors. Agents can validate an OQO object against the schema below before ever sending it.
- **A tool is building or rewriting queries** — query builders, saved-search editors, anything that manipulates queries programmatically.
- **Queries are data** in your system — stored, versioned, diffed, or transformed.

The [OQL API](/api/oql/) accepts either form and returns the canonical OQO for any query in \`meta.x_query\`, so you can always convert between the two by round-tripping. The JSON Schema:

\`\`\`json
${JSON.stringify(JSON.parse(t), null, 2)}
\`\`\``,
  },
];

function stripH1(text) {
  return text.replace(/^# .*\n+/, "").trim();
}

function esc(s) {
  return s.replaceAll('"', '\\"');
}

async function fetchArtifact(slug) {
  const res = await fetch(`${BASE}/${slug}?${MAILTO}`);
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
  return await res.text();
}

// Body-compare against the existing file so source_updated only moves when
// content moves.
function existingBody(path) {
  if (!existsSync(path)) return null;
  const s = readFileSync(path, "utf8");
  const m = s.match(/^---\n[\s\S]*?\n---\n/);
  return m ? s.slice(m[0].length) : s;
}

let changed = 0;
for (const p of PAGES) {
  const raw = await fetchArtifact(p.slug);
  const extras = await Promise.all((p.extraSlugs ?? []).map(fetchArtifact));
  const body = p.body(raw, extras).trim();
  const full = `${body}\n`;
  const out = resolve(ROOT, p.file);
  if (existingBody(out) === full) {
    console.log(`unchanged: ${p.file}`);
    continue;
  }
  const fm = `---
title: "${esc(p.title)}"
description: "${esc(p.description)}"
tags: ["oql"]
generated: true
source_id: "query-spec/${p.slug}"
source_url: "https://api.openalex.org/query/spec/${p.slug}"
source_updated: "${TODAY}"
---
`;
  writeFileSync(out, fm + full);
  console.log(`wrote: ${p.file}`);
  changed++;
}
console.log(`${changed} file(s) changed.`);
