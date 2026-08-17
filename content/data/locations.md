---
title: "Locations"
updated: 2026-08-17
description: "Each place a version of a work is available — the publisher's site, a repository, a preprint server — with its version, license, and open-access status, and what every attribute on a location object means."
tags: ["reference"]
entity:
  linksTo:
    - "works"
    - "sources"
---
A **location** is a place where a version of a [work](/data/works/) is available: the publisher's website, an institutional or subject repository, a preprint server. One work can have many locations — the same paper hosted as the version of record at the publisher, as an accepted manuscript in a repository, and as a submitted preprint on arXiv. Locations are a [component](/data/component/) entity: they don't get their own OpenAlex ID and mostly live inside a work object, in the [`locations`](/data/works/attributes/#locations) list plus the [`primary_location`](/data/works/attributes/#primary_location) and [`best_oa_location`](/data/works/attributes/#best_oa_location) pointers. There is also a standalone [`/locations`](https://api.openalex.org/locations) list endpoint (part of the Walden data), but you'll normally meet locations inline on a work.

## About

### One location per version

A work exists in several forms — the author's **submitted** manuscript, the peer-reviewed **accepted** manuscript, and the publisher's **published** version of record — often hosted in different places. Each location carries a [`version`](#version) field recording which of these it holds, following the [DRIVER Guidelines](https://wiki.surfnet.nl/display/DRIVERguidelines/DRIVER-VERSION+Mappings) standard: `publishedVersion` (most authoritative), `acceptedVersion`, then `submittedVersion`.

### Where locations come from

The publisher location comes from the work's own source record (the DOI's landing page and metadata). The repository and preprint locations come from **harvesting** open copies across the web — the same Unpaywall-style approach that scans institutional repositories, subject repositories (arXiv, PubMed Central, HAL, Zenodo), and aggregators (DOAJ, Europe PMC) for freely available versions of the work. Each distinct copy OpenAlex finds becomes a location, with its own hosting [`source`](#source), [`license`](#license), and open-access status.

### Best-OA selection

From all of a work's locations, OpenAlex designates a [`primary_location`](/data/works/attributes/#primary_location) (the copy closest to the version of record — for a journal article, the published full text at the publisher) and a [`best_oa_location`](/data/works/attributes/#best_oa_location) (the best *freely readable* copy, or null if none). "Best OA" is scored: the location must be OA; publisher beats repository; `publishedVersion` beats `acceptedVersion` beats `submittedVersion`; a direct PDF link beats none; and major repositories (PubMed Central, arXiv) rank above others. This is what feeds the work's [`open_access`](/data/works/attributes/#open_access) `oa_url` and `oa_status`.

## Attributes

This is the dictionary of every attribute on a **location** object, as it appears in a work's [`locations`](/data/works/attributes/#locations), [`primary_location`](/data/works/attributes/#primary_location), and [`best_oa_location`](/data/works/attributes/#best_oa_location). Locations are a component entity, so they carry none of the [common attributes](/data/common-attributes/) — a location inside a work has no OpenAlex ID of its own. (You may see an internal `id` on a location, such as `doi:10.7717/peerj.4375`, but it's a hosting handle, not a mintable OpenAlex ID. It is stable for the underlying harvested record, though — when duplicate works are merged, the surviving work carries the location and its `id` with it, which is how snapshot consumers [trace merges](/access/sync/#tracing-merges-location-ids-move-to-the-surviving-work).)

### `is_oa`
*Boolean.* True if this specific copy is a free-to-read full text (OpenAlex's broad definition: readable without paying or logging in). A work can have some OA locations and some not.

### `landing_page_url`
*String.* The URL of the page describing and linking to this copy of the work — for a publisher location, the DOI URL; for a repository, the record page.

### `pdf_url`
*String.* A direct link to a full-text PDF of this copy, or null when only a landing page is known. A direct PDF link is one of the tie-breakers in best-OA scoring.

### `source`
*Object.* The dehydrated [source](/data/sources/) hosting this copy — the journal, repository, or platform. Keys include `id`, `display_name`, `issn_l`, `issn`, `is_oa`, `is_in_doaj`, `is_core`, `type`, and the host organization (`host_organization`, `host_organization_name`, `host_organization_lineage`, `host_organization_lineage_names`). May be null for locations whose host isn't a known source.

### `license`
*String.* The license this copy is available under, as a normalized short code, e.g. `cc-by`, `cc-by-sa`, or null if unknown. Different locations of the same work can carry different licenses.

### `license_id`
*String.* The OpenAlex ID for the [license](/data/licenses/), e.g. `https://openalex.org/licenses/cc-by` — the canonical handle for the same license named in [`license`](#license).

### `version`
*String.* Which version this copy holds: `publishedVersion`, `acceptedVersion`, or `submittedVersion` (or null when it can't be determined). See [One location per version](#one-location-per-version) for what each value means.

### `is_accepted`
*Boolean.* True if this copy is at least an accepted manuscript — i.e. `version` is `acceptedVersion` or `publishedVersion`. A convenience flag so you don't have to compare version strings.

### `is_published`
*Boolean.* True if this copy is the published version of record — i.e. `version` is `publishedVersion`.

### `raw_source_name`
*String.* The hosting venue's name exactly as it arrived on the record, before it was matched to a [source](/data/sources/) — the unnormalized input behind [`source`](#source).

### `raw_type`
*String.* The work's type as this location's source labeled it (e.g. `journal-article`), before normalization to the work's OpenAlex [`type`](/data/works/attributes/#type).

## In the API

You reach locations by selecting [`locations`](/data/works/attributes/#locations), [`primary_location`](/data/works/attributes/#primary_location), or [`best_oa_location`](/data/works/attributes/#best_oa_location) on a [work](/data/works/) — they appear inline on each work object. There is also a standalone list endpoint at [`api.openalex.org/locations`](https://api.openalex.org/locations) (part of the Walden data) if you want to page over locations directly rather than through works.

Works can be filtered on location attributes with dotted filter keys, available on all three location slots — for example:

- `locations.is_oa`, `locations.version`, `locations.license`, `locations.license_id`
- `locations.source.id`, `locations.source.type`, `locations.source.is_in_doaj`, `locations.source.is_core`
- the same keys under `primary_location.` and `best_oa_location.` (e.g. `best_oa_location.is_oa`, `primary_location.source.id`)

See [Filtering](/api/filtering/) for the syntax and the [Works reference](/data/works/) for the complete list of location filter keys.
