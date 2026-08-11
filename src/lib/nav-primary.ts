// PRIMARY navigation (oxjob #750 Pass AM): the left drawer/rail that replaced
// the horizontal two-level tab strip. ONE source shared by RailNav.astro (the
// drawer/rail itself), Base.astro's mobile menu, and index.astro's homepage
// intro paragraphs.
//
// Two-layer drawer model: on Home this renders fully EXPANDED; inside a tab the
// primary collapses to an icon RAIL (CSS driven by `html.in-tab`, see
// RailNav.astro) and the tab's own sections render in the secondary Sidebar.
// The per-tab section map lives separately in `nav.ts` (NAV_GROUPS).

export interface PrimaryTab {
  label: string;
  href: string;
  icon: string; // Icon.astro name (MDI glyph)
  group: 'top' | 'learn' | 'reference';
}

// Home + Quick Start sit above the two labeled clusters. Quick Start is a deep
// link into Tutorials (the five-minute intro) — the site's front-door CTA, kept
// out of the Tutorials cluster on purpose. Then Learn, then Reference — the
// site's two-sided model (see CLAUDE.md).
export const PRIMARY_TABS: PrimaryTab[] = [
  { label: 'Home', href: '/', icon: 'home-outline', group: 'top' },
  { label: 'Quick Start', href: '/tutorials/quickstart/', icon: 'rocket-launch-outline', group: 'top' },
  { label: 'How-to', href: '/how-to/', icon: 'help-circle-outline', group: 'learn' },
  { label: 'Tutorials', href: '/tutorials/', icon: 'format-list-numbered', group: 'learn' },
  { label: 'Access', href: '/access/', icon: 'notebook-outline', group: 'reference' },
  { label: 'Data', href: '/data/', icon: 'shape-outline', group: 'reference' },
  { label: 'API', href: '/api/', icon: 'cog-outline', group: 'reference' },
];

export const ROLE_LABELS: Record<PrimaryTab['group'], string> = {
  top: '',
  learn: 'Learn',
  reference: 'Reference',
};

// Chat = the external conversation surfaces (each opens in a new tab). Ask AI is
// a small menu of assistant deep-links that prefill our docs as grounding; the
// rest are plain external links. Shapes carried verbatim from the old homepage
// Chat box (oxjob #750 Pass AL) so nothing about those surfaces changed.
export const ASK_AI_PROMPT =
  'Answer my question using the OpenAlex documentation at https://help.openalex.org/ (machine index: https://help.openalex.org/llms.txt). My question: ';

export const ASK_AI_PROVIDERS = [
  { label: 'Claude', href: `https://claude.ai/new?q=${encodeURIComponent(ASK_AI_PROMPT)}` },
  { label: 'ChatGPT', href: `https://chatgpt.com/?q=${encodeURIComponent(ASK_AI_PROMPT)}` },
  { label: 'Perplexity', href: `https://www.perplexity.ai/search?q=${encodeURIComponent(ASK_AI_PROMPT)}` },
];

export interface ChatRow {
  title: string;
  href: string;
  icon: string;
  blurb: string;
}

export const CHAT_ROWS: ChatRow[] = [
  {
    title: 'Community Forum',
    href: 'https://groups.google.com/g/openalex-community',
    icon: 'forum-outline',
    blurb: 'Discuss with other users',
  },
  {
    title: 'Report an Issue',
    href: 'https://openalex.org/contact',
    icon: 'email-outline',
    blurb: 'Bugs and data errors',
  },
  {
    title: 'YouTube',
    href: 'https://www.youtube.com/@openalex',
    icon: 'youtube',
    blurb: 'Tutorials and town halls',
  },
];

// Pinned at the bottom of the drawer — the jump to the actual OpenAlex app.
export const APP_LINK = { label: 'OpenAlex App', href: 'https://openalex.org', icon: 'open-in-new' };

/** Active-tab test: Home matches only "/"; a tab matches its own subtree. */
export function isPrimaryActive(href: string, path: string): boolean {
  return href === '/' ? path === '/' : path.startsWith(href);
}
