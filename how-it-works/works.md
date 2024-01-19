---
description: Journal articles, books, datasets, and theses
---

# 📄 Works

## OpenAlex's Works

Works are scholarly documents like journal articles, conference papers, books and book chapters, datasets, and theses.

OpenAlex indexes over 240M works, with tens of thousands added daily.

### How we got our works

OpenAlex aggregates and builds upon data from a variety of different sources. One of the most important sources is the [Microsoft Academic Graph (MAG)](https://en.wikipedia.org/wiki/Microsoft\_Academic), which was a project by Microsoft Research to catalog all of the scholarly literature on the internet. When Microsoft discontinued the project in 2021, they released their final open dataset, and OpenAlex took these hundreds of millions of works along with the other data and continued building upon it.

Our other main source of data for works is [Crossref](https://www.crossref.org/), an open scholarly data aggregator and DOI registration agency with data on 150 million works. We combine data from Crossref, MAG, and [several other sources](entities-overview.md#our-data-sources) to get the full set of works that are the core of OpenAlex.

### How we add new works

We get information about scholarly works as _records_. A record can take several forms. It may be an item of Crossref metadata; an entry from a repository like [arXiv](https://arxiv.org/), [Pubmed](https://pubmed.ncbi.nlm.nih.gov/), or an institutional repository; or publicly available information on the internet. A record contains information about a work, so our first task whenever we get a new record is to determine if the work already exists in our system. If we are able to link it to an existing work—using a [DOI](https://en.wikipedia.org/wiki/Digital\_object\_identifier) or other metadata matching technique—then we use the information in the record to enrich that work.

If we do not match a record to an existing work, this means that the record represents a "new" work—one which is not yet known to OpenAlex. We then make a decision to either create a new work based on the record, or to set it aside for now, possibly using the record to enrich the data of a work we add later. There are a number of factors that determine whether or not a new work is created, although there are some general rules: for example, almost all records from Crossref and a few other sources (PubMed, arXiv, several other repositories) are eligible to be turned into new works.

## Attributes of works

### Open Access

There are [many ways to define OA](https://peerj.com/articles/4375/#literature-review). OpenAlex uses a broad definition: having a URL where you can read the fulltext of this work without needing to pay money or log in. For each work, OpenAlex decides whether the work meets this definition using several techniques, such as looking for it in the Directory of Open Access Journals, or trying to find a publicly available PDF on the internet. If a work is Open Access, OpenAlex is able to provide you with a link to the full text of the work.

In addition to whether or not a work is Open Access, OpenAlex can tell you about the Open Access status of works, which corresponds to the following labels:

* **`gold`**: Published in an OA journal that is indexed by the [DOAJ](https://doaj.org/).
* **`green`**: Toll-access on the publisher landing page, but there is a free copy in an [OA repository](https://en.wikipedia.org/wiki/Open-access\_repository).
* **`hybrid`**: Free under an [open license](https://support.unpaywall.org/support/solutions/articles/44002063718-what-is-an-oa-license-) in a toll-access journal.
* **`bronze`**: Free to read on the publisher landing page, but without any identifiable license.
* **`closed`**: All other articles.

You can learn more about Open Access in OpenAlex in the [technical documentation](https://docs.openalex.org/api-entities/works/work-object#the-openaccess-object).

### Source

Works are associated with sources, such as journals or repositories. In many cases, a work can have multiple sources. For example, it may have been published in a journal, but another version may exist in a repository. We include these multiple versions, and we designate one with the work's [version of record](https://en.wikipedia.org/wiki/Version\_of\_record) to be the primary one. In the example above, this would be the version accepted to and published in a journal.

For a more in-depth explanation of how OpenAlex models the relationships between works, versions, and sources, see our [technical documentation on Locations](https://docs.openalex.org/api-entities/works/work-object/location-object).

### Authors and Affiliations

The authors of a work are the people who created the work. In the context of a work, we actually think of each author as an "authorship," which is a single author and the institutional affiliations they claim for the work.

[Learn more about authors here.](authors.md)

## Technical documentation

You can find more information about OpenAlex works in our [technical documentation](https://docs.openalex.org/api-entities/works).
