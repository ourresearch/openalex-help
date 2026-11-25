---
title: "Metadata for publishing platforms"
updated: 2026-11-25
description: "For journal and book platforms: which metadata OpenAlex reads from Crossref, DataCite, OAI-PMH and your article pages, which one wins when they disagree, and how to check and correct what we show."
tags: ["general"]
synonyms: ["metadata guidelines", "metadata best practices", "dissemination platform", "publishing platform", "journal platform", "OJS", "Crossref deposit", "citation meta tags", "Highwire tags", "citation_pdf_url", "citation_author_institution", "license metadata", "embargo", "green or gold", "version of record", "publisher or repository", "journal OAI-PMH feed"]
card: "We harvest oai_dc, ignore deposited ROR ids, and can count your feed as the publisher's copy."
---
This page is for teams that run journals or books on a publishing platform (OJS, Lodel, Janeway, a national portal, your own system) and want OpenAlex to get them right. It answers, channel by channel, what we read, what we ignore, and what wins when two channels disagree. It describes how OpenAlex works today, not a deposit standard: when our pipeline changes, we change this page and its date.

If you run a repository rather than a publishing platform, [Repositories](/how-to/repositories/) is the page for you; the OAI-PMH details there apply to platforms too.

## Which channels does OpenAlex read?

For one article, OpenAlex can hear from up to four places, and it keeps each as its own [location](/data/locations/) (copy) on the work:

| Channel | What it gives us | Copy it becomes |
|---|---|---|
| **Crossref** (or DataCite) record for the DOI | The work's bibliographic metadata: title, authors and affiliation text, date, journal, references, funders, license, relations | The publisher copy, on your journal's [source](/data/sources/) |
| **Your article page** (where the DOI resolves) | License, the PDF link, author affiliations when the DOI record has none, abstract | Same publisher copy: it fills and corrects it |
| **The PDF** we fetch from that page | Proof that the full text is free to read, license, affiliations when nothing else has them | Same publisher copy |
| **Your OAI-PMH feed** | A second copy of the article, matched to the work by DOI or by title and author | A repository copy by default, or a publisher copy if we've bound the feed to your journal ([below](#how-do-we-tell-openalex-that-our-feed-is-the-publisher)) |

The DOI record is the backbone. If your articles have Crossref DOIs, that is where most of your metadata comes from, and fixing a Crossref deposit is the most effective fix there is: when your record changes, OpenAlex follows.

## Which OAI-PMH formats do you harvest?

`oai_dc`. We send `ListRecords` with `metadataPrefix=oai_dc` (plus `set=` when your feed is registered with one). A few large repositories are read in another format (OpenAIRE's `oai_openaire`, HAL's TEI), mapped onto the same fields; offering JATS, TEI, DataCite or MARC on your endpoint doesn't change what we read, so there is no richer format to switch to. From an `oai_dc` record we use:

| Element | What we do with it |
|---|---|
| `dc:identifier` | The article's DOI (the first one we find, matched as `10.xxxx/...` with or without `doi:` or `https://doi.org/`), plus arXiv, PubMed and handle ids. Every URL here is a candidate for your copy: one containing "pdf" is taken as a PDF link, the others as landing pages. A record whose only URLs are `doi.org` links has no copy of its own and is dropped. |
| `dc:relation` | Not read for the DOI. A URL here counts as your copy only when `dc:identifier` gives none and the URL carries your OAI identifier or host. |
| `dc:rights` | The license and open status of your copy: the first value containing `creativecommons.org`, else the first value. When that names no license we recognize (a copyright line, say), we also look in `dcterms:license` and `dcterms:accessRights`. `info:eu-repo/semantics/openAccess` marks the copy open with no specific license; `closedAccess`, `restrictedAccess` and `embargoedAccess` give it no license. |
| `dc:type` | The version of your copy (`publishedVersion`, `acceptedVersion`, `submittedVersion`, in bare, `info:eu-repo/semantics/` or COAR form), and evidence for the work type. |
| `dc:title`, `dc:creator`, `dc:date`, `dc:language`, `dc:description` | Title, author names, date (the earliest one), language and abstract, used to match the record and for works no DOI record describes. |
| `dc:source`, `dc:publisher` | Kept on your copy's record (`source_name` and `publisher` on [`/locations`](/data/locations/#extra-attributes-on-locations-rows)). They don't decide which source the copy belongs to: the feed does ([below](#how-do-we-tell-openalex-that-our-feed-is-the-publisher)). |

We don't read affiliations, ORCID iDs, funders or references from OAI-PMH records; `dc:contributor`, `dc:subject` and `dc:format` aren't used either.

The details, with examples, are on [Repositories: how do I make my records count as open access?](/how-to/repositories/#how-do-i-make-my-records-count-as-open-access) and [Version reporting](/data/sources/repositories/#version-reporting).

## Which Crossref fields do you use?

| Crossref field | What we do with it |
|---|---|
| `license` | The license of the publisher copy. Entries with `content-version` `tdm` are skipped; among the rest, the first Creative Commons URL wins, else the first URL. `vor`, `am` and `unspecified` are treated alike. The `start` date and `delay-in-days` are not read (see [embargoes](#how-do-we-signal-embargoes-and-oa-dates)). |
| `author` (`given`, `family`, `name`, `ORCID`) | The byline, in the order of the array. Entries that are really organizations are dropped. |
| `author[].affiliation[]` | Each affiliation object becomes one affiliation string: its `name`, plus any `place` values not already in it. The text is what we match to institutions; an affiliation `id` (a ROR id) is not used ([why](#how-should-we-deposit-affiliations)). `department` isn't shown. |
| `funder` (`DOI`, `name`, `award`) | Funders and grants. Funders are matched by name, with the funder DOI as a backup. |
| `relation` | `is-preprint-of` / `has-preprint` link the preprint and the published article; `is-version-of`, `has-version` and `is-same-as` merge records into one work; `is-review-of` / `has-review` link reviews; `is-translation-of` / `has-translation` link translations. |
| `update-to`, `updated-by` | Retractions, corrections and other notices. |
| `abstract`, `reference` | The abstract and the reference list. |
| Dates: `issued`, `published`, `published-online`, `published-print`, `posted`, `approved` | The publication date is the earliest date you state. The DOI's registration date counts only when the record has no online or posted date. |
| `container-title`, `ISSN`, `ISBN`, `publisher`, `volume`, `issue`, `page`, `article-number`, `language` | Which journal or book the work belongs to, and its bibliographic details. |
| `author[].role` | [Contributor roles](/data/contributor-roles/) (CRediT). |
| `link` | Not used to find the PDF: we fetch the page your DOI resolves to and find the PDF there (below). |

`subject` isn't read, and the article `type` is only evidence: OpenAlex assigns [work types](/data/work-types/) itself. For DataCite records the equivalents are `rightsList` (`rightsUri` only), `creators[].affiliation[].name`, `fundingReferences`, `relatedIdentifiers` and `descriptions` of type `Abstract`.

## What do you read from our article pages?

We fetch the page your DOI resolves to and read it with our landing-page parser. For most platforms, including OJS, that means the standard `citation_*` meta tags (the ones Google Scholar asks for). What we use:

| On the page | What we do with it |
|---|---|
| `citation_pdf_url` | The first place we look for the PDF. We then fetch it: a file that comes back as a real PDF, without a login, becomes the copy's `pdf_url` and shows that the article is free to read. A link that leads to a login page, an HTML page or a paywall doesn't. |
| `citation_author` followed by `citation_author_institution` | Authors and their affiliations, used when the DOI record has no affiliation for that author. Each `citation_author_institution` tag belongs to the nearest `citation_author` **before** it, so write each author, then that author's institutions, then the next author. A page that lists all the authors first and then all the institutions gives every institution to the last author (and more than five on one author are dropped as noise). |
| A license: a Creative Commons URL (`https://creativecommons.org/licenses/by/4.0/`) anywhere in the page, including a link or anchor with `rel="license"` or a `DC.rights` meta tag, or the words "Creative Commons Attribution..." or a stand-alone "CC BY" | The license of the publisher copy. A Creative Commons badge image with no URL or text gives us nothing. A license line in the site footer counts only when nothing else on the page names a license, and only when it says the article (or the journal's articles) is licensed under it. |
| `citation_abstract` (or `dcterms.abstract`, `DC.description`) | The abstract, when the DOI record has none. |

We don't read `citation_author_orcid`, `citation_author_affiliation` or `citation_keywords`, and on most sites not JSON-LD either. Page titles and dates come from the DOI record, not the page.

## When channels disagree, which one wins?

Each copy keeps its own license, version and open status, so a work can show a CC BY publisher copy and a repository copy with no license side by side. Within one copy:

| Field | What wins |
|---|---|
| Bibliographic metadata (title, date, journal, authors and their order) | The DOI record (Crossref or DataCite). The article page supplies authors only when the DOI record has none. |
| Affiliations | Per author: the DOI record's affiliation text where it has any for that author. The article page or the PDF fills only authors the record leaves without one. Channels aren't mixed for one author. |
| License of the publisher copy | Your article page, then the PDF, then the Crossref record: the first that names a license. |
| Open status of the publisher copy | Open if anything shows it: the journal is fully open access in our records ([how we decide](/data/sources/#about)), a Creative Commons license on the page, a PDF we fetched without a login, or an open license in the Crossref record. |
| Version of the publisher copy | `publishedVersion`. |
| License of a feed copy | A specific license in the record's `dc:rights` first, then one found on the record's page or PDF. |
| Version of a feed copy | `publishedVersion` when the feed is bound to your journal. Otherwise the version the record states in `dc:type`; without one, our own reading of the record, page and PDF, taking the most cautious answer. |

The work's overall [open access status](/data/works/open-access/) comes from its best open copy, and the publisher copy from the DOI record is tried first. If it is open, the work is gold or diamond when the journal is fully open access in our records, hybrid when the copy has an open license, and bronze when it's free with no license. If it isn't, the next open copy decides: a copy from a journal feed bound to the journal gives the same colors, and a repository copy makes the work green.

## How should licenses be expressed?

Use the full license URL everywhere you can, in all three channels:

- **Crossref:** a `<license_ref>` (in `<ai:program name="AccessIndicators">`) with the license URL, for example `https://creativecommons.org/licenses/by/4.0/`, and `applies_to="vor"` (or `am`). Don't give the open license only as `applies_to="tdm"`: we skip those.
- **Article page:** a link to the license URL on the page itself, near the article (an anchor with `rel="license"` pointing at `https://creativecommons.org/licenses/by/4.0/` does it). Words like "CC BY 4.0" also work; a badge image alone doesn't.
- **OAI-PMH:** the URL (or a name like `CC BY 4.0`) in `dc:rights`, put before any copyright line. The full list of values we recognize is in [the license table](/how-to/repositories/#the-license).

Creative Commons licenses and public-domain statements are recognized. A license we don't recognize leaves the copy with no license; [tell us](https://openalex.org/contact) about it.

## How do we signal embargoes and OA dates?

We don't read embargo dates from any channel:

- **Crossref:** the `start_date` of a `<license_ref>` and `delay-in-days` aren't read, so an open license in the deposit makes the publisher copy open from the day we read it, even if its start date is in the future.
- **OAI-PMH:** `info:eu-repo/semantics/embargoedAccess` in `dc:rights` gives the copy no license, and we read no end date from `dc:date` or anywhere else.
- **Article page:** what counts is what the page shows when we read it: a license, and a PDF we can fetch without a login.

So don't put an open license in a record before the article is open. When an embargo ends, update the record: add the license to `dc:rights` (or to your Crossref deposit) and make the file reachable. An updated OAI-PMH record gets a new datestamp, which is how our daily harvest notices it; a record that doesn't change isn't read again.

There is no OA date to send us. OpenAlex doesn't record when a copy became open: the `oa_date` in the Unpaywall format is the work's publication date on every copy ([details](/data/works/open-access/#oa-dates)).

## How do we tell OpenAlex that our feed is the publisher?

By default, every OAI-PMH endpoint we harvest gets a source of type **repository**, and every record from it becomes a repository copy. On a platform that is the publisher, that is wrong: the copies are the version of record on the journal's own site, but they read as repository copies, often `submittedVersion`, and when they are the only free copy the work reads as **green** instead of gold or diamond.

The fix is on our side, and it is per journal: we bind the journal's feed to the journal's own source and mark it as a journal feed. From then on its records are publisher copies on the journal, with version `publishedVersion`, and the work's color follows the journal's open-access status. About 23,000 journal feeds are bound this way today, most of them OJS journals. You can see one at work on [Chemical Engineering Transactions](https://api.openalex.org/locations?filter=provenance:repo,source_id:S2764686966): its feed copies sit on the journal, as `publishedVersion`.

What we need for each journal:

- **One feed per journal.** Either a separate endpoint per journal, or one OAI-PMH **set** per journal on a shared endpoint (OJS's install-wide `/index/oai` serves every journal it hosts; we harvest it set by set). The binding is per endpoint and set, so a set that mixes journals, or mixes your own publications with deposited copies, can't be bound.
- **Its ISSNs**, so we pick the right journal source (or create one).
- Records that name the journal in `dc:source` (it's how we check that a set holds one journal) and carry the article's DOI in `dc:identifier` when it has one, so the feed copy and the Crossref copy land on the same work.

A field inside the records can't do this on its own: `dc:type` `publishedVersion` sets the version of a repository copy, but the copy is still a repository copy until the feed is bound. Send the list (endpoint URL, set, journal title, ISSNs) to [support@openalex.org](mailto:support@openalex.org?subject=Journal%20feeds%20for%20our%20platform) or [openalex.org/contact](https://openalex.org/contact).

If Crossref already carries (nearly) all of a journal's articles, we don't bind its feed as well: the Crossref record gives each article a publisher copy on the journal, and the feed's copies stay repository copies beside it. The work's color then depends on that publisher copy, which reads open when the journal is fully open access in our records (from [DOAJ](https://doaj.org/), or when you tell us and we check), or when we can read a license on your article page or fetch your PDF. So put a license and a `citation_pdf_url` on every article page, check that the PDF opens without a login from outside your network, and tell us about fully open journals DOAJ doesn't list.

## How should we express the version of a document?

- **Crossref copies** are `publishedVersion` (posted content, such as preprints, is `submittedVersion`). There's nothing to declare.
- **Article pages** reached from a DOI are read as `publishedVersion`.
- **Feed copies from a journal feed bound to the journal** are always `publishedVersion`.
- **Other feed copies:** state the version in `dc:type` when you know it: `publishedVersion`, `acceptedVersion` or `submittedVersion`, bare or as `info:eu-repo/semantics/publishedVersion`, or the COAR version-type URI. A stated version outranks our own reading. If a record states several, we take the lowest, and a record that also calls itself a preprint reads as `submittedVersion`. Without a stated version we guess from the text of the record, its page and its PDF, taking the most cautious answer: wording like "peer reviewed" reads as `acceptedVersion`, and the default is `submittedVersion`.

State `publishedVersion` only for the publisher's final, typeset version. [Version reporting](/data/sources/repositories/#version-reporting) has the definitions.

## How should we deposit affiliations?

- **Crossref is the channel that counts most.** We take affiliations from your Crossref record first, and from your page or PDF only for authors the record leaves without one.
- **One affiliation element per institution, under the author it belongs to.** An author with two institutions gets two affiliation elements, not one string joined with a semicolon. A single block of affiliations shared by all authors gives every author every institution.
- **Write the full text:** department if you like, then institution, city and country, as the article prints it. Institutions are found by matching this text against [ROR](https://ror.org/) ([how matching works](/data/raw-affiliation-strings/#how-matching-works)), so a full string matches better than an abbreviation.
- **A ROR id alone isn't enough.** We keep the affiliation text and match it ourselves; a ROR id in the deposit isn't used to assign the institution. When we tested them, deposited ROR ids that disagreed with the affiliation text were right less than half the time (they tend to be picked by name similarity), so the text decides. An affiliation with a ROR id and no name gives us nothing. Include both, by all means: other services use the id.
- **On article pages,** `citation_author_institution` after each `citation_author`, one tag per institution, as described [above](#what-do-you-read-from-our-article-pages).
- **In OAI-PMH,** affiliations aren't read from the record. For a feed copy, we take them from the record's page (the same `citation_author_institution` tags) or its PDF.

## How can we check what OpenAlex made of our records?

Look a work up by its DOI, in the browser (`openalex.org/works/doi:10.xxxx/yyyy`) or the API (`api.openalex.org/works/doi:10.xxxx/yyyy`), and read four things:

- `primary_location` and each entry in `locations`: which `source` holds each copy and its `source.type` (`journal` or `repository`), and the copy's `version`, `license`, `is_oa`, `landing_page_url` and `pdf_url`.
- `open_access.oa_status`: the color the work gets from its best copy.
- `authorships[].raw_affiliation_strings`: the affiliation text we kept for each author; `authorships[].institutions` is what it matched.
- `primary_location.source`: whether your journal's source has the right title, ISSNs, publisher, and `is_oa` / `is_in_doaj`.

For every copy we took from your feed, open your source's **Harvest** tab ([how to read it](/how-to/repositories/#how-do-i-check-openalexs-harvest-of-my-repository)) or list them in the API: `api.openalex.org/locations?filter=source_id:S<id>`, or `endpoint_id:<id>` for one feed. Each row shows the version and license we read from that record. A feed we've bound to a journal lists under the journal's source.

## How do we get a source or a copy corrected?

File a ticket at [openalex.org/contact](https://openalex.org/contact) with **several examples** (DOIs or OAI identifiers), what's wrong and what's right: one record can be a coincidence, five is a pattern we can fix at its cause. What we can change on our side:

- Bind a journal's feed (or one set of it) to the journal, so its copies count as the publisher's ([above](#how-do-we-tell-openalex-that-our-feed-is-the-publisher)).
- A source's record: its type (journal, repository, book series...), publisher, and whether a journal is fully open access and since when.
- A work's [type, title, language, retraction flag](/data/curations/#what-you-can-curate), and a copy's open-access status after we have checked the page ourselves ([how](/how-to/fixing-data-errors/#how-do-i-fix-a-works-open-access-status)).

What is fixed at your end: anything in your Crossref or DataCite record (dates, authors, affiliation text, licenses, relations). Redeposit it, and the next harvest picks up the new record. An institution's own name or place in its hierarchy is fixed at [ROR](https://ror.org/). Most corrections go live in one to two days ([details](/how-to/when-corrections-go-live/)).

## A checklist for platforms

1. Register a DOI for every article with Crossref (or DataCite), with each author's affiliations as separate, full-text affiliation elements and the license as a `<license_ref>` URL that isn't `tdm`-only.
2. On every article page: `citation_*` meta tags, each `citation_author` followed by its `citation_author_institution` tags, a `citation_pdf_url` that opens the PDF without a login, and a link to the license URL.
3. Expose OAI-PMH with `oai_dc`, one set per journal, the DOI in `dc:identifier`, the license in `dc:rights` and the journal in `dc:source`.
4. Send us each journal's endpoint, set and ISSNs so we can bind its feed to the journal, and tell us which journals are fully open access if DOAJ doesn't list them.
5. Check a few DOIs in the API as above; when something is wrong, send examples.
