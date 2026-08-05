---
title: "Overview"
description: "How OpenAlex builds its map of the research ecosystem: gathering records from thousands of sources, deduplicating and connecting them, and sharing the result eight different ways."
tags: ["reference"]
---
OpenAlex gathers the world's research output from thousands of sources, organizes it into one connected knowledge graph, and shares it with everyone for free. This page explains each of those three steps.

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

## Data sources

When a researcher publishes an article, book, or dataset, information about it is registered with agencies like [Crossref](https://crossref.org) and [DataCite](https://datacite.org), or deposited in institutional and national repositories. OpenAlex pulls records from these sources continuously — the database evolves hourly.

The catalog was seeded by [MAG](https://aka.ms/msracad) (the discontinued Microsoft Academic Graph). The core sources we pull from today include:

- [Crossref](https://www.crossref.org/) and [DataCite](https://datacite.org/), the DOI registration agencies
- [ORCID](https://orcid.org/) and [ROR](https://ror.org/), the open identifier systems for researchers and institutions
- [PubMed](https://pubmed.ncbi.nlm.nih.gov/) and [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/)
- [DOAJ](https://doaj.org/) and [the ISSN International Centre](https://www.issn.org/)
- [Unpaywall](https://unpaywall.org/) and the [Internet Archive](https://archive.org/details/GeneralIndex)
- Aggregators and subject repositories: HAL, arXiv, Zenodo, Dergipark, OSTI, RePEc, and many more
- Thousands of institutional repositories, from [UNC's CDR](https://cdr.lib.unc.edu/) to [Michigan's Deep Blue](https://deepblue.lib.umich.edu/documents) ([full list](https://unpaywall.org/sources))
- Parsing of 60M+ open access PDFs, journal landing pages, and direct publisher feeds
- Corrections from users through [community curation](/help/fix-errors-in-openalex/)

## Deduplicate and connect

**Matching links records to known entities.** Each incoming record gets matched against persistent-identifier systems: affiliation text to institutions in [ROR](https://ror.org/search), authors to [ORCID](https://orcid.org/) records (and to each other — see [Author disambiguation](/docs/author-disambiguation/)), journal titles to [ISSN](https://www.issn.org/). Duplicate records of the same work are merged into one. This forms the foundation of the knowledge graph: [works](/docs/works/) connected to [authors](/api/authors/), [sources](/docs/sources/), [institutions](/api/institutions/), [topics](/docs/topics/), [publishers](/api/publishers/), and [funders](/api/funders/).

**Enrichment adds the connections that make the map useful.** We link outputs to other outputs by extracting reference metadata (citations), and we run text classifiers over titles and abstracts to understand what each work is about, linking it to topics, subfields, keywords, and even SDGs — see [Aboutness](/docs/aboutness/).

This pipeline is complex and changes frequently. In the interest of openness, we share our internal monitoring dashboard publicly: [view the pipeline dashboard](http://unpaywall-metabase.herokuapp.com/public/dashboard/8e114521-b74b-4e6c-bba8-3a8fc573fb64).

## Share

The same dataset is available through eight channels, from no-code to whole-database:

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
  <a class="access-card" href="/api/">
    <span class="ac-title">CLI</span>
    <span class="ac-body">Query from your terminal and pipe the results into your own scripts. Agents love using it.</span>
  </a>
  <a class="access-card" href="/api/llm-quick-reference/">
    <span class="ac-title">Agents</span>
    <span class="ac-body">Just say "Use OpenAlex" to your agent and it'll handle the rest.</span>
  </a>
  <a class="access-card" href="/docs/snapshot/">
    <span class="ac-title">Snapshot</span>
    <span class="ac-body">Download our entire dataset for free. Updated quarterly.</span>
  </a>
  <a class="access-card" href="/docs/snapshot-updates/">
    <span class="ac-title">Sync</span>
    <span class="ac-body">Keep your database up to date with daily changes, via AWS or API.</span>
  </a>
  <a class="access-card" href="/docs/content-archive/">
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
