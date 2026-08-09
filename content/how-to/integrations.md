---
title: "Integrations"
description: "Getting OpenAlex data into other tools: website exports, VOSviewer, link resolvers, and the Unpaywall browser extension."
tags: ["downloads"]
synonyms: ["export", "CSV", "RIS", "VOSviewer", "link resolver", "SFX", "EBSCO", "Unpaywall extension"]
---
OpenAlex data flows into a lot of other tools. This page covers exporting from the website and the most common third-party integrations. For programmatic access, see [Get the data](/access/get-the-data/).

## How do I export results from the OpenAlex website?

Above any works result set there's an export button. Pick a format:

- **Spreadsheet (.csv)** — for Excel and friends; flattens the [works data](/data/works/attributes/) into many columns. If you'll open it in Excel, check "Shorten column values for Excel compatibility" — Excel chokes on very long cell values, and this truncates them (at the cost of some data loss).
- **Endnote format (.ris)** — for reference managers like EndNote or Zotero.
- **Text format (.txt)** — broadly compatible with the export format used by Web of Science and Dimensions.

The system prepares the file and gives you a download link — large result sets can take several minutes. The maximum export is 100,000 works.

## How do I import OpenAlex data into VOSviewer?

[VOSviewer](https://www.vosviewer.com/) builds and visualizes bibliometric networks, and it talks to OpenAlex directly — no file downloads needed:

1. At [openalex.org](https://openalex.org), build the query you want to analyze, then copy the URL from your browser.
2. In VOSviewer, click "Create" → "Create a map based on bibliographic data" → "Download through the API" (OpenAlex is the default).
3. Paste your URL into the "Request URL" field and hit next to specify your network.

Note that VOSviewer supports up to 50,000 records per analysis, so you may need to narrow your query with extra filters.

## How do link-resolver integrations work?

Several link resolvers — SFX, EBSCO Discovery Service, 360 Link — use Unpaywall (OpenAlex's legacy-format API surface, same underlying data) to route users to open-access copies: **OA copies → Unpaywall data → link resolver → your users**. They use one of two free services: a redirect service (`unpaywall.org/<DOI>` sends you to the best OA location, or the publisher page if there isn't one) and the [Unpaywall REST API](/access/unpaywall/), which returns the best OA location as metadata instead of redirecting.

When something breaks, the split matters: we can help when the problem is the link between a DOI and an OA location in our data; your link resolver vendor is the right contact for everything else (installation, formatting, display). To triage:

- **The link looks like `unpaywall.org/<DOI>`** (the redirect service): if it lands on a toll-access publisher page, that's working as designed — we just don't have an OA copy. If it lands on the *wrong* article or an incomplete copy, that's ours to fix — [report it](https://openalex.org/contact) with the DOI.
- **It's a direct link to a copy** (the API): these should only appear for OA articles, so anything other than a full, free copy of the right article is likely our bug — [let us know](https://openalex.org/contact).

## Why does the Unpaywall extension say a paywalled article is open access?

Besides using the API, the browser extension looks for a PDF link directly in the page you're viewing and, if it finds one, shows a Bronze OA icon. If you're on a university network or logged into a publisher site that gives you access, the extension will happily point at that PDF — even though the article isn't actually open access. That's deliberate: the extension is built to help you *obtain* fulltext, not to educate about access status. If the article's true OA status matters to you, check [the API](/access/unpaywall/) directly. And if the link it gives you doesn't work, [report it](https://openalex.org/contact).
