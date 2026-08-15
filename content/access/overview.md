---
title: "Overview"
description: "Every way to get OpenAlex data — website, API, CLI, agents, snapshot, sync, fulltext, Unpaywall — and how to pick the right one for your technical skill, scale, and budget."
tags: ["downloads"]
---
There are many ways to get OpenAlex data, from point-and-click to whole-database. They all serve the same knowledge graph — the difference is how much you take, how fresh it is, how much technical skill it takes, and what it costs. This page helps you pick.

| Product | Best for | Technical skill | Cost |
|---|---|---|---|
| [Website](/access/website-basic/) | Exploring, one-off questions, exporting result lists | None | Free |
| [Agents](/access/agents/) | Letting your AI agent query OpenAlex for you | None | Free tier, then [usage pricing](/access/pricing/) |
| [API](/api/) | Apps, scripts, and analyses that need live data | Some coding | $1/day free, then [usage pricing](/access/pricing/) |
| [CLI](/access/cli/) | Bulk downloads from your terminal, with retries and resume built in | Command line | Same as the API |
| [Snapshot](/access/snapshot/) | Your own copy of the entire database, updated quarterly | Data engineering | Free |
| [Sync](/access/sync/) | Keeping your copy fresh with daily updates | Data engineering | [Member+ and Partner plans](/access/pricing/) |
| [Fulltext](/access/fulltext/) | Full-text PDFs and TEI XML, per-file or the whole archive | Varies by option | $0.01/file; full archive via the [PDF sync add-on](/access/pricing/#the-pdf-sync-add-on) |
| [Unpaywall](/access/unpaywall/) | Legacy Unpaywall integrations and OA lookups by DOI | Some coding | Free |

## Picking a product

**Just exploring?** Use the [website](/access/website-basic/) — search, filter, and export without writing a line of code. If you use an AI assistant, you can also just tell it to [use OpenAlex](/access/agents/).

**Building something?** The [API](/api/) is the workhorse: fast, well-documented, and free for most uses — every account gets $1 of usage per day, which covers most research and personal projects. When you outgrow it, [usage pricing](/access/pricing/) is pay-as-you-go. The [CLI](/access/cli/) wraps the same API for bulk work in your terminal, handling parallelism, checkpointing, and resume for you.

**Want the whole database?** The [snapshot](/access/snapshot/) is the entire dataset, free to download, refreshed quarterly. If quarterly isn't fresh enough, [sync](/access/sync/) gets you a complete daily snapshot plus API filters for everything new or changed since any date — a benefit of the Member+ and Partner [plans](/access/pricing/). (Only mirroring a slice of OpenAlex, like your own institution's works? Those [API filters](/access/sync/#premium-api-filters-paid-plans) can keep a subset fresh with no snapshot infrastructure at all.)

**After the documents themselves?** [Fulltext](/access/fulltext/) covers the content archive — more than 50 million open-access PDFs and their machine-readable TEI XML — from single-file downloads up to syncing the complete archive to your own bucket.

However you get it, the data itself is free and open under [CC0](https://creativecommons.org/public-domain/cc0/) — what costs money at the higher tiers is the *service* of serving and refreshing it. That story, and every plan, lives in [Pricing](/access/pricing/).
