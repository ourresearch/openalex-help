---
title: "Searching"
description: "Recipes for common search questions: most-cited works, top-100 lists, excluding retractions, query length, and finding issue metadata."
tags: ["search"]
synonyms: ["most cited", "top cited", "retracted works", "query length", "volume and issue"]
card: "Most-cited lists, top-100 thresholds, excluding retractions, and the query-length ceiling."
---
Recipes for the search questions we hear most. For the full querying story — filters, search, sorting, and the rest — start with [Querying](/access/querying/). For counting what you've found, see [Counting](/how-to/counting/).

## How do I find the most-cited works?

Sorting by citations is the default: [openalex.org/works](https://openalex.org/works) lists all works in descending citation order, and any filters you add keep that order. The one exception is text search, which switches the sort to relevance — to get back to citations, click the sort button above the results and choose "citation count" (you'll see `sort=cited_by_count:desc` appear in the URL). To restrict to journal articles, add the filters work type = article and source type = journal.

## How do I limit results to the top 100 most-cited works?

Filter on a citation-count threshold equal to what the 100th most-cited work received:

1. Build your search with all the filters you want, sorted by citation count.
2. Set results per page to 100, scroll to the bottom, and note the citation count of the last (100th) work — that's your threshold.
3. Add a "citation count" filter and enter the threshold followed by a hyphen (e.g. `2516-`, meaning "at least 2,516 citations").

Your results are now the top 100, ready to export or analyze. (If the count is slightly over 100, several works tied at the threshold.)

## How do I omit retracted works from my analysis?

Add a filter: click "Add filter", type "retracted", and select it. Then set the filter's dropdown to "is not". Retracted works are now excluded from your results. In the API, that's `filter=is_retracted:false`.

## Is there a limit to query length?

Yes — queries are URLs, and the total URL is limited to 2,048 characters. If your query won't fit, break it into several smaller queries combined with OR logic, export each result set, and combine them — deduplicating on the OpenAlex work ID to remove any overlap.

## Where do I find the volume and issue of an article?

Issue-level metadata lives in the work's [`biblio`](/data/works/attributes/#biblio) attribute — volume, issue, first page, and last page. You'll see it in exports from the website, or in the API response for any single work, e.g. [api.openalex.org/works/W2016949000](https://api.openalex.org/works/W2016949000).
