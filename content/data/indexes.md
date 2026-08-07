---
title: "Indexes"
description: "The external bibliographic indexes a work or source can appear in, the fields on an index object, and how to filter works by index."
tags: ["reference"]
source_id: "api-reference/indexes"
source_url: "https://developers.openalex.org/api-reference/indexes"
source_updated: "2026-07-23"
---
An **index** is an external bibliographic index or registry that a work can be listed in — Crossref, PubMed, DataCite, DOAJ, arXiv. Indexes are a [vocabulary](/data/vocabulary/): they're not native, judgment-call IDs, just consistent handles on crisply-existing external lists. A single work can appear in several indexes at once, so each work carries an [`indexed_in`](/data/works/#indexed_in) list, and a [source](/data/sources/) records which of these indexes cover it. An index's OpenAlex ID looks like `https://openalex.org/indexes/doaj`; fetch one at [`api.openalex.org/indexes/doaj`](https://api.openalex.org/indexes/doaj).

## How it's made

The list is the set of external indexes and registries OpenAlex tracks as sources of works: DOI-registration agencies (Crossref, DataCite), curated indexes (DOAJ, PubMed), and a preprint repository (arXiv). We record which of them lists each work; a work can be in more than one. There are 5 indexes.

## Values

The complete list of all 5 indexes:

| ID | Display name | What it indexes |
|----|--------------|-----------------|
| `crossref` | Crossref | The largest DOI-registration agency: journal articles, books, conference proceedings |
| `pubmed` | PubMed | The National Library of Medicine's biomedical and life-sciences literature |
| `datacite` | DataCite | A DOI-registration agency focused on research data and other non-traditional outputs |
| `doaj` | DOAJ | The Directory of Open Access Journals, a curated index of peer-reviewed OA journals |
| `arxiv` | arXiv | The open-access preprint repository for physics, math, CS, and related fields |

The live list is at [`api.openalex.org/indexes`](https://api.openalex.org/indexes).

## Fields

The top-level fields on an **index** object. Fields shared with other entities ([`id`](/data/common-fields/#id), [`display_name`](/data/common-fields/#display_name), [`works_count`](/data/common-fields/#works_count), [`cited_by_count`](/data/common-fields/#cited_by_count), [`created_date`](/data/common-fields/#created_date), [`updated_date`](/data/common-fields/#updated_date)) are documented once on [Common fields](/data/common-fields/).

### `id`
*String.* The [OpenAlex ID](/data/overview/#the-openalex-id-scheme) for this index, e.g. `https://openalex.org/indexes/doaj`. See [Common fields](/data/common-fields/#id).

### `display_name`
*String.* The index's name, e.g. `DOAJ`. See [Common fields](/data/common-fields/#display_name).

### `description`
*String.* A short one-line description of the index and what it covers.

### `works_count`
*Integer.* How many works are listed in this index. See [Common fields](/data/common-fields/#works_count).

### `cited_by_count`
*Integer.* Total citations across those works. See [Common fields](/data/common-fields/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for every work in this index (`filter=indexed_in:<ID>`).

### `created_date`
*String.* When the index record was added to OpenAlex (`YYYY-MM-DD`). See [Common fields](/data/common-fields/#created_date).

### `updated_date`
*String.* When the index record last changed. See [Common fields](/data/common-fields/#updated_date).

## In the API

The Indexes endpoint is at [`api.openalex.org/indexes`](https://api.openalex.org/indexes). Fetch one by ID — [`/indexes/doaj`](https://api.openalex.org/indexes/doaj) — or list all five.

Indexes are most useful as a filter on [works](/data/works/): `filter=indexed_in:doaj` returns works listed in DOAJ, `filter=indexed_in:crossref` those with a Crossref record, and `group_by=indexed_in` breaks a result set down by index. On [sources](/data/sources/), the same information appears as which indexes cover the source. See [Filtering](/api/filtering/) for the full syntax and the [endpoints index](/api/endpoints/) for every endpoint.
