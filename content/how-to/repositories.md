---
title: "Repositories"
description: "How-tos for repository managers: getting harvested, troubleshooting coverage, and making your records match better."
tags: ["data"]
synonyms: ["institutional repository", "OAI-PMH", "expansion corpus", "coverage"]
card: "We’re probably harvesting you already — make your records match completely and cleanly."
---
If you run a repository, OpenAlex is probably already harvesting it — and there's a lot you can do to make your records show up more completely and accurately. The full story of how harvesting and matching work lives in the [Repositories reference](/data/sources/repositories/); this page is the recipes.

## How do I get my repository indexed?

Check whether we already harvest you, and if not, send a support request — the steps are on [Getting indexed](/how-to/getting-indexed/#how-do-i-get-my-repository-indexed-in-openalex).

## Why are only some of my repository's records showing up?

By default, OpenAlex search and filter results show the **core corpus**, where your repository appears as the source of a *version* of an already-known work — a record shows up only when it matched a work registered in one of the big indexes. Records that didn't match anything (theses, reports, datasets, local collections) aren't in that count, so it will always be smaller than your repository's actual volume.

That's usually the whole explanation, but matching also depends on metadata: records without a cleanly reported DOI, or a matchable title and first author, can fail to match. The details — including a historical wrinkle around legacy Microsoft Academic Graph records — are in the reference under [Why a repository seems to be missing most of its works](/data/sources/repositories/#why-a-repository-seems-to-be-missing-most-of-its-works).

## How do I see my repository's unmatched records?

Unmatched repository records aren't gone — since November 2025 they can be minted as works in the **expansion corpus**, which is excluded from API results by default. To include them, add `corpus=all` to your query:

```
api.openalex.org/works?filter=locations.source.id:S4306402521&corpus=all
```

For many repositories this changes the count dramatically. (Data quality in the expansion corpus is lower on average and improving.)

## How can I make my records match better?

Three metadata habits make the biggest difference:

1. **Report DOIs cleanly.** A record with the published version's DOI matches reliably; without one, matching falls back to title + first author.
2. **Put the license in the record.** A `dc:rights` element with a license URL beats hoping we detect the license from the full text. See [License reporting](/data/sources/repositories/#license-reporting) for the exact format.
3. **Report the version when you've verified it.** `publishedVersion`, `acceptedVersion`, or `submittedVersion` in a `dc:type` element — see [Version reporting](/data/sources/repositories/#version-reporting). If you haven't verified the version, leave it out and we'll determine it automatically.
