---
title: "Overview"
description: "A short, conversational tour of the OpenAlex REST API — how it's shaped, how to start, and where to go next."
tags: ["api"]
source_id: "api-reference/introduction"
source_url: "https://developers.openalex.org/api-reference/introduction"
source_updated: "2026-08-09"
---
The OpenAlex API is a fast, modern REST API over the whole [OpenAlex dataset](/data/) — a connected graph of works, authors, sources, institutions, topics, and [more](/data/). Every entity type is an endpoint (`/works`, `/authors`, `/sources`, …), and you work with each one the same handful of ways: [list](/api/filtering/) them, [filter](/api/filtering/) and [search](/api/searching/) to narrow the list, [sort](/api/sorting/) it, [group](/api/grouping/) it into counts, [page](/api/paging/) through it, and [`select`](/api/selecting-fields/) just the fields you want — or [fetch a single entity](/api/get-single-entities/) by its ID. What each entity and field actually *means* lives in the [Data reference](/data/); these pages are the wire mechanics.

You can try it right now with no account: paste a URL into your browser and you get JSON back. Basic use is free; a [free API key](/api/authentication/) raises your daily budget 10×, and heavier use is [pay-as-you-go](/access/pricing/). The [Quick Start](/tutorials/quickstart/) walks you through your first real query. The one habit worth forming early: **don't filter by names — resolve them to IDs first.** Names are ambiguous ("Smith" is thousands of authors, "MIT" several institutions), so [look up the entity](/how-to/finding-openalex-ids/), grab its [OpenAlex ID](/data/overview/#the-openalex-id-scheme), and filter on that. If you already hold an external identifier — a DOI, ORCID, ROR, or ISSN — you can [use it directly](/api/get-single-entities/) and skip the lookup. (Getting IDs is such a common first step that it has its own [how-to](/how-to/finding-openalex-ids/).)

A few things surprise people early. Nested entities come back [dehydrated](/data/overview/#dehydrated-vs-full-objects) — a trimmed stub with just an ID and a display name — so fetch the full record separately when you need the rest. By default you're querying the curated **[core corpus](/data/works/corpus/)** of 300M+ works; a much larger [expansion](/data/works/corpus/) (mostly datasets and repository records, formerly called "XPAC") sits behind an opt-in flag, so don't be startled when `include_xpac=true` roughly doubles your counts. Everything is `snake_case`, all data is [CC0](https://creativecommons.org/publicdomain/zero/1.0/), and if you're pointing an AI agent at the API, hand it the [LLM Quick Reference](/api/llm-quick-reference/). For the complete endpoint list see the [Endpoints index](/api/endpoints/); for expressive, saveable queries, see [OQL](/api/oql/).

## Making a request

The base URL is:

```
https://api.openalex.org
```

Send your key as an `api_key` query parameter (or leave it off to try the API for free — the [website](https://openalex.org) itself runs on these same public endpoints):

```bash
curl "https://api.openalex.org/works?filter=publication_year:2024,is_oa:true&per_page=10&api_key=YOUR_KEY"
```

That's a list-and-filter request: open-access works from 2024, ten per page. See [Authentication](/api/authentication/) for keys and rate limits, and the [Querying](/api/filtering/) pages for the full filter, search, sort, group, and paging syntax.

## Response format

Every list endpoint returns the same envelope:

```json
{
  "meta": {
    "count": 286750097,
    "page": 1,
    "per_page": 25,
    "cost_usd": 0.0001
  },
  "results": [
    { "id": "https://openalex.org/W2741809807", "title": "...", ... }
  ],
  "group_by": []
}
```

| Field | Description |
|-------|-------------|
| `meta.count` | Total results matching your query |
| `meta.page` / `meta.per_page` | Current page and page size (default 25, max 100) |
| `meta.cost_usd` | What this single call cost — see [Authentication](/api/authentication/) |
| `results` | The array of entity objects |
| `group_by` | Aggregation buckets, when you use [`group_by`](/api/grouping/) |

## Security

Text fields in OpenAlex (and Unpaywall) records — titles, abstracts, affiliation strings — come from external sources, and we pass them through as-is rather than sanitizing them. If you display or process this text, especially on web pages, follow standard best practice for handling untrusted text: escape it for your output format, or use tools that do it for you (HTML templating engines, [prepared statements](https://en.wikipedia.org/wiki/Prepared_statement)). We've never seen a malicious payload in OpenAlex or Unpaywall data, but it's possible in principle, and following best practice is cheap. Good starting points: [OWASP's XSS prevention cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) and Wikipedia's overview of [code injection](https://en.wikipedia.org/wiki/Code_injection).

## What's next

- **[Quick Start](/tutorials/quickstart/)** — get real data out in five minutes, three ways
- **[Authentication](/api/authentication/)** — API keys and rate limits
- **[Error handling](/api/errors/)** — status codes and retry strategies
- **[Querying](/api/filtering/)** — filter, search, sort, group, page, select
- **[Data reference](/data/)** — what every entity and field means
- **[LLM Quick Reference](/api/llm-quick-reference/)** — a compact, agent-friendly cheat sheet
- **[OpenAPI spec](/openapi.json)** — the machine-readable API description
