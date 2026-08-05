---
title: "Works"
description: "What a work is, where works come from, how OpenAlex builds them and their citations, and what every field on a work object means."
tags: ["reference"]
source_id: "24347019383191"
source_url: "https://help.openalex.org/hc/en-us/articles/24347019383191-Where-do-works-in-OpenAlex-come-from"
source_updated: "2025-01-09"
---
A **work** is any scholarly document: a journal article, conference paper, book or book chapter, dataset, dissertation, preprint, and more. Works are the core of OpenAlex — over 320 million of them, with tens of thousands added every day — and every other entity ([authors](/entities/authors/), [sources](/entities/sources/), [institutions](/entities/institutions/), [topics](/entities/topics/), [funders](/entities/funders/)) connects to the works it produced, published, or funded. A work's OpenAlex ID looks like `W2741809807`; fetch one at [`api.openalex.org/works/W2741809807`](https://api.openalex.org/works/W2741809807).

## How we build it

### Where works come from

OpenAlex aggregates and builds on many open data sources. The catalog was seeded by the [Microsoft Academic Graph (MAG)](https://en.wikipedia.org/wiki/Microsoft_Academic) — Microsoft Research's effort to catalog the scholarly literature — whose final open dataset OpenAlex adopted when the project was discontinued in 2021. The other primary source is [Crossref](https://www.crossref.org/), the open DOI-registration agency. Alongside those, works are drawn from DataCite, PubMed, HAL, institutional and subject repositories, and more; see the [Overview](/docs/overview/) for the full ingest picture.

### From record to work

Information about a scholarly document arrives as a **record**. A record might be an item of Crossref metadata, an entry from a repository like [arXiv](https://arxiv.org/) or [PubMed](https://pubmed.ncbi.nlm.nih.gov/), or publicly available information from the web.

The first task with any new record is to decide whether the work it describes is already in OpenAlex:

- **The record matches an existing work.** Using the record's [DOI](https://en.wikipedia.org/wiki/Digital_object_identifier) or other metadata-matching techniques, OpenAlex links it to a work it already knows about and uses the record to *enrich* that work.
- **The record is new.** If nothing matches, the record represents a work OpenAlex hasn't seen. OpenAlex then either creates a new work from it, or sets it aside to enrich a work added later.

Not every record becomes its own work. Which new works get created follows a set of rules — for example, nearly all records from Crossref and a few other trusted sources (PubMed, arXiv, and several repositories) are eligible to become new works, while records from noisier sources are held to a higher bar. Once a work exists, OpenAlex tracks its own metadata — title, abstract (and often full text), publication date, type — and the connections that make it useful at scale: authors, institutional affiliations, the source it appeared in, topics, funders, and citations.

### Citations and references

Every work carries a list of the works it cites ([`referenced_works`](#referenced_works)) and a count of the works that cite it ([`cited_by_count`](#cited_by_count)). Both are built from the same process: extracting each work's reference list, then matching those references to other works already in OpenAlex.

When OpenAlex creates a work record, it pulls the reference list from the record's source (Crossref, PubMed, and similar). When the work is open access, OpenAlex can also extract references directly from the PDF, which fills gaps for works whose source records omit references. Each extracted reference is then matched to an existing work — first by DOI (highly reliable) and, when no DOI is present, by other bibliographic metadata (less reliable). A successful match counts as a **reference** in the citing work and a **citation** of the cited work.

Because citations are built by matching, a work's `referenced_works` can be *shorter* than the reference list printed in its PDF. The common reasons: the cited work isn't in OpenAlex (references to unknown works are dropped); the source record's references differ from the final PDF; many Crossref records include no references at all; or a reference has no DOI and metadata matching failed. The short version for end users is in the Help center: [Why are my reference counts lower than expected?](/help/why-are-my-reference-counts-lower-than-expected/)

### Field-Weighted Citation Impact

[`fwci`](#fwci) is a [snowball metric](https://arma.ac.uk/wp-content/uploads/2021/08/Snowball-Metrics-Recipe-Book-edition-2.pdf) normalizing a work's citations for its type, publication year, and [subfield](/entities/subfields/). The formula is `citations received / citations expected`: **1.0** is world average, **2.0** is twice expected, **0.5** is half.

- **Citations received** (numerator): citations in the publication year plus the three following years.
- **Citations expected** (denominator): the average of that same 4-year received count over every work with the same year, type, and subfield (articles split journals vs. conference proceedings). [Calculation code](https://github.com/ourresearch/openalex-databricks/tree/main/jobs/weekly_metric_creation).

FWCI follows the standard [recipe book](https://arma.ac.uk/wp-content/uploads/2021/08/Snowball-Metrics-Recipe-Book-edition-2.pdf), so the math matches other databases, but the *inputs* differ: OpenAlex is more comprehensive (many uncited works pull the expected value down, raising FWCI for cited works); we classify each work into a single subfield from its own text, not its journal; and our publication year is typically the first-online date. Not every work gets an FWCI — work types that aren't expected to accrue citations (e.g. [paratext](/entities/work-types/)) are omitted so they don't distort institutional averages. As of mid-2026 about 218M of 322M works (68%) carry one.

## Fields

This is the canonical dictionary of every field on a **work** object. Fields shared with other entities ([`id`](/entities/common-fields/#id), [`ids`](/entities/common-fields/#ids), [`display_name`](/entities/common-fields/#display_name), [`created_date`](/entities/common-fields/#created_date), [`updated_date`](/entities/common-fields/#updated_date)) are documented once on [Common fields](/entities/common-fields/); works-specific notes on them are below.

### `id`
*String.* The [OpenAlex ID](/entities/overview/#the-openalex-id-scheme) for this work, e.g. `https://openalex.org/W2741809807`. See [Common fields](/entities/common-fields/#id).

### `ids`
*Object.* All known external identifiers for this work, as URIs where possible; keys for unknown IDs are omitted. Work-specific keys: `openalex`, `doi`, `mag` (Microsoft Academic Graph integer ID), `pmid` (PubMed), `pmcid` (PubMed Central).

### `doi`
*String.* The work's DOI — the canonical external ID for works. A work occasionally has more than one DOI (e.g. a preprint DOI and a published DOI); this field always holds the DOI of the published version.

### `display_name`
*String.* The work's title. Identical to [`title`](#title); every entity carries a `display_name`.

### `title`
*String.* The title of the work. Identical to [`display_name`](#display_name).

### `type`
*String.* The work's type (e.g. `article`, `preprint`, `dataset`, `paratext`). Every work has exactly one. See [Work types](/entities/work-types/) for the full vocabulary and how the type is assigned.

### `language`
*String.* The language of the work's metadata (title/abstract), in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format, auto-detected with [langdetect](https://pypi.org/project/langdetect/). Reflects the metadata language, not necessarily the full text, and is unset when there aren't enough words to guess reliably. See [Languages](/entities/languages/).

### `publication_date`
*String.* The day the work was published, as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date. Where several dates exist, OpenAlex usually picks the earliest electronic-publication date. Applies to the [`primary_location`](#primary_location) version; other [`locations`](#locations) may be earlier.

### `publication_year`
*Integer.* The year the work was published.

### `biblio`
*Object.* Old-style bibliographic pointers, mostly useful in citation contexts. All strings (values like "Spring" or "Inside cover" turn up): `volume`, `issue`, `first_page`, `last_page`.

### `abstract_inverted_index`
*Object.* The abstract as an [inverted index](https://en.wikipedia.org/wiki/Inverted_index) — each word mapped to its positions. OpenAlex does not ship plaintext abstracts for legal reasons; reconstruct the abstract from the index. Newer works are more likely to have one (over 60% of 2022 works vs. ~45% of pre-2000 works).

```json
abstract_inverted_index: { "Despite": [0], "growing": [1], "interest": [2], "in": [3, 57, 73] }
```

### `authorships`
*List.* [Authorship](/entities/authorships/) objects, each pairing an author with their institution(s) and role on the work. Capped at the first 100 authors for performance.

### `corresponding_author_ids`
*List.* OpenAlex IDs of authors whose authorship has `is_corresponding: true`.

### `corresponding_institution_ids`
*List.* OpenAlex IDs of institutions attached to a corresponding author's authorship.

### `countries_distinct_count`
*Integer.* Number of distinct author country codes across the work's authorships.

### `institutions_distinct_count`
*Integer.* Number of distinct institutions across the work's authorships.

### `institutions`
*List.* A flattened, dehydrated list of the distinct [institutions](/entities/institutions/) across the work's [`authorships`](#authorships) — a convenience mirror so you don't have to walk the authorship tree. Recently added and still being backfilled, so it may be empty on works that do have affiliated institutions.

### `primary_location`
*Object.* The [location](/entities/locations/) holding the best (closest to the [version of record](https://en.wikipedia.org/wiki/Version_of_record)) copy — for a journal article, the published full text at the publisher's DOI URL. See [Locations](/entities/locations/) for the object shape.

### `locations`
*List.* Every unique place this work lives, each a [location](/entities/locations/) object.

### `locations_count`
*Integer.* The number of [`locations`](#locations).

### `best_oa_location`
*Object.* The best openly available [location](/entities/locations/), or null if none. "Best" is scored by: must be OA; publisher beats repository; `publishedVersion` beats `acceptedVersion` beats `submittedVersion`; a direct PDF link beats none; and major repositories (PubMed Central, arXiv) rank above others.

### `open_access`
*Object.* The work's access status, an `OpenAccess` object:

- **`is_oa`** *(Boolean)* — true if a free-to-read full text exists somewhere (OpenAlex uses a broad definition: readable without paying or logging in).
- **`oa_status`** *(String)* — one of `diamond`, `gold`, `green`, `hybrid`, `bronze`, or `closed`. The bronze-vs-gold distinction depends on the journal's openness — see [Sources](/entities/sources/#how-we-build-it).
- **`oa_url`** *(String)* — the best OA URL (closest to the version of record); may be a PDF or a landing page.
- **`any_repository_has_fulltext`** *(Boolean)* — true if any location is both OA and hosted by a repository. Surfaces "shadowed green" OA that `oa_status` hides once a publisher-hosted copy exists.

See [Open access](/docs/open-access/) for how these fields combine.

### `apc_list`
*Object.* The work's list-price [article processing charge](https://en.wikipedia.org/wiki/Article_processing_charge) as advertised by the journal (`value`, `currency`, `value_usd`, `provenance` — currently only `doaj`). The listed price, not necessarily what was paid; `apc_list.value` of zero indicates a [diamond-OA](https://en.wikipedia.org/wiki/Diamond_open_access) journal.

### `apc_paid`
*Object.* OpenAlex's best *estimate* of the APC actually paid (`value`, `currency`, `value_usd`, `provenance`). Prefers article-level data from [OpenAPC](https://openapc.net/) (`provenance: "openapc"`); otherwise falls back to the list price. For article-level data only, filter `apc_paid.provenance:openapc`.

### `primary_topic`
*Object.* The top-ranked [topic](/entities/topics/) for the work, with its `subfield`, `field`, and `domain`. Same as the first entry in [`topics`](#topics). See [Aboutness](/entities/aboutness/) for how topics are assigned.

### `topics`
*List.* Up to three ranked [topics](/entities/topics/) for the work, each with a `score` and its subfield/field/domain.

### `keywords`
*List.* Short phrases derived from the work's topics ([keywords](/entities/keywords/)), each with a similarity `score` to the title and abstract. Only keywords above a score threshold are included.

### `concepts`
*List.* Legacy [concept](/entities/concepts/) tags with a `score`. Concepts are a superseded classification retained for continuity; [`topics`](#topics) are the current primary classification. Ancestors of assigned concepts are also included, so you may see low or zero scores.

### `sustainable_development_goals`
*List.* The work's relevance to the UN's [17 Sustainable Development Goals](https://sdgs.un.org/goals), tagged by a machine-learning [classifier](/entities/sdgs/), each with a predicted-probability `score`. All goals scoring above 0.4 are shown.

### `mesh`
*List.* [MeSH](https://www.nlm.nih.gov/mesh/meshhome.html) tag objects. Present only for works sourced from [PubMed](https://pubmed.ncbi.nlm.nih.gov/); an empty list otherwise.

### `cited_by_count`
*Integer.* The number of works that cite this work — the count of successful reference matches pointing at it (see [How we build it](#citations-and-references)).

### `counts_by_year`
*List.* [`cited_by_count`](#cited_by_count) for each of the last ten years, binned by year (years with zero citations omitted; citations older than ten years excluded). See [Common fields](/entities/common-fields/#counts_by_year), including why it can drift from a live count.

### `cited_by_percentile_year`
*Object.* The percentile rank of this work's citation count against other works from the same year, as a `min`/`max` range.

### `fwci`
*Float.* The [Field-Weighted Citation Impact](#field-weighted-citation-impact): citations received divided by citations expected for works of the same type, year, and subfield. 1.0 is world average.

### `citation_normalized_percentile`
*Object.* The same information as [`fwci`](#fwci) expressed as a percentile (`value`, `is_in_top_1_percent`, `is_in_top_10_percent`).

### `referenced_works`
*List.* OpenAlex IDs of the works this work cites (this work ➞ others). See [How we build it](#citations-and-references).

### `referenced_works_count`
*Integer.* The length of [`referenced_works`](#referenced_works).

### `related_works`
*List.* OpenAlex IDs of algorithmically related works — recent papers sharing the most topics with this one.

### `funders`
*List.* Dehydrated [funder](/entities/funders/) objects for this work. Replaces the removed `grants` property.

### `awards`
*List.* [Award](/entities/awards/)/grant objects (`id`, `display_name`, `funder_award_id`, `funder_id`, `funder_display_name`, `doi`) linking the work to specific grants. Replaces the removed `grants` property.

### `has_content`
*Object.* Whether downloadable full text exists in each format: `pdf` (Boolean) and `grobid_xml` (Boolean, TEI XML). About 60 million works have `has_content.pdf: true`. See [Fulltext](/docs/fulltext/).

### `has_fulltext`
*Boolean.* A convenience flag: true if any downloadable full-text format exists for this work (i.e. either `has_content.pdf` or `has_content.grobid_xml`).

### `content_urls`
*Object.* URLs for downloading full-text content, present when [`has_content`](#has_content) indicates the format is available: `pdf` and `grobid_xml`, each a URL under `content.openalex.org` (or null). Fetching requires your API key. Available only through the API, not in the [snapshot](/docs/snapshot/).

### `is_retracted`
*Boolean.* True if the work is known to be retracted, per the [Retraction Watch database](https://doi.org/10.13003/c23rw1d9).

### `is_paratext` *(deprecated)*
*Boolean.* True if the work is [paratext](/entities/work-types/) (covers, tables of contents, mastheads, and similar). Now derived directly from `type` — true exactly when `type` is `paratext`. Filter with `type:paratext` instead.

### `is_xpac`
*Boolean.* True if the work is part of the XPAC (Expansion Pack) dataset — the 190M+ works added in the Walden update, primarily datasets and single-repository records. Data quality on XPAC works is lower but improving. XPAC works are excluded from API results by default; include them with `include_xpac=true`.

### `indexed_in`
*List.* The [indexes](/entities/indexes/) this work is indexed in. Possible values: `arxiv`, `crossref`, `doaj`, `pubmed`.

### `created_date`
*String.* The date the work was added to OpenAlex (`YYYY-MM-DD`). See [Common fields](/entities/common-fields/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to anything in the work object — including citation-count increases. See [Common fields](/entities/common-fields/#updated_date).

### Deprecated fields
- **`host_venue`** and **`alternate_host_venues`** — removed; use [`primary_location`](#primary_location) and [`locations`](#locations). Filtering or grouping on them errors.
- **`grants`** — removed; use [`funders`](#funders) and [`awards`](#awards).
- **`concepts`** — superseded by [`topics`](#topics) (still present; see above).

## In the API

The Works endpoint is at [`api.openalex.org/works`](https://api.openalex.org/works). Fetch a single work by ID — [`/works/W2741809807`](https://api.openalex.org/works/W2741809807) — or a list, and [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over the fields above. Works are excluded from `is_xpac:true` results by default. For the full list of endpoints see the [endpoints index](/api/endpoints/).
