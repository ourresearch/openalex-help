---
title: "Unpaywall"
updated: 2026-10-29
description: "What Unpaywall is — a legacy-compatible API surface over the OpenAlex database — its DOI coverage, data format, and how it relates to OpenAlex products."
tags: ["unpaywall"]
source_id: "41193838206743"
source_url: "https://help.openalex.org/hc/en-us/articles/41193838206743-Which-DOIs-does-Unpaywall-cover"
source_updated: "2026-06-13"
---
[Unpaywall](https://unpaywall.org) is OpenAlex's Open Access discovery surface: an API, dataset, and [browser extension](https://unpaywall.org/products/extension) that tell you whether a scholarly article has a free-to-read copy, and where. It's used by libraries, link resolvers, and thousands of applications.

## Unpaywall and OpenAlex

Unpaywall and OpenAlex come from the same team, and they now run on the same database. When you look at OpenAlex, you are looking at Unpaywall's data in a different format, plus a lot more.

**A little history.** Unpaywall launched in 2017 to answer one question: is there a free, legal copy of this paper? In 2022 the same team launched OpenAlex. It knows everything Unpaywall knows about open access, and adds the rest of the scholarly record: authors, journals, institutions, topics, and citations. In late 2025 we moved Unpaywall onto the OpenAlex database. Since then there has been one set of data. Unpaywall is a legacy-compatible format over it, kept stable for the thousands of tools built on it.

**Same data, same sources.** The `is_oa`, `oa_status`, and PDF link in an Unpaywall record are the same values you'll find in the OpenAlex work's [`open_access`](/data/works/open-access/) and `best_oa_location` fields. The journals and repositories Unpaywall monitors are OpenAlex sources. There is no separate Unpaywall list.

**Two fields to read with care.** `z_authors` is deprecated. It isn't kept up to date: a record's authors are rewritten only when some other part of the record changes, so they can differ from the work's current authors and affiliations. For authors, use the OpenAlex work's [`authorships`](/data/works/attributes/#authorships) (look it up by DOI: `api.openalex.org/works/doi:10.xxxx/...`). And `oa_date` is the work's publication date on every open copy, not the date a copy became available: see [OA dates](/data/works/open-access/#oa-dates) before using it.

**One record per Crossref DOI, answered by its OpenAlex work.** Some works carry several Crossref DOIs: a preprint and the journal article it became, or a publisher's double registration. Each of those DOIs returns the record of the work OpenAlex returns for it (`https://api.openalex.org/works/doi:{DOI}`), with the `doi` you asked for. So a bioRxiv DOI for a paper later published in a journal answers with the journal article's open-access status.

**We are not retiring Unpaywall.** People like the brand, the interface, and the record format, and it does one job well: DOI in, open-access answer out. The DOI lookup API, the browser extension, and the Data Feed are unchanged and staying.

**For anything else, use OpenAlex.** Searching for papers, listing a journal's articles, looking up a repository: that is what OpenAlex is for, and it does far more of it than Unpaywall ever did, over the same data. Start at [openalex.org](https://openalex.org) or the [API](/api/).

## The Unpaywall surfaces

| Surface | What it does |
|---|---|
| [REST API](https://unpaywall.org/products/api) | `api.unpaywall.org/v2/{DOI}?email=you@example.com` returns the article's OA record in the [Unpaywall data format](https://unpaywall.org/data-format) |
| [Simple Query Tool](https://unpaywall.org/products/simple-query-tool) | Paste up to 1,000 DOIs, get results by email — no code needed |
| [Browser extension](https://unpaywall.org/products/extension) | Shows a green tab when the article you're viewing has a free copy |
| [Data feed](#the-unpaywall-data-feed) | Change updates in the Unpaywall record format, for subscribers |
| Link-resolver integrations | Unpaywall data inside SFX, EBSCO, 360 Link, and others — see [Link resolver integrations](/how-to/integrations/#link-resolver-integrations) |

## Making the extension work on your own site

The browser extension looks up open-access copies by [DOI](https://www.doi.org/), so it needs to find the DOI of the article a page is about. It reads the DOI from a `<meta>` element in the page's HTML — for example, on a Nature article page it finds:

```html
<meta name="citation_doi" content="10.1038/nature21360"/>
```

and looks up `10.1038/nature21360` in the API.

If you run a publisher site, preprint server, institutional repository, or any other site with pages about DOI-bearing items, add one of these recognized `<meta>` names so the extension (and other applications) can find the DOI:

`citation_doi` · `doi` · `dc.doi` · `dc.identifier` · `dc.identifier.doi` · `bepress_citation_doi` · `rft_id` · `dcsext.wt_doi`

Repository software usually emits one of these automatically, often via a plugin; on a custom platform you'll need to add it yourself. Note that the extension recognizes a page as being about **one** DOI — for a page centered on content *related* to another DOI-bearing item (a book review, say), it may not be appropriate to present that DOI as the page's own, especially if the review has its own DOI.

## Which DOIs Unpaywall covers

DOIs can be created by any of several [Registration Agencies](https://www.doi.org/registration_agencies.html). The Unpaywall dataset covers articles issued by one: [Crossref](https://www.crossref.org/). If a DOI isn't in Unpaywall, it might be invalid or created by a different agency — in either case the REST API returns 404, the Simple Query Tool gives a blank row, and it's absent from the dataset.

- Check whether a DOI is **valid** with the [doi.org proxy REST API](https://www.doi.org/factsheets/DOIProxy.html#rest-api).
- Check **which agency** created it with Crossref's agency endpoint: `https://api.crossref.org/works/{DOI}/agency`.
- Some valid Crossref DOIs are still excluded because they've been deleted or are used for testing.
- Crossref grant DOIs aren't included: they describe funding, not articles. OpenAlex lists them as [awards](/data/awards/).

**DataCite DOIs** aren't included. Nearly everything with a DataCite DOI is Open Access, so classifying them added little value and was mostly a source of errors — for statistical purposes, if you have a DataCite DOI, it's OA. (OpenAlex itself *does* index DataCite works — that's one of the things the [OpenAlex API](/api/) gives you beyond the Unpaywall format.)

## The Unpaywall Data Feed

Unpaywall has a data feed for [subscribers](/access/pricing/): daily change updates in the Unpaywall record format, covering Crossref-DOI works only. It delivers changes to the same underlying OpenAlex data — the feed exists for the ecosystem of integrations that already speak the Unpaywall schema, and it's one of the [four ways to keep in sync with OpenAlex](/access/sync/#keeping-in-sync-with-openalex).

**Deleted DOIs.** When OpenAlex removes a DOI (a Crossref grant, or a DOI in Crossref's list of deleted DOIs), Unpaywall removes it too: the API answers 404 and the DOI leaves the full snapshot. A changefile can't carry a removal, so the feed keeps a running list of removed DOIs next to the changefiles. Download it with your feed key:

```
https://api.unpaywall.org/daily-feed/changefile/deleted_dois.jsonl.gz?api_key=YOUR_KEY
https://api.unpaywall.org/weekly-feed/changefile/deleted_dois.jsonl.gz?api_key=YOUR_KEY
```

Each line is one DOI: `{"doi":"10.3030/101152945","deleted":"2026-10-29T17:18:06Z","reason":"crossref_grant"}` (`reason` is `crossref_grant` or `crossref_deleted_doi`). Remove these DOIs from your copy. If a DOI ever comes back, it leaves the list and arrives in a changefile. The list isn't in the changefile listing, so scripts that download every listed changefile are unaffected. The first removal, on 29 October 2026, took out 342,714 DOIs: 177,738 grants and 164,976 deleted DOIs.

For any new integration, use an OpenAlex-native sync method instead — they cover every entity type (works, authors, sources, institutions, and the rest) in the full OpenAlex schema. If you're an existing Unpaywall Data Feed subscriber weighing a migration, [talk to us](mailto:sales@openalex.org) — the mapping from Unpaywall records to OpenAlex works is well-trodden.

## Fixing errors

- **A specific article's OA status looks wrong:** [file a ticket](https://openalex.org/contact) — see [Fixing errors: Works](/access/fixing-errors/works/) for what to include (check from outside your university network first, and link the open copy).
- **A journal's OA status is wrong:** [file a ticket](https://openalex.org/contact) with the journal's ISSN and evidence.
- **Anything else:** [support@unpaywall.org](mailto:support@unpaywall.org).

## Related pages

- [Open Access](/data/works/open-access/) — how OpenAlex determines OA status, the taxonomy behind `oa_status`
- [API security](/api/#security) — displaying metadata text safely
- [Sync](/access/sync/#keeping-in-sync-with-openalex) — the OpenAlex-native ways to stay in sync
