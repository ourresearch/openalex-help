## This site is LIVE at help.openalex.org

It is the real, launched help center — not a staging rebuild. Pushes to `main`
auto-deploy to production and real users see them. Anything below describing an
"unlaunched" site is history about *when a change was made*, not a statement
about today.

## The site is two-sided: Learn vs Reference (oxjob #354)

Category vocabulary (Jason 2026-08-07; the Astro/MDN split). The split is reader
INTENT, not whether learning occurs:

- **Reference**: Access / Data / API — you know roughly what you're looking for
  and want to look it up. One reference work split across three tabs to keep each
  table of contents scannable. **Data** (renamed from Entities 2026-08-07 —
  everybody knows "data", not everybody knows "entity") = "what is this thing?"
  — the graph of ~20 connected entity types, organized by entity. **Access**
  (renamed from Docs 2026-08-09, oxjob #750) = access in both directions: read
  access (Querying, Get the data, Pricing) + write access (Fixing errors).
  **API** = wire mechanics + a one-page endpoints index.
- **Tab URL = tab label = content dir = collection key** (oxjob #750): routes
  `/how-to/ /tutorials/ /access/ /data/ /api/`. The old `/docs/*` and `/help/*`
  namespaces were renamed wholesale — content dirs git-mv'd, every internal
  link and the entire `_redirects` file (sources AND targets, chains intact)
  sed'd together; no compatibility redirects kept (the site had not launched
  *at that time* — 2026-08-09; it has since, so don't take this as licence to
  break URLs now).
  openalex-gui's `HELP_DOCS_BASE` (MembersPage.vue, PricingPageNewer.vue)
  points at `/access` — keep in sync if tabs move again.
- **Learn**: FAQ (extended FAQ of real user questions) / Tutorials (worked
  step-by-step walkthroughs) — you arrive with a question or a job and want to be
  led to the answer.
- **Chat** (homepage grouping only, not a tab side): Community Forum / Contact
  Support / Ask AI — the conversation surfaces.
- The site is MONOCHROME (category colors tried and dropped 2026-08-07). The
  grouping shows structurally: hairline dividers between the header tab groups
  (home | faq tutorials | docs data api) and labeled homepage columns.
- Routing for writers: "What is this thing?" → Data. "How does querying/pricing/bulk
  access/error-fixing work?" → Access. "Wire mechanics?" → API. "A question a real user asked?" → FAQ.
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

## Two-layer nav: permanent rail + secondary sidebar (oxjob #750 Pass AS)

The primary nav is a PERMANENT **M3-style rail** (`RailNav.astro`): big icons
with labels underneath, identical on every page — no expanded/collapsed
states, no hover flyout. The secondary layer is `Sidebar.astro` (the active
tab's `NAV_GROUPS` sections), rendered by `DocsShell.astro` inside `<main>`,
present only inside a tab.

Rules that matter when touching header/nav:

- **Rail destinations** come from `PRIMARY_TABS` in `nav-primary.ts` (Home ·
  Start · How-to · Tutorials · Access · Data · API) + `APP_LINK` pinned at the
  bottom; hairline dividers separate the three groups. **Labels must be ONE
  short word-ish** (they sit under the icon in a 5rem rail): "Start", "App".
  The **Chat surfaces are NOT in the rail** (Pass AS) — their one home is the
  homepage Chat paragraph (`index.astro`, incl. the Ask-AI provider popover).
- **Selected tab = blue pill on the ICON** (accent wash + accent glyph +
  accent label), matching the secondary drawer's blue selected row. Hover
  shows a **one-row tooltip** — just the `tip`/`blurb` description with a
  left spike pointing at the tab button (Pass AW dropped the bold tab name:
  the label already sits under the icon; external rows carry `data-tip-ext`
  → MDI open-in-new glyph beside the description).
- **`.rail` keeps `z-index: 5`.** Both the rail and the secondary Sidebar are
  sticky (each its own stacking context); without it the rail's fixed-position
  tooltip paints UNDER the sidebar no matter its own z-index.
- **Widths:** `--rail-w` 5rem (= `--primary-w`, reserved by Base's `.layout`
  grid on every page); `--sidebar-w` 15rem for the secondary Sidebar.
- **`--nav-h` is a single top-bar row** (`--navrow-h`): STATIC lockup left,
  **search pill top-right** (300px ≥720px). The lockup is composed live
  (tricon + Inter text) and reads "OpenAlex Help" on EVERY page (Pass AV —
  the "Help › ⟨Tab⟩" crumb and the Home-only "OpenAlex" are gone; Jason: too
  cute).
- **Two breakpoints**, both at 900px: the rail hides (`RailNav.astro`) and the
  `.layout` grid collapses to one column (`Base.astro`), where the top-bar
  hamburger menu takes over (same PRIMARY_TABS; no chat group).
- **Adding a rail item** = edit `PRIMARY_TABS` in `nav-primary.ts` (an
  `Icon.astro` MDI name, a one-word `label`, a `tip` for the tooltip, a `desc`
  for the tab-landing lede). Per-tab SECTIONS live in `NAV_GROUPS` (`nav.ts`);
  a **label-less group = root-level drawer rows** (no heading, no group crumb).
  Breadcrumbs open with the tab's rail icon (`iconForTab`).
- **Landings:** reference tabs render section PARAGRAPHS (bold linked lead +
  1–2 line desc); task tabs (How-to/Tutorials) render an ACCORDION (rows =
  "Page name: description" from `card`→`subtitle`→`description`). Cards are
  extinct sitewide (Pass AR). **Data + API have NO separate overview article**
  (Pass AT): `TAB_OVERVIEW_SLUGS` in `tabs.ts` renders `data/overview.md` /
  `api/introduction.md` ON the landing (article route + drawer row excluded;
  `.md` twin at `/data.md` / `/api.md`; llms.txt links the landing). These
  landings DO carry the right-rail "On this page" TOC from their overview's
  H2s (Pass AV — supersedes Pass AT's no-ToC note).
- **Column alignment contract (Pass AV):** DocsShell's `.content` top padding
  (1.5rem) equals the Sidebar's top padding, and the rail's `.rail-head`
  ("On this page", both article + landing templates) mirrors PageHeader's
  `.crumb-slot` height (1.66rem, flex-centered) — so the breadcrumbs, the
  sidebar's first row, and the rail label all sit on one line. The `.rail`
  sticky top is `calc(var(--nav-h) + 1.5rem)` to match. Change any of these
  metrics in ALL places together.

## ⚠️ EDIT A PAGE → BUMP ITS `updated:` DATE (oxjob #637)

Every article in `content/` carries a **required** `updated: YYYY-MM-DD` in its
frontmatter, and it renders as "Last updated &lt;date&gt;" at the foot of the page.
**It is hand-maintained. When you edit an article, set it to today's date —
in the same edit, not as a follow-up.** Nothing does this for you.

```yaml
---
title: "Authors"
updated: 2026-08-16     # ← bump this whenever you change the page
description: "…"
---
```

- **Required by the schema**, so a new page without one fails the build and
  names the file. Nothing catches a *stale* date on an edited page, though —
  that part is on you.
- **Use judgment, don't be mechanical.** It's a claim to the reader that the
  page is current as of that date. A real revision earns a bump; fixing a typo
  or renaming a file doesn't have to. This is exactly why it isn't derived from
  git — a commit log can't tell those apart. Don't rebuild an automatic
  git-based version of this (tried and removed 2026-08-16, Jason: "just do it
  the way a human would").
- **YAML parses a bare `updated: 2026-08-16` into a Date object, not a string**
  — that's why the schema is a `z.union([string, date])` with a transform, and
  why a plain `z.string()` there fails the build.
- **Rendering** (`LastUpdated.astro`): the build bakes in a UTC-pinned en-US
  string as the no-JS fallback, and an `is:inline` script re-renders it in the
  reader's locale from `navigator.languages` ("11 août 2026", "2026年8月11日").
  It builds the date as `new Date(y, m-1, d)` — `new Date('2026-08-11')` parses
  as UTC midnight and renders as the 10th for every reader behind Greenwich
  (verified in CT). Don't "simplify" that back. Keep the script `is:inline` and
  adjacent to the markup so it runs before first paint.

Only `[tab]/[...slug].astro` has an article foot — the Quickstart page and the
Data/API tab landings show no date.

## Content: `content/` is canonical

The migration generators (`scripts/migrate.mjs`, `scripts/mintlify-port.mjs`) are
**FROZEN** (oxjob #354 D01, 2026-07-28) and exit with an error if run. Edit
`content/*.md` directly — never regenerate. **Every content edit also bumps that
file's `updated:` frontmatter date** (see the section above). When
renaming/merging articles, add
`public/_redirects` rules per changed slug — bare + trailing-slash only, **no `.md`-variant
rules** (settled policy, oxjob #354 2026-07-30) — and update `src/lib/nav.ts`.
**Never add rules after the WILDCARDS LAST section at the end of `_redirects`** — a CF
Pages bug silently drops rules when wildcard/splat rules sit early in the file (oxjob
#354, 2026-08-01). After any deploy that changes `_redirects`, verify every rule fires:
`python3 scripts/sweep-redirects.py public/_redirects https://<deploy>.openalex-help.pages.dev /tmp/sweep.tsv`
(expect FIRE-OK for all; FIRE-WRONG rows whose location == expected_target are fine —
that's the classifier on absolute external targets). **Sweep the immutable per-deploy URL,
NOT the shared `openalex-help.pages.dev` alias:** right after a push the alias serves the
PREVIOUS deploy's `_redirects` from edge cache for a minute+, so freshly-changed rules show
false FIRE-WRONG (location = the OLD target). Grab the real URL from
`gh run view <run-id> --log | grep -oiE 'https://[a-z0-9]+\.openalex-help\.pages\.dev'` and
sweep that (oxjob #750, 2026-08-09). Also: when moving an article into a section of an
existing page, **retarget every inbound redirect DIRECTLY to the new `page/#anchor`** (no
double hops) — anchors are rehype-slug of the H2 (lowercase, punctuation stripped); verify
each `id="…"` exists in the built HTML before trusting the redirect.

## Search is hand-rolled on pagefind (oxjob #750)

`src/components/Search.astro` is the whole search feature — dialog, results, highlighting.
It uses the pagefind **JS API**, not `PagefindUI` (dropped 2026-08-09: it put the header tab
strip in every excerpt, marked every matched token wherever it appeared, and stacked
sub-results). Two rules matter outside that file:

- **A new page TYPE must carry `data-pagefind-body`** on its content element, or it silently
  disappears from search — once *any* page has that tag, pagefind indexes only tagged pages.
  Add `data-pagefind-meta={`eyebrow:${…}`}` too (the breadcrumb trail, flattened with ` › `);
  it renders as the result's eyebrow line. `data-pagefind-ignore` anything that's navigation
  rather than content — that's already on Breadcrumbs, the "View as Markdown" foot, and the
  landing card grid.
- **Assets only exist after a build.** `/pagefind/*` is produced by `pagefind --site dist`
  (wired into `npm run build`), so search cannot be tested on the dev server — use
  `npm run build && npx astro preview` instead. The dialog shows a dev-only note when the
  module fails to load.

Snippets and highlighting are deliberately ours, not pagefind's: we cut and score our own
excerpt window (whole phrase beats a lone term, prose beats a code sample, opens at a
sentence boundary) and highlight whole words only. Don't "simplify" back to `result.excerpt`.

Two traps found the hard way: an `IntersectionObserver` rooted **inside a top-layer
`<dialog>` never fires in Chrome** (infinite scroll uses a `scroll` listener), and a
`<dialog>` styled `display: flex` must scope it to `[open]` or it can't close.

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
