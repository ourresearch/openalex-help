---
title: "Is there a limit to the length of queries in OpenAlex?"
description: "Queries in OpenAlex are currently limited to URLs with a total length of 2,048 characters. We're working on a new way of querying the database that is not limited by URL length…"
tags: ["general"]
source_id: "30207962890647"
source_url: "https://help.openalex.org/hc/en-us/articles/30207962890647-Is-there-a-limit-to-the-length-of-queries-in-OpenAlex"
source_updated: "2025-02-24"
---
Queries in OpenAlex are currently limited to URLs with a total length of 2,048 characters. We're working on a new way of querying the database that is not limited by URL length so stay tuned for that. 

In the meantime, if you need to have longer queries, try breaking your query into multiple queries, exporting the results and then combining-- it will be easiest to do this in sections that are combined with OR and then when you combine results, you can deduplicate based on the OpenAlex work ID to get rid of duplicates introduced by multiple searches independently.
