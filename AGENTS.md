## Content: `content/` is canonical

The migration generators (`scripts/migrate.mjs`, `scripts/mintlify-port.mjs`) are
**FROZEN** (oxjob #354 D01, 2026-07-28) and exit with an error if run. Edit
`content/*.md` directly — never regenerate. When renaming/merging articles, add
`public/_redirects` rules per changed slug — bare + trailing-slash only, **no `.md`-variant
rules** (settled policy, oxjob #354 2026-07-30) — and update `src/lib/nav.ts`.
**Never add rules after the WILDCARDS LAST section at the end of `_redirects`** — a CF
Pages bug silently drops rules when wildcard/splat rules sit early in the file (oxjob
#354, 2026-08-01). After any deploy that changes `_redirects`, verify every rule fires:
`python3 scripts/sweep-redirects.py public/_redirects https://<deploy>.openalex-help.pages.dev /tmp/sweep.tsv`
(expect FIRE-OK for all; FIRE-WRONG rows whose location == expected_target are fine —
that's the classifier on absolute external targets).

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
