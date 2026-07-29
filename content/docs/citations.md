---
title: "Citations"
description: "How OpenAlex builds citation and reference data — where it comes from, how references are matched to works, and why a work's reference count can look lower than expected."
tags: ["reference"]
source_id: "31459794276759"
source_url: "https://help.openalex.org/hc/en-us/articles/31459794276759-Where-does-your-citation-information-come-from"
source_updated: "2025-04-16"
---
Every work in OpenAlex carries a list of the works it cites (`referenced_works`) and a count of the works that cite it (`cited_by_count`). Both are built from the same underlying process: extracting each work's reference list, then matching those references to other works already in OpenAlex.

## Where citation data comes from

When OpenAlex creates a work record, it pulls that work's reference list from the source of the record — Crossref, PubMed, and similar. When the work is open access, OpenAlex can also extract references directly from the PDF, which fills gaps for works whose source records omit references.

Each extracted reference is then matched to an existing work. Matching is done first by DOI (highly reliable) and, when no DOI is present, by other bibliographic metadata (less reliable). A successful match creates a linkage that counts as a **reference** in the citing work and a **citation** of the cited work. A work's `cited_by_count` is simply the number of times OpenAlex found it in another work's references and matched the two successfully.

## Why a reference count can look lower than expected

Because citations are built by matching, a work's `referenced_works` list can be shorter than the reference list you see in its PDF or Crossref record. The common reasons:

- **The cited work isn't in OpenAlex.** A reference can only appear in `referenced_works` if the work it points to is itself indexed. References to works OpenAlex doesn't have are dropped.
- **The source record's references differ from the final PDF.** References are sometimes added late in production, so the Crossref record and the published PDF don't always agree.
- **References are missing from the source record.** Many Crossref records include no references at all. OpenAlex then tries to recover them from the PDF, but PDF parsing can miss some.
- **No DOI to match on.** When a reference has no DOI, OpenAlex falls back to metadata matching, which succeeds less often — so some real references go unlinked.

For the short version of this, see [Why are my reference counts lower than expected?](/help/why-are-my-reference-counts-lower-than-expected/) in the Help center.
