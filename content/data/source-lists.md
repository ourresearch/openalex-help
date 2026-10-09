---
title: "Source lists"
updated: 2026-10-09
description: "The external journal lists a source can appear on (DOAJ, CWTS Core, national lists), the fields on a source-list object, and how to filter sources and works by list."
tags: ["reference"]
entity:
  example: "source-lists/doyens"
  api: "source-lists"
  linksTo:
    - "sources"
    - "works"
---
A **source list** is an externally maintained list of journals that a [source](/data/sources/) can appear on: the [Directory of Open Access Journals](https://doaj.org/), the [CWTS Core sources list](https://zenodo.org/records/13879982), a national list of recommended health journals. Source lists are a [vocabulary](/data/vocabulary/): consistent handles on lists that exist outside OpenAlex, maintained by someone else. Each source carries a [`listed_in`](/data/sources/attributes/#listed_in) array of the lists it is on, and the dehydrated source inside every work [location](/data/locations/) carries the same array, so works can be filtered by the lists their journal is on. A source list's OpenAlex ID looks like `https://openalex.org/source-lists/doyens`; fetch one at [`api.openalex.org/source-lists/doyens`](https://api.openalex.org/source-lists/doyens).

Membership is all OpenAlex records. A list's page says who maintains it, what it covers and which edition is loaded; it never says the list is right, and OpenAlex does not endorse any list. See [Allow lists](/data/sources/#allow-lists) for why we prefer this over deny lists.

## About

OpenAlex prefers **allow lists** to deny lists: they are transparent, easy to maintain and a sound basis for retrieval. The oldest ones arrived as booleans ([`is_in_doaj`](/data/sources/attributes/#is_in_doaj), [`is_core`](/data/sources/attributes/#is_core)); `listed_in` and this entity are the general form, and the booleans are kept for compatibility.

A source list is not an [index](/data/indexes/). An index records which external registries list a given *work* ([`indexed_in`](/data/works/attributes/#indexed_in)); a source list records which lists a *journal* is on. DOAJ appears in both, answering different questions: is this article in DOAJ's index, versus is this journal a DOAJ member.

Lists are matched to sources by ISSN, and only a list's current members count: a journal its maintainer has withdrawn is not `listed_in`. Each list is loaded from the maintainer's published file, so membership is as current as the loaded edition (`list_version`). Spotted a newer edition, or know an open, ISSN-keyed list we should add? [Tell us](/how-to/support/).

## Values

| ID | Display name | Maintained by | Scope |
|----|--------------|---------------|-------|
| `cwts-core` | CWTS Core | [CWTS](https://www.cwts.nl/), Leiden University | All fields; the venues behind the Leiden Ranking Open Edition. About 36,000 sources |
| `doaj` | DOAJ | [DOAJ](https://doaj.org/) | Fully-OA journals, all fields. About 23,000 sources |
| `doyens` | Doyens de Médecine (FR) | [Conférence des Doyens de Médecine and CNU Santé](https://conferencedesdoyensdemedecine.org/la-conference-des-doyens-de-medecine-et-du-cnu-sante-luttent-contre-les-revues-predatrices/) (France) | Health, medicine and biology journals, in French and English. About 3,300 sources; 2026-07-01 edition |
| `medline` | MEDLINE | [U.S. National Library of Medicine](https://www.nlm.nih.gov/medline/medline_overview.html) | Journals currently indexed for MEDLINE; biomedicine and life sciences. About 5,200 sources; 2026-09-18 edition |
| `norway-1` | Norwegian Register, level 1 | [HK-dir](https://kanalregister.hkdir.no/) (Norway; also used by Sweden) | Journals and series at level 1 in the Norwegian Register for Scientific Journals, Series and Publishers, all fields. About 22,700 sources; 2026-09-18 edition |
| `norway-2` | Norwegian Register, level 2 | [HK-dir](https://kanalregister.hkdir.no/) (Norway; also used by Sweden) | Journals and series at level 2, the register's most selective tier, all fields. About 2,200 sources; 2026-09-18 edition |
| `jufo-1` | Publication Forum (JUFO), level 1 | [Federation of Finnish Learned Societies](https://julkaisufoorumi.fi/en) | Journals and series rated level 1 (basic) by the Finnish Publication Forum, all fields. About 19,500 sources; 2026-09-18 edition |
| `jufo-2` | Publication Forum (JUFO), level 2 | [Federation of Finnish Learned Societies](https://julkaisufoorumi.fi/en) | Journals and series rated level 2 (leading), all fields. About 2,600 sources; 2026-09-18 edition |
| `jufo-3` | Publication Forum (JUFO), level 3 | [Federation of Finnish Learned Societies](https://julkaisufoorumi.fi/en) | Journals and series rated level 3 (top), all fields. About 1,400 sources; 2026-09-18 edition |
| `erih-plus` | ERIH PLUS | [HK-dir](https://erihplus.hkdir.no/) | European Reference Index for the Humanities and Social Sciences: approved journals in the humanities and social sciences. About 11,800 sources; 2026-09-18 edition |
| `jpps-1` | JPPS, one star | [AJOL and INASP](https://www.journalquality.info/) | Journals assessed at one star under the Journal Publishing Practices and Standards framework, on the AJOL, NepJOL, BanglaJOL, CamJOL, MongoliaJOL and SLJOL platforms (Global South). About 260 sources; 2026-09-18 edition |
| `jpps-2` | JPPS, two stars | [AJOL and INASP](https://www.journalquality.info/) | Journals assessed at two stars under the JPPS framework, same platforms. About 300 sources; 2026-09-18 edition |
| `jpps-3` | JPPS, three stars | [AJOL and INASP](https://www.journalquality.info/) | Journals assessed at three stars under the JPPS framework, same platforms. 3 sources; 2026-09-18 edition |
| `latindex` | Latindex Catálogo 2.0 | [Latindex](https://www.latindex.org/) (UNAM and partner institutions) | Current journals in Catálogo 2.0, the quality-criteria catalogue for Latin America, the Caribbean, Spain and Portugal. About 3,900 sources; 2026-09-18 edition |
| `scielo` | SciELO | [SciELO](https://www.scielo.org/) | Current journals in the certified SciELO network collections (Ibero-America and South Africa). Distinct from [`is_in_scielo`](/data/sources/attributes/#is_in_scielo), which flags DOIs registered through SciELO. About 1,500 sources; 2026-09-18 edition |
| `ki-jl-1` | KI Journal List, level 1 | [Karolinska Institutet](https://staff.ki.se/research-support/karolinska-institutet-journal-list-kijl) (Sweden) | Journals at level 1 (meets the criteria for scientific publishing) in the Karolinska Institutet Journal List; medicine and health sciences. About 5,100 sources; 2026 edition |
| `ki-jl-2` | KI Journal List, level 2 | [Karolinska Institutet](https://staff.ki.se/research-support/karolinska-institutet-journal-list-kijl) (Sweden) | Journals at level 2 (high standard) in the KI Journal List. About 650 sources; 2026 edition |
| `ki-jl-3` | KI Journal List, level 3 | [Karolinska Institutet](https://staff.ki.se/research-support/karolinska-institutet-journal-list-kijl) (Sweden) | Journals at level 3 (the highest level) in the KI Journal List. About 140 sources; 2026 edition |
| `abdc-a-star` | ABDC Journal Quality List, A* | [Australian Business Deans Council](https://abdc.edu.au/abdc-journal-quality-list/) | Journals rated A*, the top tier of the ABDC Journal Quality List; business, economics and related fields. About 220 sources; 2025 edition |
| `abdc-a` | ABDC Journal Quality List, A | [Australian Business Deans Council](https://abdc.edu.au/abdc-journal-quality-list/) | Journals rated A (second tier, below A*). About 610 sources; 2025 edition |
| `abdc-b` | ABDC Journal Quality List, B | [Australian Business Deans Council](https://abdc.edu.au/abdc-journal-quality-list/) | Journals rated B (third tier). About 820 sources; 2025 edition |
| `abdc-c` | ABDC Journal Quality List, C | [Australian Business Deans Council](https://abdc.edu.au/abdc-journal-quality-list/) | Journals rated C (fourth tier). About 770 sources; 2025 edition |
| `russia-white-list-1` | Russian White List, level 1 | [RCSI](https://journalrank.rcsi.science/), for the Ministry of Science and Higher Education (Russia) | Journals at level 1, the top of four levels of the White List, Russia's national journal list for research evaluation, all fields. About 9,400 sources; 2026-10-09 edition |
| `russia-white-list-2` | Russian White List, level 2 | [RCSI](https://journalrank.rcsi.science/), for the Ministry of Science and Higher Education (Russia) | Journals at level 2 of the White List. About 8,100 sources; 2026-10-09 edition |
| `russia-white-list-3` | Russian White List, level 3 | [RCSI](https://journalrank.rcsi.science/), for the Ministry of Science and Higher Education (Russia) | Journals at level 3 of the White List. About 6,600 sources; 2026-10-09 edition |
| `russia-white-list-4` | Russian White List, level 4 | [RCSI](https://journalrank.rcsi.science/), for the Ministry of Science and Higher Education (Russia) | Journals at level 4 of the White List. About 5,700 sources; 2026-10-09 edition |
| `poland-200` | Polish journal list, 200 points | [Ministry of Science and Higher Education](https://www.gov.pl/web/nauka/nowy-wykaz-czasopism-naukowych-i-recenzowanych-materialow-z-konferencji-miedzynarodowych) (Poland) | Journals worth 200 points, the top of six levels on the Polish Ministry of Science list of scientific journals (January 2024 list), all fields. About 880 sources; 2026-10-09 edition |
| `poland-140` | Polish journal list, 140 points | [Ministry of Science and Higher Education](https://www.gov.pl/web/nauka/nowy-wykaz-czasopism-naukowych-i-recenzowanych-materialow-z-konferencji-miedzynarodowych) (Poland) | Journals worth 140 points on the Polish list. About 1,900 sources; 2026-10-09 edition |
| `poland-100` | Polish journal list, 100 points | [Ministry of Science and Higher Education](https://www.gov.pl/web/nauka/nowy-wykaz-czasopism-naukowych-i-recenzowanych-materialow-z-konferencji-miedzynarodowych) (Poland) | Journals worth 100 points on the Polish list. About 4,100 sources; 2026-10-09 edition |
| `poland-70` | Polish journal list, 70 points | [Ministry of Science and Higher Education](https://www.gov.pl/web/nauka/nowy-wykaz-czasopism-naukowych-i-recenzowanych-materialow-z-konferencji-miedzynarodowych) (Poland) | Journals worth 70 points on the Polish list. About 6,000 sources; 2026-10-09 edition |
| `poland-40` | Polish journal list, 40 points | [Ministry of Science and Higher Education](https://www.gov.pl/web/nauka/nowy-wykaz-czasopism-naukowych-i-recenzowanych-materialow-z-konferencji-miedzynarodowych) (Poland) | Journals worth 40 points on the Polish list. About 6,100 sources; 2026-10-09 edition |
| `poland-20` | Polish journal list, 20 points | [Ministry of Science and Higher Education](https://www.gov.pl/web/nauka/nowy-wykaz-czasopism-naukowych-i-recenzowanych-materialow-z-konferencji-miedzynarodowych) (Poland) | Journals worth 20 points, the lowest level on the Polish list. About 13,500 sources; 2026-10-09 edition |
| `vabb-shw` | VABB-SHW (Flanders) | [ECOOM](https://www.ecoom.be/nodes/tijdschrifteninvabbshwversie1520142023/en), University of Antwerp, for the Flemish government | Journals whose articles count as peer-reviewed in the Flemish Academic Bibliography for the Social Sciences and Humanities (version 16). About 12,800 sources; 2026-10-09 edition |
| `fnege-1-star` | FNEGE journal ranking, 1* | [FNEGE](https://fnege.org/classement-des-revues-scientifiques-en-sciences-de-gestion/) (France) | Journals ranked 1*, the top rank of the FNEGE ranking of management journals (2025). 31 sources; 2026-10-09 edition |
| `fnege-1` | FNEGE journal ranking, 1 | [FNEGE](https://fnege.org/classement-des-revues-scientifiques-en-sciences-de-gestion/) (France) | Journals ranked 1 (second rank, below 1*). 60 sources; 2026-10-09 edition |
| `fnege-2` | FNEGE journal ranking, 2 | [FNEGE](https://fnege.org/classement-des-revues-scientifiques-en-sciences-de-gestion/) (France) | Journals ranked 2. About 150 sources; 2026-10-09 edition |
| `fnege-3` | FNEGE journal ranking, 3 | [FNEGE](https://fnege.org/classement-des-revues-scientifiques-en-sciences-de-gestion/) (France) | Journals ranked 3. About 250 sources; 2026-10-09 edition |
| `fnege-4` | FNEGE journal ranking, 4 | [FNEGE](https://fnege.org/classement-des-revues-scientifiques-en-sciences-de-gestion/) (France) | Journals ranked 4. About 390 sources; 2026-10-09 edition |
| `tr-dizin` | TR Dizin | [TÜBİTAK ULAKBİM](https://search.trdizin.gov.tr/) (Türkiye) | Journals on the current TR Dizin list, the national index of scholarly journals in Türkiye, all fields. About 1,100 sources; 2026-10-09 edition |
| `dhet` | DHET list of approved South African journals | [Department of Higher Education and Training](https://db.crest.sun.ac.za/zapublications/) (South Africa) | South African journals approved by DHET for research-output subsidy (file hosted by CREST, Stellenbosch University). About 270 sources; 2026-10-09 edition |
| `ft50` | FT50 | [Financial Times](https://www.ft.com/content/3405a512-5cbb-11e1-8f1f-00144feabdc0) | The 50 journals behind the Financial Times Research Rank in its business school rankings, as revised in April 2026. 51 sources; 2026-10-09 edition |
| `utd24` | UTD24 | [UT Dallas, Naveen Jindal School of Management](https://jsom.utdallas.edu/the-utd-top-100-business-school-research-rankings/) | The 24 journals behind the UT Dallas Top 100 Business School Research Rankings. 24 sources; 2026-10-09 edition |
| `anvur-class-a` | ANVUR Class A journals | [ANVUR](https://www.anvur.it/it/ricerca/riviste/elenchi-di-riviste-classificate) (Italy) | Journals in Class A for at least one hiring sector in ANVUR's lists for architecture, the humanities, law, economics and the social sciences (areas 08 and 10-14). A subset of `anvur-scientific`. About 5,400 sources; 2026-10-09 edition |
| `anvur-scientific` | ANVUR scientific journals | [ANVUR](https://www.anvur.it/it/ricerca/riviste/elenchi-di-riviste-classificate) (Italy) | Journals rated scientific in the same ANVUR lists. About 14,100 sources; 2026-10-09 edition |
| `kci-excellent` | KCI Excellent Journal | [National Research Foundation of Korea](https://www.kci.go.kr/) | Journals accredited as Excellent, the top of three tiers in the Korea Citation Index, Korea's national journal accreditation, all fields. 64 sources; 2026-10-09 edition |
| `kci-registered` | KCI Registered Journal | [National Research Foundation of Korea](https://www.kci.go.kr/) | Journals accredited as Registered in the Korea Citation Index. About 2,200 sources; 2026-10-09 edition |
| `kci-candidate` | KCI Candidate Journal | [National Research Foundation of Korea](https://www.kci.go.kr/) | Journals accredited as Candidate in the Korea Citation Index. About 120 sources; 2026-10-09 edition |
| `ccf-a` | CCF recommended journals, class A | [China Computer Federation](https://www.ccf.org.cn/Academic_Evaluation/By_category/) | Journals in class A, the top of three classes of the China Computer Federation's recommended international journals (7th edition, 2026); conferences on the list are not included. 37 sources; 2026-10-09 edition |
| `ccf-b` | CCF recommended journals, class B | [China Computer Federation](https://www.ccf.org.cn/Academic_Evaluation/By_category/) | Journals in class B of the CCF list. About 110 sources; 2026-10-09 edition |
| `ccf-c` | CCF recommended journals, class C | [China Computer Federation](https://www.ccf.org.cn/Academic_Evaluation/By_category/) | Journals in class C of the CCF list. About 140 sources; 2026-10-09 edition |
| `fecyt-seal` | FECYT quality seal | [FECYT](https://calidadrevistas.fecyt.es/revistas-sello-fecyt) (Spain) | Spanish journals currently holding the FECYT quality seal. About 580 sources; 2026-10-09 edition |
| `nbra` | Núcleo Básico de Revistas Científicas Argentinas | [CAICYT-CONICET](https://www.caicyt-conicet.gov.ar/sitio/comunicacion-cientifica/nucleo-basico/revistas-integrantes/) (Argentina) | The core set of Argentine scientific journals. About 420 sources; 2026-10-09 edition |
| `publindex-a1` | Publindex, A1 | [Minciencias](https://minciencias.gov.co/convocatorias/convocatoria-clasificacion-y-reconocimiento-revistas-cientificas-nacionales-publindex) (Colombia) | Colombian journals classified A1, the top category of Publindex, the national journal index (2026 call). 12 sources; 2026-10-09 edition |
| `publindex-a2` | Publindex, A2 | [Minciencias](https://minciencias.gov.co/convocatorias/convocatoria-clasificacion-y-reconocimiento-revistas-cientificas-nacionales-publindex) (Colombia) | Journals classified A2. 30 sources; 2026-10-09 edition |
| `publindex-b` | Publindex, B | [Minciencias](https://minciencias.gov.co/convocatorias/convocatoria-clasificacion-y-reconocimiento-revistas-cientificas-nacionales-publindex) (Colombia) | Journals classified B. About 130 sources; 2026-10-09 edition |
| `publindex-c` | Publindex, C | [Minciencias](https://minciencias.gov.co/convocatorias/convocatoria-clasificacion-y-reconocimiento-revistas-cientificas-nacionales-publindex) (Colombia) | Journals classified C. About 200 sources; 2026-10-09 edition |
| `publindex-recognized` | Publindex, recognized | [Minciencias](https://minciencias.gov.co/convocatorias/convocatoria-clasificacion-y-reconocimiento-revistas-cientificas-nacionales-publindex) (Colombia) | Journals recognized in Publindex: they meet its editorial-quality standards and enter the national index without a category. About 140 sources; 2026-10-09 edition |
| `dongbi-a` | Dongbi Index, grade A | [Dongbi Technology Data](https://www.dbdata.com/dongbiindex/) with the Chinese Academy of Medical Sciences (China) | Journals graded A, the top of four grades, in at least one subject of the Dongbi Index global high-quality journal list (2025 edition), all fields; a journal graded in several subjects is listed under its best grade. About 700 sources; 2026-10-09 edition |
| `dongbi-b` | Dongbi Index, grade B | [Dongbi Technology Data](https://www.dbdata.com/dongbiindex/) with the Chinese Academy of Medical Sciences (China) | Journals whose best Dongbi Index grade is B. About 2,900 sources; 2026-10-09 edition |
| `dongbi-c` | Dongbi Index, grade C | [Dongbi Technology Data](https://www.dbdata.com/dongbiindex/) with the Chinese Academy of Medical Sciences (China) | Journals whose best Dongbi Index grade is C. About 6,500 sources; 2026-10-09 edition |
| `dongbi-d` | Dongbi Index, grade D | [Dongbi Technology Data](https://www.dbdata.com/dongbiindex/) with the Chinese Academy of Medical Sciences (China) | Journals whose best Dongbi Index grade is D (emerging and specialized fields). About 2,500 sources; 2026-10-09 edition |

Where a maintainer ranks journals in levels (the Norwegian Register, JUFO, JPPS, KI-JL, ABDC, the Russian White List, the Polish list, FNEGE, KCI, CCF, Publindex, the Dongbi Index), **each level is its own list**, named with the maintainer's own label: `norway-2`, `jufo-3`, `abdc-a-star`, `poland-200`. Those frameworks exist to get away from the in-or-out binary, so OpenAlex keeps the levels rather than flattening them. A journal is on exactly one level of a given register; to get "any level", filter on all of them (`listed_in:jufo-1|jufo-2|jufo-3`). The one exception is ANVUR, whose Class A journals are also on its list of scientific journals, so a Class A journal carries both ids. Directions differ: in Norway, JUFO, JPPS, KI-JL and the Polish list a higher number is the more selective tier; in the Russian White List level 1 is the top, and ABDC (A*), FNEGE (1*), CCF (A), Publindex (A1), KCI (Excellent) and the Dongbi Index (A) also put their top tier first. The Dongbi Index grades journals per subject; OpenAlex lists each journal under its best grade. Each list's description says which tier is the top. States that aren't a level (not yet evaluated, pending, level 0) are not lists.

The live list is at [`api.openalex.org/source-lists`](https://api.openalex.org/source-lists).

## Attributes

The top-level fields on a **source list** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this list, e.g. `https://openalex.org/source-lists/doyens`. The last segment is the value that appears in `listed_in`.

### `display_name`
*String.* The list's name as its maintainer publishes it, e.g. `Liste de revues recommandables (CDD / CNU Santé)`.

### `description`
*String.* What the list covers, in a sentence.

### `maintainer`
*String.* The organisation that maintains the list.

### `url`
*String.* Where the maintainer publishes the list.

### `list_version`
*String.* The edition currently loaded, as a date (`YYYY-MM-DD`); null for lists derived continuously from another feed (DOAJ, CWTS Core).

### `sources_count`
*Integer.* How many OpenAlex sources are on this list.

### `works_count`
*Integer.* How many works have their primary location in a source on this list. See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations across those works. See [Common attributes](/data/common-attributes/#cited_by_count).

### `sources_api_url`
*String.* A ready-made [Sources](/data/sources/) API URL for every source on this list (`filter=listed_in:<ID>`).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for every work whose primary location is on this list (`filter=primary_location.source.listed_in:<ID>`).

### `created_date`
*String.* When the list was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* When the list record last changed. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Source lists endpoint is at [`api.openalex.org/source-lists`](https://api.openalex.org/source-lists). Fetch one by ID, [`/source-lists/doyens`](https://api.openalex.org/source-lists/doyens), or list them all.

Source lists are most useful as a filter. On [sources](/data/sources/), `filter=listed_in:doyens` returns the journals on the list and `group_by=listed_in` splits a result set across lists. On [works](/data/works/), `filter=primary_location.source.listed_in:doyens` returns works published in those journals; `locations.source.listed_in` and `best_oa_location.source.listed_in` do the same for any location and the best OA location. See [Filtering](/api/filtering/) for the syntax and the [endpoints index](/api/endpoints/) for every endpoint.

On [openalex.org](https://openalex.org), the same thing is the **listed in** filter on sources ([example](https://openalex.org/sources?filter=listed_in:doyens)) and **source listed in** on works ([example](https://openalex.org/works?filter=primary_location.source.listed_in:doyens)).
