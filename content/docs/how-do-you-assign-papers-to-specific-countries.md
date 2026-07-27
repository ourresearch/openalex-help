---
title: "How do you assign papers to specific countries?"
description: "We get information on an author's affiliation from many sources (e.g., Crossref, PDFs, repositories) but always as text, not linked to specific institutions or countries. We use…"
tags: ["reference"]
source_id: "31485900551319"
source_url: "https://help.openalex.org/hc/en-us/articles/31485900551319-How-do-you-assign-papers-to-specific-countries"
source_updated: "2025-04-17"
---
We get information on an author's affiliation from many sources (e.g., Crossref, PDFs, repositories) but always as text, not linked to specific institutions or countries. We use algorithmic approaches to match that text to known institutions in [ROR](https://www.ror.org) (more on that [here](https://help.openalex.org/hc/en-us/articles/24831328396311-Institutions-and-Raw-Affiliation-String-Parsing)). ROR records have an affiliation country in their metadata and so we assign country based on that matching.

Sometimes, we get affiliation text that we cannot match to known ROR records but there might still be information on the country in the address field that we are able to identify. In those cases, we directly assign a country code without using ROR.
