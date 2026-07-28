---
title: "Topics Overview"
description: "Schema reference for Topics entities"
tags: ["api"]
source_id: "api-reference/topics"
source_url: "https://developers.openalex.org/api-reference/topics"
source_updated: "2026-02-17"
---
Topics are research areas automatically assigned to works. Topics exist in a four-level hierarchy: domain > field > subfield > topic.

## Filter, sort, and group_by fields

The API supports filtering, sorting, and grouping on topics fields. See [Filtering](/api/filtering/), [Sorting](/api/sorting/), and [Grouping](/api/grouping/) for syntax.

Fields marked **(deprecated)** are `.search` filters — use the [`search` parameter](/api/searching/) instead.

| Field | Sort | Group_by | Filter |
|-------|:----:|:--------:|:------:|
| `cited_by_count` | ✓ | ✓ | ✓ |
| `default.search` **(deprecated)** |  |  | ✓ |
| `description.search` **(deprecated)** |  |  | ✓ |
| `display_name` | ✓ |  | ✓ |
| `display_name.search` **(deprecated)** |  |  | ✓ |
| `domain.id` | ✓ | ✓ | ✓ |
| `field.id` | ✓ | ✓ | ✓ |
| `from_created_date` | ✓ |  | ✓ |
| `id` | ✓ | ✓ | ✓ |
| `ids.openalex` | ✓ | ✓ | ✓ |
| `keywords.search` **(deprecated)** |  |  | ✓ |
| `openalex` | ✓ | ✓ | ✓ |
| `subfield.id` | ✓ | ✓ | ✓ |
| `works_count` | ✓ | ✓ | ✓ |
