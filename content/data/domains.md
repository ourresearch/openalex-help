---
title: "Domains"
description: "What a domain is, where it sits at the top of the OpenAlex classification hierarchy, and what every attribute on a domain object means."
tags: ["reference"]
source_id: "24736129405719"
source_url: "https://help.openalex.org/hc/en-us/articles/24736129405719-Topics"
source_updated: "2026-03-06"
entity:
  example: "domains/1"
  api: "domains"
  linksTo:
    - "fields"
    - "works"
---
A **domain** is the top, broadest level of OpenAlex's four-level classification hierarchy: 4 domains → 26 [fields](/data/fields/) → 252 [subfields](/data/subfields/) → 4,516 [topics](/data/topics/). There are only four domains — **Life Sciences**, **Social Sciences**, **Physical Sciences**, and **Health Sciences** — and each gathers a set of fields beneath it. A domain's OpenAlex ID is a single digit, e.g. `1` for Life Sciences; fetch one at [`api.openalex.org/domains/1`](https://api.openalex.org/domains/1). Domains are the coarsest of OpenAlex's [aboutness](/data/aboutness/) signals — highly familiar, low granularity — see that page to choose the right level for your question.

## About

Domains aren't classified on their own — they're the top level of the same hierarchy [topics](/data/topics/) are built from. Each of the ~4,500 topics maps up through a [subfield](/data/subfields/) and [field](/data/fields/) to one of the four domains, following Scopus's [ASJC categories](https://service.elsevier.com/app/answers/detail/a_id/12007/supporthub/scopus/), and a work "belongs to" a domain through the topics assigned to it. The four domain **labels** are standardized, but a work lands in one only because a machine-learning model inferred its topic from the work's text — which is why domains, like the rest of the hierarchy, live under [Aboutness](/data/aboutness/) rather than [Vocabulary](/data/vocabulary/). See [Topics → About](/data/topics/#about) for the full pipeline.

A work's primary domain is the domain of its [`primary_topic`](/data/works/attributes/#primary_topic). To find works in a domain, filter [Works](/data/works/) by `topics.domain.id` (any assigned topic's domain) or `primary_topic.domain.id` (the primary only). Domains are the top of the tree — there's no level above them; one level down is a set of [fields](/data/fields/).

## Attributes

This is the canonical dictionary of every attribute on a **domain** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`ids`](/data/common-attributes/#ids), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/); domain-specific notes are below.

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this domain, e.g. `https://openalex.org/domains/1`. Domains use a bare single-digit numeric ID (1–4), not the letter-prefixed scheme. See [Common attributes](/data/common-attributes/#id).

### `ids`
*Object.* External identifiers for this domain, as URIs: `openalex`, plus `wikidata` and `wikipedia` where a matching article exists.

### `display_name`
*String.* The domain's name — one of "Life Sciences," "Social Sciences," "Physical Sciences," or "Health Sciences." See [Common attributes](/data/common-attributes/#display_name).

### `display_name_alternatives`
*List.* Other names the domain is known by (e.g. "bioscience," "biological science disciplines" for Life Sciences), for matching and search.

### `description`
*String.* A short description of what the domain covers.

### `fields`
*List.* The [fields](/data/fields/) that belong to this domain (`id`, `display_name`) — the level directly below it in the hierarchy.

### `siblings`
*List.* The other three domains (`id`, `display_name`), for navigating laterally across the classification.

### `works_count`
*Integer.* How many works fall in this domain (through their assigned topics). See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations across all works in this domain. See [Common attributes](/data/common-attributes/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for every work in this domain, e.g. `https://api.openalex.org/works?filter=topics.domain.id:1`. A convenience link; work IDs aren't stored on the domain object.

### `created_date`
*String.* The date this domain was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to the domain object. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Domains endpoint is at [`api.openalex.org/domains`](https://api.openalex.org/domains). Fetch a single domain by ID — [`/domains/1`](https://api.openalex.org/domains/1) — or a list; with only four domains, one unfiltered request returns them all. You can still [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over them.

You can filter and group domains by `fields.id`, and by `works_count`, `cited_by_count`, `id`, and `display_name`, all of which also sort. Full-text matching uses the [`search` parameter](/api/searching/) (the older `display_name.search` filter is deprecated). To find works in a domain, use the [Works](/data/works/) endpoint: `filter=primary_topic.domain.id:1` (primary only) or `filter=topics.domain.id:1` (any assigned topic). For the full list of endpoints see the [endpoints index](/api/endpoints/).
