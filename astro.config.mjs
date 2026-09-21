// @ts-check
import { defineConfig } from 'astro/config';
import remarkCallouts from './src/lib/remark-callouts.mjs';

export default defineConfig({
  site: 'https://help.openalex.org',
  markdown: {
    remarkPlugins: [remarkCallouts],
    shikiConfig: {
      // Light-mode only for now (dark support removed 2026-08-04, oxjob #354).
      theme: 'github-light',
    },
  },
});
