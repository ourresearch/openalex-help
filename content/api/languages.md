---
title: "Languages Overview"
description: "Schema reference for Languages entities"
tags: ["api"]
source_id: "api-reference/languages"
source_url: "https://developers.openalex.org/api-reference/languages"
source_updated: "2026-02-17"
---
Languages represent the languages in which scholarly works are written. OpenAlex automatically detects the language of each work.

## Filter, sort, and group_by fields

The API supports filtering, sorting, and grouping on languages fields. See [Filtering](/api/filtering/), [Sorting](/api/sorting/), and [Grouping](/api/grouping/) for syntax.

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
