---
title: "Searching"
updated: 2026-11-17
description: "Recipes for common search questions: most-cited works, top-100 lists, excluding retractions, query length, and finding issue metadata."
tags: ["search"]
synonyms: ["most cited", "top cited", "retracted works", "query length", "volume and issue"]
card: "Most-cited lists, top-100 thresholds, excluding retractions, and the query-length ceiling."
---
Recipes for the search questions we hear most. For the full querying story — filters, search, sorting, and the rest — start with [Querying](/access/querying/). For counting what you've found, see [Counting](/how-to/counting/).

> [!claude]
> You can ask in plain language instead: *"The 100 most-cited works on X since 2020."* Every answer comes with the exact OQL query it ran, so you can rerun or refine it yourself. Retracted works are already left out. Set up once: [Using OpenAlex with an AI assistant](/how-to/ai-assistants/).

## How do I find the most-cited works?

Sorting by citations is the default: [openalex.org/works](https://openalex.org/works) lists all works in descending citation order, and any filters you add keep that order. The one exception is text search, which switches the sort to relevance — to get back to citations, click the sort button above the results and choose "citation count" (you'll see `sort=cited_by_count:desc` appear in the URL). To restrict to journal articles, add the filters work type = article and source type = journal.

## How do I limit results to the top 100 most-cited works?

Filter on a citation-count threshold equal to what the 100th most-cited work received:

1. Build your search with all the filters you want, sorted by citation count.
2. Set results per page to 100, scroll to the bottom, and note the citation count of the last (100th) work — that's your threshold.
3. Add a "citation count" filter and enter the threshold followed by a hyphen (e.g. `2516-`, meaning "at least 2,516 citations").

Your results are now the top 100, ready to export or analyze. (If the count is slightly over 100, several works tied at the threshold.)

## How do I omit retracted works from my analysis?

You don't need to: retracted works, and every other work its publisher, host or authors withdrew or removed, are [pulled works](/data/works/pulled/), and OpenAlex leaves them out by default, on the website, in the API and through the [AI agent connector](/access/connector/). Add nothing. To bring them back, add `include_pulled=true` to an API query. A filter on retracted (`filter=is_retracted:false`, or "retracted is not" on the website) now brings withdrawn works back in, because naming the field asks about them.

## How do I get the query Claude used?

Ask for it: *"what query did you run?"* Every answer from the [AI agent connector](/access/connector/) carries the canonical [OQL](/access/oql/) behind it, plus a link that reruns it. Paste that query into the OQL tab on [openalex.org](https://openalex.org), cite it in a methods section, or hand it back to Claude and ask it to tighten one clause. This is what makes a conversational search reproducible rather than a black box.

## Is there a limit to query length?

Only for a query sent as a URL (a GET request): the whole request URL can be at most 8,190 bytes, about 8 KB. For anything longer, send the query as [OQL](/access/oql/) in a POST body, which has no length limit and returns the same results; or split a long `OR` list into smaller queries and combine the IDs they return. The exact limit, how it's counted and the error you get are in [Large Boolean queries](/api/searching/#large-boolean-queries).

On [openalex.org](https://openalex.org), the OQL tab sends your query in the body of the request, so it has no length limit. For a long Boolean search, such as a systematic review's, paste it into the OQL tab inside one pair of parentheses:

```
get works with (<your Boolean search>) in the title or abstract
```

A quoted phrase in OQL matches exactly; put `stemmed` before it (`stemmed "brain injury"`) to also match word variants.

## Where do I find the volume and issue of an article?

Issue-level metadata lives in the work's [`biblio`](/data/works/attributes/#biblio) attribute — volume, issue, first page, and last page. You'll see it in exports from the website, or in the API response for any single work, e.g. [api.openalex.org/works/W2016949000](https://api.openalex.org/works/W2016949000).
