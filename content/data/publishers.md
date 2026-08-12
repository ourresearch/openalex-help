---
title: "Publishers"
description: "What a publisher is, how OpenAlex builds the publisher hierarchy from ROR and Wikidata, how it connects to sources, and what every attribute on a publisher object means."
tags: ["reference"]
source_id: "api-reference/publishers"
source_url: "https://developers.openalex.org/api-reference/publishers"
source_updated: "2026-02-17"
entity:
  example: "P4310319965"
  api: "publishers"
  linksTo:
    - "sources"
    - "works"
---
A **publisher** is a company or organization that distributes works — the parent behind the [sources](/data/sources/) (journals, conference series, repositories) where works appear. OpenAlex tracks about 10,700 publishers, arranged in a parent/child hierarchy so that an imprint rolls up to its group. A publisher's OpenAlex ID looks like `P4310319965`; fetch one at [`api.openalex.org/publishers/P4310319965`](https://api.openalex.org/publishers/P4310319965) (Springer Nature).

## About

### Where publishers come from

Publishers are [native entities](/data/native/): OpenAlex decides which real-world organizations count as distinct publishers and mints an ID for each. The publisher list is grounded in two open registries — [ROR](https://ror.org/) (the Research Organization Registry) and [Wikidata](https://www.wikidata.org/) — which supply the canonical name, homepage, country, logo, and the external IDs OpenAlex carries in [`ids`](#ids). Grounding publishers in ROR/Wikidata is what keeps "Springer Nature," "Springer Verlag," and "Springer-Verlag" from splintering into three separate publishers.

### Lineage and hierarchy

Publishers form a tree. A large publishing group sits at the top ([`hierarchy_level`](#hierarchy_level) `0`, [`parent_publisher`](#parent_publisher) `null`); its imprints and subsidiaries hang beneath it at higher levels, each pointing up at its parent. [`lineage`](#lineage) lists the full chain of ancestors from the publisher itself up to the root, so you can roll any imprint's works up to the group that owns it. This mirrors the messy reality of scholarly publishing, where one conglomerate may own dozens of imprints that still print under their own names.

### Relationship to sources

A publisher doesn't publish works directly — it publishes them *through* [sources](/data/sources/). Each source records its publisher as its `host_organization`, and the reverse view (every source a publisher hosts) is available at the publisher's [`sources_api_url`](#sources_api_url). The source→publisher link comes from the source's metadata profile in the [ISSN registry](https://portal.issn.org/), which names each journal's publisher; if a journal's publisher is missing or wrong, check its ISSN record, and if the publisher doesn't exist in [ROR](https://ror.org/search) yet you can submit a request there to add it. A publisher's [`works_count`](#works_count) and [`cited_by_count`](#cited_by_count) are the totals summed across all the sources it hosts.

### Roles

A single real-world organization can act as more than one kind of OpenAlex entity: a university press is a **publisher**, but the university is also an **[institution](/data/institutions/)** and sometimes a **[funder](/data/funders/)**. [`roles`](#roles-1) links those alter egos together, so you can hop from the publisher record to the institution or funder record for the same organization.

### Failure modes

Because publishers are inferred, they can be wrong: an imprint may be attached to the wrong parent, two records for one publisher may not yet be merged, or a small or new publisher may be missing from ROR/Wikidata and so absent here. Hierarchy is also incomplete — not every imprint has been slotted under its group. These are [curatable](/data/curations/).

## Attributes

This is the canonical dictionary of every attribute on a **publisher** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`ids`](/data/common-attributes/#ids), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`summary_stats`](/data/common-attributes/#summary_stats), [`counts_by_year`](/data/common-attributes/#counts_by_year), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/); publisher-specific notes are below.

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this publisher, e.g. `https://openalex.org/P4310319965`. See [Common attributes](/data/common-attributes/#id).

### `ids`
*Object.* All known external identifiers for this publisher, as URIs where possible. Publisher keys: `openalex`, `ror` ([ROR](https://ror.org/) ID), `wikidata`. See [Common attributes](/data/common-attributes/#ids).

### `display_name`
*String.* The publisher's name, e.g. `Springer Nature`. See [Common attributes](/data/common-attributes/#display_name). Filterable and searchable; not available as a `group_by`.

### `alternate_titles`
*List.* Other names the publisher is known by, including names in other languages and former names.

### `hierarchy_level`
*Integer.* The publisher's depth in the [hierarchy](#lineage-and-hierarchy). `0` is a root (top-level) publisher; each step down toward an imprint adds one. Filterable, sortable, and groupable.

### `parent_publisher`
*String.* The OpenAlex ID of this publisher's immediate parent in the [hierarchy](#lineage-and-hierarchy), or `null` for a root publisher. Filterable, sortable, and groupable.

### `lineage`
*List.* OpenAlex IDs tracing the full ancestry, from this publisher up to its root — the publisher itself is always the first element. Filter `lineage:P4310319965` to find a group and all its imprints.

### `country_codes`
*List.* The [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country codes where the publisher operates. A list (not a single code) because large publishers span multiple countries.

### `homepage_url`
*String.* The URL of the publisher's homepage.

### `image_url`
*String.* A URL to the publisher's logo or a representative image (usually from [Wikimedia Commons](https://commons.wikimedia.org/)).

### `image_thumbnail_url`
*String.* Like [`image_url`](#image_url), but scaled down for a thumbnail (a `width` parameter is appended).

### `works_count`
*Integer.* The number of works published across all the [sources](/data/sources/) this publisher hosts. See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations received across all works this publisher has published. See [Common attributes](/data/common-attributes/#cited_by_count).

### `summary_stats`
*Object.* Precomputed bibliometric indicators (`2yr_mean_citedness`, `h_index`, `i10_index`) over the publisher's works. See [Common attributes](/data/common-attributes/#summary_stats).

### `counts_by_year`
*List.* Works published and citations received per year for roughly the last ten years. See [Common attributes](/data/common-attributes/#counts_by_year).

### `roles`
*List.* The other OpenAlex entities that are the *same real-world organization* — each a `{ role, id, works_count }` object where `role` is one of `publisher`, `institution`, or `funder`. See [Roles](#roles). Filter on `roles.id` to find every entity sharing a role with a given ID.

### `sources_api_url`
*String.* A ready-made API URL listing every [source](/data/sources/) this publisher hosts (i.e. `sources?filter=host_organization.id:<id>`). A convenience link, not a stored value.

### `created_date`
*String.* The date this publisher was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to this publisher object. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Publishers endpoint is at [`api.openalex.org/publishers`](https://api.openalex.org/publishers). Fetch a single publisher by ID — [`/publishers/P4310319965`](https://api.openalex.org/publishers/P4310319965) — or a list, and [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over the fields above. To find every source a publisher hosts, filter sources on `host_organization.id`; to roll up an imprint's works to its group, filter publishers on `lineage`. For the full list of endpoints see the [endpoints index](/api/endpoints/).
