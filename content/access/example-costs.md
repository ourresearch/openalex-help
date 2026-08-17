---
title: "Example costs"
updated: 2026-08-09
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
| [Semantic search](/api/searching/) | AI-powered semantic search | **$1** |
| [Content download](/access/fulltext/) | Cached PDF via the content API | **$10** |
| [Text / Aboutness](/api/deprecations/) *(deprecated)* | Topic classification | **$10** |

## What your free daily budget buys

Every account gets **$1 of usage per day** for free. With that $1 you can do a mix of:

| Action | Calls | Results | Example |
|--------|-------|---------|---------|
| Get a single entity | Unlimited | Unlimited | Look up a work by DOI |
| List + filter | 10,000 | 1,000,000 | All works from MIT in 2024 |
| Search | 1,000 | 100,000 | Full-text search for "CRISPR" |
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
> The [openalex.org](https://openalex.org) website runs on this same API, so browsing it draws from the same budget (anonymous browsing uses the $0.10/day no-key budget; sign in for $1/day). Viewing a single record's page (one work, author, source) is free, but a search or a results page loads several billable calls — the list of results plus its facets and charts. So **one website search costs more than one API call**: a programmatic `/works?search=` call is 10 credits, while one search *on the website* is roughly 18 (the search plus ~5 facet/chart calls). "$1/day ≈ 1,000 searches" holds for direct API calls; browsing the website is about 1.8× costlier per search (closer to ~550/day). A [prepaid balance](/access/buying-and-renewing/) covers anything beyond your daily budget.
