---
title: "Following citations"
updated: 2026-10-25
description: "Find what cites a paper and what it cites, count citations by year or country, follow citations to a whole set of works, and total the citations to a topic's authors, in OQL sentences you can rerun."
tags: ["oql", "citations"]
synonyms: ["who cites", "citing works", "references", "cited by", "citation counts", "forward citations", "backward citations", "citation tracking"]
card: "Who cites a paper, what it cites, and who cites a whole set: each one sentence."
---
Citations run both ways in [OQL](/access/oql/): `citing` a paper, and `cited by` it. Type these into the **OQL tab** on [openalex.org](https://openalex.org), or send them to the API at `https://api.openalex.org/?oql=<query>`. Every query below runs on production. Papers are links: the title in brackets (the echo cuts it short), the OpenAlex ID in parentheses.

> [!claude]
> You can ask in plain language instead: *"Which papers cite 'The state of OA', and how has that changed by year?"* Every answer comes with the OQL it ran. Set up once: [Using OpenAlex with an AI assistant](/how-to/ai-assistants/).

## What cites a paper, and what does it cite?

```
get works citing [The state of OA: a large-scale analysis of the…](W2741809807), most cited first
get works cited by [The state of OA: a large-scale analysis of the…](W2741809807)
```

The first is every work whose reference list includes the paper, the most cited first; the second, the works in the paper's own reference list. OpenAlex's "related works" for a paper:

```
get works where it's related to ([The state of OA: a large-scale analysis of the prevalence and impact of Open Access articles](W2741809807))
```

## How do I count a paper's citations by year or by country?

Make it a table:

```
get the count of works citing [The state of OA: a large-scale analysis of the…](W2741809807) by year
get the count of works citing [The state of OA: a large-scale analysis of the…](W2741809807) by country
```

## Who cites my institution's work?

Put the cited works in a set, in [the general form](/access/oql/#when-a-sentence-cant-say-it-the-general-form), and the table reads like any other:

```
get the count of works where it cites a work in the set (works where institution is [University of Kansas](I146416000)) by year
```

Every work citing a Kansas paper, by year. To find the work on a topic that doesn't cite a set:

```
get works from 2024 in the topic [CRISPR and Genetic Engineering](T10878) where it doesn't cite any work in the set (works where institution is [University of Kansas](I146416000))
```

## Who cites a list of papers?

Save the papers as a [collection](/how-to/collections/), then cite the collection:

```
get works citing works in the collection [Example: altmetrics papers](col_8yWKmRNyEr)
get the count of works citing works in the collection [Example: altmetrics papers](col_8yWKmRNyEr) by year
```

## Whose work on a topic is cited most?

`sum of citations` totals the citations to each group's works:

```
get the sum of citations to works since 2018 about oleogel* by author, highest first
```

Every result downloads as a CSV from the download button above the results; see [Downloading OQL results](/how-to/integrations/#how-do-i-download-an-oql-table). For counting citations on the website, see [Counting](/how-to/counting/).
