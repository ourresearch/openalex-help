---
title: "Authorships"
updated: 2026-09-23
description: "The join between a work and its authors — the raw name each author printed, their position, whether they're corresponding, and the institutions they listed — and what every attribute on an authorship object means."
tags: ["reference"]
entity:
  linksTo:
    - "works"
    - "authors"
    - "institutions"
---
An **authorship** is the join between a [work](/data/works/) and one of its [authors](/data/authors/): for a single author, it records their raw name as printed on the work, their position in the byline, whether they're the corresponding author, and the institutions they listed. Authorships are a [component](/data/component/) entity — they don't get their own OpenAlex ID. Today they live inside a work object, one per author, in the [`authorships`](/data/works/attributes/#authorships) list: fetch a work such as [`api.openalex.org/works/W2741809807`](https://api.openalex.org/works/W2741809807) and read its `authorships` array to see them. A standalone authorships list endpoint (like the ones the other two components — [locations](/data/locations/) and [raw affiliation strings](/data/raw-affiliation-strings/) — already have) is on the way.

## About

An authorship starts with a work's **byline** — the author-and-affiliation block as it appears on the source record (Crossref, PubMed, ORCID, a repository, or a publisher website). OpenAlex preserves the raw text it received — the raw author name in [`raw_author_name`](#raw_author_name) and the raw affiliation text in [`raw_affiliation_strings`](#raw_affiliation_strings) — and then does two rounds of resolution on top of it.

### Resolving the author

The raw author name is fed into **author disambiguation** — the process that clusters the messy name strings across millions of works into real-world people and assigns each a stable author ID. That resolved person is what fills the dehydrated [`author`](#author) object. See [Disambiguation](/data/authors/disambiguation/) for how disambiguation weighs its signals, why it can split or merge, and how to correct it.

### Resolving the institutions

Each of the author's [`raw_affiliation_strings`](#raw_affiliation_strings) is matched to one or more ROR-backed [institutions](/data/institutions/). The mapping — which raw string produced which institution IDs — is preserved in [`affiliations`](#affiliations); the flattened, deduplicated institutions are mirrored into [`institutions`](#institutions) and their countries into [`countries`](#countries). See [raw affiliation strings](/data/raw-affiliation-strings/) for the parsing pipeline, its benchmarks, and its failure modes.

### The 100-author cap

To keep works fast to serve, the `authorships` list is capped at the **first 100 authors**. Works with thousands of authors (large collaborations, consortium papers) are truncated to the first hundred by byline position; the rest are dropped from the list. Counts like [`countries_distinct_count`](/data/works/attributes/#countries_distinct_count) reflect only the authorships that survive the cap.

## Attributes

This is the dictionary of every attribute on an **authorship** object, as it appears inside a work's [`authorships`](/data/works/attributes/#authorships) list. Authorships are a component entity, so they carry none of the [common attributes](/data/common-attributes/) (no `id`, `works_count`, etc.) — an authorship has no OpenAlex ID of its own.

### `author_position`
*String.* Where this author sits in the byline: `first`, `middle`, or `last`. Derived from byline order, so it tracks the printed sequence rather than any notion of credit or seniority.

### `author`
*Object.* The dehydrated [author](/data/authors/) this authorship resolved to: `id` (the OpenAlex author ID), `display_name`, `orcid` (the profile's primary ORCID, or null), and `observed_orcids` (every ORCID trusted on the profile's works, as URLs, primary first; empty when there is none — the same list as the author's [`observed_orcids`](/data/authors/#observed_orcids)). This is the disambiguated person — follow the `id` to the full author object.

### `institutions`
*List.* The distinct [institutions](/data/institutions/) this author was affiliated with on this work, each dehydrated: `id`, `display_name`, `ror`, `country_code`, `type`, and `lineage` (the institution and all its ROR ancestors). A flattened view of what [`affiliations`](#affiliations) records per raw string.

### `countries`
*List.* The distinct [country codes](/data/countries/) (ISO 3166-1 alpha-2) for this author's institutions, e.g. `["CA", "US"]`. Derived from the matched institutions, or assigned directly from the raw string's address when no institution matched.

### `is_corresponding`
*Boolean.* True if this author is marked as a corresponding author on the work. Corresponding authors are also collected at the work level in [`corresponding_author_ids`](/data/works/attributes/#corresponding_author_ids).

### `raw_author_name`
*String.* The author's name exactly as it appeared on the source record, before disambiguation — e.g. `"Heather Piwowar"`. The unnormalized input to author resolution; the resolved person is in [`author`](#author).

### `raw_affiliation_strings`
*List.* The exact affiliation text this author printed, one string per affiliation, before institution matching — e.g. `["Impactstory, Sanford, NC, USA"]`. The raw input to institution disambiguation; see [raw affiliation strings](/data/raw-affiliation-strings/).

### `affiliations`
*List.* The mapping from each raw affiliation string to the institutions it matched. Each element is an object with `raw_affiliation_string` (one of the strings above) and `institution_ids` (the OpenAlex institution IDs that string resolved to). This preserves *which* printed string produced *which* institutions, information that the flattened [`institutions`](#institutions) list loses.

### `raw_orcid`
*String.* The ORCID iD as it arrived on the source record for this authorship, or null. The raw input behind the resolved [`author.orcid`](#author); present so you can see the asserted ORCID even when it differs from the disambiguated author's. Reported as deposited, right or wrong: a wrong one is corrected with the publisher, not in OpenAlex ([how](/how-to/fixing-authors/#a-paper-shows-the-wrong-orcid-for-me-can-i-fix-it)).

## In the API

There's no `/authorships` list endpoint yet — one is on the way, which will let you page over authorships directly the way you already can with [locations](/data/locations/) and [raw affiliation strings](/data/raw-affiliation-strings/). For now you reach authorships by selecting the [`authorships`](/data/works/attributes/#authorships) field on [works](/data/works/), where they appear inline on each work object.

You can still filter works by authorship attributes using **dotted filter keys** on the works endpoint — the sub-fields flatten into filterable columns:

- `authorships.author.id` — works by a given author
- `authorships.author.orcid` — works by a given ORCID; matches the author's primary ORCID or any entry of their `observed_orcids`
- `authorships.institutions.id` / `.ror` / `.country_code` / `.type` / `.lineage` — works affiliated with an institution (or its lineage, country, or type)
- `authorships.countries` — works with an author from a given country
- `authorships.is_corresponding` — works filtered on corresponding-author status
- `authorships.affiliations.institution_ids` — works whose raw-string-to-institution mapping includes an institution

### Filtering by author position

Six filters pair a position with the author, institution or country on that same authorship, so you can ask for works where a given person is the **last author** (the usual "what does this lab publish" question) or where the **first author** is at a given institution:

- `first_author_ids` / `last_author_ids`: works whose first (or last) author is a given [author](/data/authors/)
- `first_author_institution_ids` / `last_author_institution_ids`: works whose first (or last) author lists a given [institution](/data/institutions/)
- `first_author_countries` / `last_author_countries`: works whose first (or last) author has an affiliation in a given [country](/data/countries/)

For example, [`/works?filter=last_author_ids:A5023888391`](https://api.openalex.org/works?filter=last_author_ids:A5023888391) lists works where that author is last, and `filter=first_author_institution_ids:I136199984` lists works first-authored at that institution. They combine like any filter, accept `|` for OR and `!` for NOT, and work with `group_by` (for example `group_by=last_author_institution_ids`). In OQL they read `last author is`, `first author institution is`, `first author country is`, and so on.

Pairing matters: `authorships.author.id:A123,authorships.institutions.id:I456` finds works where A123 is *an* author and *someone* is at I456, not necessarily the same person. These filters keep the pair together.

Three things to know about position:

- **It follows the byline, using [`author_position`](#author_position).** A sole author is the first author only, so single-author works don't appear under `last_author_ids`. To count them too, use OQL: `works where last author is A123 or (first author is A123 and authors count is 1)`.
- **It uses every author, not just the first 100.** The last author of a 3,000-author paper is the real last author, even though the [`authorships`](/data/works/attributes/#authorships) list on the work stops at 100.
- **Byline order isn't credit.** Equal-contribution first authors, and fields that list authors alphabetically (much of mathematics, economics and high-energy physics), make "first" and "last" weaker signals there. OpenAlex reports the printed order and doesn't try to correct for this.

See [Filtering](/api/filtering/) for the full syntax and the [Works reference](/data/works/) for the complete list of authorship filter keys.
