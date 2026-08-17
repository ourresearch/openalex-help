---
title: "Fields"
updated: 2026-08-11
description: "What a field is, where it sits in the OpenAlex classification hierarchy, and what every attribute on a field object means."
tags: ["reference"]
source_id: "24736129405719"
source_url: "https://help.openalex.org/hc/en-us/articles/24736129405719-Topics"
source_updated: "2026-03-06"
entity:
  example: "fields/27"
  api: "fields"
  linksTo:
    - "domains"
    - "subfields"
    - "works"
---
A **field** is the second level of OpenAlex's four-level classification hierarchy: 4 [domains](/data/domains/) → 26 fields → 252 [subfields](/data/subfields/) → 4,516 [topics](/data/topics/). The 26 fields are broad disciplines — "Medicine," "Computer Science," "Arts and Humanities," "Physics and Astronomy," and so on — each sitting under one of the four domains and gathering a set of subfields beneath it. A field's OpenAlex ID is a bare number, e.g. `27` for Medicine; fetch one at [`api.openalex.org/fields/27`](https://api.openalex.org/fields/27). Fields are one of several [aboutness](/data/aboutness/) signals — high familiarity, coarse granularity — see that page to choose the right level for your question.

## About

Fields aren't classified on their own — they're a level of the same hierarchy [topics](/data/topics/) are built from. Each of the ~4,500 topics maps up through a [subfield](/data/subfields/) to one of the 26 fields, following Scopus's [ASJC categories](https://service.elsevier.com/app/answers/detail/a_id/12007/supporthub/scopus/), and a work "belongs to" a field through the topics assigned to it. The 26 field **labels** are standardized, but a work lands in one only because a machine-learning model inferred its topic from the work's text — which is why fields, like the rest of the hierarchy, live under [Aboutness](/data/aboutness/) rather than [Vocabulary](/data/vocabulary/). See [Topics → About](/data/topics/#about) for the full pipeline.

A work's primary field is the field of its [`primary_topic`](/data/works/attributes/#primary_topic). To find works in a field, filter [Works](/data/works/) by `topics.field.id` (any assigned topic's field) or `primary_topic.field.id` (the primary only). One level up is a [domain](/data/domains/); one level down is a set of [subfields](/data/subfields/).

## Attributes

This is the canonical dictionary of every attribute on a **field** object. (Confusingly, "field" is both the entity and the generic word for an object's properties; the properties are dictionaried below.) Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`ids`](/data/common-attributes/#ids), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/); field-specific notes are below.

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this field, e.g. `https://openalex.org/fields/27`. Fields use a bare numeric ID (two digits, 11–36), not the letter-prefixed scheme. See [Common attributes](/data/common-attributes/#id).

### `ids`
*Object.* External identifiers for this field, as URIs: `openalex`, plus `wikidata` and `wikipedia` where a matching article exists.

### `display_name`
*String.* The field's name, e.g. "Medicine." See [Common attributes](/data/common-attributes/#display_name).

### `display_name_alternatives`
*List.* Other names the field is known by (e.g. "healthcare sciences" for Medicine), for matching and search.

### `description`
*String.* A short description of what the field covers.

### `domain`
*Object.* The [domain](/data/domains/) this field belongs to (`id`, `display_name`) — the level directly above it in the hierarchy.

### `subfields`
*List.* The [subfields](/data/subfields/) that belong to this field (`id`, `display_name`) — the level directly below it.

### `siblings`
*List.* The other 25 fields (`id`, `display_name`), for navigating laterally across the classification.

### `works_count`
*Integer.* How many works fall in this field (through their assigned topics). See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations across all works in this field. See [Common attributes](/data/common-attributes/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for every work in this field, e.g. `https://api.openalex.org/works?filter=topics.field.id:27`. A convenience link; work IDs aren't stored on the field object.

### `created_date`
*String.* The date this field was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to the field object. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Fields endpoint is at [`api.openalex.org/fields`](https://api.openalex.org/fields). Fetch a single field by ID — [`/fields/27`](https://api.openalex.org/fields/27) — or a list, and [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over it. With only 26 fields, one unfiltered request returns them all.

You can filter and group fields by `domain.id` and `subfields.id`, and by `works_count`, `cited_by_count`, `id`, and `display_name`, all of which also sort. Full-text matching uses the [`search` parameter](/api/searching/) (the older `display_name.search` filter is deprecated). To find works in a field, use the [Works](/data/works/) endpoint: `filter=primary_topic.field.id:27` (primary only) or `filter=topics.field.id:27` (any assigned topic). For the full list of endpoints see the [endpoints index](/api/endpoints/).
