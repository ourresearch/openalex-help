---
title: "Filter"
updated: 2026-08-11
description: "Narrow down results to entities that match specific conditions"
tags: ["api"]
source_id: "guides/filtering"
source_url: "https://developers.openalex.org/guides/filtering"
source_updated: "2026-05-26"
---
Filters narrow your results to entities matching specific conditions. Use the `filter` parameter with attribute-value pairs:

```
filter=attribute:value,attribute2:value2
```

> **Note:**
> Filters are case-insensitive.

## Examples

```bash
# Works by type
curl "https://api.openalex.org/works?filter=type:book"
```

```bash
# Authors by ORCID status
curl "https://api.openalex.org/authors?filter=has_orcid:true,works_count:>100"
```

```bash
# Sources with many works
curl "https://api.openalex.org/sources?filter=works_count:>1000"
```

## Logical expressions

### Inequality

For numerical filters, use `<` and `>` for inequalities:

```bash
# Sources hosting more than 1000 works
https://api.openalex.org/sources?filter=works_count:>1000
```

Some attributes have convenience filters like `from_publication_date` and `to_publication_date`:

```bash
# Works published between Jan 1-26, 2022
https://api.openalex.org/works?filter=from_publication_date:2022-01-01,to_publication_date:2022-01-26
```

### Negation (NOT)

Prepend `!` to negate any filter:

```bash
# All institutions except those in the US
https://api.openalex.org/institutions?filter=country_code:!us
```

### Intersection (AND)

Comma-separated filters are combined with AND:

```bash
# Works cited more than once AND open access
https://api.openalex.org/works?filter=cited_by_count:>1,is_oa:true
```

For AND within a single attribute, repeat the filter or use `+`:

```bash
# Repeating filters
# Works with authors from France AND UK
https://api.openalex.org/works?filter=institutions.country_code:fr,institutions.country_code:gb
```

```bash
# Using + symbol
# Works with authors from France AND UK
https://api.openalex.org/works?filter=institutions.country_code:fr+gb
```

> **Note:**
> The `+` syntax doesn't work for search filters, boolean filters, or numeric filters.

### Addition (OR)

Use the pipe `|` to match any of multiple values:

```bash
# Works with authors from France OR UK
https://api.openalex.org/works?filter=institutions.country_code:fr|gb
```

This is efficient for retrieving many records by ID at once:

```bash
# Get two works by DOI in one request
https://api.openalex.org/works?filter=doi:https://doi.org/10.1371/journal.pone.0266781|https://doi.org/10.1371/journal.pone.0267149
```

> **Warning:**
> **OR limit:** You can combine up to 100 values with `|` in a single filter. Use `per_page=100` to get all results.

> **Warning:**
> **OR works within a filter, not between filters.** This will return an error:
> ```bash
> # INVALID: OR between different filters
> https://api.openalex.org/works?filter=institutions.country_code:fr|primary_location.source.issn:0957-1558
> ```

## Sync filters (paid plans)

[Paid plans](/access/pricing/#annual-plans) unlock two premium filters, available on every entity type, that select records by when they changed in OpenAlex:

- `from_created_date` — records **created** since a date
- `from_updated_date` — records **updated** (or created) since a date

```bash
# Works that changed since July 30
https://api.openalex.org/works?filter=from_updated_date:2026-07-30
```

These make the API itself a sync mechanism: poll on your own schedule and upsert the results by `id`. Because they combine with any other filter, they're especially good at keeping a **subset** of OpenAlex fresh without any bulk infrastructure — for example, just your institution's works:

```bash
# Works from one institution that changed since July 30
https://api.openalex.org/works?filter=institutions.id:I27837315,from_updated_date:2026-07-30
```

For how this method compares with the snapshot-based approaches (and how to handle deletions and merges), see [Sync](/access/sync/#premium-api-filters-paid-plans).

## Filter by saved collection

The `collection:` filter narrows results to the entities you've saved in one
of your [collections](/api/collections/). It's available on every entity
type collections support — `/works`, `/authors`, `/sources`, `/institutions`,
`/topics`, `/sdgs`, `/funders`, `/publishers`, `/keywords`, `/concepts` —
and requires a `Bearer` API key for the user who owns the collection.

```bash
GET https://api.openalex.org/works?filter=collection:col_beNWUTw6qY
Authorization: Bearer <api_key>
```

Negation with `!` is supported, and `collection:` combines with any other
filter. One `collection:` filter is allowed per request — see the
[Collections guide](/api/collections/) for the full set of caps and behaviors.

## Available filters by entity

Each entity type has its own set of filterable fields. See the API reference for complete filter lists:

| Entity | Filters |
|--------|---------|
| [Works](/data/works/) | `publication_year`, `type`, `open_access.is_oa`, `author.id`, `institutions.id`, `cited_by_count`, `doi`, `has_abstract`, and ~150 more |
| [Authors](/data/authors/) | `has_orcid`, `last_known_institutions.id`, `works_count`, `cited_by_count`, `orcid` |
| [Sources](/data/sources/) | `is_oa`, `is_in_doaj`, `type`, `country_code`, `host_organization`, `issn` |
| [Institutions](/data/institutions/) | `country_code`, `type`, `is_global_south`, `continent`, `ror`, `has_ror` |
| [Topics](/data/topics/) | `domain.id`, `field.id`, `subfield.id`, `works_count` |
| [Keywords](/data/keywords/) | `works_count`, `cited_by_count` |
| [Publishers](/data/publishers/) | `country_codes`, `hierarchy_level`, `ror`, `parent_publisher` |
| [Funders](/data/funders/) | `country_code`, `is_global_south`, `continent`, `ror`, `awards_count` |

> **Info:**
> **Looking for text search?** Filters match exact values. For full-text search in titles, abstracts, and other fields, see [Searching](/api/searching/).
