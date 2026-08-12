---
title: "Source types"
description: "The controlled vocabulary of source types — journal, repository, conference, book series, and more — what each value means, and how to filter works by the type of venue that hosts them."
tags: ["reference"]
entity:
  example: "source-types/journal"
  api: "source-types"
  linksTo:
    - "sources"
---
A **source type** classifies the kind of venue where works are hosted: a `journal`, a `repository`, a `conference` proceedings, a `book series`, an `ebook platform`. Every [source](/data/sources/) has exactly one type, exposed as its `type` field, chosen from the short controlled vocabulary below. Because a venue's kind already exists crisply in the real world, source types are a [vocabulary entity](/data/vocabulary/): OpenAlex doesn't adjudicate what a source *is*, it just standardizes the label so you can filter and group by it reliably. Source types use short, human-readable IDs (`journal`, `repository`) rather than the minted `W`/`A`/`S` scheme; a type's full ID looks like `https://openalex.org/source-types/journal`.

## About

The vocabulary is a small, fixed set of venue kinds. OpenAlex assigns each [source](/data/sources/) a single type from the list below based on its metadata and origin (journals and their ISSNs from Crossref and the [DOAJ](https://doaj.org/), repositories from their harvested registries, and so on). We don't decide the boundary between a journal and a repository; we standardize the label. See the [Sources guide](/data/sources/) for more.

## Values

The complete controlled vocabulary (live from [`api.openalex.org/source-types`](https://api.openalex.org/source-types)). The `display_name` for each type is identical to its ID.

| ID | Definition |
|----|------------|
| `journal` | Peer-reviewed periodicals like *Nature* or *The Lancet* that publish research on a regular schedule. |
| `repository` | Open archives like Zenodo, PubMed, and Figshare where researchers deposit papers, data, and preprints. |
| `ebook platform` | Digital platforms hosting scholarly books and monographs. |
| `book series` | Numbered collections of scholarly books published under a shared series title. |
| `conference` | Proceedings and abstracts from academic conferences, like IEEE and IOP Conference Series. |
| `other` | Sources that don't fit the standard categories above. |

## Attributes

Each source type is a small object. Attributes shared with other entities are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this type, e.g. `https://openalex.org/source-types/journal`. See [Common attributes](/data/common-attributes/#id).

### `display_name`
*String.* The human-readable name of the type — identical to the ID's final segment (`journal`, `repository`). See [Common attributes](/data/common-attributes/#display_name).

### `description`
*String.* A one-line definition of the type (the same text shown in the [Values](#values) table above).

### `works_count`
*Integer.* How many [works](/data/works/) have a location whose source is of this type. See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations across all works hosted by sources of this type. See [Common attributes](/data/common-attributes/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL listing every work hosted by a source of this type, e.g. `https://api.openalex.org/works?filter=locations.source.type:journal`.

### `created_date`
*String.* The date this type was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to this type object. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The source-types endpoint is at [`api.openalex.org/source-types`](https://api.openalex.org/source-types); fetch a single type by ID at [`/source-types/journal`](https://api.openalex.org/source-types/journal). To filter [sources](/data/sources/) themselves by type, use [`filter=type:journal`](https://api.openalex.org/sources?filter=type:journal) on the sources endpoint. To filter [works](/data/works/) by the type of venue that hosts them, filter on the source's type through a location: [`filter=locations.source.type:repository`](https://api.openalex.org/works?filter=locations.source.type:repository) (or `primary_location.source.type` for just the primary venue). See [Filtering](/api/filtering/) for filter syntax and the [endpoints index](/api/endpoints/) for all endpoints.
