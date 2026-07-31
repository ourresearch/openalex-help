---
title: "About the data"
description: "The OpenAlex dataset: entities, the connections between them, and the three ways to access it all."
tags: ["reference"]
source_id: "24397285563671"
source_url: "https://help.openalex.org/hc/en-us/articles/24397285563671-About-the-data"
source_updated: "2024-07-30"
---
![](/images/zendesk/openalex-overview-diagram.png)

OpenAlex is more than a catalog of research publications. We do the work of _disambiguating_ and _connecting_ scholarly works, authors, institutions, sources, and other entities, turning hundreds of millions of records into one linked dataset — an open map of the world's research system.

## The dataset

At the heart of OpenAlex is a catalog of **works**. A work is any sort of scholarly output: research articles are one kind, but there are others, such as datasets, books, and dissertations. OpenAlex indexes over 320 million works, with tens of thousands more added every day. We track each work's own metadata — title, abstract (and often full text), publication date, and so on — and, just as importantly, the **connections** between works: journals, authors, institutional affiliations, citations, topics, and funders.

Those connections are what make research legible at scale. Each connected thing is its own entity with its own record: [authors](/api/authors/), [sources](/docs/sources/) (journals and repositories), [institutions](/api/institutions/), [topics](/docs/topics/), [publishers](/api/publishers/), and [funders](/api/funders/). For how the graph is actually built, see [How OpenAlex works](/docs/how-openalex-works/).

## Data sources

OpenAlex aggregates and standardizes data from many other projects, like a river fed by tributaries. Two of the most important are [MAG](https://aka.ms/msracad) (the discontinued Microsoft Academic Graph, which seeded the catalog) and [Crossref](https://www.crossref.org/). Other key sources include:

- [ORCID](https://orcid.org/)
- [ROR](https://ror.org/)
- [DOAJ](https://doaj.org/)
- [DataCite](https://datacite.org/)
- [Unpaywall](https://unpaywall.org/)
- [PubMed](https://pubmed.ncbi.nlm.nih.gov/) and [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/)
- [The ISSN International Centre](https://www.issn.org/)
- [Internet Archive](https://archive.org/details/GeneralIndex)
- Web crawls
- Subject-area and institutional repositories, from [arXiv](https://arxiv.org/) to [Zenodo](https://zenodo.org/) and many in between

More on how works enter the dataset: [Works](/docs/works/).

## Ways to access the data

The same dataset is available through three channels, depending on your needs:

- **[OpenAlex Web](https://openalex.org)** — the friendly web interface: search, filter, group, and export without writing code.
- **[The API](/api/)** — a fast, modern REST API for programmatic access, free to start, plus OQL for expressive queries.
- **[Bulk data](/docs/bulk-data/)** — the full-dataset snapshot and the full-text content archive, for when you want the whole thing on your own machines.

Coverage and quality questions — what's included, how it compares to other databases, how accurate it is — are covered in [Coverage & accuracy](/docs/coverage-and-accuracy/).
