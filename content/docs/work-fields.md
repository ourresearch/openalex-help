---
title: "Work fields"
description: "The canonical dictionary of every field on a work object — what each one means, its type, and how it's structured."
tags: ["reference"]
source_id: "api-entities/works/work-object"
source_url: "https://developers.openalex.org/api-entities/works/work-object"
source_updated: "2026-07-29"
---
This is the canonical dictionary of every field on a **work** object: what each field means, its type, and how it's structured. When you fetch a [single work](/api/works/) or a list of works, this is what comes back.

For the *mechanics* of the Works endpoint — which fields you can filter, sort, and group on, and the query syntax — see the [Works API reference](/api/works/).

## Identity & identifiers

### `id`
*String.* The [OpenAlex ID](/api/) for this work, e.g. `https://openalex.org/W2741809807`.

### `ids`
*Object.* All known external identifiers for this work, expressed as URIs where possible. Keys for unknown IDs are omitted. Possible keys: `openalex`, `doi`, `mag` (Microsoft Academic Graph integer ID), `pmid` (PubMed), `pmcid` (PubMed Central).

### `doi`
*String.* The work's DOI — the canonical external ID for works. A work occasionally has more than one DOI (for example a preprint DOI and a published DOI); this field always holds the single DOI of the published version.

### `display_name`
*String.* The work's title. Identical to [`title`](#title); every OpenAlex entity carries a `display_name`, so works do too.

### `title`
*String.* The title of the work. Identical to [`display_name`](#display_name).

### `type`
*String.* The work's type (e.g. `article`, `preprint`, `dataset`, `paratext`). Every work has exactly one. See [Work types](/docs/work-types/) for the full vocabulary and how the type is assigned.

### `language`
*String.* The language of the work's metadata (title/abstract), in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format, auto-detected with [langdetect](https://pypi.org/project/langdetect/). This reflects the language of the metadata, not necessarily the full text, and is left unset when there aren't enough words to guess reliably.

## Bibliographic

### `publication_date`
*String.* The day the work was published, as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date. Where several dates exist, OpenAlex usually picks the earliest electronic-publication date. Applies to the [`primary_location`](#primary_location) version; other [`locations`](#locations) may be earlier.

### `publication_year`
*Integer.* The year the work was published.

### `biblio`
*Object.* Old-style bibliographic pointers, mostly useful in citation contexts. All strings (values like "Spring" or "Inside cover" turn up): `volume`, `issue`, `first_page`, `last_page`.

### `abstract_inverted_index`
*Object.* The abstract as an [inverted index](https://en.wikipedia.org/wiki/Inverted_index) — each word mapped to its positions in the text. OpenAlex does not ship plaintext abstracts for legal reasons; reconstruct the abstract from the index. Newer works are more likely to have one (over 60% of 2022 works vs. ~45% of pre-2000 works).

```json
abstract_inverted_index: { "Despite": [0], "growing": [1], "interest": [2], "in": [3, 57, 73] }
```

## Authorship & affiliations

### `authorships`
*List.* [Authorship](/api/authors/) objects, each pairing an author with their institution(s) and role on the work. Capped at the first 100 authors for performance.

### `corresponding_author_ids`
*List.* OpenAlex IDs of authors whose authorship has `is_corresponding: true`.

### `corresponding_institution_ids`
*List.* OpenAlex IDs of institutions attached to a corresponding author's authorship.

### `countries_distinct_count`
*Integer.* Number of distinct author country codes across the work's authorships.

### `institutions_distinct_count`
*Integer.* Number of distinct institutions across the work's authorships.

## Sources & locations

A **location** is a place where the work can be found — a publisher landing page, a repository copy, and so on. See the [location object](/api/works/) for the full shape (`is_oa`, `landing_page_url`, `pdf_url`, `source`, `license`, `version`).

### `primary_location`
*Object.* The [location](#locations) holding the best (closest to the [version of record](https://en.wikipedia.org/wiki/Version_of_record)) copy — for a journal article, the published full text at the publisher's DOI URL.

### `locations`
*List.* Every unique place this work lives, each a location object.

### `locations_count`
*Integer.* The number of [`locations`](#locations).

### `best_oa_location`
*Object.* The best openly available [location](#locations), or null if none. "Best" is scored by: must be OA; publisher beats repository; `publishedVersion` beats `acceptedVersion` beats `submittedVersion`; a direct PDF link beats none; and major repositories (PubMed Central, arXiv) rank above others. See [Versions](/docs/versions/).

## Open access

### `open_access`
*Object.* The work's access status, an `OpenAccess` object with these fields:

- **`is_oa`** *(Boolean)* — true if a free-to-read full text exists somewhere (OpenAlex uses a broad definition: readable without paying or logging in).
- **`oa_status`** *(String)* — one of `diamond` (fully-OA journal, no APC), `gold` (fully-OA journal), `green` (toll-access publisher page but a free repository copy exists), `hybrid` (free under an open license in a toll-access journal), `bronze` (free to read on the publisher page but no identifiable license), or `closed`. The bronze-vs-gold distinction depends on the journal's openness — see [Journal quality & OA status](/docs/journal-quality/).
- **`oa_url`** *(String)* — the best OA URL (closest to the version of record); may be a PDF or a landing page.
- **`any_repository_has_fulltext`** *(Boolean)* — true if any location is both OA and hosted by a repository. Lets you track "shadowed green" OA that `oa_status` hides once a publisher-hosted copy exists.

### `apc_list`
*Object.* The work's list-price [article processing charge](https://en.wikipedia.org/wiki/Article_processing_charge) as advertised by the journal (`value`, `currency`, `value_usd`, `provenance` — currently only `doaj`). This is the listed price, not necessarily what was paid. `apc_list.value` of zero indicates a [diamond-OA](https://en.wikipedia.org/wiki/Diamond_open_access) journal.

### `apc_paid`
*Object.* OpenAlex's best estimate of the APC actually paid (`value`, `currency`, `value_usd`, `provenance`). Prefers article-level data from [OpenAPC](https://openapc.net/) (`provenance: "openapc"`); when unavailable, falls back to the list price.

> **Note:**
> `apc_paid` is an *estimate* — often just the list price. For article-level data only, filter with `apc_paid.provenance:openapc`.

## Classification

For how these are produced, see [Aboutness](/docs/aboutness/).

### `primary_topic`
*Object.* The top-ranked [topic](/docs/topics/) for the work, with its `subfield`, `field`, and `domain`. Same as the first entry in [`topics`](#topics).

### `topics`
*List.* Up to three ranked [topics](/docs/topics/) for the work, each with a `score` and its subfield/field/domain.

### `keywords`
*List.* Short phrases derived from the work's topics ([keywords](/docs/keywords/)), each with a similarity `score` to the title and abstract. Only keywords above a score threshold are included.

### `concepts`
*List.* Legacy [concept](/api/concepts/) tags with a `score`. Concepts are a superseded classification retained for continuity; [`topics`](#topics) are the current primary classification. Ancestors of assigned concepts are also included, so you may see low or zero scores.

### `sustainable_development_goals`
*List.* The work's relevance to the UN's [17 Sustainable Development Goals](https://sdgs.un.org/goals), tagged by a machine-learning [classifier](/docs/sdg-classification/), each with a predicted-probability `score`. All goals scoring above 0.4 are shown.

### `mesh`
*List.* [MeSH](https://www.nlm.nih.gov/mesh/meshhome.html) tag objects. Present only for works sourced from [PubMed](https://pubmed.ncbi.nlm.nih.gov/); an empty list otherwise.

## Citations & impact

### `cited_by_count`
*Integer.* The number of works that cite this work. See [Citations](/docs/citations/).

### `counts_by_year`
*List.* [`cited_by_count`](#cited_by_count) for each of the last ten years, binned by year. Years with zero citations are omitted; citations older than ten years are excluded. See [Counts by year](/docs/counts-by-year/).

### `cited_by_percentile_year`
*Object.* The percentile rank of this work's citation count against other works from the same year, as a `min`/`max` range.

### `fwci`
*Float.* The [Field-Weighted Citation Impact](/docs/fwci/): citations received divided by citations expected for works of the same type, year, and subfield.

### `citation_normalized_percentile`
*Object.* The same information as [`fwci`](#fwci) expressed as a percentile (`value`, `is_in_top_1_percent`, `is_in_top_10_percent`).

### `referenced_works`
*List.* OpenAlex IDs of the works this work cites (this work ➞ others). See [Citations](/docs/citations/).

### `referenced_works_count`
*Integer.* The length of [`referenced_works`](#referenced_works).

### `related_works`
*List.* OpenAlex IDs of algorithmically related works — recent papers sharing the most topics with this one.

## Funding

### `funders`
*List.* Dehydrated [funder](/api/funders/) objects for this work. Replaces the removed `grants` property.

### `awards`
*List.* Award/grant objects (`id`, `display_name`, `funder_award_id`, `funder_id`, `funder_display_name`, `doi`) linking the work to specific grants. Replaces the removed `grants` property.

## Full-text content

### `has_content`
*Object.* Whether downloadable full text exists: `pdf` (Boolean) and `grobid_xml` (Boolean, TEI XML). About 60 million works have `has_content.pdf: true`. See [Full-text PDFs](/docs/content-archive/).

### `content_url`
*String.* A URL for downloading full-text content, present only when [`has_content`](#has_content) indicates a PDF or TEI XML is available. Append `.pdf` or `.grobid-xml` and your API key to fetch a format.

> **Note:**
> `content_url` is available only through the API, not in the [snapshot](/docs/bulk-data/).

## Flags

### `is_retracted`
*Boolean.* True if the work is known to be retracted, per the [Retraction Watch database](https://doi.org/10.13003/c23rw1d9).

### `is_paratext` *(deprecated)*
*Boolean.* True if the work is [paratext](/docs/work-types/#paratext) (covers, tables of contents, mastheads, and similar). Now derived directly from `type` — it is true exactly when `type` is `paratext`. Filter with `type:paratext` instead.

### `is_xpac`
*Boolean.* True if the work is part of the XPAC (Expansion Pack) dataset — the 190M+ works added in the Walden update, primarily datasets and single-repository records. Data quality on XPAC works is lower but improving. XPAC works are excluded from API results by default; include them with `include_xpac=true`.

## Indexing

### `indexed_in`
*List.* The sources this work is indexed in. Possible values: `arxiv`, `crossref`, `doaj`, `pubmed`.

## Housekeeping dates

### `created_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date the work was added to OpenAlex.

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp (UTC) of the last change to anything in the work object — including count increases.

## Deprecated fields

- **`host_venue`** and **`alternate_host_venues`** — removed; use [`primary_location`](#primary_location) and [`locations`](#locations). Filtering or grouping on them errors.
- **`grants`** — removed; use [`funders`](#funders) and [`awards`](#awards).
- **`concepts`** — superseded by [`topics`](#topics) (still present; see above).
