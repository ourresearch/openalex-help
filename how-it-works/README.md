# How it works



<figure><img src="../.gitbook/assets/openalex-overview-diagram.png" alt=""><figcaption></figcaption></figure>

OpenAlex is more than just a catalog of research publications. We do the work of _disambiguating_ and _connecting_ scholarly works, authors, institutions, sources, and other entities. We then offer the data and analytics on top of it in three different channels, depending on your needs:

* [**OpenAlex Web**](https://openalex.org) — Our friendly web user interface
* [**OpenAlex API**](../api-and-data-snapshot.md) — A fast, modern REST API to get the data programmatically
* [**Data Snapshot**](https://docs.openalex.org/download-all-data/openalex-snapshot) — A periodic snapshot of the data, available to download in its entirety, for free

## Data overview

At the heart of OpenAlex is our dataset—a catalog of [works](works.md). A work is any sort of scholarly output. A research article is one kind of work, but there are others such as datasets, books, and dissertations. We keep track of these works—their titles (and abstracts and full text in many cases), when they were created, etc. But that's not all we do. We also keep track of the _connections_ between these works, finding associations through things like [journals](sources.md), [authors](authors.md), [institutional affiliations](institutions.md), citations, [topics](topics.md), and [funders](funders.md). There are hundreds of millions of works out there, and tens of thousands more being created every day, so it's important that we have these relationships to help us make sense of research at a large scale.

### Our data sources

OpenAlex aggregates and standardizes data from a whole bunch of other great projects, like a river fed by many tributaries. Our two most important data sources are [MAG](https://aka.ms/msracad) and [Crossref.](https://www.crossref.org/) Other key sources include:

* [ORCID](https://orcid.org/)
* [ROR](https://ror.org/)
* [DOAJ](https://doaj.org/)
* [Unpaywall](https://unpaywall.org/)
* [Pubmed](https://pubmed.ncbi.nlm.nih.gov/)
* [Pubmed Central](https://www.ncbi.nlm.nih.gov/pmc/)
* [The ISSN International Centre](https://www.issn.org/)
* [Internet Archive](https://archive.org/details/GeneralIndex)
* Web crawls
* Subject-area and institutional repositories from [arXiv](https://arxiv.org/) to [Zenodo](https://zenodo.org/) and many in between

## Learn more about the OpenAlex entities:

* [Works](works.md): Scholarly documents like journal articles, books, datasets, and theses
* [Authors](authors.md): People who create works
* [Sources](sources.md): Where works are hosted (such as journals, conferences, and repositories)
* [Institutions](institutions.md): Universities and other organizations to which authors claim affiliations
* [Concepts](concepts.md): Topics assigned to works
* [Publishers](publishers.md): Companies and organizations that distribute works
* [Funders](funders.md): Organizations that fund research
* [Geo](geo.md): Where things are in the world

