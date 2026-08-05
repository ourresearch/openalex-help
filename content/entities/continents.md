---
title: "Continents"
description: "The seven continents in OpenAlex, the fields on a continent object, and how to filter and group works, authors, and institutions by continent."
tags: ["reference"]
source_id: "api-reference/continents"
source_url: "https://developers.openalex.org/api-reference/continents"
source_updated: "2026-02-17"
---
A **continent** is one of the major geographic regions of the world — Africa, Asia, Europe, and so on. Continents are a [vocabulary](/entities/vocabulary/): a fixed, crisply-existing list that OpenAlex simply attaches a handle to. Each [country](/entities/countries/) belongs to exactly one continent, so a continent is really a convenient roll-up of countries — handy for filtering works by geographic region or comparing research output across parts of the world. Continents are used on the same entities as countries: [institutions](/entities/institutions/), [authors](/entities/authors/), and [works](/entities/works/). A continent's OpenAlex ID looks like `https://openalex.org/continents/Q15`; fetch one at [`api.openalex.org/continents/Q15`](https://api.openalex.org/continents/Q15).

## How we build it

Continents are the standard seven-continent model, with each [country](/entities/countries/) assigned to one via its [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166) code. OpenAlex keys each continent by its [Wikidata](https://www.wikidata.org/) QID (e.g. `Q15` for Africa) and adds live scholarly counts on top.

## Values

There are seven continents — the complete list:

| ID | Continent | Countries |
|----|-----------|:---------:|
| `Q15` | Africa | 57 |
| `Q18` | South America | 15 |
| `Q46` | Europe | 52 |
| `Q48` | Asia | 54 |
| `Q49` | North America | 41 |
| `Q51` | Antarctica | 3 |
| `Q55643` | Oceania | 25 |

## Fields

The top-level fields on a **continent** object. Fields shared with other entities ([`id`](/entities/common-fields/#id), [`ids`](/entities/common-fields/#ids), [`display_name`](/entities/common-fields/#display_name), [`created_date`](/entities/common-fields/#created_date), [`updated_date`](/entities/common-fields/#updated_date)) are documented once on [Common fields](/entities/common-fields/).

### `id`
*String.* The [OpenAlex ID](/entities/overview/#the-openalex-id-scheme) for this continent, e.g. `https://openalex.org/continents/Q15`. The final path segment is the [Wikidata](https://www.wikidata.org/) QID. See [Common fields](/entities/common-fields/#id).

### `ids`
*Object.* External identifiers for the continent: `openalex` and `wikidata`.

### `display_name`
*String.* The continent's English name, e.g. `Africa`. See [Common fields](/entities/common-fields/#display_name).

### `description`
*String.* A short one-line description (typically just "continent").

### `display_name_alternatives`
*List.* Other names for the continent, when any exist.

### `countries`
*List.* The [countries](/entities/countries/) on this continent, each a dehydrated `{ id, display_name }`.

### `created_date`
*String.* When the continent record was added to OpenAlex (`YYYY-MM-DD`). See [Common fields](/entities/common-fields/#created_date).

### `updated_date`
*String.* When the continent record last changed. See [Common fields](/entities/common-fields/#updated_date).

## In the API

The Continents endpoint is at [`api.openalex.org/continents`](https://api.openalex.org/continents). Fetch one by ID — [`/continents/Q15`](https://api.openalex.org/continents/Q15) — or list all seven.

To use continents as a filter on other entities, filter [works](/entities/works/) by author continent with `filter=authorships.institutions.continent:africa` (the lowercased continent name is accepted), and group any list by continent with `group_by=authorships.institutions.continent`. See [Filtering](/api/filtering/) for the full syntax and the [endpoints index](/api/endpoints/) for every endpoint. Related: [countries](/entities/countries/).
