---
title: "Countries Overview"
description: "Schema reference for Countries entities"
tags: ["api"]
source_id: "api-reference/countries"
source_url: "https://developers.openalex.org/api-reference/countries"
source_updated: "2026-02-17"
---
Countries represent geographic nations. They are used for filtering works by author affiliation country, and for understanding the geographic distribution of research.

## Filter, sort, and group_by fields

The API supports filtering, sorting, and grouping on countries fields. See [Filtering](/api/filtering/), [Sorting](/api/sorting/), and [Grouping](/api/grouping/) for syntax.

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
