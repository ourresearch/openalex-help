---
title: "Indexes Overview"
description: "All bibliographic indexes in OpenAlex"
tags: ["api"]
source_id: "api-reference/indexes"
source_url: "https://developers.openalex.org/api-reference/indexes"
source_updated: "2026-07-23"
---
Indexes are the bibliographic indexes and registries (like Crossref or PubMed) that list works. A work can be listed in several indexes at once.

## Values

| ID | Display name |
|----|-------------|
| `crossref` | Crossref |
| `datacite` | DataCite |
| `arxiv` | arXiv |
| `doaj` | DOAJ |
| `pubmed` | PubMed |

Use these values with the `indexed_in` filter on works: `filter=indexed_in:doaj`

Like other entities, each index has its own record with live counts — for example, [`/indexes/doaj`](https://api.openalex.org/indexes/doaj) — and the full list is at [`/indexes`](https://api.openalex.org/indexes).
