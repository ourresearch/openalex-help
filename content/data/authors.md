---
title: "Authors"
description: "What an author is, how OpenAlex disambiguates them from raw authorship strings, and what every field on an author object means."
tags: ["reference"]
source_id: "24347048891543"
source_url: "https://help.openalex.org/hc/en-us/articles/24347048891543-Author-disambiguation"
source_updated: "2026-03-06"
---
An **author** is a person who creates [works](/data/works/) — a researcher, scholar, or anyone credited on a scholarly document. Authors are one of OpenAlex's [native entities](/data/native/): OpenAlex mints each a stable ID by *disambiguating* the messy author-name strings that appear on works into real-world people. There are over 120 million disambiguated authors. An author's OpenAlex ID looks like `A5023888391`; fetch one at [`api.openalex.org/authors/A5023888391`](https://api.openalex.org/authors/A5023888391).

## How it's made

Scholarly works list author names in all sorts of ways. "J. Smith," "John Smith," and "John A. Smith" might all be the same person — or three different people. **Author disambiguation** — the process we call **author entity resolution (AER)** — is how OpenAlex decides which authorships across millions of works belong to the same real-world person, and assigns each a stable author ID. Author data comes from [Crossref](https://www.crossref.org/), [PubMed](https://pubmed.ncbi.nlm.nih.gov/), [ORCID](https://orcid.org/), publisher websites, and the legacy [Microsoft Academic Graph](https://en.wikipedia.org/wiki/Microsoft_Academic).

### The challenge

The same person's name appears differently from paper to paper, and different people share the same name. OpenAlex uses machine learning to cluster authorships into real-world authors even when the name strings vary — and to keep distinct people apart even when their names match.

### The signals

The disambiguation model weighs six signals when deciding whether two authorship records belong to the same person:

1. **Name similarity** — string matching across name variants.
2. **Co-author patterns** — shared collaborators across papers.
3. **Institutional affiliations** — consistent workplace signals.
4. **Research topics** — whether the publication record is topically coherent.
5. **Citation patterns** — self-citation and reference overlap.
6. **ORCID** — when present, an authoritative identity signal.

So if "J. Schmidt" and "John Jacob Jingleheimer Schmidt" both write about 19th-century ketchup production at the same university, we treat them as one author — but we won't lump in the J.J.J. Schmidt who writes about weasel migration, even though the names match.

The institutional-affiliation signal itself comes from OpenAlex parsing each work's [raw affiliation strings](/data/raw-affiliation-strings/) into [institutions](/data/institutions/) — see those pages for how affiliation text is matched to ROR-backed institutions and countries.

### The July 2023 upgrade

In July 2023, OpenAlex switched to a significantly improved disambiguation system: a better clustering model, smarter assignment for newly published works, and deeper ORCID integration. As part of the switch, all old author IDs were deprecated and every author was assigned a new ID. The old IDs and their works are preserved [as a data dump](https://zenodo.org/record/8189450). New author IDs have a numeric component above 5000000000 and have been used since late July 2023 (and in snapshots from August 2023 onward).

### Special author IDs

Two author IDs fall outside the normal disambiguation process; you may encounter them, especially in the [snapshot](/docs/snapshot/):

- **`A9999999999` — the NULL author.** Assigned to authorships that never went through disambiguation: no author name was received, the name was too short or too long to disambiguate reliably, or the name matched an ignored phrase (like "Unknown Author"). If an author asks to have their disambiguated profile removed, their works are reassigned here — effectively removing the profile. These records are grouped under this single NULL author rather than real profiles. For the short version, see [Why are some authors assigned to NULL AUTHOR_ID (A9999999999)?](/help/why-are-some-authors-assigned-to-null-author-id/) in the Help center.
- **`A5317838346` — deleted authors.** Used when an author ID is removed from OpenAlex, usually because it no longer has any works (its works were merged into another author or deleted).

### Known failure modes

Disambiguation isn't perfect. The two failure modes are **splitting** (one real person's works spread across several profiles) and **merging** (works from different people collapsed into one profile). Because a profile's attributes — alternate names, institutions, metrics, topics — are all derived from its linked works, they can't be edited directly. You fix an author by [correcting which works belong to them](/data/curations/): see [How can I fix errors in an OpenAlex author profile?](/help/how-can-i-fix-errors-in-an-openalex-author-profile/). Our methods, code, and trained models are fully open source ([openalex-name-disambiguation](https://github.com/ourresearch/openalex-name-disambiguation/tree/main/V3); [live pipeline](https://github.com/ourresearch/openalex-databricks/tree/main/jobs/author_name_disambiguation/v3)).

## Fields

This is the canonical dictionary of every field on an **author** object. Fields shared with other entities ([`id`](/data/common-fields/#id), [`ids`](/data/common-fields/#ids), [`display_name`](/data/common-fields/#display_name), [`works_count`](/data/common-fields/#works_count), [`cited_by_count`](/data/common-fields/#cited_by_count), [`summary_stats`](/data/common-fields/#summary_stats), [`counts_by_year`](/data/common-fields/#counts_by_year), [`created_date`](/data/common-fields/#created_date), [`updated_date`](/data/common-fields/#updated_date)) are documented once on [Common fields](/data/common-fields/); author-specific notes on them are below.

### `id`
*String.* The [OpenAlex ID](/data/overview/#the-openalex-id-scheme) for this author, e.g. `https://openalex.org/A5023888391`. See [Common fields](/data/common-fields/#id).

### `ids`
*Object.* All known external identifiers for this author, as URIs where possible; keys with no value are omitted. Author keys are `openalex`, `orcid`, and (rarely) `scopus`. Filter, group_by, and sort on the `orcid` and `scopus` sub-keys.

### `display_name`
*String.* The author's name — the single most-frequent, most-informative form observed across their works. See [Common fields](/data/common-fields/#display_name). Filterable and sortable; free-text name search uses the `search` parameter (the `display_name.search` filter is deprecated).

### `display_name_alternatives`
*List.* Other name strings seen for this author, deduplicated (e.g. `["Jason Priem", "Priem, Jason"]`). Useful for matching against name forms that differ from the canonical [`display_name`](#display_name).

### `orcid`
*String.* The author's [ORCID](https://orcid.org/) iD as a URL, or null. ORCID is the canonical external identifier for authors; each maps to at most one OpenAlex author. Filter, sort, and group_by are supported; use `has_orcid:true`/`false` to select on presence.

### `full_name`
*String.* The author's full name as parsed from their works. In practice usually identical to [`display_name`](#display_name).

### `raw_author_names`
*List.* The exact raw author-name strings, as they appeared on the source works, that were clustered into this author during [disambiguation](#how-its-made). The unnormalized inputs behind [`display_name_alternatives`](#display_name_alternatives).

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
*Integer.* Number of [works](/data/works/) by this author. See [Common fields](/data/common-fields/#works_count). Filterable, sortable, and groupable. Authors with `works_count:0` (e.g. profiles emptied by curation) are hidden from list results by default.

### `cited_by_count`
*Integer.* Total citations across all of this author's works. See [Common fields](/data/common-fields/#cited_by_count).

### `summary_stats`
*Object.* Precomputed bibliometric indicators — `2yr_mean_citedness`, `h_index`, `i10_index`. See [Common fields](/data/common-fields/#summary_stats). Each sub-field is filterable, sortable, and groupable (e.g. `summary_stats.h_index:>40`).

### `counts_by_year`
*List.* Per-year `{ year, works_count, oa_works_count, cited_by_count }` for roughly the last ten years. See [Common fields](/data/common-fields/#counts_by_year) — including why the array's sort direction isn't consistent across entity types (sort by `year` yourself).

### `works_api_url`
*String.* A ready-made [Works API](/data/works/) URL that returns this author's works — `https://api.openalex.org/works?filter=author.id:A…`. A convenience so you don't have to build the filter yourself.

### `block_key`
*String.* An internal blocking key (a coarse name signature, e.g. `j priem`) used during [disambiguation](#how-its-made) to group candidate authorships before finer clustering. Exposed mainly for debugging; filterable/sortable/groupable.

### `created_date`
*String.* The date this author was added to OpenAlex (`YYYY-MM-DD`). See [Common fields](/data/common-fields/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to anything in the author object — including routine citation-count recomputation. See [Common fields](/data/common-fields/#updated_date).

## In the API

The Authors endpoint is at [`api.openalex.org/authors`](https://api.openalex.org/authors). Fetch a single author by ID — [`/authors/A5023888391`](https://api.openalex.org/authors/A5023888391) — or a list, and [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over the fields above. Authors with no works are hidden from list results by default. For the full list of endpoints see the [endpoints index](/api/endpoints/).
