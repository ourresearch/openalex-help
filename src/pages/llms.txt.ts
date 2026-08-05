import type { APIRoute } from 'astro';
import { TABS, allEntries, mdUrlFor, urlFor } from '../lib/tabs';

// Root llms.txt: one unified index across all five tabs (the Cursor pattern).
// Each line links the canonical page plus its raw-markdown sibling route.
export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL('https://help.openalex.org')).href.replace(/\/$/, '');
  const entries = await allEntries();
  const labels: Record<string, string> = { help: 'Help', docs: 'Docs', entities: 'Entities', api: 'API', recipes: 'Recipes' };

  const sections = TABS.map((tab) => {
    const rows = entries
      .filter((e) => e.tab === tab)
      .map(
        ({ tab, entry }) =>
          `- [${entry.data.title}](${base}${urlFor(tab, entry)})` +
          (entry.data.description ? `: ${entry.data.description}` : '') +
          ` ([markdown](${base}${mdUrlFor(tab, entry)}))`,
      );
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
    'Field and vocabulary semantics (what each entity is, where its records come from,',
    'what every field means, controlled-vocabulary definitions) are canonical under',
    '`/entities/` — e.g. the works field dictionary at `/entities/works/` and work types',
    'at `/entities/work-types/`. The `/docs/` pages cover cross-cutting topics (querying,',
    'open access, getting the data); the `/api/` pages cover endpoint mechanics (filtering,',
    'sorting, grouping, query syntax).',
    '',
    ...sections,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
