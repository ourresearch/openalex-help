---
title: "Why is the date field wrong and how can I fix it?"
description: "Date metadata is surprisingly complex. For instance, a paper can have dates for when a journal mints a DOI for it, the date it is accepted, the date it is 'published', and the d…"
tags: ["data"]
source_id: "29664482972183"
source_url: "https://help.openalex.org/hc/en-us/articles/29664482972183-Why-is-the-date-field-wrong-and-how-can-I-fix-it"
source_updated: "2025-01-31"
---
Date metadata is surprisingly complex. For instance, a paper can have dates for when a journal mints a DOI for it, the date it is accepted, the date it is 'published', and the date of publication of the journal issue that contains it. There are sometimes a dozen related fields for date for the same record. Preprints can also be published years before a journal-hosted version of the work is published.

To be consistent across the OpenAlex database, our approach is to take the earliest date in fields available for the record. And usually that does a pretty good job.

For instance, [this work](https://openalex.org/works/w2097486863) was first published in 2003, but registered as being published in 2017 and registered as being indexed in 2025. So we chose 2003 as the publication date. On the other hand, [this work](https://openalex.org/works/w2567372134) was first published in 2016, so even though the volume it is contained in didn't come out until 2017, we selected 2016 as the publication date. 

Because of this complexity, we don't currently support user curation of date metadata. If you spot what you believe is a different type of error in the metadata, check first with [Crossref](https://search.crossref.org/)\-- fixes there will automaticaly make their way into OpenAlex. If you believe it is an error on our end, let us know by writing to [support@openalex.org](mailto:support@openalex.org).
