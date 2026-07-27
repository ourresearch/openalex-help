---
title: "Author disambiguation"
description: "How OpenAlex identifies and links authors across millions of scholarly works."
tags: ["data"]
source_id: "24347048891543"
source_url: "https://help.openalex.org/hc/en-us/articles/24347048891543-Author-disambiguation"
source_updated: "2026-03-06"
---
How OpenAlex identifies and links authors across millions of scholarly works.

## The challenge

Scholarly works list author names in all sorts of ways. "J. Smith," "John Smith," and "John A. Smith" might all be the same person — or three different people. OpenAlex uses machine learning to figure out which works belong to the same real-world author, even when names vary.

## How it works

Our disambiguation algorithm considers six factors when deciding whether two authorship records belong to the same person:

1.  **Name similarity** — String matching across different name variants
2.  **Co-author patterns** — Shared collaborators across papers
3.  **Institutional affiliations** — Consistent workplace signals
4.  **Research topics** — Whether the publication record is topically coherent
5.  **Citation patterns** — Self-citation and reference overlap
6.  **ORCID** — When available, this provides an authoritative identity signal

So if "J. Schmidt" and "John Jacob Jingleheimer Schmidt" both write about 19th-century ketchup production at the same university, we'll treat them as one author. But we won't lump in the J.J.J. Schmidt who writes about weasel migration, even though the names match.

Our author data comes from Crossref, PubMed, ORCID, publisher websites, and the legacy Microsoft Academic Graph.

## The July 2023 upgrade

In July 2023, OpenAlex switched to a significantly improved disambiguation system. The upgrade included:

-   A better machine learning model for clustering
-   Smarter assignment strategies for newly published works
-   Deeper integration with ORCID data

As part of that switch, we deprecated all of the old OpenAlex Author IDs and assigned new Author IDs to all authors. You can find the old Author IDs, along with their associated works, [as a data dump here](https://zenodo.org/record/8189450). New Author IDs have a numeric component of their OpenAlex ID >5000000000. The new Author IDs have been used since late July 2023, and in the data snapshots starting in August 2023.

## NULL authors (A9999999999)

You might occasionally see the special author ID `A9999999999`. This represents authorships that didn't go through the disambiguation process. This typically happens when:

-   No author name was received from the data source
-   The name was too short or too long to disambiguate reliably
-   The name matched an ignored phrase like "Unknown Author"

These records are grouped under the single NULL author rather than being assigned to real author profiles. See [this article](https://help.openalex.org/hc/en-us/articles/28763618477975) for more information.

## Fixing errors

Disambiguation isn't perfect. Sometimes authors get incorrectly split into multiple profiles, or works from different people get merged into one profile. Author profile attributes like alternative names, institutions, metrics, and topics are all derived from linked publications, so they can't be edited directly.

If you notice errors in an author profile, you can submit a correction request through the [OpenAlex help center](https://help.openalex.org/hc/en-us/articles/27283405287319) or use our [author curation form](https://docs.google.com/forms/d/e/1FAIpQLSeHpt3yWbWoB5MK1K6wVWThI5fglZzk-GPniaih0JT_rCMdYA/viewform).

## Code, data, and methods

Our methods, code, and trained models are fully open source:

-   [openalex-name-disambiguation](https://github.com/ourresearch/openalex-name-disambiguation/tree/main/V3) — Python code, methods, and training data
-   [Live disambiguation code](https://github.com/ourresearch/openalex-databricks/tree/main/jobs/author_name_disambiguation/v3) — Production disambiguation pipeline

For more on the Author object and available filters, see the [Author API documentation](https://docs.openalex.org/api-entities/authors).
