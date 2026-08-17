---
title: "Overview"
updated: 2026-08-09
description: "What a source is, where sources come from, and how OpenAlex builds them and judges journal quality and open access."
tags: ["reference"]
source_id: "24347057529623"
source_url: "https://help.openalex.org/hc/en-us/articles/24347057529623-Sources-in-OpenAlex"
source_updated: "2024-07-26"
entity:
  example: "S137773608"
  api: "sources"
  linksTo:
    - "locations"
    - "publishers"
    - "indexes"
---
A **source** is a venue where [works](/data/works/) appear: a journal, a conference proceedings series, a preprint or institutional repository, an ebook platform, or a book series. Sources are how OpenAlex connects works to the places that host them — every work links to one or more sources through its [locations](/data/locations/), and each source aggregates the works it published. OpenAlex tracks about 255,000 sources; a source's OpenAlex ID looks like `S137773608`, and you can fetch one at [`api.openalex.org/sources/S137773608`](https://api.openalex.org/sources/S137773608).

This page covers where sources come from and the judgment calls behind them. [Repositories](/data/sources/repositories/) covers how repository content gets harvested and matched, and [Attributes](/data/sources/attributes/) is the dictionary of every attribute on a source object.

## About

### Where sources come from

Sources are drawn from the [works](/data/works/) that flow into OpenAlex: as records arrive from [Crossref](https://www.crossref.org/), the [Microsoft Academic Graph (MAG)](https://en.wikipedia.org/wiki/Microsoft_Academic), DataCite, PubMed, repositories, and other feeds, the venues they name become sources. A source is identified primarily by its [ISSN](https://en.wikipedia.org/wiki/International_Standard_Serial_Number) — OpenAlex groups every ISSN that shares an [`issn_l`](/data/sources/attributes/#issn_l) (linking ISSN) into a single source — with additional sources coming from repository and platform registries that have no ISSN. Each source is attached to the [publisher](/data/publishers/) that runs it via [`host_organization`](/data/sources/attributes/#host_organization).

### Source types

Every source carries exactly one [`type`](/data/sources/attributes/#type), assigned from its metadata and behavior. The vocabulary (see [Source types](/data/source-types/)):

| Type | What it is | Rough count |
|---|---|---|
| `journal` | Peer-reviewed serials — the large majority of sources | ~206,000 |
| `ebook platform` | Book-hosting platforms | ~25,000 |
| `conference` | Conference proceedings series | ~10,000 |
| `repository` | OA repositories like [arXiv](https://arxiv.org/) or institutional repositories | ~7,000 |
| `book series` | Serial book publications | ~7,000 |
| `other` / `metadata` | Everything else, and metadata-only sources | ~130 |

Repository sources behave differently enough from journals — harvesting, matching, and why their work counts can look small — that they get their own page: [Repositories](/data/sources/repositories/).

### No quality bar, by design

OpenAlex deliberately does not impose a quality bar on which sources it indexes — its inclusion criteria are more like arXiv than Web of Science. There are good reasons to index everything: "lower-quality" sources are useful as objects of study; sources that are inadequate for one purpose are ideal for another (grey literature, regional literature, early-career work); low-power studies aggregate into high-power meta-analyses; and excellent work is too often excluded from traditional indexes merely for being non-English or from the Global South. Most importantly, "lower-quality" content can always be *filtered out* if it's included — it can't be added back if it's not.

**Predatory journals** are handled the same way. There is no authoritative list of them, the lists change constantly, and the definition itself is contested — from faked peer review (obviously problematic) to any publisher that inflates accepted volume for revenue (a practice common even at "reputable" sources). Rather than maintain a deny list and play cat-and-mouse with bad actors who can simply rebrand, OpenAlex indexes everything and lets analysts narrow down.

### Allow lists

OpenAlex prefers **allow lists** (curated lists of trusted sources) over deny lists: they're more transparent, easier to maintain, and a more robust foundation for retrieval. Two membership flags let you narrow to trusted sources:

- [`is_in_doaj`](/data/sources/attributes/#is_in_doaj) — the source is indexed in the [Directory of Open Access Journals](https://doaj.org/), which vets the legitimacy of fully-OA journals. About 23,000 sources.
- [`is_core`](/data/sources/attributes/#is_core) — the source is on the [CWTS Core sources list](https://zenodo.org/records/13879982). About 36,000 sources.

More filters like these are planned; the goal is a "quality vs. quantity" slider that users can adjust to their needs. Because the database is open, a list of sources to *exclude* is easy for one librarian to build and share; ask your local librarian if they've curated one.

### CWTS Core vs. Web of Science

The [Centre for Science and Technology Studies](https://www.cwts.nl/) (CWTS) at Leiden University maintains the **Core sources** list — the subset of OpenAlex sources included in their [Leiden Ranking Open Edition](https://open.leidenranking.com/). Filtering works by `primary_location.source.is_core:true` returns only publications from those sources, letting you explore the data behind the rankings (or negate it to see what they exclude). CWTS Core is **not** the [Web of Science Core Collection](https://webofscience.help.clarivate.com/Content/wos-core-collection/wos-core-collection.htm), Clarivate's selective journal list — the similar names are coincidence, and the two have different maintainers, criteria, and contents.

### Fully-OA journals and open access

Whether a journal is **fully open access** matters beyond the journal itself: it determines the [OA status](/data/works/open-access/) of the works inside it. An OA article in a fully-OA journal is **gold**; the same article in a toll-access journal is **hybrid** or **bronze** — so a work's `oa_status` links back to the source's openness recorded here. Two source fields carry the determination:

- [`is_in_doaj`](/data/sources/attributes/#is_in_doaj) — the journal is indexed in [DOAJ](https://doaj.org/) (about 23,000 sources). DOAJ verifies credibility and legitimacy; OpenAlex does no independent vetting, so use this field when legitimacy matters. If a journal is in DOAJ it is fully OA (`is_oa=true`, `is_in_doaj=true`).
- [`is_oa`](/data/sources/attributes/#is_oa) — the journal is fully OA, whether or not DOAJ lists it (about 65,000 sources).

Not every fully-OA journal is in DOAJ — smaller titles and journals from the developing world often aren't. For those, OpenAlex applies two more checks: **(1)** is it from a known fully-OA publisher (a small allow list, e.g. many [SciELO](https://scielo.org/)-model publishers)? and **(2)** does it publish *only* OA articles? Because OpenAlex indexes a journal's complete output, it can simply observe whether every article is OA — a check that credits smaller publishers who never registered with DOAJ. A journal passing either check gets `is_oa=true`, `is_in_doaj=false`. This observation-based check also detects **flipped journals** ([`oa_flip_year`](/data/sources/attributes/#oa_flip_year)): an OA article published *before* a journal's flip date is hybrid or bronze, one published *after* is gold.

### APC data

The [article processing charge](https://en.wikipedia.org/wiki/Article_processing_charge) (APC) is the fee some journals charge to publish a work OA. At the source level OpenAlex records the journal's **list price** in [`apc_prices`](/data/sources/attributes/#apc_prices) (per currency) and [`apc_usd`](/data/sources/attributes/#apc_usd); at the [work](/data/works/attributes/#apc_list) level it records both the list price and OpenAlex's best estimate of what was actually paid. List prices are sourced from DOAJ plus manual curation. Two caveats: OpenAlex stores one (current-year) list price per journal, so historical estimates apply today's price to an older year; and DOAJ coverage skews toward fully-OA journals, leaving hybrid journals — where much APC spending happens — thinly covered. For year-by-year list prices, [Butler et al. 2024](https://doi.org/10.7910/DVN/CR1MMV) (Harvard Dataverse, CC0) provides publisher price lists per journal per year (2019–2023, six large publishers, ~8,711 journals); OpenAlex is **evaluating** integrating this dataset but has **not** yet done so. For a worked example of estimating an institution's APC spend, see [Analyzing your institution](/how-to/analyzing-your-institution/#how-much-has-it-spent-on-apc-fees).

## Attributes

The full dictionary of every attribute on a source object lives on its own page: [Attributes](/data/sources/attributes/).

## In the API

The Sources endpoint is at [`api.openalex.org/sources`](https://api.openalex.org/sources). Fetch a single source by ID — [`/sources/S137773608`](https://api.openalex.org/sources/S137773608) — or a list, and [filter](/api/filtering/), search, sort, and group over the source [attributes](/data/sources/attributes/) (for example `filter=is_in_doaj:true,type:journal` or `group_by=type`). For the full list of endpoints see the [endpoints index](/api/endpoints/).
