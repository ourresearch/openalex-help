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
export type NavItem = string | NavSubgroup;

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
      ],
    },
    {
      label: 'Community & events',
      desc: 'Webinars, office hours, and OpenAlex in the wild.',
      slugs: [
        'user-meeting',
        'webinars',
        'office-hours',
        'conferences-and-other-events',
        'openalex-in-the-news',
        'projects-using-openalex',
      ],
    },
  ],

  docs: [
    {
      label: 'Start here',
      desc: 'What OpenAlex is and how it all fits together.',
      slugs: [
        'about-the-data',
        'how-openalex-works',
        'openness-and-sustainability',
        'coverage-and-accuracy',
        'changelog',
      ],
    },
    {
      label: 'Works & metadata',
      desc: 'Where works come from and what their fields mean.',
      slugs: [
        'works',
        'work-types',
        'versions',
        'citations',
        'counts-by-year',
        'work-fields',
        'full-text-pdfs',
        'how-do-i-use-the-title-search-api',
      ],
    },
    {
      label: 'Authors & institutions',
      desc: 'Disambiguation, affiliations, and country assignment.',
      slugs: [
        'author-disambiguation',
        'affiliations',
      ],
    },
    {
      label: 'Sources & publishers',
      desc: 'Journals, repositories, and how we classify them.',
      slugs: [
        'sources',
        'journal-quality',
      ],
    },
    {
      label: 'Topics, metrics & aboutness',
      desc: 'Topics, keywords, FWCI, and other classifications.',
      slugs: [
        'aboutness',
        'topics',
        'keywords',
        'should-i-use-subfields-or-concepts-for-my-search',
        'how-do-you-classify-works-as-contributing-to-the-un-sdgs',
        'what-is-the-difference-between-topics-and-topic-share-in-openalex-enti',
        'field-weighted-citation-impact-fwci',
      ],
    },
    {
      label: 'Open Access',
      desc: 'How OA status, locations, and licenses are determined.',
      slugs: [
        'open-access-oa',
        'what-counts-as-an-open-access-location',
        'how-is-the-best-oa-location-determined',
        'what-is-an-oa-license',
        'what-does-oa-date-mean-and-how-is-it-determined',
        'what-do-the-host-type-values-publisher-and-repository-mean',
      ],
    },
    {
      label: 'Repositories',
      desc: 'Repository records, matching, and recommendations for IRs.',
      slugs: [
        'how-are-repository-records-matched-to-published-articles',
        'how-are-documents-located-from-repository-records',
        'when-i-look-at-my-repository-as-a-source-in-openalex-why-is-it-missing',
        {
          label: 'For repository managers',
          children: [
            'recommendation-for-irs-license-reporting',
            'recommendation-for-irs-version-reporting',
            'link-resolver-integrations',
          ],
        },
      ],
    },
    {
      label: 'Downloads & snapshot',
      desc: 'Snapshot, changefiles, and working with the data at scale.',
      slugs: [
        'downloading-openalex-data',
        {
          label: 'Snapshot',
          children: [
            'download-to-your-machine',
            'download-changefiles',
            'snapshot-data-format',
            'how-do-i-read-jsonl-files',
          ],
        },
        'openalex-cli',
      ],
    },
    {
      label: 'Unpaywall',
      desc: 'The Unpaywall dataset, extension, and integrations.',
      slugs: [
        'which-dois-does-unpaywall-cover',
        'how-do-i-make-the-unpaywall-extension-work-on-my-site',
        'why-does-the-unpaywall-plugin-say-this-paywalled-article-is-open-acces',
        'preventing-code-injection-using-text-from-unpaywall-safely',
        'unpaywall-change-notes',
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

/** A rendered sidebar row: a plain article link, or a chevron subgroup. */
export interface ResolvedItem {
  label: string;
  entry?: AnyEntry; // plain item's entry, or the subgroup's overview page
  children: AnyEntry[]; // non-empty only for subgroups
}

export interface ResolvedGroup {
  label: string;
  entries: AnyEntry[]; // flat, in nav order (accordions, landing cards, "first article")
  items: ResolvedItem[]; // nested, for the 3-level sidebar
}

/** All slugs a NavItem covers, in render order. */
function itemSlugs(item: NavItem): string[] {
  if (typeof item === 'string') return [item];
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
      } else {
        const entry = item.slug ? lookup(item.slug) : undefined;
        const children = item.children.map(lookup).filter((e): e is AnyEntry => Boolean(e));
        if (entry || children.length) items.push({ label: item.label, entry, children });
      }
    }
    const flat = items.flatMap((i) => [...(i.entry ? [i.entry] : []), ...i.children]);
    if (items.length) out.push({ label: g.label, entries: flat, items });
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
