---
title: "Institutions"
description: "What an institution is, how OpenAlex grounds them in ROR and matches raw affiliation strings to them, and what every attribute on an institution object means."
tags: ["reference"]
entity:
  example: "I27837315"
  api: "institutions"
  linksTo:
    - "authorships"
---
An **institution** is an organization that [authors](/data/authors/) are affiliated with — a university, company, hospital, government agency, non-profit, and more. Institutions are how OpenAlex answers "who did this research, and where?": every [work](/data/works/) links to the institutions its authors named, so you can roll research up from a single paper to a lab, a university, or a whole country. OpenAlex holds about 135,000 institutions. An institution's OpenAlex ID looks like `I27837315`; fetch one at [`api.openalex.org/institutions/I27837315`](https://api.openalex.org/institutions/I27837315).

## About

### Grounded in ROR

Institutions are one of the few [native entities](/data/native/) that lean on an outside authority: every OpenAlex institution maps to a record in the [Research Organization Registry (ROR)](https://ror.org/), the open community registry of research organizations. ROR supplies the institution's canonical name, country, location, and — crucially — its place in a hierarchy of parent and child organizations. Because we build on ROR rather than minting boundaries from scratch, most of the "is this the same org?" adjudication happens upstream, and an institution's [`ror`](#ror) ID is its stable external handle. Institution metadata is also drawn from Crossref, PubMed, MAG, and publisher websites.

### Matching raw affiliation strings

The hard problem isn't naming institutions — it's *linking works to them*. Works list affiliations as free text: a **raw affiliation string** (RAS) like `"MIT, Boston, USA"` or `"Massachusetts Institute of Technology"`, often messy and inconsistent. OpenAlex parses each RAS to extract the institutions it names, so both of those examples resolve to the same institution. Parsing runs in three stages: an OpenAlex-trained deep-learning model reads the string and assigns institutions; a monthly rules pass fixes common model errors; and ROR's own affiliation matcher fills remaining gaps. On the AffilGood benchmark the parser reaches roughly 0.92 recall and 0.93 precision. See [raw affiliation strings](/data/raw-affiliation-strings/) for the full pipeline, benchmarks, and open-source code.

### Lineage and hierarchy

Because OpenAlex inherits ROR's lineage structure, an institution can roll up to a parent — so you can report on a specific lab or on the university it belongs to. The [`lineage`](#lineage) field lists an institution together with all of its ancestors, and [`associated_institutions`](#associated_institutions) records parent, child, and related organizations. Some large umbrella organizations (e.g. the University of California System, along with some governments and multinational companies) are flagged as **super systems** via [`is_super_system`](#is_super_system); these are excluded from certain analyses so they don't swamp collaborating-institution results. Complex national research systems (such as French *unités mixtes de recherche*, which belong to several parents at once) are handled through this same ROR lineage.

### Country assignment

Country is assigned through the same affiliation matching. When a raw string matches a ROR record, OpenAlex takes the country from that record's metadata. When a string can't be matched to ROR but its address still names a country, OpenAlex assigns the [`country_code`](#country_code) directly, without ROR.

### Roles

A single real-world organization can act as more than one kind of OpenAlex entity: a university is an **institution**, but the same organization is often also a **[funder](/data/funders/)** (when it funds research) and sometimes a **[publisher](/data/publishers/)** (when it runs a university press). [`roles`](#roles) links those alter egos together, so you can hop from the institution record to the funder or publisher record for the same organization.

### Known failure modes

The parser can miss or mis-assign institutions, especially for organizations added to ROR after the model was last trained (April 2023) — those depend on the rules pass and ROR matcher to be caught at all. Coverage of layered national systems is limited by ROR's own coverage: where a sub-unit has no ROR record, affiliations can only match its parent. Institutions can also be affected by author-disambiguation errors on the works that feed them. Institutions are [correctable through curation](/data/curations/); member institutions can review and fix their own affiliation matches with the [Affiliation Editor](/docs/fixing-errors/affiliations/).

## Attributes

This is the canonical dictionary of every attribute on an **institution** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`ids`](/data/common-attributes/#ids), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`cited_by_count`](/data/common-attributes/#cited_by_count), [`summary_stats`](/data/common-attributes/#summary_stats), [`counts_by_year`](/data/common-attributes/#counts_by_year), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/); institution-specific notes are below.

### `id`
*String.* The [OpenAlex ID](/data/overview/#the-openalex-id-scheme) for this institution, e.g. `https://openalex.org/I27837315`. See [Common attributes](/data/common-attributes/#id).

### `ids`
*Object.* All known external identifiers for this institution, as URIs where possible; keys with no value are omitted. Institution-specific keys: `openalex`, `ror`, `grid` (the legacy GRID ID that ROR superseded), `wikipedia`, `wikidata`, `mag`. Filterable via `ids.openalex`.

### `display_name`
*String.* The institution's canonical name, from its ROR record. See [Common attributes](/data/common-attributes/#display_name). Filterable and sortable.

### `display_name_acronyms`
*List.* Known acronyms for the institution (e.g. `["UM"]` for the University of Michigan).

### `display_name_alternatives`
*List.* Other names the institution is known by, including names in other languages (e.g. `"Université du Michigan"`).

### `ror`
*String.* The institution's [ROR](https://ror.org/) ID — the canonical external identifier for institutions, e.g. `https://ror.org/00jmfr291`. Filterable, sortable, and groupable; filter `has_ror:true`/`false` to select institutions by whether they carry a ROR ID.

### `country_code`
*String.* The country where the institution is based, as an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code (e.g. `US`). See [Countries](/data/countries/). Filterable, sortable, and groupable; the related `continent` and `is_global_south` filters derive from it.

### `type`
*String.* The kind of organization (e.g. `education`, `healthcare`, `company`, `government`, `facility`, `nonprofit`, `other`). See [Institution types](/data/institution-types/) for the full vocabulary. Filterable, sortable, and groupable.

### `type_id`
*String.* The [OpenAlex ID](/data/overview/#the-openalex-id-scheme) form of [`type`](#type), e.g. `https://openalex.org/institution-types/education`.

### `lineage`
*List.* OpenAlex IDs of this institution plus all of its ancestor institutions, from ROR's hierarchy — so an institution's own ID always appears in its `lineage`. Filtering `lineage:<id>` finds an institution and everything beneath it. Filterable, sortable, and groupable.

### `associated_institutions`
*List.* Related organizations, each a dehydrated institution object plus a `relationship` of `parent`, `child`, or `related`. Drawn from ROR. Available as a column but not a filter.

### `is_super_system`
*Boolean.* True for large umbrella organizations (big university systems, some governments and multinational companies) that are excluded from certain analyses so they don't swamp results. Filterable, sortable, and groupable.

### `homepage_url`
*String.* The institution's official homepage.

### `image_url`
*String.* A URL to an image (usually a logo) for the institution, typically hosted on Wikimedia Commons.

### `image_thumbnail_url`
*String.* Like [`image_url`](#image_url), but scaled to a smaller thumbnail (a `width` query parameter is appended).

### `geo`
*Object.* The institution's geographic location: `city`, `geonames_city_id`, `region`, `country_code`, `country`, `latitude`, and `longitude`.

### `international`
*Object.* Intended to hold the institution's display name in multiple languages. Currently unpopulated (an empty object) on essentially all institutions.

### `repositories`
*List.* Dehydrated [source](/data/sources/) objects for the [repositories](/data/source-types/) this institution hosts (e.g. the University of Michigan's Deep Blue), each with `id`, `display_name`, `host_organization`, `host_organization_name`, and `host_organization_lineage`. Available as a column; the `repositories.id`, `repositories.host_organization`, and `repositories.host_organization_lineage` filters let you select institutions by the repositories they host.

### `roles`
*List.* The other entity roles this organization plays across OpenAlex — an organization can be an [institution](/data/institutions/), a [funder](/data/funders/), and a [publisher](/data/publishers/) at once. Each entry has `role`, `id` (the OpenAlex ID of that role's entity), and `works_count`. Filter institutions by a co-role's ID with `roles.id`.

### `topics`
*List.* The [topics](/data/topics/) most associated with this institution's works, each with a `count`, `score`, and its subfield/field/domain. See [Aboutness](/data/aboutness/) for how topics are assigned. Filter with `topics.id`.

### `topic_share`
*List.* Like [`topics`](#topics), but ranked by this institution's *share* of each topic relative to all institutions — surfacing topics where the institution is disproportionately active rather than just high-volume. Filter with `topic_share.id`.

### `works_count`
*Integer.* The number of works affiliated with this institution. See [Common attributes](/data/common-attributes/#works_count). Filterable, sortable, and groupable.

### `cited_by_count`
*Integer.* Total citations across this institution's works. See [Common attributes](/data/common-attributes/#cited_by_count). Filterable, sortable, and groupable.

### `summary_stats`
*Object.* Precomputed bibliometric indicators — `2yr_mean_citedness`, `h_index`, `i10_index`. See [Common attributes](/data/common-attributes/#summary_stats). Each sub-metric is independently filterable, sortable, and groupable.

### `counts_by_year`
*List.* Works and citations for this institution per year over roughly the last ten years. See [Common attributes](/data/common-attributes/#counts_by_year) — the array is returned newest-first for institutions, so sort by `year` before slicing.

### `status`
*String.* The institution's lifecycle status from ROR (e.g. `active`). Filterable, sortable, and groupable.

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for every work affiliated with this institution — e.g. `https://api.openalex.org/works?filter=institutions.id:I27837315`. A convenience link, not a stored value; follow it to page through the actual works.

### `created_date`
*String.* The date this institution was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to anything in the institution object. See [Common attributes](/data/common-attributes/#updated_date).

### Deprecated fields
- **`x_concepts`** — the top [concepts](/data/concepts/) associated with the institution. Concepts are a superseded classification; `x_concepts` is no longer populated on institution objects ([`topics`](#topics) and [`topic_share`](#topic_share) replace it). The `x_concepts.id`/`concepts.id` filters remain for continuity.

## In the API

The Institutions endpoint is at [`api.openalex.org/institutions`](https://api.openalex.org/institutions). Fetch a single institution by ID — [`/institutions/I27837315`](https://api.openalex.org/institutions/I27837315) — or a list, and [filter](/api/filtering/), search, sort, group, and page over the fields above. A few common patterns:

- Institutions in a country: [`/institutions?filter=country_code:ca`](https://api.openalex.org/institutions?filter=country_code:ca)
- Companies, most-cited first: [`/institutions?filter=type:company&sort=cited_by_count:desc`](https://api.openalex.org/institutions?filter=type:company&sort=cited_by_count:desc)
- An institution and everything beneath it in the hierarchy: [`/institutions?filter=lineage:I27837315`](https://api.openalex.org/institutions?filter=lineage:I27837315)
- Count institutions per type: [`/institutions?group_by=type`](https://api.openalex.org/institutions?group_by=type)

You can also fetch an institution by its ROR ID directly, e.g. [`/institutions/ror:00jmfr291`](https://api.openalex.org/institutions/ror:00jmfr291). For the full list of endpoints see the [endpoints index](/api/endpoints/).
