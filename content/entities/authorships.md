---
title: "Authorships"
description: "The join between a work and its authors — the raw name each author printed, their position, whether they're corresponding, and the institutions they listed — and what every field on an authorship object means."
tags: ["reference"]
---
An **authorship** is the join between a [work](/entities/works/) and one of its [authors](/entities/authors/): for a single author, it records their raw name as printed on the work, their position in the byline, whether they're the corresponding author, and the institutions they listed. Authorships are a [component](/entities/component/) entity — they don't get their own OpenAlex ID and you never fetch one directly. They live inside a work object, one per author, in the [`authorships`](/entities/works/#authorships) list. Fetch a work such as [`api.openalex.org/works/W2741809807`](https://api.openalex.org/works/W2741809807) and read its `authorships` array to see them.

## How we build it

An authorship starts with a work's **byline** — the author-and-affiliation block as it appears on the source record (Crossref, PubMed, ORCID, a repository, or a publisher website). OpenAlex preserves the raw text it received — the raw author name in [`raw_author_name`](#raw_author_name) and the raw affiliation text in [`raw_affiliation_strings`](#raw_affiliation_strings) — and then does two rounds of resolution on top of it.

### Resolving the author

The raw author name is fed into **author disambiguation** — the process that clusters the messy name strings across millions of works into real-world people and assigns each a stable author ID. That resolved person is what fills the dehydrated [`author`](#author) object. See [authors](/entities/authors/#how-we-build-it) for how disambiguation weighs its signals, why it can split or merge, and how to correct it.

### Resolving the institutions

Each of the author's [`raw_affiliation_strings`](#raw_affiliation_strings) is matched to one or more ROR-backed [institutions](/entities/institutions/). The mapping — which raw string produced which institution IDs — is preserved in [`affiliations`](#affiliations); the flattened, deduplicated institutions are mirrored into [`institutions`](#institutions) and their countries into [`countries`](#countries). See [raw affiliation strings](/entities/raw-affiliation-strings/) for the parsing pipeline, its benchmarks, and its failure modes.

### The 100-author cap

To keep works fast to serve, the `authorships` list is capped at the **first 100 authors**. Works with thousands of authors (large collaborations, consortium papers) are truncated to the first hundred by byline position; the rest are dropped from the list. Counts like [`countries_distinct_count`](/entities/works/#countries_distinct_count) reflect only the authorships that survive the cap.

## Fields

This is the dictionary of every field on an **authorship** object, as it appears inside a work's [`authorships`](/entities/works/#authorships) list. Authorships are a component entity, so they carry none of the [common fields](/entities/common-fields/) (no `id`, `works_count`, etc.) — an authorship has no OpenAlex ID of its own.

### `author_position`
*String.* Where this author sits in the byline: `first`, `middle`, or `last`. Derived from byline order, so it tracks the printed sequence rather than any notion of credit or seniority.

### `author`
*Object.* The dehydrated [author](/entities/authors/) this authorship resolved to: `id` (the OpenAlex author ID), `display_name`, and `orcid` (or null). This is the disambiguated person — follow the `id` to the full author object.

### `institutions`
*List.* The distinct [institutions](/entities/institutions/) this author was affiliated with on this work, each dehydrated: `id`, `display_name`, `ror`, `country_code`, `type`, and `lineage` (the institution and all its ROR ancestors). A flattened view of what [`affiliations`](#affiliations) records per raw string.

### `countries`
*List.* The distinct [country codes](/entities/countries/) (ISO 3166-1 alpha-2) for this author's institutions, e.g. `["CA", "US"]`. Derived from the matched institutions, or assigned directly from the raw string's address when no institution matched.

### `is_corresponding`
*Boolean.* True if this author is marked as a corresponding author on the work. Corresponding authors are also collected at the work level in [`corresponding_author_ids`](/entities/works/#corresponding_author_ids).

### `raw_author_name`
*String.* The author's name exactly as it appeared on the source record, before disambiguation — e.g. `"Heather Piwowar"`. The unnormalized input to author resolution; the resolved person is in [`author`](#author).

### `raw_affiliation_strings`
*List.* The exact affiliation text this author printed, one string per affiliation, before institution matching — e.g. `["Impactstory, Sanford, NC, USA"]`. The raw input to institution disambiguation; see [raw affiliation strings](/entities/raw-affiliation-strings/).

### `affiliations`
*List.* The mapping from each raw affiliation string to the institutions it matched. Each element is an object with `raw_affiliation_string` (one of the strings above) and `institution_ids` (the OpenAlex institution IDs that string resolved to). This preserves *which* printed string produced *which* institutions, information that the flattened [`institutions`](#institutions) list loses.

### `raw_orcid`
*String.* The ORCID iD as it arrived on the source record for this authorship, or null. The raw input behind the resolved [`author.orcid`](#author); present so you can see the asserted ORCID even when it differs from the disambiguated author's.

## In the API

Authorships aren't a top-level endpoint — there's no `/authorships` you can list or fetch. You reach them by selecting the [`authorships`](/entities/works/#authorships) field on [works](/entities/works/), where they appear inline on each work object.

You can still filter works by authorship attributes using **dotted filter keys** on the works endpoint — the sub-fields flatten into filterable columns:

- `authorships.author.id` — works by a given author
- `authorships.author.orcid` — works by a given ORCID
- `authorships.institutions.id` / `.ror` / `.country_code` / `.type` / `.lineage` — works affiliated with an institution (or its lineage, country, or type)
- `authorships.countries` — works with an author from a given country
- `authorships.is_corresponding` — works filtered on corresponding-author status
- `authorships.affiliations.institution_ids` — works whose raw-string-to-institution mapping includes an institution

See [Filtering](/api/filtering/) for the full syntax and the [Works reference](/entities/works/) for the complete list of authorship filter keys.
