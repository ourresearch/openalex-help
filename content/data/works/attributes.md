---
title: "Attributes"
updated: 2026-08-12
description: "The canonical dictionary of every attribute on a work object — what each one means, where it comes from, and its quirks."
tags: ["reference"]
---
This is the canonical dictionary of every attribute on a **work** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`ids`](/data/common-attributes/#ids), [`display_name`](/data/common-attributes/#display_name), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/); works-specific notes on them are below.

## Attributes

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this work, e.g. `https://openalex.org/W2741809807`. See [Common attributes](/data/common-attributes/#id).

### `ids`
*Object.* All known external identifiers for this work, as URIs where possible; keys for unknown IDs are omitted. Work-specific keys: `openalex`, `doi`, `mag` (Microsoft Academic Graph integer ID), `pmid` (PubMed), `pmcid` (PubMed Central).

### `doi`
*String.* The work's DOI — the canonical external ID for works. A work occasionally has more than one DOI (e.g. a preprint DOI and a published DOI); this field always holds the DOI of the published version.

### `display_name`
*String.* The work's title. Identical to [`title`](#title); every entity carries a `display_name`.

### `title`
*String.* The title of the work. Identical to [`display_name`](#display_name).

### `type`
*String.* The work's type (e.g. `article`, `preprint`, `dataset`, `paratext`). Every work has exactly one. See [Work types](/data/work-types/) for the full vocabulary and how the type is assigned.

### `language`
*String.* The language of the work's metadata (title/abstract), in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format, auto-detected with [langdetect](https://pypi.org/project/langdetect/). Reflects the metadata language, not necessarily the full text, and is unset when there aren't enough words to guess reliably. See [Languages](/data/languages/).

### `publication_date`
*String.* The day the work was published, as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date. Where several dates exist, OpenAlex usually picks the earliest electronic-publication date. Applies to the [`primary_location`](#primary_location) version; other [`locations`](#locations) may be earlier.

### `publication_year`
*Integer.* The year the work was published.

### `biblio`
*Object.* Old-style bibliographic pointers, mostly useful in citation contexts. All strings (values like "Spring" or "Inside cover" turn up): `volume`, `issue`, `first_page`, `last_page`.

### `abstract_inverted_index`
*Object.* The abstract as an [inverted index](https://en.wikipedia.org/wiki/Inverted_index) — each word mapped to its positions. OpenAlex does not ship plaintext abstracts for legal reasons; reconstruct the abstract from the index. Newer works are more likely to have one (over 60% of 2022 works vs. ~45% of pre-2000 works). Abstracts come from diverse sources, sometimes text-mined from the fulltext, so one can occasionally carry trailing text that isn't part of the abstract (section headings, keywords); [file a ticket](https://openalex.org/contact) if you spot this on a work.

```json
{ "abstract_inverted_index": { "Despite": [0], "growing": [1], "interest": [2], "in": [3, 57, 73] } }
```

### `authorships`
*List.* [Authorship](/data/authorships/) objects, each pairing an author with their institution(s) and role on the work. Capped at the first 100 authors for performance.

### `corresponding_author_ids`
*List.* OpenAlex IDs of authors whose authorship has `is_corresponding: true`.

### `corresponding_institution_ids`
*List.* OpenAlex IDs of institutions attached to a corresponding author's authorship.

### `countries_distinct_count`
*Integer.* Number of distinct author country codes across the work's authorships.

### `institutions_distinct_count`
*Integer.* Number of distinct institutions across the work's authorships.

### `institutions`
*List.* A flattened, dehydrated list of the distinct [institutions](/data/institutions/) across the work's [`authorships`](#authorships) — a convenience mirror so you don't have to walk the authorship tree. Recently added and still being backfilled, so it may be empty on works that do have affiliated institutions.

### `primary_location`
*Object.* The [location](/data/locations/) holding the best (closest to the [version of record](https://en.wikipedia.org/wiki/Version_of_record)) copy — for a journal article, the published full text at the publisher's DOI URL. See [Locations](/data/locations/) for the object shape.

### `locations`
*List.* Every unique place this work lives, each a [location](/data/locations/) object.

### `locations_count`
*Integer.* The number of [`locations`](#locations).

### `best_oa_location`
*Object.* The best openly available [location](/data/locations/), or null if none. "Best" is scored by: must be OA; publisher beats repository; `publishedVersion` beats `acceptedVersion` beats `submittedVersion`; a direct PDF link beats none; and major repositories (PubMed Central, arXiv) rank above others.

### `open_access`
*Object.* The work's access status, an `OpenAccess` object:

- **`is_oa`** *(Boolean)* — true if a free-to-read full text exists somewhere (OpenAlex uses a broad definition: readable without paying or logging in).
- **`oa_status`** *(String)* — one of `diamond`, `gold`, `green`, `hybrid`, `bronze`, or `closed`. The bronze-vs-gold distinction depends on the journal's openness — see [Sources](/data/sources/#about).
- **`oa_url`** *(String)* — the best OA URL (closest to the version of record); may be a PDF or a landing page.
- **`any_repository_has_fulltext`** *(Boolean)* — true if any location is both OA and hosted by a repository. Surfaces "shadowed green" OA that `oa_status` hides once a publisher-hosted copy exists.

See [Open access](/data/works/open-access/) for how these fields combine.

### `apc_list`
*Object.* The work's list-price [article processing charge](https://en.wikipedia.org/wiki/Article_processing_charge) as advertised by the journal (`value`, `currency`, `value_usd`, `provenance` — currently only `doaj`). The listed price, not necessarily what was paid; `apc_list.value` of zero indicates a [diamond-OA](https://en.wikipedia.org/wiki/Diamond_open_access) journal.

### `apc_paid`
*Object.* OpenAlex's best *estimate* of the APC actually paid (`value`, `currency`, `value_usd`, `provenance`). Prefers article-level data from [OpenAPC](https://openapc.net/) (`provenance: "openapc"`); otherwise falls back to the list price. For article-level data only, filter `apc_paid.provenance:openapc`.

### `primary_topic`
*Object.* The top-ranked [topic](/data/topics/) for the work, with its `subfield`, `field`, and `domain`. Same as the first entry in [`topics`](#topics). See [Aboutness](/data/aboutness/) for how topics are assigned.

### `topics`
*List.* Up to three ranked [topics](/data/topics/) for the work, each with a `score` and its subfield/field/domain.

### `keywords`
*List.* Short phrases derived from the work's topics ([keywords](/data/keywords/)), each with a similarity `score` to the title and abstract. Only keywords above a score threshold are included.

### `concepts`
*List.* Legacy [concept](/data/concepts/) tags with a `score`. Concepts are a superseded classification retained for continuity; [`topics`](#topics) are the current primary classification. Ancestors of assigned concepts are also included, so you may see low or zero scores.

### `sustainable_development_goals`
*List.* The work's relevance to the UN's [17 Sustainable Development Goals](https://sdgs.un.org/goals), tagged by a machine-learning [classifier](/data/sdgs/), each with a predicted-probability `score`. All goals scoring above 0.4 are shown.

### `mesh`
*List.* [MeSH](https://www.nlm.nih.gov/mesh/meshhome.html) tag objects. Present only for works sourced from [PubMed](https://pubmed.ncbi.nlm.nih.gov/); an empty list otherwise.

### `cited_by_count`
*Integer.* The number of works that cite this work — the count of successful reference matches pointing at it (see [Citations and references](/data/works/citations/#citations-and-references)).

### `counts_by_year`
*List.* [`cited_by_count`](#cited_by_count) for each of the last ten years, binned by year (years with zero citations omitted; citations older than ten years excluded). See [Common attributes](/data/common-attributes/#counts_by_year), including why it can drift from a live count.

### `cited_by_percentile_year`
*Object.* The percentile rank of this work's citation count against other works from the same year, as a `min`/`max` range.

### `fwci`
*Float.* The [Field-Weighted Citation Impact](/data/works/citations/#field-weighted-citation-impact): citations received divided by citations expected for works of the same type, year, and subfield. 1.0 is world average.

### `citation_normalized_percentile`
*Object.* The same information as [`fwci`](#fwci) expressed as a percentile (`value`, `is_in_top_1_percent`, `is_in_top_10_percent`).

### `referenced_works`
*List.* OpenAlex IDs of the works this work cites (this work ➞ others). See [Citations and references](/data/works/citations/#citations-and-references).

### `referenced_works_count`
*Integer.* The length of [`referenced_works`](#referenced_works).

### `related_works`
*List.* OpenAlex IDs of algorithmically related works — recent papers sharing the most topics with this one.

### `funders`
*List.* Dehydrated [funder](/data/funders/) objects for this work. Replaces the removed `grants` property.

### `awards`
*List.* [Award](/data/awards/)/grant objects (`id`, `display_name`, `funder_award_id`, `funder_id`, `funder_display_name`, `doi`) linking the work to specific grants. Replaces the removed `grants` property.

### `has_content`
*Object.* Whether downloadable full text exists in each format: `pdf` (Boolean) and `grobid_xml` (Boolean, TEI XML). More than 50 million works have `has_content.pdf: true`. See [Fulltext](/access/fulltext/).

### `has_fulltext`
*Boolean.* A convenience flag: true if any downloadable full-text format exists for this work (i.e. either `has_content.pdf` or `has_content.grobid_xml`).

### `content_urls`
*Object.* URLs for downloading full-text content, present when [`has_content`](#has_content) indicates the format is available: `pdf` and `grobid_xml`, each a URL under `content.openalex.org` (or null). Fetching requires your API key. Available only through the API, not in the [snapshot](/access/snapshot/).

### `is_retracted`
*Boolean.* True if the work is known to be retracted, per the [Retraction Watch database](https://doi.org/10.13003/c23rw1d9).

### `is_paratext` *(deprecated)*
*Boolean.* True if the work is [paratext](/data/work-types/) (covers, tables of contents, mastheads, and similar). Now derived directly from `type` — true exactly when `type` is `paratext`. Filter with `type:paratext` instead.

### `is_xpac`
*Boolean.* True if the work belongs to the [expansion corpus](/data/works/corpus/) — the ~190M works added in the Walden update (primarily datasets and single-repository records), formerly called "XPAC" (Expansion Pack). Data quality is lower but improving. Expansion works are excluded from API results by default; include them with `corpus=all`. See [Expansion corpus](/data/works/corpus/) for core/expansion/all and the deprecated legacy controls.

### `indexed_in`
*List.* The [indexes](/data/indexes/) this work is indexed in. Possible values: `arxiv`, `crossref`, `doaj`, `pubmed`.

### `created_date`
*String.* The date the work was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to anything in the work object — including citation-count increases. See [Common attributes](/data/common-attributes/#updated_date).

### Deprecated fields
- **`host_venue`** and **`alternate_host_venues`** — removed; use [`primary_location`](#primary_location) and [`locations`](#locations). Filtering or grouping on them errors.
- **`grants`** — removed; use [`funders`](#funders) and [`awards`](#awards).
- **`concepts`** — superseded by [`topics`](#topics) (still present; see above).
