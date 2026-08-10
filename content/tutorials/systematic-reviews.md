---
title: "Systematic Reviews"
subtitle: "Build a reproducible systematic-review search in OQL — term blocks, exact vs. stemmed matching, and scope filters."
description: "Build a real systematic-review search strategy in OQL — term blocks, exact vs. stemmed matching, scope filters, and a reproducible query you can paste straight into your appendix."
tags: ["recipe", "oql"]
card: "A search strategy is a term tree, and OQL speaks it: one string for your methods appendix."
---
A systematic-review search strategy is really a **term tree**: blocks of synonyms OR'd together, blocks AND'd with each other, a few exclusions, and some scope limits. That's exactly the shape [OQL](/access/oql/) — the OpenAlex Query Language — is built to express. This recipe walks through building one, start to finish.

The payoff over exporting from a classic database interface: the finished query is **one readable string**. It runs on the [website](https://openalex.org) and the [API](/api/oql/) identically, it's trivially shareable with co-reviewers, and you can paste it into your methods appendix as-is.

## Start with your concept blocks

Say we're reviewing the literature on **vaping and adolescent health**. Classic PICO-style decomposition gives three concepts, each with synonyms:

- **Exposure:** vaping, vape, e-cigarettes
- **Population:** adolescents, teens, youth
- **Outcome:** health, harm, risk

Each concept becomes an OR-block; the blocks join with `and`. In OQL, searching titles and abstracts at once is the `title/abstract` field:

```
works where title/abstract has (
    (vaping or vape or "e-cigarette" or stemmed "electronic cigarette")
  and (adolescent or teen or youth)
  and (health or harm or risk)
)
```

You can type this straight into the **OQL tab** on the [openalex.org](https://openalex.org) search page — valid queries run as you type.

## Choose exact or stemmed, term by term

OQL's one search rule to internalize: **bare words are stemmed, quotes are exact.**

- `teen` (bare) also matches *teens* — stemming gives you the recall a review wants, without tacking `*` onto everything.
- `"e-cigarette"` (quoted) matches exactly that string — no stemming.
- `stemmed "electronic cigarette"` is the bridge: the words must be adjacent, as a phrase, but each still stems (*electronic cigarettes* matches).
- Wildcards go inside quotes: `"adolescen*"` covers *adolescent, adolescents, adolescence*. (`*` is any characters, `?` exactly one; neither may start a word.)

Published search strategies translate almost mechanically: a strategy line like `(vap* OR e-cig*)` becomes `("vap*" or "e-cig*")`.

## Add scope filters

Reviews almost always limit by date, document type, and language. Those are ordinary filters, AND'd onto the search:

```
works where title/abstract has (
    (vaping or vape or "e-cigarette" or stemmed "electronic cigarette")
  and (adolescent or teen or youth)
  and (health or harm or risk)
)
  and year >= (2015) and year <= (2025)
  and type is (article or review)
  and language is (en)
```

## Exclude what you don't want

Negation is the `not` prefix, inside the parentheses, directly before the value to exclude — for example, to push animal studies out of the set:

```
  and title/abstract has (not mice and not murine)
```

To exclude retracted works: `and retracted is (false)`.

## Sanity-check the set

Before screening, get a feel for what the query returns. `group by` aggregates the whole result set into buckets:

```
works where … group by year
works where … group by type
```

A weird year distribution or a pile of unexpected document types usually means a term block needs tightening. For a screening pilot, pull a reproducible random subset:

```
works where … sample 200 seed 42
```

(The `seed` makes the sample repeatable, so co-reviewers see the same 200 works.)

## Run, export, and document

- **Website:** run the query in the OQL tab, then export your results to CSV. You can also flip between the visual [advanced builder](/access/website-advanced/) and the OQL text — they're two views of the same query.
- **API:** `https://api.openalex.org/?oql=<your query>` returns the same results as JSON — the query carries its own entity (`works where …`), so it goes to the API root. See the [OQL API](/api/oql/) page.
- **Appendix:** the OQL string *is* your documented search strategy — one line of provenance covers database, interface, and query.

## Going deeper

- **[OQL overview](/access/oql/)** — every construct with a copyable example.
- **[Specification](/access/oql-spec/)** — the formal spec: every rule and edge case.
- **[Cases](https://openalex.org/query/oql/cases)** — a browsable library of worked examples, including real published systematic-review strategies rendered in OQL.
