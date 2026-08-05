<!--
RETIRED 2026-08-05 (Jason, oxjob #354 Access reorg): the "Bulk data" sidebar
section was replaced by the "Access" section (one page per access method), which
supersedes this overview/chooser page. Preserved here (outside the build).
/docs/bulk-data/ redirects to /docs/snapshot/.
-->
---
title: "Bulk data"
description: "The OpenAlex bulk-data family — snapshot, content archive, and CLI — and how to choose between bulk downloads and the API."
tags: ["downloads"]
source_id: "download/overview"
source_url: "https://developers.openalex.org/download/overview"
source_updated: "2026-06-26"
---
Beyond the targeted access of the [API](/api/) and the [website](https://openalex.org), OpenAlex offers a family of **bulk data** products: big buckets of data you download wholesale rather than query record by record.

## The bulk-data family

| Product | What it is | Format | Freshness | Cost |
|---|---|---|---|---|
| [Snapshot](/docs/snapshot/) | The complete OpenAlex database — every entity | gzipped [JSON Lines](https://jsonlines.org/) + [Apache Parquet](https://parquet.apache.org/) | Public releases quarterly; daily copies on [paid plans](https://openalex.org/pricing) | Free (public S3 bucket); daily is paid |
| [Content archive](/docs/fulltext/) | Full-text PDFs (~60M) and Grobid TEI XML (~43M) for works | PDF, TEI XML | Continuously updated | Per-file via API/CLI; bucket sync on enterprise plans |
| [OpenAlex CLI](/docs/cli/) | Command-line tool for downloading filtered subsets (metadata and content) | JSONL | Live (pulls from the API) | Free metadata; content per-file |

## Bulk or targeted?

- **Use the REST API** for lookups, searches, applications, and most analyses — it answers most questions with far less setup.
- **Use the CLI** when you want a *subset* on disk — "all works on this topic," "these 50,000 DOIs" — without operating snapshot infrastructure.
- **Use the snapshot** (plus a [sync method](/docs/sync/#keeping-in-sync-with-openalex) to stay current) when you need the *whole* database: data warehousing, machine-learning training, building your own search index, or offline analysis.
- **Use the content archive** for text mining and corpus building at full-text scale.

> **Warning:**
> Working with the full snapshot is a real engineering project. The JSON Lines copy alone is ~750 GB compressed, and several terabytes decompressed. If you're unsure, start with the API or CLI.

## Licensing

OpenAlex metadata — the snapshot and everything the API returns — is [CC0](https://creativecommons.org/publicdomain/zero/1.0/): public domain, free to use for any purpose. The full-text files in the [content archive](/docs/fulltext/) are different: PDFs retain their original copyright, and OpenAlex grants no additional rights to them.

## Getting started

1. **Snapshot:** see [the snapshot reference](/docs/snapshot/), then follow the [download recipe](/recipes/download-to-your-machine/). To stay current afterward, pick a [sync method](/docs/sync/#keeping-in-sync-with-openalex).
2. **Content archive:** see [Content archive](/docs/fulltext/) for the three download paths.
3. **CLI:** `pip install openalex-official`, then `openalex download --help` ([CLI reference](/docs/cli/)).
