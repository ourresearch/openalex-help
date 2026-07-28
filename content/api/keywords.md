---
title: "Keywords Overview"
description: "Schema reference for Keywords entities"
tags: ["api"]
source_id: "api-reference/keywords"
source_url: "https://developers.openalex.org/api-reference/keywords"
source_updated: "2026-02-17"
---
Keywords are short words or phrases assigned to works using an automated system based on Topics.

## Filter, sort, and group_by fields

The API supports filtering, sorting, and grouping on keywords fields. See [Filtering](/api/filtering/), [Sorting](/api/sorting/), and [Grouping](/api/grouping/) for syntax.

Fields marked **(deprecated)** are `.search` filters — use the [`search` parameter](/api/searching/) instead.

| Field | Sort | Group_by | Filter |
|-------|:----:|:--------:|:------:|
| `cited_by_count` | ✓ | ✓ | ✓ |
| `default.search` **(deprecated)** |  |  | ✓ |
| `display_name` | ✓ |  | ✓ |
| `display_name.search` **(deprecated)** |  |  | ✓ |
| `from_created_date` | ✓ |  | ✓ |
| `id` | ✓ | ✓ | ✓ |
| `works_count` | ✓ | ✓ | ✓ |
