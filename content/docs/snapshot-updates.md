---
title: "Updates & releases"
description: "Snapshot release cadence per plan, release notes, how updated_date partitions work, keeping a copy current, and how deletions and merged entities behave."
tags: ["downloads"]
source_id: "new/snapshot-updates"
source_url: "https://developers.openalex.org/download/snapshot-format"
source_updated: "2026-07-30"
---
This page is the authoritative reference for how the [snapshot](/docs/snapshot/) changes over time: when releases happen, what a release means, and how to keep a local copy — including deletions and merges — in sync.

## Release cadence

| Plan | What you get |
|---|---|
| **Free** (everyone) | New full releases of the public snapshot (`s3://openalex/data/`), typically **about monthly** — the guaranteed minimum is quarterly. Each release replaces the bucket contents in place. |
| **Paid** ([Premium, Institutional, Partner](https://openalex.org/pricing)) | A **daily-refreshed full snapshot** (dated folders in the `openalex-snapshots` staging bucket) plus **daily [changefiles](/docs/data-feed/)**. |

The authoritative history of what shipped when is [`RELEASE_NOTES.txt`](https://openalex.s3.amazonaws.com/RELEASE_NOTES.txt), at the root of the bucket. Each entry summarizes the data changes in that release — new sources, quality fixes, schema additions. Check it (and the manifest `date`) rather than guessing from file timestamps.

> **Note:**
> There is no announcement feed for releases yet — watch `RELEASE_NOTES.txt` or the combined manifest's `date` field. If a scheduled release seems overdue, that's usually release engineering rather than a policy change.

## What a release is: how partitions work

Records are partitioned by `updated_date`, and each partition holds only the records that **last changed** on that date. A release doesn't add a new dated copy of the whole database — it updates the one copy in place, moving changed records into newer partitions.

Imagine launching OpenAlex with 1,000 Authors, all created on 2024-01-01:

```
/data/jsonl/authors/
├── manifest.json
└── updated_date=2024-01-01 [1000 Authors]
```

If 50 of those Authors are updated on 2024-01-15, they **move out of** the old partition and **into** the new one; 50 brand-new Authors would land in the same new partition:

```
/data/jsonl/authors/
├── manifest.json
├── updated_date=2024-01-01 [950 Authors]
└── updated_date=2024-01-15 [100 Authors]
```

Consequences:

- **The bucket is always the complete current database** — the union of all partitions, exactly once per record. No partition is a "base file"; no folder is cumulative.
- **To update a copy you made on date X**, download only partitions with `updated_date` > X and upsert them by `id`. You never need to re-download a partition you already have.
- **Old partitions shrink** as their records move forward. If you sync files rather than upserting records, use `--delete` so vacated files disappear (see below).

## Keeping a copy up to date

Using the manifest (per entity or combined):

1. **Download the manifest** — `aws s3 cp s3://openalex/data/jsonl/works/manifest.json . --no-sign-request`
2. **Find new partitions** — any `updated_date` in the manifest's file list that you haven't ingested.
3. **Download those partitions.**
4. **Verify consistency** — re-download the manifest; if unchanged since step 1, no records moved mid-download.
5. **Upsert by `id`** into your store.

If you mirror *files* with `aws s3 sync`, always pass `--delete` — otherwise files vacated by records moving to newer partitions linger and you get duplicates. Full commands in the [download recipe](/learn/download-to-your-machine/); paid plans can skip release-cadence waits entirely with the [data feed](/docs/data-feed/).

## Deletions and merged entities

Records don't just get created and updated — they also disappear: works get merged when they're found to be duplicates, author profiles get [merged or deleted](/docs/author-disambiguation/), and bogus records get removed.

How that shows up today:

- **In the API:** a deleted or merged-away ID returns **404**. There is no redirect to the surviving record. (Special case: works of removed author profiles point to the [null author `A9999999999`](/docs/author-disambiguation/), and `A5317838346` marks deleted authors.)
- **In the snapshot:** the record is simply **gone from the current release** — it doesn't appear in any partition, and the vacated file space disappears from the manifest.
- **In [changefiles](/docs/data-feed/):** changefiles carry **creates and updates only** — deletions and merges are *not* announced there.

**To pick up deletions in a mirror**, reconcile against a full release periodically:

- **File mirror:** `aws s3 sync ... --delete`, then rebuild — the synced tree *is* the current corpus.
- **Database mirror:** diff your ID set against the release's ID set (stream IDs from the part files, or compare per-partition `record_count`s in the manifest) and delete local records that no longer exist upstream.

> **Note:**
> The pre-Walden snapshot published a `merged_ids/` directory mapping merged IDs to their survivors. That mechanism ended with the 2025 Walden cutover; the historical files are preserved under `legacy-data/` but are **not updated**. A deletion/merge log alongside the changefiles is a known ask — if it matters to your pipeline, [tell us about your use case](https://openalex.org/contact).

## Point-in-time and reproducibility

The public bucket holds only the **current** release — once a release lands, the previous state is gone, so cite the combined manifest's `date` (or the `RELEASE_NOTES.txt` entry) in anything you need to reproduce, and archive your own copy if you need to re-run against it. Paid plans get closer to point-in-time: the staging bucket keeps each day's full snapshot in its own dated folder.

## Related pages

- [Snapshot](/docs/snapshot/) — formats, layout, manifests, and API parity
- [Data feed & changefiles](/docs/data-feed/) — staying current daily instead of per-release
- [Access & authentication](/docs/snapshot-access/) — buckets and credentials
