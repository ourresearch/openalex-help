import { getCollection, type CollectionEntry } from 'astro:content';

export const TABS = ['help', 'docs', 'entities', 'api', 'tutorials'] as const;
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

export function urlFor(tab: Tab, entry: AnyEntry): string {
  return `/${tab}/${entry.id}/`;
}

export function mdUrlFor(tab: Tab, entry: AnyEntry): string {
  return `/${tab}/${entry.id}.md`;
}
