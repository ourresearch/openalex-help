import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared frontmatter schema for all four tabs.
// `synonyms` feeds the pagefind metadata index so jargon aliases are findable
// (e.g. "author disambiguation" should surface AER content).
// `source_*` fields are migration provenance (Zendesk article id/url, Mintlify path).
const article = z.object({
  title: z.string(),
  description: z.string().optional(),
  // Hand-written one-liner shown as the subtitle row in the Recipes list
  // (oxjob #354 Pass W). Recipes get a bespoke subtitle explaining the recipe;
  // FAQ rows fall back to `description`.
  subtitle: z.string().optional(),
  // Card blurb for the task-tab landing index (How-to + Tutorials, oxjob
  // #750): deliberately NON-obvious — lead with the surprising or concrete
  // detail the title doesn't carry, not a restatement of it. Keep it ≤ ~90
  // chars so it stays under three lines on a 2-up card.
  card: z.string().optional(),
  tags: z.array(z.string()).default([]),
  synonyms: z.array(z.string()).default([]),
  source_id: z.string().optional(),
  source_url: z.string().optional(),
  source_updated: z.string().optional(),
  // REQUIRED (oxjob #637). The "Last updated" date shown at the foot of the article.
  // Hand-maintained: bump it when you edit the page. Required rather than
  // optional so a new page can't ship without one — the build fails and names
  // the file. Accepts a Date because YAML parses a bare `updated: 2026-08-16`
  // into one (a plain `z.string()` fails the build); quoted strings work too.
  // Normalized to `YYYY-MM-DD` for consumers either way.
  updated: z
    .union([
      z
        .string()
        .regex(
          /^\d{4}-\d{2}-\d{2}$/,
          'must be YYYY-MM-DD — the date you last edited this page'
        ),
      z.date(),
    ])
    .transform((v) => (typeof v === 'string' ? v : v.toISOString().slice(0, 10))),
  // Help extended-FAQ stubs (oxjob #354 Pass R §7): a stub duplicates entity
  // provenance material by design, capped at ≤3 paragraphs, and points to the
  // canonical section for depth. A future lint can verify the target resolves.
  canonical: z.string().optional(),
  // Data-tab entity pages (oxjob #354 Pass Z): structured metadata block under
  // the H1 — example ID, live count (fetched from the API at build), links-to.
  // All fields optional: component entities have only linksTo, user-created
  // entities only an (unlinked) example.
  entity: z
    .object({
      example: z.string().optional(), // shortest valid ID form, e.g. "W2741809807" or "countries/US"
      api: z.string().optional(), // api.openalex.org list path for the live count
      serp: z.string().optional(), // openalex.org path for serp + entity-page links (defaults to api)
      linksTo: z.array(z.string()).default([]), // "authors" or "works via authorships"
    })
    .optional(),
});

const makeCollection = (dir: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./content/${dir}` }),
    schema: article,
  });

export const collections = {
  'how-to': makeCollection('how-to'),
  access: makeCollection('access'),
  api: makeCollection('api'),
  data: makeCollection('data'),
  tutorials: makeCollection('tutorials'),
};
