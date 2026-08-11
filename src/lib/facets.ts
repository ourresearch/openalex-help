// Interface tags for Tutorials (oxjob #750).
//
// When Tutorials joined the shell template it was split on ONE axis — topic —
// which became the nav grouping (NAV_GROUPS.tutorials in nav.ts). The old
// multi-axis facet/filter machinery (Topic / Entity / Interface, with a
// filterable "bucket" list) is gone. All that survives is the **Interface**
// axis, shown as non-clickable tags under each tutorial's subtitle on its own
// page: how you do it — website, API, OQL, an agent, or the raw snapshot.
//
// Lives here (not in content frontmatter) keyed on the stable slug, same as
// nav.ts. A slug with no entry shows no tag.

export type InterfaceId = 'web' | 'api' | 'oql' | 'agents' | 'snapshot';

export const INTERFACE_LABELS: Record<InterfaceId, string> = {
  web: 'Web',
  api: 'API',
  oql: 'OQL',
  agents: 'Agents',
  snapshot: 'Snapshot',
};

// One tutorial can span several interfaces; most are a single surface.
// (Quickstart left this list when it became a top-level page — Pass AN.)
export const TUTORIAL_INTERFACES: Record<string, InterfaceId[]> = {
  // Slimmed to the worked-tutorial keepers (oxjob #750, Aug 2026) — the recipe-
  // shaped pages moved to How-to / Access; slugs are the shortened titles.
  'map-sdg-research': ['api'],
  'systematic-reviews': ['oql', 'web', 'api'],
  'journals-you-cite': ['api'],
  'find-collaborators': ['api'],
  'audit-a-profile': ['api'],
  'funder-portfolios': ['api'],
  'download-the-snapshot': ['snapshot'],
};

/** Interface tag labels for a tutorial slug, in canonical order. */
export function interfaceTagsFor(slug: string): string[] {
  return (TUTORIAL_INTERFACES[slug] ?? []).map((id) => INTERFACE_LABELS[id] ?? id);
}
