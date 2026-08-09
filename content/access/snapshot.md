---
title: "Snapshot"
description: "The complete OpenAlex database as downloadable files — formats, S3 bucket layout, manifests, size, how it differs from the API, and how to access it (free public bucket + paid daily snapshot)."
tags: ["downloads"]
source_id: "download/snapshot-format"
source_url: "https://developers.openalex.org/download/snapshot-format"
source_updated: "2026-08-05"
---
The snapshot is the complete OpenAlex database as downloadable files. It's stored in [Amazon S3](https://aws.amazon.com/s3/) in the [`openalex`](https://openalex.s3.amazonaws.com/browse.html) bucket, under the `data/` prefix — free to download, no AWS account needed (see [Access & authentication](#access--authentication) below). For step-by-step download commands, see the [download recipe](/tutorials/download-to-your-machine/).

## Two formats

The snapshot is published in two formats, each a complete copy of the same data:

| Format | Compression | One record per | Prefix |
|--------|-------------|----------------|--------|
| [JSON Lines](https://jsonlines.org/) | gzip (`.gz`) | line | `/data/jsonl/` |
| [Apache Parquet](https://parquet.apache.org/) | snappy (`.parquet`) | row | `/data/parquet/` |

## Size

Check the current size before downloading — it grows over time. As of the June 2026 release, each format holds about **649 million records**:

| | Compressed size |
|---|---|
| JSON Lines (`/data/jsonl/`) | ~750 GB (works alone: ~670 GB) |
| Parquet (`/data/parquet/`) | ~780 GB |

Decompressed, the JSON Lines data runs to several terabytes. The two formats are separate complete copies, so downloading both roughly doubles the transfer — most users want [a single format prefix](/tutorials/download-to-your-machine/#download-a-single-format-or-entity-type). Live totals are always in each format's `manifest.json` (`content_length`, per entity and overall).

## Bucket structure

Under each format prefix there is one folder per entity type, plus a combined `manifest.json`:

```
s3://openalex/data/
├── jsonl/
│   ├── manifest.json          # all entities, this format
│   ├── works/
│   │   ├── manifest.json       # works only
│   │   └── updated_date=2026-06-24/
│   │       ├── part_0000.gz
│   │       └── part_0001.gz
│   ├── authors/
│   └── ...
└── parquet/
    ├── manifest.json
    ├── works/
    │   ├── manifest.json
    │   └── updated_date=2026-06-24/
    │       ├── part_0000.parquet
    │       └── part_0001.parquet
    └── ...
```

The entity folders under each format are:

| Core entities | Topic hierarchy | Lookup / aggregation entities |
|---------------|-----------------|-------------------------------|
| `works` | `topics` | `keywords`, `concepts` |
| `authors` | `subfields` | `continents`, `countries` |
| `institutions` | `fields` | `institution-types`, `source-types`, `work-types` |
| `sources` | `domains` | `languages`, `licenses`, `sdgs` |
| `publishers`, `funders`, `awards` | | |

You can browse the bucket at [openalex.s3.amazonaws.com/browse.html](https://openalex.s3.amazonaws.com/browse.html#data/).

Records are partitioned by `updated_date`: each partition holds the records that **last changed** on that date, in part files (`part_0000.*`, `part_0001.*`, …) of up to 400,000 records each. This is what makes incremental updates cheap — see [Sync](/access/sync/) for how partitions move between releases and how to keep a copy current.

> **Note:**
> Pre-2026 snapshots used a flat `data/{entity}/` layout (JSON Lines only) with no `jsonl/`/`parquet/` split. That older layout, along with the `merged_ids/` directory, is preserved under the `legacy-data/` prefix.

## The manifest files

Every format has a combined `manifest.json` listing all data files across all entities (`/data/{format}/manifest.json`), and every entity has its own (`/data/{format}/{entity}/manifest.json`). The manifest is written last, after all data files are uploaded — **if the manifest is present, the data for that format is complete.**

A per-entity manifest looks like this:

```json
{
  "date": "2026-06-25",
  "format": "jsonl",
  "entity": "works",
  "record_count": 510372821,
  "content_length": 665688383258,
  "files": [
    {
      "url": "s3://openalex/data/jsonl/works/updated_date=2026-06-24/part_0000.gz",
      "meta": { "content_length": 936733, "record_count": 499 }
    }
  ]
}
```

The combined manifest has the same shape but nests one entry per entity under an `entities` array, with a top-level `meta` carrying the totals. The manifest drives the [incremental-update workflow](/access/sync/#keeping-in-sync-with-openalex).

## Entity schemas

Each record is a complete entity object in the same shape the API returns — the field dictionaries on the [Entities](/data/) tab apply directly:

  - **[Works](/data/works/)** · **[Authors](/data/authors/)** · **[Sources](/data/sources/)** · **[Institutions](/data/institutions/)** · **[Topics](/data/topics/)** · **[Publishers](/data/publishers/)**

## How the snapshot differs from the API

People often compare counts or fields between their snapshot copy and the live API and worry when they differ. The known, expected differences:

| Difference | Why |
|---|---|
| **Works count: snapshot ~510M vs API default ~322M** | The snapshot contains **all** works, including the [expansion (XPAC) corpus](/api/key-concepts/#xpac-expansion-pack). The API **excludes XPAC works by default**; add `include_xpac=true` to match. Filter locally on the [`is_xpac`](/data/works/attributes/#is_xpac) field to reproduce the API's default view. |
| **Freshness** | The snapshot is a point-in-time release (quarterly for the free public snapshot; daily on [paid plans](/access/pricing/)); the API updates continuously. Counts and records drift between releases — see [Sync](/access/sync/). |
| **`content_urls` is absent** | It's generated at serve time, API-only. The snapshot has [`has_content`](/data/works/attributes/#has_content); build download URLs via the [content archive](/access/fulltext/) with work IDs. |
| **Some works have `abstract_inverted_index: null`** | Not every work has an abstract (availability and publisher restrictions) — same as the API. |
| **No n-grams** | The old n-grams dataset is retired and was never part of this snapshot layout. |

Otherwise the snapshot work schema matches the API's — including `fwci`, `topics`, `citation_normalized_percentile`, and `is_xpac`.

## Access & authentication

Bulk data lives in several buckets with different access rules. This is the map:

| What | Where | Auth |
|---|---|---|
| Public snapshot (this page) | `s3://openalex` (S3, `data/` prefix) | **None** — free, anonymous |
| [Daily snapshot](/access/sync/#the-daily-snapshot-paid-plans) (paid) | `s3://openalex-snapshots` (staging bucket, dated folders under `full/`) | API key via `credential_process` |
| [Content archive](/access/fulltext/) per-file | `content.openalex.org/works/...` | API key ($0.01/file) |
| Content archive bucket sync | Cloudflare R2 (S3-compatible) | Time-limited R2 credentials issued by us |

### The public snapshot bucket: free, no account

The `openalex` bucket is free to download and needs **no AWS account**. Use the AWS CLI with `--no-sign-request` for anonymous access:

```bash
aws s3 sync "s3://openalex/data/jsonl" "openalex-snapshot/data/jsonl" --no-sign-request
```

You can also browse it in a browser: [openalex.s3.amazonaws.com/browse.html](https://openalex.s3.amazonaws.com/browse.html). Many thanks to the [AWS Open Data program](https://aws.amazon.com/opendata/), which covers the data-transfer fees (about $70 per download) so users don't have to.

### The daily snapshot bucket (paid plans)

Subscribers get a full snapshot rebuilt **every day**, published to dated folders in the `openalex-snapshots` staging bucket in both formats. Access is via your OpenAlex API key, exchanged automatically for temporary AWS credentials.

Add this to `~/.aws/config` (replace `YOUR_KEY` with your API key):

```ini
[profile openalex]
credential_process = curl -sf -X POST "https://api.openalex.org/snapshots/credentials?api_key=YOUR_KEY"
```

The AWS CLI fetches and refreshes credentials automatically. Then:

```bash
aws s3 ls s3://openalex-snapshots/full/ --profile openalex
aws s3 sync s3://openalex-snapshots/full/2026-04-29/jsonl/ ./openalex-snapshot-jsonl --profile openalex
```

See [Sync](/access/sync/#the-daily-snapshot-paid-plans) for what the daily snapshot is and the sync workflows it enables.

### Content archive

Per-file downloads use your API key directly ($0.01/file): `https://content.openalex.org/works/W2741809807.pdf?api_key=YOUR_KEY`. For full-archive sync we issue read-only Cloudflare R2 credentials — 30-day access for a one-time download, persistent access with an enterprise subscription. Details on the [content archive page](/access/fulltext/).

### Where's my API key?

Sign up free at [openalex.org](https://openalex.org/signup) and find your key in [Settings → API key](https://openalex.org/me/api). See [API authentication](/api/authentication/) for how keys, credits, and plans work.

### Common access problems

| Symptom | Likely cause & fix |
|---|---|
| `AccessDenied` / `403` on `s3://openalex` | You're making a *signed* request with your own AWS credentials. Add `--no-sign-request`. |
| `credential_process` errors for the staging bucket | Test the curl command by itself — if it returns nothing, the API key is wrong or your plan doesn't include the daily snapshot. `curl` must be on the PATH the AWS CLI uses. |
| Sync re-downloads or duplicates records | Re-syncing into an old copy without `--delete`; see [Sync](/access/sync/). |
| Download is slow or flaky | The snapshot is hundreds of GB — use `aws s3 sync` (it parallelizes and resumes) rather than single `cp` streams, and re-run it to pick up where it left off. |

Still stuck? [Contact support](https://openalex.org/contact) with the exact command and error.

## Related pages

- [Sync](/access/sync/) — release cadence, partition semantics, deletions & merged entities
- [Download to your machine](/tutorials/download-to-your-machine/) — step-by-step recipe
