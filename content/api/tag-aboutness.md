---
title: "Tag Aboutness"
updated: 2026-10-01
description: "Tag your own text with OpenAlex topics and keywords"
tags: ["api"]
source_id: "guides/aboutness"
source_url: "https://developers.openalex.org/guides/aboutness"
source_updated: "2026-02-18"
---
The `/text` endpoint lets you tag free text with OpenAlex's "aboutness" assignments: [topics](/data/topics/) (with their subfield, field, and domain) and [keywords](/data/keywords/). Give it the title and abstract of an unpublished paper, a grant proposal, or any other text, and you get back the same labels OpenAlex assigns to indexed works.

## Request format

Send a `title` and optional `abstract` via GET or POST:

```bash
GET https://api.openalex.org/text/topics?title=type%201%20diabetes%20research%20for%20children
```

For a POST, send the same two fields as JSON.

## Available endpoints

| Endpoint | Returns |
|----------|---------|
| `/text/topics` | Topics for your text, with `primary_topic` and each topic's subfield, field, and domain |
| `/text/keywords` | Keywords for your text |
| `/text` | Both in one request |

Keywords come from the same model and vocabulary that tag every work in OpenAlex, so every keyword id resolves at `api.openalex.org/keywords/<slug>` and works as a [`keywords.id`](/data/works/attributes/#keywords) filter. Keywords the model writes that aren't in the vocabulary are left out; synonyms are returned under their vocabulary heading.

## Example response

```bash
GET https://api.openalex.org/text?title=type%201%20diabetes%20research%20for%20children
```

```json
{
  "meta": {
    "keywords_count": 4,
    "topics_count": 3
  },
  "keywords": [
    <!-- TODO before push: regenerate this block from the live endpoint once /text returns confidence scores -->
    {"id": "https://openalex.org/keywords/type-1-diabetes", "display_name": "type 1 diabetes", "score": 1.0},
    {"id": "https://openalex.org/keywords/pediatric-diabetes", "display_name": "pediatric diabetes", "score": 0.75},
    {"id": "https://openalex.org/keywords/diabetes-research", "display_name": "diabetes research", "score": 0.5},
    {"id": "https://openalex.org/keywords/children", "display_name": "children", "score": 0.25}
  ],
  "primary_topic": {
    "id": "https://openalex.org/T10560",
    "display_name": "Diabetes Management and Research",
    "score": 0.995,
    "subfield": {
      "id": "https://openalex.org/subfields/2712",
      "display_name": "Endocrinology, Diabetes and Metabolism"
    },
    "field": {
      "id": "https://openalex.org/fields/27",
      "display_name": "Medicine"
    },
    "domain": {
      "id": "https://openalex.org/domains/4",
      "display_name": "Health Sciences"
    }
  },
  "topics": [
    { "...": "the same three topics, best first" }
  ]
}
```

Topic scores are the classifier's confidence, from 0 to 1. Keyword scores are the model's confidence, from 0 to 1, on the same scale as the `score` on a work's keywords; keywords are listed best first. If your text says nothing about its subject, `keywords` can be empty. `/text/topics` and `/text/keywords` return the same objects with a single `count` in `meta`.

If the topic classifier cannot place a text, `topics` is empty. This happens with short or non-descriptive titles, such as a bare project or institution name. Sending an `abstract` alongside the `title` gives the classifier much more to work with.

## Limits

| Constraint | Value |
|------------|-------|
| Text length | 20-2000 characters, title and abstract combined |
| Rate limit | 1 request per second |
| Cost | $0.01 per request |

Calls work without an API key, but the free daily allowance without one is small. [Get a free key](/api/authentication/) for anything more than a few calls, especially if you'll go on to search works with the keywords you get back.

## Use it to choose keywords for a search

Send a description of your topic, look up the keywords that come back, and keep the ones that fit. If your topic has several parts, require a keyword for each part (`remote-work` and `employee-health`, not just `remote-work`). Then combine the keywords with a title and abstract search in one [OQL](/api/oql/) query:

```
works where keyword is (remote-work and employee-health) or title/abstract has ("remote work")
```

This is a good job for an AI agent: give it your topic, this page and your API key, and ask for the query and a CSV of results.
