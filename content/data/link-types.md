---
title: "Link types"
updated: 2026-11-23
description: "The kinds of link between two works: citation, review, the pull notices (retraction, withdrawal, removal) and the part-of kinds (volume, component, data series, part); what counts as a review or a pull notice, how each type maps to Crossref, DataCite, NISO, COPE, Retraction Watch, PubMed, Wikidata and other vocabularies, and how to list a work's reviews, notices or parts."
tags: ["reference"]
entity:
  example: "link-types/review"
  api: "link-types"
  linksTo:
    - "works"
    - "links"
---
A **link type** is the kind of [link](/data/links/) between two [works](/data/works/): a citation, a review, a pull notice (a notice that retracts, withdraws or removes another work), or a part-of link (a chapter in a book, a figure of a paper, one record of a data series). There are nine: `citation`, `review`, the three pull notices and the four part-of kinds. A work lists its pull notices in [`pull_notice_works`](/data/works/attributes/#pull_notice_works) and its parents in [`parent_works`](/data/works/attributes/#parent_works). A link type's OpenAlex ID looks like `https://openalex.org/link-types/review`; list all nine at [`api.openalex.org/link-types`](https://api.openalex.org/link-types), and list a work's links at [`/links`](/data/links/).

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

### Pull notices: retraction, withdrawal and removal

A [pulled work](/data/works/pulled/) says that it was retracted, withdrawn or removed, but not why; the notice that pulled it usually does. The notice is often its own work in OpenAlex, and a pull notice link joins the two.

A **pull notice** is a work that retracts, withdraws or removes another work. The link runs from the notice to the work it pulls, the way a citing work points at the work it cites: `origin` is the notice, `target` is the pulled work, and the pulled work lists its notices in [`pull_notice_works`](/data/works/attributes/#pull_notice_works). For example, The Lancet's 2010 retraction notice [W4245876183](https://api.openalex.org/works/W4245876183) is the `origin` of a `retraction` link to Wakefield's 1998 MMR paper [W2117847125](https://api.openalex.org/works/W2117847125). One notice can pull many works, and one work can have several notices.

There are three kinds. Crossref names all three as update types but defines none of them, so the definitions are ours. Each reads from the notice, the work that holds the link:

- **`retraction`**: The work is a notice that another work should no longer be relied on. The work it retracts usually stays online, marked as retracted.
- **`withdrawal`**: The work is a notice that another work was withdrawn, usually soon after it appeared and for a publishing reason such as a duplicate or an editorial error. Its content may be gone.
- **`removal`**: The work is a notice that another work's content was taken down, usually for legal or safety reasons, while its record stays.

When a source doesn't say which kind a notice is, the link is a `retraction`, because that is what the source calls it: PubMed and Retraction Watch's database file all three kinds as retractions. So a link is a `withdrawal` or a `removal` only where a Crossref record says so, and nearly all pull notice links are retractions.

Where pull notice links come from:

- **Crossref.** A notice's record names the work it updates (`update-to`) and says which kind of update it is: `retraction`, `withdrawal` or `removal`. These come from publishers' own deposits and from Retraction Watch's data, which Crossref carries.
- **PubMed.** A retraction notice paired with the article it retracts.
- **Retraction Watch.** A notice's DOI paired with the DOI of the paper it retracts.

A link needs two works and a real notice. Both ends must be works in OpenAlex, and the origin must be a notice by its type or its title, not a correction that happens to name the work. Versions of one Cochrane review are versions, not pulls, so a new version that withdraws an old one makes no link. When the publisher marks the paper itself instead of publishing a separate notice, there is no link, since a link joins two different works; the paper is still pulled.

A link records what its source declared, while [`is_pulled`](/data/works/attributes/#is_pulled) is our rule. So a few works have a pull notice and are not pulled: a retract-and-replace, for one, where the corrected version stands. How many works have a notice, and why the rest don't: [Pulled works › Pull notices](/data/works/pulled/#pull-notices).

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

A link type is a noun that names the link itself, not one end of it, so it reads the same from either work: `citation`, `review`, `retraction`, `volume`. Its definition reads from the work that carries the link ("The work is ..."). Link vocabularies name the same links with verbs, such as Dublin Core's `isPartOf` or Crossref's `isReviewOf`; each link type lists those terms in [`standard_terms`](#standard_terms). A standard term can be broader than ours: all four part-of kinds are `isPartOf`. Each term's `match` says how close it is.

"Link type" is the name HTML, the IANA link relations registry and JATS (`@link-type`) use for this idea. Scholarly metadata standards often say "relation type" (DataCite, Crossref, Scholix), but "relationship" also names the parent, child and related links between [institutions](/data/institutions/#associated_institutions), so we use one word for one thing.

### Why `review`, and how it maps

Before naming it we read 24 vocabularies that describe reviews. Every one that has a link from a review to the work it reviews calls it a review, and points the same way: from the review to the work reviewed. None calls the link "peer review", "evaluation" or "assessment". "Peer review" names a kind of work or a process, and would leave out book reviews; "evaluation" is the wider idea, so it is in our definition.

| Vocabulary | Term | Fit |
|---|---|---|
| Crossref | [`isReviewOf`](https://www.crossref.org/documentation/schema-library/markup-guide-metadata-segments/relationships/) (inverse `hasReview`) | Same link (exact) |
| DataCite | [`Reviews`](https://datacite-metadata-schema.readthedocs.io/en/4.7/appendices/appendix-1/relationType/#reviews) (inverse `IsReviewedBy`) | Same link (exact) |
| Wikidata | [P6977 "review of"](https://www.wikidata.org/wiki/Property:P6977) | Same link (exact) |
| Library of Congress (BIBFRAME) | [`reviewof` "review of"](http://id.loc.gov/vocabulary/relationship/reviewof) | Same link (exact) |
| RDA, BIBO | [`is review of work`](http://rdaregistry.info/Elements/w/P10178), [`reviewOf`](http://purl.org/ontology/bibo/reviewOf) | Same link (not listed in `standard_terms`) |
| schema.org | [`itemReviewed`](https://schema.org/itemReviewed) | Broad: any item, including products and ratings |
| CiTO | [`reviews`](http://purl.org/spar/cito/reviews) | Broad: it types a citation, so a literature review may "review" every paper it cites |
| JATS4R peer review materials (NISO RP-39) | `reviewer-report`, `editor-report` article types, pointing at the `peer-reviewed-article` | Kinds of review document, not a link term |
| PubMed, Web of Science, Scopus | "Review" means a literature review article; "Book Review" is a work type | No review link |
| NISO Z39.106 (peer review terminology), COPE | Terms for how peer review is run | No review link |

So `standard_terms` for `review` lists Crossref, DataCite, Wikidata and the Library of Congress first, each `exact`, then schema.org and CiTO, each `broad`.

### Why "pull notice", and how the three map

No vocabulary we read has one word for all three kinds of notice, so we use our own. MeSH, FaBiO and Wikidata say "retraction notice" and stretch it to cover withdrawals. But OpenAlex already uses "retracted" for [`is_retracted`](/data/works/attributes/#is_retracted), a narrower flag than pulled, so "retraction notice" would mean two different things here. "Pull" already names all three kinds together: [`is_pulled`](/data/works/attributes/#is_pulled), and "Pulled" on the website.

The values themselves are Crossref's names, and the sources we read don't agree on what they mean. We read the standards publishers follow (Crossref, NISO, COPE, ICMJE, JATS), the indexes that track pulled papers (Retraction Watch, PubMed, Web of Science, Scopus, Europe PMC) and the linked-data vocabularies (CiTO, FaBiO, MeSH, Wikidata, DataCite). "Withdrawal" changes meaning from place to place: at Elsevier it is an article in press taken down for an error or a duplicate, while on a preprint server such as arXiv it does the work of a retraction. For NISO and COPE, a removal is a retraction whose content is also taken down. Our definitions draw on the sources that keep the kinds apart: COPE and NISO for retraction and removal, Elsevier for withdrawal.

The table maps each kind onto every vocabulary's terms. The word after each term is its [`match`](#standard_terms), how close it is to ours, using the [SKOS mapping levels](https://www.w3.org/TR/skos-reference/#mapping): *exact* (the same link), *close* (the same idea said another way, such as the inverse link or the notice's own type), *broad* (theirs also covers more), *narrow* (theirs covers only part of ours) and *related* (something else that bears on it, such as a status or a date).

| Vocabulary | `retraction` | `withdrawal` | `removal` |
|---|---|---|---|
| [Crossref](https://www.crossref.org/documentation/crossmark/participating-in-crossmark/) update types | `retraction` (exact) | `withdrawal` (exact) | `removal` (exact) |
| [CiTO](http://purl.org/spar/cito/retracts) | `retracts` (exact) | `retracts` (broad) | `retracts` (broad) |
| [JATS 1.4](https://jats.nlm.nih.gov/archiving/tag-library/1.4/attribute/related-article-type.html) `related-article-type` | `retracted-article` (exact) | none | none |
| [NISO CREC](https://www.niso.org/publications/rp-45-2024-crec) (RP-45-2024) | retraction (close) | not defined | removal (close) |
| [COPE retraction guidelines](https://publicationethics.org/guidance/guideline/retraction-guidelines) (2025) | retraction (close) | not used | retraction with removal (close) |
| [ICMJE](https://www.icmje.org/recommendations/browse/publishing-and-editorial-issues/corrections-and-version-control.html) | retraction (close) | not used | not used |
| [Elsevier policy](https://www.elsevier.com/about/policies-and-standards/article-withdrawal) | article retraction (close) | article withdrawal (narrow: articles in press only) | article removal (close) |
| [Retraction Watch](https://retractionwatch.com/retraction-watch-database-user-guide/) | Retraction (broad) | Retraction (broad) | Retraction with the reason [Removed](https://retractionwatch.com/retraction-watch-database-user-guide/retraction-watch-database-user-guide-appendix-b-reasons/) (close) |
| [PubMed](https://www.nlm.nih.gov/bsd/policy/errata.html) | `RetractionOf` (broad) | `RetractionOf` (broad) | `RetractionOf` (broad) |
| [Web of Science](https://webofscience.help.clarivate.com/en-us/Content/document-types.html) document types | Retraction (close) | Item Withdrawal (close) | none |
| [Scopus](https://supportcontent.elsevier.com/Support%20Hub/Scopus/Scopus_ContentCoverage_Guide_WEB.pdf) | Erratum, the notice's type (broad) | none | none |
| [Europe PMC](https://europepmc.org/AboutArticleStatusMonitor) | Retraction of (broad) | `preprint-withdrawal` (narrow) | `preprint-removal` (narrow) |
| [Wikidata](https://www.wikidata.org/wiki/Property:P5824) | P5824 "retracted by", read from the paper (close) | P5824 (broad) | none |
| [FaBiO](http://purl.org/spar/fabio/RetractionNotice), [MeSH](http://id.nlm.nih.gov/mesh/D016440) | `RetractionNotice`, Retraction Notice (broad) | the same (broad) | the same (broad) |
| [DataCite](https://support.datacite.org/docs/tombstone-pages) | none | date type [`Withdrawn`](https://datacite-metadata-schema.readthedocs.io/en/4.7/appendices/appendix-1/dateType/#withdrawn) (related) | tombstone page (related) |
| schema.org, BIBO, COAR, Scholix, OpenAIRE | none | none | none |

Crossref alone matches all three kinds exactly. The indexes and ontologies mostly fold the three into retraction, so their terms are broad. Terms that name the notice rather than the link, such as Web of Science's document types, are close, and so is Wikidata's P5824, the same link read from the pulled paper. Each link type's [`standard_terms`](#standard_terms) lists its terms from this table with their `match`, so the crosswalk is in the data too.

### Why three, and not one or more

Three is the fewest kinds that keeps what publishers say, and no other kind of notice pulls a work.

**Not one.** Most indexes fold everything into retraction, as Retraction Watch, PubMed and Scopus do. But the three tell a reader different things: don't rely on this work; a publishing slip, so another copy may be fine; or taken down, often for legal reasons, though the science may stand. Where the record says which kind (a publisher's Crossref deposit, an Elsevier notice, a Web of Science document type since 2021), folding the three into one would lose that for good. Anyone can fold three kinds into one; nobody can split one back into three.

**Not more.** We looked at five other kinds of notice, and none is a fourth kind of pull:

- **Partial retraction.** COPE and NISO advise against it, and Retraction Watch, PubMed and Scopus file it as a correction. The work stands.
- **Expression of concern.** It warns readers while the publisher looks into a work, and the work stands.
- **Retract and replace.** It is a retraction plus a link to the corrected version. That second link, a replacement (DataCite's [`IsObsoletedBy`](https://datacite-metadata-schema.readthedocs.io/en/4.7/appendices/appendix-1/relationType/#isobsoletedby), Dublin Core's [`isReplacedBy`](http://purl.org/dc/terms/isReplacedBy)), would be a link type of its own, later.
- **Temporary removal.** It is a removal.
- **Reinstatement.** It reverses a pull. Among the systems we read, only Retraction Watch and The Lens record it, and none of the standards has a term for it. It too would be a link type of its own, later, not a pull notice.

## Values

| ID | Display name | Definition |
|----|--------------|------------|
| `citation` | Citation | The work cites another work: that work is in its reference list. |
| `review` | Review | The work reviews another work: an evaluation of that specific work by someone other than its authors, such as a peer review, preprint review or book review (a literature review article is the work type review, not this link). |
| `retraction` | Retraction | The work is a notice that another work should no longer be relied on. The work it retracts usually stays online, marked as retracted. |
| `withdrawal` | Withdrawal | The work is a notice that another work was withdrawn, usually soon after it appeared and for a publishing reason such as a duplicate or an editorial error. Its content may be gone. |
| `removal` | Removal | The work is a notice that another work's content was taken down, usually for legal or safety reasons, while its record stays. |
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
*String.* What the link type means, in a sentence or two (the definitions in [Values](#values)).

### `standard_terms`
*List of objects.* Terms for the same link, or a related idea, in standard vocabularies and indexes, so you can map OpenAlex link types to linked data and to other systems. Some name the inverse link, a kind of notice or a status rather than the same link; `match` says which. Each object has:

- `vocabulary`: the vocabulary's name: `Dublin Core`, `schema.org`, `DataCite`, `Crossref`, `DCAT`, `CiTO`, `Wikidata`, `LC Relationship`, `JATS`, `NISO CREC`, `COPE`, `ICMJE`, `Elsevier`, `Web of Science`, `Retraction Watch`, `PubMed`, `Scopus`, `Europe PMC`, `FaBiO` or `MeSH`.
- `term`: the term as that vocabulary spells it, e.g. `isReviewOf`.
- `url`: where that vocabulary defines the term.
- `match`: how close their term is to ours, as a [SKOS mapping level](https://www.w3.org/TR/skos-reference/#mapping). A term with `match: broad` reads "our link type `skos:broadMatch` their term".
  - `exact`: the same link.
  - `close`: the same idea said another way, such as the inverse link or the notice's own type.
  - `broad`: their term also covers more than ours.
  - `narrow`: their term covers only part of ours.
  - `related`: something else that bears on it, such as a status or a date.

For example, `review`:

```json
"standard_terms": [
  {"vocabulary": "Crossref", "term": "isReviewOf", "url": "https://www.crossref.org/documentation/schema-library/markup-guide-metadata-segments/relationships/", "match": "exact"},
  {"vocabulary": "DataCite", "term": "Reviews", "url": "https://datacite-metadata-schema.readthedocs.io/en/4.7/appendices/appendix-1/relationType/#reviews", "match": "exact"},
  {"vocabulary": "Wikidata", "term": "P6977", "url": "https://www.wikidata.org/wiki/Property:P6977", "match": "exact"},
  {"vocabulary": "LC Relationship", "term": "reviewof", "url": "http://id.loc.gov/vocabulary/relationship/reviewof", "match": "exact"},
  {"vocabulary": "schema.org", "term": "itemReviewed", "url": "https://schema.org/itemReviewed", "match": "broad"},
  {"vocabulary": "CiTO", "term": "reviews", "url": "http://purl.org/spar/cito/reviews", "match": "broad"}
]
```

For `review`, Crossref's, DataCite's, Wikidata's and the Library of Congress's terms are `exact`, and schema.org's and CiTO's are `broad` ([why](#why-review-and-how-it-maps)). `citation` lists schema.org's `citation`, DataCite's `References` and `Cites`, Crossref's `references` and [CiTO](http://purl.org/spar/cito/cites)'s `cites`, all `exact`, and Dublin Core's `references` as `broad`, since it covers anything a work points to. The part-of kinds list `isPartOf` from Dublin Core, schema.org, DataCite and Crossref, each `broad`, since it doesn't say which kind of part. `volume` lists DataCite's `IsPublishedIn` in place of its `IsPartOf`, as `close` (a chapter is published inside its book but stands on its own), and `data-series` also lists DCAT's [`inSeries`](https://www.w3.org/ns/dcat#inSeries) as `exact`. The three pull notices list the terms in [their crosswalk table](#why-pull-notice-and-how-the-three-map), with the levels shown there.

### `works_count`
*Integer.* How many works carry this kind of link: works with at least one matched reference for `citation`, works that review another work for `review`, the notices of that kind for `retraction`, `withdrawal` and `removal` (the notices, not the works they pull), and works with a parent of that kind for the part-of kinds. See [Common attributes](/data/common-attributes/#works_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for the works that carry this kind of link (`filter=has_references:true` for `citation`, `filter=parent_works.link_type:<ID>` for the part-of kinds). Null for `review`, `retraction`, `withdrawal` and `removal`: no works filter picks out the reviews or the notices themselves. Use `/links` to list a work's reviews or notices, `reviewed_by_count:>0` for the works that have reviews, and `pull_notice_works.link_type:<ID>` for the works that a kind of notice pulls.

### `created_date`
*String.* When the link type was added to OpenAlex (`YYYY-MM-DDTHH:MM:SS`, an ISO 8601 date and time). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* When the record last changed. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Link types endpoint is at [`api.openalex.org/link-types`](https://api.openalex.org/link-types). Fetch one by ID, [`/link-types/review`](https://api.openalex.org/link-types/review), or list all nine. To list the links themselves, use [`/links`](/data/links/).

```
# The reviews of one work
https://api.openalex.org/links?filter=target:W2045435533,link_type:review

# The works one review reviews
https://api.openalex.org/links?filter=origin:W4233084407,link_type:review

# Works that have at least one review, most reviewed first
https://api.openalex.org/works?filter=reviewed_by_count:>0&sort=reviewed_by_count:desc

# The notice that retracted a work
https://api.openalex.org/links?filter=target:W2117847125,link_type:retraction

# The works one notice pulls
https://api.openalex.org/works?filter=pull_notice_works.id:W4245876183

# Works with a withdrawal notice in OpenAlex
https://api.openalex.org/works?filter=pull_notice_works.link_type:withdrawal

# The parts of one book
https://api.openalex.org/works?filter=parent_works.id:W3109397498

# That book and everything under it, at any depth
https://api.openalex.org/works?filter=lineage:W3109397498

# Works that are part of another work, by kind of link
https://api.openalex.org/works?filter=has_parent_work:true&group_by=parent_works.link_type

# Books with more than 100 parts
https://api.openalex.org/works?filter=type:book,child_works_count:>100
```

`parent_works.id`, `pull_notice_works.id` and `lineage` take a work ID, short (`W3109397498`) or full. `parent_works.link_type` and `pull_notice_works.link_type` take the short value (`volume`, `retraction`). A `pull_notice_works.link_type` or `pull_notice_works.id` filter asks about pulled works, so it brings them back, as if you had added `include_pulled=true` ([Pulled works](/data/works/pulled/#left-out-by-default)). See [Filtering](/api/filtering/) for the syntax and the [endpoints index](/api/endpoints/) for every endpoint.

`child_works_count` counts parts in both [corpora](/data/works/corpus/), but works lists show the core corpus unless you ask for more. The parts of an expansion work (most Zenodo and repository records are expansion works) are usually expansion works too, so add `corpus=all` to list them: [`/works?filter=parent_works.id:W6931481510&corpus=all`](https://api.openalex.org/works?filter=parent_works.id:W6931481510&corpus=all) lists the 8 chapters of an IPBES report on Zenodo; without `corpus=all` it lists none.
