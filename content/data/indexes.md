---
title: "Indexes"
updated: 2026-11-13
description: "The external bibliographic indexes a work or source can appear in, the fields on an index object, and how to filter works by index."
tags: ["reference"]
source_id: "api-reference/indexes"
source_url: "https://developers.openalex.org/api-reference/indexes"
source_updated: "2026-07-23"
entity:
  example: "indexes/doaj"
  api: "indexes"
  linksTo:
    - "works"
    - "sources"
---
An **index** is an external bibliographic index or registry that a work can be listed in — Crossref, PubMed, DataCite, DOAJ, arXiv. Indexes are a [vocabulary](/data/vocabulary/): they're not native, judgment-call IDs, just consistent handles on crisply-existing external lists. A single work can appear in several indexes at once, so each work carries an [`indexed_in`](/data/works/attributes/#indexed_in) list, and a [source](/data/sources/) records which of these indexes cover it. An index's OpenAlex ID looks like `https://openalex.org/indexes/doaj`; fetch one at [`api.openalex.org/indexes/doaj`](https://api.openalex.org/indexes/doaj).

## About

The list is the set of external indexes and registries OpenAlex tracks as sources of works: DOI-registration agencies (Crossref, DataCite), curated indexes (DOAJ, PubMed), and a preprint repository (arXiv). We record which of them lists each work; a work can be in more than one. There are 5 indexes.

Indexes are about works. For lists of *journals* (CWTS Core, DOAJ's journal list, national lists of health journals and so on), see [Source lists](/data/source-lists/).

### DOAJ: journal list and article index

The [Directory of Open Access Journals](https://doaj.org/) (DOAJ) keeps two things: a **journal list** (the journals it has accepted) and an **article index** (records of single articles, which publishers send to DOAJ). OpenAlex has one attribute for each:

- **Journal level: is the journal on DOAJ's journal list?** [`is_in_doaj`](/data/sources/attributes/#is_in_doaj) on the source, which is the same as `doaj` in its [`listed_in`](/data/sources/attributes/#listed_in) ([source lists](/data/source-lists/)). To filter works by it, go through the work's source: `filter=primary_location.source.is_in_doaj:true`.
- **Article level: does DOAJ's article index hold a record of this work?** `doaj` in the work's [`indexed_in`](/data/works/attributes/#indexed_in) ([indexes](/data/indexes/)): `filter=indexed_in:doaj`.

The two answers can differ. A work in a DOAJ journal lacks `indexed_in:doaj` when DOAJ's article index holds no record of that article. Publishers choose whether to send article records to DOAJ, and about 3,800 of the 23,700 DOAJ journals have sent none. About 10 million works are in a DOAJ journal without a DOAJ article record. So use the journal-level attribute for "published in a DOAJ journal", and the article-level one only for "DOAJ lists this article".

## Values

The complete list of all 5 indexes:

| ID | Display name | What it indexes |
|----|--------------|-----------------|
| `crossref` | Crossref | The largest DOI-registration agency: journal articles, books, conference proceedings |
| `pubmed` | PubMed | The National Library of Medicine's biomedical and life-sciences literature |
| `datacite` | DataCite | A DOI-registration agency focused on research data and other non-traditional outputs |
| `doaj` | DOAJ | The article index of the Directory of Open Access Journals: articles DOAJ holds a record of. Not the same as the journal being in DOAJ ([see above](#doaj-journal-list-and-article-index)) |
| `arxiv` | arXiv | The open-access preprint repository for physics, math, CS, and related fields |

The live list is at [`api.openalex.org/indexes`](https://api.openalex.org/indexes).

## Attributes

The top-level fields on an **index** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this index, e.g. `https://openalex.org/indexes/doaj`. See [Common attributes](/data/common-attributes/#id).

### `display_name`
*String.* The index's name, e.g. `DOAJ`. See [Common attributes](/data/common-attributes/#display_name).

### `description`
*String.* A short one-line description of the index and what it covers.

### `works_count`
*Integer.* How many works are listed in this index. See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations across those works. See [Common attributes](/data/common-attributes/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for every work in this index (`filter=indexed_in:<ID>`).

### `created_date`
*String.* When the index record was added to OpenAlex (`YYYY-MM-DDTHH:MM:SS`; only the day is recorded, so the time is always `00:00:00`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* When the index record last changed. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Indexes endpoint is at [`api.openalex.org/indexes`](https://api.openalex.org/indexes). Fetch one by ID — [`/indexes/doaj`](https://api.openalex.org/indexes/doaj) — or list all five.

Indexes are most useful as a filter on [works](/data/works/): `filter=indexed_in:doaj` returns works that DOAJ's article index holds a record of (not every work in a DOAJ journal: see [DOAJ: journal list and article index](#doaj-journal-list-and-article-index)), `filter=indexed_in:crossref` those with a Crossref record, and `group_by=indexed_in` breaks a result set down by index. On [sources](/data/sources/), the same information appears as which indexes cover the source. See [Filtering](/api/filtering/) for the full syntax and the [endpoints index](/api/endpoints/) for every endpoint.
