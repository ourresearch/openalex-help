---
title: "Group"
updated: 2026-10-26
description: "Aggregate entities into faceted counts using group_by"
tags: ["api"]
source_id: "guides/grouping"
source_url: "https://developers.openalex.org/guides/grouping"
source_updated: "2026-06-14"
---
The `group_by` parameter aggregates entities into groups and counts how many are in each group.

A `group_by` costs what its query costs: 1 credit on a list, 10 on a search (see [Example costs](/access/example-costs/)).

```bash
# Count works by type
https://api.openalex.org/works?group_by=type
```

Response:

```json
{
  "meta": {
    "count": 246136992,
    "groups_count": 15
  },
  "group_by": [
    {
      "key": "article",
      "key_display_name": "article",
      "count": 202814957
    },
    {
      "key": "book-chapter",
      "key_display_name": "book-chapter",
      "count": 21250659
    },
    {
      "key": "dissertation",
      "key_display_name": "dissertation",
      "count": 6055973
    }
  ]
}
```

## Group properties

Each group object contains:

| Property | Description |
|----------|-------------|
| `key` | The OpenAlex ID or raw value for this group |
| `key_display_name` | The display name or raw value for this group |
| `count` | Number of entities in the group |

### `key` vs `key_display_name`

When grouping by an OpenAlex entity, `key` is the ID and `key_display_name` is the display name:

```bash
# Group works by institution
https://api.openalex.org/works?group_by=authorships.institutions.id
```

Returns groups like:
```json
{
  "key": "https://openalex.org/I136199984",
  "key_display_name": "Harvard University",
  "count": 1234567
}
```

For non-entity values (like `level`), both `key` and `key_display_name` are the raw value.

For yes/no fields (`is_oa`, `has_abstract`, `has_doi`), the keys are `"true"` and `"false"`, the values the same field takes as a filter. The counts equal what the filter returns:

```bash
# Works from 2024 with and without an abstract
https://api.openalex.org/works?filter=publication_year:2024&group_by=has_abstract

# The same two numbers, one at a time
https://api.openalex.org/works?filter=publication_year:2024,has_abstract:true
https://api.openalex.org/works?filter=publication_year:2024,has_abstract:false
```

## Including unknowns

The "unknown" group (entities without a value) is hidden by default. Add `:include_unknown` to include it:

```bash
# Without unknowns (default)
https://api.openalex.org/works?group_by=authorships.countries
```

```bash
# With unknowns
https://api.openalex.org/works?group_by=authorships.countries:include_unknown
```

### How "unknown" is keyed

The bucket's `key` depends on the field type:

| Field type | Example | Unknown `key` |
|------------|---------|---------------|
| String / ID | `primary_location.license`, `type` | `"unknown"` |
| Numeric (range) | `apc_paid.value`, `cited_by_count` | `-111` (sentinel) |
| Yes/no | `best_oa_location.is_oa` | `"unknown"`, only when some have no value (`has_doi` and the other `has_` fields count a missing value as `false`) |

Numeric fields use the sentinel `-111` because the aggregation bucket can't mix a string key like `"unknown"` into a numeric series. Treat any `-111` (or `-111.0`) bucket key as "unknown."

### What counts as "unknown"

A work is counted in the unknown bucket when the underlying field is missing or empty. For fields nested inside an array — for example `authorships.institutions.type` — the work is also counted as unknown when the array is present but empty (e.g. an authorship with no institutions). If you reproduce `group_by` counts in code by iterating the JSON, treat empty lists the same way to match the API's totals.

## Combining with filters

Group by and filter work together:

```bash
# Count work types for 2023 publications
https://api.openalex.org/works?filter=publication_year:2023&group_by=type

# Count open access status for a specific author
https://api.openalex.org/works?filter=author.id:A5023888391&group_by=open_access.is_oa

# Which versions (published, accepted, submitted) arXiv holds
https://api.openalex.org/locations?filter=source_id:S4306400194&group_by=version
```

## Grouping by two or three fields

`group_by` takes up to three fields, separated by commas. Each group then carries its own `groups`, split by the next field: works by year, and within each year by type.

```bash
# MIT's 2022-2023 works by year, and within each year by type
https://api.openalex.org/works?filter=institutions.id:I63966007,publication_year:2022-2023&group_by=publication_year,type
```

Response (shortened):

```json
{
  "group_by": [
    {
      "key": "2023",
      "key_display_name": "2023",
      "count": 13542,
      "groups": [
        {"key": "https://openalex.org/types/article", "key_display_name": "article", "count": 7445},
        {"key": "https://openalex.org/types/preprint", "key_display_name": "preprint", "count": 2133}
      ]
    },
    {
      "key": "2022",
      "key_display_name": "2022",
      "count": 12528,
      "groups": [
        {"key": "https://openalex.org/types/article", "key_display_name": "article", "count": 7651},
        {"key": "https://openalex.org/types/preprint", "key_display_name": "preprint", "count": 1641}
      ]
    }
  ]
}
```

One request replaces a loop of single-field requests (one per year, say). Each level returns up to `per_page` groups. Cursor paging doesn't work with more than one field, and the topic-hierarchy fields (`primary_topic.field.id`, `.subfield.id`, `.domain.id`) and the yes/no groupings (such as `has_doi`) work only on their own.

## Sorting groups

Groups come back with the most entities first. `sort` changes the order:

| `sort=` | Order |
|---|---|
| `count:asc` | fewest first |
| `key:asc`, `key:desc` | by the group's key (years oldest or newest first) |
| `<number field>.<mean, sum, min or max>:desc` | by a number from each group's works; each group also returns it |

```bash
# MIT's 2023 works by subfield, highest mean citations first
https://api.openalex.org/works?filter=institutions.id:I63966007,publication_year:2023&group_by=primary_topic.subfield.id&sort=cited_by_count.mean:desc
```

Each group then has `mean_cited_by_count` beside its `count`. With two or three fields, the order applies at every level. For several numbers per group (a count, a mean and a percent at once), use an [OQL table of groups](/access/oql/#tables-of-groups).

## Paging

A grouped response returns at most 200 groups per page. To page through more, use [cursor paging](/api/paging/#cursor-paging): start with `cursor=*` and follow `meta.next_cursor` until it's `null`, exactly as you would for a list of results.

```bash
# First page of groups
https://api.openalex.org/works?group_by=authorships.author.id&per_page=200&cursor=*

# Next page: use the next_cursor value from the previous response
https://api.openalex.org/works?group_by=authorships.author.id&per_page=200&cursor=<next_cursor>
```

> **Note:**
> Basic `page`-based paging (`page=2`, …) is **not** supported with `group_by` — use cursor paging. When paging through groups, results are sorted by `key` (not by `count`).

## Meta properties

| Property | Description |
|----------|-------------|
| `meta.count` | Total entities matching the filter |
| `meta.groups_count` | Number of groups in current page (or `null` if none) |

> **Note:**
> Due to technical limitations, `groups_count` only reports groups in the current page, not the total number of groups.
