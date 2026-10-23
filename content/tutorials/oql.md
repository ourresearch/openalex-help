---
title: "Your first OQL queries"
updated: 2026-10-23
subtitle: "Ask OpenAlex in plain English: a list of papers, then counts, rankings and the people behind a topic, in five sentences."
description: "A hands-on introduction to OQL, the OpenAlex Query Language: lists of works, tables of groups, rankings with a count floor, and the researchers behind a topic, built up step by step on one topic."
tags: ["recipes", "oql"]
card: "Five sentences, one topic: from a list of papers to the people who write them."
---
[OQL](/access/oql/), the OpenAlex Query Language, lets you ask OpenAlex a question in a sentence you can read aloud. In this tutorial we'll ask five questions about one topic, **kelp**, each a little more powerful than the last: from a list of papers to the researchers behind them. Each takes a few seconds and costs a fraction of a cent.

**Where to type them:** the **OQL tab** at the top of the [search page](https://openalex.org). Valid queries run as you type. (On the API, the same sentence goes to `https://api.openalex.org/?oql=<your query>`.)

Every query starts with `get`, and returns one of two shapes: **a list** (one row per paper, or per author, institution...) or **a table of groups** (numbers about a set of papers, one row per group). Steps 1 and 2 are lists; steps 3 to 5 are tables.

## 1. A list of papers

```
get works about kelp, most cited first
```

That's every work about kelp in OpenAlex, about 16,600 of them, the most cited at the top: *Multivariate dispersion as a measure of beta diversity* (2006), then *Kelp forest ecosystems: biodiversity, stability, resilience and future* (2002).

- `about` searches titles, abstracts and [keywords](/api/searching/#keywords-in-search). To search one place, say so: `get works with kelp in the title`.
- The order goes after a comma at the end. Try `, newest first` or `, highest FWCI first`. With no order, a search comes back best matches first.

## 2. Narrow it down

```
get [University of British Columbia](I141945490)'s open access articles since 2020 about kelp, most cited first
```

Now it's 53 works: UBC's open-access articles about kelp since 2020, led by *The value of ecosystem services in global marine kelp forests* (2023). Read it left to right and every word narrows the list:

- **Whose works:** `[University of British Columbia](I141945490)'s works`. Institutions, countries and people are **links**: the name in brackets, the OpenAlex ID in parentheses. The ID is what counts, so the query never mixes up two places with similar names. [Finding OpenAlex IDs](/how-to/finding-openalex-ids/) shows how to look one up.
- **Yes/no words and the type:** `open access articles` (try `retracted`, `top 1% cited`, `reviews`, `preprints`).
- **Time:** `since 2020` (or `from 2022`, `before 2010`, `from 2018–2025`).

The parts always go in this order. If you write them in another, OQL puts them back: whatever you type, the box shows your query in its one canonical form, so you can write it close enough and read the echo.

## 3. Count it

Change `get works` to `get the count of works`, and you get a number instead of a list:

```
get the count of works about kelp
```

Add `by` and a split, and you get a **table of groups**: one row per year, how the topic grew.

```
get the count of works about kelp by year since 2000
```

Kelp research went from 178 works in 2000 to over 800 a year now. In a table split by year, the years go after `by year`. Other splits: `by country`, `by journal`, `by topic`, `by type`, `by open access`, and [more](/access/oql/#splits).

## 4. Rank the groups

Ask for more than one number, choose the order, and keep only the groups big enough to mean something:

```
get the count and mean FWCI of works about kelp by country, highest mean FWCI first. Only countries with at least 100 works about kelp.
```

Now each country has its count of kelp works and their mean [FWCI](/data/works/attributes/#fwci) (field-weighted citation impact: 1.0 is the world average for similar papers), ordered by FWCI. Spain (227 works, mean FWCI 4.36) and the Netherlands (133, 4.35) lead; the UK and Australia follow with many more papers.

The `Only` sentence matters: a mean or a percent ordered highest first puts tiny groups on top (one paper with a huge FWCI), so whenever you rank by a rate, add a count floor. Other numbers to try: `share`, `percent open access`, `median citations`, `sum of citations`.

## 5. Find the people

Split by `author` to see who writes on the topic, and say which authors you mean right after the split:

```
get the count of works about kelp by author at [University of British Columbia](I141945490) since 2022. Show h-index.
```

That's the researchers whose OpenAlex profile lists UBC since 2022, each with their number of kelp works and their h-index (the `Show` sentence adds a person's own fields as columns): Louis D. Druehl (48 kelp works, h-index 33), Samuel Starko (47), Aaron M. Eger, Patrick T. Martone, Margot L. Hessing-Lewis.

There's a subtle, useful difference between choosing **which groups** and **which works**:

```
get the count of works about kelp from [University of British Columbia](I141945490) by author
```

This one keeps the *works* with a UBC author, and counts everyone on them, UBC or not. The first keeps the *people* at UBC, and counts all their kelp works, wherever they wrote them. Druehl has 48 kelp works in all, 21 of them from UBC.

Swap `at [University of British Columbia](I141945490) since 2022` for `in [Norway](NO)` to find a country's kelp people, or add `, highest h-index first` to put the most senior first.

## What OQL assumes

OQL's text says everything the query does, with a few sensible defaults it doesn't spell out: `about` searches titles, abstracts and keywords; queries run on OpenAlex's [core corpus](/data/works/corpus/); `[University of British Columbia](I141945490)'s works` includes its sub-units; `in the topic` and `by topic` use each work's primary topic. The full list is in the [OQL guide](/access/oql/#what-oql-assumes).

## Take it further

- **Download any result:** the download button above the results exports the full list or every row of a table as CSV. On the API, add `&format=csv` to a table.
- **Check before you run:** `https://api.openalex.org/query/oql/<your query>` is free. It says whether the query is valid, how to fix it if not, and what it will cost.
- **Have an AI write it:** with the [OpenAlex connector](/how-to/ai-assistants/), ask Claude in plain language; every answer comes with the OQL it ran, ready to paste into the OQL tab or your methods section.

**Where next:** the [OQL guide](/access/oql/) has every part of the language with an example, and [Systematic reviews](/tutorials/systematic-reviews/) builds a full search strategy in OQL.
