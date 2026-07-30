---
title: "Data feed & changefiles"
description: "The OpenAlex data feed — daily changefiles that keep a local copy of the database current: the bootstrap-and-apply workflow, sync expectations, deletions, and the Unpaywall feed relationship."
tags: ["downloads"]
source_id: "new/data-feed"
source_url: "https://developers.openalex.org/download/changefiles"
source_updated: "2026-07-30"
---
The **data feed** keeps a local copy of OpenAlex current without re-downloading the database: every day, OpenAlex publishes **changefiles** — one file per entity type containing every record created or modified that day. Subscribers apply each day's files on top of a snapshot and stay in sync indefinitely.

Changefiles are part of [paid plans](https://openalex.org/pricing); browsing what's available is free (see [Access & authentication](/docs/snapshot-access/#changefiles-paid-plans)).

## How the feed works

1. **Bootstrap** from a full [snapshot](/docs/snapshot/) — this is your baseline, dated by the manifest's `date`.
2. **Apply** each day's changefiles after your baseline date: download the entity files, and **upsert** every record into your copy using its `id` as the primary key. Each record is the complete current entity object (the same shape as the API and snapshot — not a diff), so applying a day is idempotent and order within a day doesn't matter.
3. **Repeat daily.** If you fall behind, apply the missed days in order — or in one pass, since upserts by `id` converge to the same state.

The feed's discovery API:

- `api.openalex.org/changefiles` — the available dates (**about 60 days** are retained)
- `api.openalex.org/changefiles/{date}` — that day's files per entity, with record counts, sizes, and download URLs in both gzipped [JSONL](https://jsonlines.org/) and [Parquet](https://parquet.apache.org/)

Both listings are free and keyless; the data-file URLs they return require a paid-plan API key. Step-by-step commands and code: [the changefiles recipe](/learn/download-changefiles/).

## What's in a changefile — and what isn't

A day's changefile for an entity contains every record **created or modified** that day: new works, works whose citation counts moved, authors whose profiles changed, and so on. Volumes are substantial — a typical day's works file alone runs to millions of records and ~10 GB compressed.

**Deletions and merges are not in the feed.** When a record is deleted or merged away, no changefile entry announces it — it just stops appearing, and its ID starts returning 404 from the API. To prune a long-running mirror, periodically reconcile your ID set against a full snapshot release. See [Updates & releases](/docs/snapshot-updates/#deletions-and-merged-entities) for the mechanics and the history of the retired `merged_ids` mechanism.

## Sync expectations: the feed vs. the API

The feed and the API serve the same database, but at different rhythms — a few differences are normal and expected:

- **Intra-day drift.** A changefile is a daily batch cut; the API updates continuously. A record can change *after* the day's file was cut — you'll receive that change in the next day's file. The API is always the freshest view; a mirror built from the feed is at most about a day behind.
- **Corpus scope.** Changefiles cover **all** works, including the [expansion (XPAC) corpus](/api/key-concepts/#xpac-expansion-pack); the API *excludes* XPAC works by default. If your mirror's counts run higher than API queries, filter on the `is_xpac` field (see [snapshot ↔ API parity](/docs/snapshot/#how-the-snapshot-differs-from-the-api)).
- **Missed a day?** Nothing special to do — the ~60-day window means you can just re-list and download it. If you've been offline longer than the window, re-bootstrap from the latest snapshot rather than trying to reconstruct the gap.

## The Unpaywall Data Feed

Unpaywall also has a data feed, and long-time subscribers often ask how the two relate. [Unpaywall](/docs/unpaywall/) isn't a separate dataset — it's a **legacy-compatibility format over the same OpenAlex data**. Its feed delivers the same underlying changes in the older Unpaywall record schema, covering Crossref-DOI works only, while the OpenAlex changefiles cover **every entity** (works, authors, sources, institutions, and the rest) in the full OpenAlex schema.

For any new integration, use the OpenAlex changefiles. If you're an existing Unpaywall Data Feed subscriber weighing a migration, [talk to us](mailto:sales@openalex.org) — the mapping from Unpaywall records to OpenAlex works is well-trodden.

## Related pages

- [Download changefiles](/learn/download-changefiles/) — the hands-on recipe with code
- [Updates & releases](/docs/snapshot-updates/) — release semantics, deletions, reconciliation
- [Snapshot](/docs/snapshot/) — the baseline you bootstrap from
- [Bulk data](/docs/bulk-data/) — the whole family at a glance
