---
title: "Sync"
description: "Snapshot release cadence per plan, how updated_date partitions work, the four ways to keep a copy in sync with OpenAlex, and how deletions and merged entities behave."
tags: ["downloads"]
source_id: "new/snapshot-updates"
source_url: "https://developers.openalex.org/download/snapshot-format"
source_updated: "2026-07-31"
---
This page is the authoritative reference for how the [snapshot](/access/snapshot/) changes over time: when releases happen, what a release means, and how to keep a local copy — including deletions and merges — in sync with OpenAlex.

## Release cadence

| Plan | What you get |
|---|---|
| **Free** (everyone) | New full releases of the public snapshot (`s3://openalex/data/`), released **quarterly**. Each release replaces the bucket contents in place. |
| **Paid** ([Member+ and Partner plans](/access/pricing/#annual-plans)) | A **daily** full snapshot — the complete database, rebuilt and published every day (dated folders in the `openalex-snapshots` staging bucket) — plus the premium sync filters on the API. |

The authoritative history of what shipped when is [`RELEASE_NOTES.txt`](https://openalex.s3.amazonaws.com/RELEASE_NOTES.txt), at the root of the public bucket. Each entry summarizes the data changes in that release — new sources, quality fixes, schema additions. Check it (and the manifest `date`) rather than guessing from file timestamps.

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

## Keeping in sync with OpenAlex

There are four ways to keep a copy of OpenAlex current. They differ in freshness, in how much infrastructure they demand, and in how much of the database they suit — pick by what you're mirroring:

| Method | Freshness | Best for | Availability |
|---|---|---|---|
| [Public snapshot](#the-public-snapshot-free) | Quarterly | Full mirrors where quarterly is fresh enough | Free |
| [Daily snapshot](#the-daily-snapshot-paid-plans) | Daily | Full-database mirrors | [Paid plans](/access/pricing/#annual-plans) |
| [Premium API filters](#premium-api-filters-paid-plans) | Continuous | Keeping a **subset** fresh (e.g. one institution's works) with no bulk infrastructure | [Paid plans](/access/pricing/#annual-plans) |
| [Unpaywall Data Feed](#the-unpaywall-data-feed-paid-plans) | Daily (works only, legacy format) | Existing integrations that speak the Unpaywall schema | [Paid plans](/access/pricing/#annual-plans) |

The two snapshot methods move the whole database in bulk; the API-filter method needs nothing but HTTP requests, which makes it the right fit when you only care about a slice of OpenAlex.

### The public snapshot (free)

Re-sync from each quarterly release using the manifest (per entity or combined):

1. **Download the manifest** — `aws s3 cp s3://openalex/data/jsonl/works/manifest.json . --no-sign-request`
2. **Find new partitions** — any `updated_date` in the manifest's file list that you haven't ingested.
3. **Download those partitions.**
4. **Verify consistency** — re-download the manifest; if unchanged since step 1, no records moved mid-download.
5. **Upsert by `id`** into your store.

If you mirror *files* with `aws s3 sync`, always pass `--delete` — otherwise files vacated by records moving to newer partitions linger and you get duplicates. Full commands in the [download recipe](/tutorials/download-the-snapshot/).

### The daily snapshot (paid plans)

Subscribers get the **complete database, rebuilt and published every day** — each day's copy in its own dated folder in the staging bucket, partitioned by `updated_date` just like the public snapshot ([access details](/access/snapshot/#the-daily-snapshot-bucket-paid-plans)).

Because every daily copy is both *complete* and *partitioned by change date*, it covers every sync rhythm:

- **Incremental sync, on your schedule.** Grab today's copy and download only the partitions newer than your last sync — whether that was yesterday, the 15th of last month, or whatever day you fancy. There's no fixed release calendar to wait on.
- **Full rebuild, as often as you like.** Rebuild your entire database from scratch every day if you want — each dated folder is the whole thing.
- **Deletions handled.** Each day's copy is the complete current corpus, so records that were deleted or merged away are simply absent — reconcile against it and they fall out of your mirror (see [below](#deletions-and-merged-entities)).

### Premium API filters (paid plans)

Paid plans unlock two filters on every entity type that make the API itself a sync mechanism:

- `from_created_date` — records **created** since a date
- `from_updated_date` — records **updated** since a date

```
https://api.openalex.org/works?filter=from_updated_date:2026-07-30
```

Poll with these and upsert the results by `id` — no snapshot downloads, no bulk infrastructure, just HTTP requests. It's also the freshest view of the data, since the API updates continuously rather than on a release schedule.

The real superpower is that they **combine with any other filter**, which makes this the method for keeping a *subset* of OpenAlex synced. Most mirrors don't need the whole database: an institution tracking its own research output, say, only needs its own works, and standing up snapshot infrastructure for that is wild overkill. One polling loop covers it:

```
https://api.openalex.org/works?filter=institutions.id:I27837315,from_updated_date:2026-07-30
```

Trade-offs: paging through the API is slower per record than bulk files, so this method fits modest change volumes — for full-database mirrors, use the daily snapshot. And the filters only surface records that exist: deleted or merged-away records just stop appearing (and their IDs [404](#deletions-and-merged-entities)), so reconcile your ID set against a snapshot periodically if deletions matter to you. Filter mechanics: [Sync filters](/api/filtering/#sync-filters-paid-plans) in the API reference.

### The Unpaywall Data Feed (paid plans)

[Unpaywall](/access/unpaywall/) subscribers can receive daily change updates in the legacy Unpaywall record format — works with Crossref DOIs only. It delivers changes to the same underlying OpenAlex data, and exists for the ecosystem of integrations that already speak the Unpaywall schema; for anything new, use one of the OpenAlex-native methods above. Details: [the Unpaywall Data Feed](/access/unpaywall/#the-unpaywall-data-feed).

### Free data, paid services

All OpenAlex metadata is [CC0](https://creativecommons.org/publicdomain/zero/1.0/) and free — anyone can download the whole database, forever, at no cost. What's paid is *freshness as a service*: rebuilding and publishing the full database every day costs us real money every day, so we pass that cost on to the users who need daily updates. That's not an accident of pricing — it's the sustainability model encouraged by [POSI](https://openscholarlyinfrastructure.org/), the Principles of Open Scholarly Infrastructure: keep the data open, charge for the services that fund it. Plans and pricing: [Pricing](/access/pricing/).

## Deletions and merged entities

Records don't just get created and updated — they also disappear: works get merged when they're found to be duplicates, author profiles get [merged or deleted](/data/authors/#about), and bogus records get removed.

How that shows up today:

- **In the API:** a deleted or merged-away ID returns **404**. There is no redirect to the surviving record. (Special case: works of removed author profiles point to the [null author `A9999999999`](/data/authors/#about), and `A5317838346` marks deleted authors.)
- **In the snapshot:** the record is simply **gone from the current release** — it doesn't appear in any partition, and the vacated file space disappears from the manifest. This is true of every daily copy too, which is why reconciling against a snapshot is how mirrors pick up deletions.

**To pick up deletions in a mirror**, reconcile against a full release periodically (daily-snapshot subscribers can do this any day):

- **File mirror:** `aws s3 sync ... --delete`, then rebuild — the synced tree *is* the current corpus.
- **Database mirror:** diff your ID set against the release's ID set (stream IDs from the part files, or compare per-partition `record_count`s in the manifest) and delete local records that no longer exist upstream.

> **Note:**
> The pre-Walden snapshot published a `merged_ids/` directory mapping merged IDs to their survivors. That mechanism ended with the 2025 Walden cutover; the historical files are preserved under `legacy-data/` but are **not updated**. A deletion/merge log is a known ask — if it matters to your pipeline, [tell us about your use case](https://openalex.org/contact).

## Point-in-time and reproducibility

The public bucket holds only the **current** release — once a release lands, the previous state is gone, so cite the combined manifest's `date` (or the `RELEASE_NOTES.txt` entry) in anything you need to reproduce, and archive your own copy if you need to re-run against it. Paid plans get closer to point-in-time: the staging bucket keeps each day's full snapshot in its own dated folder.

## Related pages

- [Snapshot](/access/snapshot/) — formats, layout, manifests, and API parity
- [Access & authentication](/access/snapshot/) — buckets and credentials
- [Download the snapshot](/tutorials/download-the-snapshot/) — the hands-on recipe
