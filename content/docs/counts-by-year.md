---
title: "Counts by year"
description: "How the precomputed counts_by_year field on entities is calculated, why it drifts from a live works query, and which number to use when."
tags: ["reference"]
source_id: "27250895840791"
source_url: "https://help.openalex.org/hc/en-us/articles/27250895840791-Why-are-the-counts-by-year-numbers-different-than-the-count-of-works-in-a-year"
source_updated: "2024-10-22"
---
Authors, institutions, sources, and other non-work entities carry a `counts_by_year` field: a precomputed breakdown of how many works the entity produced and how many citations it received, year by year. Alongside it sit the rolled-up `works_count` and `cited_by_count` totals.

## Why the numbers are precomputed

These counts exist so you don't have to run a separate query for every entity. Say you have a list of all the gold-OA journals that published on a topic and you want each one's yearly output, or all the authors at an institution and their total publications and citations. Without precomputed counts, that's one API call per entity. Instead, OpenAlex calculates the numbers ahead of time and nests them inside each entity record, so a single call to the entity endpoint returns them automatically.

## Why they drift from a live count

Precomputed counts are refreshed every few months, so they begin drifting out of date almost immediately — most visibly for high-volume entities. If you count an entity's works directly with a live works query, the two numbers often won't match.

For example, a source's record might report 89 works for the current year, while filtering works by that source and grouping by publication year returns 90 — because a new work was published after the counts were last computed.

Two things cause this drift:

- **The precompute lags reality.** New works are added continuously; the nested counts only catch up at the next refresh.
- **Counts change retroactively.** Older years can shift too, not just the current one — for instance when a journal deposits back-catalog records in Crossref (common), or when OpenAlex's disambiguation improves and works are reassigned between entities.

## Which number to use

For a convenient, roughly-current snapshot nested in the entity record, use `counts_by_year`. For an exact, up-to-the-moment count, run a works query filtered by the entity and group by publication year — for example, all works for an author:

```
https://api.openalex.org/works?filter=authorships.author.id:a5086928770&group_by=publication_year
```

A short version of this explanation lives in the Help center: [Why are the counts_by_year numbers different than what I see in the interface?](/help/why-are-the-counts-by-year-numbers-different-than-what-i-see-in-the-us/)
