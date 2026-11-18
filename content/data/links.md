---
title: "Links"
updated: 2026-11-18
description: "Work-to-work links: each joins two works and has a relationship (a citation, or a part-of link such as a chapter in its book). How to list a work's links out and in with the /links endpoint."
tags: ["reference"]
entity:
  linksTo:
    - "works"
    - "relationships"
---
A **link** joins two [works](/data/works/) and says how they are related: one cites the other, or one is part of the other (a chapter in its book, a figure in its paper). Every link is three IDs: its `origin` work, its `target` work and its [relationship](/data/relationships/). Links are a [component](/data/component/) entity: they have no OpenAlex ID of their own, and you list them for one work at a time at [`api.openalex.org/links`](https://api.openalex.org/links?filter=origin:W2741809807).

```json
{
  "origin": "https://openalex.org/W2741809807",
  "target": "https://openalex.org/W1560783210",
  "relationship": "https://openalex.org/relationships/citation"
}
```

A link carries no titles. To get them, look the works up: [`/works?filter=openalex:W1560783210|W1724212071&select=id,display_name`](https://api.openalex.org/works?filter=openalex:W1560783210|W1724212071&select=id,display_name).

## About

### Where links come from

Links are the same data you already see on each work, read from the other side too:

- **Citations** come from a work's [`referenced_works`](/data/works/attributes/#referenced_works): the works in its reference list that we matched to a work. See [Citations](/data/works/citations/) for how reference lists are read and matched. A reference we couldn't match to a work is not a link.
- **Part-of links** come from a work's [`parent_works`](/data/works/attributes/#parent_works): its book, its paper, its data series. See [Relationships](/data/relationships/) for the four part-of kinds and where they come from.

The `origin` is always the work that holds the link: the citing work, or the part. The `target` is the work it points to: the cited work, or the whole. A link always joins two different works. Versions of one work (a preprint and its published article) are merged into one work, never linked.

### Which works count

Every work counts, including works the default works view leaves out ([expansion works and pieces of other works](/data/works/corpus/)): a link is a fact about two works, and most part-of links lead to pieces such as figures. So a work's incoming citation links can number more than [`/works?filter=cites:`](/api/filtering/) returns by default.

## Attributes

### `origin`
*String.* The OpenAlex ID of the work that holds the link: the citing work, or the part.

### `target`
*String.* The OpenAlex ID of the work it points to: the cited work, or the whole. In rare cases the target is no longer in OpenAlex.

### `relationship`
*String.* The [relationship](/data/relationships/#values)'s OpenAlex ID, such as `https://openalex.org/relationships/citation`. The five are `citation`, `volume`, `component`, `data-series` and `part`.

### Why `origin` and `target`

`target` is the usual word for the far end of a link, on the web and in graph tools. The usual word for the near end, `source`, is already an OpenAlex entity (the journal or repository a work appears in), and `from` and `to` are reserved words in Python and SQL, so they would need quoting in pyalex and in queries on the snapshot.

## In the API

Every request names a work with `origin` or `target`; a request that names none answers an error with examples.

```
# The works W2117905317 cites, and the works it is part of
https://api.openalex.org/links?filter=origin:W2117905317

# The works that are part of W2741809807, then the works that cite it, newest first
https://api.openalex.org/links?filter=target:W2741809807

# Only one kind of link (join several with |)
https://api.openalex.org/links?filter=target:W2741809807,relationship:component

# The links between two works
https://api.openalex.org/links?filter=origin:W2117905317,target:W88818295
```

- `origin` and `target` take one work ID, short (`W2741809807`) or full. A merged-away ID is read as the work it was merged into, and named in `meta.merged_ids`.
- `relationship` takes `citation`, `volume`, `component`, `data-series` or `part` (the short value or the full ID).
- Order: a work's outgoing links list its parent works first, then the works it cites in `referenced_works` order. Incoming links list the work's parts first (its figures, chapters or records), then the works that cite it, newest first.
- Paging works as on every list: `page` and `per_page` (up to 200) for the first 10,000 links, and [cursor paging](/api/paging/) for all of them.
- `/links` has no `sort`, `group_by`, `search` or `select`. To count or group the works on either side, use the [works](/data/works/) filters `cites`, `referenced_works`, `parent_works.id` and `lineage`.

Until 18 November 2026 the fields were `from` and `to`, each with an `id` and `display_name`, and `relationship` was the bare value (`citation`). The `from:` and `to:` filters now answer an error naming the new ones.
