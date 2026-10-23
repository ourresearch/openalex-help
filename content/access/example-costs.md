---
title: "Example costs"
updated: 2026-10-23
description: "What OpenAlex API operations cost, what your free daily budget buys, and the price of some common activities."
tags: ["reference"]
synonyms: ["costs", "credits", "api pricing", "rate card", "what it costs"]
---
OpenAlex data is free; what costs money is *usage* of the API. This page makes that concrete: the per-operation rate, what a day of free usage buys, and what a few common activities cost. For how billing and plans work, see [Pricing](/access/pricing/); for the API mechanics of sending a key and tracking your usage, see [Authentication](/api/authentication/).

## What each operation costs

> **Tip:**
> Use `per_page=100` to load many results per query — it makes your budget go much further.

| Operation | Description | **Cost per 1,000 calls** |
|-----------|-------------|--------------------------|
| [Get single entity](/api/get-single-entities/) | Retrieve one entity by ID or DOI | **Free** |
| [List + filter](/api/filtering/) | Query and filter entities | **$0.10** |
| [Search](/api/searching/) | Full-text keyword search | **$1** |
| [Group by](/api/grouping/) | Counts by a field (`group_by=`), on a list or a search | **$0.10** on a list, **$1** on a search |
| [Rerank](/api/searching/#rerank) | Add-on: the top 100 results reordered by relevance (`rerank=true`) | **+$1** (a reranked search: **$2**) |
| [Semantic search](/api/searching/) | AI-powered semantic search | **$1** |
| [Content download](/access/fulltext/) | Cached PDF via the content API | **$10** |
| [Text / Aboutness](/api/deprecations/) *(deprecated)* | Topic classification | **$10** |

> **Note:**
> **Rerank adds 10 credits ($0.001) to any request that uses it.** A search costs 10 credits; with `rerank=true` it costs 20. The add-on is the same on an [OQL](/api/oql/) request. openalex.org reranks its searches by default, and so do the [Claude and ChatGPT connectors](/access/connector/), so a search there costs 20 credits plus whatever else the page loads.

## What an OQL calculation costs

An [OQL](/access/oql/) table of groups (`get the count of works ... by ...`), and anything in OQL's [general form](/access/oql/#when-a-sentence-cant-say-it-the-general-form), is priced from what it does, step by step:

| Step | Credits | Cost |
|------|---------|------|
| The set of works, defined by filters only | 1 | $0.0001 |
| The set of works, defined by a search | 10 | $0.001 |
| Each lookup of the groups' own records (`by author at [X]`, `with an h-index above 20`, `Show h-index`, `co-author is not`) | 1 | $0.0001 |
| Each compared search (`compare title-abstract has "a" versus "b"`) | 10 | $0.001 |
| Walks and sets: each extra call they need | 1 | $0.0001 |

Each compared search costs what that search costs on its own, so a query that compares three searches costs the same as running the three searches. Nothing else adds to the price: splits, counts, means, shares and percentages are free. A list (`get works ...`, `get authors ...`) costs what the same query costs as a URL: 1 credit, or 10 with a search.

| Query | Credits | Cost |
|-------|---------|------|
| `get the count of [Kenya](KE)'s works by year` | 1 | $0.0001 |
| `get the count and percent open access of works about "climate change" by year since 2020` | 10 | $0.001 |
| `get the count of works about kelp by author with an h-index above 20. Only authors with more than 10 works about kelp.` | 11 | $0.0011 |
| `get the count of works about kelp by author at [University of British Columbia](I141945490) since 2022. Show h-index.` | 12 | $0.0012 |
| `get works where published since 2010; then, compare title-abstract has "a" versus "b" versus "c" using count` | 31 | $0.0031 |
| `get works where institution is [University of Kansas](I146416000) and published in 2023; then, get each author of those works; then, get all that author's works; finally, summarize each author using mean FWCI` | 11 | $0.0011 |

**Check the price before you run.** The [/query endpoint](/api/oql/#translating-a-query-the-query-endpoint) is free and reports a query's price, step by step, in `check.cost`. A response reports what the query cost in `meta.cost` and in the `X-RateLimit-Credits-Used` header. A query that costs more than you have left today is refused before it runs, and refusals are free.

## What your free daily budget buys

Every account gets **$1 of usage per day** for free. With that $1 you can do a mix of:

| Action | Calls | Results | Example |
|--------|-------|---------|---------|
| Get a single entity | Unlimited | Unlimited | Look up a work by DOI |
| List + filter | 10,000 | 1,000,000 | All works from MIT in 2024 |
| Search | 1,000 | 100,000 | Full-text search for "CRISPR" |
| Search with rerank | 500 | 50,000 | The same search, top 100 reordered by relevance |
| Content download | 100 | 100 PDFs | Download a paper's full text |

Without a key you get $0.10/day — a tenth of the above, enough to try the API. A [free API key](/api/authentication/) gives you 10× that. Need more than $1/day? [Paid plans](/access/pricing/) raise your daily budget, and [prepaid usage](/access/buying-and-renewing/) covers anything beyond it.

## What common activities cost

| Activity | Endpoint | Calls | Results | Cost |
|----------|----------|-------|---------|------|
| Search "climate change AND kelp" | Search | 103 | 10,205 | $0.10 |
| All works from Harvard | List + filter | 8,707 | 870,627 | $0.87 |
| Retrieve works by DOI from a list | Singleton | 1,000,000 | 1,000,000 | Free |
| Daily research (20 searches, 200 filters, 50 lookups) | Mixed | 270 | ~27,000 | $0.04 |
| Download 1,000 PDFs | Content | 1,000 | 1,000 PDFs | $10.00 |

> **Note:**
> The [openalex.org](https://openalex.org) website runs on this same API, so browsing it draws from the same budget (anonymous browsing uses the $0.10/day no-key budget; sign in for $1/day). Viewing a single record's page (one work, author, source) is free, but a search or a results page loads several billable calls — the list of results plus its facets and charts. So **one website search costs more than one API call**: a programmatic `/works?search=` call is 10 credits, while one search *on the website* is roughly 28 (the search, reranked at 20 credits, plus ~5 facet/chart calls). Those facet counts cost 1 credit each on the website, though a `group_by` on a search costs 10 through the API. "$1/day ≈ 1,000 searches" holds for direct API calls; browsing the website is about 2.8× costlier per search (closer to ~360/day). A [prepaid balance](/access/buying-and-renewing/) covers anything beyond your daily budget.
