---
title: "Overview"
description: "What a work is, why works are the central entity in OpenAlex, where they come from, and how records become works."
tags: ["reference"]
source_id: "24347019383191"
source_url: "https://help.openalex.org/hc/en-us/articles/24347019383191-Where-do-works-in-OpenAlex-come-from"
source_updated: "2025-01-09"
entity:
  example: "W2741809807"
  api: "works"
  linksTo:
    - "authorships"
    - "locations"
    - "topics"
    - "keywords"
    - "funders"
    - "awards"
---
A **work** is any scholarly document: a journal article, conference paper, book or book chapter, dataset, dissertation, preprint, and more. There are over 320 million works in OpenAlex, with tens of thousands added every day. A work's OpenAlex ID looks like `W2741809807`; fetch one at [`api.openalex.org/works/W2741809807`](https://api.openalex.org/works/W2741809807).

Works are the central entity in OpenAlex — everything connects to them. [Authors](/data/authors/) write works, [sources](/data/sources/) publish them, [institutions](/data/institutions/) get credit for them, [topics](/data/topics/) describe them, and [funders](/data/funders/) pay for them. Works also carry by far the most information of any entity: all twenty-ish entity types are first-class citizens, but works are the firstest class.

## About

### Where works come from

OpenAlex aggregates and builds on many open data sources. The catalog was seeded by the [Microsoft Academic Graph (MAG)](https://en.wikipedia.org/wiki/Microsoft_Academic) — Microsoft Research's effort to catalog the scholarly literature — whose final open dataset OpenAlex adopted when the project was discontinued in 2021. The other primary source is [Crossref](https://www.crossref.org/), the open DOI-registration agency. Alongside those, works are drawn from DataCite, PubMed, HAL, institutional and subject repositories, and more; see [How it's built](/data/how-its-built/) for the full ingest picture.

### From record to work

Information about a scholarly document arrives as a **record**. A record might be an item of Crossref metadata, an entry from a repository like [arXiv](https://arxiv.org/) or [PubMed](https://pubmed.ncbi.nlm.nih.gov/), or publicly available information from the web.

The first task with any new record is to decide whether the work it describes is already in OpenAlex:

- **The record matches an existing work.** Using the record's [DOI](https://en.wikipedia.org/wiki/Digital_object_identifier) or other metadata-matching techniques, OpenAlex links it to a work it already knows about and uses the record to *enrich* that work.
- **The record is new.** If nothing matches, the record represents a work OpenAlex hasn't seen. OpenAlex then either creates a new work from it, or sets it aside to enrich a work added later.

Not every record becomes its own work. Which new works get created follows a set of rules — for example, nearly all records from Crossref and a few other trusted sources (PubMed, arXiv, and several repositories) are eligible to become new works, while records from noisier sources are held to a higher bar. Once a work exists, OpenAlex tracks its own metadata — title, abstract (and often full text), publication date, type — and the connections that make it useful at scale: authors, institutional affiliations, the source it appeared in, topics, funders, and citations.

How works cite each other — references, citation counts, and FWCI — has its own page: [Citations](/data/works/citations/). How OpenAlex decides whether a work is free to read: [Open access](/data/works/open-access/).

## In the API

The Works endpoint is at [`api.openalex.org/works`](https://api.openalex.org/works). Fetch a single work by ID — [`/works/W2741809807`](https://api.openalex.org/works/W2741809807) — or a list, and [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over the attributes documented on the [Attributes](/data/works/attributes/) page. For the full list of endpoints see the [endpoints index](/api/endpoints/).
