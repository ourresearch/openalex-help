---
title: "Overview"
description: "How OpenAlex works, end to end: gathering records from thousands of sources, resolving them into one connected knowledge graph, and sharing the result for free. A map that points into the entity pages where each step is documented in full."
tags: ["reference"]
---
OpenAlex gathers the world's research output from thousands of sources, organizes it into one connected knowledge graph, and shares it with everyone for free. This page is the map of how that pipeline works, from broad strokes. Each step is documented in depth in the "How we build it" section of the relevant [entity](/data/) page, and this page links into them as it goes.

<figure class="layers-figure">
  <img src="/images/layer-cake.webp" alt="How OpenAlex works: research content is gathered, organized, and shared, growing into the scholarly ecosystem" />
  <figcaption>
    <ol>
      <li><strong>Research content</strong> is published across 250k journals and repositories</li>
      <li><strong>OpenAlex</strong> gathers, organizes, and shares the knowledge graph</li>
      <li><strong>Humans and agents</strong> collaborate at scale</li>
    </ol>
  </figcaption>
</figure>

## Gather

When a researcher publishes an article, book, or dataset, information about it is registered with agencies like [Crossref](https://crossref.org) and [DataCite](https://datacite.org), or deposited in institutional and national repositories. OpenAlex pulls records from these sources continuously — the database evolves hourly. The catalog was seeded by the discontinued [Microsoft Academic Graph (MAG)](https://en.wikipedia.org/wiki/Microsoft_Academic), whose final open dataset OpenAlex adopted in 2021.

We track the external [indexes](/data/indexes/) a record can come from — Crossref, PubMed, DataCite, DOAJ, arXiv — and the venues those records name become [sources](/data/sources/#how-its-made): journals, conference series, ebook platforms, and repositories. The core inputs we pull from today include:

- [Crossref](https://www.crossref.org/) and [DataCite](https://datacite.org/), the DOI registration agencies
- [ORCID](https://orcid.org/) and [ROR](https://ror.org/), the open identifier systems for researchers and institutions
- [PubMed](https://pubmed.ncbi.nlm.nih.gov/) and [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/)
- [DOAJ](https://doaj.org/) and [the ISSN International Centre](https://www.issn.org/)
- [Unpaywall](https://unpaywall.org/) and the [Internet Archive](https://archive.org/details/GeneralIndex)
- Aggregators and subject repositories: HAL, arXiv, Zenodo, Dergipark, OSTI, RePEc, and many more
- Thousands of institutional [repositories](/docs/repositories/), from [UNC's CDR](https://cdr.lib.unc.edu/) to [Michigan's Deep Blue](https://deepblue.lib.umich.edu/documents) ([full list](https://unpaywall.org/sources))
- Parsing of 60M+ open access PDFs, journal landing pages, and direct publisher feeds
- Corrections from users through [community curation](/help/fix-errors-in-openalex/)

## Organize

The records flowing in are messy and redundant, so the heart of OpenAlex is turning them into a clean, connected graph of [entities](/data/). Some of those entities are **native** — OpenAlex mints its own IDs by making judgment calls about fuzzy real-world boundaries — and some are a consistent **vocabulary** wrapped around things that already exist crisply; the [Entities overview](/data/overview/) explains that distinction and how much to trust each kind of ID.

**Records become works.** Each incoming record is matched (by DOI or other metadata) against the [works](/data/works/#how-its-made) already in OpenAlex. If it matches, the record enriches the existing work; if nothing matches, it may seed a new one. Duplicate records of the same work are merged into a single work — the core node that every other entity connects to.

**Authors get disambiguated.** The name strings on a work ("J. Smith," "John A. Smith") are clustered into real people, each assigned a stable author ID. This is [author disambiguation](/data/authors/#how-its-made), a machine-learning process that weighs name, co-authors, affiliations, topics, citations, and ORCID.

**Affiliations get matched.** The free-text [raw affiliation strings](/data/raw-affiliation-strings/) on each work ("MIT, Boston, USA") are parsed and linked to ROR-backed [institutions](/data/institutions/#how-its-made) and countries — which in turn feeds the affiliation signal used in author disambiguation.

**Works get classified.** Text classifiers read each work's title and abstract to decide what it's *about*, tagging it with [topics](/data/topics/), subfields, keywords, and SDGs. See [Aboutness](/data/aboutness/) for the full set of subject signals and how to pick among them.

**Citations get built.** Each work's reference list is extracted — from source metadata and, for open works, from the PDF — and matched to other works already in OpenAlex, producing both references and citation counts. See [Works: citations and references](/data/works/#citations-and-references).

This pipeline is complex and changes frequently. In the interest of openness, we share our internal monitoring dashboard publicly: [view the pipeline dashboard](http://unpaywall-metabase.herokuapp.com/public/dashboard/8e114521-b74b-4e6c-bba8-3a8fc573fb64).

## Share

The same knowledge graph is available through eight channels, from no-code to whole-database. For picking among the query-time channels, see [Querying](/docs/querying/); to pull the whole dataset, see [Get the data](/docs/snapshot/).

<div class="access-grid">
  <a class="access-card" href="https://openalex.org">
    <span class="ac-title">Website</span>
    <span class="ac-body">Search and filter by topic, date, full-text availability, and more, then export what you find.</span>
  </a>
  <a class="access-card" href="/docs/oql/">
    <span class="ac-title">OQL</span>
    <span class="ac-body">Use the OpenAlex Query Language (beta) to build and share complex queries. Great for systematic reviews.</span>
  </a>
  <a class="access-card" href="/api/">
    <span class="ac-title">API</span>
    <span class="ac-body">Built for builders: fast and well-documented, with a generous free tier and pay-as-you-go after that.</span>
  </a>
  <a class="access-card" href="/docs/cli/">
    <span class="ac-title">CLI</span>
    <span class="ac-body">Query from your terminal and pipe the results into your own scripts. Agents love using it.</span>
  </a>
  <a class="access-card" href="/docs/agents/">
    <span class="ac-title">Agents</span>
    <span class="ac-body">Just say "Use OpenAlex" to your agent and it'll handle the rest.</span>
  </a>
  <a class="access-card" href="/docs/snapshot/">
    <span class="ac-title">Snapshot</span>
    <span class="ac-body">Download our entire dataset for free. Updated quarterly.</span>
  </a>
  <a class="access-card" href="/docs/sync/">
    <span class="ac-title">Sync</span>
    <span class="ac-body">Keep your database up to date with daily changes, via AWS or API.</span>
  </a>
  <a class="access-card" href="/docs/fulltext/">
    <span class="ac-title">Fulltext</span>
    <span class="ac-body">Download 50M full-text PDFs with license info — and get new ones daily.</span>
  </a>
</div>

However you access it, the data is free: everything is released under a [CC0](https://creativecommons.org/public-domain/cc0/) public-domain license, with no "personal use only" carve-out and no permission to ask. Keeping it that way is a deliberate, funded plan — see [What is OpenAlex's sustainability model?](/help/what-is-openalexs-sustainability-model/)

<style>
  .layers-figure {
    margin: 2rem 0;
  }
  .layers-figure img {
    display: block;
    max-width: 100%;
    border-radius: 8px;
    border: 1px solid var(--line);
  }
  .layers-figure ol {
    margin: 1rem 0 0;
    padding-left: 1.4rem;
    font-size: 0.92rem;
    color: var(--muted);
  }
  .layers-figure li {
    margin-bottom: 0.25rem;
  }
  .layers-figure strong {
    color: var(--ink);
  }
  .access-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    gap: 0.9rem;
    margin: 1.25rem 0 1.5rem;
  }
  .access-card {
    display: block;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 0.9rem 1rem;
    color: inherit;
    transition: border-color 0.15s;
  }
  .access-card:hover {
    border-color: var(--line-strong);
    text-decoration: none;
    color: inherit;
  }
  .ac-title {
    display: block;
    font-weight: 600;
    font-size: 0.93rem;
    margin-bottom: 0.2rem;
  }
  .ac-body {
    display: block;
    font-size: 0.85rem;
    color: var(--muted);
  }
</style>
