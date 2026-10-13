---
title: "DOIs"
updated: 2026-10-13
description: "How DOIs appear on OpenAlex works: most have one, some carry several (a preprint and its article, a Zenodo concept and its versions); which one becomes the work's doi, and how to find a work by any of them."
tags: ["reference"]
synonyms: ["two DOIs", "multiple DOIs", "secondary DOI", "preprint DOI", "arXiv DOI", "concept DOI", "version DOI", "Zenodo DOI", "wrong DOI"]
---
Most works have a single DOI, but some have several. A paper posted to arXiv gets an arXiv DOI (`10.48550/arxiv.1102.1523`), then a new one when a journal publishes it (`10.1109/mcse.2011.37`). Both point to the same work, *The NumPy Array* ([W2146292423](https://api.openalex.org/works/W2146292423?select=id,doi,locations)). Other reasons include a working paper and its journal version, a Zenodo record's version DOIs, and a dataset registered in two places.

OpenAlex keeps every DOI by giving each [location](/data/locations/) (each copy of the work) its own [`doi`](/data/locations/#doi): the NumPy work's arXiv location carries the arXiv DOI and its journal location carries the journal DOI. The [`doi` filter](/data/works/attributes/#doi) matches all of a work's DOIs, so either one finds it. The work's own [`doi`](/data/works/attributes/#doi) holds the best one, picked as described [below](#which-doi-is-the-works-doi).

## Examples

| Situation | Example | DOIs |
|---|---|---|
| Preprint and journal article | *The NumPy Array* ([W2146292423](https://api.openalex.org/works/W2146292423)) | `10.48550/arxiv.1102.1523` (arXiv), `10.1109/mcse.2011.37` (journal) |
| Working paper and journal article | *The Worldwide Governance Indicators* ([W2127999605](https://api.openalex.org/works/W2127999605)) | `10.1596/1813-9450-5430` (World Bank), `10.1017/s1876404511200046` (*Hague Journal on the Rule of Law*) |
| Zenodo concept and version | *Suggestions for Calculating Nest Success* ([W55139997](https://api.openalex.org/works/W55139997)) | `10.5281/zenodo.16204874` (concept), `10.5281/zenodo.16204875` (version) |
| One dataset, two registries | *TIMIT Acoustic-Phonetic Continuous Speech Corpus* ([W3127686677](https://api.openalex.org/works/W3127686677)) | `10.35111/17gk-bn40` (LDC), `10.57702/3vf2hii4` (TIB) |

## Which DOI is the work's `doi`

The work's `doi` is picked by source:

1. A Crossref DOI, with a published version's DOI ahead of a preprint's.
2. A DataCite DOI, with a concept DOI ahead of its version DOIs. (arXiv and Zenodo DOIs are DataCite DOIs.)
3. A DOI printed on a PubMed, MAG, or repository record.

When two DOIs tie, for instance two Crossref published versions, the alphabetically first one wins. The other DOIs are not lost: each stays on its location.

## Finding a work by any of its DOIs

- The works [`doi` filter](/data/works/attributes/#doi) matches the work's own `doi` **or** any location's `doi`, so a preprint DOI finds the published work: [`/works?filter=doi:10.48550/arxiv.1102.1523`](https://api.openalex.org/works?filter=doi:10.48550/arxiv.1102.1523) returns W2146292423.
- A single lookup works the same way: [`/works/doi:10.48550/arxiv.1102.1523`](https://api.openalex.org/works/doi:10.48550/arxiv.1102.1523).
- To list every DOI of a work, read its locations: [`/works/W2146292423?select=id,doi,locations`](https://api.openalex.org/works/W2146292423?select=id,doi,locations).
- `has_doi` checks only the work's own `doi`.

Matching a list of DOIs (up to 100 OR-ed with `|`) can return fewer works than you sent DOIs. That happens when two of your DOIs belong to the same work: a preprint DOI and its article DOI both find one work.

## When a DOI belongs somewhere else

Occasionally a work holds a DOI for something that isn't a version of it, such as a book review merged into the book it reviews. That is a matching error. Report the work and the DOI that doesn't belong; see [Fixing data errors](/how-to/fixing-data-errors/).
