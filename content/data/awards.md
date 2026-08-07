---
title: "Awards"
description: "What an award (grant) is, where its data comes from, how OpenAlex matches grants to funders and works, and what every attribute on an award object means."
tags: ["reference"]
source_id: "api-reference/awards"
source_url: "https://developers.openalex.org/api-reference/awards"
source_updated: "2026-02-17"
---
An **award** is a single research grant: a specific pot of money a [funder](/data/funders/) gave for a project, with a title, an amount, a period, and a lead investigator. Awards are the fine-grained link between funders and the [works](/data/works/) their money produced — where a funder answers "who paid," an award answers "which grant." OpenAlex tracks over 17 million awards. An award's OpenAlex ID looks like `G5066037109`; fetch one at [`api.openalex.org/awards/G5066037109`](https://api.openalex.org/awards/G5066037109).

## How it's made

### Where grant data comes from

Awards are assembled from grant metadata published by funders and aggregators, tracked in [`provenance`](#provenance). The big sources are the grant-and-funder fields inside [Crossref](https://www.crossref.org/) work records (`crossref_work_funders`, `crossref_work.grants`), Europe PMC (`europepmc_work_funders`), and national grant databases published directly by funders — the [NIH RePORTER](https://reporter.nih.gov/) export (`nih_exporter`), Japan's KAKEN, the US [NSF](https://www.nsf.gov/) award search, the EU's CORDIS, UK Gateway to Research, and hundreds of others. OpenAlex normalizes these heterogeneous feeds into one award shape.

### Matching awards to funders and works

Two links make an award useful, and both are built by matching:

- **Award → funder.** Each award records the [funder](/data/funders/) that made it in [`funder`](#funder), matched to OpenAlex's funder list (see [Funders](/data/funders/#how-its-made)). The funder's own grant ID for the award is kept in [`funder_award_id`](#funder_award_id).
- **Award → works.** OpenAlex links each award to the [works](/data/works/) it funded in [`funded_outputs`](#funded_outputs), by matching grant mentions in work metadata (or work lists in the funder's own grant records) to works already in OpenAlex. The reverse view — every work an award funded — is at [`works_api_url`](#works_api_url).

### Failure modes

Because both links are matched, they can be incomplete: an award may list no works ([`funded_outputs_count`](#funded_outputs_count) of `0`) even when it funded some, if the grant was never named in a matchable work record; conversely a work may be missing its award. Fields also vary widely by source — a rich `nih_exporter` award carries amount, dates, scheme, and a lead investigator, while a bare Crossref grant may have little beyond a funder and a grant ID. Amounts arrive in the funder's own [`currency`](#currency) and are not converted.

## Attributes

This is the canonical dictionary of every attribute on an **award** object. Awards carry their own shape (they are grant records, not organizations), so most fields are award-specific; the shared [`id`](/data/common-attributes/#id), [`display_name`](/data/common-attributes/#display_name), [`created_date`](/data/common-attributes/#created_date), and [`updated_date`](/data/common-attributes/#updated_date) are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/overview/#the-openalex-id-scheme) for this award, e.g. `https://openalex.org/G5066037109`. See [Common attributes](/data/common-attributes/#id).

### `display_name`
*String.* The award's title, e.g. `Genetic analysis of dopaminergic neuron specification in C.elegans`. May be `null` when the source supplied no title. See [Common attributes](/data/common-attributes/#display_name).

### `description`
*String.* A longer abstract or narrative of the funded project, when the source provides one.

### `funder`
*Object.* The [funder](/data/funders/) that made this award, dehydrated: `id`, `display_name`, and `doi` (the Funder DOI). Filter on `funder.id`, `funder.ror`, or `funder.doi`.

### `funder_award_id`
*String.* The funder's own identifier for this grant (e.g. an NIH grant number like `2r01ns050266-06`). This is what appears in a work's grant metadata.

### `funder_scheme`
*String.* The funder's grant scheme or mechanism (e.g. `R01`, `F32` for the NIH), when supplied.

### `funding_type`
*String.* The kind of funding (e.g. `research`, `fellowship`), when supplied. Filterable and groupable.

### `amount`
*Float.* The monetary amount of the award, in [`currency`](#currency). May be `null`. Filterable and sortable but not groupable.

### `currency`
*String.* The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code for [`amount`](#amount) (e.g. `USD`). Not converted across awards.

### `start_date`
*String.* The award's start date, as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date.

### `start_year`
*Integer.* The year the award started. Filterable, sortable, and groupable.

### `end_date`
*String.* The award's end date, as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date; may be `null` for open-ended or unreported awards.

### `end_year`
*Integer.* The year the award ended. Filterable, sortable, and groupable.

### `funded_outputs`
*List.* OpenAlex IDs of the [works](/data/works/) this award funded (see [How we build it](#matching-awards-to-funders-and-works)). Can be empty even for a real grant.

### `funded_outputs_count`
*Integer.* The number of [`funded_outputs`](#funded_outputs). Filterable and sortable.

### `doi`
*String.* A DOI for the grant itself, when the source assigns one (common for CORDIS awards); often `null`.

### `landing_page_url`
*String.* A URL to the funder's public page for this grant (e.g. a NIH RePORTER project page).

### `provenance`
*String.* The data source this award was built from (e.g. `nih_exporter`, `crossref_work_funders`, `cordis`). See [Where grant data comes from](#where-grant-data-comes-from). Filterable and groupable.

### `lead_investigator`
*Object.* The award's principal investigator: `given_name`, `family_name`, `orcid`, `role_start`, and an `affiliation` (`name`, `country`, `ids`). Fields may be `null`. Filter on the dotted subfields (`lead_investigator.orcid`, `lead_investigator.family_name`, `lead_investigator.affiliation.country`, and so on).

### `co_lead_investigator`
*Object.* A co-principal investigator, in the same shape as [`lead_investigator`](#lead_investigator), or `null`.

### `investigators`
*List.* Additional investigators on the award, each in the [`lead_investigator`](#lead_investigator) shape, or `null`.

### `institution_awarded`
*List.* The [institutions](/data/institutions/) that received the award, each dehydrated (`id`, `display_name`, `ror`, `country_code`, `type`, `lineage`). Filter on the dotted subfields (`institution_awarded.id`, `institution_awarded.ror`, `institution_awarded.country_code`, `institution_awarded.type`).

### `primary_topic`
*Object.* The top-ranked [topic](/data/topics/) inferred for the award, with its `subfield`, `field`, and `domain` — the same shape as a [work's](/data/works/attributes/#primary_topic). May be `null`.

### `topics`
*List.* Up to three ranked [topics](/data/topics/) for the award, each with a `score` and its subfield/field/domain. May be `null`.

### `works_api_url`
*String.* A ready-made API URL listing every [work](/data/works/) this award funded (i.e. `works?filter=awards.id:<id>`). A convenience link, not a stored value.

### `created_date`
*String.* The date this award was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to this award object. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Awards endpoint is at [`api.openalex.org/awards`](https://api.openalex.org/awards). Fetch a single award by ID — [`/awards/G5066037109`](https://api.openalex.org/awards/G5066037109) — or a list, and [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over the fields above. To find every award from a given [funder](/data/funders/), filter on `funder.id`; to find the [works](/data/works/) an award funded, filter works on `awards.id`. For the full list of endpoints see the [endpoints index](/api/endpoints/).
