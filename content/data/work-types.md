---
title: "Work types"
description: "The controlled vocabulary of work types — article, preprint, dataset, book, and the rest — what each value means, and how to filter works by type."
tags: ["reference"]
entity:
  example: "types/article"
  api: "work-types"
  serp: "types"
  linksTo:
    - "works"
---
A **work type** classifies the form of a scholarly document: a journal `article`, a `preprint`, a `dataset`, a `book`, and so on. Every [work](/data/works/) has exactly one type, exposed as its [`type`](/data/works/attributes/#type) field, and the type is one value from the controlled vocabulary below. Because the boundary between (say) an article and a dataset is already crisp in the real world, work types are a [vocabulary entity](/data/vocabulary/): OpenAlex doesn't adjudicate what a work *is*, it just standardizes the label so you can filter and group by it reliably. Work types use short, human-readable IDs (`article`, `dataset`) rather than the minted `W`/`A`/`S` scheme; a type's full ID looks like `https://openalex.org/types/article`.

## About

The vocabulary derives from [Crossref](https://www.crossref.org/)'s work types, extended with a handful of OpenAlex additions (e.g. `preprint`, `dataset`, `libguides`, and the newer data/software/conference splits). Every upstream source — Crossref's `type`, DataCite's `resourceType`, PubMed's publication type, HAL, and others — uses its own taxonomy, so OpenAlex maps all of them onto the single vocabulary below, then applies internal heuristics (for example, titles like "Index" or "Cover Picture" become `paratext`). We don't decide the boundary between types; we standardize the label. Approved [curations](/data/curations/) can override the assigned type for an individual work.

## Values

The complete controlled vocabulary (live from [`api.openalex.org/work-types`](https://api.openalex.org/work-types)). The `display_name` for each type is identical to its ID.

| ID | Definition |
|----|------------|
| `article` | Original, citable research usually in a journal, including full research papers, brief communications, technical notes, and full-paper case reports. |
| `book` | A scholarly book published as a complete, standalone volume, such as a monograph or authored or edited volume. |
| `book-chapter` | A single chapter or section within a book, such as a contributed chapter in an edited volume, sometimes presenting original research. |
| `book-review` | An evaluation of one book and its significance, such as a book review or a review essay focused on a single book, usually published in a journal's book-review section. |
| `conference-abstract` | A standalone abstract for a conference or symposium presentation, published without the accompanying full paper, such as a meeting abstract, poster abstract, or abstract-only proceedings record. |
| `conference-paper` | A complete paper delivered at a conference, symposium, or meeting and usually appearing in the published proceedings, including proceedings papers and review talks given at a conference. |
| `data-paper` | A peer-reviewed paper written mainly to describe a dataset, such as a data descriptor or data article, rather than to analyze it. |
| `dataset` | The deposited data artifact itself, such as a dataset, data collection, or database record, typically with its own DOI, not a paper about the data. |
| `dissertation` | A document submitted in completion of an academic degree or professional qualification, such as a PhD or master's thesis or dissertation. |
| `editorial` | A piece expressing the views of an individual, group, or organization on a broad topic rather than on one specific work, such as an editorial, commentary, interview, or research highlight. |
| `erratum` | A journal-issued fix for mistakes in a published article, such as an erratum, corrigendum, or publisher correction, referencing the article it corrects. |
| `letter` | A short message sent by readers to a journal's editor responding to previously published material, such as a letter to the editor, reply, or reader comment. |
| `libguides` | A library research guide (LibGuides) curated by librarians to point users toward resources on a topic or course. |
| `other` | A catch-all for works that fit no other type, such as news items, obituaries, full journal issues, and non-scholarly repository media (photographs, video, audio). |
| `paratext` | Records that package or frame a publication rather than carry its content, such as covers, title pages, tables of contents, and author guidelines. |
| `peer-review` | A peer review or report about a single other work, rather than a survey of many, such as an open peer review, referee report, or reviewer report. |
| `preprint` | An article whose primary location is a preprint repository such as arXiv, bioRxiv, medRxiv, SSRN, or Research Square. |
| `reference-entry` | A self-contained entry within a reference work, such as an encyclopedia article, dictionary entry, or handbook entry. |
| `report` | A technical report or working paper issued outside the journal system by an institution, agency, or company, such as a technical report, white paper, or government report. |
| `retraction` | A notice that formally withdraws an earlier work and explains why, with a reference to the work being retracted. |
| `review` | A journal article that summarizes and evaluates the existing research on a topic without reporting new findings, such as a literature review, systematic review, or meta-analysis. |
| `software` | A research software package or code released as a citable artifact, such as deposited code or a tagged software release with its own identifier, not a paper about it. |
| `software-paper` | A peer-reviewed paper written mainly to describe research software, such as a software article or descriptor, rather than to report research results. |
| `standard` | A formal standard or technical specification from a Standards Development Organization (SDO) or consortium, such as an ISO, IEEE, or W3C standard. |
| `supplementary-materials` | Supporting materials accompanying a primary work, usually a journal article, such as supporting-information files, supplementary figures, tables, or appendices. |

> **Note:** `book-review`, `conference-abstract`, `conference-paper`, `data-paper`, and `software-paper` are newly added to the vocabulary. They are being rolled out, so coverage is currently low or zero and they may not yet appear under [`works?group_by=type`](https://api.openalex.org/works?group_by=type).

## Attributes

Each work type is a small object. Attributes shared with other entities are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this type, e.g. `https://openalex.org/types/article`. See [Common attributes](/data/common-attributes/#id).

### `display_name`
*String.* The human-readable name of the type — identical to the ID's final segment (`article`, `dataset`). See [Common attributes](/data/common-attributes/#display_name).

### `description`
*String.* A one-line definition of the type (the same text shown in the [Values](#values) table above).

### `works_count`
*Integer.* How many [works](/data/works/) carry this type. See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations across all works of this type. See [Common attributes](/data/common-attributes/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL listing every work of this type, e.g. `https://api.openalex.org/works?filter=type:article`.

### `crossref_types`
*List.* The [Crossref](https://www.crossref.org/) type strings that map onto this OpenAlex type — the source-standard values this label standardizes. Available as a selectable column; not returned in the default object.

### `created_date`
*String.* The date this type was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to this type object. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The work-types endpoint is at [`api.openalex.org/work-types`](https://api.openalex.org/work-types); fetch a single type by ID at [`/work-types/article`](https://api.openalex.org/work-types/article). Its main use is filtering [works](/data/works/) by type: [`filter=type:dataset`](https://api.openalex.org/works?filter=type:dataset), or group works by type with [`group_by=type`](https://api.openalex.org/works?group_by=type). See [Filtering](/api/filtering/) for filter syntax and the [endpoints index](/api/endpoints/) for all endpoints. The `paratext` type replaces the deprecated boolean `is_paratext` field — filter `type:paratext` instead of `is_paratext:true`.
