---
title: "Publishers Overview"
description: "Schema reference for Publishers entities"
tags: ["api"]
source_id: "api-reference/publishers"
source_url: "https://developers.openalex.org/api-reference/publishers"
source_updated: "2026-02-17"
---
Publishers are companies and organizations that distribute works. Publishers can have a hierarchical structure (parent/child relationships).

## Filter, sort, and group_by fields

The API supports filtering, sorting, and grouping on publishers fields. See [Filtering](/api/filtering/), [Sorting](/api/sorting/), and [Grouping](/api/grouping/) for syntax.

Fields marked **(deprecated)** are `.search` filters — use the [`search` parameter](/api/searching/) instead.

| Field | Sort | Group_by | Filter |
|-------|:----:|:--------:|:------:|
| `cited_by_count` | ✓ | ✓ | ✓ |
| `continent` | ✓ | ✓ | ✓ |
| `country_codes` | ✓ | ✓ | ✓ |
| `default.search` **(deprecated)** |  |  | ✓ |
| `display_name` | ✓ |  | ✓ |
| `display_name.search` **(deprecated)** |  |  | ✓ |
| `from_created_date` | ✓ |  | ✓ |
| `hierarchy_level` | ✓ | ✓ | ✓ |
| `ids.openalex` | ✓ | ✓ | ✓ |
| `ids.ror` | ✓ | ✓ | ✓ |
| `ids.wikidata` | ✓ | ✓ | ✓ |
| `lineage` | ✓ | ✓ | ✓ |
| `openalex` |  | ✓ | ✓ |
| `openalex_id` | ✓ | ✓ | ✓ |
| `parent_publisher` | ✓ | ✓ | ✓ |
| `roles.id` | ✓ | ✓ | ✓ |
| `ror` | ✓ | ✓ | ✓ |
| `summary_stats.2yr_mean_citedness` | ✓ | ✓ | ✓ |
| `summary_stats.h_index` | ✓ | ✓ | ✓ |
| `summary_stats.i10_index` | ✓ | ✓ | ✓ |
| `wikidata` | ✓ | ✓ | ✓ |
| `works_count` | ✓ | ✓ | ✓ |
