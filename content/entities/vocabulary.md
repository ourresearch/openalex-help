---
title: "Vocabulary entities"
description: "Consistent, controlled handles on things that already exist crisply in the real world — work types, countries, licenses, and more."
tags: ["reference"]
---
**Vocabulary** entities are a convenient, consistent vocabulary around things that already have very clear real-world existence, with no fuzziness for OpenAlex to adjudicate. We don't decide what a [country](/entities/countries/) *is*, or invent the concept of a CC-BY [license](/entities/licenses/) — we just attach a consistent handle to each one so you can filter and group by it reliably.

This is the key contrast with [native entities](/entities/native/): a native ID like an [author](/entities/authors/) ID represents a judgment call that could be wrong and can be [corrected](/entities/curations/). A vocabulary value like `article` or `US` represents no judgment call — the boundary is already crisp; we've only standardized the label. So vocabulary pages have a **Values** section (the full controlled list) rather than a curation story.

Vocabulary entities generally use short, human-readable IDs (`en` for English, `US` for the United States, `article` for a journal article) rather than the minted `W`/`A`/`S` scheme.

## The vocabulary entities

- [**Work types**](/entities/work-types/) — article, preprint, dataset, book, and the rest of a work's `type`.
- [**Source types**](/entities/source-types/) — journal, conference, repository, ebook platform, and other venue kinds.
- [**Institution types**](/entities/institution-types/) — education, healthcare, company, government, and so on.
- [**Countries**](/entities/countries/) and [**continents**](/entities/continents/) — geography, as ISO codes.
- [**Languages**](/entities/languages/) — the language of a work's metadata, as ISO 639-1 codes.
- [**Licenses**](/entities/licenses/) — the Creative Commons and other licenses a location can carry.
- [**Indexes**](/entities/indexes/) — the external indexes (DOAJ, ROR, …) a source can appear in. These are vocabulary, not native: we're not minting judgment-call IDs, just consistent handles on crisply-existing lists.

Some classification systems that *look* like vocabularies — [topics, fields, subfields, domains](/entities/aboutness/) — are grouped under [Aboutness](/entities/aboutness/) instead, because assigning them to a work involves real inference.
