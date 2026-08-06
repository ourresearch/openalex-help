---
title: "Overview"
description: "Every OpenAlex API endpoint at a glance — the entity list/single endpoints and the special-purpose ones — each linking to the entity page that documents its fields."
tags: ["reference"]
---
Every OpenAlex entity has a REST endpoint under `https://api.openalex.org/`. They all work the same way: request the plural path for a **list** (filter, search, sort, group, page), or add an ID for a **single** entity. The query mechanics are the same across every endpoint — see [Filtering](/api/filtering/), [Searching](/api/searching/), [Sorting](/api/sorting/), [Grouping](/api/grouping/), [Paging](/api/paging/), and [Selecting fields](/api/selecting-fields/).

This page is the index. What each entity *is*, and what every field on it *means*, lives on its [Entities](/entities/) page — follow the links.

## Entity endpoints

| Endpoint | List / single | What it returns |
|---|---|---|
| `/works` | `/works` · `/works/W…` | [Works](/entities/works/) — scholarly documents |
| `/authors` | `/authors` · `/authors/A…` | [Authors](/entities/authors/) — the people who create works |
| `/sources` | `/sources` · `/sources/S…` | [Sources](/entities/sources/) — journals, conferences, repositories |
| `/institutions` | `/institutions` · `/institutions/I…` | [Institutions](/entities/institutions/) — universities, companies, and more |
| `/publishers` | `/publishers` · `/publishers/P…` | [Publishers](/entities/publishers/) — the organizations behind sources |
| `/funders` | `/funders` · `/funders/F…` | [Funders](/entities/funders/) — research funders |
| `/awards` | `/awards` · `/awards/G…` | [Awards](/entities/awards/) — specific grants |

## Aboutness endpoints

| Endpoint | What it returns |
|---|---|
| `/topics` | [Topics](/entities/topics/) — ~4,500 fine-grained subjects |
| `/subfields` | [Subfields](/entities/subfields/) — 252 mid-level subjects |
| `/fields` | [Fields](/entities/fields/) — 26 broad disciplines |
| `/domains` | [Domains](/entities/domains/) — the 4 top-level branches |
| `/keywords` | [Keywords](/entities/keywords/) — short topic-derived phrases |
| `/sdgs` | [SDGs](/entities/sdgs/) — the 17 UN Sustainable Development Goals |
| `/concepts` | [Concepts](/entities/concepts/) *(deprecated — use Topics)* |

## Vocabulary endpoints

| Endpoint | What it returns |
|---|---|
| `/work-types` | [Work types](/entities/work-types/) |
| `/source-types` | [Source types](/entities/source-types/) |
| `/institution-types` | [Institution types](/entities/institution-types/) |
| `/countries` | [Countries](/entities/countries/) |
| `/continents` | [Continents](/entities/continents/) |
| `/languages` | [Languages](/entities/languages/) |
| `/licenses` | [Licenses](/entities/licenses/) |
| `/indexes` | [Indexes](/entities/indexes/) |

## Special-purpose endpoints

| Endpoint | What it does |
|---|---|
| `/autocomplete/{entity}` | Fast type-ahead suggestions — see [Autocomplete](/api/autocomplete/) |
| `/text` | Tag arbitrary text with topics, keywords, and SDGs — see [Tagging text](/api/tag-aboutness/) |
| `/collections` | Create and manage saved [collections](/entities/collections/) — see [Collections API](/api/collections/) |
| `/curations` | Submit corrections — see [Author curation](/api/author-curation/) and [Curations](/entities/curations/) |

## OQL and OQO

Beyond REST, OpenAlex answers the same queries through [OQL](/docs/oql/) (a readable query language) and its machine-readable twin [OQO](/docs/oqo-schema/). Every query surface — REST, OQL, the web builder — transpiles to the same OQO under the hood; see [Querying](/docs/querying/).
