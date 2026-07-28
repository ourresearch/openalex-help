---
title: "Continents Overview"
description: "Schema reference for Continents entities"
tags: ["api"]
source_id: "api-reference/continents"
source_url: "https://developers.openalex.org/api-reference/continents"
source_updated: "2026-02-17"
---
Continents represent the major geographic regions of the world. They are used for filtering works by geographic region and for understanding the global distribution of research.

## Filter, sort, and group_by fields

The API supports filtering, sorting, and grouping on continents fields. See [Filtering](/api/filtering/), [Sorting](/api/sorting/), and [Grouping](/api/grouping/) for syntax.

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
