---
title: "Finding OpenAlex IDs"
description: "Every entity in OpenAlex has an ID. Here's how to find the ID for a work, author, source, publisher, or anything else — on the website or via the API."
tags: ["how-do-i"]
synonyms: ["work ID", "author ID", "source ID", "publisher ID", "OpenAlex ID"]
card: "Click any entity and read its ID straight off the URL bar — one scheme covers everything."
---
Everything in OpenAlex — works, authors, sources, institutions, publishers, funders, and more — has its own OpenAlex ID: a letter for the entity type followed by a number, like `W2884670852` (a work) or `A5086928770` (an author). You'll need an ID whenever you want to link to an entity, look it up in the [API](/api/), or report an error. The full ID scheme is described in the [Data overview](/data/).

## How do I find an entity's ID?

The flow is the same for every entity type: go to [openalex.org](https://openalex.org), search for the entity by name (or browse the full list at [openalex.org/works](https://openalex.org/works), [/authors](https://openalex.org/authors), [/sources](https://openalex.org/sources), [/publishers](https://openalex.org/publishers), and so on), and click it. The URL updates to end with the entity's OpenAlex ID.

## How do I find a work's ID?

The fastest way is with the DOI: type `doi:` followed by the DOI into the search bar — for example, `doi:10.1098/rspb.2018.0553` — to jump straight to the work. No DOI? Search the title instead; if the title is common, filter on title specifically at [openalex.org/works](https://openalex.org/works) to see every match.

Once you have a work ID, you can view the work at `openalex.org/works/<ID>` (e.g. [openalex.org/works/W2884670852](https://openalex.org/works/W2884670852)), or get its full record from the API at `api.openalex.org/works/<ID>` — every field is documented in the [works attribute dictionary](/data/works/attributes/).

## How do I find my author ID?

Start typing your name in the search box at [openalex.org](https://openalex.org) — this works especially well for uncommon names. Or, from any of your works, click your hyperlinked author name to open your author profile. Either way, the profile URL ends with your author ID (e.g. [openalex.org/authors/A5086928770](https://openalex.org/authors/A5086928770)). For more ways to search — filtering by institution or country, for example — use [openalex.org/authors](https://openalex.org/authors).

## How do I find a source's ID?

Sources are the venues that host works: journals, conference proceedings, repositories, ebook platforms, and book series. Search by title at [openalex.org/sources](https://openalex.org/sources) — you can filter to a particular source type, or to sources that are fully open access or indexed in DOAJ. Click the source you're after and the URL ends with its ID (e.g. `S4121844`).

## How do I find a publisher's ID?

Search the publisher's name at [openalex.org](https://openalex.org) and click through to its page, or — from any journal's page — click the hyperlinked publisher name. The URL ends with the publisher ID (e.g. `P4310320595`).

One wrinkle: many organizations act as publishers, funders, *and* institutions, and each role has its own entity with its own ID. If the ID you find starts with `I` or `F`, you've landed on the institution or funder entity — use the entity-type switcher at the top of the page to flip to the publisher view, and the URL will update with the publisher ID.

## Can I look up an entity by an external ID?

Yes — the API resolves DOIs, ORCIDs, ISSNs, RORs, and other external IDs directly:

- `api.openalex.org/works/doi:10.1098/rspb.2018.0553`
- `api.openalex.org/authors/orcid:0000-0003-2780-0393`
- `api.openalex.org/sources/issn:2041-1723`
- `api.openalex.org/institutions/ror:02y3ad647`

The `id` field of the response is the OpenAlex ID. To convert many at once, use a filter with pipe-separated values, like `api.openalex.org/works?filter=doi:10.1098/rspb.2018.0553|10.7717/peerj.4375`. See [Get single entities](/api/get-single-entities/) for all the supported external IDs.
