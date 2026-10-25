---
title: "Benchmarking against peers"
updated: 2026-10-25
description: "Compare your institution or country with named peers, a peer list you keep, or everyone else: output, impact, open access and shares, in OQL sentences you can rerun."
tags: ["oql", "analytics"]
synonyms: ["benchmark", "compare institutions", "peer comparison", "peer group", "compare countries", "market share", "collaboration partners"]
card: "Named peers side by side, a peer list you keep, or one against the rest: each one sentence."
---
Benchmarking questions are tables in [OQL](/access/oql/): numbers about a set of works, one row per institution or country. Type these into the **OQL tab** on [openalex.org](https://openalex.org) (valid queries run as you type), or send them to the API at `https://api.openalex.org/?oql=<query>`. Every query below runs on production; swap in your own institutions.

> [!claude]
> You can ask in plain language instead: *"Compare IIT Bombay, IIT Delhi and IIT Madras since 2015 on output and mean FWCI."* Every answer comes with the OQL it ran. Set up once: [Using OpenAlex with an AI assistant](/how-to/ai-assistants/).

## How do I compare my institution with named peers?

List them right after the split, in parentheses:

```
get the count and mean FWCI of works since 2015 by institution in ([Indian Institute of Technology Bombay](I162827531), [Indian Institute of Technology Delhi](I68891433), [Indian Institute of Technology Madras](I24676775))
```

One row per institution: how many works each has since 2015 and their mean [FWCI](/data/works/attributes/#fwci) (1.0 is the world average for similar papers). Today the three have about 43,000 works each, and IIT Delhi has the highest mean FWCI (1.95). A list takes up to 100 values. Narrow the works first and every row narrows with them:

```
get the count and mean FWCI of works since 2020 in the field [Computer Science](17) by institution in ([Massachusetts Institute of Technology](I63966007), [Stanford University](I97018004))
```

## How do I compare against a peer list I keep?

Save the peers as a [collection](/how-to/collections/), then split by the collection's members. Public collections of countries work the same way, such as the EU's member states:

```
get the count, mean FWCI, and percent open access of works since 2020 by country in the collection [European Union (EU27)](col_LV29j8URoX), highest mean FWCI first
```

For your own peer list of institutions, write `by institution in the collection [My peers](<your collection ID>)`.

## How do I compare one against everyone else?

Compare one country with all the others in [the general form](/access/oql/#when-a-sentence-cant-say-it-the-general-form):

```
get works where published since 2015; then, compare country [India](IN) versus country is not [India](IN) using count and mean FWCI
```

Two rows: works with an Indian author, and works with none.

## How do I rank institutions on a rate without tiny ones on top?

Order by the rate, and add an `Only` sentence so a group needs enough works to count:

```
get the count and percent open access of works since 2020 about "machine learning" by institution in [Austria](AT), highest percent open access first. Only institutions with at least 100 works since 2020 about "machine learning".
```

Without the floor, a group with three works, all open access, would top the list at 100%.

## What's a country's share of each year's top papers?

`share` is each row's slice of the group one level up. With `by year and country`, that's each country's share of each year:

```
get the count and share of top 1% cited articles by year since 2000 and country in ([United States](US), [China](CN))
```

## Who does my institution co-author with most?

Split its works by institution and leave the institution itself out:

```
get the count of works since 2020 co-authored with [University of Kansas](I146416000) by institution except [University of Kansas](I146416000)
get the count of works from [Kenya](KE) by country except [Kenya](KE)
```

The first lists Kansas's partner institutions (its medical center first); the second, Kenya's partner countries. For two partners' joint output over time:

```
get the count of works from both [University of Oxford](I40120149) and [University of Cambridge](I241749) by year since 2015
```

## How do I profile one institution's output?

Split one institution's works by field, with several numbers:

```
get the count, mean FWCI, and percent top 10% cited of [University of Kansas](I146416000)'s works since 2020 by field
```

On the website, [Analyzing your institution](/how-to/analyzing-your-institution/) walks through the same questions with the Stats panel. Every result here downloads as a CSV from the download button above the results; see [Downloading OQL results](/how-to/integrations/#how-do-i-download-an-oql-table).
