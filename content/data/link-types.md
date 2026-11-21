---
title: "Link types"
updated: 2026-11-21
description: "The kinds of link between two works: citation, review, and the part-of kinds (volume, component, data series, part); what counts as a review, how each type maps to Crossref, DataCite, Wikidata and other vocabularies, and how to list a work's reviews or parts."
tags: ["reference"]
entity:
  example: "link-types/review"
  api: "link-types"
  linksTo:
    - "works"
    - "links"
---
A **link type** is the kind of [link](/data/links/) between two [works](/data/works/): a citation, a review, or a part-of link (a chapter in a book, a figure of a paper, one record of a data series). There are six: `citation`, `review`, and four part-of kinds, one on each entry in a work's [`parent_works`](/data/works/attributes/#parent_works). A link type's OpenAlex ID looks like `https://openalex.org/link-types/review`; list all six at [`api.openalex.org/link-types`](https://api.openalex.org/link-types), and list a work's links at [`/links`](/data/links/).

**Renamed from "relationships".** Until Monday 7 December 2026 this vocabulary is also served under its old name: the `/relationships` endpoint, the `relationship` field on `/links` and on `parent_works`, and the `relationship` and `parent_works.relationship` filters. On 7 December the old fields stop being returned (the old filter names are read until 1 March 2027). The new names work in the API now; the snapshot switches on 7 December. The full list of what changes: [Deprecations › relationships renamed link types](/api/deprecations/#relationships-renamed-link-types).

## About

### Reviews

A review is a work that evaluates one specific other work: a referee report, an editor's report, a recommendation by an expert (Faculty Opinions), a community review of a preprint, a review of a book. The review is its own work in OpenAlex, usually typed [`peer-review`](/data/work-types/) or `book-review`, and a `review` link joins it to the work it reviews: `origin` is the review, `target` is the work reviewed. One review can review several works (a review of three books links to each), and one work can have many reviews. Each work's [`reviewed_by_count`](/data/works/attributes/#reviewed_by_count) counts the works that review it.

What counts as a review: an evaluation of a specific work, by someone other than its authors, published as its own record with a stable address, and declared a review by its source or its author. In: referee and editor reports, assessments, expert recommendations, community reviews, post-publication audits, reviews written by AI agents. Out: the authors' replies to their reviewers, editorial decision notices with no evaluation, and automated screens or checklists their own source says are not reviews. A literature review article is not this link: it is the work type `review`.

Where review links come from:

- **Crossref.** A peer review record declares the work it reviews (`isReviewOf`), or a work declares its reviews (`hasReview`); both say the same link, so we keep one. We read the review's own record to decide what it is: author replies (Crossref's `author-comment`) and manuscripts are left out. A review that shares an author with the work it reviews is left out too, unless the shared author is a software agent (two works signed by the same AI system are not the same people). About 1.16 million links, from publishers such as Wiley, the Royal Society of Chemistry, Copernicus, eLife, PeerJ and Qeios, and from Faculty Opinions.
- **Book reviews.** Few book reviews name their book in a form a machine can follow, so we match each review to the book its title or opening citation names (title, ISBN, author), with a check of 99% precision. About 1.53 million links. About a third of OpenAlex's book reviews are linked so far.

Crossref asks that a reviewed work have a Crossref DOI, so reviews of preprints on arXiv or Zenodo are usually deposited with DataCite (`Reviews`) instead. Those, and reviews that have no DOI at all but a stable page (OpenReview, alphaXiv), come next.

A review link says a review exists. It is not a seal of quality: a work with one review isn't better than a work with none, and some publishers mint one DOI per report per version, so counts partly measure publishers' habits.

### Parent and child works

Some works are pieces of other works. A book chapter is part of its book, a figure with its own DOI is part of its paper, a data file is part of its dataset. In OpenAlex each of these is a work, and the piece names the whole in its `parent_works`. We call the piece a child work and the whole a parent work.

Three attributes on every work carry this:

- [`parent_works`](/data/works/attributes/#parent_works): the works it is part of, each with its link type.
- [`lineage`](/data/works/attributes/#lineage): the work itself, then every ancestor, nearest first.
- [`child_works_count`](/data/works/attributes/#child_works_count): how many works name it as a parent.

Only part-of links make a parent. Versions of one work (a preprint and its article) are merged into one work. Citations and reviews are links too, but not parents. A dataset behind a paper is its own work, not the paper's child.

A work can have more than one parent, and a parent can have a parent (a chapter in a book in a book series). There are no loops.

### Which child works show by default

A traditional scholarly work (an article, a chapter, a proceedings paper) shows in search and lists whether or not it has a parent. A child that is not a traditional work (front matter, an encyclopedia entry, a figure, a data file) is left out of the default view: you reach it through its parent. The rule is `has_parent_work:true` and `is_traditional:false`, nothing else. Add `include_parts=true` to a works query, or filter on a parent, to see them. Details: [Expansion corpus › Pieces of other works](/data/works/corpus/#pieces-of-other-works-are-left-out-too).

### Where part-of links come from

Most links come from what the records themselves say; a few we build:

- **Books.** A chapter, section or reference entry gets its book when the two Crossref records agree on an ISBN, or the chapter's DOI extends the book's.
- **DataCite.** A record gets a parent when it declares `IsPartOf` another DOI and that DOI is also a work.
- **Figures, tables and files.** A record Crossref types as a component gets its paper when its DOI extends the paper's: [`10.1371/journal.pmed.1000097.g001`](https://api.openalex.org/works/doi:10.1371/journal.pmed.1000097.g001) is part of `10.1371/journal.pmed.1000097`. Most of these records carry no title, so we write one from the kind, the number and the paper ("Figure 1 of ..."), and they take their paper's open access status. Any authors they list keep their names but are not linked to author profiles.
- **Supplements named after their paper.** A record titled "Additional file 1 of" a paper's title gets that paper, when exactly one work has that title.
- **Data series we build.** Some sources publish a long run of records without naming the series. For the Large Helical Device, a fusion experiment at the National Institute for Fusion Science, we made one parent work for each instrument's series of shot records and [one work for the whole experiment](https://api.openalex.org/works/W7233530818). These parents have no DOI.

We leave out declared links that can't be a hierarchy: a record that claims more than 10 parents, two records that each claim to be part of the other, and chains more than 10 levels deep.

### How link types are named

A link type is a noun that names the link itself, not one end of it, so it reads the same from either work: `citation`, `review`, `component`, `volume`. Its definition reads from the work that carries the link ("The work is ..."). Link vocabularies name the same links with verbs, such as Dublin Core's `isPartOf` or Crossref's `isReviewOf`; each link type lists those terms in [`standard_terms`](#standard_terms). A standard term can be broader than ours: all four part-of kinds are `isPartOf`.

"Link type" is the name HTML, the IANA link relations registry and JATS (`@link-type`) use for this idea. Scholarly metadata standards often say "relation type" (DataCite, Crossref, Scholix), but "relationship" also names the parent, child and related links between [institutions](/data/institutions/#associated_institutions), so we use one word for one thing.

### Why `review`, and how it maps

Before naming it we read 24 vocabularies that describe reviews. Every one that has a link from a review to the work it reviews calls it a review, and points the same way: from the review to the work reviewed. None calls the link "peer review", "evaluation" or "assessment". "Peer review" names a kind of work or a process, and would leave out book reviews; "evaluation" is the wider idea, so it is in our definition.

| Vocabulary | Term | Fit |
|---|---|---|
| Crossref | [`isReviewOf`](https://www.crossref.org/documentation/schema-library/markup-guide-metadata-segments/relationships/) (inverse `hasReview`) | Same link |
| DataCite | [`Reviews`](https://datacite-metadata-schema.readthedocs.io/en/4.7/appendices/appendix-1/relationType/#reviews) (inverse `IsReviewedBy`) | Same link |
| Wikidata | [P6977 "review of"](https://www.wikidata.org/wiki/Property:P6977) | Same link |
| Library of Congress (BIBFRAME) | [`reviewof` "review of"](http://id.loc.gov/vocabulary/relationship/reviewof) | Same link |
| RDA, BIBO | [`is review of work`](http://rdaregistry.info/Elements/w/P10178), [`reviewOf`](http://purl.org/ontology/bibo/reviewOf) | Same link (not listed in `standard_terms`) |
| schema.org | [`itemReviewed`](https://schema.org/itemReviewed) | Broader: any item, including products and ratings |
| CiTO | [`reviews`](http://purl.org/spar/cito/reviews) | Broader: it types a citation, so a literature review may "review" every paper it cites |
| JATS4R peer review materials (NISO RP-39) | `reviewer-report`, `editor-report` article types, pointing at the `peer-reviewed-article` | Kinds of review document, not a link term |
| PubMed, Web of Science, Scopus | "Review" means a literature review article; "Book Review" is a work type | No review link |
| NISO Z39.106 (peer review terminology), COPE | Terms for how peer review is run | No review link |

So `standard_terms` for `review` lists Crossref, DataCite, Wikidata and the Library of Congress first, then schema.org and CiTO.

## Values

| ID | Display name | Definition |
|----|--------------|------------|
| `citation` | Citation | The work cites another work: that work is in its reference list. |
| `review` | Review | The work reviews another work: an evaluation of that specific work by someone other than its authors, such as a peer review, preprint review or book review (a literature review article is the work type review, not this link). |
| `volume` | Volume | The work is in a book or proceedings volume: a chapter, entry, front matter or paper of that volume. |
| `component` | Component | The work is a piece of another work that does not stand alone: a figure, table, file or supplement. |
| `data-series` | Data series | The work is one record of a data series: datasets published separately that share an instrument and method. |
| `part` | Part | The work is declared part of another work in some other way: an article in an issue, a dataset in a collection, a component of a project. |

The live list is at [`api.openalex.org/link-types`](https://api.openalex.org/link-types).

## Attributes

The top-level fields on a **link type** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this link type, e.g. `https://openalex.org/link-types/review`. The last segment is the value you filter on.

### `display_name`
*String.* The link type's name, e.g. `Review`.

### `description`
*String.* What the link type means, in a sentence (the definitions in [Values](#values)).

### `standard_terms`
*List of objects.* The same link in standard vocabularies, so you can map OpenAlex link types to linked data. Each object has:

- `vocabulary`: the vocabulary's name: `Dublin Core`, `schema.org`, `DataCite`, `Crossref`, `DCAT`, `CiTO`, `Wikidata` or `LC Relationship`.
- `term`: the term as that vocabulary spells it, e.g. `isReviewOf`.
- `url`: where that vocabulary defines the term.

```json
"standard_terms": [
  {"vocabulary": "Crossref", "term": "isReviewOf", "url": "https://www.crossref.org/documentation/schema-library/markup-guide-metadata-segments/relationships/"},
  {"vocabulary": "DataCite", "term": "Reviews", "url": "https://datacite-metadata-schema.readthedocs.io/en/4.7/appendices/appendix-1/relationType/#reviews"},
  {"vocabulary": "Wikidata", "term": "P6977", "url": "https://www.wikidata.org/wiki/Property:P6977"},
  {"vocabulary": "LC Relationship", "term": "reviewof", "url": "http://id.loc.gov/vocabulary/relationship/reviewof"},
  {"vocabulary": "schema.org", "term": "itemReviewed", "url": "https://schema.org/itemReviewed"},
  {"vocabulary": "CiTO", "term": "reviews", "url": "http://purl.org/spar/cito/reviews"}
]
```

`citation` lists Dublin Core's `references`, schema.org's `citation`, DataCite's `References` and `Cites`, Crossref's `references` and [CiTO](http://purl.org/spar/cito/cites)'s `cites`. `volume` lists Dublin Core's and schema.org's `isPartOf`, DataCite's `IsPublishedIn` (a chapter is published inside its book but stands on its own) and Crossref's `isPartOf`; the other part-of kinds list `isPartOf` from all four, and `data-series` also DCAT's [`inSeries`](https://www.w3.org/ns/dcat#inSeries). A standard term can be broader than the link type: it says the same kind of link, not the same detail.

### `works_count`
*Integer.* How many works carry this kind of link: works with at least one matched reference for `citation`, works that review another work for `review`, works with a parent of that kind for the others. See [Common attributes](/data/common-attributes/#works_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for the works that carry this kind of link (`filter=has_references:true` for `citation`, `filter=parent_works.link_type:<ID>` for the part-of kinds). Null for `review`: no works filter picks out the reviews themselves. Use `/links` to list a work's reviews and `reviewed_by_count:>0` for the works that have reviews.

### `created_date`
*String.* When the link type was added to OpenAlex (`YYYY-MM-DDTHH:MM:SS`, an ISO 8601 date and time). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* When the record last changed. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Link types endpoint is at [`api.openalex.org/link-types`](https://api.openalex.org/link-types). Fetch one by ID, [`/link-types/review`](https://api.openalex.org/link-types/review), or list all six. To list the links themselves, use [`/links`](/data/links/).

```
# The reviews of one work
https://api.openalex.org/links?filter=target:W2045435533,link_type:review

# The works one review reviews
https://api.openalex.org/links?filter=origin:W4233084407,link_type:review

# Works that have at least one review, most reviewed first
https://api.openalex.org/works?filter=reviewed_by_count:>0&sort=reviewed_by_count:desc

# The parts of one book
https://api.openalex.org/works?filter=parent_works.id:W3109397498

# That book and everything under it, at any depth
https://api.openalex.org/works?filter=lineage:W3109397498

# Works that are part of another work, by kind of link
https://api.openalex.org/works?filter=has_parent_work:true&group_by=parent_works.link_type

# Books with more than 100 parts
https://api.openalex.org/works?filter=type:book,child_works_count:>100
```

`parent_works.id` and `lineage` take a work ID, short (`W3109397498`) or full. `parent_works.link_type` takes the short value (`volume`). See [Filtering](/api/filtering/) for the syntax and the [endpoints index](/api/endpoints/) for every endpoint.

`child_works_count` counts parts in both [corpora](/data/works/corpus/), but works lists show the core corpus unless you ask for more. The parts of an expansion work (most Zenodo and repository records are expansion works) are usually expansion works too, so add `corpus=all` to list them: [`/works?filter=parent_works.id:W6931481510&corpus=all`](https://api.openalex.org/works?filter=parent_works.id:W6931481510&corpus=all) lists the 8 chapters of an IPBES report on Zenodo; without `corpus=all` it lists none.
