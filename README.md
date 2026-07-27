# openalex-help

The unified OpenAlex docs + help site, served at **help.openalex.org**. Replaces
the Zendesk Guide knowledge base and the Mintlify dev docs
(developers.openalex.org) — one site, one Markdown corpus, four tabs:
**Help | Docs | API | Learn**.

Built with plain [Astro](https://astro.build), deployed on Cloudflare Pages
(auto-deploy on push to `main`). Search is [pagefind](https://pagefind.app),
indexed post-build. Design/build spec and decision records: oxjob #354.

## Principles

- **Agent-legible, agent-maintained.** Content is plain Markdown in `content/`;
  agents author and maintain it. Machine-readability plumbing ships with the
  site: root `/llms.txt`, plus a raw-markdown sibling for every page (append
  `.md` to any page path).
- **Help first.** Audience priority is nontechnical > semitechnical >
  technical; Help is tab #1.
- **Duplication with different shapes.** The same subject may appear in Docs
  (reference shape) and Help (task/FAQ shape); agents keep the shapes in sync.
  Don't hunt for the one true home per fact.
- **All redirects in one place.** `public/_redirects` is the single map for
  every legacy URL (old Zendesk `/hc/` paths and old Mintlify paths).

## Layout

```
content/
  help/     task-shaped, question-styled articles; nontechnical audience
  docs/     data-semantics explainers (Topics, FWCI, provenance, snapshot)
  api/      REST/OQL mechanics
  learn/    use-case recipes, tagged via frontmatter (not a linear course)
src/        Astro layouts, components, llms.txt + .md-route endpoints
public/     _redirects (THE legacy-URL map), _headers
```

Frontmatter: `title` (required), `description`, `tags`, `synonyms` (search
aliases — e.g. make "author disambiguation" find AER content), and
`source_id`/`source_url`/`source_updated` (migration provenance).

## Develop

```
npm install
npm run dev      # local dev server
npm run build    # astro build && pagefind --site dist
```
