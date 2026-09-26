---
title: "Study designs"
updated: 2026-09-25
description: "How the research inside a work was done (randomized controlled trial, systematic review, case report and four more), where each work's values come from, and how to filter and group works by design."
tags: ["reference"]
entity:
  example: "study-designs/randomized-controlled-trial"
  api: "study-designs"
  linksTo:
    - "works"
---
A **study design** says how the research inside a [work](/data/works/) was done: a randomized controlled trial, an observational study, a systematic review. There are seven, all taken from PubMed's own list of study types, and a work can carry more than one. Use them to find every randomized trial on a topic, or to see how the evidence in a field splits between trials, observational studies and reviews. A study design's OpenAlex ID looks like `https://openalex.org/study-designs/randomized-controlled-trial`; list all seven at [`api.openalex.org/study-designs`](https://api.openalex.org/study-designs).

## About

### Study design is not work type

A work's [`type`](/data/work-types/) says what kind of document it is. Its study design says how the research inside it was done. An editorial has a type and no study design. A preprint that reports a randomized trial has type `preprint` and study design Randomized Controlled Trial. A systematic review has type `review` and study design Systematic Review.

PubMed draws the same line. Its [publication types](https://www.nlm.nih.gov/mesh/pubtypes.html) come in two halves: publication formats (Editorial, Letter, Review, Guideline and so on) and study characteristics (trials, observational studies, case reports, systematic reviews, protocols). OpenAlex already uses the formats half to help set `type`. Study designs are the study-characteristics half. So if you want editorials, letters, reviews or guidelines, filter on `type`, not here.

### Where the values come from

Each work's values come from one of two places:

- **PubMed's tags**, where the work has a MEDLINE-indexed PubMed record that carries one of the tags in the [Values](#values) table. OpenAlex serves PubMed's tags as they are.
- **Automated tagging** of the work's title and abstract, everywhere else.

Most works get their values from automated tagging. PubMed covers a small share of the literature, and many PubMed records carry no study-design tag: some tags only date from 2014 to 2019, and about half of recent PubMed records are not yet MEDLINE-indexed. The API does not say which of the two sources a given work's values came from.

Automated tagging is held to precision bars, measured against expert judgment on about 5,000 works. When it assigns Randomized Controlled Trial, it is right at least 99% of the time. For every other value it is right at least 95% of the time. Precision comes first: when the tagging is unsure, it leaves the value off. So it misses some real trials and reviews rather than tagging works that aren't. It only ever assigns the seven values below; OpenAlex adds nothing to PubMed's vocabulary.

PubMed's tags follow the National Library of Medicine's indexing rules, which are close to the definitions below but not identical. PubMed applies its trial tags to veterinary trials too, for example, and sometimes tags a secondary analysis of a trial as a randomized controlled trial. Where PubMed has tagged a record, its tags win.

### What no value means

Automated tagging runs only on works that have an abstract and a type that can report research: `article`, `review`, `preprint`, `conference-paper`, `book-chapter`, `dissertation`, `report` and `data-paper`. An empty `study_designs` list means the work was not tagged, or has none of these seven designs. It never means the work is not a study. A lab experiment, an animal study or a computational paper is research, and has none of these designs.

This matters for negation. `filter=study_designs.id:!randomized-controlled-trial` returns every work not tagged as a trial, including trials the tagging missed.

### More than one value

A work can carry several designs, and parents come along. Every Randomized Controlled Trial is also a Clinical Trial, and every Meta-Analysis is also a Systematic Review. So `study_designs.id:clinical-trial` returns randomized and non-randomized trials together. Automated tagging gives a work one design plus its parent. A PubMed record can carry any combination its indexers assigned.

## Values

| ID | Display name | Definition | PubMed tags included |
|----|--------------|------------|----------------------|
| `randomized-controlled-trial` | Randomized Controlled Trial | A trial that assigns human participants, groups of participants or treatment periods to interventions by explicit randomization and reports its results; secondary and post-hoc analyses of a trial's data do not count. | Randomized Controlled Trial; Randomized Controlled Trial, Veterinary; Pragmatic Clinical Trial; Equivalence Trial; Adaptive Clinical Trial |
| `clinical-trial` | Clinical Trial | A study that prospectively assigns human participants to one or more interventions and reports the results, randomized or not. | Clinical Trial; Controlled Clinical Trial; Clinical Trial, Phase I, II, III and IV; Clinical Study; Clinical Trial, Veterinary. Also every randomized controlled trial |
| `observational-study` | Observational Study | A study of human participants in which the investigators do not assign an intervention, such as a cohort, case-control, cross-sectional, registry or survey study. | Observational Study; Observational Study, Veterinary; Twin Study |
| `case-report` | Case Report | A description of one patient, or a small series of about ten or fewer described one by one, with no comparison group. | Case Reports |
| `systematic-review` | Systematic Review | A review that reports a systematic search of the literature and explicit criteria for selecting the studies it brings together. | Systematic Review. Also every meta-analysis |
| `meta-analysis` | Meta-Analysis | A study that statistically pools quantitative results from several independent studies. | Meta-Analysis; Network Meta-Analysis |
| `study-protocol` | Study Protocol | The published plan for a study, setting out its aims, design and methods before any results exist. | Clinical Trial Protocol |

The definitions paraphrase the [MeSH](https://www.nlm.nih.gov/mesh/meshhome.html) scope notes for the matching publication types, tightened where automated tagging needs a clear line (stated randomization for trials, human participants, about ten patients for a case report). Other PubMed study tags (Scoping Review, and modifiers such as Comparative Study, Multicenter Study and Validation Study) are not included.

The live list is at [`api.openalex.org/study-designs`](https://api.openalex.org/study-designs).

## Attributes

The top-level fields on a **study design** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this design, e.g. `https://openalex.org/study-designs/randomized-controlled-trial`. The last segment is the value you filter on.

### `display_name`
*String.* The design's name, e.g. `Randomized Controlled Trial`.

### `description`
*String.* What the design means, in a sentence (the definitions in [Values](#values)).

### `pubmed_publication_types`
*List of strings.* The PubMed publication types mapped into this design, e.g. `Meta-Analysis` and `Network Meta-Analysis` for Meta-Analysis.

### `works_count`
*Integer.* How many works carry this design. Parents are counted, so Clinical Trial includes every randomized controlled trial. See [Common attributes](/data/common-attributes/#works_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for every work with this design (`filter=study_designs.id:<ID>`).

### `created_date`
*String.* When the design was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* When the record last changed. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Study designs endpoint is at [`api.openalex.org/study-designs`](https://api.openalex.org/study-designs). Fetch one by ID, [`/study-designs/randomized-controlled-trial`](https://api.openalex.org/study-designs/randomized-controlled-trial), or list all seven.

Study designs are most useful from the works side. Every [work](/data/works/) carries a [`study_designs`](/data/works/attributes/#study_designs) list. Filter with `study_designs.id`, which takes the short value (`randomized-controlled-trial`), the namespaced form (`study-designs/randomized-controlled-trial`) or the full ID. Group with `group_by=study_designs.id`. See [Filtering](/api/filtering/) for the syntax and the [endpoints index](/api/endpoints/) for every endpoint.

```
# All seven study designs
https://api.openalex.org/study-designs

# Randomized controlled trials published in 2025
https://api.openalex.org/works?filter=study_designs.id:randomized-controlled-trial,publication_year:2025

# Clinical trials that are not randomized
https://api.openalex.org/works?filter=study_designs.id:clinical-trial,study_designs.id:!randomized-controlled-trial

# How a result set splits across designs
https://api.openalex.org/works?filter=publication_year:2025&group_by=study_designs.id
```

On [openalex.org](https://openalex.org), the same thing is the **study design** filter on works ([example](https://openalex.org/works?filter=study_designs.id:randomized-controlled-trial)).
