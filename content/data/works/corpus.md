---
title: "Expansion corpus"
updated: 2026-11-17
description: "OpenAlex works come in two corpora — the curated core and a larger expansion (formerly 'XPAC'). What's in each, why the expansion is opt-in, and how to select core / expansion / all in the REST API and OQL."
tags: ["reference"]
synonyms: ["xpac", "expansion pack", "corpus", "include_xpac", "is_xpac", "core corpus", "expansion corpus"]
---
OpenAlex's works come in two **corpora**. The **core** is the curated catalog most people mean by "OpenAlex" — about 323 million works built and matched from Crossref, MAG, PubMed, DataCite, repositories, and more (295 million of them in the default view; the rest are [pieces of other works](#pieces-of-other-works-are-left-out-too)). The **expansion** is a rawer layer of about 122 million additional works — mostly datasets and single-repository records — minted once, at the Walden cutover, from records that didn't match anything in the core. Together they're the **all** corpus: about 445 million works.

The expansion was added in the November 2025 [Walden](https://blog.openalex.org/openalex-rewrite-walden-launch/) update, and for a while carried the name **XPAC** ("Expansion Pack"). It was a one-time batch and it hasn't grown since: new works go straight into the core whatever source they come from. You'll still see "XPAC" in older docs, blog posts, and the [`is_xpac`](/data/works/attributes/#is_xpac) field name — it means exactly this expansion corpus.

> **The one thing to know:** by default you only see the **core**, without [pieces of other works](#pieces-of-other-works-are-left-out-too) or [pulled works](#pulled-works-are-left-out-too). Every works query excludes the expansion unless you ask for it, so if a count looks surprisingly low (or suddenly doubles), the corpus is usually why.

## Core, expansion, all

Think of it as three views over the same pile of works:

| Corpus | What it is | Approx. size |
|--------|-----------|--------------|
| **core** | The curated catalog. **This is the default.** | ~323M works (~295M in the default view) |
| **expansion** | The added layer — mostly datasets & repository records (the former "XPAC") | ~122M works |
| **all** | Core + expansion together | ~445M works |

The corpus selector applies to **works only** — the other entity types have no expansion, so selecting one there does nothing.

## In the REST API

The default is **core**. Pick a different view with the `corpus` parameter on any works request:

```bash
# Core only (default): ~295M works
curl "https://api.openalex.org/works"

# All works, core + expansion: ~445M works
curl "https://api.openalex.org/works?corpus=all"

# Only expansion works
curl "https://api.openalex.org/works?corpus=expansion"
```

`corpus` composes with everything else — `?filter=has_abstract:true&corpus=all` counts abstracts across both corpora. It's a works-only parameter; the other entity types reject it like any unsupported parameter. Each work also carries an [`is_xpac`](/data/works/attributes/#is_xpac) boolean, so on a `corpus=all` request you can still tell which results came from the expansion.

> **Deprecated legacy controls:** older docs and code express the same choice with `include_xpac=true` (equivalent to `corpus=all`) and the `is_xpac` filter (`filter=is_xpac:true&include_xpac=true` is equivalent to `corpus=expansion`). Both still work, but they're deprecated — use `corpus=` in new code. Don't mix the two vocabularies: a request that combines `corpus=` with either legacy control returns an error.

## In OQL

In [OQL](/access/oql/), the corpus goes in parentheses right after `works`, in OQL's [general form](/access/oql/#when-a-sentence-cant-say-it-the-general-form) (the underlying selector is `corpus`, with values `core`, `expansion`, and `all`). With nothing said, a query runs on the core:

```
get works about kelp
get works (expansion corpus) where published in 2020 and title-abstract-keywords has (kelp)
get works (all corpora) where title-abstract-keywords has (kelp)
```

The first is the core only; the second, only the expansion; the third, core and expansion together.

## Pieces of other works are left out too

The default view also leaves out works that are a piece of another work and are not a traditional scholarly work: a book's front matter and index, an encyclopedia entry, a figure or data file with its own DOI. The rule is exact and uses two public filters: a work is left out when [`has_parent_work`](/data/works/attributes/#parent_works) is true and [`is_traditional`](/data/works/attributes/#is_traditional) is false. So chapters, proceedings papers and articles stay, because they are traditional works. Where pieces nest (a file in a dataset in a collection), only the top one shows.

Nothing is deleted. Add `include_parts=true` to any works query and the pieces come back:

```bash
# The core corpus with every piece: ~323M works
curl "https://api.openalex.org/works?include_parts=true"

# One work's parts: front matter and chapters alike
curl "https://api.openalex.org/works?filter=parent_works.id:W3109397498"

# Exactly the works the default view leaves out for this reason
curl "https://api.openalex.org/works?filter=has_parent_work:true,is_traditional:false"
```

A filter on `has_parent_work`, `parent_works.id`, `parent_works.relationship` or `lineage` shows the pieces too, since it asks about them. Neither `include_parts` nor these filters bring in expansion works: if a work's parts are expansion works (as Zenodo records usually are), add `corpus=all` too. A single work fetched by ID (`/works/W…`) always answers. Counts on other entities (an author's `works_count`) still include the pieces. See [Parent and child works](/data/relationships/#parent-and-child-works).

## Pulled works are left out too

The default view also leaves out [pulled works](/data/works/pulled/): works their publisher, host or authors retracted, withdrew or removed<span data-live-count="is_pulled:true" data-live-text=" ({n} right now)" hidden></span> ([`is_pulled`](/data/works/attributes/#is_pulled)). This rule ignores the corpus: no `corpus` value brings them back. Nothing is deleted. Add `include_pulled=true` to any works query and they come back:

```bash
# The default view with pulled works
curl "https://api.openalex.org/works?search=ivermectin&include_pulled=true"
```

A filter or `group_by` on `is_pulled` or `is_retracted` asks about pulled works, so it brings them back too, as `include_pulled=true` would; `include_pulled=false` keeps them out even then. A single work fetched by ID always answers, and counts on other entities (an author's `works_count`) still include pulled works. See [Pulled works](/data/works/pulled/).

## Why the expansion is opt-in

Two reasons. **Data quality:** expansion works have thinner, noisier metadata on average — many are bare repository or DataCite records with little more than a title and an identifier. It's well below the core and improving over time, as we bring the batch up to core standards. **Stability:** silently doubling everyone's result counts overnight would have broken a lot of queries and dashboards, so the expansion sits behind a flag you turn on deliberately.

If you're doing careful bibliometrics or want the well-described literature, stay on the core. If you're casting the widest possible net — hunting for a specific dataset, or measuring total coverage — reach for `all`. For where these records come from in the first place, see [Sources › Repositories](/data/sources/repositories/) and [How it's built](/data/how-its-built/).
