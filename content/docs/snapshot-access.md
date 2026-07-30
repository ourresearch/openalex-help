---
title: "Access & authentication"
description: "Where the OpenAlex bulk-data buckets live, which ones are free, and how API keys and credentials work for the paid snapshot, changefiles, and content archive."
tags: ["downloads"]
source_id: "new/snapshot-access"
source_url: "https://developers.openalex.org/download/download-to-machine"
source_updated: "2026-07-30"
---
Bulk data lives in several buckets with different access rules. This page is the map.

| What | Where | Auth |
|---|---|---|
| Public [snapshot](/docs/snapshot/) | `s3://openalex` (S3, `data/` prefix) | **None** — free, anonymous |
| Daily-refreshed snapshot (paid) | `s3://openalex-snapshots` (staging bucket, dated folders under `full/`) | API key via `credential_process` |
| [Changefile](/docs/data-feed/) listings | `api.openalex.org/changefiles` | **None** — free to browse |
| Changefile data files | `content.openalex.org/changefiles/...` | API key on a [paid plan](https://openalex.org/pricing) |
| [Content archive](/docs/content-archive/) per-file | `content.openalex.org/works/...` | API key ($0.01/file) |
| Content archive bucket sync | Cloudflare R2 (S3-compatible) | Time-limited R2 credentials issued by us |

## The public snapshot bucket: free, no account

The `openalex` bucket is free to download and needs **no AWS account**. Use the AWS CLI with `--no-sign-request` for anonymous access:

```bash
aws s3 sync "s3://openalex/data/jsonl" "openalex-snapshot/data/jsonl" --no-sign-request
```

You can also browse it in a browser: [openalex.s3.amazonaws.com/browse.html](https://openalex.s3.amazonaws.com/browse.html). Many thanks to the [AWS Open Data program](https://aws.amazon.com/opendata/), which covers the data-transfer fees (about $70 per download) so users don't have to.

## The daily snapshot bucket (paid plans)

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

## Changefiles (paid plans)

Two different access levels, often confused:

- **Browsing what's available is free** — `api.openalex.org/changefiles` and `/changefiles/{date}` need no key at all. Look before you subscribe.
- **Downloading the data files requires an API key on a paid plan.** The `content.openalex.org/...` URLs in the listings take `?api_key=YOUR_KEY`. There's no per-file charge — changefile downloads are included with the plan.

See [Data feed & changefiles](/docs/data-feed/) for what these files are, and the [changefiles recipe](/learn/download-changefiles/) for the workflow.

## Content archive

Per-file downloads use your API key directly ($0.01/file): `https://content.openalex.org/works/W2741809807.pdf?api_key=YOUR_KEY`. For full-archive sync we issue read-only Cloudflare R2 credentials — 30-day access for a one-time download, persistent access with an enterprise subscription. Details on the [content archive page](/docs/content-archive/).

## Where's my API key?

Sign up free at [openalex.org](https://openalex.org/signup) and find your key in [Settings → API key](https://openalex.org/me/api). See [API authentication](/api/authentication/) for how keys, credits, and plans work.

## Common access problems

| Symptom | Likely cause & fix |
|---|---|
| `AccessDenied` / `403` on `s3://openalex` | You're making a *signed* request with your own AWS credentials. Add `--no-sign-request`. |
| `credential_process` errors for the staging bucket | Test the curl command by itself — if it returns nothing, the API key is wrong or your plan doesn't include the daily snapshot. `curl` must be on the PATH the AWS CLI uses. |
| `401`/`403` from `content.openalex.org` changefile URLs | Missing `api_key` parameter, or the key's plan doesn't include changefiles. The *listings* being free is what makes this surprising — data files are gated. |
| Sync re-downloads or duplicates records | Re-syncing into an old copy without `--delete`; see [Updates & releases](/docs/snapshot-updates/). |
| Download is slow or flaky | The snapshot is hundreds of GB — use `aws s3 sync` (it parallelizes and resumes) rather than single `cp` streams, and re-run it to pick up where it left off. |

Still stuck? [Contact support](https://openalex.org/contact) with the exact command and error.
