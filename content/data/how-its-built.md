---
title: "How it's built"
updated: 2026-08-18
description: "How the OpenAlex dataset is built: gathering records from thousands of sources and organizing them into one connected knowledge graph. A map that points into the entity pages where each step is documented in full."
tags: ["reference"]
---
OpenAlex gathers the world's research output from thousands of sources, organizes it into one connected knowledge graph, and shares it with everyone for free. This page is the map of how the first two steps — **gather** and **organize** — build the dataset, in broad strokes. Each step is documented in depth in the "About" section of the relevant [entity](/data/) page, and this page links into them as it goes. (The third step, **share**, is an [Access](/access/) concern rather than a data one: see [Get the data](/access/overview/) for every way to access the result.)

## Gather

When a researcher publishes an article, book, or dataset, information about it is registered with agencies like [Crossref](https://crossref.org) and [DataCite](https://datacite.org), or deposited in institutional and national repositories. OpenAlex pulls records from these sources continuously — the database evolves daily. The catalog was seeded by the discontinued [Microsoft Academic Graph (MAG)](https://en.wikipedia.org/wiki/Microsoft_Academic), whose final open dataset OpenAlex adopted in 2021.

We track the external [indexes](/data/indexes/) a record can come from — Crossref, PubMed, DataCite, DOAJ, arXiv — and the venues those records name become [sources](/data/sources/#about): journals, conference series, ebook platforms, and repositories. The core inputs we pull from today include:

- [Crossref](https://www.crossref.org/) and [DataCite](https://datacite.org/), the DOI registration agencies
- [ORCID](https://orcid.org/) and [ROR](https://ror.org/), the open identifier systems for researchers and institutions
- [PubMed](https://pubmed.ncbi.nlm.nih.gov/) and [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/)
- [DOAJ](https://doaj.org/) and [the ISSN International Centre](https://www.issn.org/)
- The [Internet Archive](https://archive.org/details/GeneralIndex)
- Aggregators and subject repositories: HAL, arXiv, Zenodo, Dergipark, OSTI, RePEc, and many more
- Thousands of institutional [repositories](/data/sources/repositories/), from [UNC's CDR](https://cdr.lib.unc.edu/) to [Michigan's Deep Blue](https://deepblue.lib.umich.edu/documents) ([full list of repositories we harvest](https://openalex.org/sources?filter=type:repository))
- Parsing of 50M+ open access PDFs, journal landing pages, and direct publisher feeds
- Corrections from users through [community curation](/access/fixing-errors/)

## Organize

The records flowing in are messy and redundant, so the heart of OpenAlex is turning them into a clean, connected graph of [entities](/data/). Some of those entities are **native** — OpenAlex mints its own IDs by making judgment calls about fuzzy real-world boundaries — and some are a consistent **vocabulary** wrapped around things that already exist crisply; the [Entities overview](/data/) explains that distinction and how much to trust each kind of ID.

**Records become works.** Each incoming record is matched (by DOI or other metadata) against the [works](/data/works/#about) already in OpenAlex. If it matches, the record enriches the existing work; if nothing matches, it may seed a new one. Duplicate records of the same work are merged into a single work — the core node that every other entity connects to.

**Authors get disambiguated.** The name strings on a work ("J. Smith," "John A. Smith") are clustered into real people, each assigned a stable author ID. This is [author disambiguation](/data/authors/#about), a machine-learning process that weighs name, co-authors, affiliations, topics, citations, and ORCID.

**Affiliations get matched.** The free-text [raw affiliation strings](/data/raw-affiliation-strings/) on each work ("MIT, Boston, USA") are parsed and linked to ROR-backed [institutions](/data/institutions/#about) and countries — which in turn feeds the affiliation signal used in author disambiguation.

**Works get classified.** Text classifiers read each work's title and abstract to decide what it's *about*, tagging it with [topics](/data/topics/), subfields, keywords, and SDGs. See [Aboutness](/data/aboutness/) for the full set of subject signals and how to pick among them.

**Citations get built.** Each work's reference list is extracted — from source metadata and, for open works, from the PDF — and matched to other works already in OpenAlex, producing both references and citation counts. See [Works: citations and references](/data/works/citations/#citations-and-references).

This pipeline is complex and changes frequently. In the interest of openness, we share our internal monitoring dashboard publicly: [view the pipeline dashboard](http://unpaywall-metabase.herokuapp.com/public/dashboard/8e114521-b74b-4e6c-bba8-3a8fc573fb64).

## Share

Sharing the result is covered in the [Access](/access/) tab: see [Get the data](/access/overview/) for every way to access the dataset — from the website to the API to whole-database downloads — and [Querying](/access/querying/) for the ways to ask it questions. However you access it, the data is free: everything is released under a [CC0](https://creativecommons.org/public-domain/cc0/) public-domain license, with no "personal use only" carve-out and no permission to ask. Keeping it that way is a deliberate, funded plan — see [Pricing](/access/pricing/).
