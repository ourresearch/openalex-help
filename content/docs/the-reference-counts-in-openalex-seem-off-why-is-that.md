---
title: "The reference counts in OpenAlex seem off. Why is that?"
description: "For each Work in OpenAlex, we have a field called referenced\\works(https://docs.openalex.org/api-entities/works/work-objectreferencedworks) that is meant to list the works that…"
tags: ["data"]
source_id: "27810109633943"
source_url: "https://help.openalex.org/hc/en-us/articles/27810109633943-The-reference-counts-in-OpenAlex-seem-off-Why-is-that"
source_updated: "2024-11-14"
---
For each Work in OpenAlex, we have a field called [referenced\_works](https://docs.openalex.org/api-entities/works/work-object#referenced_works) that is meant to list the works that were cited by that publication. The number of references included in OpenAlex for a particular work might be less than you observe in the PDF or even the Crossref record for that publication. There are a few reasons why that might be the case.

-   for a work to be included in the referenced\_works section, it must be a work that is in OpenAlex and so if one of the references isn't indexed in OpenAlex, we won't be able to include it in that section;
-   sometimes the references included in the Crossref record for a publication differ from the reference section in the final PDF if references get added in production;
-   often, references aren't included in the Crossref record for a publication-- in those situations, we try to get the references from the pdf directly, but parsing errors can happen and we can miss some of them;
-   when we get reference information from Crossref or the PDF, we first try to match to OpenAlex works based on DOI (with high efficiency)-- when DOIs aren't included we try to match based on other metadata, but have less success in those situations.
