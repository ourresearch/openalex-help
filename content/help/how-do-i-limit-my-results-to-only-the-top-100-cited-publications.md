---
title: "How do I limit my results to only the top 100 cited publications?"
description: "The easiest way to do this in the user interface is to add a filter to your search that specifies a threshold of number of citations needed to be included in the search and matc…"
tags: ["general"]
source_id: "27220103769879"
source_url: "https://help.openalex.org/hc/en-us/articles/27220103769879-How-do-I-limit-my-results-to-only-the-top-100-cited-publications"
source_updated: "2024-10-21"
---
The easiest way to do this in the user interface is to add a filter to your search that specifies a threshold of number of citations needed to be included in the search and matching that threshold to the number of citations received by the 100th most cited work. Here's how you can do that.

Finding the right citation threshold to add:

-   Once you have added all the filters you want to your analysis, sort by citation count ([more info here](/help/how-do-i-find-the-most-cited-publications/))
-   then click the three vertical dots next to the sort button to select 100 results per page
-   scroll to the bottom and find the number of citations received by the last work (i.e., the 100th most cited)
-   this number is the threshold you'll add. as i am typing this, [my example looking at UBC journal articles](https://openalex.org/works?page=1&filter=type%3Atypes%2Farticle,primary_location.source.type%3Asource-types%2Fjournal) finds that threshold should be 2,516 citations
-   \[optional\] if you want a number different than 10 or 100 (defaults in the UI), you can change the per\_page= # directly in the UI 

Adding the citation threshold filter:

-   in the filters' section at the top of the openalex user interface, hit the blue plus sign to add a filter
-   then select "... More" and "citation count"
-   enter the threshold you determined above and a hypen, e.g., 2516- and hit enter
    -   adding the hyphen means return any works with at least 2516 citations
-   now the user interface should update automatically so you can export or analyze your subset
    -   if the Results count is greater than you expect (e.g., 103 instead of 100) that means several works were tied for the 100th most cited spot
