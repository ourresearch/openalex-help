import type { APIRoute } from 'astro';
import { allEntries, TAB_OVERVIEW_SLUGS } from '../lib/tabs';

// Raw-markdown twins for the MERGED tab-overview pages (oxjob #750 Pass AT):
// /data/ and /api/ render their overview article inline, so the article's .md
// sibling serves at /data.md and /api.md (matching the /quickstart.md shape).
export async function getStaticPaths() {
  return (await allEntries())
    .filter(({ tab, entry }) => TAB_OVERVIEW_SLUGS[tab] === entry.id)
    .map(({ tab, entry }) => ({ params: { tab }, props: { entry } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props;
  const body = `# ${entry.data.title}\n\n${(entry.body ?? '').trim()}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
