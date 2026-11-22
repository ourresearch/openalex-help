---
title: "Contributor roles"
updated: 2026-11-23
description: "The role each person played on a work: the 14 CRediT roles (Conceptualization, Software, Writing – original draft, ...) and Editor. Where OpenAlex gets them, and how much of the index has them."
tags: ["reference"]
entity:
  example: "contributor-roles/software"
  api: "contributor-roles"
  linksTo:
    - "works"
    - "authorships"
---
A **contributor role** says what part a person played on a [work](/data/works/): who came up with the idea, who wrote the software, who wrote the first draft, who edited the book. OpenAlex uses the 14 roles of [CRediT](https://credit.niso.org/), the Contributor Roles Taxonomy (ANSI/NISO Z39.104-2022), plus **Editor**, and records them per person, in each [authorship](/data/authorships/)'s [`contributor_roles`](/data/authorships/#contributor_roles). Use them to see who wrote a paper's software, who curated its data, or who edited a book. Coverage: about 3 million works with CRediT roles, most of them published since 2022, and about 470,000 edited books with their editors. A contributor role's OpenAlex ID looks like `https://openalex.org/contributor-roles/software`; list all 15 at [`api.openalex.org/contributor-roles`](https://api.openalex.org/contributor-roles).

Contributor roles are a [vocabulary](/data/vocabulary/): OpenAlex records only the roles stated for each person and infers none.

## About

### Where the values come from

**Only where a role is stated for a named person; never guessed from the byline.** OpenAlex reads CRediT roles from three places:

- **Crossref deposits.** Publishers can attach CRediT roles to each author in the metadata they send Crossref. OpenAlex reads every deposit that does.
- **PubMed Central article XML.** Many publishers tag each author's CRediT roles in the article XML they send PubMed Central. OpenAlex reads them for every article in the PMC Open Access subset.
- **The article's own text.** Many articles print an "Author contributions" statement. OpenAlex reads it only when it uses CRediT's own terms ("Conceptualization, J.Z. and Y.H.; Software, Y.H.") and every name or set of initials matches exactly one author on the byline; anything ambiguous is skipped.

**Editors come from Crossref's editor lists.** When a book's Crossref record lists editors and no authors, each editor is on the book's authorships with the role `editor`. If no record names anyone on the book, its editors become its byline, in the order the publisher listed them, and are matched to author profiles like any byline (that can take a few nights for a new name). If the byline already shows them (often taken from a library or repository record), those authorships gain the role. Editors are recorded on the book itself, never copied onto each of its chapters. Editors of works that also list authors are not recorded yet.

When more than one source has CRediT roles for a work, Crossref wins, then PubMed Central, then the article's text. Each source author is matched to the work's byline by position, checked against the author's family name; an author whose family name doesn't match the name at that byline position gets no roles (fewer than 1 in 100).

OpenAlex never guesses roles from the byline, and it doesn't read statements written in free text ("J.Z. designed the study"). Roles appear as they were stated: to add or fix them, ask the publisher to deposit CRediT roles with Crossref.

### How much of the index has them

CRediT dates from 2014 and many journals print it, but few publishers send it author by author in a form machines can read, so coverage is thin and recent. At launch about 3 million works carry roles: about 900,000 from Crossref deposits and PubMed Central, and about 2.2 million more from statements in the articles' own text. Coverage grows as more publishers deposit roles. Editors: about 470,000 books whose Crossref record lists editors and no authors.

The works that gained roles at launch got a new `updated_date`, so a copy of OpenAlex kept current by `updated_date` (or the next [snapshot](/access/snapshot/)) receives them.

### What no value means

An empty `contributor_roles` list means no roles reached OpenAlex for that person, not that they had none. It does not mean "author" either: OpenAlex has no `author` role.

### Editor is not "Writing – review & editing"

`editor` means the person edited the work: chose, arranged or revised what it contains, as the editor of an edited book or a proceedings volume does. CRediT's `writing-review-editing` means reviewing or revising a draft of a paper. When you export works from openalex.org, a person with `editor` is cited as an editor (BibTeX `editor`; RIS `A3` on a book, `A2` otherwise; Web of Science `BE`).

### Roles describe people on a work, not works

Roles sit on each authorship. To see who had a role on a work, read the work's `authorships`. There is no works filter on a role by itself.

## Values

| ID | Display name | Definition |
|----|--------------|---------------------|
| `conceptualization` | Conceptualization | Ideas, formulation or evolution of overarching research goals and aims. |
| `data-curation` | Data curation | Management activities to annotate (produce metadata), scrub data and maintain research data (including software code, where it is necessary for interpreting the data itself) for initial use and later re-use. |
| `formal-analysis` | Formal analysis | Application of statistical, mathematical, computational, or other formal techniques to analyze or synthesize study data. |
| `funding-acquisition` | Funding acquisition | Acquisition of the financial support for the project leading to this publication. |
| `investigation` | Investigation | Conducting a research and investigation process, specifically performing the experiments, or data/evidence collection. |
| `methodology` | Methodology | Development or design of methodology; creation of models. |
| `project-administration` | Project administration | Management and coordination responsibility for the research activity planning and execution. |
| `resources` | Resources | Provision of study materials, reagents, materials, patients, laboratory samples, animals, instrumentation, computing resources, or other analysis tools. |
| `software` | Software | Programming, software development; designing computer programs; implementation of the computer code and supporting algorithms; testing of existing code components. |
| `supervision` | Supervision | Oversight and leadership responsibility for the research activity planning and execution, including mentorship external to the core team. |
| `validation` | Validation | Verification, whether as a part of the activity or separate, of the overall replication/reproducibility of results/experiments and other research outputs. |
| `visualization` | Visualization | Preparation, creation and/or presentation of the published work, specifically visualization/data presentation. |
| `writing-original-draft` | Writing – original draft | Preparation, creation and/or presentation of the published work, specifically writing the initial draft (including substantive translation). |
| `writing-review-editing` | Writing – review & editing | Preparation, creation and/or presentation of the published work by those from the original research group, specifically critical review, commentary or revision – including pre- or post-publication stages. |
| `editor` | Editor | Edited the work: chose, arranged or revised what it contains, as the editor of an edited book or a proceedings volume. Publishers and catalogues list editors apart from authors. Not CRediT's Writing – review & editing, which is reviewing or revising a draft. |

For the 14 CRediT roles, the IDs are the last part of each role's CRediT URL (`https://credit.niso.org/contributor-roles/software/`), and display names and definitions are CRediT's own, used under its [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license. CRediT's optional degree of contribution (lead, equal, supporting) is not recorded: almost no source carries it. `editor` is not a CRediT role: its definition is OpenAlex's, and its [`standard_terms`](#standard_terms) name the same role in Crossref, DataCite, JATS, MARC, CSL, schema.org and Wikidata.

## Attributes

The top-level fields on a **contributor role** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this role, e.g. `https://openalex.org/contributor-roles/software`.

### `display_name`
*String.* The role's name, e.g. `Software` (CRediT's name for its 14 roles).

### `description`
*String.* The role's definition (the definitions in [Values](#values); CRediT's own for its 14 roles).

### `standard_terms`
*List.* The same role in other vocabularies, each `{vocabulary, term, url}`. A CRediT role lists the slug Crossref deposits carry, the role URI JATS4R uses and the one ORCID's API takes (`http://`); `editor` lists Crossref `editor`, DataCite `Editor`, JATS `contrib-type="editor"`, MARC relators `edt` and `edc`, CSL `editor`, schema.org `editor` and Wikidata P98. For example `{"vocabulary": "MARC relators", "term": "edt", "url": "http://id.loc.gov/vocabulary/relators/edt"}`.

### `ids`
*Object.* The role's IDs: `openalex` (its OpenAlex ID) and `credit` (its CRediT URL, e.g. `https://credit.niso.org/contributor-roles/software/`; `null` for `editor`).

### `works_count`
*Integer.* How many works have at least one person with this role. See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* The total citations of the works counted in `works_count`.

### `created_date`
*String.* When the role was added to OpenAlex (`YYYY-MM-DDTHH:MM:SS`, an ISO 8601 date and time). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* When the record last changed. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Contributor roles endpoint is at [`api.openalex.org/contributor-roles`](https://api.openalex.org/contributor-roles). Fetch one by ID, [`/contributor-roles/software`](https://api.openalex.org/contributor-roles/software), or list all 15.

Contributor roles show up on works: every [authorship](/data/authorships/) carries a [`contributor_roles`](/data/authorships/#contributor_roles) list. See the [endpoints index](/api/endpoints/) for every endpoint.

```
# All 15 contributor roles
https://api.openalex.org/contributor-roles

# The editor role, with its equivalents in other vocabularies
https://api.openalex.org/contributor-roles/editor

# A work whose authors have roles (each authorship lists its own)
https://api.openalex.org/works?filter=doi:10.3390/met16111246
```

On [openalex.org](https://openalex.org), a work's page shows each person's roles next to their name, e.g. "Jane Smith (Editor)".
