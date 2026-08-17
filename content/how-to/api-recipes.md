---
title: "API recipes"
updated: 2026-08-11
description: "Copy-paste URL patterns for the most common OpenAlex API questions — finding works, filtering, grouping, batch-fetching, sampling, and following citations."
tags: ["api"]
synonyms: ["api examples", "filter examples", "group_by", "batch fetch", "sample", "citation network"]
card: "Live URLs you paste into a browser: filter, group, sample, batch-fetch — mostly under 1¢."
---
Short URL patterns for questions we hear a lot. Every one is a live API call — paste it into a browser to see the JSON. Most read queries cost well under 1¢; see [Example costs](/access/example-costs/) for the rate card. For the full querying story, start with [Querying](/access/querying/).

## Finding works

```text
# By an author (newest first), and highly-cited works by that author
https://api.openalex.org/works?filter=author.id:A5023888391&sort=-publication_date
https://api.openalex.org/works?filter=author.id:A5023888391,cited_by_count:>10&sort=-cited_by_count

# From an institution — e.g. open-access works from MIT since 2020
https://api.openalex.org/works?filter=institutions.id:I63966007,open_access.is_oa:true,publication_year:>2019

# On a topic, or by keyword search
https://api.openalex.org/works?filter=topics.id:T10000&sort=-cited_by_count
https://api.openalex.org/works?search=CRISPR&sort=-relevance_score

# Open access only (any OA, gold OA, or a specific license)
https://api.openalex.org/works?filter=open_access.oa_status:gold
https://api.openalex.org/works?filter=best_oa_location.license:cc-by

# With a downloadable PDF, or with an abstract
https://api.openalex.org/works?filter=has_content.pdf:true
https://api.openalex.org/works?filter=has_abstract:true

# Funded by a specific organization (NIH = F4320306076), optionally a grant number
https://api.openalex.org/works?filter=awards.funder_id:F4320306076&sort=-publication_date
https://api.openalex.org/works?filter=awards.funder_id:F4320306076,awards.funder_award_id:R01-GM123456

# International collaboration: authors from more than one country
https://api.openalex.org/works?filter=institutions.country_code:IN,countries_distinct_count:>1,type:article
```

To audit a profile end-to-end — works that should be attached but aren't, plus works wrongly attached — see [Audit a Profile](/tutorials/audit-a-profile/).

## Ranking entities

```text
# Top US universities by citations
https://api.openalex.org/institutions?filter=country_code:US,type:education&sort=-cited_by_count&per_page=20

# Top journals by output, and open-access journals
https://api.openalex.org/sources?filter=type:journal&sort=-works_count&per_page=20
https://api.openalex.org/sources?filter=type:journal,is_oa:true&sort=-works_count

# Publisher hierarchy: subsidiaries of a parent, or just top-level publishers
https://api.openalex.org/publishers?filter=parent_publisher:P4310319965&sort=-works_count
https://api.openalex.org/publishers?filter=hierarchy_level:0&sort=-works_count&per_page=20
```

## Counting, grouping & sampling

```text
# Works per year, all vs. open access (group_by returns counts, not works)
https://api.openalex.org/works?filter=publication_year:2020-2024&group_by=publication_year
https://api.openalex.org/works?filter=publication_year:2020-2024,open_access.is_oa:true&group_by=publication_year

# A reproducible random sample
https://api.openalex.org/works?filter=publication_year:2024&sample=100&per_page=100&seed=42

# Combine filters + search: highly-cited OA cancer articles from 2023
https://api.openalex.org/works?search=cancer&filter=publication_year:2023,type:article,open_access.is_oa:true,cited_by_count:>50&sort=-cited_by_count
```

## Batch-fetching by ID

Use the OR operator (`|`) to fetch up to 100 IDs in one call:

```text
# Multiple works by DOI
https://api.openalex.org/works?filter=doi:https://doi.org/10.1234/a|https://doi.org/10.1234/b&per_page=100

# Multiple authors by ORCID
https://api.openalex.org/authors?filter=orcid:0000-0001-2345-6789|0000-0002-3456-7890&per_page=100
```

## Following citations

A single work carries its whole citation neighborhood: `referenced_works` (outgoing), `cited_by_api_url` (incoming), and `related_works` (semantically similar).

```text
# All works that cite a given paper
https://api.openalex.org/works?filter=cites:W2741809807&sort=-publication_date

# Batch-fetch the works a paper references (from its referenced_works list)
https://api.openalex.org/works?filter=openalex:W2100837269|W2134720587&per_page=100
```

For paging through large result sets, use [cursor pagination](/api/paging/). For bulk PDF downloads, use the [CLI](/access/fulltext/) rather than the API.
