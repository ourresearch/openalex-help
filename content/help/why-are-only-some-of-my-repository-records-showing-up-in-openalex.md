---
title: "Why are only some of my repository records showing up in openalex?"
description: "Repository records appear as versions of known works in the core corpus; unmatched records live in the expansion corpus, excluded from results by default."
tags: ["data"]
source_id: "27188355855639"
source_url: "https://help.openalex.org/hc/en-us/articles/27188355855639-Why-are-only-some-of-my-repository-records-showing-up-in-openalex"
source_updated: "2024-10-19"
---
OpenAlex mints new records when one of our trusted registration sources (Crossref, PubMed, DataCite, HAL, etc.) registers a new work. We then look for open access versions of that work in repositories. If we find one, we link to it, and your repository becomes the source of one *version* of that record — that's what you're seeing when your repository appears as a source.

By default, that's the only way your repository's records show up: search and filter results show the **core corpus**, where repository records appear only when they matched an already-known work. So the count will always be smaller than your repository's actual volume.

Your unmatched records may still be in OpenAlex, though. Since the November 2025 Walden update, repository records that don't match an existing work can be minted as works in the **expansion corpus**. Those are excluded from API results by default — add `include_xpac=true` to your query to include them, which for many repositories changes the count dramatically.

Two other things can hold the count down:

- **Metadata-dependent matching.** Records without a cleanly reported DOI (or a matchable title and first author) can fail to match. See [Repository records](/docs/repository-records/) for the metadata guidelines.
- **A historical wrinkle.** Some records inherited from Microsoft Academic Graph (which shut down in 2022) list an institutional repository as their sole source. That legacy coverage was never comprehensive.

To see which repositories we harvest, or to suggest yours: [https://unpaywall.org/sources](https://unpaywall.org/sources)
