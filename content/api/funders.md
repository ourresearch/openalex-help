---
title: "Funders Overview"
description: "Schema reference for Funders entities"
tags: ["api"]
source_id: "api-reference/funders"
source_url: "https://developers.openalex.org/api-reference/funders"
source_updated: "2026-02-17"
---
Funders are organizations that fund research. OpenAlex indexes about 32,000 funders. Funder data comes from Crossref, and is enhanced with data from Wikidata and ROR.

Funders are connected to works through their [`funders` and `awards` fields](/docs/work-fields/#funders).

## Filter, sort, and group_by fields

The API supports filtering, sorting, and grouping on funders fields. See [Filtering](/api/filtering/), [Sorting](/api/sorting/), and [Grouping](/api/grouping/) for syntax.

Fields marked **(deprecated)** are `.search` filters — use the [`search` parameter](/api/searching/) instead.

| Field | Sort | Group_by | Filter |
|-------|:----:|:--------:|:------:|
| `awards_count` | ✓ | ✓ | ✓ |
| `cited_by_count` | ✓ | ✓ | ✓ |
| `continent` | ✓ | ✓ | ✓ |
| `country_code` | ✓ | ✓ | ✓ |
| `default.search` **(deprecated)** |  |  | ✓ |
| `description.search` **(deprecated)** |  |  | ✓ |
| `display_name` | ✓ |  | ✓ |
| `display_name.search` **(deprecated)** |  |  | ✓ |
| `from_created_date` | ✓ |  | ✓ |
| `ids.crossref` | ✓ | ✓ | ✓ |
| `ids.doi` | ✓ | ✓ | ✓ |
| `ids.openalex` | ✓ | ✓ | ✓ |
| `ids.ror` | ✓ | ✓ | ✓ |
| `ids.wikidata` | ✓ | ✓ | ✓ |
| `is_global_south` | ✓ | ✓ | ✓ |
| `openalex` | ✓ | ✓ | ✓ |
| `openalex_id` |  | ✓ | ✓ |
| `roles.id` | ✓ | ✓ | ✓ |
| `ror` | ✓ | ✓ | ✓ |
| `summary_stats.2yr_mean_citedness` | ✓ | ✓ | ✓ |
| `summary_stats.h_index` | ✓ | ✓ | ✓ |
| `summary_stats.i10_index` | ✓ | ✓ | ✓ |
| `wikidata` | ✓ | ✓ | ✓ |
| `works_count` | ✓ | ✓ | ✓ |
