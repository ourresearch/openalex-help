import type { APIRoute } from 'astro';
import raw from '../../content/quickstart.md?raw';

// Raw-markdown sibling for the top-level Quickstart page (/quickstart.md),
// matching the per-page .md twins every tab article gets. Quickstart lives
// outside the tab collections (oxjob #750 Pass AN), so it needs its own route.
export const GET: APIRoute = () => {
  const body = `# Quickstart\n\n${raw.replace(/^---[\s\S]*?---\s*/, '').trim()}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
