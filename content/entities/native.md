---
title: "Overview"
description: "Entities where OpenAlex mints its own IDs, encoding our own judgment calls about real-world boundary disputes."
tags: ["reference"]
---
**Native** entities are the ones where OpenAlex mints its own IDs — `W123` for a [work](/entities/works/), `A456` for an [author](/entities/authors/), `S789` for a [source](/entities/sources/) — and each ID encodes a judgment call about a genuine real-world boundary dispute:

- Are these two records the *same work*, or two different ones?
- Is this cluster of papers all by *one author*, or several people who share a name?
- Is "Springer Nature" the same [publisher](/entities/publishers/) as "Springer Verlag"?
- Does this affiliation string mean the University of Washington or Washington University?

There's no external authority we can just look up for these; the answer is OpenAlex's best inference, and it can be wrong. That's why native entities are the ones you can [correct through curation](/entities/curations/), and why every native entity page has a **How we build it** section explaining where the records come from, what we do to disambiguate them, and the known failure modes.

## The native entities

- [**Works**](/entities/works/) — every scholarly document. The core entity; everything else connects to works.
- [**Authors**](/entities/authors/) — the people who create works, [disambiguated](/entities/authors/#how-we-build-it) from raw authorship strings.
- [**Sources**](/entities/sources/) — journals, conferences, repositories, and other venues where works appear.
- [**Publishers**](/entities/publishers/) — the organizations behind sources, arranged in a hierarchy.
- [**Funders**](/entities/funders/) — the organizations that fund research.
- [**Awards**](/entities/awards/) — specific grants, linking funders to the works they funded.
- [**Institutions**](/entities/institutions/) — universities, companies, hospitals, and other organizations authors are affiliated with.

Compare these with [vocabulary entities](/entities/vocabulary/), where there's no boundary to adjudicate — just a consistent handle on something that already exists crisply.
