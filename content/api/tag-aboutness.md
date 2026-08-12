---
title: "Tag Aboutness"
description: "Tag your own text with OpenAlex keywords and concepts"
tags: ["api"]
source_id: "guides/aboutness"
source_url: "https://developers.openalex.org/guides/aboutness"
source_updated: "2026-02-18"
---
> **Warning:**
> **Deprecated.** The `/text` endpoints are deprecated and not recommended for new projects. See [Deprecations](/api/deprecations/).

The `/text` endpoint lets you tag free text with OpenAlex's "aboutness" assignments: keywords and concepts.

## Request format

Send a `title` and optional `abstract` via GET or POST:

```bash
GET https://api.openalex.org/text/keywords?title=type%201%20diabetes%20research%20for%20children
```

## Available endpoints

| Endpoint | Returns |
|----------|---------|
| `/text/keywords` | Keywords for your text |
| `/text/concepts` | Concepts for your text |
| `/text` | All of the above in one request |

## Example response

```bash
GET https://api.openalex.org/text?title=type%201%20diabetes%20research%20for%20children
```

```json
{
  "meta": {
    "keywords_count": 5,
    "concepts_count": 3
  },
  "keywords": [
    {
      "id": "https://openalex.org/keywords/type-1-diabetes",
      "display_name": "Type 1 Diabetes",
      "score": 0.677
    }
  ],
  "concepts": [
    {
      "id": "https://openalex.org/C71924100",
      "display_name": "Medicine",
      "score": 0.85
    }
  ]
}
```

## Limits

| Constraint | Value |
|------------|-------|
| Text length | 20-2000 characters |
| Rate limit | 1 request per second |
| Cost | $0.01 per request |
