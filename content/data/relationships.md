---
title: "Relationships"
updated: 2026-11-14
description: "The kinds of part-of link between a work and its parent work (volume, component, data series, part), how parent and child works are built, and how to list a book's chapters or everything under a work."
tags: ["reference"]
entity:
  example: "relationships/volume"
  api: "relationships"
  linksTo:
    - "works"
---
A **relationship** says how a [work](/data/works/) is part of its parent work: a chapter in a book, a figure of a paper, one record of a data series. There are four. Each entry in a work's [`parent_works`](/data/works/attributes/#parent_works) carries one. A relationship's OpenAlex ID looks like `https://openalex.org/relationships/volume`; list all four at [`api.openalex.org/relationships`](https://api.openalex.org/relationships).

## About

### Parent and child works

Some works are pieces of other works. A book chapter is part of its book, a figure with its own DOI is part of its paper, a data file is part of its dataset. In OpenAlex each of these is a work, and the piece names the whole in its `parent_works`. We call the piece a child work and the whole a parent work.

Three attributes on every work carry this:

- [`parent_works`](/data/works/attributes/#parent_works): the works it is part of, each with its relationship.
- [`lineage`](/data/works/attributes/#lineage): the work itself, then every ancestor, nearest first.
- [`child_works_count`](/data/works/attributes/#child_works_count): how many works name it as a parent.

Only part-of links make a parent. Versions of one work (a preprint and its article) are merged into one work. A citation is a reference. A dataset behind a paper is its own work, not the paper's child.

A work can have more than one parent, and a parent can have a parent (a chapter in a book in a book series). There are no loops.

### Which child works show by default

A traditional scholarly work (an article, a chapter, a proceedings paper) shows in search and lists whether or not it has a parent. A child that is not a traditional work (front matter, an encyclopedia entry, a figure, a data file) is left out of the default view: you reach it through its parent. The rule is `has_parent_work:true` and `is_traditional:false`, nothing else. Ask for `corpus=all`, or filter on a parent, to see them. Details: [Expansion corpus › Pieces of other works](/data/works/corpus/#pieces-of-other-works-are-left-out-too).

### Where the links come from

The links come from what the records themselves say:

- **Books.** A chapter, section or reference entry gets its book when the two Crossref records agree on an ISBN, or the chapter's DOI extends the book's.
- **DataCite.** A record gets a parent when it declares `IsPartOf` another DOI and that DOI is also a work.

We leave out declared links that can't be a hierarchy: a record that claims more than 10 parents, two records that each claim to be part of the other, and chains more than 10 levels deep.

### Same words as institutions and awards

`lineage` means what it means on [institutions](/data/institutions/#lineage) and publishers: the thing itself plus all of its ancestors. A relationship on each link is how [awards](/data/awards/) and institutions describe their own parents and children.

## Values

| ID | Display name | Definition |
|----|--------------|------------|
| `volume` | Volume | The work is in a book or proceedings volume: a chapter, entry, front matter or paper of that volume. |
| `component` | Component | The work is a piece of another work that does not stand alone: a figure, table, file or supplement. |
| `data-series` | Data series | The work is one record of a data series: datasets published separately that share an instrument and method. |
| `part` | Part | The work is declared part of another work in some other way: an article in an issue, a dataset in a collection, a component of a project. |

The live list is at [`api.openalex.org/relationships`](https://api.openalex.org/relationships).

## Attributes

The top-level fields on a **relationship** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this relationship, e.g. `https://openalex.org/relationships/volume`. The last segment is the value you filter on.

### `display_name`
*String.* The relationship's name, e.g. `Volume`.

### `description`
*String.* What the relationship means, in a sentence (the definitions in [Values](#values)).

### `works_count`
*Integer.* How many works have a parent through this kind of link. See [Common attributes](/data/common-attributes/#works_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for every work with a parent of this kind (`filter=parent_works.relationship:<ID>`).

### `created_date`
*String.* When the relationship was added to OpenAlex (`YYYY-MM-DDTHH:MM:SS`, an ISO 8601 date and time). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* When the record last changed. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Relationships endpoint is at [`api.openalex.org/relationships`](https://api.openalex.org/relationships). Fetch one by ID, [`/relationships/volume`](https://api.openalex.org/relationships/volume), or list all four.

Relationships are most useful from the works side:

```
# The parts of one book
https://api.openalex.org/works?filter=parent_works.id:W3109397498

# That book and everything under it, at any depth
https://api.openalex.org/works?filter=lineage:W3109397498

# Works that are part of another work, by kind of link
https://api.openalex.org/works?filter=has_parent_work:true&group_by=parent_works.relationship

# Books with more than 100 parts
https://api.openalex.org/works?filter=type:book,child_works_count:>100
```

`parent_works.id` and `lineage` take a work ID, short (`W3109397498`) or full. `parent_works.relationship` takes the short value (`volume`). See [Filtering](/api/filtering/) for the syntax and the [endpoints index](/api/endpoints/) for every endpoint.
