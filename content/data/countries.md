---
title: "Countries"
description: "What a country is in OpenAlex, the ISO standard behind the list, the fields on a country object, and how to filter works, authors, and institutions by country."
tags: ["reference"]
source_id: "api-reference/countries"
source_url: "https://developers.openalex.org/api-reference/countries"
source_updated: "2026-02-17"
entity:
  example: "countries/US"
  api: "countries"
  linksTo:
    - "works"
    - "institutions"
---
A **country** is a geographic nation, identified by its [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code — `US` for the United States, `JP` for Japan, `BR` for Brazil. Countries are a [vocabulary](/data/vocabulary/): OpenAlex doesn't decide what a country is, it just attaches a consistent handle to each one so you can filter and group reliably. Country codes show up throughout the graph — on an [institution](/data/institutions/)'s `country_code`, inside a work's [authorships](/data/authorships/) (each author's affiliation carries the institution's country), and as the `last_known_institutions` country of an [author](/data/authors/). A country's OpenAlex ID looks like `https://openalex.org/countries/US`; fetch one at [`api.openalex.org/countries/US`](https://api.openalex.org/countries/US).

## About

We don't build the list — we adopt it. Countries are the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) standard set of nations, keyed by their two-letter alpha-2 codes. OpenAlex adds live scholarly counts and a few conveniences (continent, Global South flag, name variants) on top of that fixed list. There are 247 countries.

## Values

The full list of 247 countries is at [`api.openalex.org/countries`](https://api.openalex.org/countries) — to pull every one, page through with `per_page=200`. A sample of the largest by works count:

| Code | Country | Continent |
|------|---------|-----------|
| `JP` | Japan | Asia |
| `US` | United States | North America |
| `CN` | China | Asia |
| `GB` | United Kingdom | Europe |
| `DE` | Germany | Europe |
| `FR` | France | Europe |
| `IN` | India | Asia |
| `CA` | Canada | North America |
| `IT` | Italy | Europe |
| `BR` | Brazil | South America |
| `ES` | Spain | Europe |
| `AU` | Australia | Oceania |

## Attributes

The top-level fields on a **country** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`ids`](/data/common-attributes/#ids), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/overview/#the-openalex-id-scheme) for this country, e.g. `https://openalex.org/countries/US`. The final path segment is the ISO alpha-2 code. See [Common attributes](/data/common-attributes/#id).

### `ids`
*Object.* External identifiers for the country: `openalex`, `iso` (a link to the ISO 3166 registry entry), `wikidata`, and `wikipedia`.

### `display_name`
*String.* The country's common English name, e.g. `United States`. See [Common attributes](/data/common-attributes/#display_name).

### `country_code`
*String.* The [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code, e.g. `US`. This is the value you filter on across the graph. Same as the last segment of [`id`](#id).

### `description`
*String.* A short one-line description of the country, e.g. "country primarily located in North America".

### `display_name_alternatives`
*List.* Other names and spellings for the country (`USA`, `America`, `United States of America`, …). Useful for matching free-text mentions.

### `continent`
*Object.* The [continent](/data/continents/) this country belongs to, as a dehydrated `{ id, display_name }`.

### `is_global_south`
*Boolean.* True if the country is part of the [Global South](https://en.wikipedia.org/wiki/Global_South), a grouping OpenAlex carries for equity-focused analysis.

### `works_count`
*Integer.* How many works have an authorship affiliated with an institution in this country. See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations across those works. See [Common attributes](/data/common-attributes/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for every work affiliated with this country (`filter=authorships.countries:<CODE>`).

### `authors_api_url`
*String.* A ready-made [Authors](/data/authors/) API URL for authors whose last known institution is in this country (`filter=last_known_institutions.country_code:<CODE>`).

### `institutions_api_url`
*String.* A ready-made [Institutions](/data/institutions/) API URL for institutions in this country (`filter=country_code:<CODE>`).

### `created_date`
*String.* When the country record was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* When the country record last changed. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Countries endpoint is at [`api.openalex.org/countries`](https://api.openalex.org/countries). Fetch one by code — [`/countries/US`](https://api.openalex.org/countries/US) — or list them all.

Countries are more useful as a filter on other entities than as a list of their own. Filter [institutions](/data/institutions/) by country with `filter=country_code:us`, filter [works](/data/works/) by author country with `filter=authorships.countries:us`, and roll up any list by country with `group_by=authorships.countries`. See [Filtering](/api/filtering/) for the full syntax and the [endpoints index](/api/endpoints/) for every endpoint. Related: [continents](/data/continents/).
