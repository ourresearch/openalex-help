---
title: "Topics"
description: "What a topic is, how OpenAlex assigns topics to works and rolls them up into a four-level hierarchy, and what every attribute on a topic object means."
tags: ["reference"]
source_id: "24736129405719"
source_url: "https://help.openalex.org/hc/en-us/articles/24736129405719-Topics"
source_updated: "2026-03-06"
entity:
  example: "T11636"
  api: "topics"
  linksTo:
    - "subfields"
    - "works"
---
A **topic** is a fine-grained research area — "Artificial Intelligence in Healthcare and Education," "Geological and Geochemical Analysis," and about 4,500 more. Topics are the bottom, most granular level of OpenAlex's classification hierarchy: 4 [domains](/data/domains/) → 26 [fields](/data/fields/) → 252 [subfields](/data/subfields/) → 4,516 topics. Every work with enough metadata is assigned up to three topics automatically, and those assignments aggregate up to characterize [authors](/data/authors/), [institutions](/data/institutions/), and [sources](/data/sources/). A topic's OpenAlex ID looks like `T11636`; fetch one at [`api.openalex.org/topics/T11636`](https://api.openalex.org/topics/T11636). Topics are one of several [aboutness](/data/aboutness/) signals — see that page to choose the right level of granularity for your question.

## How it's made

Topics are **inferred**, not looked up: a machine-learning model reads each work's text and predicts what it's about. That's why topics (and the whole hierarchy above them) live under [Aboutness](/data/aboutness/) rather than [Vocabulary](/data/vocabulary/) — the labels are standardized, but the assignment is a prediction. The classification system was developed with [CWTS at Leiden University](https://www.cwts.nl/), extending their [open approach to classifying research publications](https://www.leidenmadtrics.nl/articles/an-open-approach-for-classifying-research-publications).

### Building the topic list

The set of topics itself was built from the citation network. OpenAlex started with works that have incoming and outgoing citations and clustered them by [citation relationships](https://en.wikipedia.org/wiki/Citation_graph): works that cite each other frequently land in the same cluster, and those clusters correspond to real research communities. A large language model then generated a human-readable name and [`description`](#description) for each cluster. Finally, each topic was mapped to a subfield, field, and domain using Scopus's [ASJC categories](https://service.elsevier.com/app/answers/detail/a_id/12007/supporthub/scopus/), which is how every topic gets a place in the four-level hierarchy.

### Assigning topics to works

A deep-learning classifier assigns topics to any work from its **title, abstract, citations, and journal name**. The model handles missing data gracefully — it can classify a brand-new work that has no incoming citations yet from just its title, abstract, and source. It scores every candidate topic; the highest-scoring one becomes the work's [`primary_topic`](/data/works/attributes/#primary_topic), and the top few (up to three) appear in the work's [`topics`](/data/works/attributes/#topics) array, each with a `score`. Some works can't be classified at all — no title, no abstract, no citations means the model has nothing to work with. About 12% of works have no topic for this reason (39.6M of 322M as of mid-2026); count them with [`filter=primary_topic.id:null`](https://api.openalex.org/works?filter=primary_topic.id:null).

### One primary subfield per work

Because a work's topics roll up the hierarchy, every work also gets a single **primary subfield, field, and domain** — the ones its `primary_topic` maps to. This single-primary choice is deliberate: it lets OpenAlex normalize citation impact ([FWCI](/data/works/citations/#field-weighted-citation-impact)) against works in the same subfield, and it means a work is classified from *its own text*, not from the catch-all subject of the journal it happened to appear in. The trade-off is precision over recall: a work about the statistics of cancer trials gets one primary subfield, even though it touches several.

### Subfields vs. concepts

Before topics, OpenAlex classified works with [concepts](/data/concepts/) — a Wikipedia-derived vocabulary inherited from the Microsoft Academic Graph. Concepts are **deprecated**: no longer maintained, and superseded by topics. The two work very differently. Concepts matched work metadata to Wikipedia concepts, accepting every match above a relevancy score and firing parent concepts whenever a child matched — high recall, low precision, so concept queries surface many works that aren't really on point. Topics (and their subfields) come from the primary-topic pipeline above, with each topic mapping to a single subfield — much higher precision, at the cost of missing works whose *primary* topic lands elsewhere. To recover some recall, filter on the full `topics` array (`topics.subfield.id:...`) instead of `primary_topic` alone, which matches any of a work's assigned topics.

You can also run the classifier on your own text — a draft abstract or a grant proposal — and get back the same topics, subfields, keywords, and SDGs OpenAlex would assign. See the [text aboutness endpoint](/api/tag-aboutness/).

## Attributes

This is the canonical dictionary of every attribute on a **topic** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`ids`](/data/common-attributes/#ids), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/); topic-specific notes are below.

### `id`
*String.* The [OpenAlex ID](/data/overview/#the-openalex-id-scheme) for this topic, e.g. `https://openalex.org/T11636`. Topics use the `T####` scheme (unlike domains, fields, and subfields, which use bare numeric IDs). See [Common attributes](/data/common-attributes/#id).

### `ids`
*Object.* External identifiers for this topic, as URIs. Topic-specific keys: `openalex` and (when a matching article exists) `wikipedia`.

### `display_name`
*String.* The topic's name, e.g. "Artificial Intelligence in Healthcare and Education." Generated by an LLM from the topic's citation cluster. See [Common attributes](/data/common-attributes/#display_name).

### `description`
*String.* A paragraph describing what the topic's cluster of papers is about, also LLM-generated.

### `keywords`
*List.* A handful of short phrases summarizing the topic (e.g. "Machine Learning," "Medical Imaging"). These are descriptive labels on the topic itself, distinct from work-level [keywords](/data/keywords/), which are scored per work.

### `subfield`
*Object.* The [subfield](/data/subfields/) this topic belongs to (`id`, `display_name`) — the level directly above it in the hierarchy.

### `field`
*Object.* The [field](/data/fields/) this topic rolls up into (`id`, `display_name`).

### `domain`
*Object.* The [domain](/data/domains/) this topic rolls up into (`id`, `display_name`) — the top of the hierarchy.

### `siblings`
*List.* The other topics that share this topic's [`subfield`](#subfield) (`id`, `display_name`), useful for navigating laterally within a subfield. Empty for a topic that is the only one in its subfield.

### `works_count`
*Integer.* How many works have this topic assigned (as their primary or a secondary topic). See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations across all works assigned this topic. See [Common attributes](/data/common-attributes/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for every work tagged with this topic, e.g. `https://api.openalex.org/works?filter=topics.id:T11636`. A convenience link; OpenAlex doesn't store work IDs on the topic object.

### `created_date`
*String.* The date this topic was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to the topic object. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Topics endpoint is at [`api.openalex.org/topics`](https://api.openalex.org/topics). Fetch a single topic by ID — [`/topics/T11636`](https://api.openalex.org/topics/T11636) — or a list, and [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over it.

You can filter and group topics by their place in the hierarchy — `domain.id`, `field.id`, `subfield.id` — and by `works_count`, `cited_by_count`, `id`, and `display_name`, all of which also sort. Full-text matching uses the [`search` parameter](/api/searching/) (the older `.search` filters like `display_name.search` and `keywords.search` are deprecated). Most topic use, though, is on the [Works](/data/works/) endpoint: `filter=primary_topic.id:T11636` (works whose *primary* topic is this one), `filter=topics.id:T11636` (works with this topic anywhere in their top three), or the hierarchy roll-ups `topics.subfield.id`, `topics.field.id`, and `topics.domain.id`. See the [Topics API reference](/data/topics/) and the [endpoints index](/api/endpoints/).
