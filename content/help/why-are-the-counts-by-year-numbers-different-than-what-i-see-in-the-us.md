---
title: "Why are the counts_by_year numbers different than what I see in the interface?"
description: "The counts_by_year field is precomputed and refreshed only every few months, so it drifts from a live count. Here's what to use instead."
tags: ["data"]
source_id: "27891614701207"
source_url: "https://help.openalex.org/hc/en-us/articles/27891614701207-Why-are-the-counts-by-year-numbers-different-than-what-I-see-in-the-user-interface"
source_updated: "2024-11-18"
---
The `counts_by_year`, `works_count`, and `cited_by_count` numbers nested in an entity (author, institution, source) are **precomputed** so you can retrieve them in a single API call instead of querying each entity separately.

Because they're precomputed and only refreshed every few months, they drift out of date — especially for entities that publish a lot. That's why they can disagree with what you see when you count works directly in the interface or with a live query.

If you need an exact, current count, run a works search filtered by the entity instead of reading the nested number — for example:

```
https://openalex.org/works?filter=authorships.author.id:a5086928770
```

For the full explanation of how these counts are calculated and why they change, see [Counts by year](/data/common-attributes/#counts_by_year) in the docs.
