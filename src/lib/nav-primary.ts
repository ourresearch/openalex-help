// PRIMARY navigation (oxjob #750 Pass AM/AN): the left drawer/rail that
// replaced the horizontal two-level tab strip. ONE source shared by
// RailNav.astro (the drawer/rail itself), Base.astro's mobile menu,
// index.astro's homepage intro paragraphs, the [tab] landing ledes, and the
// breadcrumb icons.
//
// Two-layer drawer model: on Home (and the top-level Quickstart page) this
// renders fully EXPANDED; inside a tab the primary collapses to an icon RAIL
// (CSS driven by `html.in-tab`, see RailNav.astro) and the tab's own sections
// render in the secondary Sidebar. The per-tab section map lives separately in
// `nav.ts` (NAV_GROUPS).

export interface PrimaryTab {
  label: string;
  href: string;
  icon: string; // Icon.astro name (MDI glyph)
  group: 'top' | 'learn' | 'reference';
  // The tab landing's lede ([tab]/index.astro reads it via tabDesc()).
  desc: string;
  // Rail-tooltip one-liner (Pass AO: tooltips got their own SHORTER copy,
  // Jason's exact strings — no longer the same string as the landing lede).
  tip: string;
}

// Home + Quickstart sit above the two labeled clusters. Quickstart is a real
// top-level page at /quickstart/ (Pass AN — no longer a deep link into
// Tutorials). Then Learn, then Reference — the site's two-sided model (see
// CLAUDE.md). Labels are deliberately short: they set the drawer's width.
export const PRIMARY_TABS: PrimaryTab[] = [
  {
    label: 'Home',
    href: '/',
    icon: 'home-outline',
    group: 'top',
    desc: 'The Help Center front door: search, plus a map of everything here.',
    tip: 'Table of contents',
  },
  {
    label: 'Quickstart',
    href: '/quickstart/',
    icon: 'rocket-launch-outline',
    group: 'top',
    desc: 'Get real data out of OpenAlex in five minutes — on the website, through the API, or by asking your agent.',
    tip: 'Five-minute intro tutorial',
  },
  {
    label: 'How-to',
    href: '/how-to/',
    icon: 'help-circle-outline',
    group: 'learn',
    desc: 'Short, practical guides to the most common OpenAlex tasks.',
    tip: 'Short, simple answers',
  },
  {
    label: 'Tutorials',
    href: '/tutorials/',
    icon: 'human-male-board',
    group: 'learn',
    desc: 'Step-by-step instructions for real use cases — on the web, through the API, or with your agent.',
    tip: 'Longer, step-by-step guides',
  },
  {
    label: 'Access',
    href: '/access/',
    icon: 'tray-arrow-down',
    group: 'reference',
    desc: 'Every way in and out of OpenAlex — how to ask questions, how to get the data, what it costs, and how to fix what’s wrong.',
    tip: 'Getting data in and out',
  },
  {
    label: 'Data',
    href: '/data/',
    icon: 'shape-outline',
    group: 'reference',
    desc: 'What is in OpenAlex, where it comes from, and what every attribute means.',
    tip: 'Contents and construction',
  },
  {
    label: 'API',
    href: '/api/',
    icon: 'cog-outline',
    group: 'reference',
    desc: 'A fast, modern REST API for all of OpenAlex — plus OQL for more expressive queries. Free to start, no key required.',
    tip: 'Automated access',
  },
];

export const ROLE_LABELS: Record<PrimaryTab['group'], string> = {
  top: '',
  learn: 'Learn',
  reference: 'Reference',
};

/** The tab-overview lede for a primary destination. */
export function tabDesc(href: string): string {
  return PRIMARY_TABS.find((t) => t.href === href)?.desc ?? '';
}

/** Rail icon for a tab key ("how-to", "access", …) — used by breadcrumbs. */
export function iconForTab(tab: string): string | undefined {
  return PRIMARY_TABS.find((t) => t.href === `/${tab}/`)?.icon;
}

// Chat = the external conversation surfaces (each opens in a new tab). Ask AI is
// a small menu of assistant deep-links that prefill our docs as grounding; the
// rest are plain external links. (YouTube dropped from this list in Pass AN —
// Jason: it isn't a chat surface; videos will eventually embed in tutorials
// instead. In-content links to the channel stay.)
export const ASK_AI_PROMPT =
  'Answer my question using the OpenAlex documentation at https://help.openalex.org/ (machine index: https://help.openalex.org/llms.txt). My question: ';

export const ASK_AI_PROVIDERS = [
  { label: 'Claude', href: `https://claude.ai/new?q=${encodeURIComponent(ASK_AI_PROMPT)}` },
  { label: 'ChatGPT', href: `https://chatgpt.com/?q=${encodeURIComponent(ASK_AI_PROMPT)}` },
  { label: 'Perplexity', href: `https://www.perplexity.ai/search?q=${encodeURIComponent(ASK_AI_PROMPT)}` },
];

export const ASK_AI_DESC = 'Use your agent';

export interface ChatRow {
  title: string;
  href: string;
  icon: string;
  blurb: string;
}

export const CHAT_ROWS: ChatRow[] = [
  {
    title: 'Forum',
    href: 'https://groups.google.com/g/openalex-community',
    icon: 'forum-outline',
    blurb: 'Ask other users',
  },
  {
    title: 'Report Bug',
    href: 'https://openalex.org/contact',
    icon: 'bug-outline',
    blurb: 'Tell our team about errors',
  },
];

// Pinned at the bottom of the drawer — the jump to the actual OpenAlex app.
export const APP_LINK = {
  label: 'OpenAlex App',
  href: 'https://openalex.org',
  icon: 'open-in-new',
  blurb: 'Jump to openalex.org',
};

/** Active-tab test: Home matches only "/"; a tab matches its own subtree. */
export function isPrimaryActive(href: string, path: string): boolean {
  return href === '/' ? path === '/' : path.startsWith(href);
}
