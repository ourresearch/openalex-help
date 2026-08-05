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
  help: [
    {
      label: 'Getting started',
      desc: 'What OpenAlex is, citing it, pricing, and the roadmap.',
      slugs: [
        'about-us',
        'where-can-i-find-a-non-technical-explanation-of-how-open-alex-works',
        'how-can-i-cite-openalex',
        'pricing',
        'what-is-openalexs-sustainability-model',
        'whats-on-openalexs-roadmap',
        'how-long-does-it-take-for-you-to-respond-to-support-tickets',
      ],
    },
    {
      label: 'Fixing errors & curation',
      desc: 'Correct author profiles, affiliations, OA status, and more.',
      slugs: [
        'fix-errors-in-openalex',
        'how-can-i-fix-errors-in-an-openalex-author-profile',
        'how-can-i-correct-institutional-affiliations-for-a-work',
        'how-can-i-fix-errors-in-an-openalex-source-profile',
        'how-can-i-correct-the-open-access-status-of-journals-in-unpaywall',
        'what-are-alternate-names-and-how-i-do-change-them',
        'why-are-my-open-access-curation-requests-getting-rejected',
        'why-is-the-date-field-wrong-and-how-can-i-fix-it',
        'why-is-this-publication-labeled-as-closed-when-it-is-clearly-open-acce',
        'why-does-the-unpaywall-plugin-say-this-paywalled-article-is-open-acces',
        'why-does-the-abstract-field-have-text-that-isnt-part-of-the-abstract',
        'i-think-my-institution-is-missing-works-in-openalex-what-can-i-do',
      ],
    },
    {
      label: 'Getting your content indexed',
      desc: 'Get your journal or repository into OpenAlex.',
      slugs: [
        'how-can-i-get-my-journal-indexed-in-openalex',
        'how-can-i-get-my-repository-indexed-in-openalex',
        'why-are-only-some-of-my-repository-records-showing-up-in-openalex',
        'why-cant-i-find-the-right-publisher-for-a-journal-in-openalex',
      ],
    },
    {
      label: 'Finding IDs & searching',
      desc: 'Find IDs and build sharper queries.',
      slugs: [
        'how-do-i-find-a-publications-openalex-work-id',
        'how-do-i-find-my-openalex-author-id',
        'how-do-i-find-the-openalex-source-id',
        'how-do-i-find-the-publisher-id-for-a-journals-host-organization',
        'how-do-i-find-the-most-cited-publications',
        'how-do-i-limit-my-results-to-only-the-top-100-cited-publications',
        'omit-retracted-works-from-my-analysis',
        'is-there-a-limit-to-the-length-of-queries-in-openalex',
        'where-can-i-find-information-about-which-issue-of-a-journal-an-article',
        'why-are-the-counts-by-year-numbers-different-than-what-i-see-in-the-us',
        'why-are-my-reference-counts-lower-than-expected',
        'why-are-some-authors-assigned-to-null-author-id',
      ],
    },
    {
      label: 'Using & exporting data',
      desc: 'Exports and downstream tools like VOSviewer.',
      slugs: [
        'export-results-from-the-openalex-website',
        'how-do-i-import-openalex-data-into-vosviewer',
        'link-resolver-integrations',
      ],
    },
    {
      label: 'For institutional supporters',
      desc: 'Activate your Member, Member+, or Partner benefits.',
      slugs: [
        'activate-your-admin-dashboard',
        'activate-the-affiliation-editor',
        'activate-unsub',
        'advisory-board-nominations',
        'quarterly-supporter-meetings',
      ],
    },
  ],

  docs: [
    {
      label: 'Get started',
      desc: 'What OpenAlex is and how it all fits together.',
      slugs: [
        { label: 'Welcome', href: '/docs/' },
        'quickstart',
        'overview',
      ],
    },
    {
      label: 'Works',
      desc: 'Where works come from and what their fields mean.',
      slugs: [
        'works',
        'work-types',
        'versions',
        'citations',
        'fwci',
        'counts-by-year',
        'work-fields',
      ],
    },
    {
      label: 'Entities',
      desc: 'The non-work entities: authors, institutions, sources, publishers.',
      slugs: [
        'author-disambiguation',
        'affiliations',
        'sources',
        'journal-quality',
      ],
    },
    {
      label: 'Aboutness',
      desc: 'Topics, keywords, and other classifications.',
      slugs: [
        'aboutness',
        'topics',
        'keywords',
        'sdg-classification',
      ],
    },
    {
      label: 'Open Access',
      desc: 'OA status and licenses, repositories, and Unpaywall.',
      slugs: [
        'open-access',
        'repositories',
        'unpaywall',
        // 'unpaywall-change-notes' — RETIRED 2026-08-05 (Jason): the change log
        // is ~5 years out of date, so we no longer share it publicly. The
        // article source is preserved at content/_retired/ (outside the build);
        // /docs/unpaywall-change-notes/ now redirects to /docs/unpaywall/.
      ],
    },
    {
      label: 'Query language (OQL)',
      desc: 'The OpenAlex Query Language — readable queries over everything.',
      slugs: [
        'oql',
        'oql-cheatsheet',
        {
          label: 'Reference',
          children: [
            'oql-spec',
            'oql-grammar',
            'oqo-schema',
          ],
        },
      ],
    },
    {
      label: 'Bulk data',
      desc: 'Snapshot, content archive, and CLI — the data in bulk.',
      slugs: [
        'bulk-data',
        {
          label: 'Snapshot',
          children: [
            'snapshot',
            'snapshot-updates',
            'snapshot-access',
          ],
        },
        'content-archive',
        'openalex-cli',
      ],
    },
  ],

  api: [
    {
      label: 'Getting started',
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
      label: 'Entities',
      desc: 'The entity endpoints: works, authors, sources, and more.',
      slugs: [
        'works',
        'authors',
        'sources',
        'institutions',
        'publishers',
        'funders',
        'topics',
        'keywords',
        'awards',
        'collections',
        'indexes',
        'concepts',
      ],
    },
    {
      label: 'Vocabularies',
      desc: 'Controlled vocabularies: types, countries, licenses, SDGs.',
      slugs: [
        'work-types',
        'source-types',
        'institution-types',
        'countries',
        'continents',
        'languages',
        'licenses',
        'domains',
        'fields',
        'subfields',
        'sdgs',
      ],
    },
    {
      label: 'Curation & special',
      desc: 'Curation endpoints and special-purpose APIs.',
      slugs: ['author-curation', 'tag-aboutness'],
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

/** The group label an entry belongs to (for article-page eyebrows). */
export function groupLabelFor(tab: string, slug: string): string | undefined {
  for (const g of NAV_GROUPS[tab] ?? []) {
    if (flatSlugs(g).includes(slug)) return g.label;
  }
  return undefined;
}
