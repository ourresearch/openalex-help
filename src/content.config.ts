import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared frontmatter schema for all four tabs.
// `synonyms` feeds the pagefind metadata index so jargon aliases are findable
// (e.g. "author disambiguation" should surface AER content).
// `source_*` fields are migration provenance (Zendesk article id/url, Mintlify path).
const article = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  synonyms: z.array(z.string()).default([]),
  source_id: z.string().optional(),
  source_url: z.string().optional(),
  source_updated: z.string().optional(),
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
  learn: makeCollection('learn'),
};
