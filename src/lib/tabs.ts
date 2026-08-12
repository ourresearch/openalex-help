import { getCollection, type CollectionEntry } from 'astro:content';

// Order matches the header nav: practical (how-to, tutorials) then reference
// (access, data, api) — this ordering flows into llms.txt and search.
// Tab keys ARE the URL segments and the content/ dir names (oxjob #750:
// docs→access, help→how-to so every tab's route matches its label).
export const TABS = ['how-to', 'tutorials', 'access', 'data', 'api'] as const;
export type Tab = (typeof TABS)[number];

export type AnyEntry = CollectionEntry<Tab>;

/** All entries across the four tab collections, with their tab attached. */
export async function allEntries(): Promise<{ tab: Tab; entry: AnyEntry }[]> {
  const out: { tab: Tab; entry: AnyEntry }[] = [];
  for (const tab of TABS) {
    for (const entry of await getCollection(tab)) out.push({ tab, entry });
  }
  return out;
}

// Tab-overview articles MERGED into their tab landing (oxjob #750 Pass AT —
// Jason: "there's no ghost page for the ToC; it's one page"). These entries
// render inside /[tab]/ instead of getting their own /[tab]/<slug>/ route;
// their .md twin serves at /[tab].md.
export const TAB_OVERVIEW_SLUGS: Partial<Record<Tab, string>> = {
  data: 'overview',
  api: 'introduction',
};

export function urlFor(tab: Tab, entry: AnyEntry): string {
  return `/${tab}/${entry.id}/`;
}

export function mdUrlFor(tab: Tab, entry: AnyEntry): string {
  return `/${tab}/${entry.id}.md`;
}
