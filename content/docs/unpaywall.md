---
title: "Unpaywall"
description: "What Unpaywall is — a legacy-compatible API surface over the OpenAlex database — its DOI coverage, data format, and how it relates to OpenAlex products."
tags: ["unpaywall"]
source_id: "41193838206743"
source_url: "https://help.openalex.org/hc/en-us/articles/41193838206743-Which-DOIs-does-Unpaywall-cover"
source_updated: "2026-06-13"
---
[Unpaywall](https://unpaywall.org) is OpenAlex's Open Access discovery surface: an API, dataset, and [browser extension](https://unpaywall.org/products/extension) that tell you whether a scholarly article has a free-to-read copy, and where. It's used by libraries, link resolvers, and thousands of applications.

**Unpaywall is not a separate database.** Since the Walden rewrite, Unpaywall records are served from the **same OpenAlex data** that powers everything else — Unpaywall is a legacy-compatible *format* over that data, kept stable for the large ecosystem built on it. The OA facts in an Unpaywall record and in an OpenAlex [work's `open_access` object](/data/works/open-access/) come from the same pipeline.

## The Unpaywall surfaces

| Surface | What it does |
|---|---|
| [REST API](https://unpaywall.org/products/api) | `api.unpaywall.org/v2/{DOI}?email=you@example.com` returns the article's OA record in the [Unpaywall data format](https://unpaywall.org/data-format) |
| [Simple Query Tool](https://unpaywall.org/products/simple-query-tool) | Paste up to 1,000 DOIs, get results by email — no code needed |
| [Browser extension](https://unpaywall.org/products/extension) | Shows a green tab when the article you're viewing has a free copy |
| [Data feed](#the-unpaywall-data-feed) | Change updates in the Unpaywall record format, for subscribers |
| Link-resolver integrations | Unpaywall data inside SFX, EBSCO, 360 Link, and others — see [Link resolver integrations](/help/integrations/#how-do-link-resolver-integrations-work) |

For new projects, consider the [OpenAlex API](/api/) directly — it exposes the same OA information plus everything else OpenAlex knows (works, authors, sources, topics, and more). The Unpaywall format is best when you're integrating with tools that already speak it.

## Which DOIs Unpaywall covers

DOIs can be created by any of several [Registration Agencies](https://www.doi.org/registration_agencies.html). The Unpaywall dataset covers articles issued by one: [Crossref](https://www.crossref.org/). If a DOI isn't in Unpaywall, it might be invalid or created by a different agency — in either case the REST API returns 404, the Simple Query Tool gives a blank row, and it's absent from the dataset.

- Check whether a DOI is **valid** with the [doi.org proxy REST API](https://www.doi.org/factsheets/DOIProxy.html#rest-api).
- Check **which agency** created it with Crossref's agency endpoint: `https://api.crossref.org/works/{DOI}/agency`.
- Some valid Crossref DOIs are still excluded because they've been deleted or are used for testing.

**DataCite DOIs** aren't included. Nearly everything with a DataCite DOI is Open Access, so classifying them added little value and was mostly a source of errors — for statistical purposes, if you have a DataCite DOI, it's OA. (OpenAlex itself *does* index DataCite works — that's one of the things the [OpenAlex API](/api/) gives you beyond the Unpaywall format.)

## The Unpaywall Data Feed

Unpaywall has a data feed for [subscribers](/docs/pricing/): daily change updates in the Unpaywall record format, covering Crossref-DOI works only. It delivers changes to the same underlying OpenAlex data — the feed exists for the ecosystem of integrations that already speak the Unpaywall schema, and it's one of the [four ways to keep in sync with OpenAlex](/docs/sync/#keeping-in-sync-with-openalex).

For any new integration, use an OpenAlex-native sync method instead — they cover every entity type (works, authors, sources, institutions, and the rest) in the full OpenAlex schema. If you're an existing Unpaywall Data Feed subscriber weighing a migration, [talk to us](mailto:sales@openalex.org) — the mapping from Unpaywall records to OpenAlex works is well-trodden.

## Fixing errors

- **A specific article's OA status looks wrong:** [file a ticket](https://openalex.org/contact) — see [Fixing errors: Works](/data/fixing-errors/works/) for what to include (check from outside your university network first, and link the open copy).
- **A journal's OA status is wrong:** [file a ticket](https://openalex.org/contact) with the journal's ISSN and evidence.
- **Anything else:** [support@unpaywall.org](mailto:support@unpaywall.org).

## Related pages

- [Open Access](/data/works/open-access/) — how OpenAlex determines OA status, the taxonomy behind `oa_status`
- [API security](/api/introduction/#security) — displaying metadata text safely
- [Sync](/docs/sync/#keeping-in-sync-with-openalex) — the OpenAlex-native ways to stay in sync
