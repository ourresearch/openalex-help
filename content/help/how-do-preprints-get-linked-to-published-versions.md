---
title: "How do preprints get linked to their published versions?"
description: "A quick answer to how OpenAlex connects a preprint to the published article."
tags: ["works"]
synonyms: ["preprint", "published version", "version of record", "accepted manuscript"]
canonical: /data/locations/
---
In OpenAlex, a preprint and its published article are usually the **same work**, not two separate ones. A work can live in several places at once — a preprint server, a repository, the publisher's site — and OpenAlex records each as a [location](/data/locations/) on that one work, each tagged with its version (`submittedVersion`, `acceptedVersion`, or `publishedVersion`).

OpenAlex links these copies together mainly by shared identifiers (a preprint and its published version often reference the same DOI or are cross-registered) and metadata matching on title, authors, and dates. When the match succeeds, the [`primary_location`](/data/works/#primary_location) points at the version of record and the preprint appears among the work's other [`locations`](/data/works/#locations). Sometimes the link is missed and the two exist as separate works until a later match merges them.

For how versions and locations work in full, see [Locations](/data/locations/).
