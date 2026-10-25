---
title: "Tracking trends over time"
updated: 2026-10-25
description: "Count a topic, an institution or a country year by year: growth, open access, shares, and two periods side by side, in OQL sentences you can rerun."
tags: ["oql", "analytics"]
synonyms: ["trends", "growth over time", "by year", "publications per year", "open access over time", "share over time", "time series"]
card: "Year by year: a topic's growth, open access, and each country's share, each one sentence."
---
A trend is a table in [OQL](/access/oql/) split by year. Type these into the **OQL tab** on [openalex.org](https://openalex.org) (a table by year draws as a chart), or send them to the API at `https://api.openalex.org/?oql=<query>`. Every query below runs on production.

> [!claude]
> You can ask in plain language instead: *"How has research on large language models grown since 2018 in the US, China and the UK?"* Every answer comes with the OQL it ran. Set up once: [Using OpenAlex with an AI assistant](/how-to/ai-assistants/).

## How has a topic grown?

Split its works by year. In a table by year, the years go right after `by year`:

```
get the count of works about kelp by year since 2000
get the count and mean FWCI of works about CRISPR by year since 2012
```

Years come back oldest first; add `, newest first` to flip them. The current year is still filling in, so its count is partial.

## How do I compare countries or institutions year by year?

Add a second split, with the groups you want listed:

```
get the count of works about "large language models" by year since 2018 and country in ([United States](US), [China](CN), [United Kingdom](GB))
```

One row per year and country.

## How has open access changed?

Add `percent open access`, or split by open access status to see the routes:

```
get the count and percent open access of [University of Kansas](I146416000)'s works by year since 2015
get the count and share of [University of Kansas](I146416000)'s works by year since 2015 and open access status
```

The first gives one rate per year (Kansas: 46% in 2015, 68% in 2024); the second, each year's split into gold, green, hybrid, bronze, diamond and closed.

## What's each field's share of a topic, year by year?

`share` with two splits is each row's share of its year:

```
get the count and share of works about "climate change" by year from 2015–2024 and field
```

## How do I compare two periods?

Compare them side by side in [the general form](/access/oql/#when-a-sentence-cant-say-it-the-general-form):

```
get works where country is [Kenya](KE); then, compare published from 2016 through 2019 versus published since 2021 using count and percent open access
```

Two rows, one per period, each with its count and open-access rate.

Every result downloads as a CSV from the download button above the results; see [Downloading OQL results](/how-to/integrations/#how-do-i-download-an-oql-table).
