---
title: "Where do works in OpenAlex come from?"
description: "Works are scholarly documents like journal articles, conference papers, books and book chapters, datasets, and theses."
tags: ["data"]
source_id: "24347019383191"
source_url: "https://help.openalex.org/hc/en-us/articles/24347019383191-Where-do-works-in-OpenAlex-come-from"
source_updated: "2025-01-09"
---
Works are scholarly documents like journal articles, conference papers, books and book chapters, datasets, and theses.

OpenAlex indexes over 240M works, with tens of thousands added daily.

### **How we got our works**

OpenAlex aggregates and builds upon data from a variety of different sources. One of the most important sources is the [Microsoft Academic Graph (MAG)](https://en.wikipedia.org/wiki/Microsoft_Academic), which was a project by Microsoft Research to catalog all of the scholarly literature on the internet. When Microsoft discontinued the project in 2021, they released their final open dataset, and OpenAlex took these hundreds of millions of works along with the other data and continued building upon it.

Our other main source of data for works is [Crossref](https://www.crossref.org/), an open scholarly data aggregator and DOI registration agency with data on 150 million works. We combine data from many different open sources, like Crossref, MAG, DataCite, HAL, PubMed, Institutional Repositories, and more to get the full set of works that are the core of OpenAlex.

### **How we add new works**

We get information about scholarly works as _records_. A record can take several forms. It may be an item of Crossref metadata; an entry from a repository like [arXiv](https://arxiv.org/), [Pubmed](https://pubmed.ncbi.nlm.nih.gov/), or an institutional repository; or publicly available information on the internet. A record contains information about a work, so our first task whenever we get a new record is to determine if the work already exists in our system. If we are able to link it to an existing work—using a [DOI](https://en.wikipedia.org/wiki/Digital_object_identifier) or other metadata matching technique—then we use the information in the record to enrich that work.

If we do not match a record to an existing work, this means that the record represents a "new" work—one which is not yet known to OpenAlex. We then make a decision to either create a new work based on the record, or to set it aside for now, possibly using the record to enrich the data of a work we add later. There are a number of factors that determine whether or not a new work is created, although there are some general rules: for example, almost all records from Crossref and a few other sources (PubMed, arXiv, several other repositories) are eligible to be turned into new works.
