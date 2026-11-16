---
title: "Links"
updated: 2026-11-16
description: "Work-to-work links: each joins two works and has a relationship (a citation, or a part-of link such as a chapter in its book). How to list a work's links out and in with the /links endpoint."
tags: ["reference"]
entity:
  linksTo:
    - "works"
    - "relationships"
---
A **link** joins two [works](/data/works/) and says how they are related: one cites the other, or one is part of the other (a chapter in its book, a figure in its paper). Every link has a `from` work, a `to` work and a [relationship](/data/relationships/). Links are a [component](/data/component/) entity: they have no OpenAlex ID of their own, and you list them for one work at a time at [`api.openalex.org/links`](https://api.openalex.org/links?filter=from:W2741809807).

```json
{
  "from": {"id": "https://openalex.org/W2117905317", "display_name": "Efeito da farinha de semente de abóbora ..."},
  "to": {"id": "https://openalex.org/W88818295", "display_name": "..."},
  "relationship": "citation"
}
```

## About

### Where links come from

Links are the same data you already see on each work, read from the other side too:

- **Citations** come from a work's [`referenced_works`](/data/works/attributes/#referenced_works): the works in its reference list that we matched to a work. See [Citations](/data/works/citations/) for how reference lists are read and matched. A reference we couldn't match to a work is not a link.
- **Part-of links** come from a work's [`parent_works`](/data/works/attributes/#parent_works): its book, its paper, its data series. See [Relationships](/data/relationships/) for the four part-of kinds and where they come from.

The `from` work is always the work that carries the link: the citing work, or the part. A link always joins two different works. Versions of one work (a preprint and its published article) are merged into one work, never linked.

### Which works count

Every work counts, including works the default works view leaves out ([expansion works and pieces of other works](/data/works/corpus/)): a link is a fact about two works, and most part-of links lead to pieces such as figures. So a work's incoming citation links can number more than [`/works?filter=cites:`](/api/filtering/) returns by default.

## Attributes

### `from`
*Object.* The work that carries the link (the citing work, or the part): its `id` and `display_name`.

### `to`
*Object.* The other work (the cited work, or the whole): its `id` and `display_name`. `display_name` is `null` in the rare case the cited work is no longer in OpenAlex.

### `relationship`
*String.* The kind of link, one of the [relationships](/data/relationships/#values): `citation`, `volume`, `component`, `data-series` or `part`.

## In the API

Every request names a work with `from` or `to`; a request that names none answers an error with examples.

```
# The works W2117905317 cites, and the works it is part of
https://api.openalex.org/links?filter=from:W2117905317

# The works that cite W2741809807, or are part of it, newest first
https://api.openalex.org/links?filter=to:W2741809807

# Only one kind of link (join several with |)
https://api.openalex.org/links?filter=to:W2741809807,relationship:component

# The links between two works
https://api.openalex.org/links?filter=from:W2117905317,to:W88818295
```

- `from` and `to` take one work ID, short (`W2741809807`) or full. A merged-away ID is read as the work it was merged into, and named in `meta.merged_ids`.
- `relationship` takes `citation`, `volume`, `component`, `data-series` or `part`.
- Order: a work's outgoing links list its parent works first, then the works it cites in `referenced_works` order. Incoming links list the newest linking work first.
- Paging works as on every list: `page` and `per_page` (up to 200) for the first 10,000 links, and [cursor paging](/api/paging/) for all of them.
- `/links` has no `sort`, `group_by`, `search` or `select`. To count or group the works on either side, use the [works](/data/works/) filters `cites`, `referenced_works`, `parent_works.id` and `lineage`.
