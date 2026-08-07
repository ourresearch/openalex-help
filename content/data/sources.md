---
title: "Sources"
description: "What a source is, where sources come from, how OpenAlex builds them and judges journal quality and open access, and what every attribute on a source object means."
tags: ["reference"]
source_id: "24347057529623"
source_url: "https://help.openalex.org/hc/en-us/articles/24347057529623-Sources-in-OpenAlex"
source_updated: "2024-07-26"
entity:
  example: "S137773608"
  api: "sources"
  linksTo:
    - "works via locations"
    - "publishers"
    - "indexes"
---
A **source** is a venue where [works](/data/works/) appear: a journal, a conference proceedings series, a preprint or institutional repository, an ebook platform, or a book series. Sources are how OpenAlex connects works to the places that host them — every work links to one or more sources through its [locations](/data/locations/), and each source aggregates the works it published. OpenAlex tracks about 255,000 sources; a source's OpenAlex ID looks like `S137773608`, and you can fetch one at [`api.openalex.org/sources/S137773608`](https://api.openalex.org/sources/S137773608).

## How it's made

### Where sources come from

Sources are drawn from the [works](/data/works/) that flow into OpenAlex: as records arrive from [Crossref](https://www.crossref.org/), the [Microsoft Academic Graph (MAG)](https://en.wikipedia.org/wiki/Microsoft_Academic), DataCite, PubMed, repositories, and other feeds, the venues they name become sources. A source is identified primarily by its [ISSN](https://en.wikipedia.org/wiki/International_Standard_Serial_Number) — OpenAlex groups every ISSN that shares an [`issn_l`](#issn_l) (linking ISSN) into a single source — with additional sources coming from repository and platform registries that have no ISSN. Each source is attached to the [publisher](/data/publishers/) that runs it via [`host_organization`](#host_organization).

### Source types

Every source carries exactly one [`type`](#type), assigned from its metadata and behavior. The vocabulary (see [Source types](/data/source-types/)):

| Type | What it is | Rough count |
|---|---|---|
| `journal` | Peer-reviewed serials — the large majority of sources | ~206,000 |
| `ebook platform` | Book-hosting platforms | ~25,000 |
| `conference` | Conference proceedings series | ~10,000 |
| `repository` | OA repositories like [arXiv](https://arxiv.org/) or institutional repositories | ~7,000 |
| `book series` | Serial book publications | ~7,000 |
| `other` / `metadata` | Everything else, and metadata-only sources | ~130 |

### No quality bar, by design

OpenAlex [deliberately does not impose a quality bar](/data/sources/#how-its-made) on which sources it indexes — its inclusion criteria are more like arXiv than Web of Science. There are good reasons to index everything: "lower-quality" sources are useful as objects of study; sources that are inadequate for one purpose are ideal for another (grey literature, regional literature, early-career work); low-power studies aggregate into high-power meta-analyses; and excellent work is too often excluded from traditional indexes merely for being non-English or from the Global South. Most importantly, "lower-quality" content can always be *filtered out* if it's included — it can't be added back if it's not.

**Predatory journals** are handled the same way. There is no authoritative list of them, the lists change constantly, and the definition itself is contested — from faked peer review (obviously problematic) to any publisher that inflates accepted volume for revenue (a practice common even at "reputable" sources). Rather than maintain a deny list and play cat-and-mouse with bad actors who can simply rebrand, OpenAlex indexes everything and lets analysts narrow down.

### Allow lists

OpenAlex prefers **allow lists** (curated lists of trusted sources) over deny lists: they're more transparent, easier to maintain, and a more robust foundation for retrieval. Two membership flags let you narrow to trusted sources:

- [`is_in_doaj`](#is_in_doaj) — the source is indexed in the [Directory of Open Access Journals](https://doaj.org/), which vets the legitimacy of fully-OA journals. About 23,000 sources.
- [`is_core`](#is_core) — the source is on the [CWTS Core sources list](https://zenodo.org/records/13879982). About 36,000 sources.

More filters like these are planned; the goal is a "quality vs. quantity" slider that users can adjust to their needs. Because the database is open, a list of sources to *exclude* is easy for one librarian to build and share; ask your local librarian if they've curated one.

### CWTS Core vs. Web of Science

The [Centre for Science and Technology Studies](https://www.cwts.nl/) (CWTS) at Leiden University maintains the **Core sources** list — the subset of OpenAlex sources included in their [Leiden Ranking Open Edition](https://open.leidenranking.com/). Filtering works by `primary_location.source.is_core:true` returns only publications from those sources, letting you explore the data behind the rankings (or negate it to see what they exclude). CWTS Core is **not** the [Web of Science Core Collection](https://webofscience.help.clarivate.com/Content/wos-core-collection/wos-core-collection.htm), Clarivate's selective journal list — the similar names are coincidence, and the two have different maintainers, criteria, and contents.

### Fully-OA journals and open access

Whether a journal is **fully open access** matters beyond the journal itself: it determines the [OA status](/data/works/open-access/) of the works inside it. An OA article in a fully-OA journal is **gold**; the same article in a toll-access journal is **hybrid** or **bronze** — so a work's `oa_status` links back to the source's openness recorded here. Two source fields carry the determination:

- [`is_in_doaj`](#is_in_doaj) — the journal is indexed in [DOAJ](https://doaj.org/) (about 23,000 sources). DOAJ verifies credibility and legitimacy; OpenAlex does no independent vetting, so use this field when legitimacy matters. If a journal is in DOAJ it is fully OA (`is_oa=true`, `is_in_doaj=true`).
- [`is_oa`](#is_oa) — the journal is fully OA, whether or not DOAJ lists it (about 65,000 sources).

Not every fully-OA journal is in DOAJ — smaller titles and journals from the developing world often aren't. For those, OpenAlex applies two more checks: **(1)** is it from a known fully-OA publisher (a small allow list, e.g. many [SciELO](https://scielo.org/)-model publishers)? and **(2)** does it publish *only* OA articles? Because OpenAlex indexes a journal's complete output, it can simply observe whether every article is OA — a check that credits smaller publishers who never registered with DOAJ. A journal passing either check gets `is_oa=true`, `is_in_doaj=false`. This observation-based check also detects **flipped journals** ([`oa_flip_year`](#oa_flip_year)): an OA article published *before* a journal's flip date is hybrid or bronze, one published *after* is gold.

### APC data

The [article processing charge](https://en.wikipedia.org/wiki/Article_processing_charge) (APC) is the fee some journals charge to publish a work OA. At the source level OpenAlex records the journal's **list price** in [`apc_prices`](#apc_prices) (per currency) and [`apc_usd`](#apc_usd); at the [work](/data/works/attributes/#apc_list) level it records both the list price and OpenAlex's best estimate of what was actually paid. List prices are sourced from DOAJ plus manual curation. Two caveats: OpenAlex stores one (current-year) list price per journal, so historical estimates apply today's price to an older year; and DOAJ coverage skews toward fully-OA journals, leaving hybrid journals — where much APC spending happens — thinly covered. For year-by-year list prices, [Butler et al. 2024](https://doi.org/10.7910/DVN/CR1MMV) (Harvard Dataverse, CC0) provides publisher price lists per journal per year (2019–2023, six large publishers, ~8,711 journals); OpenAlex is **evaluating** integrating this dataset but has **not** yet done so. See [Journal quality & OA status](/data/sources/#how-its-made) for the full APC discussion, including how to estimate institutional APC spend.

## Attributes

This is the canonical dictionary of every attribute on a **source** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`ids`](/data/common-attributes/#ids), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`summary_stats`](/data/common-attributes/#summary_stats), [`counts_by_year`](/data/common-attributes/#counts_by_year), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/); source-specific notes on them are below. The filter/sort/group_by operations each field supports come from the [properties catalog](https://api.openalex.org/properties/sources).

### `id`
*String.* The [OpenAlex ID](/data/overview/#the-openalex-id-scheme) for this source, e.g. `https://openalex.org/S137773608`. See [Common attributes](/data/common-attributes/#id).

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
*String.* The source's type — one of `journal`, `ebook platform`, `conference`, `repository`, `book series`, `other`, or `metadata`. Every source has exactly one; see [Source types](/data/source-types/) for the vocabulary and [How we build it](#source-types) for counts. Filter/sort/group_by.

### `is_oa`
*Boolean.* True if the source is a fully [open-access](/data/works/open-access/) venue — every work it publishes is OA. Drives the gold-vs-hybrid/bronze status of the works inside it (see [How we build it](#fully-oa-journals-and-open-access)). About 65,000 sources are `is_oa=true`. Filter/sort/group_by.

### `is_in_doaj`
*Boolean.* True if the source is indexed in the [Directory of Open Access Journals](https://doaj.org/), which vets the legitimacy of fully-OA journals (about 23,000 sources). DOAJ membership implies `is_oa=true`. Filter/sort/group_by; `is_in_doaj_since_year` records when membership began.

### `is_in_doaj_since_year`
*Integer.* The year the source entered [DOAJ](https://doaj.org/); null if it isn't in DOAJ. Filter/sort.

### `is_core`
*Boolean.* True if the source is on the [CWTS Core sources list](https://zenodo.org/records/13879982) — the venues behind the [Leiden Ranking](https://open.leidenranking.com/) (about 36,000 sources). Not the same as the Web of Science Core Collection; see [How we build it](#cwts-core-vs-web-of-science). Filter/sort/group_by.

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
*Integer.* If the journal flipped from toll-access to open access, the year it did so; null otherwise. Works published before the flip are hybrid/bronze, after it gold — see [How we build it](#fully-oa-journals-and-open-access). Filter/sort.

### `apc_prices`
*List.* The source's list-price [APC](https://en.wikipedia.org/wiki/Article_processing_charge) as advertised, one entry per currency (`price`, `currency`). The listed price, not what any author paid. Filter/sort/group_by on `apc_prices.currency` and `apc_prices.price`. See [How we build it](#apc-data).

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

## In the API

The Sources endpoint is at [`api.openalex.org/sources`](https://api.openalex.org/sources). Fetch a single source by ID — [`/sources/S137773608`](https://api.openalex.org/sources/S137773608) — or a list, and [filter](/api/filtering/), search, sort, and group over the fields above (for example `filter=is_in_doaj:true,type:journal` or `group_by=type`). For the full list of endpoints see the [endpoints index](/api/endpoints/).
