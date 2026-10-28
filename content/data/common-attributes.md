---
title: "Common attributes"
updated: 2026-10-28
description: "The attributes that appear on nearly every OpenAlex entity — id, ids, display_name, counts_by_year, summary_stats, and the rest — documented once."
tags: ["reference"]
---
A handful of attributes appear on nearly every OpenAlex entity. They mean the same thing everywhere, so they're documented here once; each entity's own [attribute dictionary](/data/works/attributes/) links back to this page rather than repeating them.

## Identity

### `id`
*String.* The canonical [OpenAlex ID](/data/#the-openalex-id-scheme) for this entity, as a URL, e.g. `https://openalex.org/A5023888391`. Stable and never reused; if the entity is later [merged](/data/#merged-entities) into another, requests for this ID usually return the survivor (best effort, not a permanence promise).

### `ids`
*Object.* All known identifiers for this entity, expressed as URIs where possible, keyed by namespace — always `openalex`, plus whichever external IDs apply to the entity type (`doi`, `orcid`, `ror`, `issn_l`, `wikidata`, `mag`, …). A key with no known value is left out on some entities (works, topics) and present as `null` on others (authors, sources, institutions, publishers, funders, concepts), so check for both.

### `display_name`
*String or null.* The entity's name — a work's title, an author's name, a source's title, an institution's name. Every entity has one, except a [work](/data/works/attributes/#title) or [award](/data/awards/#display_name) that no source gives a title, where it is null.

## Scale & influence

### `works_count`
*Integer.* How many works are associated with this entity — authored by an author, published in a source, affiliated with an institution, tagged with a topic, and so on. For [works](/data/works/) themselves this field is absent.

### `cited_by_count`
*Integer.* The total number of [citations](/data/works/attributes/#cited_by_count) this entity has received — summed across all of its works for non-work entities. Recomputed as the graph updates, so it drifts upward over time.

### `summary_stats`
*Object.* A few precomputed bibliometric indicators for the entity:

- `2yr_mean_citedness` — the [journal impact factor](/data/sources/)-style 2-year mean citedness.
- `h_index` — the [h-index](https://en.wikipedia.org/wiki/H-index).
- `i10_index` — the number of works with at least 10 citations.

These are convenience metrics; for anything rigorous, compute over the underlying works. Not available on works.

### `counts_by_year`
*List.* Per-year rollup of the entity's activity, each element `{ year, works_count, cited_by_count }` (author, source, institution and funder objects also carry `oa_works_count`). Handy for sparklines and trend lines.

- `works_count` (and `oa_works_count`) counts the entity's works **published** in that year.
- `cited_by_count` counts the citations the entity's works **received** in that year, whenever those works were published. It is the sum of the works' own [`counts_by_year`](/data/works/attributes/#counts_by_year), so it means the same thing as on a work. A year in which the entity was cited but published nothing appears with `works_count: 0`.
- Citations are binned by year from 2012, so earlier years show `cited_by_count: 0`. Years after the current one never appear, and years with neither works nor citations are left out.
- How far back the list goes depends on the entity type: every publication year for authors, sources and funders; from 2010 for institutions; from 2014 for publishers.

**The array's sort direction is not consistent across entity types** — always sort by `year` yourself before slicing the most-recent N.

## Provenance timestamps

### `created_date`
*String.* When this entity was first added to OpenAlex, as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time, e.g. `2016-06-24T00:00:00`. Works, authors and sources record only the day, so their time is always `00:00:00`; awards add milliseconds and a `Z` (`2026-07-13T04:19:57.000Z`). The first 10 characters are the date. A work's `created_date` never moves later, even when its record is rebuilt ([works](/data/works/attributes/#created_date)).

### `updated_date`
*String.* The datetime this entity was last changed in any way (an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime). Note this reflects *any* update, including routine recomputation of citation counts — not only meaningful metadata changes.

## In the API

These fields are selectable, and most are filterable and sortable, on every entity endpoint — see [Selecting fields](/api/selecting-fields/) and [Filtering](/api/filtering/). The exact operations each field supports are listed in that entity's attribute dictionary.
