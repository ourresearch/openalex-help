import type { APIRoute } from 'astro';
import { TABS, allEntries, mdUrlFor, urlFor, TAB_OVERVIEW_SLUGS } from '../lib/tabs';

// Root llms.txt: one unified index across all five tabs (the Cursor pattern).
// Each line links the canonical page plus its raw-markdown sibling route.
export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL('https://help.openalex.org')).href.replace(/\/$/, '');
  const entries = await allEntries();
  // Keys must track lib/tabs.ts TABS — the stale `entities` key here rendered
  // a literal "## undefined" heading for the data tab (caught oxjob #750).
  const labels: Record<string, string> = { 'how-to': 'How-to', access: 'Access', data: 'Data', api: 'API', tutorials: 'Tutorials' };

  const sections = TABS.map((tab) => {
    const rows = entries
      .filter((e) => e.tab === tab)
      .map(({ tab, entry }) => {
        // Merged tab overviews (Pass AT) live ON the landing, twin at /<tab>.md.
        const merged = TAB_OVERVIEW_SLUGS[tab] === entry.id;
        const url = merged ? `/${tab}/` : urlFor(tab, entry);
        const md = merged ? `/${tab}.md` : mdUrlFor(tab, entry);
        return (
          `- [${entry.data.title}](${base}${url})` +
          (entry.data.description ? `: ${entry.data.description}` : '') +
          ` ([markdown](${base}${md}))`
        );
      });
    return `## ${labels[tab]}\n\n${rows.join('\n')}`;
  });

  const body = [
    '# OpenAlex Help',
    '',
    '> Unified help, documentation, API reference, and tutorials for OpenAlex,',
    '> the open catalog of the global research system.',
    '',
    'Every page on this site has a raw-markdown sibling: append `.md` to its path.',
    '',
    // Quickstart is a top-level page outside the tab collections (oxjob #750
    // Pass AN), so it gets a hand-written line here.
    `New here? Start with the [Quickstart](${base}/quickstart/): get real data out of`,
    `OpenAlex in five minutes ([markdown](${base}/quickstart.md)).`,
    '',
    // oxjob #1697: a coding agent with no key gets one for its user in one call.
    'No API key? An AI agent can get a free one for its user in one call:',
    '`POST https://api.openalex.org/api-keys` with `{"email": "<your user\'s email>"}`. We email the user a link,',
    `and the key works ($1 a day) once they click it. Details: [Authentication](${base}/api/authentication/#getting-a-key-for-your-user)`,
    `and [auth.md](${base}/auth.md).`,
    '',
    // oxjob #1686 (Jason 2026-10-15): record pages on openalex.org are a de facto API too
    // (#1689 server rendering, #1688 Markdown for Agents); point to the API as the better one.
    'Record pages on openalex.org are open to agents and scripts. Every OpenAlex ID is a URL',
    '(https://openalex.org/W2741809807) that returns the record as server-rendered HTML with schema.org',
    'JSON-LD, or as Markdown when you send `Accept: text/markdown`. Search and list pages on openalex.org',
    'are not served to scripts. The API has more data and is faster: the same record is',
    'https://api.openalex.org/works/W2741809807 (single-record lookups are free), and one call can fetch',
    `100 records by ID, or filter, search, group and page. Details: [Reading openalex.org pages](${base}/access/agents/#reading-openalexorg-pages).`,
    '',
    'Field and vocabulary semantics (what each entity is, where its records come from,',
    'what every attribute means, controlled-vocabulary definitions) are canonical under',
    '`/data/` — e.g. the works field dictionary at `/data/works/` and work types',
    'at `/data/work-types/`. The `/access/` pages cover access to OpenAlex in both directions —',
    'read access (querying, ways to get the data, pricing) and write access (fixing errors);',
    'the `/api/` pages cover endpoint mechanics (filtering,',
    'sorting, grouping, query syntax).',
    '',
    ...sections,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
