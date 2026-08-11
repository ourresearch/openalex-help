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
  sed'd together; no compatibility redirects kept (site was unlaunched).
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

## Two-layer nav drawer (oxjob #750 Pass AM)

The nav is a two-LAYER left drawer (M3 showcase / shadcn `collapsible="icon"`),
NOT a horizontal tab bar — that was the Pass AL predecessor, reverted here after
Jason's "I wanted a drawer, not a tab bar". The layers:

- **Primary** = `RailNav.astro` (a sticky left column, all pages), fed by the one
  shared source `src/lib/nav-primary.ts` (Home · Quick Start · Learn · Reference ·
  Chat · App). On Home it's a full **drawer**; inside a tab it collapses to an
  **icon rail** and hover/focus flyout-expands back to the drawer as an overlay.
- **Secondary** = `Sidebar.astro` (the active tab's `NAV_GROUPS` sections),
  rendered by `DocsShell.astro` inside `<main>`, i.e. to the RIGHT of the rail.
  Only present inside a tab.

Rules that matter when touching header/nav:

- **State is URL-derived, not client JS.** `Base.astro` sets `html.in-tab` when
  the path is under a content tab (`/how-to/ /tutorials/ /access/ /data/ /api/`);
  Home has no class. `global.css` maps that to `--primary-w` (the RESERVED rail
  column width): `--drawer-w` (15rem) on Home, `--rail-w` (3.5rem) in a tab.
  Switching tabs is just navigation — "collapse + open the secondary drawer"
  falls out of the next page rendering in the in-tab state.
- **The hover-flyout overflows its column as an overlay** (`z-index:5`, box-shadow,
  width→`--drawer-w`), so the reserved space never jumps. Collapsed-vs-expanded
  styling lives under `html.in-tab .rail:not(:hover):not(:focus-within)` in
  `RailNav.astro`.
- **`--nav-h` is now a single top-bar row** (`--navrow-h`, no `--subnav-h` — the
  old TOTAL-height dance is gone). Everything that offsets against the header
  (rail/sidebar top+height, scroll-padding) still keys off `--nav-h`.
- **`--drawer-w` is shared** by the primary drawer AND the secondary Sidebar
  (`DocsShell.astro`) — change it once. `--rail-w` is the collapsed width only.
- **Two breakpoints**, both at 900px: the rail hides (`RailNav.astro`) and the
  `.layout` grid collapses to one column (`Base.astro`), where the top-bar
  hamburger menu takes over. The search pill widens to 300px at ≥720px
  (`Search.astro`) — the top bar is just logo + search now, so it has room.
- **Adding a primary nav item** = edit `PRIMARY_TABS`/`CHAT_ROWS` in
  `nav-primary.ts` (with an `Icon.astro` MDI name); RailNav + the mobile menu +
  the homepage intro all read from there. Per-tab SECTIONS still live in
  `NAV_GROUPS` (`nav.ts`).

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
