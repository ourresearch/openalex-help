---
title: "Fixing data errors"
updated: 2026-08-12
description: "How to report anything wrong in OpenAlex — OA status, sources, dates, metadata — and write a report we can act on fast."
tags: ["fixing"]
synonyms: ["report error", "wrong data", "open access status", "wrong date", "support ticket"]
card: "File a ticket; AI agents verify and apply the fix. Four things make a report move fast."
---
For your own [author profile](/how-to/fixing-authors/) and [affiliation matching](/how-to/fixing-affiliations/) there are self-serve fixes. For everything else, the fix is a **ticket**: [file it at openalex.org/contact](https://openalex.org/contact), and our AI agents turn it into a structured correction, verify it, and apply it. How that pipeline works is covered in the [Fixing errors reference](/access/fixing-errors/); this page is how to use it well.

## How do I write a report that gets acted on?

Four things make a report fixable:

1. **The record's ID or URL** (e.g. `W2741809807` or the DOI) — not just a title.
2. **What's wrong** — the specific field or claim.
3. **What's right** — the correct value.
4. **Evidence** — a URL we can check.

"The OA status on openalex.org/W2741809807 says closed, but it's free to read at peerj.com/articles/4375" is fixable in minutes. "Lots of my university's papers are wrong" gives us nothing to check.

## How do I fix a work's open-access status?

This is our most common report — and about half of these reports are themselves wrong, usually because the reporter checked from inside their institution's network, where paywalled articles look free. So first, **check the article from outside your university network and VPN** (your phone on cellular data works well). It's really open if you can view the fulltext with no login, payment, or account creation, on a legal site (the publisher or a trusted repository). Watch the traps: journals that are open *now* but whose older content is closed; "PDF" buttons that lead to a paywall; free-with-an-account (not OA); Sci-Hub (also not OA).

If it passes that test, [file a ticket](https://openalex.org/contact) and **include the URL of the free-to-read copy — that URL is the fix.** See [Works](/access/fixing-errors/works/) in the reference for more, and [Open access](/data/works/open-access/) for how statuses are determined.

## How do I fix errors in a source or journal profile?

Wrong metadata on a journal, a missing journal, a source's OA classification — all ticket cases. [File one](https://openalex.org/contact) with the source's OpenAlex ID ([how to find it](/how-to/finding-openalex-ids/#how-do-i-find-a-sources-id)), what's wrong, and what's right. If the journal is missing entirely, see [Getting indexed](/how-to/getting-indexed/).

## Why is the date wrong, and how do I fix it?

Date metadata is genuinely messy — a paper can have a DOI-mint date, an acceptance date, a publication date, and an issue date, and preprints can precede the journal version by years. OpenAlex consistently uses the **earliest** date available on the record, which occasionally looks wrong even when it's working as designed. We don't support user curation of dates. If the underlying metadata is wrong, check [Crossref](https://search.crossref.org/) first — fixes there flow into OpenAlex automatically. If you believe the error is on our end, [file a ticket](https://openalex.org/contact).

## Missing works

If *your institution* seems to be missing works, that's usually an affiliation-matching question — see [the checklist](/how-to/fixing-affiliations/#i-think-my-institution-is-missing-works-what-do-i-check). If a specific work is missing from OpenAlex entirely, file a ticket with its DOI; if it's a whole journal or repository that's missing, see [Getting indexed](/how-to/getting-indexed/).
