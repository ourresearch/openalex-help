---
title: "Overview"
description: "The people, papers, places, and concepts OpenAlex catalogs — how their IDs work, how much to trust them, and how the objects are shaped."
tags: ["reference"]
---
OpenAlex is a map of the global research system, and **entities** are the things on the map: [works](/data/works/), [authors](/data/authors/), [sources](/data/sources/), [institutions](/data/institutions/), [publishers](/data/publishers/), [funders](/data/funders/), [topics](/data/topics/), and more. Every entity connects to the works it produced, published, funded, or is about, and every one has a page here explaining where its records come from, what judgment calls we make in building it, and what each of its fields means.

This is one half of the reference work: **Data** answers "what is this thing?", [Docs](/docs/) answers "how does querying / open access / getting the data work?", and the [API](/api/) covers the wire mechanics. They're split across tabs only to keep each table of contents scannable.

## Entity types

Not all entities are the same *kind* of thing. There are four kinds, and the kind tells you how much OpenAlex judgment is baked into an ID.

[**Native**](/data/native/) entities are ones where we mint our own IDs (`W123`, `A456`, `S789`) encoding our own judgment calls about genuine real-world boundary disputes — are these two records the same work? Is "Springer Nature" the same publisher as "Springer Verlag"? Is this affiliation string the University of Washington or Washington University? These IDs represent OpenAlex's best answer to a fuzzy question, and they can be wrong, which is why they're [curatable](/data/curations/).

[**Vocabulary**](/data/vocabulary/) entities are a convenient, consistent vocabulary around things that already have very clear real-world existence with no fuzziness for us to adjudicate — [countries](/data/countries/), [languages](/data/languages/), [licenses](/data/licenses/), [work types](/data/work-types/). We don't decide what a country *is*; we just attach a consistent handle to one.

One consistent tell is cardinality: native entities are all huge (hundreds of thousands of sources, hundreds of millions of works and authors), while vocabularies are all small (247 countries, 25 work types, 17 SDGs).

[**Component**](/data/component/) entities — [authorships](/data/authorships/), [locations](/data/locations/), [raw affiliation strings](/data/raw-affiliation-strings/) — are structured parts of a work that don't get their own OpenAlex ID. You never fetch one directly; they live inside a work object.

[**User-created**](/data/user-created/) entities — [collections](/data/collections/) and [curations](/data/curations/) — are the ones *you* mint rather than OpenAlex: saved lists of entities you care about, and corrections you submit to native entities.

## The OpenAlex ID scheme

Every OpenAlex ID comes in up to three forms, from most to least verbose:

- **Fully-qualified** — `https://openalex.org/works/W2741809807`, `https://openalex.org/sdgs/2`. The canonical form: a real URL that resolves to the entity, and what you'll find in every entity's [`id`](/data/common-attributes/#id) attribute. Every entity has one.
- **Namespaced** — the same thing minus the domain: `works/W2741809807`, `sdgs/2`. The entity type, then the ID within it. This form is valid for every entity, but for native entities it's needlessly verbose (the `W` already says "work"), so in practice you'll only see it on non-native ones.
- **Short** — just the ID: `W2741809807`. Only native entities have a short form, because their IDs carry the entity type as a leading letter — `W` for works, `A` for authors, `S` for sources, `I` for institutions, `P` for publishers, `F` for funders, `G` for awards (grants), `T` for topics — so the ID is unambiguous on its own. Non-native IDs have no short form: a bare `2` or `US` could mean anything without its namespace.

So in practice, native entities go by their short form (`W2741809807`) and everything else goes namespaced (`sdgs/2`, `countries/US`). Both the API and the website accept every form an entity has: `https://api.openalex.org/works/W2741809807`, `https://api.openalex.org/W2741809807`, and `https://openalex.org/W2741809807` all resolve to the same work.

Every entity also carries an [`ids`](/data/common-attributes/#ids) object mapping it to the outside world's identifiers where they exist — DOIs, ORCIDs, RORs, ISSNs, Wikidata QIDs — so you can move between OpenAlex and the rest of the scholarly-metadata ecosystem.

## Merged entities

OpenAlex sometimes discovers that two IDs describe the same real-world thing — two author records that are actually one person, two work records for one paper. When that happens the entities are **merged**: one ID becomes canonical and the other becomes a *merged-away* ID that permanently redirects to it. Requesting a merged-away ID returns the canonical entity, so old IDs never break. Merges are a normal, ongoing part of keeping the map accurate.

## Dehydrated vs. full objects

An entity appears in two shapes depending on where you meet it:

- The **full object** is what you get when you fetch the entity directly (e.g. `GET /works/W2741809807`) — every field documented on its page.
- A **dehydrated object** is a compact stub — usually just `id` and `display_name`, sometimes a few more fields — used when the entity is *referenced from inside another entity*. A work's `authorships` list embeds dehydrated authors and institutions; fetch the author directly to get the full object.

Dehydrated objects keep responses small and avoid unbounded nesting. When a page's attribute dictionary says a field holds "a dehydrated [Author]", that's what it means.

## Common attributes

A handful of attributes appear on nearly every entity — `id`, `ids`, `display_name`, `counts_by_year`, `summary_stats`, `works_count`, `cited_by_count`, and the `created_date` / `updated_date` timestamps. They're documented once, on [Common attributes](/data/common-attributes/); individual entity pages link there rather than repeating them.
