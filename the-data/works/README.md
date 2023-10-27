---
description: Journal articles, books, datasets, and theses
---

# 📄 Works

## 📄 Works

Works are scholarly documents like journal articles, books, datasets, and theses.

OpenAlex indexes over 240M works, with tens of thousands added daily.

### Source

Under the work's title and publication year, you'll find the name of the work's source—its journal or repository. This is the source associated with the work's primary location, which is the first location found in the work's [list of locations.](./#locations) This is usually where the work's [version of record](https://en.wikipedia.org/wiki/Version\_of\_record) can be found.

### Authors

The people who created this work.

In the context of a work, we actually think of each author as an "authorship," which is a single author and their institutional affiliations for this work.

[Learn more about authors here.](broken-reference)

### Locations

The locations online where a work lives, often in different versions.

Locations are meant to capture the way that a work exists in different versions. So, for example, a work may have a version that has been peer-reviewed and published in a journal (the [version of record](https://en.wikipedia.org/wiki/Version\_of\_record)). This would be one of the work's locations. It may have another version available on a preprint server like [bioRxiv](https://www.biorxiv.org/)—this version having been posted before it was accepted for publication. This would be another one of the work's locations.

Below is an example of a work in OpenAlex ([https://openalex.org/W2807749226](https://openalex.org/W2807749226)) that has multiple locations with different properties. The version of record, published in a peer-reviewed journal, is listed first, and is not open-access. The second location is a university repository, where one can find an open-access copy of the published version of the work. Other locations are listed below.

<figure><img src="../../.gitbook/assets/locations_screenshot_annotate (2).png" alt=""><figcaption><p>One work can have multiple locations. These locations can differ in properties such as version and open-access status.</p></figcaption></figure>

Locations are meant to cover anywhere that a given work can be found. This can include journals, proceedings, institutional repositories, and subject-area repositories like [arXiv ](https://arxiv.org/)and [bioRxiv](https://www.biorxiv.org/). If you are only interested in a certain one of these (like journal), you can use a filter to specify the type of source.

### Identifiers

All the external identifiers that we know about for this work.

IDs are expressed as URIs whenever possible. Possible ID types:

* DOI: The [DOI](https://en.wikipedia.org/wiki/Digital\_object\_identifier).
* MAG: The [Microsoft Academic Graph](https://www.microsoft.com/en-us/research/project/microsoft-academic-graph/) ID
* OpenAlex The OpenAlex ID
* Pubmed: The [Pubmed Identifier](https://en.wikipedia.org/wiki/PubMed#PubMed\_identifier)
* Pubmed Central The [Pubmed Central identifier](https://www.ncbi.nlm.nih.gov/pmc/about/public-access-info/)

{% hint style="info" %}
Most works are missing one or more ID types (either because we don't know the ID, or because it was never assigned).
{% endhint %}
