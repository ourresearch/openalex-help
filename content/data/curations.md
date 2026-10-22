---
title: "Curations"
updated: 2026-10-22
description: "What a curation is, who can file one, the review states it moves through, and how an accepted curation flows into the entity it corrects."
tags: ["reference"]
entity:
  example: "cur-9Fw3RtYxQ7nLpK"
---
A **curation** is a user-submitted correction to OpenAlex data, most often to a [native entity](/data/native/) — a fact you're telling OpenAlex it got wrong. OpenAlex mints its native entities by inference: it [disambiguates authors](/data/authors/disambiguation/) from raw name strings, reads [affiliations](/data/raw-affiliation-strings/) off works, decides which [work](/data/works/) each authorship belongs to. That inference is sometimes wrong, and a curation is how you push back on it: *this authorship is mine*, *that work isn't mine*, *my name should be displayed like this*. Curators can also correct the open-access fields on a work's [locations](/data/locations/). Each curation records **who** changed **what**, **when**, and its review state — and, once applied, flows into the entity it corrects. A curation's ID looks like `cur-9Fw3RtYxQ7nLpK`.

## Who creates it, what states it moves through, and how it flows back

Curations come from users, not from the pipeline, so they have no "About" provenance story. Instead:

### What you can curate

This page covers **author corrections** and **location corrections**. Affiliation corrections are covered in [Fixing errors: Affiliations](/access/fixing-errors/affiliations/).

**Authors** are the entities most prone to disambiguation error. Four corrections are available, two that fix the authors attributed to a [work](/data/works/) and two that fix the names on an [author](/data/authors/) profile:

- **`claim work`** — assign a misattributed authorship on a work to your author profile.
- **`remove from work`** — detach a work that isn't yours from your profile.
- **`modify display_name`** — change the displayed name on your author profile.
- **`modify full_name`** — change the name used to *match future works* to your profile.

The mechanics — exact request bodies, the `property` anchor syntax, and how each action maps to a warehouse table — are documented in [Author curation](/api/author-curation/).

**Locations** are the copies of a work. Three of a location's fields can be corrected:

- **`is_oa`** — whether this copy is free to read.
- **`pdf_url`** — where this copy's PDF is. A `pdf_url` doesn't mean the copy is open.
- **`license`** — set a valid open license, or remove one.

Open-access status (`oa_status`) is derived from these and can't be curated. Setting `is_oa` to `false` on a location with a license also removes the license, and adding an open license to a location that isn't open also sets `is_oa` to `true`; the API creates that second curation (a *twin*) for you. The rules and request bodies are in [Location curation](/api/location-curation/).

### Who can file one

Curations are recorded against the signed-in OpenAlex user account that submits them. Two kinds of user can curate:

- **Claim owners** — a user who has claimed an author profile can curate *that* profile (and the works on it). Claim-owner edits that add works are rate-limited (1,000/day).
- **Site-wide curators and organization owners/curators** — users with site-wide access can curate **any** author with no claim ownership, and are uncapped. Other authenticated users who are neither get a `403`.

Location curations are for site-wide curators only.

Every curation row carries the submitting `user_id` (or, for a twin, the curation that caused it in [`caused_by`](#caused_by)), so the audit trail of "who claimed what" is preserved even though it isn't surfaced on the public read API.

### The states it moves through

A curation is submitted, reviewed, and then either applied to the live data or not:

1. **Submitted.** The request lands as one row with `is_applied: false` and `applied_at: null`. Submitting the same curation twice (same user, entity, entity_id, value, action) returns the existing row rather than creating a duplicate, so re-submitting is idempotent.
2. **Reviewed and applied.** Curations are picked up on the next end-to-end refresh of the pipeline, which runs once per day — so an accepted change should appear within about 24 hours. When a curation is applied, its `is_applied` flips to `true` and `applied_at` records the time.

Because curations are re-applied *every* cycle, an accepted correction is **sticky**: a removed author stays removed even if the automated matcher tries to re-attach it on a later run.

Location curations differ in three ways. On each location field the last one wins. Submitting exactly what the newest curation on that field already says returns that curation, and if the live location already has the value the response is `{"skipped": true, "reason": ...}`. And they're never deleted: to undo one, submit a new one.

### How an accepted curation flows into the entity

An applied curation rewrites the native entity it targets:

- A **work claim** overwrites the author on the matching authorship, so the work now appears on the claimed [author](/data/authors/) profile.
- A **work removal** clears the author from that authorship, so the work drops off the profile.
- A **display_name** change overwrites the profile's displayed name and re-syncs the author's works so the new name shows up in the API.
- A **full_name** change updates the name the matcher uses, steering how *future* works are attributed.
- A **location** curation sets `is_oa`, `pdf_url` or `license` on that one location; it shows in the API the day after the nightly build applies it.

Every curated work is queued to re-export to the search index on the next sync, so the correction propagates to search results, not just the entity object. For the step-by-step data flow (Postgres → per-type views → warehouse Delta tables → the live entity tables), see [Author curation](/api/author-curation/#how-it-flows-under-the-hood).

## Attributes

A curation record is a compact statement of a correction: the target entity, the property to change, the change itself, and its review state. The shape below is what the curation endpoint returns; see [Author curation](/api/author-curation/) and [Location curation](/api/location-curation/) for how each field is built.

### `id`
*String.* The curation's ID, e.g. `cur-9Fw3RtYxQ7nLpK`. Unlike native-entity [OpenAlex IDs](/data/common-attributes/#id), it is not a resolvable `openalex.org` URL.

### `user_id`
*String.* The ID of the user who submitted the curation, e.g. `user-abc123`. This is the audit trail of who made the correction; it isn't exposed on the public read API. It's null on a twin, whose submitter is the curation in [`caused_by`](#caused_by).

### `user_name`
*String.* The display name of the submitting user, e.g. `Casey M`.

### `caused_by`
*String.* For a twin, the `id` of the curation that caused it; null otherwise. The API creates a twin when a location curation needs a second change: setting `is_oa` to `false` on a location with a license also removes the license, and adding a valid open license to a location that isn't open also sets `is_oa` to `true`. Both are saved in the same request and applied together. See [Location curation](/api/location-curation/#license-and-is_oa).

### `entity`
*String.* Which entity type the curation corrects — `works` (for claim / remove actions), `authors` (for display_name / full_name actions), or `locations` (for `is_oa`, `pdf_url` and `license`).

### `entity_id`
*String.* The ID of the specific entity being corrected. For works and authors it's the OpenAlex ID as a full URL, e.g. `https://openalex.org/W4404012345` for a work claim or `https://openalex.org/A5023888391` for a name change. For locations it's the location's [`id`](/data/locations/#id) exactly as the API shows it, e.g. `doi:10.1177/2516602619833219` or `pmh:oai:HAL:hal-04048618v1`.

### `property`
*String.* The field on the target entity that the curation changes. For work claims this anchors the change to a specific byline — `authorships[raw_author_name="Smith, J."].author.id` — pinning the correction to one raw author name from the work. For work removals it's the non-positional `authorships.author.id`. For name changes it's simply `display_name` or `full_name`. For locations it's `is_oa`, `pdf_url` or `license`.

### `action`
*String.* What to do with the property — `replace` (claim a work, set a name, set a location field) or `remove` (detach a work, remove a location's license).

### `value`
*String.* The new value the action applies, as a full URL where it's an entity (the author ID for a claim or removal) or a plain string for a name change (`John Smith`). For locations it's `"true"` or `"false"` for `is_oa`, a URL for `pdf_url`, or a license code such as `cc-by`; on a license `remove`, it's the license being removed.

### `created`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime the curation was submitted.

### `is_applied`
*Boolean.* Whether the curation has been applied to the live entity data. Starts `false` on submission and flips to `true` once a pipeline run applies it.

### `applied_at`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime the curation was applied, or `null` while it's still pending.

## In the API

Curations are submitted to `POST https://user.openalex.org/curations` — note the singular `user.` host — authenticated with your OpenAlex API key in the `Authorization: Bearer` header. The endpoint accepts a single JSON object or an array of them. Site curators and organization owners/curators can curate any author; a claim owner can curate their own claimed profile; other authenticated users get a `403`. Location curations are for site-wide curators only. For the complete request shapes, the `property` anchor rules, and the under-the-hood data flow, see [Author curation](/api/author-curation/); for locations, see [Location curation](/api/location-curation/). For the full list of endpoints see the [endpoints index](/api/endpoints/).
