---
title: "Overview"
updated: 2026-08-11
description: "Entities where OpenAlex mints its own IDs, encoding our own judgment calls about real-world boundary disputes."
tags: ["reference"]
---
**Native** entities are the ones where OpenAlex mints its own IDs — `W123` for a [work](/data/works/), `A456` for an [author](/data/authors/), `S789` for a [source](/data/sources/) — and each ID encodes a judgment call about a genuine real-world boundary dispute:

- Are these two records the *same work*, or two different ones?
- Is this cluster of papers all by *one author*, or several people who share a name?
- Is "Springer Nature" the same [publisher](/data/publishers/) as "Springer Verlag"?
- Does this affiliation string mean the University of Washington or Washington University?

There's no external authority we can just look up for these; the answer is OpenAlex's best inference, and it can be wrong. That's why native entities are the ones you can [correct through curation](/data/curations/), and why every native entity page has an **About** section explaining where the records come from, what we do to disambiguate them, and the known failure modes.

## The native entities

- [**Works**](/data/works/) — every scholarly document. The core entity; everything else connects to works.
- [**Authors**](/data/authors/) — the people who create works, [disambiguated](/data/authors/#about) from raw authorship strings.
- [**Sources**](/data/sources/) — journals, conferences, repositories, and other venues where works appear.
- [**Publishers**](/data/publishers/) — the organizations behind sources, arranged in a hierarchy.
- [**Funders**](/data/funders/) — the organizations that fund research.
- [**Awards**](/data/awards/) — specific grants, linking funders to the works they funded.
- [**Institutions**](/data/institutions/) — universities, companies, hospitals, and other organizations authors are affiliated with.

Compare these with [vocabulary entities](/data/vocabulary/), where there's no boundary to adjudicate — just a consistent handle on something that already exists crisply.
