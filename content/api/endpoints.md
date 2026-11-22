---
title: "Overview"
updated: 2026-11-23
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

## Component endpoints

[Component](/data/component/) entities are parts of a work. They have no minted OpenAlex ID, but three of them have their own list endpoints; locations are addressed by a namespaced id (`doi:…`, `pmh:…`, `pmid:…`, `mag:…`) rather than a letter-prefixed one.

| Endpoint | List / single | What it returns |
|---|---|---|
| `/locations` | `/locations` · `/locations/doi:…` | [Locations](/data/locations/) — every harvested copy of a work, one row per copy |
| `/links` | `/links?filter=origin:W…` · `/links?filter=target:W…` | [Links](/data/links/) — work-to-work links (citations and part-of), one work at a time |
| `/works/W…/references` | single only | [Reference lists](/data/works/references/) — a work's printed references, each with the work it links to |
| `/raw-affiliation-strings` | `/raw-affiliation-strings` | [Raw affiliation strings](/data/raw-affiliation-strings/) — distinct affiliation strings as printed |

## Aboutness endpoints

| Endpoint | What it returns |
|---|---|
| `/topics` | [Topics](/data/topics/) — ~4,500 fine-grained subjects |
| `/subfields` | [Subfields](/data/subfields/) — 252 mid-level subjects |
| `/fields` | [Fields](/data/fields/) — 26 broad disciplines |
| `/domains` | [Domains](/data/domains/) — the 4 top-level branches |
| `/keywords` | [Keywords](/data/keywords/) — short topic-derived phrases |
| `/sdgs` | [SDGs](/data/sdgs/) — the 17 UN Sustainable Development Goals |
| `/study-designs` | [Study designs](/data/study-designs/): the 7 designs a work's research can have (randomized controlled trial, systematic review, …) |
| `/concepts` | [Concepts](/data/concepts/) *(deprecated — use Topics)* |

## Vocabulary endpoints

| Endpoint | What it returns |
|---|---|
| `/work-types` | [Work types](/data/work-types/) |
| `/link-types` | [Link types](/data/link-types/): the kinds of link between two works (citation, review, translation, summary, retraction, withdrawal, removal, volume, component, data series, part). `/relationships`, its old name, answers until 7 December 2026, then redirects here |
| `/contributor-roles` | [Contributor roles](/data/contributor-roles/): the 14 CRediT roles a person can play on a work (conceptualization, software, writing – original draft, …), editor and translator |
| `/author-types` | [Author types](/data/author-types/): the kinds of author on a byline (human, organization, software agent) |
| `/source-types` | [Source types](/data/source-types/) |
| `/institution-types` | [Institution types](/data/institution-types/) |
| `/countries` | [Countries](/data/countries/) |
| `/continents` | [Continents](/data/continents/) |
| `/languages` | [Languages](/data/languages/) |
| `/licenses` | [Licenses](/data/licenses/) |
| `/indexes` | [Indexes](/data/indexes/) |
| `/source-lists` | [Source lists](/data/source-lists/) |

## Special-purpose endpoints

| Endpoint | What it does |
|---|---|
| `/autocomplete/{entity}` | Fast type-ahead suggestions — see [Autocomplete](/api/autocomplete/) |
| `/text` | Tag arbitrary text with topics and keywords — see [Tag Aboutness](/api/tag-aboutness/) |
| `/collections` | [Collections](/data/collections/): list the public ones (no key) and your own (filter, search, sort, group), create, read, share and change them and their members (no credits) — see [Collections API](/api/collections/) |
| `/curations` | Submit corrections *(on `user.openalex.org`)* — see [Author curation](/api/author-curation/) and [Curations](/data/curations/) |
| `/saved-searches` | Save searches and set email alerts for new works (no credits) — see [Alerts and saved searches](/api/alerts/) |

## OQL and OQO

Beyond REST, OpenAlex answers the same queries through [OQL](/access/oql/) (a readable query language) and its machine-readable twin [OQO](/access/oqo-schema/). Every query surface — REST, OQL, the web builder — transpiles to the same OQO under the hood; see [Querying](/access/querying/).
