// Sidebar / topic grouping for the docs, api, and help tabs.
//
// Lives HERE (not in content frontmatter) as the one central nav map, keyed on
// slugs. (Historically also because the migration generators regenerated
// content/*.md — those are FROZEN as of 2026-07-28, oxjob #354 D01, but a
// central ordered map is still the right shape.)
//
// Groups render in the order given; slugs within a group render in the order
// given. Any slug not listed falls into a trailing "More" group (and the build
// logs a warning) so new articles can never silently vanish.
//
// THREE-LEVEL NAV (docs tab; approved oxjob #354 Pass 0): an entry in `slugs`
// may be either a plain slug (level 2) or a subgroup object
// `{ label, slug?, children }` (level 2 with chevron-expandable level-3
// children). `slug` optionally names the subgroup's own overview page, rendered
// as the first child link. (How-to joined the shell tabs in oxjob #750; its
// groups are all flat 2-level.)

export interface NavSubgroup {
  label: string;
  slug?: string; // optional overview page for the subgroup itself
  children: string[];
}
/** A static sidebar link to a non-article route (e.g. "Welcome" → the tab landing). */
export interface NavLink {
  label: string;
  href: string;
}
export type NavItem = string | NavSubgroup | NavLink;

export interface NavGroup {
  label: string;
  desc?: string; // one-liner for landing-page cards / accordions
  slugs: NavItem[];
}

export const NAV_GROUPS: Record<string, NavGroup[]> = {
  // Entities tab (oxjob #354 Pass R). Group overviews use the group's own
  // `slug` so the overview renders as the subgroup's first child. Slugs are
  // added here as their pages land during the grind; unmapped ones warn.
  data: [
    {
      // Pass W: renamed "Overview" → "Get started" for cross-tab consistency
      // (every reference tab opens with a Get started section, first page
      // "Overview"). The overview page still composes to "Entities Overview".
      label: '', // root-level rows — "Get started" dissolved tab-wide (Pass AR)
      // The Overview article renders ON the /data/ landing (Pass AT); this
      // static link keeps its drawer row. how-its-built moved in from Docs.
      slugs: [{ label: 'Overview', href: '/data/' }, 'how-its-built', 'common-attributes'],
    },
    {
      label: 'Native',
      desc: 'Entities where OpenAlex mints its own IDs and boundary judgments.',
      // Works is a subgroup (Jason 2026-08-07): the central entity gets child
      // pages — Citations, Open access (moved in from Docs), and Fields.
      slugs: [
        'native',
        { label: 'Works', slug: 'works', children: ['works/citations', 'works/open-access', 'works/corpus', 'works/attributes'] },
        // Authors is a subgroup (Jason 2026-08-19, oxjob #619): Overview (what
        // a profile is + attributes), Disambiguation (how profiles are built,
        // moved out of the overview's About), ORCID (new — the CNRS/Inist
        // questions showed it's asked about often enough to deserve a page).
        { label: 'Authors', slug: 'authors', children: ['authors/disambiguation', 'authors/orcid'] },
        // Sources is a subgroup (Jason 2026-08-08, Pass AC): Repositories moved
        // in from the Docs tab's dissolved "How it works" section, and the
        // attribute dictionary split onto a child page (works pattern).
        { label: 'Sources', slug: 'sources', children: ['sources/repositories', 'sources/attributes'] },
        'publishers',
        'funders',
        'awards',
        'institutions',
      ],
    },
    {
      label: 'Component',
      desc: 'Parts of a work without their own OpenAlex IDs.',
      slugs: ['component', 'authorships', 'locations', 'raw-affiliation-strings'],
    },
    {
      label: 'Aboutness',
      desc: 'What a work is about: topics, keywords, and classifications.',
      slugs: ['aboutness', 'sdgs', 'domains', 'fields', 'subfields', 'topics', 'keywords', 'concepts'],
    },
    {
      label: 'Vocabulary',
      desc: 'Consistent handles on things that already exist crisply.',
      slugs: [
        'vocabulary',
        'work-types',
        'source-types',
        'institution-types',
        'countries',
        'continents',
        'languages',
        'licenses',
        'indexes',
      ],
    },
    {
      label: 'User-created',
      desc: 'Things users mint, not OpenAlex.',
      slugs: ['user-created', 'collections', 'curations'],
    },
  ],

  // help (How-to, oxjob #752): ~12 consolidated task pages (noun/gerund H1s,
  // question H2s — the cursor.com/help pattern), grouped by topic. Replaced
  // the flat FAQ facet bucket (#354 Pass U) when 47 articles became 12 pages.
  'how-to': [
    {
      // Get started (oxjob #750): every tab opens with a "Get started" section
      // whose first page is "Overview" — the tab's own landing. Without this
      // the How-to landing had no drawer entry, so the nav drawer never showed
      // you were on it (Jason: the drawer should always tell you where you are).
      label: '', // root-level rows — "Get started" dissolved tab-wide (Pass AR)
      slugs: [{ label: 'Overview', href: '/how-to/' }],
    },
    // Six activity sections (Jason, Pass AR — his picks: no generic
    // "Using OpenAlex", no one-page sections, no ampersands in names).
    {
      label: 'Searching',
      desc: 'Finding IDs, common search recipes, and result-set questions.',
      slugs: ['finding-openalex-ids', 'searching', 'counting'],
    },
    {
      label: 'Working with data',
      desc: 'API patterns, getting data into other tools, and institution analysis.',
      slugs: ['api-recipes', 'integrations', 'analyzing-your-institution'],
    },
    {
      label: 'Fixing errors',
      desc: 'Fix authors and affiliations yourself; report everything else.',
      slugs: ['fixing-errors', 'fixing-authors', 'fixing-affiliations', 'fixing-data-errors', 'author-profile-privacy'],
    },
    {
      label: 'Sources',
      desc: 'Getting your works into OpenAlex and troubleshooting coverage.',
      slugs: ['getting-indexed', 'repositories'],
    },
    {
      label: 'Supporters',
      desc: 'The tools that come with an institutional plan.',
      slugs: ['supporter-tools', 'unsub'],
    },
    {
      label: 'General',
      desc: 'Getting help, getting involved, and citing OpenAlex.',
      slugs: ['support', 'getting-involved', 'citing-openalex'],
    },
  ],

  // Tutorials (oxjob #750): worked, end-to-end walkthroughs only. The bulk of
  // the old tutorials were really how-tos (short website/API recipes) and moved
  // to the How-to tab (oxjob #750, Aug 2026): the institution-analytics
  // walkthroughs consolidated into how-to/analyzing-your-institution; the API
  // grab-bag → how-to/api-recipes; count-citations + journal-coverage folded
  // into how-to/searching-and-counting; read-jsonl → access/snapshot;
  // unpaywall-extension → access/unpaywall; title-search-api deleted. What's
  // left are the substantial guided tutorials — slugs shortened to the tightened
  // titles (Jason: slug = the short title, easier to share/read).
  tutorials: [
    {
      // Get started: just the Overview (the tab landing) — Quickstart moved to
      // its own top-level page at /quickstart/ (oxjob #750 Pass AN).
      label: '', // root-level rows — "Get started" dissolved tab-wide (Pass AR)
      slugs: [{ label: 'Overview', href: '/tutorials/' }],
    },
    {
      label: 'Explore the literature',
      desc: 'Map a field, run a review, and rank the journals that matter.',
      slugs: [
        'map-sdg-research',
        'systematic-reviews',
        'journals-you-cite',
      ],
    },
    {
      label: 'Profiles & partners',
      desc: 'Find collaborators, audit a profile, and analyze a funder.',
      slugs: [
        'find-collaborators',
        'audit-a-profile',
        'funder-portfolios',
      ],
    },
    {
      label: 'Bulk data',
      desc: 'Work with the whole dataset on your own machine.',
      slugs: [
        'download-the-snapshot',
      ],
    },
  ],

  access: [
    {
      // Pass W (2026-08-06): the tab front door. "Overview" here is the /docs/
      // landing card page (former "Welcome"); the system how-it-works article
      // (slug `overview`) moved down to the "How it works" section.
      label: '', // root-level rows — "Get started" dissolved tab-wide (Pass AR)
      // Quick Start lives in Tutorials (its one canonical home, Jason
      // 2026-08-08); the sidebar cross-link was dropped in Pass AC — the
      // homepage card + tutorials list are enough.
      slugs: [
        { label: 'Overview', href: '/access/' },
      ],
    },
    // "How it works" dissolved (Jason 2026-08-08, Pass AC.2): `overview` →
    // Data > Get started > How it's built; `repositories` → Data > Sources;
    // `sustainability` absorbed into the Pricing overview.
    {
      // Pass W: Website subgroup moved out to "Get the data"; Querying is now
      // just the four query surfaces (all transpile to the same query object).
      label: 'Querying',
      desc: 'The ways to ask OpenAlex a question — all transpile to the same query object.',
      slugs: [
        'querying',
        'url',
        {
          label: 'OQL',
          slug: 'oql',
          children: [
            'oql-spec',
          ],
        },
        'oqo-schema',
      ],
    },
    {
      // Renamed from "Access" (oxjob #354 Pass R): tools AND bulk files are all
      // ways to *get* the data. Slug renames: openalex-cli→cli,
      // snapshot-updates→sync, content-archive→fulltext; snapshot absorbed
      // snapshot-access. Pass W: Website subgroup + Unpaywall moved in here —
      // both are ways people get our data. Renamed "Channels" → "Products"
      // (Jason 2026-08-15): the vocabulary people already know; agents is a
      // slight stretch but close enough.
      label: 'Products',
      desc: 'Every way to get the data — the website, a query, the CLI, an agent, the whole database, or Unpaywall.',
      slugs: [
        // Pass AC.2: product-picker overview page (skill/cost table).
        // Slug get-the-data → overview (Jason 2026-08-15); redirect kept.
        'overview',
        {
          label: 'Website',
          children: [
            'website-basic',
            'website-advanced',
          ],
        },
        'cli',
        'agents',
        'snapshot',
        'sync',
        'fulltext',
        'unpaywall',
      ],
    },
    {
      // Pass AC.2 (Jason 2026-08-08): the one canonical home for how paying
      // for OpenAlex works. Prices stay on openalex.org/pricing; this section
      // explains what you're buying. Absorbed docs/sustainability and the
      // stale help/pricing FAQ article (consulting services dropped).
      label: 'Pricing',
      desc: 'How paying for OpenAlex works — the free tier, pay-as-you-go, annual plans and their benefits, and the PDF sync add-on.',
      slugs: [
        'pricing',
        // 'example-costs' (oxjob #750): the rate card + worked cost examples,
        // moved out of the API Authentication page (which no longer handles
        // dollars). Linked from Authentication.
        'example-costs',
        'member',
        'member-plus',
        'partner',
        'legacy-plans',
        'buying-and-renewing',
      ],
    },
    {
      // Pass AD (Jason 2026-08-08; moved Data → Docs same day, Jason's call —
      // it's a cross-cutting how-to topic, not entity reference). The old
      // structured curation tools (Google Forms, works-magnet, curate/journals)
      // are all dead — the model is tickets processed by AI agents, plus two
      // self-serve lanes.
      label: 'Fixing errors',
      desc: 'How to report errors, fix them yourself, and get help.',
      // ai-curation-guide (Pass AL item 4): the judgment rules an agent must
      // read before curating affiliation matches — mined from our own bulk
      // cleanups. Sits right after the Affiliations page it backs.
      slugs: [
        'fixing-errors',
        'fixing-errors/works',
        'fixing-errors/authors',
        'fixing-errors/affiliations',
        'fixing-errors/ai-curation-guide',
      ],
    },
  ],

  api: [
    {
      // Pass W: renamed "Getting started" → "Get started" for cross-tab
      // consistency. First page `introduction` is titled "API Overview".
      // oxjob #750 (Jason): Quickstart deleted (folded into the one canonical
      // Tutorials Quick Start) and Key Concepts dissolved into the Overview;
      // Deprecations moved out to its own "Reference" section below (it isn't a
      // getting-started concern).
      label: '', // root-level rows — "Get started" dissolved tab-wide (Pass AR)
      // The Overview article (slug `introduction`) renders ON the /api/
      // landing (Pass AT); this static link keeps its drawer row.
      slugs: [
        { label: 'Overview', href: '/api/' },
        'authentication',
        'errors',
        'llm-quick-reference',
      ],
    },
    {
      label: 'Querying',
      desc: 'Filter, search, sort, group, and page through results.',
      slugs: [
        'filtering',
        'searching',
        'semantic-search',
        'sorting',
        'grouping',
        'paging',
        'selecting-fields',
        'get-single-entities',
        'autocomplete',
        'oql',
      ],
    },
    {
      // Per-entity API pages killed (oxjob #354 Pass R §5): entity semantics +
      // per-field capabilities live in the Entities tab. The API tab is
      // mechanics + this one-page endpoint index.
      label: 'Endpoints',
      desc: 'The full list of endpoints, each linking to its entity page.',
      slugs: ['endpoints'],
    },
    {
      // collections is a write API (CRUD on user.openalex.org), so its mechanics
      // stay in the API tab as a special endpoint (flagged for Jason's review).
      label: 'Curation & special',
      desc: 'Curation, collections, and special-purpose endpoints.',
      slugs: ['author-curation', 'collections', 'tag-aboutness'],
    },
    {
      // oxjob #750 (Jason): Deprecations doesn't belong in Get started — it's
      // not something you read while getting going. Its own trailing "Reference"
      // section keeps Get started clean.
      label: 'Reference',
      desc: 'Retired features and their replacements.',
      slugs: ['deprecations'],
    },
  ],
};

import type { AnyEntry } from './tabs';
import { iconForTab } from './nav-primary';

/** A rendered sidebar row: a plain article link, a static link, or a chevron subgroup. */
export interface ResolvedItem {
  label: string;
  entry?: AnyEntry; // plain item's entry, or the subgroup's overview page
  href?: string; // static link (e.g. "Welcome" → the tab landing)
  children: AnyEntry[]; // non-empty only for subgroups
}

export interface ResolvedGroup {
  label: string;
  desc?: string; // one-liner for landing-page cards / accordions
  entries: AnyEntry[]; // flat, in nav order (accordions, landing cards, "first article")
  items: ResolvedItem[]; // nested, for the 3-level sidebar
}

/** All slugs a NavItem covers, in render order. */
function itemSlugs(item: NavItem): string[] {
  if (typeof item === 'string') return [item];
  if ('href' in item) return []; // static links carry no article slugs
  return [...(item.slug ? [item.slug] : []), ...item.children];
}

/** Flat slugs of a group, in render order (e.g. "link to first article"). */
export function flatSlugs(g: NavGroup): string[] {
  return g.slugs.flatMap(itemSlugs);
}

/** Order a tab's entries into its NAV_GROUPS; unmapped entries go to "More". */
export function groupEntries(tab: string, entries: AnyEntry[]): ResolvedGroup[] {
  const groups = NAV_GROUPS[tab];
  if (!groups) return [{ label: '', entries, items: entries.map((e) => ({ label: e.data.title, entry: e, children: [] })) }];
  const bySlug = new Map(entries.map((e) => [e.id, e]));
  const seen = new Set<string>();
  const lookup = (slug: string): AnyEntry | undefined => {
    const entry = bySlug.get(slug);
    if (entry) seen.add(slug);
    else console.warn(`[nav] ${tab}: mapped slug not found in content: ${slug}`);
    return entry;
  };
  const out: ResolvedGroup[] = [];
  for (const g of groups) {
    const items: ResolvedItem[] = [];
    for (const item of g.slugs) {
      if (typeof item === 'string') {
        const entry = lookup(item);
        if (entry) items.push({ label: entry.data.title, entry, children: [] });
      } else if ('href' in item) {
        items.push({ label: item.label, href: item.href, children: [] });
      } else {
        const entry = item.slug ? lookup(item.slug) : undefined;
        const children = item.children.map(lookup).filter((e): e is AnyEntry => Boolean(e));
        if (entry || children.length) items.push({ label: item.label, entry, children });
      }
    }
    const flat = items.flatMap((i) => [...(i.entry ? [i.entry] : []), ...i.children]);
    if (items.length) out.push({ label: g.label, desc: g.desc, entries: flat, items });
  }
  const leftovers = entries.filter((e) => !seen.has(e.id));
  if (leftovers.length) {
    console.warn(`[nav] ${tab}: ${leftovers.length} unmapped entr(y|ies) -> "More": ${leftovers.map((e) => e.id).join(', ')}`);
    out.push({
      label: 'More',
      entries: leftovers,
      items: leftovers.map((e) => ({ label: e.data.title, entry: e, children: [] })),
    });
  }
  return out;
}

/** One breadcrumb: a link when a natural target exists, plain text otherwise.
 * The FIRST crumb carries the tab's rail icon (oxjob #750 Pass AN) so the
 * trail visually matches the icon rail. */
export interface Crumb {
  label: string;
  href?: string;
  icon?: string;
}

const TAB_LABELS: Record<string, string> = {
  'how-to': 'How-to',
  access: 'Access',
  data: 'Data',
  api: 'API',
  tutorials: 'Tutorials',
};

/** A group's natural landing: a leading static link (e.g. Welcome → /docs/),
 * else its first article. */
export function groupTarget(tab: string, g: NavGroup): string | undefined {
  const first = g.slugs[0];
  if (first && typeof first === 'object' && 'href' in first) return first.href;
  const slug = flatSlugs(g)[0];
  return slug ? `/${tab}/${slug}/` : undefined;
}

/** Display H1 for an article (oxjob #354 Pass S round 2): pages titled
 * "Overview" get their parent container's name prepended — "Querying Overview",
 * "OQL Overview" — since a bare "Overview" H1 (and <title>) carries no context.
 * The nav-drawer label stays the bare frontmatter title ("Overview").
 * Parent = the subgroup label for a subgroup's overview page, else the group
 * label when the page is the group's FIRST article (a true section overview);
 * the tab label stands in when the group is a catch-all ("Get(ting) started")
 * or shares the page's own title (entities' "Overview" group). */
export function displayTitleFor(tab: string, slug: string, title: string): string {
  if (title !== 'Overview') return title;
  for (const g of NAV_GROUPS[tab] ?? []) {
    for (const item of g.slugs) {
      if (!itemSlugs(item).includes(slug)) continue;
      if (typeof item === 'object' && !('href' in item)) {
        return item.slug === slug ? `${item.label} Overview` : title;
      }
      if (flatSlugs(g)[0] !== slug) return title; // mid-group page, not a section overview
      const catchAll = g.label === '' || g.label === 'Get started';
      const parent = catchAll || g.label === title ? (TAB_LABELS[tab] ?? tab) : g.label;
      return `${parent} Overview`;
    }
  }
  return title;
}

/** Breadcrumb trail for a tab LANDING page (Pass W): just the tab name, as
 * plain text — you are at the tab root, so there is nothing above it to link
 * to. Keeps the "every page has breadcrumbs, including the default page" rule. */
export function landingCrumbs(tab: string): Crumb[] {
  return [{ label: TAB_LABELS[tab] ?? tab, icon: iconForTab(tab) }];
}

/** Breadcrumb trail for an article page (oxjob #354 Pass S): Tab → group →
 * (subgroup, when the page sits inside one). The page's own title renders as
 * the H1 beneath the trail, so it is never a crumb. A crumb whose target IS
 * the current page renders as plain text instead of a self-link. */
export function breadcrumbsFor(tab: string, slug: string): Crumb[] {
  const here = `/${tab}/${slug}/`;
  const link = (label: string, href?: string): Crumb =>
    href && href !== here ? { label, href } : { label };
  const crumbs: Crumb[] = [
    { label: TAB_LABELS[tab] ?? tab, href: `/${tab}/`, icon: iconForTab(tab) },
  ];
  for (const g of NAV_GROUPS[tab] ?? []) {
    for (const item of g.slugs) {
      if (!itemSlugs(item).includes(slug)) continue;
      // Root-level pages (label-less group, Pass AR) get no group crumb.
      if (g.label) crumbs.push(link(g.label, groupTarget(tab, g)));
      if (typeof item === 'object' && !('href' in item)) {
        // Inside a subgroup: crumb for the parent, targeting its overview
        // page when it has one, else its first child.
        const target = item.slug ?? item.children[0];
        crumbs.push(link(item.label, target ? `/${tab}/${target}/` : undefined));
      }
      return crumbs;
    }
  }
  return crumbs;
}
