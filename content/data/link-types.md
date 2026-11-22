---
title: "Link types"
updated: 2026-11-23
description: "The kinds of link between two works: citation, review, translation, summary, the pull notices (retraction, withdrawal, removal) and the part-of kinds (volume, component, data series, part); what counts as a review, a translation, a summary or a pull notice, how each type maps to Crossref, DataCite, NISO, COPE, Retraction Watch, PubMed, Wikidata and other vocabularies, and how to list a work's reviews, translations, summaries, notices or parts."
tags: ["reference"]
entity:
  example: "link-types/review"
  api: "link-types"
  linksTo:
    - "works"
    - "links"
---
A **link type** is the kind of [link](/data/links/) between two [works](/data/works/): a citation, a review, a translation, a summary, a pull notice (a notice that retracts, withdraws or removes another work), or a part-of link (a chapter in a book, a figure of a paper, one record of a data series). There are eleven: `citation`, `review`, `translation`, `summary`, the three pull notices and the four part-of kinds. A work lists its pull notices in [`pull_notice_works`](/data/works/attributes/#pull_notice_works) and its parents in [`parent_works`](/data/works/attributes/#parent_works). A link type's OpenAlex ID looks like `https://openalex.org/link-types/review`; list them all at [`api.openalex.org/link-types`](https://api.openalex.org/link-types), and list a work's links at [`/links`](/data/links/).

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

### Translations

A translation is a work whose text is another work's text rendered in another language, published as its own work: an article in the English edition of a Russian journal, say. The translation is its own work in OpenAlex, with its own DOI and journal, and a `translation` link joins it to the original it translates: `origin` is the translation, `target` is the original. A translation keeps the authors its publisher lists, which are usually the original's authors, since it carries their words.

What counts as a translation: another work's text rendered in another language, published as its own record by another journal, book or publisher. Out: a condensed account of a work's content, in any language (that is a summary), translated titles or abstracts inside one record, free adaptations, and a second-language copy of an article inside the same journal or repository, which is the same work (we merge those).

Where translation links come from:

- **Publishers' declarations.** A translation's Crossref record declares its original (`isTranslationOf`), or the original declares its translation (`hasTranslation`); DataCite records do the same (`IsTranslationOf`, `HasTranslation`). Both directions say the same link, so we keep one. About 33,000 links, almost all Russian and Soviet journals and their English editions, such as *Mathematical Notes* and *Matematicheskie Zametki*, or *Physics-Uspekhi* and *Uspekhi Fizicheskikh Nauk*.
- **Translation journals.** Most English editions declare nothing, so we pair each article with its original in the journal it was translated from, by year and the whole author list. About 63,000 links from 113 English editions of Russian and Ukrainian journals (Pleiades, Springer, IOP, SIAM), checked against the declared pairs (99.7% agree); and about 32,000 from about 45 "English Edition" journals of Spanish, Portuguese, Latin American and French journals (Elsevier and others), where we also require the two titles to differ, so the same English text printed in both editions isn't called a translation. When the same authors published several articles that year, so the author list fits more than one, a language model reads the titles and picks the article that says the same thing in the other language, or none; we keep its pick only when no other article claims the same original. That adds about 19,500 links, and where the publisher does declare the link, it picked the declared original 291 times in 292. A random 100 of each kind, read by hand, were all right. The matching reruns daily, so a new article gets its link soon after both editions are in OpenAlex. Where a publisher declares a link, its declaration wins.

The direction follows the journals: the English edition is the translation, as its publisher presents it, even for the few articles whose authors wrote in English first.

### Summaries

A summary is a work that gives a condensed account of another work's content, separate from that work's own abstract: an abstracting service's abstract (ChemInform), a digest entry (Reactions Weekly), a research highlight (Nature Reviews journals, Synfacts), a Year Book entry (Elsevier's Year Books, which pair an abstract with a short editor's comment), a clinical answer (Cochrane Clinical Answers), a plain-language summary, and in future summaries written by AI agents. The summary is its own work in OpenAlex (type `other` for now), and a `summary` link joins it to the work it summarizes: `origin` is the summary, `target` is the work summarized. A summary can summarize more than one work.

Any separate condensed account counts as a summary, whether written by the original's authors or anyone else: abstracts, digests, highlights, plain-language summaries, and agent summaries. We leave out a work's own abstract or summary section (part of the work, not a separate work), a piece that mainly evaluates the work (a `review`), a piece that mainly argues its own point (a comment), a rendering of the whole work in another language (a translation), an abridged edition of the same text (the same work, merged rather than linked), and a round-up of a whole issue (not a summary of any one work).

Where summary links come from:

- **Publisher metadata.** Crossref and DataCite have no summary relation, so publishers do not declare these links.
- **Dedicated summary services.** For 89 services whose items each summarize one work published elsewhere, we take the item's single reference and keep the link when the item's own Crossref record cites that work's DOI or their titles match. That gives about 970,000 links (ChemInform about 674,000, Reactions Weekly 177,000, Nature's research highlights 33,000, Year Books 30,000), and a check of 100 random links found every one right. We link new summaries nightly.

We do not yet link items that carry no reference, Journal Watch, highlights mixed into general journals, or PubMed's patient summaries.

A summary's reference still counts as a citation, as a review's does.

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

### Why `translation`, and how it maps

Before naming it we read 26 vocabularies that describe translations. Every one that has a link from a translation to its original calls it a translation ("translation of") and points the same way: from the translation to the original. None calls the link a "version", "language version" or "edition". Libraries and Crossref treat a translation as a form of the same work; we keep a translation published by another journal as its own work, which IFLA's Library Reference Model allows for translated journals, and link the two.

| Vocabulary | Term | Fit |
|---|---|---|
| DataCite | [`IsTranslationOf`](https://datacite-metadata-schema.readthedocs.io/en/4.7/appendices/appendix-1/relationType/#istranslationof) (inverse `HasTranslation`) | Same link |
| Crossref | [`isTranslationOf`](https://www.crossref.org/documentation/schema-library/markup-guide-metadata-segments/relationships/) (inverse `hasTranslation`) | Same link |
| Wikidata | [P9745 "translation of"](https://www.wikidata.org/wiki/Property:P9745) | Same link |
| schema.org | [`translationOfWork`](https://schema.org/translationOfWork) (inverse `workTranslation`) | Same link |
| Library of Congress | [`translationof` "translation of"](http://id.loc.gov/vocabulary/relationship/translationof) | Same link |
| BIBFRAME, BIBO, FRBR core, RDA, MARC 21 field 765 | [`translationOf`](http://id.loc.gov/ontologies/bibframe/translationOf), [`translationOf`](http://purl.org/ontology/bibo/translationOf), [`translationOf`](http://purl.org/vocab/frbr/core#translationOf), [`is translation of`](http://rdaregistry.info/Elements/e/P20141), [Original Language Entry](https://www.loc.gov/marc/bibliographic/bd765.html) | Same link (not listed in `standard_terms`) |
| Wikidata | [P629 "edition or translation of"](https://www.wikidata.org/wiki/Property:P629) | Broader: also editions (it is what most scholarly items on Wikidata use) |
| Dublin Core | [`isVersionOf`](http://purl.org/dc/terms/isVersionOf) | Broader: any version, edition or adaptation |
| ORCID, MODS, IANA link relations | `version-of`, `otherVersion`, `alternate` | Broader and two-way; not listed |
| PubMed, Web of Science, Scopus | Translated titles and "English Abstract" | No translation link |

So `standard_terms` for `translation` lists DataCite, Crossref, Wikidata, schema.org and the Library of Congress first, then Wikidata's P629 and Dublin Core's `isVersionOf`.

The line between a translation and a summary: a translation renders a work's text in another language; a condensed account of its content, in any language, is a summary; an abridged edition of the same text is the same work.

### Why `summary`, and how it maps

Before naming it we read 20 vocabularies. The three vocabularies with a general link from a summary to the work it summarizes all call it a summary and point from the summary to the work summarized; library standards list abstract and digest as kinds of summary or beside it. We did not use `abstract`, `digest`, or `abridgement`: `abstract` is narrower in RDA and reads as a work's own abstract field; `digest` means a systematic condensing, which RDA files under derivation; and `abridgement` is the same work in FRBR.

| Vocabulary | Term | Fit |
|---|---|---|
| Library of Congress (BIBFRAME) | [`summaryof` "summary of"](http://id.loc.gov/vocabulary/relationship/summaryof) | Same link |
| RDA | ["is summary of"](http://rdaregistry.info/Elements/w/P10179) | Same link |
| FRBR (RDF) | [`summarizationOf`](http://purl.org/vocab/frbr/core#summarizationOf) | Same link |
| PubMed | [`OriginalReportIn`](https://dtd.nlm.nih.gov/ncbi/pubmed/out/pubmed_250101.dtd) (inverse `SummaryForPatientsIn`) | Narrower: patient summaries only |
| Crossref, DataCite | [`isDerivedFrom`](https://www.crossref.org/documentation/schema-library/markup-guide-metadata-segments/relationships/), [`IsDerivedFrom`](https://datacite-metadata-schema.readthedocs.io/en/4.7/appendices/appendix-1/relationType/#isderivedfrom) | Broader: any derivation; neither has a summary relation |
| CiTO | [`containsAssertionFrom`](http://purl.org/spar/cito/containsAssertionFrom) | Broader: any citation that carries an assertion; its note names separate abstracts and summaries |
| schema.org | [`isBasedOn`](https://schema.org/isBasedOn) | Broader: any work derived from or adapted from another |
| Wikidata | [P144 "based on"](https://www.wikidata.org/wiki/Property:P144) | Broader: any work based on another |

So `standard_terms` for `summary` lists the Library of Congress, RDA, and FRBR first, then PubMed, then Crossref, DataCite, CiTO, schema.org, and Wikidata.

## Values

| ID | Display name | Definition |
|----|--------------|------------|
| `citation` | Citation | The work cites another work: that work is in its reference list. |
| `review` | Review | The work reviews another work: an evaluation of that specific work by someone other than its authors, such as a peer review, preprint review or book review (a literature review article is the work type review, not this link). |
| `translation` | Translation | The work is a translation of another work: that work's text rendered in another language, published as its own work (such as an article in an English edition of a Russian journal). A condensed account of its content, in any language, is a summary; a translated title or abstract inside one record, or a free adaptation, is neither. |
| `summary` | Summary | The work summarizes another work: it gives a condensed account of that work's content, separate from the work's own abstract, by its authors or anyone else (an abstracting service's abstract, a digest entry, a research highlight, a plain-language summary, an agent's summary). |
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

The Link types endpoint is at [`api.openalex.org/link-types`](https://api.openalex.org/link-types). Fetch one by ID, [`/link-types/review`](https://api.openalex.org/link-types/review), or list them all. To list the links themselves, use [`/links`](/data/links/).

```
# The reviews of one work
https://api.openalex.org/links?filter=target:W2045435533,link_type:review

# The works one review reviews
https://api.openalex.org/links?filter=origin:W4233084407,link_type:review

# The original of one translation (Kitaev's 1997 survey in Russian Mathematical Surveys)
https://api.openalex.org/links?filter=origin:W2159566537,link_type:translation

# The translations of one work
https://api.openalex.org/links?filter=target:W2327385060,link_type:translation

# The summaries of one paper (a ChemInform abstract of it)
https://api.openalex.org/links?filter=target:W2001923307,link_type:summary

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
