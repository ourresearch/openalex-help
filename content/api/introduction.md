---
title: "API Overview"
description: "OpenAlex REST API fundamentals"
tags: ["api"]
source_id: "api-reference/introduction"
source_url: "https://developers.openalex.org/api-reference/introduction"
source_updated: "2026-02-20"
---
The OpenAlex API provides access to a comprehensive catalog of scholarly works, authors, sources, institutions, topics, and more.

> **Note:**
> **New to OpenAlex?** Start with the [Guides](/api/) for tutorials and walkthroughs. This API Reference is for detailed endpoint documentation.

## Base URL

```
https://api.openalex.org
```

## Authentication

Add your API key as a query parameter:

```bash
curl "https://api.openalex.org/works?api_key=YOUR_KEY"
```

> **Note:**
> API keys are free. [Get yours here](https://openalex.org/settings/api). See [Authentication & Pricing](/api/authentication/) for details.

## Entities

The API is organized around these entity types:

| Entity | Endpoint | Description |
|--------|----------|-------------|
| [Works](/api/works/) | `/works` | Scholarly documents (articles, books, datasets) |
| [Authors](/api/authors/) | `/authors` | Researchers with disambiguated identities |
| [Sources](/api/sources/) | `/sources` | Journals, repositories, conferences |
| [Institutions](/api/institutions/) | `/institutions` | Universities, research organizations |
| [Topics](/api/topics/) | `/topics` | Research area classifications |
| [Keywords](/api/keywords/) | `/keywords` | Short phrases from works |
| [Publishers](/api/publishers/) | `/publishers` | Publishing organizations |
| [Funders](/api/funders/) | `/funders` | Funding agencies |
| [Awards](/api/awards/) | `/awards` | Research grants |
| [Domains](/api/domains/) | `/domains` | Top-level topic hierarchy |
| [Fields](/api/fields/) | `/fields` | Second-level topic hierarchy |
| [Subfields](/api/subfields/) | `/subfields` | Third-level topic hierarchy |
| [SDGs](/api/sdgs/) | `/sdgs` | UN Sustainable Development Goals |
| [Countries](/api/countries/) | `/countries` | Geographic entities |
| [Continents](/api/continents/) | `/continents` | Geographic entities |
| [Languages](/api/languages/) | `/languages` | Language classifications |
| [Work Types](/api/work-types/) | `/work-types` | Enumeration of work types |
| [Source Types](/api/source-types/) | `/source-types` | Enumeration of source types |
| [Institution Types](/api/institution-types/) | `/institution-types` | Enumeration of institution types |
| [Licenses](/api/licenses/) | `/licenses` | Enumeration of licenses |
| [Concepts](/api/concepts/) | `/concepts` | Legacy taxonomy (deprecated) |

## Operations

Each entity supports these operations:

| Operation | Pattern | Example |
|-----------|---------|---------|
| List | `GET /{entities}` | `GET /works` |
| [Get](/api/get-single-entities/) | `GET /{entities}/{id}` | `GET /works/W2741809807` |
| [Filter](/api/filtering/) | `GET /{entities}?filter=` | `GET /works?filter=publication_year:2024` |
| [Search](/api/searching/) | `GET /{entities}?search=` | `GET /works?search=machine+learning` |
| [Aggregate](/api/grouping/) | `GET /{entities}?group_by=` | `GET /works?group_by=type` |

## Response Format

All list endpoints return the same structure:

```json
{
  "meta": {
    "count": 286750097,
    "db_response_time_ms": 152,
    "page": 1,
    "per_page": 25
  },
  "results": [
    { "id": "https://openalex.org/W2741809807", "title": "...", ... },
    { "id": "https://openalex.org/W2741809808", "title": "...", ... }
  ],
  "group_by": []
}
```

| Field | Description |
|-------|-------------|
| `meta.count` | Total results matching your query |
| `meta.page` | Current page number |
| `meta.per_page` | Results per page (default 25, max 100) |
| `results` | Array of entity objects |
| `group_by` | Aggregation results (when using `group_by`) |

## Quick Example

Get open access articles from 2024 with more than 100 citations:

```bash
curl "https://api.openalex.org/works?filter=publication_year:2024,is_oa:true,cited_by_count:>100&per_page=10&api_key=YOUR_KEY"
```

## Query Parameters

| Parameter | Description |
|-----------|-------------|
| `api_key` | Your API key (required) |
| `filter` | Filter by field values |
| `search` | Full-text search |
| `sort` | Sort results |
| `per_page` | Results per page (1-100) |
| `page` | Page number |
| `cursor` | Deep pagination cursor |
| `sample` | Random sample size |
| `select` | Limit returned fields |
| `group_by` | Aggregate by field |

## External IDs

Look up entities by external identifiers:

```bash
# By DOI
GET /works/https://doi.org/10.7717/peerj.4375
GET /works/doi:10.7717/peerj.4375

# By ORCID
GET /authors/https://orcid.org/0000-0001-6187-6610

# By ROR
GET /institutions/https://ror.org/0161xgx34

# By PMID
GET /works/pmid:29456894
```

## OpenAPI Specification

The complete API specification is available for tooling and code generation:

- **[OpenAPI Spec](/api-reference/openapi.json)** — Download the OpenAPI 3.1 specification

## Next Steps

  - **[Authentication](/api/authentication/)** — API keys, pricing, and rate limits
  - **[Error Handling](/api/errors/)** — Status codes and retry strategies
  - **[Key Concepts](/api/key-concepts/)** — IDs, dehydrated objects, and data model
  - **[LLM Reference](/api/llm-quick-reference/)** — Optimized reference for AI agents
