---
title: "Concepts (deprecated)"
description: "What concepts were, why they're deprecated in favor of topics, and what every attribute on a concept object means."
tags: ["reference"]
source_id: "api-reference/concepts"
source_url: "https://developers.openalex.org/api-reference/concepts"
source_updated: "2026-02-17"
entity:
  example: "C41008148"
  api: "concepts"
  linksTo:
    - "works"
---
> **Deprecated.** Concepts are superseded by [Topics](/data/topics/), OpenAlex's current subject-classification system. The concepts endpoints and the [`concepts`](/data/works/attributes/#concepts) field on works still work, but concepts are frozen — no longer recomputed or expanded — so new works are not tagged with them and the concept tree is not maintained. Use [topics](/data/topics/) (and the [aboutness](/data/aboutness/) hierarchy of [domains](/data/domains/), [fields](/data/fields/), and [subfields](/data/subfields/)) for anything new. This page is kept for the many links and workflows that still point at it.

A **concept** is a subject tag from OpenAlex's original, now-deprecated classification: a hierarchical taxonomy of research areas — `Computer science`, `Machine learning`, `Citation` — inherited from the [Microsoft Academic Graph (MAG)](https://en.wikipedia.org/wiki/Microsoft_Academic) and linked to [Wikidata](https://www.wikidata.org/). There are about 65,000 concepts, arranged in six levels from broad (`level: 0`, e.g. *Computer science*) to narrow (`level: 5`). A concept's OpenAlex ID looks like `C41008148`; fetch one at [`api.openalex.org/concepts/C41008148`](https://api.openalex.org/concepts/C41008148).

## How it's made

Concepts came out of the [Microsoft Academic Graph](https://en.wikipedia.org/wiki/Microsoft_Academic), whose final open dataset OpenAlex adopted when MAG was discontinued in 2021. Each concept maps to a [Wikidata](https://www.wikidata.org/) item, which supplied its description, image, and multilingual labels. Concepts were arranged into a tree — every concept records its `ancestors` (broader concepts above it) and `related_concepts` (siblings and neighbors) — and works were tagged with concepts by a machine-learning classifier that read each work's title, abstract, and other metadata, emitting a `score` per concept. Because ancestors of a tagged concept were also attached, a work's `concepts` list often included broad, low-scoring entries.

This scheme was retired because it was hard to maintain and its accuracy was uneven, especially at the deeper levels. In 2024 OpenAlex replaced it with **[topics](/data/topics/)** — a cleaner, curated four-level [aboutness](/data/aboutness/) hierarchy ([domains](/data/domains/) → [fields](/data/fields/) → [subfields](/data/subfields/) → [topics](/data/topics/)) that classifies each work more reliably. Concepts are now frozen: the tree is no longer expanded, and derived fields such as [`counts_by_year`](#counts_by_year), [`summary_stats`](#summary_stats), [`ancestors`](#ancestors), and [`related_concepts`](#related_concepts) are no longer recomputed and are typically null on the live objects. See [Aboutness](/data/aboutness/) for how the successor signals compare.

## Attributes

This is the canonical dictionary of every attribute on a **concept** object. Attributes shared with other entities are documented once on [Common attributes](/data/common-attributes/); concept-specific notes are below. As noted above, several fields are no longer maintained and may come back empty.

### `id`
*String.* The [OpenAlex ID](/data/overview/#the-openalex-id-scheme) for this concept, e.g. `https://openalex.org/C41008148`. See [Common attributes](/data/common-attributes/#id).

### `wikidata`
*String.* The [Wikidata](https://www.wikidata.org/) ID for this concept, as a URL, e.g. `https://www.wikidata.org/wiki/Q21198`. Wikidata is the canonical external ID for concepts — every concept has one.

### `display_name`
*String.* The concept's name, e.g. `Computer science`. See [Common attributes](/data/common-attributes/#display_name).

### `level`
*Integer.* The concept's depth in the tree, from `0` (broadest, e.g. *Medicine*) to `5` (most specific). Level-0 concepts have no ancestors.

### `description`
*String.* A short description of the concept, taken from its [Wikidata](https://www.wikidata.org/) item.

### `ids`
*Object.* All known external identifiers for this concept, as URIs where possible; keys with no value are omitted. Concept-specific keys: `openalex`, `wikidata`, `mag` (Microsoft Academic Graph integer ID), `wikipedia`, `umls_aui`, and `umls_cui` ([Unified Medical Language System](https://www.nlm.nih.gov/research/umls/index.html) identifiers). See [Common attributes](/data/common-attributes/#ids).

### `image_url`
*String.* A URL to a representative image for the concept (usually the lead image of its [Wikipedia](https://www.wikipedia.org/) article).

### `image_thumbnail_url`
*String.* A URL to a smaller (thumbnail) version of [`image_url`](#image_url), handy for icons.

### `international`
*Object.* The concept's `display_name` and `description` translated into many languages, keyed by [language code](/data/languages/). No longer maintained — usually an empty object on live concepts.

### `ancestors`
*List.* Dehydrated concept objects for the broader concepts above this one in the tree (`id`, `wikidata`, `display_name`, `level`). No longer recomputed — typically null on live concepts.

### `related_concepts`
*List.* Dehydrated concept objects for concepts frequently co-occurring with this one (`id`, `wikidata`, `display_name`, `level`, `score`). No longer recomputed — typically null on live concepts.

### `works_count`
*Integer.* The number of works tagged with this concept. See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* The total citations received by all works tagged with this concept. See [Common attributes](/data/common-attributes/#cited_by_count).

### `summary_stats`
*Object.* Precomputed bibliometric indicators (`2yr_mean_citedness`, `h_index`, `i10_index`). See [Common attributes](/data/common-attributes/#summary_stats). No longer recomputed — typically null on live concepts.

### `counts_by_year`
*List.* Works and citation counts for roughly the last ten years, one element per year. See [Common attributes](/data/common-attributes/#counts_by_year). No longer recomputed — typically null on live concepts.

### `works_api_url`
*String.* A ready-made [Works API](/data/works/#in-the-api) URL returning every work tagged with this concept, e.g. `https://api.openalex.org/works?filter=concepts.id:41008148`. A convenience link — the same query you'd build with the [`concepts.id`](/data/works/attributes/#concepts) filter.

### `created_date`
*String.* The date this concept was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to this concept object. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

> Concepts are **deprecated**. The endpoint below still works but is frozen and will not receive updates — use [topics](/data/topics/) instead.

The Concepts endpoint is at [`api.openalex.org/concepts`](https://api.openalex.org/concepts). Fetch a single concept by ID — [`/concepts/C41008148`](https://api.openalex.org/concepts/C41008148) — or a list, and [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over the fields above.

To find the works carrying a concept, filter on the [Works](/data/works/) endpoint:

```
https://api.openalex.org/works?filter=concepts.id:C41008148
```

For the full list of filterable, sortable, and groupable fields see the [Concepts API reference](/data/concepts/); for all endpoints see the [endpoints index](/api/endpoints/).
