---
title: "Overview"
updated: 2026-08-12
description: "A short, conversational tour of the OpenAlex REST API — how it's shaped, how to start, and where to go next."
tags: ["api"]
source_id: "api-reference/introduction"
source_url: "https://developers.openalex.org/api-reference/introduction"
source_updated: "2026-08-09"
---
The OpenAlex API is a fast, modern REST API over the whole [OpenAlex dataset](/data/) — a connected graph of works, authors, sources, institutions, topics, and [more](/data/). You can try it right now, no account needed: paste a URL into your browser and you get JSON back.

Every entity type is an endpoint (`/works`, `/authors`, `/sources`, …), and you work with each one the same handful of ways: [list](/api/filtering/), [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/) into counts, [page](/api/paging/), and [`select`](/api/selecting-fields/) just the fields you want — or [fetch a single entity](/api/get-single-entities/) by its ID. What each entity and field actually *means* lives in the [Data reference](/data/); these pages are the wire mechanics.

Basic use is free. A [free API key](/api/authentication/) raises your daily budget 10×, and heavier use is [pay-as-you-go](/access/pricing/). New here? The [Quickstart](/quickstart/) walks you through your first real query.

## Good to know

A few things that surprise people early:

- **Filter by IDs, not names.** Names are ambiguous — "Smith" is thousands of authors, "MIT" several institutions. [Look up the entity](/how-to/finding-openalex-ids/), grab its [OpenAlex ID](/data/#the-openalex-id-scheme), and filter on that. Already holding a DOI, ORCID, ROR, or ISSN? [Use it directly](/api/get-single-entities/) and skip the lookup.
- **Nested entities come back [dehydrated](/data/#dehydrated-vs-full-objects)** — a trimmed stub with just an ID and a display name. Fetch the full record separately when you need the rest.
- **By default you're querying the curated [core corpus](/data/works/corpus/)** of 300M+ works. A much larger [expansion](/data/works/corpus/) (mostly datasets and repository records, formerly called "XPAC") is opt-in via the `corpus` parameter, so don't be startled when `corpus=all` adds roughly 60% more works to your counts.
- **Everything is `snake_case`**, and all data is [CC0](https://creativecommons.org/publicdomain/zero/1.0/) — no license worries, ever.
- **Pointing an AI agent at the API?** Hand it the [LLM Quick Reference](/api/llm-quick-reference/); there's a machine-readable [OpenAPI spec](/openapi.json) too.

For the complete endpoint list see the [Endpoints index](/api/endpoints/); for expressive, saveable queries, see [OQL](/api/oql/).

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

