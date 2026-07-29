---
title: "Work Types Overview"
description: "All work type values in OpenAlex"
tags: ["api"]
source_id: "api-reference/work-types"
source_url: "https://developers.openalex.org/api-reference/work-types"
source_updated: "2026-06-30"
---
Work types classify the form of a scholarly document. Each work has exactly one type. Use these values with the `type` filter: `filter=type:article`.

Full definitions of each type and how OpenAlex assigns them are in [Work types](/docs/work-types/).

## Values

| ID | Meaning |
|----|---------|
| `article` | Original, citable research, usually in a journal |
| `book` | A standalone scholarly book |
| `book-chapter` | A chapter or section within a book |
| `book-review` | An evaluation of a single book |
| `conference-abstract` | A standalone conference/meeting abstract |
| `conference-paper` | A full paper from conference proceedings |
| `data-paper` | A paper describing a dataset |
| `dataset` | The deposited data artifact itself |
| `dissertation` | A thesis or dissertation |
| `editorial` | An editorial, commentary, or interview |
| `erratum` | A correction to a published article |
| `letter` | A letter to the editor or reader reply |
| `libguides` | A library research guide |
| `other` | Catch-all (news, obituaries, full issues, media) |
| `paratext` | Covers, front/back matter, TOCs — packaging, not content |
| `peer-review` | A review/report about a single work |
| `preprint` | An article whose primary location is a preprint server |
| `reference-entry` | An encyclopedia, dictionary, or handbook entry |
| `report` | A technical report or working paper |
| `retraction` | A notice withdrawing an earlier work |
| `review` | A literature, systematic, or meta-analysis review |
| `software` | Research software released as a citable artifact |
| `software-paper` | A paper describing research software |
| `standard` | A formal standard or technical specification |
| `supplementary-materials` | Supporting files for a primary work |

The display name for each type is the same as its ID.

> **Note:**
> `book-review`, `conference-abstract`, `conference-paper`, `data-paper`, and `software-paper` are
> newly added to the vocabulary. They are being rolled out, so coverage is currently low or zero and
> they may not yet appear under [`works?group_by=type`](https://api.openalex.org/works?group_by=type).

> **Warning:**
> The boolean field **`is_paratext` is deprecated** — it is now `true` exactly when `type` is `paratext`. Use `filter=type:paratext` instead of `filter=is_paratext:true`.
