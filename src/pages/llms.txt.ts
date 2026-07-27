import type { APIRoute } from 'astro';
import { TABS, allEntries, mdUrlFor, urlFor } from '../lib/tabs';

// Root llms.txt: one unified index across all four tabs (the Cursor pattern).
// Each line links the canonical page plus its raw-markdown sibling route.
export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL('https://help.openalex.org')).href.replace(/\/$/, '');
  const entries = await allEntries();
  const labels: Record<string, string> = { help: 'Help', docs: 'Docs', api: 'API', learn: 'Learn' };

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
    ...sections,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
