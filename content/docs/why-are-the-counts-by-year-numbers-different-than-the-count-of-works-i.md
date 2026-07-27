---
title: "Why are the counts_by_year numbers different than the count of works in a year?"
description: "The counts\\by\\year field is pre-calculated and then stored in entities (like institution, author, source) as a shortcut for users. It gets updated every few months, but it is ou…"
tags: ["data"]
source_id: "27250895840791"
source_url: "https://help.openalex.org/hc/en-us/articles/27250895840791-Why-are-the-counts-by-year-numbers-different-than-the-count-of-works-in-a-year"
source_updated: "2024-10-22"
---
The counts\_by\_year field is pre-calculated and then stored in entities (like institution, author, source) as a shortcut for users. It gets updated every few months, but it is out of sync almost immediately after it is calculated. For instance, at the time of making this post, if I look at the journal of phycology: [https://api.openalex.org/sources/S164789166](https://api.openalex.org/sources/S164789166) I see 89 works in 2024 in the work entity but if I filter works by the source and then group by publication year: [https://api.openalex.org/works?group\_by=publication\_year&per\_page=200&filter=primary\_location.source.id:s164789166](https://api.openalex.org/works?group_by=publication_year&per_page=200&filter=primary_location.source.id:s164789166) there are 90 works in 2024 because a new work has already been published since it was last calculated.  
   
This number can also change when we add new works to an entity from previous years as well. for instance, if a journal adds new records to Crossref from previous years (not uncommon) or if we make changes to that journal in our data as our disambiguation algorithms get better.
