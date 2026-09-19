---
title: "Locations"
updated: 2026-09-18
description: "Each place a version of a work is available — the publisher's site, a repository, a preprint server — with its version, license, and open-access status; what every attribute means, and how to list, filter, search and group locations directly at /locations."
tags: ["reference"]
entity:
  linksTo:
    - "works"
    - "sources"
---
A **location** is a place where a version of a [work](/data/works/) is available: the publisher's website, an institutional or subject repository, a preprint server. One work can have many locations — the same paper hosted as the version of record at the publisher, as an accepted manuscript in a repository, and as a submitted preprint on arXiv. Locations are a [component](/data/component/) entity: OpenAlex doesn't mint an ID for them, and you'll most often meet them inline on a work, in the [`locations`](/data/works/attributes/#locations) list plus the [`primary_location`](/data/works/attributes/#primary_location) and [`best_oa_location`](/data/works/attributes/#best_oa_location) pointers. But they are also a queryable entity in their own right: the [`/locations`](https://api.openalex.org/locations) endpoint lists, filters, searches, and groups every harvested copy directly, and each copy is addressable by a namespaced id like `doi:10.7717/peerj.4375` or `pmh:oai:arXiv.org:cond-mat/0404022` (see [In the API](#in-the-api)). You can browse them the same way in the web app at [openalex.org/locations](https://openalex.org/locations).

Locations are where OpenAlex starts. Every copy we harvest arrives as a location, and the core job of building the catalog is [matching locations into works](/data/works/#how-locations-become-works): recognizing that the arXiv preprint, the journal article, and the repository manuscript are three locations of one work.

## About

### One location per version

A work exists in several forms — the author's **submitted** manuscript, the peer-reviewed **accepted** manuscript, and the publisher's **published** version of record — often hosted in different places. Each location carries a [`version`](#version) field recording which of these it holds, following the [DRIVER Guidelines](https://wiki.surfnet.nl/display/DRIVERguidelines/DRIVER-VERSION+Mappings) standard: `publishedVersion` (most authoritative), `acceptedVersion`, then `submittedVersion`.

### Where locations come from

The publisher location comes from the work's own source record (the DOI's landing page and metadata). The repository and preprint locations come from **harvesting** open copies across the web — the same Unpaywall-style approach that scans institutional repositories, subject repositories (arXiv, PubMed Central, HAL, Zenodo), and aggregators (DOAJ, Europe PMC) for freely available versions of the work. Each distinct copy OpenAlex finds becomes a location, with its own hosting [`source`](#source), [`license`](#license), and open-access status. Locations always point at someone else's copy; OpenAlex's own cached full text for a work lives separately, in the work's [`content_urls`](/data/works/attributes/#content_urls) (see [Fulltext](/access/fulltext/)).

### Best-OA selection

From all of a work's locations, OpenAlex designates a [`primary_location`](/data/works/attributes/#primary_location) (the copy closest to the version of record — for a journal article, the published full text at the publisher) and a [`best_oa_location`](/data/works/attributes/#best_oa_location) (the best *freely readable* copy, or null if none). "Best OA" is scored: the location must be OA; publisher beats repository; `publishedVersion` beats `acceptedVersion` beats `submittedVersion`; a direct PDF link beats none; and major repositories (PubMed Central, arXiv) rank above others. This is what feeds the work's [`open_access`](/data/works/attributes/#open_access) `oa_url` and `oa_status`.

## Attributes

This is the dictionary of every attribute on a **location** object as it appears inline on a work, in [`locations`](/data/works/attributes/#locations), [`primary_location`](/data/works/attributes/#primary_location), and [`best_oa_location`](/data/works/attributes/#best_oa_location). Locations are a component entity, so they carry none of the [common attributes](/data/common-attributes/): no minted OpenAlex ID, no `display_name`, no `works_count`. The [`id`](#id) is a *namespaced* handle built from the identifier the copy was harvested under, not an `L…`-style OpenAlex ID. Rows from the [`/locations`](#the-locations-endpoint) endpoint carry a superset of these attributes; the extras are listed [below](#extra-attributes-on-locations-rows).

### `id`
*String.* The location's namespaced id: the identifier this copy was harvested under, prefixed with its namespace — `doi:10.7717/peerj.4375`, `pmh:oai:arXiv.org:cond-mat/0404022` (an OAI-PMH record id, for repository copies), `pmid:29456894`, `mag:1000037129`. Ids contain `/` and `:` and are **case-sensitive**, so copy them verbatim. Fetch the full record at `/locations/{id}` (see [Fetching one location](#fetching-one-location)). The id is stable for the underlying harvested record: when duplicate works are merged, the surviving work carries the location and its `id` with it, which is how snapshot consumers [trace merges](/access/sync/#tracing-merges-location-ids-move-to-the-surviving-work).

### `is_oa`
*Boolean.* True if this specific copy is a free-to-read full text (OpenAlex's broad definition: readable without paying or logging in). A work can have some OA locations and some not.

### `landing_page_url`
*String.* The URL of the page describing and linking to this copy of the work — for a publisher location, the DOI URL; for a repository, the record page.

### `pdf_url`
*String.* A direct link to a full-text PDF of this copy, or null when only a landing page is known. A direct PDF link is one of the tie-breakers in best-OA scoring. This is the host's PDF, not OpenAlex's cached copy; for that, see [`content_urls`](/data/works/attributes/#content_urls).

### `source`
*Object.* The dehydrated [source](/data/sources/) hosting this copy — the journal, repository, or platform. Keys include `id`, `display_name`, `issn_l`, `issn`, `is_oa`, `is_in_doaj`, `is_core`, [`listed_in`](/data/sources/attributes/#listed_in), `type`, and the host organization (`host_organization`, `host_organization_name`, `host_organization_lineage`, `host_organization_lineage_names`). May be null for locations whose host isn't a known source.

### `license`
*String.* The license this copy is available under, as a normalized short code, e.g. `cc-by`, `cc-by-sa`, or null if unknown. Different locations of the same work can carry different licenses.

### `license_id`
*String.* The OpenAlex ID for the [license](/data/licenses/), e.g. `https://openalex.org/licenses/cc-by` — the canonical handle for the same license named in [`license`](#license).

### `version`
*String.* Which version this copy holds: `publishedVersion`, `acceptedVersion`, or `submittedVersion` (or null when it can't be determined). See [One location per version](#one-location-per-version) for what each value means.

### `is_accepted`
*Boolean.* True if this copy is at least an accepted manuscript — i.e. `version` is `acceptedVersion` or `publishedVersion`. A convenience flag so you don't have to compare version strings.

### `is_published`
*Boolean.* True if this copy is the published version of record — i.e. `version` is `publishedVersion`.

### `raw_source_name`
*String.* The hosting venue's name exactly as it arrived on the record, before it was matched to a [source](/data/sources/) — the unnormalized input behind [`source`](#source).

### `raw_type`
*String.* The work's type as this location's source labeled it (e.g. `journal-article`), before normalization to the work's OpenAlex [`type`](/data/works/attributes/#type).

### Extra attributes on `/locations` rows

A row from the [list endpoint](#the-locations-endpoint) is the harvested record itself. It has the attributes above, except that the hosting source is flattened to `source_id` and `source_name` (no nested `source` object) and the inline conveniences `is_accepted`, `is_published`, `license_id`, and `raw_source_name` are absent. On top of those it carries:

| Attribute | Type | Meaning |
|---|---|---|
| `work_id` | String | The OpenAlex ID of the [work](/data/works/) this copy was matched into. |
| `native_id` | String | The bare identifier the copy was harvested under (`10.7717/peerj.4375`, `oai:arXiv.org:cond-mat/0404022`): the `id` without its namespace prefix. |
| `native_id_namespace` | String | Which identifier system `native_id` belongs to: `doi`, `pmh`, `pmid`, `mag`, or `openalex_curation`. |
| `provenance` | String | Which pipeline delivered the record: `crossref`, `datacite`, `pubmed`, `mag`, `repo` (OAI-PMH harvest), `repo_backfill`, or `curation`. |
| `endpoint_id` | String | For repository copies, the id of the OAI-PMH endpoint the record was harvested from; null for publisher records. Filter on it to see everything harvested from one repository. |
| `title` | String | The title as it appears on this copy's record. This is what `search=` matches. |
| `type` | String | The normalized [work type](/data/work-types/) declared on this copy's record; `raw_type` keeps the source's own label. |
| `source_id`, `source_name`, `publisher` | String | The hosting [source](/data/sources/) as an OpenAlex ID, the source name as it arrived on the record, and the publisher named on the record. |
| `language` | String | The record's language code. |
| `is_retracted` | Boolean | Whether this copy's record is flagged as retracted. |
| `ids`, `urls` | List | Every identifier on the record (each with its `namespace`) and every URL (each with a `content_type`). |
| `merge_key` | Object | The keys used to [match this location into a work](/data/works/#how-locations-become-works): `doi`, `arxiv`, `pmid`, `title_author`. |
| `ingested_at` | Datetime | When OpenAlex acquired this record, where known. For repository copies (`provenance` `repo`) it is when the harvested file landed in OpenAlex's store, so it doubles as the harvest time. One caveat: copies whose files were consolidated in a January 2025 backfill all carry `2025-01-16`, the date that backfill was written rather than when they were harvested. That is about 45% of repository copies today, so exclude that day when charting harvest activity. Publisher and aggregator copies are mostly null (`crossref`, `datacite`, `mag`; `pubmed` is nearly complete); where a value exists it is when the pipeline last processed the record, not a harvest time. Never a publication date. Filterable with ranges (`ingested_at:>2026-09-01`), sortable, not groupable. |

## In the API

Locations reach you two ways: inline on works, and directly from their own endpoint.

### Inline on works

Select [`locations`](/data/works/attributes/#locations), [`primary_location`](/data/works/attributes/#primary_location), or [`best_oa_location`](/data/works/attributes/#best_oa_location) on a [work](/data/works/) and the location objects appear inline. Works can be filtered on location attributes with dotted filter keys, available on all three location slots — for example:

- `locations.is_oa`, `locations.version`, `locations.license`, `locations.license_id`
- `locations.source.id`, `locations.source.type`, `locations.source.is_in_doaj`, `locations.source.is_core`, `locations.source.listed_in` (values are [source list](/data/source-lists/) ids)
- the same keys under `primary_location.` and `best_oa_location.` (e.g. `best_oa_location.is_oa`, `primary_location.source.id`)

See [Filtering](/api/filtering/) for the syntax and the [Works reference](/data/works/) for the complete list of location filter keys.

### The `/locations` endpoint

[`api.openalex.org/locations`](https://api.openalex.org/locations) lists every harvested copy as its own row (about 650 million of them), with the standard [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group_by](/api/grouping/), [select](/api/selecting-fields/), and [paging](/api/paging/) mechanics. Use it when the question is about copies rather than works: what one repository has contributed, which versions and licenses are out there, what arrived last week.

```bash
# Accepted manuscripts that are free to read
https://api.openalex.org/locations?filter=version:acceptedVersion,is_oa:true

# Everything harvested from arXiv (S4306400194), excluding preprints
https://api.openalex.org/locations?filter=source_id:S4306400194,version:!submittedVersion

# Every copy of one work
https://api.openalex.org/locations?filter=work_id:W1000037129

# Everything harvested from one OAI-PMH endpoint
https://api.openalex.org/locations?filter=endpoint_id:b2cf508dd15910823cc

# Look a record up by the identifier it was harvested under
https://api.openalex.org/locations?filter=native_id:oai:digital.csic.es:10261/28939

# Records ingested since September 1, newest first
https://api.openalex.org/locations?filter=ingested_at:>2026-09-01&sort=ingested_at:desc

# Title search (same as filter=title.search:climate)
https://api.openalex.org/locations?search=climate
```

Filterable and groupable: `is_oa`, `version`, `license`, `language`, `type`, `raw_type`, `provenance`, `native_id`, `native_id_namespace`, `source_id`, `source_name`, `publisher`, `endpoint_id`, `work_id`, `is_retracted`, `title`, and `id`. `ingested_at` is filterable (with ranges) and sortable but not groupable. `search=` matches the copy's title. The live list, with operators, is at [`/properties/locations`](https://api.openalex.org/properties/locations).

Group counts answer the corpus-wide questions:

```bash
# How many copies of each version exist?
https://api.openalex.org/locations?group_by=version

# The license mix across every copy
https://api.openalex.org/locations?group_by=license

# Which versions arXiv holds
https://api.openalex.org/locations?filter=source_id:S4306400194&group_by=version
```

### Fetching one location

`GET /locations/{id}` returns the full row. The bare namespaced id, the `locations/`-prefixed key, and the full openalex.org URL pasted as-is are all accepted:

```bash
https://api.openalex.org/locations/doi:10.7717/peerj.4375
https://api.openalex.org/locations/locations/doi:10.7717/peerj.4375
https://api.openalex.org/locations/https://openalex.org/locations/doi:10.7717/peerj.4375
https://api.openalex.org/locations/pmh:oai:digital.csic.es:10261/28939
```

Unlike OpenAlex IDs, location ids are **case-sensitive** and contain `/` and `:`. Copy them verbatim from a response; `doi:10.7717/PEERJ.4375` is a 404.

### In OQL

[OQL](/access/oql/) treats locations like any other entity. Run these at the API root (`GET /?oql=…`), or paste them into the web app at [openalex.org/locations](https://openalex.org/locations):

```
locations where version is (publishedVersion)
locations where license is (cc-by)
locations where source is (sources/S4306400194) group by version
locations where title has (climate)
locations group by license
```
