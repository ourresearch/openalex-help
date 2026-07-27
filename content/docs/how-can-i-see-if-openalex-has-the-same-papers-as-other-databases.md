---
title: "How can I see if OpenAlex has the same papers as other databases?"
description: "Individually, you can search for paper titles or DOIs in the openalex.org(http://openalex.org/) search bar. For instance, try pasting doi:10.1111/j.1529-8817.2012.01224.x into t…"
tags: ["data"]
source_id: "28926687341207"
source_url: "https://help.openalex.org/hc/en-us/articles/28926687341207-How-can-I-see-if-OpenAlex-has-the-same-papers-as-other-databases"
source_updated: "2025-01-02"
---
Individually, you can search for paper titles or DOIs in the [openalex.org](http://openalex.org/) search bar. For instance, try pasting _doi:10.1111/j.1529-8817.2012.01224.x_ into the search bar and the paper should come up as a suggestion.

But if you're looking at scale, you can look them up in large volumes through our [API](https://docs.openalex.org/) or use something like the [Open Research Converter](https://orc-demo.gesis.org/) to turn a long list of DOIs into OpenAlex work ids. A problem here is that lots of works don't have DOIs and then you'd have to resort to matching based on title and authors. This can be tricky.

If you just want to know generally the coverage of OpenAlex of works in those other databases, some academic studies might be helpful: [culbert et al 2024](https://arxiv.org/abs/2401.16359) and [alperin et al 2024](https://arxiv.org/abs/2404.17663) both generally show that openalex is a superset of more established databases.
