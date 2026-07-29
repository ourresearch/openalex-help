---
title: "How OpenAlex works"
description: "How OpenAlex builds its map of the research ecosystem: ingesting records, matching them to known entities, and enriching them with connections."
tags: ["reference"]
source_id: "28932712154391"
source_url: "https://help.openalex.org/hc/en-us/articles/28932712154391-How-does-OpenAlex-work"
source_updated: "2025-10-21"
---
OpenAlex is a map of the world's research ecosystem: papers, people, institutions, journals, topics, and funders, linked to one another. This page covers how that map gets built and kept current.

## The pipeline

**Research outputs are the main artery of the system.** When a researcher publishes an article, book, or dataset, information about it is registered with agencies like [Crossref](https://crossref.org) and [DataCite](https://datacite.org), or deposited in institutional and national repositories like [HAL](https://hal.science/). OpenAlex pulls records from these sources continuously.

**Matching links records to known entities.** Each incoming record gets matched against persistent-identifier systems: affiliation text to institutions in [ROR](https://ror.org/search), authors to [ORCID](https://orcid.org/) records (and to each other — see [Author disambiguation](/docs/author-disambiguation/)), journal titles to [ISSN](https://www.issn.org/). This forms the foundation of the knowledge graph.

**Enrichment adds the connections that make the map useful.** We link outputs to other outputs by extracting reference metadata (citations), and we run text classifiers over titles and abstracts to understand what each work is about, linking it to topics, subfields, keywords, and even SDGs — see [Aboutness](/docs/aboutness/).

## Ingest sources

The core sources we pull records from include Crossref, DataCite, PubMed, HAL, DOAJ, ORCID, MAG, arXiv, Dergipark, OSTI, RePEc, Zenodo, the ISSN registry, university repositories such as [UNC's CDR](https://cdr.lib.unc.edu/) and [Michigan's Deep Blue](https://deepblue.lib.umich.edu/documents), thousands of other institutional repositories ([full list](https://unpaywall.org/sources)), parsing of 60M+ open access PDFs, journal landing pages, direct publisher feeds — and corrections from users through [community curation](/help/fix-errors-in-openalex/).

## Update cadence

As new works are published (or new records of old works are minted), they are matched and added continuously — the database evolves hourly. How updates reach you depends on the access channel: the [web interface](https://openalex.org) and [API](/api/) serve the live dataset, while [bulk data](/docs/downloading-openalex-data/) is released on a schedule.

## Pipeline dashboard

The ingest pipeline — getting works, finding affiliations and citations, tagging aboutness — is complex and changes frequently. In the interest of openness, we share our internal monitoring dashboard publicly: [view the pipeline dashboard](http://unpaywall-metabase.herokuapp.com/public/dashboard/8e114521-b74b-4e6c-bba8-3a8fc573fb64). We can't provide support for it, but it can be useful if you're curious how the pipeline is running.
