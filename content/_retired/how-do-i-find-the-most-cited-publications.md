---
title: "How do I find the most cited publications?"
description: "Sort any works search by citation count — it's the default sort, on both the website and the API."
tags: ["general"]
source_id: "27219504981655"
source_url: "https://help.openalex.org/hc/en-us/articles/27219504981655-How-do-I-find-the-most-cited-publications"
source_updated: "2024-10-21"
---
In the OpenAlex user interface and API, you can sort any works search by the number of citations received. In fact, the default sort is descending citation count, so you'll get the highest cited works first. For instance: [https://openalex.org/works](https://openalex.org/works) returns 260M+ works, but lists them in order of decreasing citation count with the highest cited works first.

When you use text search as a filter, the default sorting changes to how relevant the works are compared to your search terms. For instance: [https://openalex.org/works?page=1&filter=default.search%3Akelp](https://openalex.org/works?page=1&filter=default.search%3Akelp) returns publications containing 'kelp' in the fulltext search and sorts them with the most relevant results first. 

If you want to change to sort by citation count, simply click the sort button above the works and select "citation count". You'll notice the URL changes to [https://openalex.org/works?page=1&filter=default.search%3Akelp&sort=cited\_by\_count%3Adesc](https://openalex.org/works?page=1&filter=default.search%3Akelp&sort=cited_by_count%3Adesc) and the last part of the URL specifies that you want the most cited works first.

If you want to only see journal publications, add work type = article and source type = journal to your filters, e.g., [https://openalex.org/works?page=1&filter=type%3Atypes%2Farticle,primary\_location.source.type%3Asource-types%2Fjournal](https://openalex.org/works?page=1&filter=type%3Atypes%2Farticle,primary_location.source.type%3Asource-types%2Fjournal) 

If you want to limit your results to only the top cited works, [read how here](/how-to/how-do-i-limit-my-results-to-only-the-top-100-cited-publications/).
