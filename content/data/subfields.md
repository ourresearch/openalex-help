---
title: "Subfields"
description: "What a subfield is, where it sits in the OpenAlex classification hierarchy, and what every attribute on a subfield object means."
tags: ["reference"]
source_id: "24736129405719"
source_url: "https://help.openalex.org/hc/en-us/articles/24736129405719-Topics"
source_updated: "2026-03-06"
entity:
  example: "subfields/2718"
  api: "subfields"
  linksTo:
    - "fields"
    - "topics"
    - "works"
---
A **subfield** is the third level of OpenAlex's four-level classification hierarchy: 4 [domains](/data/domains/) → 26 [fields](/data/fields/) → 252 subfields → 4,516 [topics](/data/topics/). Subfields are groupings like "Health Informatics," "Geophysics," or "Oncology" — broader than a topic, narrower than a field. Each subfield sits under exactly one field and gathers a set of related topics beneath it. A subfield's OpenAlex ID is a bare number, e.g. `2718`; fetch one at [`api.openalex.org/subfields/2718`](https://api.openalex.org/subfields/2718). Subfields are the level OpenAlex uses to normalize citation impact ([FWCI](/data/works/citations/#field-weighted-citation-impact)) and are one of several [aboutness](/data/aboutness/) signals — see that page to pick the right granularity for your question.

## About

Subfields aren't classified on their own — they're a level of the same hierarchy [topics](/data/topics/) are built from. Each of the ~4,500 topics is mapped to a single subfield using Scopus's [ASJC categories](https://service.elsevier.com/app/answers/detail/a_id/12007/supporthub/scopus/), and a work "belongs to" a subfield through the topics assigned to it. The subfield **labels** are standardized (the 252 ASJC-derived groupings), but a work lands in one only because a machine-learning model inferred its topic from the work's text — which is why subfields, like the rest of the hierarchy, live under [Aboutness](/data/aboutness/) rather than [Vocabulary](/data/vocabulary/). See [Topics → About](/data/topics/#about) for the full assignment pipeline, including the deliberate choice to give every work a single **primary subfield** from its own text (not from its journal).

A work's primary subfield is the subfield of its [`primary_topic`](/data/works/attributes/#primary_topic). To find works in a subfield, filter [Works](/data/works/) by `topics.subfield.id` (any assigned topic's subfield) or `primary_topic.subfield.id` (the primary only). One level up is a [field](/data/fields/); one level down is a set of [topics](/data/topics/).

## Attributes

This is the canonical dictionary of every attribute on a **subfield** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`ids`](/data/common-attributes/#ids), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/); subfield-specific notes are below.

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this subfield, e.g. `https://openalex.org/subfields/2718`. Subfields use a bare numeric ID (four digits), not the letter-prefixed scheme. See [Common attributes](/data/common-attributes/#id).

### `ids`
*Object.* External identifiers for this subfield, as URIs: `openalex`, plus `wikidata` and `wikipedia` where a matching article exists.

### `display_name`
*String.* The subfield's name, e.g. "Health Informatics." See [Common attributes](/data/common-attributes/#display_name).

### `display_name_alternatives`
*List.* Other names the subfield is known by (e.g. "medical informatics," "clinical informatics" for Health Informatics), for matching and search.

### `description`
*String.* A short description of what the subfield covers.

### `field`
*Object.* The [field](/data/fields/) this subfield belongs to (`id`, `display_name`) — the level directly above it in the hierarchy.

### `domain`
*Object.* The [domain](/data/domains/) this subfield rolls up into (`id`, `display_name`) — the top of the hierarchy.

### `topics`
*List.* The [topics](/data/topics/) that belong to this subfield (`id`, `display_name`) — the level directly below it.

### `siblings`
*List.* The other subfields (`id`, `display_name`), for navigating laterally across the classification.

### `works_count`
*Integer.* How many works fall in this subfield (through their assigned topics). See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations across all works in this subfield. See [Common attributes](/data/common-attributes/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for every work in this subfield, e.g. `https://api.openalex.org/works?filter=topics.subfield.id:2718`. A convenience link; work IDs aren't stored on the subfield object.

### `created_date`
*String.* The date this subfield was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to the subfield object. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Subfields endpoint is at [`api.openalex.org/subfields`](https://api.openalex.org/subfields). Fetch a single subfield by ID — [`/subfields/2718`](https://api.openalex.org/subfields/2718) — or a list, and [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over it.

You can filter and group subfields by their place in the hierarchy — `domain.id`, `field.id`, and `topics.id` — and by `works_count`, `cited_by_count`, `id`, and `display_name`, all of which also sort. Full-text matching uses the [`search` parameter](/api/searching/) (the older `display_name.search` filter is deprecated). To find works in a subfield, use the [Works](/data/works/) endpoint: `filter=primary_topic.subfield.id:2718` (primary only) or `filter=topics.subfield.id:2718` (any assigned topic). For the full list of endpoints see the [endpoints index](/api/endpoints/).
