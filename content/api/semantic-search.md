---
title: "Semantic Search"
updated: 2026-11-03
description: "Find works by meaning using AI embeddings. Best for paragraph-length queries."
tags: ["api"]
source_id: "guides/semantic-search"
source_url: "https://developers.openalex.org/guides/semantic-search"
source_updated: "2026-05-05"
---
Semantic search returns works whose meaning is closest to your query, even when the wording differs. A query about "predicting drug toxicity from molecular structure" finds papers using "computational toxicology" or "QSAR" — words your search never mentioned.

```bash
https://api.openalex.org/works?search.semantic=predicting drug toxicity from molecular structure
```

## Long-text queries

Semantic search shines when you have a longer description — an abstract, a grant aim, or a paragraph from a paper you're writing. The richer the input, the better the matches.

```bash
# Paste your grant aim verbatim (URL-encoded)
https://api.openalex.org/works?search.semantic=We propose to integrate single-cell RNA-seq with spatial transcriptomics to map T-cell exhaustion in solid tumors and identify novel checkpoint targets.
```

Up to **2,000 characters** are used for matching; longer input is truncated.

## Combining with filters

Semantic search works with 17 [filters](/api/filtering/), and the [`select`](/api/selecting-fields/) parameter works as usual:

```bash
https://api.openalex.org/works?search.semantic=mRNA vaccine immunogenicity in older adults&filter=publication_year:>2020,is_oa:true&select=id,title,relevance_score
```

| About | Filters you can use |
|---|---|
| Authors | `author.id`, `authorships.author.id` |
| Institutions | `institution.id`, `institutions.id`, `authorships.institutions.id`, `authorships.institutions.lineage` |
| Source and funder | `primary_location.source.id`, `funders.id` |
| Year, type, language | `publication_year`, `type`, `language` |
| Open access and license | `is_oa`, `open_access.is_oa`, `primary_location.license` |
| Content | `has_abstract`, `has_fulltext`, `is_retracted` |

Any other filter (`cited_by_count`, `topics.id`, `country_code` and the rest) returns a `400` error that lists the supported ones. Only these fields are stored with the search vectors, which is what keeps semantic search fast over hundreds of millions of works.

## How it works

OpenAlex embeds the title, abstract and venue name of every work with [Qwen3-Embedding-0.6B](https://huggingface.co/Qwen/Qwen3-Embedding-0.6B), an open-source multilingual embedding model from Alibaba's Qwen team, into a 1,024-dimensional vector. At query time we embed your query with the same model and return the works closest in meaning. Because the model is multilingual, queries and works in languages other than English match well too. Among close matches, works with more citations get a small boost.

## Limits

| Constraint | Value |
|------------|-------|
| Max input length | 2,000 characters |
| Max results | 50 per query |
| Rate limit | 1 request per second |
| Pricing | See [pricing by endpoint](/access/example-costs/) |

> **Note:**
> Only one search parameter is allowed per request: `search`, `search.exact`, or `search.semantic`.
