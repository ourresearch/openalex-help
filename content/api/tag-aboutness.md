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
> Keyword tagging is temporarily unavailable while OpenAlex rebuilds its keyword vocabulary and tagger. Until then `keywords` is an empty list and `meta.note` says so. Topics are unaffected. Keywords will return when the new tagger is live.

## Example response

```bash
GET https://api.openalex.org/text?title=type%201%20diabetes%20research%20for%20children
```

```json
{
  "meta": {
    "keywords_count": 0,
    "topics_count": 3,
    "note": "Keyword tagging is temporarily unavailable, so keywords is empty. Topics are unaffected. Keywords are being rebuilt."
  },
  "keywords": [],
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

Scores are the classifier's confidence, from 0 to 1. `/text/topics` and `/text/keywords` return the same objects with a single `count` in `meta`.

If the topic classifier cannot place a text, `topics` is empty. This happens with short or non-descriptive titles, such as a bare project or institution name. Sending an `abstract` alongside the `title` gives the classifier much more to work with.

## Limits

| Constraint | Value |
|------------|-------|
| Text length | 20-2000 characters, title and abstract combined |
| Rate limit | 1 request per second |
| Cost | $0.01 per request |
