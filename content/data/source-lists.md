---
title: "Source lists"
updated: 2026-09-18
description: "The external journal lists a source can appear on (DOAJ, CWTS Core, national lists), the fields on a source-list object, and how to filter sources and works by list."
tags: ["reference"]
entity:
  example: "source-lists/doyens"
  api: "source-lists"
  linksTo:
    - "sources"
    - "works"
---
A **source list** is an externally maintained list of journals that a [source](/data/sources/) can appear on: the [Directory of Open Access Journals](https://doaj.org/), the [CWTS Core sources list](https://zenodo.org/records/13879982), a national list of recommended health journals. Source lists are a [vocabulary](/data/vocabulary/): consistent handles on lists that exist outside OpenAlex, maintained by someone else. Each source carries a [`listed_in`](/data/sources/attributes/#listed_in) array of the lists it is on, and the dehydrated source inside every work [location](/data/locations/) carries the same array, so works can be filtered by the lists their journal is on. A source list's OpenAlex ID looks like `https://openalex.org/source-lists/doyens`; fetch one at [`api.openalex.org/source-lists/doyens`](https://api.openalex.org/source-lists/doyens).

Membership is all OpenAlex records. A list's page says who maintains it, what it covers and which edition is loaded; it never says the list is right, and OpenAlex does not endorse any list. See [Allow lists](/data/sources/#allow-lists) for why we prefer this over deny lists.

## About

OpenAlex prefers **allow lists** to deny lists: they are transparent, easy to maintain and a sound basis for retrieval. The oldest ones arrived as booleans ([`is_in_doaj`](/data/sources/attributes/#is_in_doaj), [`is_core`](/data/sources/attributes/#is_core)); `listed_in` and this entity are the general form, and the booleans are kept for compatibility.

A source list is not an [index](/data/indexes/). An index records which external registries list a given *work* ([`indexed_in`](/data/works/attributes/#indexed_in)); a source list records which lists a *journal* is on. DOAJ appears in both, answering different questions: is this article in DOAJ's index, versus is this journal a DOAJ member.

Lists are matched to sources by ISSN, and only a list's current members count: a journal its maintainer has withdrawn is not `listed_in`. Each list is loaded from the maintainer's published file, so membership is as current as the loaded edition (`list_version`). Spotted a newer edition, or know an open, ISSN-keyed list we should add? [Tell us](/how-to/support/).

## Values

| ID | Display name | Maintained by | Scope |
|----|--------------|---------------|-------|
| `cwts-core` | CWTS Core | [CWTS](https://www.cwts.nl/), Leiden University | All fields; the venues behind the Leiden Ranking Open Edition. About 36,000 sources |
| `doaj` | DOAJ | [DOAJ](https://doaj.org/) | Fully-OA journals, all fields. About 23,000 sources |
| `doyens` | Doyens de Médecine (FR) | [Conférence des Doyens de Médecine and CNU Santé](https://conferencedesdoyensdemedecine.org/la-conference-des-doyens-de-medecine-et-du-cnu-sante-luttent-contre-les-revues-predatrices/) (France) | Health, medicine and biology journals, in French and English. About 3,300 sources; 2026-07-01 edition |

The live list is at [`api.openalex.org/source-lists`](https://api.openalex.org/source-lists).

## Attributes

The top-level fields on a **source list** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this list, e.g. `https://openalex.org/source-lists/doyens`. The last segment is the value that appears in `listed_in`.

### `display_name`
*String.* The list's name as its maintainer publishes it, e.g. `Liste de revues recommandables (CDD / CNU Santé)`.

### `description`
*String.* What the list covers, in a sentence.

### `maintainer`
*String.* The organisation that maintains the list.

### `url`
*String.* Where the maintainer publishes the list.

### `list_version`
*String.* The edition currently loaded, as a date (`YYYY-MM-DD`); null for lists derived continuously from another feed (DOAJ, CWTS Core).

### `sources_count`
*Integer.* How many OpenAlex sources are on this list.

### `works_count`
*Integer.* How many works have their primary location in a source on this list. See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations across those works. See [Common attributes](/data/common-attributes/#cited_by_count).

### `sources_api_url`
*String.* A ready-made [Sources](/data/sources/) API URL for every source on this list (`filter=listed_in:<ID>`).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for every work whose primary location is on this list (`filter=primary_location.source.listed_in:<ID>`).

### `created_date`
*String.* When the list was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* When the list record last changed. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Source lists endpoint is at [`api.openalex.org/source-lists`](https://api.openalex.org/source-lists). Fetch one by ID, [`/source-lists/doyens`](https://api.openalex.org/source-lists/doyens), or list them all.

Source lists are most useful as a filter. On [sources](/data/sources/), `filter=listed_in:doyens` returns the journals on the list and `group_by=listed_in` splits a result set across lists. On [works](/data/works/), `filter=primary_location.source.listed_in:doyens` returns works published in those journals; `locations.source.listed_in` and `best_oa_location.source.listed_in` do the same for any location and the best OA location. See [Filtering](/api/filtering/) for the syntax and the [endpoints index](/api/endpoints/) for every endpoint.

On [openalex.org](https://openalex.org), the same thing is the **listed in** filter on sources ([example](https://openalex.org/sources?filter=listed_in:doyens)) and **source listed in** on works ([example](https://openalex.org/works?filter=primary_location.source.listed_in:doyens)).
