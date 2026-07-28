// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://help.openalex.org',
  markdown: {
    shikiConfig: {
      // Light/dark pair: Shiki emits both themes via CSS variables; the
      // .dark / prefers-color-scheme rules in global.css flip them.
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
