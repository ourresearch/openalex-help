---
title: "Systematic Reviews"
updated: 2026-10-23
subtitle: "Build a reproducible systematic-review search in OQL: term blocks, exact vs. stemmed matching, and scope filters."
description: "Build a real systematic-review search strategy in OQL: term blocks, exact vs. stemmed matching, scope filters, and a reproducible query you can paste straight into your appendix."
tags: ["recipes", "oql"]
card: "A search strategy is a term tree, and OQL speaks it: one string for your methods appendix."
---
A systematic-review search strategy is really a **term tree**: blocks of synonyms OR'd together, blocks AND'd with each other, a few exclusions, and some scope limits. That's exactly the shape [OQL](/access/oql/), the OpenAlex Query Language, is built to express. This recipe walks through building one, start to finish.

> [!claude]
> You can have Claude draft the term tree: *"Build a systematic search for vaping and adolescent health; show me the count and a random sample, then tighten it."* It writes the OQL, previews the set, and hands you the final query for the methods section. Set up once: [Using OpenAlex with an AI assistant](/how-to/ai-assistants/).

The payoff over exporting from a classic database interface: the finished query is **one readable sentence**. It runs on the [website](https://openalex.org) and the [API](/api/oql/) identically, it's trivially shareable with co-reviewers, and you can paste it into your methods appendix as-is.

## Start with your concept blocks

Say we're reviewing the literature on **vaping and adolescent health**. Classic PICO-style decomposition gives three concepts, each with synonyms:

- **Exposure:** vaping, vape, e-cigarettes
- **Population:** adolescents, teens, youth
- **Outcome:** health, harm, risk

Each concept becomes an OR-block; the blocks join with `AND`. To search titles and abstracts, say so with `in the title or abstract`:

```
get works with ((vaping OR vape OR "e-cigarette" OR stemmed "electronic cigarette") AND (adolescent OR teen OR youth) AND (health OR harm OR risk)) in the title or abstract
```

You can type this straight into the **OQL tab** on the [openalex.org](https://openalex.org) search page: valid queries run as you type.

`about` instead of `with ... in the title or abstract` also searches the works' [keywords](/api/searching/#keywords-in-search), which finds papers that use other words for your concepts. That's openalex.org's default and good for exploring; for a review you report line by line, name the fields you searched.

## Choose exact or stemmed, term by term

OQL's one search rule to internalize: **bare words are stemmed, quotes are exact.**

- `teen` (bare) also matches *teens*: stemming gives you the recall a review wants, without tacking `*` onto everything.
- `"e-cigarette"` (quoted) matches exactly that string, no stemming.
- `stemmed "electronic cigarette"` is the bridge: the words must be adjacent, as a phrase, but each still stems (*electronic cigarettes* matches).
- Wildcards: `adolescen*` covers *adolescent, adolescents, adolescence*. (`*` is any characters, `?` exactly one; neither may start a word, and `*` needs at least 3 characters before it.)

The search string uses capital `AND`, `OR` and `NOT`, the same as PubMed and most databases, so published search strategies translate almost mechanically: a strategy line like `(vap* OR e-cig*)` stays `(vap* OR e-cig*)`.

## Add scope filters

Reviews almost always limit by date, document type, and language. The years go right after `works`; anything without its own phrase goes after `where`:

```
get works from 2015–2025 with ((vaping OR vape OR "e-cigarette" OR stemmed "electronic cigarette") AND (adolescent OR teen OR youth) AND (health OR harm OR risk)) in the title or abstract where type is ([article](article) or [review](review)) and language is [English](en)
```

## Exclude what you don't want

`NOT` inside the search string pushes terms out, for example animal studies. To leave out retracted works, say `non-retracted`:

```
get non-retracted works from 2015–2025 with ((vaping OR vape OR "e-cigarette" OR stemmed "electronic cigarette") AND (adolescent OR teen OR youth) AND (health OR harm OR risk) NOT (mice OR murine)) in the title or abstract where type is ([article](article) or [review](review)) and language is [English](en)
```

That's the finished strategy: one sentence for your appendix.

## Sanity-check the set

Before screening, get a feel for what the query returns. A table counts the works in groups:

```
get the count of works with ((vaping OR vape OR "e-cigarette" OR stemmed "electronic cigarette") AND (adolescent OR teen OR youth) AND (health OR harm OR risk)) in the title or abstract by year from 2015–2025
get the count of works with ((vaping OR vape OR "e-cigarette" OR stemmed "electronic cigarette") AND (adolescent OR teen OR youth) AND (health OR harm OR risk)) in the title or abstract by type
```

(In a table by year, the years go after `by year`.) A weird year distribution or a pile of unexpected document types usually means a term block needs tightening. For a screening pilot, pull a reproducible random subset with [the general form](/access/oql/#when-a-sentence-cant-say-it-the-general-form):

```
get works where title-abstract has ((vaping OR vape OR "e-cigarette" OR stemmed "electronic cigarette") AND (adolescent OR teen OR youth) AND (health OR harm OR risk)); then, sample 200 of those works with seed 42
```

The `seed` makes the sample repeatable, so co-reviewers see the same 200 works.

## Run, export, and document

- **Website:** run the query in the OQL tab, then export your results to CSV.
- **API:** `https://api.openalex.org/?oql=<your query>` returns the same results as JSON. The query names what it gets (`get works ...`), so it goes to the API root. See the [OQL API](/api/oql/) page.
- **Check it for free:** `https://api.openalex.org/query/oql/<your query>` says whether it's valid and gives it back in canonical form, without running it.
- **Appendix:** the OQL sentence *is* your documented search strategy: one line of provenance covers database, interface, and query.

## Going deeper

- **[OQL overview](/access/oql/)**: every part of the language with a copyable example.
- **[Specification](/access/oql-spec/)**: the formal spec: every rule and edge case.
- **[Cases](https://openalex.org/query/oql/cases)**: a browsable library of worked examples, including real published systematic-review strategies rendered in OQL.
