---
title: "Links"
updated: 2026-11-23
description: "Work-to-work links: each joins two works and has a link type (a citation, a review, a pull notice such as a retraction, or a part-of link such as a chapter in its book). How to list a work's links out and in, its reviews and the notices that pulled it, with the /links endpoint."
tags: ["reference"]
entity:
  linksTo:
    - "works"
    - "link-types"
---
A **link** joins two [works](/data/works/) and says how they are related: one cites the other, one reviews the other, one is a notice that retracts, withdraws or removes the other, or one is part of the other (a chapter in its book, a figure in its paper). Every link is three IDs: its `origin` work, its `target` work and its [link type](/data/link-types/). Links are a [component](/data/component/) entity: they have no OpenAlex ID of their own, and you list them for one work at a time at [`api.openalex.org/links`](https://api.openalex.org/links?filter=origin:W2741809807).

```json
{
  "origin": "https://openalex.org/W2741809807",
  "target": "https://openalex.org/W1560783210",
  "link_type": "https://openalex.org/link-types/citation"
}
```

A link carries no titles. To get them, look the works up: [`/works?filter=openalex:W1560783210|W1724212071&select=id,display_name`](https://api.openalex.org/works?filter=openalex:W1560783210|W1724212071&select=id,display_name).

## About

### Where links come from

Links are the same data you already see on each work, read from the other side too:

- **Citations** come from a work's [`referenced_works`](/data/works/attributes/#referenced_works): the works in its reference list that we matched to a work. See [Citations](/data/works/citations/) for how reference lists are read and matched. A reference we couldn't match to a work is not a link.
- **Reviews** come from the review records themselves: a Crossref peer review record that names the work it reviews, or a book review matched to the book it names. The work reviewed counts them in [`reviewed_by_count`](/data/works/attributes/#reviewed_by_count). See [Link types › Reviews](/data/link-types/#reviews) for what counts as a review and where they come from.
- **Pull notices** come from the notices themselves: a Crossref notice record that names the work it retracts, withdraws or removes, a PubMed retraction notice paired with its article, or a Retraction Watch notice paired with its paper. The pulled work lists them in [`pull_notice_works`](/data/works/attributes/#pull_notice_works). See [Link types › Pull notices](/data/link-types/#pull-notices-retraction-withdrawal-and-removal) for the three kinds (`retraction`, `withdrawal`, `removal`) and how they map onto other vocabularies.
- **Part-of links** come from a work's [`parent_works`](/data/works/attributes/#parent_works): its book, its paper, its data series. See [Link types](/data/link-types/) for the four part-of kinds and where they come from.

The `origin` is always the work that holds the link: the citing work, the review, the notice, or the part. The `target` is the work it points to: the cited work, the work reviewed, the work pulled, or the whole. A link always joins two different works. Versions of one work (a preprint and its published article) are merged into one work, never linked.

### Which works count

Every work counts, including works the default works view leaves out ([expansion works and pieces of other works](/data/works/corpus/), and [pulled works](/data/works/pulled/)): a link is a fact about two works, most part-of links lead to pieces such as figures, and pull notice links lead to pulled works. So a work's incoming citation links can number more than [`/works?filter=cites:`](/api/filtering/) returns by default.

## Attributes

### `origin`
*String.* The OpenAlex ID of the work that holds the link: the citing work, the review, the notice, or the part.

### `target`
*String.* The OpenAlex ID of the work it points to: the cited work, the work reviewed, the work pulled, or the whole. In rare cases the target is no longer in OpenAlex.

### `link_type`
*String.* The [link type](/data/link-types/#values)'s OpenAlex ID, such as `https://openalex.org/link-types/citation`. The nine are `citation`, `review`, `retraction`, `withdrawal`, `removal`, `volume`, `component`, `data-series` and `part`.

### `relationship`
*String.* The same link type under its old name and ID form, such as `https://openalex.org/relationships/citation`. Served until Monday 7 December 2026, then removed: read `link_type` instead ([Deprecations](/api/deprecations/#relationships-renamed-link-types)).

### Why `origin` and `target`

`target` is the usual word for the far end of a link, on the web and in graph tools. The usual word for the near end, `source`, is already an OpenAlex entity (the journal or repository a work appears in), and `from` and `to` are reserved words in Python and SQL, so they would need quoting in pyalex and in queries on the snapshot.

## In the API

Every request names a work with `origin` or `target`; a request that names none answers an error with examples.

```
# The works W2117905317 cites, and the works it is part of
https://api.openalex.org/links?filter=origin:W2117905317

# The works that cite W2741809807 or are part of it
https://api.openalex.org/links?filter=target:W2741809807

# Only one kind of link (join several with |)
https://api.openalex.org/links?filter=target:W2741809807,link_type:component

# The reviews of a work
https://api.openalex.org/links?filter=target:W2045435533,link_type:review

# The work a review reviews
https://api.openalex.org/links?filter=origin:W4233084407,link_type:review

# The notices that pulled a work: retracted, withdrew or removed it
https://api.openalex.org/links?filter=target:W2117847125,link_type:retraction|withdrawal|removal

# The links between two works
https://api.openalex.org/links?filter=origin:W2117905317,target:W88818295
```

- `origin` and `target` take one work ID, short (`W2741809807`) or full. A merged-away ID is read as the work it was merged into, and named in `meta.merged_ids`.
- `link_type` takes `citation`, `review`, `retraction`, `withdrawal`, `removal`, `volume`, `component`, `data-series` or `part` (the short value or the full ID). The old filter name `relationship` works too, until 1 March 2027.
- Order: no order is promised yet; links come back in the order they are stored. To get one kind, such as a work's reviews or its figures, filter on `link_type`.
- Paging works as on every list: `page` and `per_page` (up to 200) for the first 10,000 links, and [cursor paging](/api/paging/) for all of them. A cursor walk sees the links as they were when it started; ask for each next page within 5 minutes, or start again with `cursor=*`.
- `/links` has no `sort`, `group_by`, `search` or `select`. To count or group the works on either side, use the [works](/data/works/) filters `cites`, `referenced_works`, `parent_works.id`, `lineage`, `reviewed_by_count` and `pull_notice_works.id`.

Until 18 November 2026 the fields were `from` and `to`, each with an `id` and `display_name`, and `relationship` was the bare value (`citation`). The `from:` and `to:` filters now answer an error naming the new ones.
