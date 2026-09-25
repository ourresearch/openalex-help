---
title: "Tag Aboutness"
updated: 2026-09-22
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

> **Note:**
> Keywords on this endpoint come from OpenAlex's new keyword tagger (the same model that is re-tagging every work). Until the rebuilt keyword entity ships, some keyword ids are provisional: they follow the `keywords/<slug>` convention but may not resolve at `api.openalex.org/keywords/<slug>` yet. When that is the case, `meta.note` says so.

## Example response

```bash
GET https://api.openalex.org/text?title=type%201%20diabetes%20research%20for%20children
```

```json
{
  "meta": {
    "keywords_count": 4,
    "topics_count": 3,
    "note": "Some keyword ids are provisional: they follow the keywords/<slug> convention but do not resolve in the keywords API until the rebuilt keyword entity ships."
  },
  "keywords": [
    {"id": "https://openalex.org/keywords/type-1-diabetes", "display_name": "Type 1 diabetes", "score": 1.0},
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

Topic scores are the classifier's confidence, from 0 to 1. Keyword scores are rank order, not confidence: the model lists keywords best first and the score steps down evenly (1.0 for the first, then 0.75, 0.5, 0.25 for a four-keyword result). `/text/topics` and `/text/keywords` return the same objects with a single `count` in `meta`.

If the topic classifier cannot place a text, `topics` is empty. This happens with short or non-descriptive titles, such as a bare project or institution name. Sending an `abstract` alongside the `title` gives the classifier much more to work with.

## Limits

| Constraint | Value |
|------------|-------|
| Text length | 20-2000 characters, title and abstract combined |
| Rate limit | 1 request per second |
| Cost | $0.01 per request |
