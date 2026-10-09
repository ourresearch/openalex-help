---
title: "Overview"
updated: 2026-10-09
description: "What a source is, where sources come from, and how OpenAlex builds them and judges journal quality and open access."
tags: ["reference"]
source_id: "24347057529623"
source_url: "https://help.openalex.org/hc/en-us/articles/24347057529623-Sources-in-OpenAlex"
source_updated: "2024-07-26"
entity:
  example: "S137773608"
  api: "sources"
  linksTo:
    - "locations"
    - "publishers"
    - "indexes"
---
A **source** is a venue where [works](/data/works/) appear: a journal, a conference proceedings series, a preprint or institutional repository, an ebook platform, or a book series. Sources are how OpenAlex connects works to the places that host them — every work links to one or more sources through its [locations](/data/locations/), and each source aggregates the works it published. OpenAlex tracks about 255,000 sources; a source's OpenAlex ID looks like `S137773608`, and you can fetch one at [`api.openalex.org/sources/S137773608`](https://api.openalex.org/sources/S137773608).

This page covers where sources come from and the judgment calls behind them. [Repositories](/data/sources/repositories/) covers how repository content gets harvested and matched, and [Attributes](/data/sources/attributes/) is the dictionary of every attribute on a source object.

## About

### Where sources come from

Sources are drawn from the [works](/data/works/) that flow into OpenAlex: as records arrive from [Crossref](https://www.crossref.org/), the [Microsoft Academic Graph (MAG)](https://en.wikipedia.org/wiki/Microsoft_Academic), DataCite, PubMed, repositories, and other feeds, the venues they name become sources. A source is identified primarily by its [ISSN](https://en.wikipedia.org/wiki/International_Standard_Serial_Number) — OpenAlex groups every ISSN that shares an [`issn_l`](/data/sources/attributes/#issn_l) (linking ISSN) into a single source — with additional sources coming from repository and platform registries that have no ISSN. Each source is attached to the [publisher](/data/publishers/) that runs it via [`host_organization`](/data/sources/attributes/#host_organization).

### Source types

Every source carries exactly one [`type`](/data/sources/attributes/#type), assigned from its metadata and behavior. The vocabulary (see [Source types](/data/source-types/)):

| Type | What it is | Rough count |
|---|---|---|
| `journal` | Peer-reviewed serials — the large majority of sources | ~206,000 |
| `ebook platform` | Book-hosting platforms | ~25,000 |
| `conference` | Conference series | ~13,000 |
| `repository` | OA repositories like [arXiv](https://arxiv.org/) or institutional repositories | ~7,000 |
| `book series` | Serial book publications | ~7,000 |
| `other` / `metadata` | Everything else, and metadata-only sources | ~130 |

Repository sources behave differently enough from journals — harvesting, matching, and why their work counts can look small — that they get their own page: [Repositories](/data/sources/repositories/).

### Books and conferences: the series is the source

A source is always the **series**: the stable thing that keeps publishing over the years. A journal is the familiar case. Books and conferences follow the same shape, so a single book or a single year's conference is never a source of its own. It is a **volume** of its series, the way an issue is part of a journal.

| What you're looking at | Its source | Source type |
|---|---|---|
| An article in *Nature* | *Nature* | `journal` |
| A preprint on arXiv | arXiv | `repository` |
| A chapter in a book that belongs to a book series | the book series, e.g. [*Methods in Molecular Biology*](https://api.openalex.org/sources/S4210172139) | `book series` |
| A chapter in a standalone book, or a whole monograph | the publisher's ebook platform, e.g. [Routledge eBooks](https://api.openalex.org/sources/S4306463855) | `ebook platform` |
| A paper at ICASSP 2026 | the conference series, IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP) | `conference` |
| A conference paper published in Lecture Notes in Computer Science | [*Lecture Notes in Computer Science*](https://api.openalex.org/sources/S106296714) | `book series` |

Some details:

- **An ebook platform works like a very large journal of books.** It holds a publisher's books that aren't in a series. Its [`host_organization`](/data/sources/attributes/#host_organization) is the imprint that publishes the books (Routledge eBooks belongs to Routledge), not the imprint's parent company.
- **A book is still a [work](/data/works/)** of type `book`, with its own DOI, authors and citations. It just isn't a source. Books in a series reach their series through the series' ISSN.
- **A conference is its series, not its edition.** ICASSP 2025 and ICASSP 2026 papers share one source, so the series' metrics cover all its years. The edition appears only as the paper's publication year. Many conferences register their own proceedings with an ISSN, as NeurIPS and ICRA do. Those records are typed `conference`, not `journal`.
- **When proceedings are published inside a general series with an ISSN** (Lecture Notes in Computer Science, Proceedings of SPIE, Journal of Physics: Conference Series), the ISSN wins: the paper's source is that series, and the conference itself doesn't appear as a source.
- **Volume and issue numbers** are fields on the work ([`biblio`](/data/works/attributes/#biblio)), not entities. OpenAlex doesn't yet record which book a chapter belongs to, or which edition of a conference a paper came from.

### No quality bar, by design

OpenAlex deliberately does not impose a quality bar on which sources it indexes — its inclusion criteria are more like arXiv than Web of Science. There are good reasons to index everything: "lower-quality" sources are useful as objects of study; sources that are inadequate for one purpose are ideal for another (grey literature, regional literature, early-career work); low-power studies aggregate into high-power meta-analyses; and excellent work is too often excluded from traditional indexes merely for being non-English or from the Global South. Most importantly, "lower-quality" content can always be *filtered out* if it's included — it can't be added back if it's not.

**Predatory journals** are handled the same way. There is no authoritative list of them, the lists change constantly, and the definition itself is contested — from faked peer review (obviously problematic) to any publisher that inflates accepted volume for revenue (a practice common even at "reputable" sources). Rather than maintain a deny list and play cat-and-mouse with bad actors who can simply rebrand, OpenAlex indexes everything and lets analysts narrow down.

### Allow lists

OpenAlex prefers **allow lists** (curated lists of trusted sources) over deny lists: they're more transparent, easier to maintain, and a more robust foundation for retrieval. Two membership flags let you narrow to trusted sources:

- [`is_in_doaj`](/data/sources/attributes/#is_in_doaj) — the source is indexed in the [Directory of Open Access Journals](https://doaj.org/), which vets the legitimacy of fully-OA journals. About 23,000 sources.
- [`is_core`](/data/sources/attributes/#is_core) — the source is on the [CWTS Core sources list](https://zenodo.org/records/13879982). About 36,000 sources.

The general form is [`listed_in`](/data/sources/attributes/#listed_in): a list of the external source lists a source appears on (`cwts-core`, `doaj`, and, new in September 2026, `doyens`, `medline`, `erih-plus`, `scielo`, `latindex` and the per-level lists `norway-1`/`norway-2`, `jufo-1`/`jufo-2`/`jufo-3`, `jpps-1`/`jpps-2`/`jpps-3`, `ki-jl-1`/`ki-jl-2`/`ki-jl-3` and `abdc-a-star`/`abdc-a`/`abdc-b`/`abdc-c`; in October 2026, national lists from Russia, Poland, Flanders, Türkiye, South Africa, Italy, Korea, Spain, Argentina and Colombia, the FNEGE, FT50 and UTD24 business lists and the CCF computer-science list; see the table below and the [source lists](/data/source-lists/) page). It's deliberately non-normative: OpenAlex records *that* a list includes a source, not whether the list is right. Filter works with `primary_location.source.listed_in:doyens`, or sources with `listed_in:doyens`.

| List id | List | Maintained by | Scope | Loaded edition |
|---------|------|---------------|-------|----------------|
| `cwts-core` | [CWTS Core sources](https://zenodo.org/records/13879982) | [CWTS](https://www.cwts.nl/), Leiden University | All fields; the venues behind the Leiden Ranking Open Edition. About 36,000 sources | Tracks [`is_core`](/data/sources/attributes/#is_core) |
| `doaj` | [Directory of Open Access Journals](https://doaj.org/) | DOAJ | Fully-OA journals, all fields. About 23,000 sources | Tracks [`is_in_doaj`](/data/sources/attributes/#is_in_doaj) |
| `doyens` | [Liste de revues recommandables](https://conferencedesdoyensdemedecine.org/la-conference-des-doyens-de-medecine-et-du-cnu-sante-luttent-contre-les-revues-predatrices/) | Conférence des Doyens de Médecine and CNU Santé (France) | Health, medicine and biology journals, in French and English. About 3,300 sources | 2026-07-01 |
| `medline` | [MEDLINE](https://www.nlm.nih.gov/medline/medline_overview.html) | U.S. National Library of Medicine | Journals currently indexed for MEDLINE; biomedicine and life sciences. About 5,200 sources | 2026-09-18 |
| `norway-1`, `norway-2` | [Norwegian Register for Scientific Journals](https://kanalregister.hkdir.no/) | HK-dir (Norway; also used by Sweden) | One list per level, all fields. Level 1 about 22,700 sources, level 2 about 2,200 | 2026-09-18 |
| `jufo-1`, `jufo-2`, `jufo-3` | [Publication Forum (JUFO)](https://julkaisufoorumi.fi/en) | Federation of Finnish Learned Societies | One list per level, all fields. Level 1 about 19,500 sources, level 2 about 2,600, level 3 about 1,400 | 2026-09-18 |
| `erih-plus` | [ERIH PLUS](https://erihplus.hkdir.no/) | HK-dir | Humanities and social sciences. About 11,800 sources | 2026-09-18 |
| `jpps-1`, `jpps-2`, `jpps-3` | [JPPS](https://www.journalquality.info/) (Journal Publishing Practices and Standards) | AJOL and INASP | One list per star level; journals on the AJOL, NepJOL, BanglaJOL, CamJOL, MongoliaJOL and SLJOL platforms. About 260, 300 and 3 sources | 2026-09-18 |
| `latindex` | [Latindex Catálogo 2.0](https://www.latindex.org/) | Latindex (UNAM and partners) | Latin America, the Caribbean, Spain and Portugal. About 3,900 sources | 2026-09-18 |
| `scielo` | [SciELO](https://www.scielo.org/) | SciELO | Current journals in the certified SciELO network collections. About 1,500 sources | 2026-09-18 |
| `ki-jl-1`, `ki-jl-2`, `ki-jl-3` | [Karolinska Institutet Journal List](https://staff.ki.se/research-support/karolinska-institutet-journal-list-kijl) | Karolinska Institutet (Sweden) | One list per level; medicine and health sciences. Level 1 about 5,100 sources, level 2 about 650, level 3 about 140 | 2026 edition |
| `abdc-a-star`, `abdc-a`, `abdc-b`, `abdc-c` | [ABDC Journal Quality List](https://abdc.edu.au/abdc-journal-quality-list/) | Australian Business Deans Council | One list per rating, A* at the top; business, economics and related fields. About 220, 610, 820 and 770 sources | 2025 edition |
| `russia-white-list-1`, `-2`, `-3`, `-4` | [Russian White List](https://journalrank.rcsi.science/) | RCSI, for the Ministry of Science and Higher Education (Russia) | One list per level, level 1 at the top; all fields. About 9,400, 8,100, 6,600 and 5,700 sources | 2026-10-09 edition |
| `poland-200`, `-140`, `-100`, `-70`, `-40`, `-20` | [Polish journal list](https://www.gov.pl/web/nauka/nowy-wykaz-czasopism-naukowych-i-recenzowanych-materialow-z-konferencji-miedzynarodowych) | Ministry of Science and Higher Education (Poland) | One list per points level, 200 at the top; all fields. About 880, 1,900, 4,100, 6,000, 6,100 and 13,500 sources | 2026-10-09 edition |
| `vabb-shw` | [VABB-SHW](https://www.ecoom.be/nodes/tijdschrifteninvabbshwversie1520142023/en) | ECOOM, University of Antwerp (Flanders) | Peer-reviewed journals for the social sciences and humanities. About 12,800 sources | 2026-10-09 edition |
| `fnege-1-star`, `fnege-1` … `fnege-4` | [FNEGE ranking](https://fnege.org/classement-des-revues-scientifiques-en-sciences-de-gestion/) | FNEGE (France) | One list per rank, 1* at the top; management. About 31, 60, 150, 250 and 390 sources | 2026-10-09 edition |
| `tr-dizin` | [TR Dizin](https://search.trdizin.gov.tr/) | TÜBİTAK ULAKBİM (Türkiye) | All fields. About 1,100 sources | 2026-10-09 edition |
| `dhet` | [DHET approved South African journals](https://db.crest.sun.ac.za/zapublications/) | Department of Higher Education and Training (South Africa) | All fields. About 270 sources | 2026-10-09 edition |
| `ft50`, `utd24` | [FT50](https://www.ft.com/content/3405a512-5cbb-11e1-8f1f-00144feabdc0) and [UTD24](https://jsom.utdallas.edu/the-utd-top-100-business-school-research-rankings/) | Financial Times; UT Dallas | The journals behind the two business-school research rankings. 50 and 24 journals | 2026-10-09 edition |
| `anvur-class-a`, `anvur-scientific` | [ANVUR journal lists](https://www.anvur.it/it/ricerca/riviste/elenchi-di-riviste-classificate) | ANVUR (Italy) | Architecture, humanities, law, economics, social sciences; Class A is a subset of scientific. About 5,400 and 14,100 sources | 2026-10-09 edition |
| `kci-excellent`, `kci-registered`, `kci-candidate` | [Korea Citation Index](https://www.kci.go.kr/) | National Research Foundation of Korea | One list per accreditation tier, Excellent at the top; all fields. About 64, 2,200 and 120 sources | 2026-10-09 edition |
| `ccf-a`, `ccf-b`, `ccf-c` | [CCF recommended journals](https://www.ccf.org.cn/Academic_Evaluation/By_category/) | China Computer Federation | One list per class, A at the top; computer science journals (not conferences). About 37, 110 and 140 sources | 2026-10-09 edition |
| `fecyt-seal` | [FECYT quality seal](https://calidadrevistas.fecyt.es/revistas-sello-fecyt) | FECYT (Spain) | Spanish journals. About 580 sources | 2026-10-09 edition |
| `nbra` | [Núcleo Básico de Revistas Científicas Argentinas](https://www.caicyt-conicet.gov.ar/sitio/comunicacion-cientifica/nucleo-basico/revistas-integrantes/) | CAICYT-CONICET (Argentina) | Argentine journals. About 420 sources | 2026-10-09 edition |
| `publindex-a1`, `-a2`, `-b`, `-c`, `-recognized` | [Publindex](https://minciencias.gov.co/convocatorias/convocatoria-clasificacion-y-reconocimiento-revistas-cientificas-nacionales-publindex) | Minciencias (Colombia) | One list per category, A1 at the top, plus recognized journals; 2026 call. About 12, 30, 130, 200 and 140 sources | 2026-10-09 edition |

Each list is also a [source list](/data/source-lists/) entity (`api.openalex.org/source-lists/doyens`) carrying its maintainer, URL and loaded edition. Lists are matched to sources by ISSN, and only a list's current members count: a journal its maintainer has withdrawn is not `listed_in`. Each list is loaded from the maintainer's published file, so membership is as current as the loaded edition. Spotted a newer edition, or know an open, ISSN-keyed list we should add? [Tell us](/how-to/support/).

On [openalex.org](https://openalex.org), the same thing is the **listed in** filter on sources ([example](https://openalex.org/sources?filter=listed_in:doyens)) and **source listed in** on works ([example](https://openalex.org/works?filter=primary_location.source.listed_in:doyens)); group by it to see how a result set splits across lists.

A source list is not an [index](/data/indexes/). An index records which external registries list a given *work* ([`indexed_in`](/data/works/attributes/#indexed_in), e.g. `indexed_in:pubmed`); `listed_in` records which lists a *journal* is on. DOAJ appears in both, answering different questions: is this article in DOAJ's index, versus is this journal a DOAJ member.

More lists will be added over time; the goal is a "quality vs. quantity" slider that users can adjust to their needs. Because the database is open, a list of sources to *exclude* is easy for one librarian to build and share; ask your local librarian if they've curated one.

### CWTS Core vs. Web of Science

The [Centre for Science and Technology Studies](https://www.cwts.nl/) (CWTS) at Leiden University maintains the **Core sources** list — the subset of OpenAlex sources included in their [Leiden Ranking Open Edition](https://open.leidenranking.com/). Filtering works by `primary_location.source.is_core:true` returns only publications from those sources, letting you explore the data behind the rankings (or negate it to see what they exclude). CWTS Core is **not** the [Web of Science Core Collection](https://webofscience.help.clarivate.com/Content/wos-core-collection/wos-core-collection.htm), Clarivate's selective journal list — the similar names are coincidence, and the two have different maintainers, criteria, and contents.

### Fully-OA journals and open access

Whether a journal is **fully open access** matters beyond the journal itself: it determines the [OA status](/data/works/open-access/) of the works inside it. An OA article in a fully-OA journal is **gold**; the same article in a toll-access journal is **hybrid** or **bronze** — so a work's `oa_status` links back to the source's openness recorded here. Two source fields carry the determination:

- [`is_in_doaj`](/data/sources/attributes/#is_in_doaj) — the journal is indexed in [DOAJ](https://doaj.org/) (about 23,000 sources). DOAJ verifies credibility and legitimacy; OpenAlex does no independent vetting, so use this field when legitimacy matters. If a journal is in DOAJ it is fully OA (`is_oa=true`, `is_in_doaj=true`).
- [`is_oa`](/data/sources/attributes/#is_oa) — the journal is fully OA, whether or not DOAJ lists it (about 65,000 sources).

Not every fully-OA journal is in DOAJ — smaller titles and journals from the developing world often aren't. For those, OpenAlex applies two more checks: **(1)** is it from a known fully-OA publisher (a small allow list, e.g. many [SciELO](https://scielo.org/)-model publishers)? and **(2)** does it publish *only* OA articles? Because OpenAlex indexes a journal's complete output, it can simply observe whether every article is OA — a check that credits smaller publishers who never registered with DOAJ. A journal passing either check gets `is_oa=true`, `is_in_doaj=false`. This observation-based check also detects **flipped journals** ([`oa_flip_year`](/data/sources/attributes/#oa_flip_year)): an OA article published *before* a journal's flip date is hybrid or bronze, one published *after* is gold.

### APC data

The [article processing charge](https://en.wikipedia.org/wiki/Article_processing_charge) (APC) is the fee some journals charge to publish a work OA. At the source level OpenAlex records the journal's **list price** in [`apc_prices`](/data/sources/attributes/#apc_prices) (per currency) and [`apc_usd`](/data/sources/attributes/#apc_usd); at the [work](/data/works/attributes/#apc_list) level it records both the list price and OpenAlex's best estimate of what was actually paid. List prices are sourced from DOAJ plus manual curation. Two caveats: OpenAlex stores one (current-year) list price per journal, so historical estimates apply today's price to an older year; and DOAJ coverage skews toward fully-OA journals, leaving hybrid journals — where much APC spending happens — thinly covered. For year-by-year list prices, [Butler et al. 2024](https://doi.org/10.7910/DVN/CR1MMV) (Harvard Dataverse, CC0) provides publisher price lists per journal per year (2019–2023, six large publishers, ~8,711 journals); OpenAlex is **evaluating** integrating this dataset but has **not** yet done so. For a worked example of estimating an institution's APC spend, see [Analyzing your institution](/how-to/analyzing-your-institution/#how-much-has-it-spent-on-apc-fees).

## Attributes

The full dictionary of every attribute on a source object lives on its own page: [Attributes](/data/sources/attributes/).

## In the API

The Sources endpoint is at [`api.openalex.org/sources`](https://api.openalex.org/sources). Fetch a single source by ID — [`/sources/S137773608`](https://api.openalex.org/sources/S137773608) — or a list, and [filter](/api/filtering/), search, sort, and group over the source [attributes](/data/sources/attributes/) (for example `filter=is_in_doaj:true,type:journal` or `group_by=type`). For the full list of endpoints see the [endpoints index](/api/endpoints/).
