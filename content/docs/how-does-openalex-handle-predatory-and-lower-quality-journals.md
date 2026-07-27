---
title: "How does OpenAlex handle predatory and \"lower-quality\" journals?"
description: "Unlike legacy indexes, OpenAlex does not try to maintain an arbitrary \"quality\" bar. We cover all scholarly works."
tags: ["data"]
source_id: "27719473439511"
source_url: "https://help.openalex.org/hc/en-us/articles/27719473439511-How-does-OpenAlex-handle-predatory-and-lower-quality-journals"
source_updated: "2026-05-09"
---
Unlike legacy indexes, OpenAlex does not try to maintain an arbitrary "quality" bar. We cover all scholarly works.

Overall, our inclusion criteria are more like ArXiv than Web of Science. There are many advantages to this approach:

-   "Lower-quality" sources may be useful as objects of study or pedagogy in their own right (e.g., the study of retracted papers).
-   Many sources are "lower-quality" for some purposes but adequate or ideal for others — including grey literature, regional literature, and literature from early-career researchers or students.
-   "Lower-quality" literature, in aggregate, can be useful for systematic review and literature-based discovery. An individual small study may have low statistical power on its own, but combining many such studies in a meta-analysis yields high statistical power and can reveal effects no single study could establish.
-   Literature of excellent quality is sometimes excluded from traditional indexes simply because it isn't in English or comes from the Global South; this perpetuates inequity.

Most importantly, "lower-quality" content can always be filtered out if it's included — it can't be added if it's not.

## Predatory journals

Predatory journals and deceptive conferences are especially thorny because there is no authoritative list, the lists change over time, and there is a wide range of behaviors that some include in the definition and others do not. Faked peer review is obviously problematic. But others define predatory journals as any journal whose publisher trades quality of peer review for business purposes — including journals from for-profit publishers where editorial boards are told to arbitrarily increase the volume of accepted works for fiscal goals (a common practice at many "reputable" sources).

We have universities who have identified their own lists of deceptive publishers and are using OpenAlex data to understand trends in those publishers, in order to plan, implement, and evaluate strategies that support their researchers. Without the ability to analyze these publishers, counter-measures to protect researchers and the integrity of science are difficult.

## Filtering for higher-quality sources

Our broader philosophy is to prefer **allow lists** (curated lists of trusted sources) over **deny lists** (lists of sources to exclude). Allow lists are more transparent about what they include, easier to maintain, and avoid the cat-and-mouse dynamic of trying to keep up with bad actors who can simply rebrand. They're a more robust foundation for information retrieval.

To that end, we've implemented filters that help users narrow results to more trusted sources:

-   [indexed in DOAJ](https://openalex.org/works?page=1&filter=primary_location.source.is_in_doaj:true)
-   [included in the CWTS Core sources list](https://openalex.org/works?page=1&filter=primary_location.source.is_core:true)

We plan to add more filters like these. The goal is a kind of "quality vs. quantity" slider that users can adjust to meet their information needs.

Because of the open nature of our database, a list of journals to exclude can easily be developed by one user and shared with others at their institution. If you have questions about which sources to exclude from an analysis, check with your local librarian to see if they've curated such a list.
