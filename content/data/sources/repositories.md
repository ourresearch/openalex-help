---
title: "Repositories"
updated: 2026-09-25
description: "How repository content gets into OpenAlex — OAI-PMH harvesting, matching records to works by DOI or title, locating full text, and why a repository's work count can look smaller than expected."
tags: ["reference"]
source_id: "41193798254743"
source_url: "https://help.openalex.org/hc/en-us/articles/41193798254743-How-are-repository-records-matched-to-published-articles"
source_updated: "2026-06-13"
---
Repositories — institutional repositories (IRs), subject repositories like arXiv and PubMed Central, and national aggregators — are one of OpenAlex's most important ways of finding Open Access full text. OpenAlex tracks roughly [7,000 repository sources](https://openalex.org/sources?filter=type%3Arepository), and about [140 million works (roughly 44%) have at least one repository location](https://openalex.org/works?filter=locations.source.type%3Arepository).

Two words carry this page. Your **endpoint** is the OAI-PMH URL you run — you own it, and it is what we harvest. Your **source** is the OpenAlex record we mint for your repository (`openalex.org/sources/S…`) — we own it, and it is where your harvest status and work counts live. When something goes wrong, the endpoint is usually where the fix is and the source is where you see the result.

Repository content enters OpenAlex through two channels:

1. **As locations on existing works.** OpenAlex harvests repository records and matches them to works it already knows about (from Crossref, DataCite, PubMed, and other registration sources). A matched record becomes a [location](/data/locations/) on that work — often the free-to-read copy that makes the work [green OA](/data/works/open-access/).
2. **As works in their own right.** A repository record that doesn't match any existing work is minted as a new work, with the repository as its only source. Records swept in at the November 2025 Walden cutover landed in the [expansion corpus](/data/works/corpus/), which is excluded from API results by default; everything minted since goes into the core.

This page covers the harvesting pipeline: how harvesting runs, how records are matched, how full-text documents are located, and — the question repository managers ask most — why a repository's work count in OpenAlex can look much smaller than the repository itself. If you want recipes rather than the mechanism (registering, reading your Harvest tab, reporting a problem), start at the [Repositories how-to](/how-to/repositories/).

## Records are not works

A repository *record* and an OpenAlex *work* are different things, and most counting questions come down to that difference. Your repository holds one record per deposit. OpenAlex holds one work per *paper*, and groups every copy it knows about — your deposit, the publisher's version of record, the arXiv preprint, another repository's copy — under that single work as [locations](/data/locations/). So a thousand of your records that all match published papers become a thousand locations on a thousand existing works, not a thousand new works. Your source's `works_count` counts works that have you as a location, and it will never be a one-to-one mirror of your record count.

To see every location OpenAlex holds from your repository, filter works by your source ID: [`api.openalex.org/works?filter=locations.source.id:S…`](https://api.openalex.org/works?filter=locations.source.id:S4306402521) (or the same filter on [openalex.org](https://openalex.org/works?filter=locations.source.id:S4306402521)). Each work's `locations` list names your copy, its landing page and PDF URL, and the version and license we detected for it.

## Harvesting repository records

OpenAlex gathers repository metadata using [OAI-PMH](https://www.openarchives.org/pmh/), the standard harvesting protocol repositories already expose. (This is the harvesting pipeline OpenAlex inherited from Unpaywall; the [Unpaywall API](https://unpaywall.org/products/api) remains a legacy-format view of the same data.)

To see whether we harvest your repository, check our [list of sources](https://openalex.org/sources?filter=type:repository) and open the **Harvest** tab on your source. To add your repository, [email us your endpoint URL](/how-to/repositories/#how-do-i-get-my-repository-harvested-by-openalex).

### How harvesting runs

- **Daily, every endpoint.** One run each day walks every registered endpoint (roughly 5,000 of them). There is no tiering or priority: a small repository and a national aggregator are checked on the same schedule, and a failing endpoint is retried every day until it works. Nothing is ever switched off automatically.
- **Incremental, resuming where it left off.** Each run asks for records changed since that endpoint's last successful harvest, overlapping by one day so nothing at the boundary is lost. Because we ask by datestamp, a deposit whose datestamp is in the past is not "new" to us.
- **First harvest is the whole back catalog.** A newly registered endpoint is harvested from its `earliestDatestamp` (as advertised in its `Identify` response) forward, in one pass. A large or slow endpoint can take days. We also read the format of that datestamp to decide whether to send dates with or without a time component.
- **What we send.** `ListRecords` with `metadataPrefix=oai_dc`, plus `set=` when the endpoint is registered with one. Each request times out after 15 seconds and is retried a few times, honoring `Retry-After` on 429 and 503. We hold at most three connections to any host at once.
- **Where it comes from.** A single static IP, `18.213.181.255`, with User-Agent `OpenAlexHarvester/1.0 (+https://help.openalex.org/how-to/repositories/; mailto:support@openalex.org)`. This covers OAI-PMH harvesting only; full-text fetching uses other addresses. [Allowlisting details](/how-to/repositories/#how-do-i-allowlist-openalexs-harvester).
- **Where you see it.** The Harvest tab on your source shows the endpoint on file, the last attempt's status and error text, a count of records we hold from you, and a monthly history. The [how-to](/how-to/repositories/#how-do-i-check-openalexs-harvest-of-my-repository) walks through it, including [what each status means](/how-to/repositories/#what-does-my-endpoints-harvest-status-mean).

Harvested records are parsed downstream: matched to works, and mined for the license, version, language, date, and document locations described below.

## Matching records to published works

OpenAlex matches each harvested record to a published work in one of two ways: **by DOI**, or **by title and author**.

### Matching by DOI

DOI matching is greatly preferred, because it's an exact one-to-one match.

- Put the article's DOI in a [`<dc:identifier>`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#terms-identifier) element in the OAI-PMH record, formatted like `<dc:identifier>doi:YOUR_DOI</dc:identifier>`.
- There should be only one identifier element containing a DOI.
- If an identifier element can't be used, put the DOI in a `<dc:relation>` element instead, formatted the same way. If more than one relation element contains a DOI, OpenAlex assumes they belong to the article's references rather than the article itself.
- **If you mint your own DOIs for deposits of already-published papers, put the publisher's DOI in the record too.** A record whose only DOI is a repository-minted one looks to us like a different paper, so it is minted as a separate work instead of becoming a location on the published one. The published DOI is what lets us group them.

### Matching by title and author

Title-and-author matching is the fallback when no DOI is available.

- The article's title should be present in a [`<dc:title>`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#terms-title) element.
- The name of at least the article's first author should be present in a [`<dc:creator>`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#terms-creator) element.

## Locating the full-text document

A matched record only helps readers if OpenAlex can find the document itself. In each OAI-PMH record, OpenAlex looks for a URL that leads to either:

- the article in **PDF** format, or
- an **HTML page** containing (or linking to) the article.

Give us a usable document URL so we can link readers to your copy; recognized rights metadata can establish OA before we fetch it.

- Put either or both URLs in `<dc:identifier>` elements in the OAI-PMH record.
- The PDF or webpage must be retrievable without logging in to the repository site.

A successfully fetched, valid article PDF can establish OA. If the URL leads to an HTML page, OpenAlex looks for PDF links or license evidence:

- PDF links should be in `citation_pdf_url` meta tags, for example `<meta name="citation_pdf_url" content="YOUR_URL"/>`.
- The page should link to the article's license terms or note that the work is in the public domain — ideally a [Creative Commons](https://creativecommons.org/licenses/) license URL like `https://creativecommons.org/licenses/by/4.0/`. If your repository uses a different open license, [let us know](https://openalex.org/contact).

Repositories can make both matching and full-text detection more reliable by following the [recommendations for repositories](#recommendations-for-repositories) below.

## Why a repository seems to be missing most of its works

If you look at your repository as a [source](/data/sources/) in OpenAlex, its work count is often much smaller than the number of records in the repository itself. That's usually not a harvesting failure — it follows from how the two channels above work:

- **By default you're seeing only the core corpus.** In the default (core) view, a repository record appears only when it matched an existing work — the repository is credited as the source of one *version* of that work, not as a standalone record. Records that didn't match anything (theses, reports, datasets, local collections) aren't in the core count.
- **Older unmatched records live in the expansion corpus.** Repository records that were unmatched at the November 2025 Walden cutover were minted as expansion (XPAC) works. Add [`corpus=all`](/data/works/corpus/) to your API query to include them — for many repositories this changes the count dramatically. Data quality in the expansion corpus is lower on average and improving; see [`is_xpac`](/data/works/attributes/#is_xpac). Records harvested since then mint into the core.
- **Matching depends on metadata.** Records without a cleanly reported DOI (or a matchable title + first author) can fail to match — see the guidelines above.
- **A historical wrinkle:** some pre-2022 records inherited from Microsoft Academic Graph list an institutional repository as their sole source. MAG minted those unsystematically, so that legacy coverage is not comprehensive either.

The deeper reason is that [records are not works](#records-are-not-works): a matched record becomes a location on an existing work, not a work of its own. To check whether we are harvesting you at all, and what the last harvest did, read your source's Harvest tab — the [Repositories how-to](/how-to/repositories/#how-do-i-check-openalexs-harvest-of-my-repository) walks through it.

## Recommendations for repositories

If you run a repository, two kinds of metadata make your records much more useful in OpenAlex: license information and version information.

### License reporting

OpenAlex reports the [license](/data/works/open-access/#licenses) that articles in your repository are distributed under. If you know the license, put it in a `dc:rights` element, as the license URL:

```xml
<dc:rights>https://creativecommons.org/licenses/by/4.0</dc:rights>
```

or as its name:

```xml
<dc:rights>CC BY-NC 4.0</dc:rights>
```

For ordinary `oai_dc` records, we read only `dc:rights` for license metadata. If several values are present, we select the first containing the exact lowercase text `creativecommons.org`; otherwise we select the first value. Creative Commons flavors, public-domain statements, and `info:eu-repo/semantics/openAccess` (which we record as open but not as a specific license) are all recognized.

OpenAlex also looks for license evidence in fetched content, whether or not your record supplies `dc:rights`. This is less accurate: it relies on full license URLs or text patterns seen before, like "distributed under the terms ..." or "This is an open access article published under ...", which may not include the pattern used by your repository software. We recommend including the license in the OAI-PMH record as shown above.

### Version reporting

OpenAlex reports the [version](/data/locations/) of the full-text papers it finds. It determines the version automatically, but in some cases it can improve accuracy for repositories to report version information when they know it.

If your repository knows the version of the PDF it is hosting, we recommend you put version information in the metadata as follows (based on the [DRIVER Guidelines v2.0 VERSION standard](https://wiki.surfnet.nl/display/DRIVERguidelines/DRIVER-VERSION+Mappings)). The full `info:eu-repo/semantics/…` form of these tokens in `dc:type` is read the same way:

- `<dc:type>publishedVersion</dc:type>` when you have verified that the PDF you are hosting is the version of record, with all publisher copyediting and formatting.
- `<dc:type>acceptedVersion</dc:type>` when you have verified that the PDF you are hosting meets [the definition of acceptedVersion](/data/locations/#one-location-per-version).
- `<dc:type>submittedVersion</dc:type>` when you know the PDF you are hosting does **NOT** meet the definitions for publishedVersion or acceptedVersion (for example if it was uploaded before the paper was accepted for publication).

If you have not verified the version of the document you are hosting, don't specify version metadata — OpenAlex will determine it automatically.

This matters beyond OpenAlex. The version we record travels downstream to the services that read our data, and a paper tagged `submittedVersion` when you actually hold the accepted manuscript can count as non-compliant for funder and REF-style reporting even though the right copy is sitting in your repository. The most common report we get from repository managers is exactly this: "we hold the accepted or published version, OpenAlex says submitted". The fix is on your side of the endpoint — state the version in the record when you know it — and if the record is right and we still show the wrong version, [tell us with a few example records](/how-to/repositories/#how-do-i-report-a-repository-problem) and we'll look at the parser.

In addition, if your repository has a policy of never hosting any submitted versions of papers, but only author accepted manuscripts or published versions, [let us know](https://openalex.org/contact). We'll note this policy and tag your papers accordingly.

## Where your data goes next

OpenAlex is read by other services, so a fix in your repository shows up in OpenAlex first and elsewhere later. Discovery layers and research-information systems (Primo, Scopus, Web of Science, Dimensions, Unpaywall consumers, institutional dashboards) pull OpenAlex data on their own schedules, from daily to monthly. If a vendor shows your paper as closed after OpenAlex shows it open, the vendor's next refresh is usually the missing step; if OpenAlex itself is wrong, [report it](/how-to/fixing-data-errors/#how-do-i-fix-a-works-open-access-status) and the downstream services follow.

## Related pages

- [Open Access](/data/works/open-access/) — how repository copies make works green OA, and how the best OA location is chosen
- [Versions](/data/locations/) — publishedVersion, acceptedVersion, and submittedVersion
- [Sources](/data/sources/) — what source records are and the source-type taxonomy
- [Repositories how-to](/how-to/repositories/) — registering, reading your Harvest tab, allowlisting our harvester, and reporting a problem
