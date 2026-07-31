---
title: "Snapshot"
description: "The complete OpenAlex database as downloadable files — formats, S3 bucket layout, entity folders, manifests, size, and how the snapshot differs from the API."
tags: ["downloads"]
source_id: "download/snapshot-format"
source_url: "https://developers.openalex.org/download/snapshot-format"
source_updated: "2026-06-26"
---
The snapshot is the complete OpenAlex database as downloadable files. It's stored in [Amazon S3](https://aws.amazon.com/s3/) in the [`openalex`](https://openalex.s3.amazonaws.com/browse.html) bucket, under the `data/` prefix — free to download, no AWS account needed (see [Access & authentication](/docs/snapshot-access/)). For step-by-step download commands, see the [download recipe](/learn/download-to-your-machine/).

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

Decompressed, the JSON Lines data runs to several terabytes. The two formats are separate complete copies, so downloading both roughly doubles the transfer — most users want [a single format prefix](/learn/download-to-your-machine/#download-a-single-format-or-entity-type). Live totals are always in each format's `manifest.json` (`content_length`, per entity and overall).

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

Records are partitioned by `updated_date`: each partition holds the records that **last changed** on that date, in part files (`part_0000.*`, `part_0001.*`, …) of up to 400,000 records each. This is what makes incremental updates cheap — see [Updates & releases](/docs/snapshot-updates/) for how partitions move between releases and how to keep a copy current.

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

The combined manifest has the same shape but nests one entry per entity under an `entities` array, with a top-level `meta` carrying the totals. The manifest drives the [incremental-update workflow](/docs/snapshot-updates/#keeping-a-copy-up-to-date).

## Entity schemas

Each record is a complete entity object in the same shape the API returns — the field definitions in [Work fields](/docs/work-fields/) and the [API entity pages](/api/works/) apply directly:

  - **[Works](/api/works/)** · **[Authors](/api/authors/)** · **[Sources](/api/sources/)** · **[Institutions](/api/institutions/)** · **[Topics](/api/topics/)** · **[Publishers](/api/publishers/)**

## How the snapshot differs from the API

People often compare counts or fields between their snapshot copy and the live API and worry when they differ. The known, expected differences:

| Difference | Why |
|---|---|
| **Works count: snapshot ~510M vs API default ~322M** | The snapshot contains **all** works, including the [expansion (XPAC) corpus](/api/key-concepts/#xpac-expansion-pack). The API **excludes XPAC works by default**; add `include_xpac=true` to match. Filter locally on the `is_xpac` field to reproduce the API's default view. |
| **Freshness** | The snapshot is a point-in-time release (quarterly for the free public snapshot; daily on [paid plans](https://openalex.org/pricing)); the API updates continuously. Counts and records drift between releases — see [Updates & releases](/docs/snapshot-updates/). |
| **`content_urls` is absent** | It's generated at serve time, API-only. The snapshot has `has_content`; build download URLs via the [content endpoint](/docs/content-archive/) with work IDs. |
| **Some works have `abstract_inverted_index: null`** | Not every work has an abstract (availability and publisher restrictions) — same as the API. |
| **No n-grams** | The old n-grams dataset is retired and was never part of this snapshot layout. |

Otherwise the snapshot work schema matches the API's — including `fwci`, `topics`, `citation_normalized_percentile`, and `is_xpac`.

## Related pages

- [Updates & releases](/docs/snapshot-updates/) — release cadence, partition semantics, deletions & merged entities
- [Access & authentication](/docs/snapshot-access/) — the public bucket, paid daily snapshots, credentials
- [Bulk data](/docs/bulk-data/) — the whole bulk family and how to choose
- [Download to your machine](/learn/download-to-your-machine/) — step-by-step recipe
