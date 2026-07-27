---
title: "Why are only some of my repository records showing up in openalex?"
description: "OpenAlex mints new records when one of our trusted repositories (Crossref, PubMed, DataCite, HAL, etc) registers a new work. We then look for open access versions of that work i…"
tags: ["data"]
source_id: "27188355855639"
source_url: "https://help.openalex.org/hc/en-us/articles/27188355855639-Why-are-only-some-of-my-repository-records-showing-up-in-openalex"
source_updated: "2024-10-19"
---
OpenAlex mints new records when one of our trusted repositories (Crossref, PubMed, DataCite, HAL, etc) registers a new work. We then look for open access versions of that work in institutional repositories. If we find an open access version of the work, we link to it and that repository becomes a source of one version of that record. Then, that repository can be applied as a filter in OpenAlex.

But we do not mint records for works in institutional repositories (at the moment). And so you might find your repository listed as a source of some OA versions of OpenAlex records, but that number will always be smaller than your repository volume.

We have noticed that some of our records from Microsoft Academic Graph only (i.e., not in our other repositories) list institutional repositories as the sole source for their record. That coverage doesn't seem comprehensive either and should not apply to any publications since MAG shut down in 2022.

To see which repositories we scan for open access versions of our works, or to suggest your repository, head to: [https://unpaywall.org/sources](https://unpaywall.org/sources)
