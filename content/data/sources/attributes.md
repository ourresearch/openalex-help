---
title: "Attributes"
description: "The canonical dictionary of every attribute on a source object — what each one means, where it comes from, and its quirks."
tags: ["reference"]
---
This is the canonical dictionary of every attribute on a **source** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`ids`](/data/common-attributes/#ids), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`summary_stats`](/data/common-attributes/#summary_stats), [`counts_by_year`](/data/common-attributes/#counts_by_year), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/); source-specific notes on them are below. The filter/sort/group_by operations each field supports come from the [properties catalog](https://api.openalex.org/properties/sources).

## Attributes

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this source, e.g. `https://openalex.org/S137773608`. See [Common attributes](/data/common-attributes/#id).

### `ids`
*Object.* All known external identifiers for this source, as URIs where possible. Source-specific keys: `openalex`, `issn_l`, `issn` (a list), `mag` (Microsoft Academic Graph integer ID), `wikidata`, `fatcat`. Filter/sort on `ids.openalex` and `ids.mag`.

### `display_name`
*String.* The name of the source (a journal or repository title). Every entity carries a `display_name`. Filterable and searchable via the [`search` parameter](/api/searching/).

### `issn_l`
*String.* The **linking ISSN** — the canonical [ISSN](https://en.wikipedia.org/wiki/International_Standard_Serial_Number) that groups a source's print and electronic ISSNs into one. This is OpenAlex's primary way of merging ISSN variants into a single source. Filterable, sortable, and groupable.

### `issn`
*List.* All [ISSNs](https://en.wikipedia.org/wiki/International_Standard_Serial_Number) known for this source (print and electronic), including the [`issn_l`](#issn_l). Null for sources without an ISSN (many repositories). Filterable, sortable, groupable; use `has_issn` to filter on presence.

### `host_organization`
*String.* The OpenAlex ID of the [publisher](/data/publishers/) (or, for a repository, the [institution](/data/institutions/)) that hosts this source. Filter/sort/group_by; also available as `host_organization.id`.

### `host_organization_name`
*String.* The display name of the [`host_organization`](#host_organization), denormalized onto the source for convenience.

### `host_organization_lineage`
*List.* OpenAlex IDs tracing the [`host_organization`](#host_organization) up its [publisher](/data/publishers/) hierarchy (e.g. an imprint's parent, and its parent's parent). Filter/sort/group_by on the whole lineage to catch every source under a top-level publisher.

### `type`
*String.* The source's type — one of `journal`, `ebook platform`, `conference`, `repository`, `book series`, `other`, or `metadata`. Every source has exactly one; see [Source types](/data/source-types/) for the vocabulary and [About](/data/sources/#source-types) for counts. Filter/sort/group_by.

### `is_oa`
*Boolean.* True if the source is a fully [open-access](/data/works/open-access/) venue — every work it publishes is OA. Drives the gold-vs-hybrid/bronze status of the works inside it (see [About](/data/sources/#fully-oa-journals-and-open-access)). About 65,000 sources are `is_oa=true`. Filter/sort/group_by.

### `is_in_doaj`
*Boolean.* True if the source is indexed in the [Directory of Open Access Journals](https://doaj.org/), which vets the legitimacy of fully-OA journals (about 23,000 sources). DOAJ membership implies `is_oa=true`. Filter/sort/group_by; `is_in_doaj_since_year` records when membership began.

### `is_in_doaj_since_year`
*Integer.* The year the source entered [DOAJ](https://doaj.org/); null if it isn't in DOAJ. Filter/sort.

### `is_core`
*Boolean.* True if the source is on the [CWTS Core sources list](https://zenodo.org/records/13879982) — the venues behind the [Leiden Ranking](https://open.leidenranking.com/) (about 36,000 sources). Not the same as the Web of Science Core Collection; see [About](/data/sources/#cwts-core-vs-web-of-science). Filter/sort/group_by.

### `is_high_oa_rate`
*Boolean.* True if a high share of the source's works are open access. A softer signal than [`is_oa`](#is_oa) (fully-OA). Filter/sort/group_by; `is_high_oa_rate_since_year` records when this became true.

### `is_high_oa_rate_since_year`
*Integer.* The year the source became [`is_high_oa_rate`](#is_high_oa_rate); null otherwise. Filter/sort.

### `is_in_scielo`
*Boolean.* True if the source is part of the [SciELO](https://scielo.org/) network of open-access journals (predominantly Latin American). Present on the object; not currently exposed as a filter.

### `is_ojs`
*Boolean.* True if the source runs on [Open Journal Systems](https://pkp.sfu.ca/software/ojs/), the widely used open-source journal-publishing platform. Filter/sort/group_by.

### `is_preprint_repository`
*Boolean.* True if the source is a preprint repository (e.g. [arXiv](https://arxiv.org/), bioRxiv). Filter/sort/group_by.

### `oa_flip_year`
*Integer.* If the journal flipped from toll-access to open access, the year it did so; null otherwise. Works published before the flip are hybrid/bronze, after it gold — see [About](/data/sources/#fully-oa-journals-and-open-access). Filter/sort.

### `apc_prices`
*List.* The source's list-price [APC](https://en.wikipedia.org/wiki/Article_processing_charge) as advertised, one entry per currency (`price`, `currency`). The listed price, not what any author paid. Filter/sort/group_by on `apc_prices.currency` and `apc_prices.price`. See [About](/data/sources/#apc-data).

### `apc_usd`
*Integer.* The [`apc_prices`](#apc_prices) list price converted to USD — a single comparable number across sources. Filter/sort/group_by.

### `apc_usd_by_year`
*List.* The USD list price by year (`year`, `price`), where OpenAlex has year-specific data. Present on the object; the single-value [`apc_usd`](#apc_usd) is the filterable field.

### `oa_works_count`
*Integer.* How many of the source's [`works_count`](/data/common-attributes/#works_count) works are [open access](/data/works/open-access/). Also appears per-year inside [`counts_by_year`](#counts_by_year).

### `first_publication_year`
*Integer.* The earliest publication year of any work in this source. Filter/sort.

### `last_publication_year`
*Integer.* The most recent publication year of any work in this source (ongoing journals show the current year). Filter/sort.

### `country_code`
*String.* The [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the source's home country (typically its publisher's). Filter/sort/group_by; `continent` and `is_global_south` are derived from it.

### `homepage_url`
*String.* The source's homepage on the web. Present on the object; not a filter.

### `societies`
*List.* Learned or scholarly societies associated with the source (each with an organization name and URL), e.g. a journal published on behalf of a society. Often empty.

### `alternate_titles`
*List.* Other names the source is known by (alternate or former titles). Available as a column.

### `abbreviated_title`
*String.* The source's standard abbreviated title (e.g. the ISO 4 abbreviation), when known. Available as a column.

### `topics`
*List.* The [topics](/data/topics/) most associated with the works published in this source, ranked, each with a `count` and its subfield/field/domain. See [Aboutness](/data/aboutness/). Filter on `topics.id`.

### `topic_share`
*List.* Like [`topics`](#topics), but scored by the source's *share* of each topic relative to all sources — surfacing the topics this source is disproportionately central to, not just its most frequent. Filter/sort/group_by on `topic_share.id`.

### `counts_by_year`
*List.* Per-year rollup of the source's `works_count`, `oa_works_count`, and `cited_by_count` for roughly the last ten years. See [Common attributes](/data/common-attributes/#counts_by_year), including why its sort direction isn't consistent across entity types.

### `summary_stats`
*Object.* Precomputed bibliometric indicators for the source: `2yr_mean_citedness` (a [journal impact factor](https://en.wikipedia.org/wiki/Impact_factor)-style measure), `h_index`, and `i10_index`. Filter/sort/group_by on each. See [Common attributes](/data/common-attributes/#summary_stats).

### `works_count`
*Integer.* The number of [works](/data/works/) published in this source. See [Common attributes](/data/common-attributes/#works_count). Filter/sort/group_by.

### `cited_by_count`
*Integer.* Total [citations](/data/works/attributes/#cited_by_count) received across all of the source's works. See [Common attributes](/data/common-attributes/#cited_by_count). Filter/sort/group_by.

### `works_api_url`
*String.* A ready-made [Works API](/data/works/) URL that returns every work in this source — i.e. `api.openalex.org/works?filter=primary_location.source.id:S…`. A convenience link, not a filterable field.

### `created_date`
*String.* The date the source was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to the source object. See [Common attributes](/data/common-attributes/#updated_date).
