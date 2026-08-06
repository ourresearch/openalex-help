---
title: "URL"
description: "Query OpenAlex over raw REST URLs — the filter, search, sort, and group_by parameters on api.openalex.org."
tags: ["reference"]
---
You can query OpenAlex directly over raw REST URLs against `api.openalex.org`. Add parameters to an entity endpoint and you get JSON back — no key required to start.

The core parameters:

- **`filter=`** — narrow to entities matching conditions
- **`search=`** — full-text search
- **`sort=`** — order the results
- **`group_by=`** — aggregate into buckets

A couple of examples:

```
https://api.openalex.org/works?search=microplastics&sort=cited_by_count:desc
https://api.openalex.org/works?filter=type:book,from_publication_date:2024-01-01
```

This is the same surface the [API](/api/) tab documents in full. Rather than duplicate it here, see:

- **[Filtering](/api/filtering/)** — the `filter=` parameter in detail
- **[Searching](/api/searching/)** — the `search=` parameter and its variants
- **[Sorting](/api/sorting/)** — ordering results with `sort=`
- **[Grouping](/api/grouping/)** — aggregating with `group_by=`
