---
title: "Why is affiliation history metadata incomplete?"
description: "In the author endpoint, we nest a lot of metadata as helpful shortcuts that aren't always complete and up to date. For instance, the citation counts for an author are only recal…"
tags: ["data"]
source_id: "29664870327447"
source_url: "https://help.openalex.org/hc/en-us/articles/29664870327447-Why-is-affiliation-history-metadata-incomplete"
source_updated: "2025-01-31"
---
In the author endpoint, we nest a lot of metadata as helpful shortcuts that aren't always complete and up to date. For instance, the citation counts for an author are only recalculated every few months-- it's still helpful in most use cases to have that data there, but some use cases require up to date information and so they need to do live queries on the database for all the citations of all the authors of author X.

For the author's current (or last known) affiliation, we add the years they have published at that affiliation, but only up to 10 years. This can be really helpful to understand recent changes in author affiliations, but can't give you the full history of authors who were at institutions longer than a decade. 

For instance, my PhD supervisor started working at UBC in 2005. His [author profile endpoint](https://api.openalex.org/people/A5032113172) only returns the last 10 years for him at UBC (2015-2024). If you need full history, you can filter works by the author ID, add the affiliation of interest as a secondary filter, and then group\_by years to get all the years an author has published with a specific affiliation. [Filtering by his author profile and UBC](https://api.openalex.org/works?group_by=publication_year&per_page=200&filter=authorships.author.id:a5032113172,authorships.institutions.lineage:i141945490) returns publications starting in 2006.
