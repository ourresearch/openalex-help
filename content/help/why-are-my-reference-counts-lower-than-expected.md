---
title: "Why are my reference counts lower than expected?"
description: "A work's referenced_works list can be shorter than the reference list in its PDF or Crossref record. Here's why."
tags: ["general"]
source_id: "27810109633943"
source_url: "https://help.openalex.org/hc/en-us/articles/27810109633943-The-reference-counts-in-OpenAlex-seem-off-Why-is-that"
source_updated: "2024-11-14"
---
A work's `referenced_works` list can be shorter than the reference list you see in its PDF or Crossref record. That's expected, and it comes down to how OpenAlex builds citations: it lists a reference only when it can match it to another work already in OpenAlex.

The usual reasons a reference doesn't appear:

- The cited work isn't in OpenAlex, so there's nothing to link to.
- The source record's references differ from the final published PDF.
- The source record includes no references, and PDF parsing missed some.
- The reference has no DOI, so metadata-only matching didn't find it.

For the full explanation of how citation and reference data is built, see [Citations](/data/works/#citations-and-references) in the docs.
