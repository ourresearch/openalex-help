---
title: "Repository records"
description: "How repository content gets into OpenAlex — OAI-PMH harvesting, matching records to works by DOI or title, locating full text, and why a repository's work count can look smaller than expected."
tags: ["reference"]
source_id: "41193798254743"
source_url: "https://help.openalex.org/hc/en-us/articles/41193798254743-How-are-repository-records-matched-to-published-articles"
source_updated: "2026-06-13"
---
Repositories — institutional repositories (IRs), subject repositories like arXiv and PubMed Central, and national aggregators — are one of OpenAlex's most important ways of finding Open Access full text. OpenAlex tracks roughly [7,000 repository sources](https://openalex.org/sources?filter=type%3Arepository), and about [140 million works (roughly 44%) have at least one repository location](https://openalex.org/works?filter=locations.source.type%3Arepository).

Repository content enters OpenAlex through two channels:

1. **As locations on existing works.** OpenAlex harvests repository records and matches them to works it already knows about (from Crossref, DataCite, PubMed, and other registration sources). A matched record becomes a [location](/docs/versions/) on that work — often the free-to-read copy that makes the work [green OA](/docs/open-access/).
2. **As works in their own right.** Since the November 2025 Walden expansion, repository records that don't match any existing work can be minted as new works in the [expansion (XPAC) corpus](/api/key-concepts/#xpac-expansion-pack). These are excluded from API results by default; add `include_xpac=true` to see them.

This page covers the harvesting pipeline: how records are matched, how full-text documents are located, and — the question repository managers ask most — why a repository's work count in OpenAlex can look much smaller than the repository itself.

## Harvesting repository records

OpenAlex gathers repository metadata using [OAI-PMH](https://www.openarchives.org/pmh/), the standard harvesting protocol repositories already expose. (This is the harvesting pipeline OpenAlex inherited from Unpaywall; the [Unpaywall API](https://unpaywall.org/products/api) remains a legacy-format view of the same data.)

To check whether your repository is on the harvest list — or to add it — go to [unpaywall.org/sources](https://unpaywall.org/sources).

## Matching records to published works

OpenAlex matches each harvested record to a published work in one of two ways: **by DOI**, or **by title and author**.

### Matching by DOI

DOI matching is greatly preferred, because it's an exact one-to-one match.

- Put the article's DOI in a [`<dc:identifier>`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#terms-identifier) element in the OAI-PMH record, formatted like `<dc:identifier>doi:YOUR_DOI</dc:identifier>`.
- There should be only one identifier element containing a DOI.
- If an identifier element can't be used, put the DOI in a `<dc:relation>` element instead, formatted the same way. If more than one relation element contains a DOI, OpenAlex assumes they belong to the article's references rather than the article itself.

### Matching by title and author

Title-and-author matching is the fallback when no DOI is available.

- The article's title should be present in a [`<dc:title>`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#terms-title) element.
- The name of at least the article's first author should be present in a [`<dc:creator>`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#terms-creator) element.

## Locating the full-text document

A matched record only helps readers if OpenAlex can find the document itself. In each OAI-PMH record, OpenAlex looks for a URL that leads to either:

- the article in **PDF** format, or
- an **HTML page** containing (or linking to) the article.

Without a document location, OpenAlex can't tell the work is open and can't send readers to it.

- Put either or both URLs in `<dc:identifier>` elements in the OAI-PMH record.
- The PDF or webpage must be retrievable without logging in to the repository site.

If the URL leads directly to a PDF, that's used as an open location. If it leads to an HTML page, OpenAlex retrieves the page and looks for a PDF link or license information:

- PDF links should be in `citation_pdf_url` meta tags, for example `<meta name="citation_pdf_url" content="YOUR_URL"/>`.
- The page should link to the article's license terms or note that the work is in the public domain — ideally a [Creative Commons](https://creativecommons.org/licenses/) license URL like `https://creativecommons.org/licenses/by/4.0/`. If your repository uses a different open license, [let us know](https://openalex.org/contact).

Repositories can make both matching and full-text detection more reliable by following the metadata recommendations for [license reporting](/docs/recommendation-for-irs-license-reporting/) and [version reporting](/docs/recommendation-for-irs-version-reporting/).

## Why a repository seems to be missing most of its works

If you look at your repository as a [source](/docs/sources/) in OpenAlex, its work count is often much smaller than the number of records in the repository itself. That's usually not a harvesting failure — it follows from how the two channels above work:

- **By default you're seeing only the core corpus.** In the default (core) view, a repository record appears only when it matched an existing work — the repository is credited as the source of one *version* of that work, not as a standalone record. Records that didn't match anything (theses, reports, datasets, local collections) aren't in the core count.
- **Unmatched records live in the expansion corpus.** Since November 2025, unmatched repository records can be minted as expansion (XPAC) works. Add [`include_xpac=true`](/api/key-concepts/#xpac-expansion-pack) to your API query to include them — for many repositories this changes the count dramatically. Data quality in the expansion corpus is lower on average and improving; see [`is_xpac`](/docs/work-fields/#is_xpac).
- **Matching depends on metadata.** Records without a cleanly reported DOI (or a matchable title + first author) can fail to match — see the guidelines above.
- **A historical wrinkle:** some pre-2022 records inherited from Microsoft Academic Graph list an institutional repository as their sole source. MAG minted those unsystematically, so that legacy coverage is not comprehensive either.

To get your repository harvested in the first place, add it at [unpaywall.org/sources](https://unpaywall.org/sources). To register interest in direct indexing of your repository's full contents, use the [repository registration form](https://forms.gle/LMmjdKw9HZJooxVT8).

## Related pages

- [Open Access](/docs/open-access/) — how repository copies make works green OA, and how the best OA location is chosen
- [Versions](/docs/versions/) — publishedVersion, acceptedVersion, and submittedVersion
- [Sources](/docs/sources/) — what source records are and the source-type taxonomy
- [License reporting for IRs](/docs/recommendation-for-irs-license-reporting/) and [Version reporting for IRs](/docs/recommendation-for-irs-version-reporting/) — metadata recommendations for repository managers
