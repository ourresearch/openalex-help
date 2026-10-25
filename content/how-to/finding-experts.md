---
title: "Finding experts and partners"
updated: 2026-10-25
description: "Find the researchers, institutions and companies working on a topic: everyone, the people at one place, the senior ones, or reviewers with no ties to an author, in OQL sentences you can rerun."
tags: ["oql", "authors"]
synonyms: ["find experts", "find reviewers", "who works on", "researchers on a topic", "collaborators", "industry partners", "key opinion leaders"]
card: "Who works on a topic, who's at your place, who's senior, and who has no ties: each one sentence."
---
"Who works on this?" is a table in [OQL](/access/oql/): the works on a topic, split by author, with numbers for each person. Type these into the **OQL tab** on [openalex.org](https://openalex.org), or send them to the API at `https://api.openalex.org/?oql=<query>`. Every query below runs on production.

> [!claude]
> You can ask in plain language instead: *"Who are the leading researchers on marine microplastics since 2019, with their h-index?"* Every answer comes with the OQL it ran. Set up once: [Using OpenAlex with an AI assistant](/how-to/ai-assistants/).

## Who publishes most on a topic?

Split the topic's works by author. `Show h-index` adds each person's h-index as a column:

```
get the count of works since 2019 about (microplastics AND marine) by author. Show h-index.
```

One row per author, most works first. Keep only the people with real depth in the topic with a count floor:

```
get the count of works since 2019 about (microplastics AND marine) by author. Only authors with at least 10 works since 2019 about (microplastics AND marine).
```

## Who works on a topic at one institution, or in one country?

Say which authors you mean right after `by author`. `at` reads each author's own profile (the institutions on it, with years), so the people are the ones whose record lists the institution:

```
get the count of works about kelp by author at [University of British Columbia](I141945490) since 2022. Show h-index.
get the count of works about kelp by author in [Norway](NO). Show h-index.
```

Write a year window (`since 2022`) when you mean the people there now: bare `at [X]` means any year, so it also finds people whose profile lists the place once, long ago. For where people are now, OpenAlex's best guess is their last known institution, said in [the general form](/access/oql/#when-a-sentence-cant-say-it-the-general-form):

```
get authors where last known institution is [University of Kansas](I146416000) who published works where title-abstract-keywords has (kelp); then, summarize each author using count
```

**People at a place is not the same as papers from a place.** `by author at [X]` keeps the people and counts all their works on the topic, wherever they wrote them. `from [X] by author` keeps the papers with an author at X and counts everyone on them. See [Which groups](/access/oql/#which-groups).

## How do I find the most senior people?

Choose authors by their own h-index, or order by it:

```
get the count of works since 2019 about (microplastics AND marine) by author with an h-index above 40, highest h-index first
get authors at [University of British Columbia](I141945490) since 2022 with an h-index above 50, highest h-index first
```

The first ranks the topic's senior people; the second lists a university's most-cited people overall, by their own records.

## How do I find reviewers with no ties to an author?

Leave out everyone who has co-authored with that person:

```
get authors where co-author is not [Albert A. Koelmans](A5001483262) who published at least 5 works where title-abstract-keywords has (microplastics); then, summarize each author using count
```

Every author with at least 5 microplastics works who has never written a paper with him.

## Which institutions and companies work on a topic?

Split by institution, or by company:

```
get the count of works since 2020 about kelp by institution in [Germany](DE)
get the count of works since 2020 about batteries co-authored with [Technical University of Munich](I62916508) by company
```

The second lists the companies on TU Munich's battery papers (BMW, BASF and Infineon lead). To find institutions you've never worked with, filter institutions by their own collaborators:

```
get institutions in [Germany](DE) where collaborator is not [Massachusetts Institute of Technology](I63966007)
```

Every result downloads as a CSV from the download button above the results; see [Downloading OQL results](/how-to/integrations/#how-do-i-download-an-oql-table).
