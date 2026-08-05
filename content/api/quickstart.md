---
title: "Quickstart"
description: "Query the OpenAlex dataset in 5 minutes"
tags: ["api"]
source_id: "quickstart"
source_url: "https://developers.openalex.org/quickstart"
source_updated: "2026-03-05"
---
Let's use the OpenAlex API to find journal articles published by authors at Stanford University between 2010 and 2020. No login or API key required for basic queries.

> **Tip:**
> Install a JSON viewer extension like [JSONVue](https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc) to make API responses easier to read in your browser.

## 1. Find an institution

Search for Stanford University using the institutions endpoint:

```bash
https://api.openalex.org/institutions?search=stanford
```

The first result has the ID we need:

```json
{
  "id": "https://openalex.org/I97018004",
  "ror": "https://ror.org/00f54p054",
  "display_name": "Stanford University",
  "country_code": "US",
  "type": "education"
}
```

## 2. Get a single entity

Fetch the full institution record by ID:

```bash
https://api.openalex.org/institutions/I97018004
```

This works for any entity type—works, authors, sources, etc.

## 3. Find works from Stanford

Filter works to show those with at least one Stanford author:

```bash
https://api.openalex.org/works?filter=institutions.id:I97018004
```

## 4. Filter by year and sort

Narrow to 2010-2020 and sort newest first:

```bash
https://api.openalex.org/works?filter=institutions.id:I97018004,publication_year:2010-2020&sort=publication_date:desc
```

## 5. Group by year

Get counts per year:

```bash
https://api.openalex.org/works?filter=institutions.id:I97018004,publication_year:2010-2020&group_by=publication_year
```

Response:

```json
[
  { "key": "2020", "key_display_name": "2020", "count": 18627 },
  { "key": "2019", "key_display_name": "2019", "count": 15933 },
  { "key": "2017", "key_display_name": "2017", "count": 14789 }
]
```

## 6. Semantic search (optional)

Find conceptually related works using AI:

```bash
https://api.openalex.org/works?search.semantic=machine+learning+in+healthcare&api_key=YOUR_KEY
```

This finds papers about "AI-driven diagnosis" even if they don't use the exact words "machine learning."

> **Note:**
> Semantic search requires an [API key](/api/authentication/). Basic filtering and searching is free.

## 7. Download full text (optional)

For works with available content:

```bash PDF
https://content.openalex.org/works/W3038568908.pdf?api_key=YOUR_KEY
```

```bash TEI XML
https://content.openalex.org/works/W3038568908.grobid-xml?api_key=YOUR_KEY
```

Check the `has_content.pdf` filter to find downloadable works.

## Next steps

  - **[Works](/entities/works/)** — Journal articles, books, datasets, theses
  - **[Authors](/entities/authors/)** — Researchers and their publications
  - **[Filtering](/api/filtering/)** — Narrow results with 150+ filter options
  - **[Recipes](/recipes/quick-api-recipes/)** — Common API patterns and examples

All data is [CC0 licensed](https://creativecommons.org/publicdomain/zero/1.0/) — free to access and share.
