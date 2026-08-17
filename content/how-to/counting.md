---
title: "Counting"
updated: 2026-08-11
description: "Recipes for counting questions: totaling citations to a result set, checking a journal's coverage, and why two counts of the same thing can disagree."
tags: ["search"]
synonyms: ["count citations", "journal coverage", "is a journal in openalex", "counts by year"]
card: "Citation totals for any result set, coverage checks, and why two counts disagree."
---
Recipes for counting things in OpenAlex. For building the result set you're counting, see [Searching](/how-to/searching/); for the full querying story, start with [Querying](/access/querying/).

## How do I count all the citations to a set of results?

For any result set — whatever searches and filters you've applied — add the **citations sum** facet under **Stats** (click **"+"** next to *Stats* → *citations sum*). It shows the total citations received by every work in the set. Divide by the number of results for the average citations per work.

## How do I check whether a journal's works are in OpenAlex?

Search for the journal by name and click it — that filters to works whose primary location is that journal, so you can browse its coverage. If the name doesn't turn it up, search by [ISSN](/data/sources/attributes/#issn) instead. Still nothing? [Get in touch](https://openalex.org/contact).

## Why do the counts-by-year numbers differ from what I see in the interface?

The `counts_by_year`, `works_count`, and `cited_by_count` numbers nested inside an entity (an author, institution, or source) are **precomputed** and refreshed only every few months, so they drift — especially for entities that publish a lot. A live works query is always current, which is why the two can disagree. If you need an exact count, run a works search filtered by the entity (e.g. `openalex.org/works?filter=authorships.author.id:A5086928770`) instead of reading the nested number. Full explanation: [Counts by year](/data/common-attributes/#counts_by_year).
