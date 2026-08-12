---
title: "CLI"
description: "Download filtered subsets of OpenAlex data from the command line"
tags: ["downloads"]
source_id: "download/openalex-cli"
source_url: "https://developers.openalex.org/download/openalex-cli"
source_updated: "2026-03-10"
---
The OpenAlex CLI is the official command-line tool for downloading data from OpenAlex. It handles parallel downloads, checkpointing, and rate limiting so you don't have to build that yourself.

```bash
pip install openalex-official
```

> **Info:**
> **Work in progress.** The CLI currently focuses on work metadata and content downloads. More features (CSV export, other entity types) are coming. [Follow development on GitHub](https://github.com/ourresearch/openalex-official).

## Quick examples

**Download metadata for works on a topic:**

```bash
openalex download \
  --api-key YOUR_KEY \
  --output ./results \
  --filter "topics.id:T10325"
```

**Download metadata + PDFs:**

```bash
openalex download \
  --api-key YOUR_KEY \
  --output ./results \
  --filter "topics.id:T10325" \
  --content pdf
```

**Download metadata + PDFs + TEI XML:**

```bash
openalex download \
  --api-key YOUR_KEY \
  --output ./results \
  --filter "topics.id:T10325" \
  --content pdf,xml
```

**Download by DOI:**

```bash
openalex download \
  --api-key YOUR_KEY \
  --output ./results \
  --ids "10.1038/nature12373,10.1126/science.1234567"
```

**Pipe in a list of work IDs:**

```bash
cat work_ids.txt | openalex download \
  --api-key YOUR_KEY \
  --output ./results \
  --stdin
```

See [Full-text PDFs](/access/fulltext/#option-2-openalex-cli-up-to-a-few-million-files) for more examples.

## Output format

Metadata is saved as JSON files alongside any content you requested:

```
output/
├── W2741809807.json     # metadata (always saved)
├── W2741809807.pdf      # content (if --content pdf)
├── W2741809807.tei.xml  # content (if --content xml)
└── W1234567890.json
```

## Why use the CLI?

Building a robust bulk downloader is harder than it looks. The CLI handles:

- **Metadata by default** — Every work gets a complete JSON file
- **Parallel downloads** — Up to 200 concurrent connections
- **Automatic checkpointing** — Resume interrupted downloads without re-downloading
- **Adaptive rate limiting** — Adjusts to API conditions automatically
- **DOI resolution** — Auto-detects DOIs and converts them to OpenAlex IDs
- **Progress tracking** — Real-time stats in your terminal

At full speed, you can download thousands of works per hour.

## Pricing

| Download type | Cost |
|---------------|------|
| Metadata | Nearly free (~$0.10 per 1,000 requests; single works by ID are free) |
| PDFs | $0.01 each |
| TEI XML | $0.01 each |

With a free API key ($1/day), metadata is effectively almost free — list requests cost about $0.10 per 1,000, and fetching single works by ID costs nothing — and you can download about 100 content files per day. See [Example costs](/access/example-costs/) for the full rate card.

Need more content? [Contact us](mailto:sales@openalex.org) about enterprise pricing for large-scale projects.

## Full documentation

For all options and advanced usage:

```bash
openalex download --help
```

See the [GitHub README](https://github.com/ourresearch/openalex-official) for complete documentation.
