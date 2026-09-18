---
title: "Unpaywall and OpenAlex"
updated: 2026-09-18
description: "How Unpaywall relates to OpenAlex: one shared database, two ways of looking at it. What Unpaywall still does, which Unpaywall features were retired in 2026, and how to do the same things in OpenAlex."
tags: ["unpaywall"]
source_id: "new/unpaywall-and-openalex"
source_url: ""
source_updated: "2026-09-18"
---
**Short version:** Unpaywall and OpenAlex are made by the same team and run on the same database. Unpaywall is the narrow, stable view: give it a DOI, it tells you whether there's a free copy and where. OpenAlex is everything else: search, citations, authors, journals, topics, and the same open-access facts. Unpaywall is not deprecated and there are no plans to discontinue it. A few Unpaywall features that had already stopped working were formally retired in September 2026; each has an OpenAlex equivalent, listed [below](#what-was-retired).

## A little history

[Unpaywall](https://unpaywall.org) launched in 2017 as a free service that finds legal, open-access copies of scholarly articles. It became the standard way libraries, link resolvers, publishers, and research tools answer one question: *is there a free version of this paper?*

In January 2022 we launched OpenAlex, an open index of the whole scholarly record. OpenAlex carried over everything Unpaywall knew about open access, and added a great deal more: every work whether or not it has a DOI, authors, institutions, journals and repositories, funders, topics, and the citation links between them.

In late 2025 we rebuilt OpenAlex from the ground up (a project we called Walden), and Unpaywall moved onto the same backend. Since then there has been one database.

## How they fit together today

- **One database.** Everything Unpaywall knows comes from the OpenAlex index. Unpaywall is a legacy-compatible format over that data, kept stable because thousands of integrations already speak it. The `is_oa`, `oa_status`, and PDF link in an Unpaywall record are the same values you'll find in the OpenAlex work's [`open_access`](/data/works/open-access/) and `best_oa_location` fields.
- **Same sources.** The publishers, repositories, and journals Unpaywall monitors are OpenAlex sources. When you search or browse sources in OpenAlex, you're looking at the Unpaywall sources too. There is no separate Unpaywall source list.
- **Unpaywall stays.** People like the brand, the interface, and the record format, and it does one job well: DOI in, open-access answer out. The DOI lookup API, the [Simple Query Tool](https://unpaywall.org/products/simple-query-tool), the [browser extension](https://unpaywall.org/products/extension), and the [Data Feed](/access/unpaywall/#the-unpaywall-data-feed) are unchanged.
- **OpenAlex is where the rest lives.** Anything beyond a DOI lookup, such as searching for papers, listing a journal's articles, or looking up a repository, is what OpenAlex is for, and it does far more of it than Unpaywall ever did.

## What OpenAlex adds

If you've only used Unpaywall, here is what you get from [OpenAlex](/api/) on top of the same open-access data:

- **Search.** Full-text search over titles and abstracts, plus [filters](/api/filtering/) on year, journal, author, institution, OA status, topic, and dozens more. Unpaywall's title search was a small subset of this.
- **Coverage.** Over 300 million works, including ones without a DOI and ones with DataCite DOIs, which Unpaywall never covered.
- **Citations.** Citation counts and the full citation graph, both directions.
- **Authors and institutions.** Disambiguated authors with ORCIDs, institutions with RORs, and each author's affiliations over time.
- **Journals and repositories as first-class records.** Every source has its ISSNs, publisher, OA status, DOAJ status, and per-year counts.
- **Topics.** Every work is classified into a topic hierarchy, so you can ask for "open-access papers on X since 2024".
- **Aggregation.** Group any query by any field, so questions like "what share of this journal's 2025 papers are open?" are one request.
- **A website.** [openalex.org](https://openalex.org) lets you do all of this without writing code.

Casual use of the API needs no key at all. A free [API key](/api/authentication/) raises your daily budget; the old Unpaywall-style `email=` parameter is not needed.

## What was retired

These Unpaywall features stopped working when Unpaywall moved to the shared database in January 2026, and were formally retired on 18 September 2026. Each API endpoint now returns `410 Gone` with a short message pointing here. Nothing else about Unpaywall changed; in particular, `api.unpaywall.org/v2/{doi}` works exactly as before.

| Retired | What it did | Do this instead |
|---|---|---|
| `GET /v2/search?query=` and the [article search page](https://unpaywall.org/articles) | Find articles by title | OpenAlex search: `https://api.openalex.org/works?search=YOUR+QUERY` ([how to migrate](#migrating-a-title-search)) or [search on the website](https://openalex.org/works) |
| `GET /issn_ls?issns=` and the ISSN-L finder page | Look up a journal's ISSN-L | `https://api.openalex.org/sources?filter=issn:0028-0836&select=id,display_name,issn_l,issn` |
| `journals.csv.gz`, `journal_open_access.csv.gz`, `crossref_issns.csv.gz` | Journal-level exports (last generated December 2024) | The [sources](/data/sources/) entity: `https://api.openalex.org/sources?filter=type:journal`, or the [snapshot](/access/snapshot/) |
| `repositories.csv.gz`, `/data/sources`, `/data/repositories`, repository dashboards (`unpaywall.org/sources/repository/…`) | Repository lists and per-repository harvest stats | [Browse repositories in OpenAlex](https://openalex.org/sources?filter=type:repository) or `https://api.openalex.org/sources?filter=type:repository` |
| `unpaywall.org/sources/repositories/add` and the endpoint validator | Register a repository for harvesting | [Add a repository to OpenAlex](https://openalex.org/repositories/add); see [Getting indexed](/how-to/getting-indexed/) |
| `extension_requests.csv.gz` | Export of browser-extension requests | No replacement |

## Migrating a title search

The old call:

```
GET https://api.unpaywall.org/v2/search?query=cell%20thermometry&is_oa=true&page=2&email=you@example.com
```

becomes:

```
GET https://api.openalex.org/works?search=cell%20thermometry&filter=open_access.is_oa:true&page=2&per-page=50
```

`search=` matches titles, abstracts, and full text. To match titles only, as Unpaywall did, use `filter=title.search:cell%20thermometry` instead. Results come back sorted by relevance; there is no `snippet` field. See [Search](/api/searching/) and [Paging](/api/paging/).

Each result used to be an Unpaywall record under `response`. It is now an OpenAlex [work](/data/works/), which carries the same open-access facts under different names:

| Unpaywall field | OpenAlex work field |
|---|---|
| `doi` | `doi` (as a full `https://doi.org/…` URL) |
| `title` | `title` |
| `year` | `publication_year` |
| `is_oa` | `open_access.is_oa` |
| `oa_status` | `open_access.oa_status` |
| `has_repository_copy` | `open_access.any_repository_has_fulltext` |
| `best_oa_location.url_for_pdf` | `best_oa_location.pdf_url` |
| `best_oa_location.url` | `open_access.oa_url` |
| `best_oa_location.license` / `.version` | `best_oa_location.license` / `.version` |
| `oa_locations` | `locations` (those with `is_oa: true`) |
| `journal_name`, `journal_issn_l`, `journal_is_oa`, `journal_is_in_doaj` | `primary_location.source.display_name`, `.issn_l`, `.is_oa`, `.is_in_doaj` |
| `publisher` | `primary_location.source.host_organization_name` |
| `z_authors` | `authorships` |

If you only need the open-access fields, add `select=doi,title,publication_year,open_access,best_oa_location` to keep responses small.

## Still have an Unpaywall question?

Email [support@unpaywall.org](mailto:support@unpaywall.org); it reaches the same team. For everything about the Unpaywall API, data format, and extension, see the [Unpaywall](/access/unpaywall/) page.
