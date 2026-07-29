---
title: "Coverage & accuracy"
description: "What content OpenAlex includes, how it compares to other databases, how accurate the metadata is, and who relies on it."
tags: ["reference"]
source_id: "27190301279127"
source_url: "https://help.openalex.org/hc/en-us/articles/27190301279127-What-content-does-OpenAlex-include-and-how-does-it-compare-to-other-databases"
source_updated: "2025-01-02"
---
OpenAlex takes inspiration from the Library of Alexandria: the goal is all research information, centralized in one place. In practice, OpenAlex generally covers everything other databases cover, plus a great deal more — and new sources of metadata are added continually.

Users typically think about data quality along two axes: **content coverage** (is the work in there?) and **metadata correctness** (is what's recorded about it right?). This page covers both.

## What OpenAlex includes

OpenAlex indexes diverse types of research output — articles, books, datasets, dissertations, and more — across all areas of scholarship, including fields underrepresented in other databases (social sciences, humanities, business, law), in any language. You can explore coverage yourself in the [web interface](https://openalex.org/works?group_by=publication_year,type,primary_topic.domain.id,authorships.countries).

## Comparison with other databases

| | Works | Open Access works | Citations | Price | Data openness | Org structure |
|---|---|---|---|---|---|---|
| **OpenAlex** | 322M | 121M | 2.5B+ | Freemium | Fully open, CC0 | Non-profit |
| [Scopus](https://www.elsevier.com/products/scopus/content) | 97M | 25M | | Subscription | Closed | For-profit |
| [Web of Science](https://clarivate.libguides.com/librarianresources/coverage) (core) | 92M | [24M](https://clarivate.com/academia-government/scientific-and-academic-research/open-research-and-open-access/) | 2.2B | Subscription | Closed | For-profit |
| [Dimensions](https://www.dimensions.ai/) | 177M | 35M | | Freemium | Partly open, personal use | For-profit |
| Google Scholar | 389M ([estimated](https://doi.org/10.1007/s11192-018-2958-5)) | ? | ? | Free | Closed | For-profit |
| Crossref | 166M | 59M | | Free | Fully open, CC0 | For-profit |

A growing number of peer-reviewed studies compare coverage directly; start with [Culbert et al. 2024](https://arxiv.org/abs/2401.16359), [Alperin et al. 2024](https://arxiv.org/abs/2404.17663), and [Maddi et al. 2024](https://osf.io/preprints/socarxiv/8wa4q) — they generally find OpenAlex is a superset of the more established databases.

### Books

Books are a foundational research output for all scholarship, and especially for the social sciences, humanities, and arts. OpenAlex indexes about 6 million scholarly books ([explore them](https://openalex.org/works?filter=type%3Atypes%2Fbook)) — more than comparable databases — and coverage keeps improving thanks to open initiatives like the [Directory of Open Access Books](https://www.doabooks.org/) and [Thoth Open Metadata](https://thoth.pub/).

### DataCite records

[DataCite](https://datacite.org/) is a core, trusted source: OpenAlex indexes over 37 million works with DataCite records — datasets, software, and other outputs registered there. Track the current breakdown with [this query](https://api.openalex.org/works?group_by=type&filter=indexed_in:datacite).

### Patents

OpenAlex does not index patents. Patent coverage has consistently ranked low among user and subscriber priorities; if it's important to you, tell us why at support@openalex.org.

## Metadata accuracy

Bibliometric experts worldwide rely on OpenAlex for research. Studies of metadata quality find that for works appearing in all databases, quality is comparable ([Culbert et al. 2024](https://arxiv.org/pdf/2401.16359)), and that analyses replicated across databases produce largely identical results ([Alperin et al. 2024](https://arxiv.org/pdf/2404.17663)).

No database is perfect, and all rely on curation from their communities. OpenAlex lets anyone [report and fix metadata errors](/help/fix-errors-in-openalex/) — with one important difference from proprietary databases: a fix made in OpenAlex stays open and propagates to every downstream system, instead of staying locked inside one vendor's product while the same error lives on everywhere else.

## Use in university rankings

Three mainstream university ranking exercises use OpenAlex data:

1. **[CWTS Open Leiden Ranking](https://open.leidenranking.com/)** — the open counterpart of the Leiden Ranking, with a public dashboard [comparing rankings built on Web of Science vs. OpenAlex](https://www.leidenmadtrics.nl/articles/opening-the-black-box-of-university-rankings).
2. **[Financial Times business school rankings](https://www.ft.com/content/7e81e1b6-eb08-43de-ab71-ab6c50181cc3)** — see also the FT's [profile of OpenAlex](https://www.ft.com/content/3f22a27b-89c4-4570-92bd-0cf6a617e18c).
3. **[THE Interdisciplinary Science Rankings](https://www.timeshighereducation.com/interdisciplinary-science-rankings)** — bibliometric indicators of interdisciplinarity built on OpenAlex data ([methodology](https://www.timeshighereducation.com/sites/default/files/isr-masterclass.pdf)).

Rankings adoption matters beyond exposure: it showcases open, globally comprehensive data, and it brings universities into the curation loop, further improving the dataset.

## Checking specific papers

To check whether OpenAlex has a particular paper, paste its title or DOI into the [openalex.org](https://openalex.org) search bar (try `doi:10.1111/j.1529-8817.2012.01224.x`). At scale, look works up in bulk through the [API](/api/) or convert DOI lists to OpenAlex IDs with a tool like the [Open Research Converter](https://orc-demo.gesis.org/); there's a step-by-step recipe at [Check if a journal's works are in OpenAlex](/learn/check-if-a-journals-works-are-in-openalex/). Works without DOIs need title/author matching, which is trickier.
