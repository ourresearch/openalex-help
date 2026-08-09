---
title: "Works"
description: "How to report errors on works — wrong open-access status, broken fulltext links, bad metadata — and what makes a report we can act on."
tags: ["reference"]
---
Errors on [works](/data/works/) — wrong open-access status, broken links, bad metadata, duplicates, missing works — are fixed by ticket: [file one at openalex.org/contact](https://openalex.org/contact). Our AI agents turn reports into structured corrections, verify them, and apply them (see the [overview](/docs/fixing-errors/) for how that pipeline works).

What makes a report fixable:

- **The work's ID or DOI** (e.g. `W2741809807` or `10.7717/peerj.4375`) — not just a title.
- **What's wrong** — the specific field or claim.
- **What's right** — the correct value.
- **Evidence** — a URL we can check.

## Wrong open-access status

This is the single most common report we get — and about half of these reports are themselves wrong. The usual reason: the reporter checked the article from inside their institution's network, where a paywalled article *looks* free because their library has already paid for it.

So before reporting that a "closed" work is actually open (or vice versa): **check the article from outside your university network and VPN.** Your phone on cellular data works well.

If the work really is open, **include the URL of the free-to-read copy** — that URL is the fix. Without it, there's nothing we can act on. For what counts as open, see [Open access](/data/works/open-access/).

## Broken or wrong fulltext link

A related case: OpenAlex says a work is open but the link is broken — it 404s, points at the wrong article, or lands on the wrong file. Report it like any other work error, and include the broken URL plus, if you know it, the URL it should be.

## Why work errors happen

A work's record is assembled from upstream sources (Crossref, repositories, PubMed, and others), then matched, deduplicated, and enriched — and every step can introduce errors: the upstream metadata can be wrong, a fix upstream may not have reached us yet, or our own matching and extraction can slip. See [How it's built](/data/how-its-built/) for the pipeline. None of that changes what to do — file a ticket either way — but it can explain what you're seeing.
