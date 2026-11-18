import type { APIRoute } from 'astro';
import raw from '../../content/security.md?raw';

// Raw-markdown sibling for the top-level Security page (/security.md), matching
// the .md twin every other page has. Security lives outside the tab collections
// (like Quickstart), so it needs its own route.
export const GET: APIRoute = () => {
  const body = `# Security\n\n${raw.replace(/^---[\s\S]*?---\s*/, '').trim()}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
