---
title: "Expansion corpus"
updated: 2026-08-12
description: "OpenAlex works come in two corpora — the curated core and a larger expansion (formerly 'XPAC'). What's in each, why the expansion is opt-in, and how to select core / expansion / all in the REST API and OQL."
tags: ["reference"]
synonyms: ["xpac", "expansion pack", "corpus", "include_xpac", "is_xpac", "core corpus", "expansion corpus"]
---
OpenAlex's works come in two **corpora**. The **core** is the curated catalog most people mean by "OpenAlex" — more than 320 million works built and matched from Crossref, MAG, PubMed, DataCite, and other trusted sources. The **expansion** is a larger, rawer layer of about 190 million additional works — mostly datasets and single-repository records that don't match anything already in the core. Together they're the **all** corpus: over 510 million works.

The expansion was added in the November 2025 [Walden](https://blog.openalex.org/openalex-rewrite-walden-launch/) update, and for a while carried the name **XPAC** ("Expansion Pack"). You'll still see "XPAC" in older docs, blog posts, and the [`is_xpac`](/data/works/attributes/#is_xpac) field name — it means exactly this expansion corpus.

> **The one thing to know:** by default you only see the **core**. Every works query excludes the expansion unless you ask for it, so if a count looks surprisingly low (or suddenly doubles), the corpus is usually why.

## Core, expansion, all

Think of it as three views over the same pile of works:

| Corpus | What it is | Approx. size |
|--------|-----------|--------------|
| **core** | The curated catalog. **This is the default.** | 320M+ works |
| **expansion** | The added layer — mostly datasets & repository records (the former "XPAC") | ~190M works |
| **all** | Core + expansion together | 510M+ works |

The corpus selector applies to **works only** — the other entity types have no expansion, so selecting one there does nothing.

## In the REST API

The default is **core**. Pick a different view with the `corpus` parameter on any works request:

```bash
# Core only (default) — ~320M works
curl "https://api.openalex.org/works"

# All works, core + expansion — ~510M works
curl "https://api.openalex.org/works?corpus=all"

# Only expansion works
curl "https://api.openalex.org/works?corpus=expansion"
```

`corpus` composes with everything else — `?filter=has_abstract:true&corpus=all` counts abstracts across both corpora. It's a works-only parameter; the other entity types reject it like any unsupported parameter. Each work also carries an [`is_xpac`](/data/works/attributes/#is_xpac) boolean, so on a `corpus=all` request you can still tell which results came from the expansion.

> **Deprecated legacy controls:** older docs and code express the same choice with `include_xpac=true` (equivalent to `corpus=all`) and the `is_xpac` filter (`filter=is_xpac:true&include_xpac=true` is equivalent to `corpus=expansion`). Both still work, but they're deprecated — use `corpus=` in new code. Don't mix the two vocabularies: a request that combines `corpus=` with either legacy control returns an error.

## In OQL

In the [Query Language](/api/oql/), the corpus is a trailing parenthetical on a works query — the underlying selector is `corpus`, with values `core`, `expansion`, and `all`:

```
works                          # core (default)
works (expansion corpus)       # only the expansion
works (all corpora)            # core + expansion
```

## Why the expansion is opt-in

Two reasons. **Data quality:** expansion works have thinner, noisier metadata on average — many are bare repository or DataCite records with little more than a title and an identifier. Quality is improving over time, but it's well below the core. **Stability:** silently doubling everyone's result counts overnight would have broken a lot of queries and dashboards, so the expansion sits behind a flag you turn on deliberately.

If you're doing careful bibliometrics or want the well-described literature, stay on the core. If you're casting the widest possible net — hunting for a specific dataset, or measuring total coverage — reach for `all`. For where these records come from in the first place, see [Sources › Repositories](/data/sources/repositories/) and [How it's built](/data/how-its-built/).
