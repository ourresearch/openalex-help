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

// One tutorial can span several interfaces (Quick Start answers a question
// three ways); most are a single surface.
export const TUTORIAL_INTERFACES: Record<string, InterfaceId[]> = {
  quickstart: ['web', 'api', 'agents'],
  'analyze-a-funders-portfolio': ['api'],
  'audit-an-author-profiles-works': ['api'],
  'break-down-of-my-institutions-outputs-by-subject-area-subfield': ['web'],
  'check-if-a-journals-works-are-in-openalex': ['web'],
  'count-incoming-citations-to-any-results-set': ['web'],
  'estimate-the-apc-fees-my-institution-has-paid-to-make-research-open-ac': ['web'],
  'find-collaborators': ['api'],
  'find-most-cited-journals': ['api'],
  'how-many-of-each-type-of-output-does-my-institution-have': ['web'],
  'how-many-outputs-does-my-institution-have': ['web'],
  'how-much-is-my-institutions-work-cited': ['web'],
  'identify-other-institutions-that-collaborate-with-researchers-from-my': ['web'],
  'map-an-sdg-research-landscape': ['api'],
  'quick-api-recipes': ['api'],
  'track-open-access-trends': ['api'],
  'what-percentage-of-my-institutions-outputs-are-open-access-oa': ['web'],
  'which-journals-do-researchers-at-my-institution-publish-in': ['web'],
  'which-of-my-institutions-outputs-are-contributions-to-un-sustainable-d': ['web'],
  'systematic-reviews-with-oql': ['oql', 'web', 'api'],
  'download-to-your-machine': ['snapshot'],
  'how-do-i-read-jsonl-files': ['snapshot'],
  'how-do-i-use-the-title-search-api': ['api'],
  'how-do-i-make-the-unpaywall-extension-work-on-my-site': ['web'],
};

/** Interface tag labels for a tutorial slug, in canonical order. */
export function interfaceTagsFor(slug: string): string[] {
  return (TUTORIAL_INTERFACES[slug] ?? []).map((id) => INTERFACE_LABELS[id] ?? id);
}
