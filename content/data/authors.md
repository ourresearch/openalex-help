---
title: "Overview"
updated: 2026-08-19
description: "What an author is, why a profile is built from its works, and what every attribute on an author object means."
tags: ["reference"]
source_id: "24347048891543"
source_url: "https://help.openalex.org/hc/en-us/articles/24347048891543-Author-disambiguation"
source_updated: "2026-03-06"
entity:
  example: "A5023888391"
  api: "authors"
  linksTo:
    - "authorships"
    - "institutions"
---
An **author** is a person who creates [works](/data/works/) — a researcher, scholar, or anyone credited on a scholarly document. Authors are one of OpenAlex's [native entities](/data/native/): OpenAlex mints each a stable ID by *disambiguating* the messy author-name strings that appear on works into real-world people. There are over 120 million disambiguated authors. An author's OpenAlex ID looks like `A5023888391`; fetch one at [`api.openalex.org/authors/A5023888391`](https://api.openalex.org/authors/A5023888391).

This page covers what a profile is and what every attribute means. How profiles are built from raw author names is on [Disambiguation](/data/authors/disambiguation/); how OpenAlex sources and uses ORCID iDs — and why a profile may be missing one — is on [ORCID](/data/authors/orcid/).

## About

Scholarly works list author names in all sorts of ways. "J. Smith," "John Smith," and "John A. Smith" might all be the same person — or three different people. OpenAlex builds author profiles by **disambiguating** those names — deciding which authorships across millions of works belong to the same real-world person, and giving each person a stable ID. How that works — the signals the model weighs, the 2023 upgrade, the special NULL and deleted-author IDs, and the ways it fails — is on [Disambiguation](/data/authors/disambiguation/). How ORCID fits in is on [ORCID](/data/authors/orcid/).

### A profile is built from its works

This is the single most useful thing to understand about author profiles: **a profile is a set of works, and almost everything else on it is computed from those works.** The alternate names are the name variants printed on the linked works. The affiliations are the institutions those works carry. The topics, the citation counts, `works_count`, `summary_stats` — all derived. OpenAlex doesn't store them separately, and nobody can edit them directly.

So the fix for nearly any author problem is to change *which works belong to the profile*, and let everything else follow:

- **A wrong institution on a profile** is there because some linked work carries it. Ask which work, and either remove that work (if it isn't the author's) or correct its affiliation (if it is — that's an [affiliation fix](/access/fixing-errors/affiliations/), not an author fix).
- **Removing a name variant** detaches every work printed under that name — and with them, any institution, topic, or citation those works were contributing. Institutions still supported by the works you keep stay put.
- **Removing a work** likewise takes its affiliations with it, for the same reason.
- **"Merging" duplicate profiles** is just moving the works from one to the other; the emptied profile goes inert. There's no separate merge operation underneath.

If you're ever surprised that an institution, name, or topic disappeared from a profile after an edit, this is why: you changed the works, and the profile re-derived itself. See [Fixing errors: Authors](/access/fixing-errors/authors/) for the mechanics, and [Disambiguation § Known failure modes](/data/authors/disambiguation/#known-failure-modes) for the two classic ways profiles go wrong.

## Attributes

This is the canonical dictionary of every attribute on an **author** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`ids`](/data/common-attributes/#ids), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`summary_stats`](/data/common-attributes/#summary_stats), [`counts_by_year`](/data/common-attributes/#counts_by_year), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/); author-specific notes on them are below.

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this author, e.g. `https://openalex.org/A5023888391`. See [Common attributes](/data/common-attributes/#id).

### `ids`
*Object.* All known external identifiers for this author, as URIs where possible; keys with no value are omitted. Author keys are `openalex`, `orcid`, and (rarely) `scopus`. Filter, group_by, and sort on the `orcid` and `scopus` sub-keys.

### `display_name`
*String.* The author's name — the single most-frequent, most-informative form observed across their works. See [Common attributes](/data/common-attributes/#display_name). Filterable and sortable; free-text name search uses the `search` parameter (the `display_name.search` filter is deprecated).

### `display_name_alternatives`
*List.* Other name strings seen for this author, deduplicated (e.g. `["Jason Priem", "Priem, Jason"]`). Useful for matching against name forms that differ from the canonical [`display_name`](#display_name).

### `orcid`
*String.* The author's [ORCID](https://orcid.org/) iD as a URL, or null. ORCID is the canonical external identifier for authors; each is meant to map to one OpenAlex author. Filter, sort, and group_by are supported; use `has_orcid:true`/`false` to select on presence. Null far more often than you'd expect — an ORCID only reaches OpenAlex attached to a work's metadata, and most authorships don't carry one. How it's sourced, used, and set: [ORCID](/data/authors/orcid/).

### `full_name`
*String.* The author's full name as parsed from their works. In practice usually identical to [`display_name`](#display_name).

### `raw_author_names`
*List.* The exact raw author-name strings, as they appeared on the source works, that were clustered into this author during [disambiguation](#about). The unnormalized inputs behind [`display_name_alternatives`](#display_name_alternatives).

### `affiliations`
*List.* The author's affiliation history: one entry per [institution](/data/institutions/), each `{ institution, years }`, where `institution` is a dehydrated institution (with `id`, `ror`, `display_name`, `country_code`, `type`, `lineage`) and `years` lists the publication years OpenAlex saw them there. Derived from the [`authorships`](/data/authorships/) on the author's works. Like other precomputed conveniences it's capped — it reflects roughly the last **10 years**; for a complete affiliation history, query [works](/data/works/) filtered by `author.id` and the institution and group by year. Filter/sort/group_by on the dotted sub-fields `affiliations.institution.id`, `.ror`, `.country_code`, `.type`, and `.lineage`.

### `last_known_institutions`
*List.* The [institution(s)](/data/institutions/) from the author's most recent work, dehydrated (`id`, `ror`, `display_name`, `country_code`, `type`, `lineage`), or an empty list / null when unknown. A convenience for "where are they now"; the full picture is in [`affiliations`](#affiliations). Filter/sort/group_by on `last_known_institutions.id`, `.ror`, `.country_code`, `.continent`, `.is_global_south`, `.type`, and `.lineage`.

### `topics`
*List.* The [topics](/data/topics/) this author works on most, ranked, each with a `count` of the author's works on it plus its `subfield`, `field`, and `domain`. Filter and group_by with `topics.id`. See [Aboutness](/data/aboutness/) for how topics are assigned.

### `topic_share`
*List.* The author's share of world output on each [topic](/data/topics/): a `value` measuring how concentrated the author is on that topic relative to everyone. Higher means the author accounts for a larger fraction of that topic's works. Filter and group_by with `topic_share.id`.

### `x_concepts` *(deprecated)*
*List.* Legacy [concept](/data/concepts/) tags the author works on, each with a `score` (0–100). Concepts are a superseded classification retained for continuity; [`topics`](#topics) are the current one. Filter and group_by with `x_concepts.id`.

### `works_count`
*Integer.* Number of [works](/data/works/) by this author. See [Common attributes](/data/common-attributes/#works_count). Filterable, sortable, and groupable. Authors with `works_count:0` (e.g. profiles emptied by curation) are hidden from list results by default.

### `cited_by_count`
*Integer.* Total citations across all of this author's works. See [Common attributes](/data/common-attributes/#cited_by_count).

### `summary_stats`
*Object.* Precomputed bibliometric indicators — `2yr_mean_citedness`, `h_index`, `i10_index`. See [Common attributes](/data/common-attributes/#summary_stats). Each sub-field is filterable, sortable, and groupable (e.g. `summary_stats.h_index:>40`).

### `counts_by_year`
*List.* Per-year `{ year, works_count, oa_works_count, cited_by_count }` for roughly the last ten years. See [Common attributes](/data/common-attributes/#counts_by_year) — including why the array's sort direction isn't consistent across entity types (sort by `year` yourself).

### `works_api_url`
*String.* A ready-made [Works API](/data/works/) URL that returns this author's works — `https://api.openalex.org/works?filter=author.id:A…`. A convenience so you don't have to build the filter yourself.

### `block_key`
*String.* An internal blocking key (a coarse name signature, e.g. `j priem`) used during [disambiguation](#about) to group candidate authorships before finer clustering. Exposed mainly for debugging; filterable/sortable/groupable.

### `created_date`
*String.* The date this author was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to anything in the author object — including routine citation-count recomputation. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Authors endpoint is at [`api.openalex.org/authors`](https://api.openalex.org/authors). Fetch a single author by ID — [`/authors/A5023888391`](https://api.openalex.org/authors/A5023888391) — or a list, and [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over the fields above. Authors with no works are hidden from list results by default. For the full list of endpoints see the [endpoints index](/api/endpoints/).
