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
// Idempotent: files are only rewritten when the upstream body actually changed
// (source_updated stamps the last *change*, not the last run).

import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://api.openalex.org/query/spec";
const MAILTO = "mailto=help-site-sync@openalex.org";
const TODAY = new Date().toISOString().slice(0, 10);

const ALPHA_NOTE = `> **Note:**
> The OpenAlex Query Language is in **alpha**. It may change without warning — build against it at your own risk, and [tell us what you think](mailto:support@openalex.org).`;

// One entry per page we publish. `body` builds the markdown body from the
// fetched artifact(s); the leading H1 is stripped (frontmatter title replaces it).
const PAGES = [
  {
    file: "content/docs/oql.md",
    slug: "guide",
    title: "OQL",
    description:
      "The OpenAlex Query Language — a readable walkthrough of what OQL is and how to write it.",
    body: (t) => stripH1(t),
  },
  {
    file: "content/docs/oql-cheatsheet.md",
    slug: "cheatsheet",
    title: "OQL cheat sheet",
    description: "The OQL one-pager: every construct with a copyable example.",
    body: (t) => stripH1(t),
  },
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
        .replaceAll("#reading-results-meta-x-query", "#reading-results-metax_query"),
  },
  {
    file: "content/docs/oql-spec.md",
    slug: "oql",
    title: "OQL specification",
    description:
      "The frozen normative specification of the OpenAlex Query Language (v2).",
    // The spec references sibling files in the elastic-api repo. Only the OQO
    // spec has a published counterpart here; de-link the rest (keep the code-
    // formatted text) so the page carries no broken relative links.
    body: (t) =>
      stripH1(t)
        .replaceAll("](./oqo-spec.md)", "](/docs/oqo-schema/)")
        .replace(/\[([^\]]+)\]\(\.\.?\/[^)]*\)/g, "$1"),
  },
  {
    file: "content/docs/oql-grammar.md",
    slug: "grammar",
    title: "OQL grammar",
    description:
      "The derived reference grammar of OQL in W3C-EBNF notation, with a railroad-diagram view.",
    body: (t) => `The grammar below is **derived from the OQL implementation** in W3C-EBNF notation, so it can't drift from what the engine actually parses. A visual [railroad-diagram rendering](https://api.openalex.org/query/spec/railroad) of the same grammar is also available.

\`\`\`ebnf
${t.trim()}
\`\`\`

See the [OQL specification](/docs/oql-spec/) for the normative prose and the [cheat sheet](/docs/oql-cheatsheet/) for examples.`,
  },
  {
    file: "content/docs/oqo-schema.md",
    slug: "oqo",
    title: "OQO schema",
    description:
      "The JSON Schema for OQO, the abstract-syntax-tree JSON format that OQL parses into.",
    json: true,
    body: (t) => `OQO (OpenAlex Query Objects) is the JSON abstract-syntax-tree format that [OQL](/docs/oql/) parses into — tools can construct or manipulate queries as OQO directly and skip string parsing entirely. The [OQL API](/api/oql/) accepts both. The JSON Schema:

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
  const body = p.body(raw).trim();
  const full = `${ALPHA_NOTE}\n\n${body}\n`;
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
