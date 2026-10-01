---
title: "Keywords"
updated: 2026-10-01
description: "What a keyword is, how OpenAlex tags works with keywords, how the vocabulary changes, and what every attribute on a keyword object means."
tags: ["reference"]
source_id: "24736201130391"
source_url: "https://help.openalex.org/hc/en-us/articles/24736201130391-Keywords"
source_updated: "2026-03-06"
entity:
  example: "keywords/machine-learning"
  api: "keywords"
  linksTo:
    - "works"
---
A **keyword** is a short phrase saying what a work is about: `gut-microbiota`, `alphafold`, `urban-heat-island`. Keywords are OpenAlex's most specific [aboutness](/data/aboutness/) signal, much finer than [topics](/data/topics/). There are about 1.9 million keywords, and 419 million works carry at least one, typically five or six. A keyword's OpenAlex ID is a readable slug, so a keyword looks like `https://openalex.org/keywords/machine-learning`; fetch one at [`api.openalex.org/keywords/machine-learning`](https://api.openalex.org/keywords/machine-learning).

## About

A model reads each work's title, abstract and venue and writes the keywords a careful indexer would: what the work is about, not what kind of document it is. When a record says nothing about its subject (a bare dataset entry, a table of contents), the model returns no keywords rather than guess. That is why about 11% of works have none.

The model is a small open model (Qwen3-4B) trained to copy a frontier model (Claude Opus 5.5) acting as an indexer on about a million works. Its keywords are then folded into one vocabulary: spelling variants, plurals and synonyms are merged under one heading (`neanderthals` also covers "Neandertals"), and a keyword enters the vocabulary only once it describes at least 100 works.

Each keyword on a work carries a `score`: the model's confidence in that keyword, from 0 to 1. Keywords are listed best first. On the keyword object itself, [`works_count`](#works_count) and [`cited_by_count`](#cited_by_count) roll those assignments up across the corpus.

On 400 random works, an independent AI judge (OpenAI's GPT-6 Astra) rated 91% of these keywords accurate, against 44% for the previous, topic-derived ones. They match the keywords authors chose for their own papers about twice as often. Benchmarks, code, prompts, the vocabulary and the model weights are all open: [openalex-keywords (v3)](https://github.com/ourresearch/openalex-keywords/tree/main/v3), with the weights in the [v3.0 release](https://github.com/ourresearch/openalex-keywords/releases/tag/v3.0).

## The vocabulary changes

The keyword list is not fixed. New fields emerge, and keywords are added for them. Keywords get merged when they turn out to mean the same thing, and split when one label covers two meanings. If a keyword is wrong, or two keywords should be one, [tell us](https://openalex.org/help). Store keyword IDs with the date you fetched them, and expect some to change.

Each keyword has a one-sentence [`description`](#description) and, where one exists, a link to its [Wikidata](https://www.wikidata.org/) item in [`ids`](#ids). Next, we'll look at joining keywords to other outside vocabularies like MeSH, vector search over keywords, and assigning each keyword to one or more [topics](/data/topics/).

## Good uses

- **Find what text search misses.** A keyword filter finds works whatever words their authors used, including works with no abstract. Combine it with a title and abstract search for the best recall (full recipe: [Finding papers with keywords](/how-to/finding-papers-with-keywords/)):

  ```
  https://api.openalex.org/?oql=works where keyword is (antimicrobial-resistance) or title/abstract has ("antimicrobial resistance")
  ```

- **Map a field.** Filter to any set of works, then [`group_by=keywords.id`](/api/grouping/) to see what it is made of; add `group_by=publication_year` on a keyword filter to see its trend.
- **Find experts.** Filter on a keyword, then `group_by=authorships.author.id`.
- **Tag your own text.** The [text aboutness endpoint](/api/tag-aboutness/) returns keywords for any title and abstract, from the same model and vocabulary.

Keywords are specific by design; for broad summaries ("how much of this institution's work is chemistry?"), use [topics, subfields and fields](/data/aboutness/).

## Attributes

This is the canonical dictionary of every attribute on a **keyword** object. Attributes shared with other entities are documented once on [Common attributes](/data/common-attributes/); keyword-specific notes are below.

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this keyword. Unlike most entities, a keyword's ID is a readable slug rather than a letter-and-number code, e.g. `https://openalex.org/keywords/machine-learning`. See [Common attributes](/data/common-attributes/#id).

### `display_name`
*String.* The keyword's human-readable label, e.g. `machine learning`. See [Common attributes](/data/common-attributes/#display_name).

### `description`
*String.* One sentence saying what the keyword means, written by an AI model from the keyword and works that carry it. Machine-made: it can be wrong, and it improves as the vocabulary changes.

### `ids`
*Object.* External identifiers for this keyword, as URIs. Keyword-specific keys: `openalex` and, when a confident match exists, `wikidata` (about a fifth of keywords, which cover most keyword uses). Matches are machine-made. See [Common attributes](/data/common-attributes/#ids).

### `works_count`
*Integer.* The number of works tagged with this keyword. See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* The total citations received by all works tagged with this keyword. See [Common attributes](/data/common-attributes/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works API](/data/works/#in-the-api) URL returning every work tagged with this keyword, e.g. `https://api.openalex.org/works?filter=keywords.id:keywords/machine-learning`. A convenience link: it's the same query you'd build with the [`keywords.id`](/data/works/attributes/#keywords) filter.

### `created_date`
*String.* The date this keyword was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to this keyword object. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Keywords endpoint is at [`api.openalex.org/keywords`](https://api.openalex.org/keywords). Fetch a single keyword by its slug ID ([`/keywords/machine-learning`](https://api.openalex.org/keywords/machine-learning)) or a list, and [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over the fields above.

To find the works carrying a keyword, filter on the [Works](/data/works/) endpoint:

```
https://api.openalex.org/works?filter=keywords.id:machine-learning
```

For the full list of filterable, sortable, and groupable fields see the [Keywords API reference](/data/keywords/); for all endpoints see the [endpoints index](/api/endpoints/).
