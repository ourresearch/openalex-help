---
title: "Do you index DataCite DOIs?"
description: "We have started work to include DataCite(https://datacite.org/) as a core, trusted repository to mint new works in OpenAlex, but we've run into a number of issues that are preve…"
tags: ["data"]
source_id: "27629361012119"
source_url: "https://help.openalex.org/hc/en-us/articles/27629361012119-Do-you-index-DataCite-DOIs"
source_updated: "2024-11-07"
---
We have started work to include [DataCite](https://datacite.org/) as a core, trusted repository to mint new works in OpenAlex, but we've run into a number of issues that are preventing us from being able to complete the ingest and have all DataCite works in OpenAlex. At the time of writing this post \[7 November 2024\], we currently have 6.4M works from DataCite in OpenAlex. We are currently working on a significant rewrite to our main source code that will help us complete the ingest of DataCite records into OpenAlex. We hope to have this work completed in early 2025.

In the meantime, if you want to track our progress on the DataCite ingest, you can do that using this query: [api.openalex.org/works?group\_by=type&per\_page=200&filter=indexed\_in:datacite](https://api.openalex.org/works?group_by=type&per_page=200&filter=indexed_in:datacite)
