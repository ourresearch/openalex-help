---
title: "How can I fix errors in an OpenAlex Source profile?"
description: "Disambiguating text about publication venues into the correct Sources is foundational to most bibliometric and research intelligence use case. Our approach is to use the informa…"
tags: ["general"]
source_id: "27572320730647"
source_url: "https://help.openalex.org/hc/en-us/articles/27572320730647-How-can-I-fix-errors-in-an-OpenAlex-Source-profile"
source_updated: "2024-11-05"
---
Disambiguating text about publication venues into the correct Sources is foundational to most bibliometric and research intelligence use case. Our approach is to use the information available us from records on research outputs (publication title and identifiers like ISSN). Algorithmic approaches have gotten really good recently, but they aren't perfect.

In early 2025, we're planning some slick upgrades to OpenAlex to facilitate curation requests at scale. In the meantime, we've created a google form to help user provide us information to help fix errors in OpenAlex author profiles that we can ingest to improve the database.

[Use this form](https://docs.google.com/forms/d/e/1FAIpQLSehRQBTvckqFhmbTLruRxu-GEOuaIpZWGBI4PDGcI4E4kZqWQ/viewform?usp=sf_link) users can:

1.  fix the source display name
2.  merge source profiles (when multiple exist for the same source)
3.  fix the OA status of the source
4.  update the indexed in DOAJ status
5.  update the APC list price
6.  fix the source type
7.  update the host organization
8.  update the ISSN numbers
9.  update the source's homepage URL

Once we receive curation requests, our team will validate those requests and fix in the OpenAlex database. Fixes typically takes 3-4 weeks go be live in our system, but may take longer if we are unable to verify the changes suggested. 

Other attributes about source profiles (e.g., works counts, metrics, topics) cannot be directly edited in a source profile because they are derived from the publications linked to that source profile. However, when changes are made that impact the linking of publications to a source profile (2 & 8 above), those fields will get updated in the source profile.
