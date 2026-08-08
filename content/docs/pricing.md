---
title: "Overview"
description: "How OpenAlex pricing works: $1 of free API usage every day, pay-as-you-go prepaid usage, and annual plans (Member, Member+, Partner) — plus the PDF sync add-on and the free-data, paid-services sustainability model."
tags: ["reference"]
synonyms: ["plans", "subscriptions", "premium", "membership", "cost", "credits", "prepaid usage"]
---
The OpenAlex *data* is free — but serving it is not, so *usage* is what costs money. Pricing is simple and transparent: every account gets **$1 of API usage per day for free**, and if you need more than that, there are exactly two ways to get it — **pay as you go**, or an **annual plan**. One of those three covers everyone, and the vast majority of users never leave the free tier. (Current prices always live on the [pricing page](https://openalex.org/pricing); this section explains what you're buying.)

## Free: $1 per day

Create a free OpenAlex account and you get an API key with **$1 of usage per day** — no payment method required. That's enough for most research and personal projects. The budget resets every midnight UTC; how usage maps to API calls is covered in the [API docs](/api/authentication/).

## Pay as you go: prepaid usage

If you need more than $1 on a given day, add **prepaid usage** in $1 increments, self-serve, on the [pricing page](https://openalex.org/pricing). Prepaid usage is only drawn down after your free daily budget runs out, and it expires 3 months after your most recent purchase. See [Buying & renewing](/docs/buying-and-renewing/) for the mechanics (including VAT invoices).

## Annual plans

For organizations and heavy users, three annual plans bundle a much larger daily API budget with priority support and other benefits — while directly supporting OpenAlex as open infrastructure. Each plan includes everything in the one before it. Full benefit details and activation instructions live on each plan's page.

### Member — $5,000/year

The entry plan for organizations that rely on OpenAlex. You get a **$20/day API budget** ($7,300/year of usage — a 32% saving over pay-as-you-go), the **admin dashboard** for managing your organization's users and billing, and **community representation**: advisory-board nominations and a seat at our quarterly supporter meetings. Academic and government institutions also get the **affiliation editor** and free **Unsub** access. [Full details →](/docs/member/)

### Member+ — $10,000/year

Everything in Member, plus a **$100/day API budget** ($36,500/year of usage — a 73% saving), **basic support** (help with critical API bugs), and **daily sync**: a complete daily snapshot of the database plus API filters that return everything new or changed since any date. [Full details →](/docs/member-plus/)

### Partner — from $20,000/year

Everything in Member+, plus a **$200+/day API budget** sized to your needs, **full ticket-based support** for all issues, and — for academic and government institutions — **3 power-user accounts** with extra-high API limits and **5 hours of consulting** per year. Partner pricing starts at $20,000 and scales with your use case. [Full details →](/docs/partner/)

Ready to talk? Email [sales@openalex.org](mailto:sales@openalex.org). If you're coming from an older Premium or Institutional contract, see [Legacy plans](/docs/legacy-plans/).

## The PDF sync add-on

OpenAlex caches roughly **60 million open-access full-text PDFs** (plus machine-readable TEI XML). Any annual plan can add the **PDF sync service**: persistent read access to the content archive's S3-compatible bucket, so you can sync the complete archive to your own storage — and keep receiving new PDFs as they arrive, continuously.

Note what's for sale here: **sync, not PDFs**. In keeping with our [free data, paid services](#free-data-paid-services) model, we don't sell the documents — we sell the service of delivering the living, continuously-updated archive to your infrastructure. The add-on requires an active annual plan (any tier) and is priced separately; [contact sales](mailto:sales@openalex.org) for a quote. For the technical side — bucket layout, manifests, and smaller-scale download options — see [Fulltext](/docs/fulltext/).

## Free data, paid services

Scholarly metadata is treated in most markets as "the new oil" — value is captured by *limiting* access. OpenAlex takes the opposite position: the data is a public good, released under a [CC0](https://creativecommons.org/public-domain/cc0/) public-domain license with no "personal use only" carve-out and no permission to ask. Revenue comes from time and services layered on top — serving, freshness, support — rather than from the data itself, mirroring the [POSI](https://openscholarlyinfrastructure.org/) principle of revenue based on services, not data.

This is also structural insurance: OpenAlex is a US 501(c)(3) nonprofit, all code is open source, and the full dataset is openly downloadable — so if we ever lost our way, anyone could take the data and code and continue the mission. For the model in brief, see [What is OpenAlex's sustainability model?](/help/what-is-openalexs-sustainability-model/); co-founder and CEO Jason Priem walks through it, and the most common questions about it, in [this video](https://youtu.be/CZ5Q9To1zCc).
