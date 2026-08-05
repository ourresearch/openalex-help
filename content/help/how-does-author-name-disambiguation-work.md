---
title: "How does author name disambiguation work?"
description: "A quick answer to how OpenAlex decides which papers belong to which author."
tags: ["authors"]
synonyms: ["author disambiguation", "same name", "merged authors", "AER"]
canonical: /entities/authors/#how-we-build-it
---
Author names are ambiguous — lots of people share a name, and one person's name can be written many ways — so OpenAlex doesn't just group papers by matching text. Instead, every authorship starts as a raw name printed on a work, and a machine-learning system decides which raw names across millions of works belong to the *same real person*, minting one [OpenAlex Author ID](/entities/overview/#the-openalex-id-scheme) for each.

It weighs several signals together: [ORCID](https://orcid.org/) iDs when present (the strongest signal), co-authors, institutional affiliations, topics, sources, and citation patterns. Because it's a prediction, it's sometimes wrong — two people can get merged into one profile, or one person split across several. When that happens you can [correct the profile](/help/how-can-i-fix-errors-in-an-openalex-author-profile/).

For the full story — the signals, the null-author bucket, and the known failure modes — see [how we build authors](/entities/authors/#how-we-build-it).
