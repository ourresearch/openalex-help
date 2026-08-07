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
  tags: z.array(z.string()).default([]),
  synonyms: z.array(z.string()).default([]),
  source_id: z.string().optional(),
  source_url: z.string().optional(),
  source_updated: z.string().optional(),
  // Help extended-FAQ stubs (oxjob #354 Pass R §7): a stub duplicates entity
  // provenance material by design, capped at ≤3 paragraphs, and points to the
  // canonical section for depth. A future lint can verify the target resolves.
  canonical: z.string().optional(),
});

const makeCollection = (dir: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./content/${dir}` }),
    schema: article,
  });

export const collections = {
  help: makeCollection('help'),
  docs: makeCollection('docs'),
  api: makeCollection('api'),
  data: makeCollection('data'),
  tutorials: makeCollection('tutorials'),
};
