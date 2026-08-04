---
title: "Works"
description: "What a work is, where works come from, and how OpenAlex turns incoming records into work records."
tags: ["reference"]
source_id: "24347019383191"
source_url: "https://help.openalex.org/hc/en-us/articles/24347019383191-Where-do-works-in-OpenAlex-come-from"
source_updated: "2025-01-09"
---
A **work** is any scholarly document: a journal article, conference paper, book or book chapter, dataset, dissertation, preprint, and more. Works are the core of OpenAlex — over 320 million of them, with tens of thousands added every day — and every other entity (authors, sources, institutions, topics, funders) connects to the works it produced, published, or funded.

This page covers what a work is and how one comes to exist in OpenAlex. The rest of this zone covers the specifics: [work types](/docs/work-types/), [versions](/docs/versions/), [citations](/docs/citations/), and [counts by year](/docs/counts-by-year/).

## Where works come from

OpenAlex aggregates and builds on many open data sources. The catalog was seeded by the [Microsoft Academic Graph (MAG)](https://en.wikipedia.org/wiki/Microsoft_Academic) — Microsoft Research's effort to catalog the scholarly literature — whose final open dataset OpenAlex adopted when the project was discontinued in 2021. The other primary source is [Crossref](https://www.crossref.org/), the open DOI-registration agency. Alongside those, works are drawn from DataCite, PubMed, HAL, institutional and subject repositories, and more; see [How it works](/docs/how-it-works/) for the full ingest picture.

## From record to work

Information about a scholarly document arrives as a **record**. A record might be an item of Crossref metadata, an entry from a repository like [arXiv](https://arxiv.org/) or [PubMed](https://pubmed.ncbi.nlm.nih.gov/), or publicly available information from the web.

The first task with any new record is to decide whether the work it describes is already in OpenAlex:

- **The record matches an existing work.** Using the record's [DOI](https://en.wikipedia.org/wiki/Digital_object_identifier) or other metadata-matching techniques, OpenAlex links it to a work it already knows about and uses the record to *enrich* that work.
- **The record is new.** If nothing matches, the record represents a work OpenAlex hasn't seen. OpenAlex then either creates a new work from it, or sets it aside to enrich a work added later.

Not every record becomes its own work. Which new works get created follows a set of rules — for example, nearly all records from Crossref and a few other trusted sources (PubMed, arXiv, and several repositories) are eligible to become new works, while records from noisier sources are held to a higher bar.

## The work record

Once a work exists, OpenAlex tracks its own metadata — title, abstract (and often full text), publication date, type — and the connections that make it useful at scale: authors, institutional affiliations, the source it appeared in, topics, funders, and citations. Every field on a work is documented in the [Works API reference](/api/works/).
