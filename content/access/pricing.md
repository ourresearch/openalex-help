---
title: "Overview"
updated: 2026-11-03
description: "How OpenAlex pricing works: all the data is free, and what we sell is service. $1 of free API usage every day, pay-as-you-go prepaid usage, annual plans (Member, Member+, Partner), daily sync for keeping up to date, and the PDF sync add-on."
tags: ["reference"]
synonyms: ["plans", "subscriptions", "premium", "membership", "cost", "credits", "prepaid usage"]
---
**All OpenAlex data is free. What we sell is service: a bigger daily API budget, support, and keeping your copy up to date** ([why](#free-data-paid-services)). Every account gets **$1 of API usage per day for free**, and if you need more than that, there are two ways to get it: **pay as you go**, or an **annual plan**. Most users never leave the free tier. (Current prices always live on the [pricing page](https://openalex.org/pricing); this page explains what you're buying.)

## Free: $1 per day

Create a free OpenAlex account and you get an API key with **$1 of usage per day** — no payment method required. That's enough for most research and personal projects. The budget resets every midnight UTC; how usage maps to API calls is covered in [Example costs](/access/example-costs/). A new account spends its first $1 a little more slowly, at up to $0.10 every 5 minutes ([why](/api/authentication/#new-accounts)).

## Pay as you go: prepaid usage

If you need more than $1 on a given day, add **prepaid usage** in $1 increments, self-serve, on the [pricing page](https://openalex.org/pricing). Prepaid usage is only drawn down after your free daily budget runs out, and it expires 3 months after your most recent purchase. See [Buying & renewing](/access/buying-and-renewing/) for the mechanics (including VAT invoices).

## Annual plans

For organizations and heavy users, three annual plans bundle a much larger daily API budget with priority support and other benefits — while directly supporting OpenAlex as open infrastructure. Each plan includes everything in the one before it. Full benefit details and activation instructions live on each plan's page.

### Member — $5,000/year

The entry plan for organizations that rely on OpenAlex. You get a **$20/day API budget** ($7,300/year of usage — a 32% saving over pay-as-you-go), the **admin dashboard** for managing your organization's users and billing, and **community representation**: advisory-board nominations and a seat at our quarterly supporter meetings. Academic and government institutions also get the **affiliation editor** and free **Unsub** access. [Full details →](/access/member/)

### Member+ — $10,000/year

Everything in Member, plus a **$100/day API budget** ($36,500/year of usage, a 73% saving), **basic support** (help with critical API bugs), and **daily sync**, the paid way to keep up to date: mainly a complete daily snapshot of the database, plus API filters that return everything new or changed since any date, for smaller numbers of updates. [Full details →](/access/member-plus/)

### Partner — from $20,000/year

Everything in Member+, plus a **$200+/day API budget** sized to your needs, **full ticket-based support** for all issues, and — for academic and government institutions — **3 power-user accounts** with extra-high API limits and **5 hours of consulting** per year. Partner pricing starts at $20,000 and scales with your use case. [Full details →](/access/partner/)

Ready to talk? Email [sales@openalex.org](mailto:sales@openalex.org). If you're coming from an older Premium or Institutional contract, see [Legacy plans](/access/legacy-plans/).

## The PDF sync add-on

OpenAlex caches more than **70 million open-access full-text PDFs** (plus machine-readable TEI XML). The [Member+](/access/member-plus/) and [Partner](/access/partner/) plans can add the **PDF sync service**: persistent read access to the content archive's S3-compatible bucket, so you can sync the complete archive to your own storage — and keep receiving new PDFs as they arrive, continuously. It isn't offered on Member: a new PDF is only usable with fresh metadata (its license, and which work it belongs to), and that freshness comes from [daily sync](/access/sync/), a Member+ benefit.

Note what's for sale here: **sync, not PDFs**. In keeping with our [free data, paid services](#free-data-paid-services) model, we don't sell the documents — we sell the service of delivering the living, continuously-updated archive to your infrastructure. The add-on requires an active Member+ or Partner plan and is priced separately; [contact sales](mailto:sales@openalex.org) for a quote. For the technical side — bucket layout, manifests, and smaller-scale download options — see [Fulltext](/access/fulltext/).

## Free data, paid services

**All OpenAlex data is free. Keeping up to date with it is the paid service.** That's our business model, and it follows the [Principles of Open Scholarly Infrastructure](https://openscholarlyinfrastructure.org/) (POSI): sell services, not data.

- **Free for everyone: the data.** Every record is released under a [CC0](https://creativecommons.org/public-domain/cc0/) public-domain license, with no "personal use only" carve-out and no permission to ask. Use it on the website, through the API ($1 of usage a day, free), or download the whole database in the [snapshot](/access/snapshot/), refreshed every quarter.
- **Paid: keeping up to date.** OpenAlex changes every day, with new works, fixes and merges. Getting those changes as they happen is [daily sync](/access/sync/), part of the [Member+](/access/member-plus/) and [Partner](/access/partner/) plans.

The main way to get updates is the **daily snapshot**: the complete database, published every day, so you download only what changed since your last sync. Some people would rather use the API, and for small numbers of updates (one institution's works, say) that works well: the API's [sync filters](/api/filtering/#sync-filters-member-and-partner) return what was created or changed since a date. We support that route, and like any other way of getting updates, it needs a Member+ or Partner plan. That's why those filters are the one exception to "every filter is free": without a plan, they would be a free way to learn what changed, which is the service the plans pay for.

The rest of what we sell works the same way. A bigger daily API budget and support cost us real money to provide, so the people who need them pay for them, and that keeps the data free for everyone.

This is also structural insurance: OpenAlex is a US 501(c)(3) nonprofit, all code is open source, and the full dataset is openly downloadable — so if we ever lost our way, anyone could take the data and code and continue the mission. Co-founder and CEO Jason Priem walks through the model, and the most common questions about it, in [this video](https://youtu.be/CZ5Q9To1zCc).
