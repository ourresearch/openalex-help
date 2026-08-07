---
title: "Common attributes"
description: "The attributes that appear on nearly every OpenAlex entity — id, ids, display_name, counts_by_year, summary_stats, and the rest — documented once."
tags: ["reference"]
---
A handful of attributes appear on nearly every OpenAlex entity. They mean the same thing everywhere, so they're documented here once; each entity's own [attribute dictionary](/data/works/attributes/) links back to this page rather than repeating them.

## Identity

### `id`
*String.* The canonical [OpenAlex ID](/data/overview/#the-openalex-id-scheme) for this entity, as a URL, e.g. `https://openalex.org/A5023888391`. Stable; if the entity is later [merged](/data/overview/#merged-entities) into another, this ID permanently redirects to the survivor.

### `ids`
*Object.* All known identifiers for this entity, expressed as URIs where possible, keyed by namespace — always `openalex`, plus whichever external IDs apply to the entity type (`doi`, `orcid`, `ror`, `issn_l`, `wikidata`, `mag`, …). Keys with no known value are omitted.

### `display_name`
*String.* The entity's name — a work's title, an author's name, a source's title, an institution's name. Every entity has one.

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
*List.* Per-year rollup of the entity's activity for roughly the last ten years, each element `{ year, works_count, cited_by_count }` (author/source/etc. objects also carry `oa_works_count`). Handy for sparklines and trend lines. **The array's sort direction is not consistent across entity types** — always sort by `year` yourself before slicing the most-recent N.

## Provenance timestamps

### `created_date`
*String.* The date this entity was first added to OpenAlex, as an `YYYY-MM-DD` date.

### `updated_date`
*String.* The datetime this entity was last changed in any way (an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime). Note this reflects *any* update, including routine recomputation of citation counts — not only meaningful metadata changes.

## In the API

These fields are selectable, and most are filterable and sortable, on every entity endpoint — see [Selecting fields](/api/selecting-fields/) and [Filtering](/api/filtering/). The exact operations each field supports are listed in that entity's attribute dictionary.
