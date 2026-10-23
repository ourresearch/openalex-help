---
title: "Searching with a strategy from another database"
updated: 2026-10-23
description: "Paste a PubMed, Scopus, Web of Science, Ovid, Embase, Cochrane Library or EBSCO search into openalex.org and it runs translated into OQL, with every difference from the original listed."
tags: ["search", "oql"]
synonyms: ["PubMed", "Scopus", "Web of Science", "WoS", "Ovid", "MEDLINE", "Embase", "Cochrane", "CINAHL", "EBSCO", "Dimensions", "search strategy", "search translation", "translate search", "systematic review search", "MeSH", "TITLE-ABS-KEY", "tiab", "field tags", "Polyglot"]
card: "Paste a search from PubMed, Scopus or Web of Science; it runs translated, with every difference listed."
---
Paste a search strategy from another database into the search box on [openalex.org](https://openalex.org) and press Enter. OpenAlex translates it into [OQL](/access/oql/), runs it, and opens it in the OQL tab. A box above the query says which database it came from and lists every place OpenAlex reads it differently. Each difference links to its section on this page.

It reads searches written for **PubMed**, **Scopus**, **Web of Science**, **Ovid** (MEDLINE, Embase, PsycINFO), **Embase.com**, the **Cochrane Library** and **EBSCO** (CINAHL and others): field tags, subject headings, limits, proximity operators and numbered search lines. Plain Boolean searches, including ones written for **Dimensions** or Google Scholar, need no translation: the search box runs them as typed (except a Google Scholar `-word`, which OpenAlex reads as the word itself: write `NOT word`).

The translation follows fixed rules, the same for everyone, so the same search always gives the same query. Nothing is sent to a language model.

## Record what ran

**Copy for your methods**, at the top of the differences box, copies four things: the original search, the OpenAlex query exactly as it ran, the date, and the list of differences. That is what [PRISMA-S](https://doi.org/10.1186/s13643-020-01542-z) asks a review to report for each database: the search as run, and how it was adapted.

You can edit the OQL like any other query. Once you change it, the differences box goes away, since it described the translation, not your edit.

## Fields

Each field tag maps to the nearest OpenAlex field. The rule: a source field that also covers keywords maps to **title, abstract and keywords**; one that covers only the text maps to **title and abstract**.

| Source | Tag | OpenAlex field |
|---|---|---|
| PubMed | `[tiab]`, `[tw]`, `[ot]`, `[kw]`, `[All Fields]` | title-abstract-keywords |
| PubMed | `[ti]` / `[ab]` | title / abstract |
| Scopus | `TITLE-ABS-KEY()`, `KEY()`, `AUTHKEY()`, `ALL()` | title-abstract-keywords |
| Scopus | `TITLE-ABS()` | title-abstract |
| Scopus | `TITLE()` / `ABS()` | title / abstract |
| Web of Science | `TS=`, `AK=`, `KP=`, `ALL=` | title-abstract-keywords |
| Web of Science | `TI=` / `AB=` | title / abstract |
| Ovid | `.ti,ab.`, `.tw.` | title-abstract |
| Ovid | `.ti,ab,kf.`, `.kw.`, `.mp.` | title-abstract-keywords |
| Embase.com, Cochrane | `:ti,ab,kw` / `:ti,ab` | title-abstract-keywords / title-abstract |
| EBSCO | `TI` / `AB` / `TX`, `KW` | title / abstract / title-abstract-keywords |
| Any | author (`[au]`, `AUTH()`, `AU=`) | byline |
| Any | affiliation (`[ad]`, `AFFIL()`, `AD=`) | raw affiliation |

OpenAlex keywords are assigned by OpenAlex from each work's text; they are not the authors' own keywords, Web of Science's Keywords Plus or Scopus's index terms. When a search uses one of those fields, the differences box says so. A word with no field tag searches title, abstract and keywords.

Fields OpenAlex can't search as text, such as a journal name (`SRCTITLE()`, `SO=`) or an ISSN, are left out and listed. To limit to a journal, add it as a filter after the search runs.

## Headings

MeSH, Emtree and other subject headings (`"Asthma"[Mesh]`, `exp Asthma/`, `'asthma'/exp`, `MeSH descriptor: [Asthma]`, `(MH "Asthma+")`) are searched as the heading's words in titles, abstracts and keywords. OpenAlex holds MeSH for works indexed in PubMed but can't search it yet, so:

- works that carry the heading but don't use its words in their text are missed;
- explosion (`exp`, `[mh]`, `+`) is lost: the narrower headings under it aren't added.

Most strategies already pair each heading with free-text synonyms, and those carry over unchanged. If yours leans on headings alone, add the heading's entry terms as words before you rely on the count.

The MeSH check tags Humans and Animals, used as a filter (`NOT (animals[mh] NOT humans[mh])`), are left out rather than searched as words, since searching the word "humans" would drop most papers. Age groups and sex (Child, Aged, Female) are a review's population, so they are searched as words like any heading.

## Limits

Limits become OpenAlex filters:

| Limit | Examples | OpenAlex |
|---|---|---|
| Publication years | `2015:2020[dp]`, `PUBYEAR > 2014`, `PY=(2000-2016)`, `limit 7 to yr="2010 - 2020"` | `since 2015`, `from 2000–2016` |
| Language | `english[la]`, `LANGUAGE(english)`, `LA=(English)`, `limit 7 to english language` | `where language is [English](en)` |
| Document type | `review[pt]`, `DOCTYPE(ar)`, `LIMIT-TO(DOCTYPE,"re")`, `DT=(Article)` | `where type is ([article](article) or [review](review))` |
| Study design | `"randomized controlled trial"[pt]`, `"systematic review"[pt]`, `meta-analysis[pt]` | `where study design is [Randomized Controlled Trial](randomized-controlled-trial)` |
| Open access | `LIMIT-TO(OA,"all")` | `open access works` |
| Source type | `SRCTYPE(j)` | `where source type is [journal](journal)` |

OpenAlex has no conference-paper type: conference papers are articles, so `cp` and "Proceedings Paper" become `type is (article)`. [Study designs](/data/study-designs/) are tagged by OpenAlex from each paper, not by an indexer, so they match a different set than PubMed's publication types. Publication-date limits use the year only.

Limits with no OpenAlex equivalent, such as Scopus subject areas (`SUBJAREA`) or PubMed subsets (`[sb]`), are left out and listed. Add a [topic](/data/topics/) filter if you need a subject limit.

## Proximity

OpenAlex finds two words or phrases within N words of each other, in any order: `(smart and phone within 3 words of each other)`.

| Source | Operator | OpenAlex |
|---|---|---|
| Scopus | `W/n` | within n words |
| Scopus | `PRE/n` | within n words, any order (the order is lost) |
| Web of Science | `NEAR/n` / plain `NEAR` | within n words / within 15 words |
| Ovid | `adjN` | within N-1 words (Ovid's adj3 allows two words between) |
| Ovid, Cochrane | `adj` / `NEXT` | the two words as a phrase |
| PubMed | `"a b"[tiab:~N]` | within N words |
| Embase.com, Cochrane | `NEAR/n` | within n words |
| EBSCO | `Nn` / `Wn` | within n words |

OpenAlex counts distance in word moves, so two words in reverse order must be up to two words closer than the same words in order. When either side of a proximity search is an OR group, OpenAlex runs each pair as its own proximity search and joins them with OR. Web of Science's `SAME` (same address) runs as AND.

## Precedence

Databases group AND, OR and NOT differently when a search has no parentheses. The translation keeps each database's own rule and writes the grouping out with parentheses, so you can check it:

- **PubMed** reads left to right: `a OR b AND c` is `(a OR b) AND c`.
- **Scopus** groups OR first and AND NOT last: `a AND b OR c` is `a AND (b OR c)`.
- **Web of Science** groups NEAR, then SAME, then NOT, then AND, then OR: `a OR b AND c` is `a OR (b AND c)`.
- **Ovid, Embase.com, Cochrane and EBSCO** are read the common way, NOT then AND then OR. Most strategies for these databases put parentheses around every group, so this rarely matters; check the grouping if a line mixes AND and OR without them.

When a search mixes AND and OR without parentheses, the differences box says so.

## Wildcards

`*` carries over as `*`. Ovid's `$` becomes `*`, and Ovid's `#` (exactly one letter) becomes `?`. Ovid's limited truncation (`$3`) becomes unlimited.

OpenAlex needs at least three letters before a wildcard, and allows at most two wildcards in one phrase or proximity search, each after at least four letters. A wildcard that breaks those limits is dropped, the word runs whole, and the differences box says which.

## Phrases

Quoted phrases carry over as exact phrases. Two exceptions:

- Scopus's quoted phrases also match plurals and spelling variants, so they become stemmed phrases (`stemmed "kelp forest"`). Scopus's braces (`{kelp forest}`) stay exact.
- In Ovid, words side by side are a phrase (`heart attack.ti,ab.`), so they become a quoted phrase.

## Numbered lines

A strategy with numbered lines (`1. exp Asthma/`, `#2 asthma[tiab]`, `S3 S1 OR S2`) runs its last line, with every line it combines written out in full. Ovid's `or/1-5`, `and/6-8` and `limit 7 to ...` lines work too, and the hit counts Ovid and PubMed print after each line are ignored. Lines the last line doesn't use are left out and listed.

## When a search can't be read

A search with a parenthesis or quote that's never closed, or a line that combines a line that isn't there, doesn't run: the search box says what's wrong. Published strategies often carry small errors like these. Fix it and press Enter again, or remove the field codes to search the words as a plain search.

## Results will differ

Even a faithful translation returns a different set of works. Each database covers different papers, holds abstracts for different works, and indexes different fields: OpenAlex keywords are not Keywords Plus, and OpenAlex can't search MeSH yet. Before you rely on a translated search, check that it finds a few papers you know it should.
