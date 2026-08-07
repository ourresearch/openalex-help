## The site is two-sided: Learn vs Reference (oxjob #354)

Category vocabulary (Jason 2026-08-07; the Astro/MDN split). The split is reader
INTENT, not whether learning occurs:

- **Reference**: Docs / Data / API — you know roughly what you're looking for
  and want to look it up. One reference work split across three tabs to keep each
  table of contents scannable. **Data** (renamed from Entities 2026-08-07 —
  everybody knows "data", not everybody knows "entity") = "what is this thing?"
  — the graph of ~20 connected entity types, organized by entity. **Docs** =
  cross-cutting topics (querying, getting the data). **API** = wire mechanics +
  a one-page endpoints index.
- **Learn**: FAQ (extended FAQ of real user questions) / Tutorials (worked
  step-by-step walkthroughs) — you arrive with a question or a job and want to be
  led to the answer.
- **Chat** (homepage grouping only, not a tab side): Community Forum / Contact
  Support / Ask AI — the conversation surfaces.
- The site is MONOCHROME (category colors tried and dropped 2026-08-07). The
  grouping shows structurally: hairline dividers between the header tab groups
  (home | faq tutorials | docs data api) and labeled homepage columns.
- Routing for writers: "What is this thing?" → Data. "How does querying/OA/bulk
  access work?" → Docs. "Wire mechanics?" → API. "A question a real user asked?" → FAQ.
  "A worked walkthrough?" → Tutorials. NOT "FAQ = nontechnical, docs = technical".

### Entity pages

- Every entity page follows the template in `content/data/authors.md`: intro (what it
  is + ID form + a live example link) → `## About` (fixed heading/anchor
  `#about`; renamed from "How it's made"→"About" 2026-08-07, was "How we build it":
  provenance, judgment calls, failure modes; where the old deep-dive pages live
  now) → `## Attributes` (renamed from Fields 2026-08-07 to avoid colliding with the
  aboutness Fields entity; one ``### `field` `` per top-level API field; common
  attributes get a one-liner + link to `/data/common-attributes/`) → `## In the API`.
  Exception: **works** is a subgroup (Jason 2026-08-07) — overview at
  `content/data/works.md`, with child pages `works/citations.md`,
  `works/open-access.md` (moved in from Docs), and `works/attributes.md` (the
  dictionary; `check-entity-fields.mjs` reads it via its `page` override).
  Vocabulary pages add a `## Values` section (the controlled list).
- **Field dictionaries are gated, not hand-trusted.** `scripts/check-entity-fields.mjs`
  compares each page's ``### `field` `` headings against live API object keys +
  `/properties`. Run `node scripts/check-entity-fields.mjs [slug…]` after touching a
  attribute dictionary; **0 drift is a gate**. Component entities (authorships/locations/
  raw-affiliation-strings) are intentionally NOT in its config — they document the
  work-embedded object shape, not a list-endpoint row.
- Native vs. vocabulary framing (put in copy where it helps trust): **native** entities
  (W/A/S…) encode OpenAlex judgment calls about fuzzy real-world boundaries (curatable);
  **vocabulary** entities are consistent handles on crisply-existing things (no judgment).

## Content: `content/` is canonical

The migration generators (`scripts/migrate.mjs`, `scripts/mintlify-port.mjs`) are
**FROZEN** (oxjob #354 D01, 2026-07-28) and exit with an error if run. Edit
`content/*.md` directly — never regenerate. When renaming/merging articles, add
`public/_redirects` rules per changed slug — bare + trailing-slash only, **no `.md`-variant
rules** (settled policy, oxjob #354 2026-07-30) — and update `src/lib/nav.ts`.
**Never add rules after the WILDCARDS LAST section at the end of `_redirects`** — a CF
Pages bug silently drops rules when wildcard/splat rules sit early in the file (oxjob
#354, 2026-08-01). After any deploy that changes `_redirects`, verify every rule fires:
`python3 scripts/sweep-redirects.py public/_redirects https://<deploy>.openalex-help.pages.dev /tmp/sweep.tsv`
(expect FIRE-OK for all; FIRE-WRONG rows whose location == expected_target are fine —
that's the classifier on absolute external targets).

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
