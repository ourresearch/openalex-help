---
title: "Affiliations"
description: "How OpenAlex parses raw affiliation strings into institutions, assigns countries, handles complex national structures, and reports affiliation history."
tags: ["reference"]
source_id: "24831328396311"
source_url: "https://help.openalex.org/hc/en-us/articles/24831328396311-Institutions-and-Raw-Affiliation-String-Parsing"
source_updated: "2025-01-15"
---
Institutions are the universities and other organizations authors claim affiliations with. OpenAlex draws institution data from Crossref, PubMed, ROR, MAG, and publisher websites, and every OpenAlex institution maps to a corresponding record in [ROR](https://ror.org/). This page covers how a work's authors get linked to institutions and countries — from the messy affiliation text on the page to structured entities.

## Parsing raw affiliation strings

Works list affiliations as free text — a **raw affiliation string** (RAS) — which is often messy and inconsistent. OpenAlex parses each one to extract the institutions it names. For example, both "MIT, Boston, USA" and "Massachusetts Institute of Technology" resolve to the same institution ([ror.org/042nb2s44](https://ror.org/042nb2s44)).

Parsing runs in three steps:

1. **Deep-learning model** — an OpenAlex-trained model reads a string and assigns one or more institutions to it.
2. **Monthly string matching** — a rules pass fixes common model errors (adding or removing affiliations based on the raw string), run once a month.
3. **ROR matcher** — [ROR](https://ror.org/)'s own affiliation matcher, integrated into the OpenAlex codebase.

Steps 2 and 3 fill gaps left by the model, which hasn't been retrained since April 2023 — so institutions added to OpenAlex/ROR after that date wouldn't be predicted by the model alone. On the [AffilGood benchmark](https://docs.google.com/spreadsheets/d/1YfmmPdJwCApv7pGEjf_SgFQWWRJOL5l2K1M_wCpuGi8/edit?gid=1092800650#gid=1092800650) (OpenAlex tab), the parser achieves roughly 0.92 recall and 0.93 precision.

## Institution hierarchy and super systems

Because OpenAlex uses ROR's lineage structure, an institution can roll up to a parent — so you can report on a specific lab or on the university it belongs to (institution vs. institution lineage). Some institutions are marked as **super systems**: large umbrella organizations such as the [University of California System](https://openalex.org/I2803209242), along with some governments and multinational companies. Super systems are excluded from certain analyses (for example, [identifying collaborating institutions](/learn/identify-other-institutions-that-collaborate-with-researchers-from-my/)) so they don't swamp the results. See [`is_super_system`](/api/institutions/) in the Institutions reference.

## Country assignment

Country is assigned through the same affiliation matching. When a raw string matches a ROR record, OpenAlex takes the country from that record's metadata. When a string can't be matched to a ROR record but its address field still names a country, OpenAlex assigns the country code directly, without ROR.

## Complex national structures (e.g. France)

Some national research systems are layered — a French *unité mixte de recherche* (UMR) may belong to several parent organizations at once. OpenAlex handles these through ROR lineage: when a UMR has its own ROR record, affiliation text matches to it, and ROR's lineage lets users pull reports either on the lower-level unit or on the universities it rolls up to.

The limiting factor is ROR coverage: the French system isn't yet fully mapped in ROR (some universities have created records for all their sub-units, others haven't). ROR is working with ABES and MESR to complete this, so representation improves as that work progresses.

## Affiliation history

The author endpoint nests an author's affiliation history as a convenience — but, like other precomputed conveniences (see [Counts by year](/docs/counts-by-year/)), it's capped: it records only the last **10 years** at an author's current or last-known affiliation. That's enough to see recent moves, but not the full history of someone who's been somewhere longer than a decade.

For the complete history, query works directly: filter by the author ID plus the institution (as a lineage filter) and group by publication year. For example, an author whose nested history starts in 2015 may have works at the institution going back to 2006 when queried this way.

## Correcting affiliations

To change how works are affiliated in OpenAlex, our collaborators at the French *Ministère de l'enseignement supérieur et de la recherche* (MESR) built the [works-magnet tool](https://works-magnet.esr.gouv.fr/), which lets institutions review and correct their affiliations.

## Code, training data, and benchmarks

The institution-parsing model is fully open. The [openalex-institution-parsing repo](https://github.com/ourresearch/openalex-institution-parsing/tree/main/V2) lets you run the model yourself, and provides the training code, model artifacts, training data, and benchmark data. The monthly string-matching code lives in the [openalex-databricks repo](https://github.com/ourresearch/openalex-databricks/tree/main/jobs/string_matching_institutions).

For the Institution object and its filters, see the [Institutions API reference](/api/institutions/).
