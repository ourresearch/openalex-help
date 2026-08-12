import type { APIRoute } from 'astro';
import { allEntries, TAB_OVERVIEW_SLUGS } from '../../lib/tabs';

// Per-page raw-markdown sibling routes: /help/foo -> /help/foo.md
// Serves the original source markdown (frontmatter stripped, title prepended)
// so agents get clean content without HTML parsing.
export async function getStaticPaths() {
  return (await allEntries())
    // Merged tab-overview articles serve their twin at /<tab>.md instead.
    .filter(({ tab, entry }) => TAB_OVERVIEW_SLUGS[tab] !== entry.id)
    .map(({ tab, entry }) => ({
      params: { tab, slug: entry.id },
      props: { entry },
    }));
}

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props;
  const body = `# ${entry.data.title}\n\n${(entry.body ?? '').trim()}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
