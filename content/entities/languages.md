---
title: "Languages"
description: "The languages a work's metadata can be in, the ISO 639-1 standard behind the list, the fields on a language object, and how to filter works by language."
tags: ["reference"]
source_id: "api-reference/languages"
source_url: "https://developers.openalex.org/api-reference/languages"
source_updated: "2026-02-17"
---
A **language** is the language of a [work](/entities/works/)'s metadata — its title and abstract — identified by a two-letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) code: `en` for English, `es` for Spanish, `zh` for Chinese. Languages are a [vocabulary](/entities/vocabulary/): a fixed, standardized list OpenAlex attaches handles to rather than inventing. Each work carries a single [`language`](/entities/works/#language), auto-detected with [langdetect](https://pypi.org/project/langdetect/) — so a language value reflects the metadata language, not necessarily the full text, and is unset when there aren't enough words to guess reliably. A language's OpenAlex ID looks like `https://openalex.org/languages/en`; fetch one at [`api.openalex.org/languages/en`](https://api.openalex.org/languages/en).

## How we build it

We don't build the list — we adopt [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), the standard two-letter language codes, and add live counts of the works detected in each. Detection is per-work and automatic (see the work [`language`](/entities/works/#language) field). There are 180 languages.

## Values

The full list of 180 languages is at [`api.openalex.org/languages`](https://api.openalex.org/languages) — page through with `per_page=200` to pull every one. A sample of the largest by works count:

| Code | Language |
|------|----------|
| `en` | English |
| `de` | German |
| `es` | Spanish |
| `fr` | French |
| `ja` | Japanese |
| `pt` | Portuguese |
| `zh` | Chinese |
| `ru` | Russian |
| `it` | Italian |
| `id` | Indonesian |
| `ko` | Korean |
| `nl` | Dutch |

## Fields

The top-level fields on a **language** object. Fields shared with other entities ([`id`](/entities/common-fields/#id), [`display_name`](/entities/common-fields/#display_name), [`works_count`](/entities/common-fields/#works_count), [`cited_by_count`](/entities/common-fields/#cited_by_count), [`created_date`](/entities/common-fields/#created_date), [`updated_date`](/entities/common-fields/#updated_date)) are documented once on [Common fields](/entities/common-fields/).

### `id`
*String.* The [OpenAlex ID](/entities/overview/#the-openalex-id-scheme) for this language, e.g. `https://openalex.org/languages/en`. The final path segment is the ISO 639-1 code. See [Common fields](/entities/common-fields/#id).

### `display_name`
*String.* The language's English name, e.g. `English`. See [Common fields](/entities/common-fields/#display_name).

### `works_count`
*Integer.* How many works OpenAlex has detected in this language. See [Common fields](/entities/common-fields/#works_count).

### `cited_by_count`
*Integer.* Total citations across those works. See [Common fields](/entities/common-fields/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works](/entities/works/) API URL for every work in this language (`filter=language:<CODE>`).

### `created_date`
*String.* When the language record was added to OpenAlex (`YYYY-MM-DD`). See [Common fields](/entities/common-fields/#created_date).

### `updated_date`
*String.* When the language record last changed. See [Common fields](/entities/common-fields/#updated_date).

## In the API

The Languages endpoint is at [`api.openalex.org/languages`](https://api.openalex.org/languages). Fetch one by code — [`/languages/en`](https://api.openalex.org/languages/en) — or list them all.

Languages are most useful as a filter on [works](/entities/works/): `filter=language:fr` returns works whose metadata is in French, and `group_by=language` breaks any result set down by language. See [Filtering](/api/filtering/) for the full syntax and the [endpoints index](/api/endpoints/) for every endpoint. See also the work [`language`](/entities/works/#language) field for how the value is assigned.
