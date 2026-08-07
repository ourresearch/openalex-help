---
title: "Open access"
description: "How OpenAlex determines whether a work is Open Access — the status taxonomy (diamond, gold, green, hybrid, bronze), OA locations, best-location selection, and licenses."
tags: ["reference"]
source_id: "24347035046295"
source_url: "https://help.openalex.org/hc/en-us/articles/24347035046295-Open-Access-OA"
source_updated: "2024-07-30"
---
There are [many ways to define Open Access](https://peerj.com/articles/4375/#literature-review). OpenAlex uses a broad one: a work is OA if there's a URL where you can read its full text without paying money or logging in. Of the roughly 322 million works in OpenAlex, about [121 million (37%) are Open Access](https://openalex.org/works?filter=open_access.is_oa%3Atrue) by this definition.

For each work, OpenAlex decides whether it meets the definition using several techniques — checking whether its journal is in the [Directory of Open Access Journals](https://doaj.org/) (DOAJ), looking for a free copy on the publisher's page, and searching repositories for deposited versions. When a work is OA, OpenAlex gives you a link to its full text.

On the [Work object](/data/works/), this information lives in the `open_access` object:

| Field | What it tells you |
|---|---|
| `is_oa` | Whether any free, legal full-text copy exists |
| `oa_status` | Which kind of OA (see the status taxonomy below) |
| `oa_url` | The best full-text link OpenAlex found |
| `any_repository_has_fulltext` | Whether at least one repository holds a full-text copy |

## OA statuses

Beyond the yes/no of `is_oa`, OpenAlex assigns every work an **OA status** — the "colors" widely used in OA research and policy:

| Status | Meaning | Works |
|---|---|---|
| [`diamond`](https://en.wikipedia.org/wiki/Diamond_open_access) | Published in a fully-OA journal that charges no article processing charges — free for both readers and authors | ~17M (5%) |
| `gold` | Published in a fully-OA journal | ~15M (5%) |
| `green` | Toll-access on the publisher landing page, but a free copy exists in an [OA repository](https://en.wikipedia.org/wiki/Open-access_repository) | ~66M (21%) |
| `hybrid` | Free under an open license in a toll-access journal | ~9M (3%) |
| `bronze` | Free to read on the publisher landing page, but without an identifiable open license | ~14M (4%) |
| `closed` | Everything else | ~202M (63%) |

Two things follow from these definitions that often surprise people:

- **Status depends on the journal, not just the article.** The same freely readable article is `gold` (or `diamond`) in a fully-OA journal but `hybrid` or `bronze` in a toll-access one. How OpenAlex determines whether a journal is fully OA — including journals that "flipped" to OA partway through their run — is covered in [Journal quality & OA status](/data/sources/#how-its-made).
- **The hybrid/bronze line is drawn by license.** A free-to-read article in a toll-access journal is `hybrid` if it carries an open license and `bronze` if it doesn't. What counts as an open license is defined below.

You can filter and group works by status — for example, [group all works by `oa_status`](https://api.openalex.org/works?group_by=open_access.oa_status) — so the taxonomy is countable, not just descriptive.

## OA locations

A work's OA evidence lives in its [locations](/data/sources/) — the individual places (journal pages, repositories) where copies of the work are hosted. Each location records whether that copy is OA (`is_oa`), plus its `landing_page_url`, `pdf_url`, `license`, [`version`](/data/locations/), and host `source`.

**What counts as an OA location?** OpenAlex is flexible: in general, if a page makes the full text of an article available for free — directly on the page, through a PDF link, or in an embedded reader — it counts. There are two deliberate exceptions, both about keeping links usable and machine-readable:

- **Sites requiring registration.** [ResearchGate](https://www.researchgate.net/), a well-known academic social network, requires login before reading. OpenAlex already excludes it to stay on the right side of publishing agreements, but the registration wall would be a deal-breaker on its own.
- **Sites gated by [CAPTCHAs](https://en.wikipedia.org/wiki/CAPTCHA).** These make it hard for automated systems to verify that full text is really there, and make the links less useful — you never know whether a request will return the article or a puzzle. [SSRN](https://www.ssrn.com/index.cfm/en/) hosts many articles OpenAlex would love to include, but it prompts for CAPTCHAs and accounts after a few downloads.

**Publisher-hosted vs. repository-hosted.** Locations broadly split into two kinds, visible via the location's `source.type`. A **publisher-hosted** location is provided by the work's original publisher through its canonical URL, as a published or accepted version. A **repository** location is a copy in an OA repository — most commonly an institutional repository run by a university library, or a subject repository like [PubMed Central](https://pmc.ncbi.nlm.nih.gov/) or [arXiv](https://arxiv.org/). One edge case: **preprint servers count as repositories**, even when the preprint is the only, final version of the document — a work whose DOI points to Research Square or bioRxiv still has a repository-hosted location, not a publisher-hosted one.

## The best OA location

When a work has more than one OA location, OpenAlex designates the most current, authoritative one as `best_oa_location`. Locations are ranked by a series of tiebreakers, in order:

1. **Host kind**: publisher-hosted beats repository-hosted.
2. **[Version](/data/locations/)**: `publishedVersion` beats `acceptedVersion`, which beats `submittedVersion`.
3. **Direct PDF link**: a location with a `pdf_url` beats one without.
4. **Match quality** (repository locations): a repository record matched to the work by DOI beats one matched by title.
5. **Repository rankings**: some major repositories, like PubMed Central and arXiv, rank above others.

The `oa_url` on the work's `open_access` object is the URL of this best location.

## Licenses

There are many definitions of what constitutes an OA license — [BOAI](https://www.budapestopenaccessinitiative.org/read), [SPARC](https://sparcopen.org/open-access/), and others (see [this literature review](https://peerj.com/articles/4375/#literature-review) for a fuller list). OpenAlex's job is not to decide which definition is "truly" open, but to collect the data users need to make their own decisions: each location carries the `license` OpenAlex found for that copy, or null if none was found.

For the purposes it does need a definition for — chiefly drawing the hybrid/bronze line — OpenAlex errs toward **inclusiveness**: the cutoff for "is this license open" is deliberately low, and even relatively restrictive licenses like [CC-BY-NC-ND](https://creativecommons.org/licenses/by-nc-nd/2.0/) count. Downstream users who need a stricter standard (for example, funders that mandate CC-BY) can filter on the license values themselves.

Licenses OpenAlex counts as open include:

- Any [Creative Commons](https://creativecommons.org/licenses/) license
- Public domain / [CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)
- Publisher-specific open licenses such as [ACS Editors' Choice](https://pubs.acs.org/page/policy/authorchoice_termsofuse.html) and the [APS accepted-manuscript license](http://link.aps.org/licenses/aps-default-accepted-manuscript-license#accepted)
- Many less-common licenses, as long as they grant users sufficient rights to freely use and redistribute content

Licenses OpenAlex recognizes but does **not** count as open include the [Elsevier user license](https://www.elsevier.com/about/policies/open-access-licenses/elsevier-user-license), which doesn't allow redistribution. Expect these lists to grow and change.

One pseudo-license to know about: **`implied-oa`** marks articles that the publisher labels as Open Access — typically under an APC-funded hybrid arrangement — but that carry no specific license statement OpenAlex can identify.

## OA dates

OpenAlex's underlying data also tracks *when* a copy of a work first became available at each location. This `oa_date` field is exposed through the [Unpaywall API format](/docs/unpaywall/) (a legacy-compatible view of the same OpenAlex data — see [its data-format reference](https://unpaywall.org/data-format#oa-location-object)) rather than on the OpenAlex work object itself. In brief:

- **Gold/diamond**: the article was free from day one, so `oa_date` is the publication date.
- **Hybrid**: the publication date, or the manuscript license's effective date if a manuscript version was opened separately.
- **Bronze**: always null — bronze availability can come and go, is often discovered late, and is rarely relevant to OA mandates.
- **Repository copies**: the date OpenAlex first observed full text there, derived from [OAI-PMH](https://www.openarchives.org/pmh/) record timestamps. Because raw timestamps can both pre- and post-date the actual posting, OpenAlex freezes the timestamp at first discovery; reliable dates exist only for copies first observed on or after 2020-08-07, and earlier copies get null.

## Article processing charges

The **article processing charge** (APC) is the fee some journals charge authors to make a work OA — relevant to `gold` and `hybrid` works. OpenAlex estimates APCs at both the work level (`apc_list`, `apc_paid`) and the source level. Where that data comes from, its limitations, and how to estimate an institution's APC spend are covered in [Journal quality & OA status](/data/sources/#how-its-made).

## Related pages

- [Journal quality & OA status](/data/sources/#how-its-made) — how fully-OA journals are identified, flipped journals, and APC data
- [Versions](/data/locations/) — submitted, accepted, and published versions and how they interact with OA
- [Sources](/data/sources/) — how works connect to journals and repositories through locations
- [Works API reference](/data/works/) — the `open_access` and location objects
- [Why is this publication labeled as 'closed' when it is clearly Open Access?](/help/why-is-this-publication-labeled-as-closed-when-it-is-clearly-open-acce/)
