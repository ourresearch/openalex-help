---
title: "Journal quality & OA status"
description: "Why OpenAlex indexes all scholarly sources rather than imposing a quality bar, how it determines whether a journal is fully open access, and where its APC data comes from."
tags: ["reference"]
source_id: "27719473439511"
source_url: "https://help.openalex.org/hc/en-us/articles/27719473439511-How-does-OpenAlex-handle-predatory-and-lower-quality-journals"
source_updated: "2026-05-09"
---
OpenAlex does not try to maintain an arbitrary "quality" bar. It covers all scholarly works — inclusion criteria more like arXiv than Web of Science. This page explains that philosophy, the journal-level attributes OpenAlex *does* provide (curated-list membership, fully-OA status, APC prices), and how to use them to narrow an analysis to the sources you trust.

## No quality bar, by design

There are many advantages to indexing everything:

- "Lower-quality" sources may be useful as objects of study or pedagogy in their own right (e.g., the study of retracted papers).
- Many sources are "lower-quality" for some purposes but adequate or ideal for others — including grey literature, regional literature, and literature from early-career researchers or students.
- "Lower-quality" literature, in aggregate, can be useful for systematic review and literature-based discovery. An individual small study may have low statistical power on its own, but combining many such studies in a meta-analysis yields high statistical power and can reveal effects no single study could establish.
- Literature of excellent quality is sometimes excluded from traditional indexes simply because it isn't in English or comes from the Global South; this perpetuates inequity.

Most importantly, "lower-quality" content can always be filtered out if it's included — it can't be added if it's not.

## Predatory journals

Predatory journals and deceptive conferences are especially thorny because there is no authoritative list, the lists change over time, and there is a wide range of behaviors that some include in the definition and others do not. Faked peer review is obviously problematic. But others define predatory journals as any journal whose publisher trades quality of peer review for business purposes — including journals from for-profit publishers where editorial boards are told to arbitrarily increase the volume of accepted works for fiscal goals (a common practice at many "reputable" sources).

Universities have identified their own lists of deceptive publishers and use OpenAlex data to understand trends in those publishers — to plan, implement, and evaluate strategies that support their researchers. Without the ability to analyze these publishers, counter-measures to protect researchers and the integrity of science are difficult.

## Filtering to higher-quality sources: allow lists

OpenAlex's broader philosophy is to prefer **allow lists** (curated lists of trusted sources) over **deny lists** (lists of sources to exclude). Allow lists are more transparent about what they include, easier to maintain, and avoid the cat-and-mouse dynamic of trying to keep up with bad actors who can simply rebrand. They're a more robust foundation for information retrieval.

To that end, OpenAlex carries filters that narrow results to more trusted sources:

- [Indexed in DOAJ](https://openalex.org/works?page=1&filter=primary_location.source.is_in_doaj:true) (`is_in_doaj`)
- [Included in the CWTS Core sources list](https://openalex.org/works?page=1&filter=primary_location.source.is_core:true) (`is_core` — see [Sources](/docs/sources/) for what CWTS Core is)

More filters like these are planned. The goal is a kind of "quality vs. quantity" slider that users can adjust to meet their information needs.

Because of the open nature of the database, a list of journals to *exclude* can easily be developed by one user and shared with others at their institution. If you have questions about which sources to exclude from an analysis, check with your local librarian to see if they've curated such a list.

## Fully-OA journals

Whether a journal is **fully open access** matters beyond the journal itself: it determines the [OA status](/docs/open-access-oa/) of the works inside it. An OA article in a fully-OA journal is **gold**; the same article in a toll-access journal would be **hybrid** or **bronze**. Two source fields record the determination:

- **`is_in_doaj`** — the journal is indexed in the [Directory of Open Access Journals](https://doaj.org/) (about 23,000 sources). DOAJ verifies the credibility and legitimacy of the journals it indexes; OpenAlex does not do its own vetting, so use this field when legitimacy matters to your question.
- **`is_oa`** — the journal is fully OA, whether or not DOAJ lists it (about 64,000 journals).

DOAJ membership answers the question immediately: if a journal is in DOAJ, it's fully OA (`is_oa=true`, `is_in_doaj=true`). But not all fully-OA journals are indexed in DOAJ — particularly smaller titles and journals published in the developing world. For journals *not* in DOAJ, OpenAlex applies two additional checks:

1. **Is it from a known fully-OA publisher?** OpenAlex maintains a small allow list of publishers that publish only OA content (for instance, many publishers using the SciELO model).
2. **Does the journal publish only OA articles?** Because OpenAlex indexes the complete output of every journal, it can observe whether a journal publishes exclusively OA content. This automatic determination credits smaller publishers who might not know about DOAJ or have the resources to register. Some journals are also set fully-OA after manual review.

A journal passing either check gets `is_oa=true`, `is_in_doaj=false`.

The observation-based check also detects **flipped journals** — journals that switched from toll-access to OA at some "flip date." An OA article published in that journal *before* the flip is hybrid or bronze (it appeared in a then-toll-access journal); an OA article published *after* the flip is gold. See [Open Access](/docs/open-access-oa/) for the full status taxonomy.

## APC data

The **article processing charge** (APC) is the fee some journals charge authors to publish a work as open access (gold or hybrid). OpenAlex reports APCs at both levels:

- **Source level**: `apc_prices` (list price per currency) and `apc_usd` on the [Source object](/api/sources/).
- **Work level**: `apc_list` (the journal's list price) and `apc_paid` (what was actually paid, when known) on the [Work object](/api/works/).

`apc_paid` comes from [OpenAPC](https://openapc.net/), which aggregates institutions' self-reported actual payments. When no OpenAPC record exists — the large majority of works — `apc_list` falls back to the journal's list price, sourced from [DOAJ](https://doaj.org/) plus additional manual curation.

These are **estimates in a market that isn't transparent**, and two limitations are worth knowing:

- **List prices are current-year only.** OpenAlex stores one list price per journal, so an estimate for an older work applies today's price to a year when the journal may have charged less. APCs change yearly.
- **Coverage skews gold.** DOAJ-derived prices cover fully-OA journals well, but hybrid journals — where much APC spending actually happens — have much thinner list-price data.

For year-by-year APC list prices, [Butler et al. 2024](https://doi.org/10.7910/DVN/CR1MMV) (Harvard Dataverse, CC0) provides publisher price lists per journal per year, 2019–2023, for six large publishers (Elsevier, Springer Nature, Wiley, MDPI, Frontiers, PLOS) — 8,711 journals covering roughly half the world's gold and hybrid output. OpenAlex is evaluating integrating this dataset (an expanded release covering more publishers and years is expected in 2026); until then, it's the best companion resource for historical APC analysis.

For a worked example of estimating institutional APC spend — including the assumptions involved — see [Estimate the APC fees my institution has paid](/learn/estimate-the-apc-fees-my-institution-has-paid-to-make-research-open-ac/).

## Related pages

- [Sources](/docs/sources/) — source types, locations, and curated lists
- [Open Access](/docs/open-access-oa/) — the OA status taxonomy and how statuses are assigned
- [How can I fix errors in an OpenAlex Source profile?](/help/how-can-i-fix-errors-in-an-openalex-source-profile/)
