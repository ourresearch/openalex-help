---
title: "Fulltext"
updated: 2026-11-02
description: "OpenAlex's cached full text — PDFs and Grobid TEI XML for 60M+ open-access works, linked from every work via content_urls — and how to download it at any scale, from one file to the whole archive."
tags: ["downloads"]
source_id: "download/full-text-pdfs"
source_url: "https://developers.openalex.org/download/full-text-pdfs"
source_updated: "2026-06-24"
---
OpenAlex keeps its own cached copy of the full text for more than 60 million open-access works, as PDF and as machine-readable TEI XML parsed by [Grobid](https://github.com/kermitt2/grobid). Every work that has one links to it directly: [`has_content`](/data/works/attributes/#has_content) says which formats exist, and [`content_urls`](/data/works/attributes/#content_urls) holds the download links, served from the **content API** at `content.openalex.org`. Any API key works, including a free one; downloads are metered against your daily usage like any other call, and the free allowance covers a decent batch every day (see [Example costs](/access/example-costs/)).

From there it's a question of scale: one file at a time from the API, a few million with the CLI, or the complete archive synced to your own bucket.

| Format | Files | Size | One file per work |
|--------|-------|------|-------------------|
| PDF | ~73 million | ~113 TB | ~66 million, ~101 TB |
| TEI XML | ~71 million | ~1.5 TB | ~64 million, ~1.4 TB |

Counts are the files works use, as of November 2026. A work can have more than one file: say, a preprint from a repository and the published version from the publisher.

## Download options

### Option 1: API (up to ~10K files)

Download files one at a time from the content API. Each download is metered against your API usage ([Example costs](/access/example-costs/)). A `HEAD` request (the file's size and type, no bytes) is free.

```
https://content.openalex.org/works/{work_id}.pdf?api_key=YOUR_KEY
```

| Extension | Format |
|-----------|--------|
| `.pdf` | PDF (default) |
| `.grobid-xml` | TEI XML |

```bash PDF
curl "https://content.openalex.org/works/W3038568908.pdf?api_key=YOUR_KEY"
```

```bash TEI XML
curl --compressed "https://content.openalex.org/works/W3038568908.grobid-xml?api_key=YOUR_KEY"
```

TEI XML is served as `Content-Type: application/xml` with `Content-Encoding: gzip`, so most HTTP clients (`requests`, `httpx`, `fetch`, browsers) hand you plain XML with no extra work. Plain `curl` doesn't decode content encodings unless you pass `--compressed`; without it you'll get the raw gzip bytes and need to gunzip them yourself. The compressed bytes are what's stored, so if your client ever sees a body starting with the gzip magic bytes `1f 8b`, decompressing it yields the same XML.

**Finding downloadable works:**

Use the `has_content` filter to find works with available content:

```bash
# Works with PDFs from 2024
https://api.openalex.org/works?filter=has_content.pdf:true,publication_year:2024

# CC-BY works with PDFs
https://api.openalex.org/works?filter=has_content.pdf:true,best_oa_location.license:cc-by
```

You can also check the `content_urls` field on any work object to see if content is available.

A free API key's daily allowance covers a batch of downloads every day (how many: [Example costs](/access/example-costs/#what-your-free-daily-budget-buys)). Good for research projects, building small corpora, or sampling.

### Option 2: OpenAlex CLI (up to a few million files)

For larger downloads, use the [OpenAlex CLI](/access/cli/). It handles parallel downloads, retries, checkpointing, and resume automatically.

```bash
pip install openalex-official
```

**Download PDFs for a specific topic:**

```bash
openalex download \
  --api-key YOUR_KEY \
  --output ./climate-pdfs \
  --filter "topics.id:T10325,has_content.pdf:true" \
  --content pdf
```

**Download works with Creative Commons licenses:**

```bash
openalex download \
  --api-key YOUR_KEY \
  --output ./cc-pdfs \
  --filter "best_oa_location.license:cc-by,has_content.pdf:true" \
  --content pdf
```

**Download metadata + PDFs + TEI XML:**

```bash
openalex download \
  --api-key YOUR_KEY \
  --output ./my-corpus \
  --filter "topics.id:T10325,has_content.pdf:true" \
  --content pdf,xml
```

Standard [usage rates](/access/example-costs/) apply per file; the accompanying metadata list calls are nearly free. Throughput is bandwidth-bound (PDFs average ~5 MB): expect roughly 20,000–50,000 files per hour on a fast home connection, several times that from a cloud VM — so a million files is a day or two from the cloud, or a few days from home.

### Option 3: Complete archive sync

For the complete archive, the **PDF sync service** gives you read-only access to our two storage buckets, so you can copy every file a work uses to your own infrastructure — and keep receiving new ones as they arrive. The buckets are on [Cloudflare R2](https://developers.cloudflare.com/r2/), which is S3-compatible.

PDF sync is sold as a paid **add-on to the [Member+](/access/member-plus/) or [Partner](/access/partner/) plan**: those plans include daily sync, and a new PDF is only usable with fresh metadata. What you're buying is the ongoing sync service, not the documents themselves (see [Pricing](/access/pricing/#the-pdf-sync-add-on) for the reasoning). [Contact sales](mailto:sales@openalex.org) to get started.

| Bucket | Holds |
|--------|-------|
| `openalex-pdfs` | PDFs, named `{uuid}.pdf`, and the [manifest](#the-manifest-for-archive-sync) under `_manifest/` |
| `openalex-grobid-xml` | TEI XML, named `{uuid}.xml.gz` (gzip-compressed) |

> **Warning:**
> Don't copy the whole buckets. About 60% of the files in each are ones no work uses: repeat downloads of the same PDF, superseded parses, a 2025 bulk copy, and some error pages saved as `.pdf`. Copy the files the [manifest](#the-manifest-for-archive-sync) lists instead, as below. We're moving the unused files out of the buckets; PDF sync clients get an email with the date before anything moves.

**How it works:** we give you R2 credentials with read-only access to both buckets. We recommend [rclone](https://rclone.org): it downloads a list of files without scanning the whole bucket, and skips files you already have.

1. **Set up rclone once.** Add this to your rclone config file (`rclone config file` prints where it is):

   ```ini
   [openalex]
   type = s3
   provider = Cloudflare
   access_key_id = YOUR_ACCESS_KEY_ID
   secret_access_key = YOUR_SECRET_ACCESS_KEY
   endpoint = https://a452eddbbe06eb7d02f4879cee70d29c.r2.cloudflarestorage.com
   no_check_bucket = true
   ```

2. **Copy the manifest.** `sync` makes your local folder match ours exactly, which matters because the manifest's file names change every day:

   ```bash
   rclone sync openalex:openalex-pdfs/_manifest/content_index ./manifest
   ```

3. **List the files to download** (any Parquet reader works; this uses DuckDB):

   ```python
   import duckdb

   duckdb.sql("""COPY (SELECT DISTINCT pdf_uuid || '.pdf' FROM 'manifest/*.parquet'
                       WHERE pdf_uuid IS NOT NULL)
                 TO 'pdf_files.txt' (HEADER false, QUOTE '')""")
   duckdb.sql("""COPY (SELECT DISTINCT grobid_xml_id || '.xml.gz' FROM 'manifest/*.parquet'
                       WHERE grobid_xml_id IS NOT NULL)
                 TO 'xml_files.txt' (HEADER false, QUOTE '')""")
   ```

   To take one file per work instead, add `AND is_primary` to each `WHERE` (from 9 November 2026; see [the manifest](#the-manifest-for-archive-sync)).

4. **Download them:**

   ```bash
   rclone copy openalex:openalex-pdfs ./pdfs --files-from-raw pdf_files.txt --no-traverse --transfers 64
   rclone copy openalex:openalex-grobid-xml ./xml --files-from-raw xml_files.txt --no-traverse --transfers 64
   ```

**Staying current:** repeat steps 2–4 once a day, after 04:00 UTC. We rebuild the manifest from 03:30 UTC, and for a few minutes it's incomplete. rclone skips files you already have, so a daily run only downloads the new ones. A file that drops out of the manifest is no longer used by any work; delete your copy or keep it, as you like.

**Size and time:** every file the manifest lists comes to about 113 TB of PDFs and 1.5 TB of XML (about 101 TB if you take one file per work). Plan on a cloud VM with multi-gigabit networking: at 1–2 Gbit/s sustained, the first copy takes **about 5–10 days**. A home connection is not a realistic option for the whole archive (a few hundred Mbit/s would take months).

**Files don't change.** Once a file is written, its bytes stay the same: a fix gets a new file name, and the manifest points to the new one. The one exception so far: on 28 October 2026 we repaired 1.55 million XML files in place (older parses stored in a broken HTML shape). If you copied XML before then, run step 4 again: rclone sees the changed size and fetches the repaired versions.

As a sensible default, still check each PDF on ingest (the leading `%PDF` bytes) so your pipeline is robust to the odd bad file.

## Mapping work IDs to files

Files in the buckets are named by UUID, not work ID. A work's PDF and its TEI XML are stored as **separate objects with different UUIDs** — the file names alone won't tell you which PDF and which XML belong to the same work:

```
openalex-pdfs/
├── 3a07228e-de2a-4c37-955d-b1411a498328.pdf
├── 7b12f4a1-8c9d-4e5f-a2b3-c4d5e6f7a8b9.pdf
└── ...

openalex-grobid-xml/
├── 5e6ea859-62f6-40ab-9f7e-6472aab3a19d.xml.gz
├── 523b7cb3-17f3-4e2f-b81c-867fd8802182.xml.gz
└── ...
```

### The manifest (for archive sync)

The **manifest** maps works to files. It's a set of Parquet files in the `openalex-pdfs` bucket, rebuilt in full every day from 03:30 UTC (read it after 04:00 UTC):

```
s3://openalex-pdfs/_manifest/content_index/
```

From **Monday 9 November 2026** it has **one row per location that has a file**: a work with a preprint in a repository and the published version at the publisher gets two rows, each with its own PDF and the XML parsed from that PDF, and `is_primary` marks the work's main file. Until then it has one row per work and only the first six columns below. The new layout is already published at `_manifest/content_index_preview/` (removed on 16 November 2026).

| Column | Example | Meaning |
|--------|---------|---------|
| `openalex_id` | `W2741809807` | the OpenAlex work ID |
| `pdf_uuid` | `3a07228e-de2a-4c37-955d-b1411a498328` | the PDF: `openalex-pdfs/{pdf_uuid}.pdf` |
| `grobid_xml_id` | `5e6ea859-62f6-40ab-9f7e-6472aab3a19d` | the TEI XML parsed from that PDF: `openalex-grobid-xml/{grobid_xml_id}.xml.gz` |
| `native_id` | `10.1038/s41586-020-2649-2` | the location's ID at its source: a DOI, or a repository's OAI-PMH identifier |
| `native_id_namespace` | `doi` | `doi` or `pmh` |
| `updated_date` | `2026-06-20` | when the location's source record (Crossref, a repository, …) last changed; not when the file changed |
| `version` | `publishedVersion` | `publishedVersion`, `acceptedVersion` or `submittedVersion` |
| `is_primary` | `true` | the work's main file, exactly one per work: the one the [content endpoint](#the-content-endpoint-for-per-work-fetches) serves |

UUIDs are stored without their file extension — append `.pdf` and `.xml.gz` to build the object keys. A row may have a PDF but no XML (GROBID can't parse every PDF), so `grobid_xml_id` is sometimes empty; a handful of rows have XML but no PDF.

Copy the manifest with `rclone sync` ([step 2 above](#option-3-complete-archive-sync)), not a plain copy: its file names change every day, and yesterday's files left in your folder would add stale, duplicate rows to every query.

Query it directly with any Parquet reader — no need to load it into a database:

```python
import duckdb

# Every file of one work
duckdb.sql("SELECT * FROM 'manifest/*.parquet' WHERE openalex_id = 'W2741809807'")

# One file per work (from 9 November 2026)
duckdb.sql("SELECT openalex_id, pdf_uuid, grobid_xml_id FROM 'manifest/*.parquet' WHERE is_primary")
```

The join is then entirely local, with no API calls:

1. Join `openalex_id` to your [works snapshot](/access/snapshot/) to attach metadata.
2. Join `pdf_uuid` / `grobid_xml_id` to your downloaded files to attach the PDF and TEI XML.

### The content endpoint (for per-work fetches)

If you're fetching files one at a time through the [content API](#option-1-api-up-to-10k-files) rather than syncing the bucket, you don't deal with UUIDs at all — the endpoint resolves the work ID to the work's main file server-side (from 9 November 2026, the file the manifest marks `is_primary`):

```
https://content.openalex.org/works/{work_id}.pdf
```

Work objects from the API expose this directly via `has_content` and `content_urls`:

```json
"has_content":  { "pdf": true, "grobid_xml": true },
"content_urls": { "pdf": "https://content.openalex.org/works/W1775749144.pdf",
                  "grobid_xml": "https://content.openalex.org/works/W1775749144.grobid-xml" }
```

Filter your candidate set with `has_content.pdf:true` (available in the [snapshot](/access/snapshot/) and the API; `content_urls` is API-only), then fetch each work by ID. This is convenient for small-to-medium sets, but at archive scale prefer the manifest above — the join is offline and costs nothing.

> **Warning:**
> Do **not** map work IDs to archive objects via `locations[].pdf_url`. That field is the *original publisher* URL, not the archive object — keying off it produces a lossy, inferred match. Use the manifest or the content endpoint instead.

## TEI XML quality and limitations

GROBID ([project](https://github.com/kermitt2/grobid), [docs](https://grobid.readthedocs.io/)) is the state of the art for converting scholarly PDFs to structured TEI XML. But PDF parsing is genuinely hard, and a meaningful share of files will contain errors — missing or duplicated references, occasional self-references (the paper's own DOI picked up from its header or footer), wrong or partial header metadata, and the odd truncated section. You can see how GROBID performs field-by-field in [the project's own benchmarks](https://grobid.readthedocs.io/en/latest/benchmarks/Benchmarking/).

GROBID also can't parse every PDF. It doesn't do OCR, so scanned or image-only PDFs produce little or nothing useful, and unusual or malformed PDFs can fail outright. Filter on `has_content.grobid_xml:true` to limit your set to works where we have a parse.

Every XML file a work uses is standard TEI: a `<TEI>` root with `<teiHeader>` and `<text><body>`. Until 28 October 2026 about 1.5 million of them came from an older pipeline that wrapped a lowercase `<tei>` element inside `<html><body>`; we repaired those in place (see [Files don't change](#option-3-complete-archive-sync)). The buckets still hold older files in that shape that no work uses, so if you copied whole buckets, skip any file the manifest doesn't list.

We pass GROBID's output through unchanged, including any errors it made. You can catch some with simple guard clauses — for example, **drop any reference whose DOI matches the work's own DOI**, and **cross-check GROBID's header metadata against the OpenAlex Work record** (which draws on Crossref and other sources independently of GROBID).

A lot of people today actually want Markdown rather than XML for LLM and RAG pipelines. We don't have Markdown parses yet, though they're on the roadmap. In the meantime you can roll your own by downloading the PDFs we provide and running them through one of the newer PDF→Markdown tools like [Marker](https://github.com/datalab-to/marker), [Docling](https://github.com/docling-project/docling), or [MinerU](https://github.com/opendatalab/MinerU).

## Licensing

The PDFs retain their original copyright. OpenAlex does not grant any additional rights to the content.

To check the license for a specific work, use the `best_oa_location.license` field in the API:

```
https://api.openalex.org/works?filter=has_content.pdf:true,best_oa_location.license:cc-by
```

This returns works that have downloadable PDFs and are licensed under [CC BY](https://creativecommons.org/licenses/by/4.0/).
