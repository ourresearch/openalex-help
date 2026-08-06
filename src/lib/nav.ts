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
// as the first child link. Help stays a shallow 2-level accordion on purpose.

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
  entities: [
    {
      // Pass W: renamed "Overview" → "Get started" for cross-tab consistency
      // (every reference tab opens with a Get started section, first page
      // "Overview"). The overview page still composes to "Entities Overview".
      label: 'Get started',
      desc: 'What entities are and the fields they share.',
      slugs: ['overview', 'common-fields'],
    },
    {
      label: 'Native',
      desc: 'Entities where OpenAlex mints its own IDs and boundary judgments.',
      slugs: ['native', 'works', 'authors', 'sources', 'publishers', 'funders', 'awards', 'institutions'],
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

  // help (FAQ) has NO nav groups (oxjob #354 Pass U, 2026-08-06): it's a flat
  // bucket of real user questions, filtered by facet tags in facets.ts
  // (HELP_FACETS / HELP_CARD_FACETS) — the Recipes pattern. Article pages get a
  // single "FAQ" breadcrumb.

  docs: [
    {
      // Pass W (2026-08-06): the tab front door. "Overview" here is the /docs/
      // landing card page (former "Welcome"); the system how-it-works article
      // (slug `overview`) moved down to the "How it works" section.
      label: 'Get started',
      desc: 'What OpenAlex is and how to get going fast.',
      slugs: [
        { label: 'Overview', href: '/docs/' },
        'quickstart',
      ],
    },
    {
      // Pass W (2026-08-06): NEW section — how the dataset is built and the
      // shape of the data. `overview` moved here from Get started; repositories
      // + open-access moved here from the dissolved "Open access" group;
      // `sustainability` is a new page.
      label: 'How it works',
      desc: 'How OpenAlex is built — the pipeline, open access, repositories, and how it stays funded.',
      slugs: [
        'overview',
        'repositories',
        'sustainability',
        'open-access',
      ],
    },
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
      // both are ways people get our data.
      label: 'Get the data',
      desc: 'Every way to get the data — the website, a query, the CLI, an agent, the whole database, or Unpaywall.',
      slugs: [
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
  ],

  api: [
    {
      // Pass W: renamed "Getting started" → "Get started" for cross-tab
      // consistency. First page `introduction` is titled "API Overview".
      label: 'Get started',
      desc: 'Auth, errors, and your first request.',
      slugs: [
        'introduction',
        'quickstart',
        'key-concepts',
        'authentication',
        'errors',
        'deprecations',
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
  ],
};

import type { AnyEntry } from './tabs';

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

/** One breadcrumb: a link when a natural target exists, plain text otherwise. */
export interface Crumb {
  label: string;
  href?: string;
}

const TAB_LABELS: Record<string, string> = {
  help: 'FAQ',
  docs: 'Docs',
  entities: 'Entities',
  api: 'API',
  recipes: 'Recipes',
};

/** A group's natural landing: a leading static link (e.g. Welcome → /docs/),
 * else its first article. */
function groupTarget(tab: string, g: NavGroup): string | undefined {
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
      const catchAll = g.label === 'Get started';
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
  return [{ label: TAB_LABELS[tab] ?? tab }];
}

/** Breadcrumb trail for an article page (oxjob #354 Pass S): Tab → group →
 * (subgroup, when the page sits inside one). The page's own title renders as
 * the H1 beneath the trail, so it is never a crumb. A crumb whose target IS
 * the current page renders as plain text instead of a self-link. */
export function breadcrumbsFor(tab: string, slug: string): Crumb[] {
  const here = `/${tab}/${slug}/`;
  const link = (label: string, href?: string): Crumb =>
    href && href !== here ? { label, href } : { label };
  const crumbs: Crumb[] = [{ label: TAB_LABELS[tab] ?? tab, href: `/${tab}/` }];
  for (const g of NAV_GROUPS[tab] ?? []) {
    for (const item of g.slugs) {
      if (!itemSlugs(item).includes(slug)) continue;
      crumbs.push(link(g.label, groupTarget(tab, g)));
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
