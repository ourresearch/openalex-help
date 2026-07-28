---
title: "Domains Overview"
description: "Schema reference for Domains entities"
tags: ["api"]
source_id: "api-reference/domains"
source_url: "https://developers.openalex.org/api-reference/domains"
source_updated: "2026-02-17"
---
Domains are the highest level of the OpenAlex topic hierarchy. There are only 4 domains, each containing multiple fields: Life Sciences, Social Sciences, Physical Sciences, and Health Sciences.

The topic hierarchy is: **Domain** → Field → Subfield → Topic

## Filter, sort, and group_by fields

The API supports filtering, sorting, and grouping on domains fields. See [Filtering](/api/filtering/), [Sorting](/api/sorting/), and [Grouping](/api/grouping/) for syntax.

Fields marked **(deprecated)** are `.search` filters — use the [`search` parameter](/api/searching/) instead.

| Field | Sort | Group_by | Filter |
|-------|:----:|:--------:|:------:|
| `cited_by_count` | ✓ | ✓ | ✓ |
| `default.search` **(deprecated)** |  |  | ✓ |
| `display_name` | ✓ |  | ✓ |
| `display_name.search` **(deprecated)** |  |  | ✓ |
| `fields.id` | ✓ | ✓ | ✓ |
| `from_created_date` | ✓ |  | ✓ |
| `id` | ✓ | ✓ | ✓ |
| `works_count` | ✓ | ✓ | ✓ |
