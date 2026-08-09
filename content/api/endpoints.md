---
title: "Overview"
description: "Every OpenAlex API endpoint at a glance — the entity list/single endpoints and the special-purpose ones — each linking to the entity page that documents its fields."
tags: ["reference"]
---
Every OpenAlex entity has a REST endpoint under `https://api.openalex.org/`. They all work the same way: request the plural path for a **list** (filter, search, sort, group, page), or add an ID for a **single** entity. The query mechanics are the same across every endpoint — see [Filtering](/api/filtering/), [Searching](/api/searching/), [Sorting](/api/sorting/), [Grouping](/api/grouping/), [Paging](/api/paging/), and [Selecting fields](/api/selecting-fields/).

This page is the index. What each entity *is*, and what every field on it *means*, lives on its [Entities](/data/) page — follow the links.

## Entity endpoints

| Endpoint | List / single | What it returns |
|---|---|---|
| `/works` | `/works` · `/works/W…` | [Works](/data/works/) — scholarly documents |
| `/authors` | `/authors` · `/authors/A…` | [Authors](/data/authors/) — the people who create works |
| `/sources` | `/sources` · `/sources/S…` | [Sources](/data/sources/) — journals, conferences, repositories |
| `/institutions` | `/institutions` · `/institutions/I…` | [Institutions](/data/institutions/) — universities, companies, and more |
| `/publishers` | `/publishers` · `/publishers/P…` | [Publishers](/data/publishers/) — the organizations behind sources |
| `/funders` | `/funders` · `/funders/F…` | [Funders](/data/funders/) — research funders |
| `/awards` | `/awards` · `/awards/G…` | [Awards](/data/awards/) — specific grants |

## Aboutness endpoints

| Endpoint | What it returns |
|---|---|
| `/topics` | [Topics](/data/topics/) — ~4,500 fine-grained subjects |
| `/subfields` | [Subfields](/data/subfields/) — 252 mid-level subjects |
| `/fields` | [Fields](/data/fields/) — 26 broad disciplines |
| `/domains` | [Domains](/data/domains/) — the 4 top-level branches |
| `/keywords` | [Keywords](/data/keywords/) — short topic-derived phrases |
| `/sdgs` | [SDGs](/data/sdgs/) — the 17 UN Sustainable Development Goals |
| `/concepts` | [Concepts](/data/concepts/) *(deprecated — use Topics)* |

## Vocabulary endpoints

| Endpoint | What it returns |
|---|---|
| `/work-types` | [Work types](/data/work-types/) |
| `/source-types` | [Source types](/data/source-types/) |
| `/institution-types` | [Institution types](/data/institution-types/) |
| `/countries` | [Countries](/data/countries/) |
| `/continents` | [Continents](/data/continents/) |
| `/languages` | [Languages](/data/languages/) |
| `/licenses` | [Licenses](/data/licenses/) |
| `/indexes` | [Indexes](/data/indexes/) |

## Special-purpose endpoints

| Endpoint | What it does |
|---|---|
| `/autocomplete/{entity}` | Fast type-ahead suggestions — see [Autocomplete](/api/autocomplete/) |
| `/text` | Tag arbitrary text with topics, keywords, and SDGs — see [Tagging text](/api/tag-aboutness/) |
| `/collections` | Create and manage saved [collections](/data/collections/) — see [Collections API](/api/collections/) |
| `/curations` | Submit corrections — see [Author curation](/api/author-curation/) and [Curations](/data/curations/) |

## OQL and OQO

Beyond REST, OpenAlex answers the same queries through [OQL](/access/oql/) (a readable query language) and its machine-readable twin [OQO](/access/oqo-schema/). Every query surface — REST, OQL, the web builder — transpiles to the same OQO under the hood; see [Querying](/access/querying/).
