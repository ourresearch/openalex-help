---
title: "Where does your citation information come from?"
description: "When we create a new work record, we source information on the papers referenced by that work from the source of the record (Crossref, PubMed, etc.). When the work is open acces…"
tags: ["reference"]
source_id: "31459794276759"
source_url: "https://help.openalex.org/hc/en-us/articles/31459794276759-Where-does-your-citation-information-come-from"
source_updated: "2025-04-16"
---
When we create a new work record, we source information on the papers referenced by that work from the source of the record (Crossref, PubMed, etc.). When the work is open access, we can also extract information on these references directly from the PDF. 

We then try to match that information to existing works in OpenAlex, using DOIs and other bibliographic information when there is no DOI. If we are able to match the reference in a new work to an existing old work, that linkage counts as a citation of the old work and a reference in the new work.

And so the cited\_by count for a work in OpenAlex is the number of times that we found information on that work in the references of other works and were successful in matching that information to the original record.
