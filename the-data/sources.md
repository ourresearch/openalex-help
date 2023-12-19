---
description: Journals and repositories that host works
---

# 📚 Sources

## 📚 OpenAlex Sources

Sources are where works are hosted, such as journals, book series, conferences, and repositories. 

There are around 200 thousand different sources in OpenAlex.

Several sources may host the same work. OpenAlex reports both the primary host source (generally wherever the [version of record](https://en.wikipedia.org/wiki/Version\_of\_record) lives), and alternate host sources (like preprint repositories). For a more in-depth explanation of how OpenAlex models the relationships between works, versions, and sources, see our [technical documentation on Locations](https://docs.openalex.org/api-entities/works/work-object/location-object).

### How we get them

We've gathered our data about sources from Microsoft Academic Graph, the [Directory of Open Access Journals (DOAJ)](https://doaj.org/), Crossref, and a few other places. Adding and updating our data on sources has been a mostly ad-hoc process, but we are switching over to automated processes that will keep up to date with new sources and changes. We do not curate journals, so any journal that is available in the data sources should make its way into OpenAlex.

Whenever possible, we keep track of sources' [ISSNs](https://en.wikipedia.org/wiki/International\_Standard\_Serial\_Number), which are meant to be unique identifiers for all serial publications. Most of these sources have multiple ISSNs, so we try to use the [ISSN-L](https://en.wikipedia.org/wiki/International\_Standard\_Serial\_Number#Linking\_ISSN) as canonical ID when we can.

## Attributes of sources

### Open Access

OpenAlex can tell you whether a source is currently fully open access. This could be true for a preprint repository where everything uploaded is free to read, or for a [Gold](https://en.wikipedia.org/wiki/Open\_access#Colour\_naming\_system) or [Diamond](https://en.wikipedia.org/wiki/Diamond\_open\_access) open access journal, where all newly published Works are available for free under an open license.

We say "currently" because the status of a source can change over time. It's common for journals to "flip" to Gold OA, after which they may make only future articles open or also open their back catalogs. It's entirely possible for a source to say `is_oa: true`, but for an article from last year to require a subscription. Because of these nuances, OpenAlex keeps concept of Open Access _works_ separate from the Open Access status of _sources_.

### Article processing charge (APC)

OpenAlex has information on [Article processing charges (APC)](https://en.wikipedia.org/wiki/Article_processing_charge) for Open Access journals.

## Technical documentation

You can find more information about OpenAlex sources that host works in our [technical documentation](https://docs.openalex.org/api-entities/sources).
