---
title: "Overview"
description: "The people, papers, places, and concepts OpenAlex catalogs — how their IDs work, how much to trust them, and how the objects are shaped."
tags: ["reference"]
---
OpenAlex is a map of the global research system, and **entities** are the things on the map: [works](/entities/works/), [authors](/entities/authors/), [sources](/entities/sources/), [institutions](/entities/institutions/), [publishers](/entities/publishers/), [funders](/entities/funders/), [topics](/entities/topics/), and more. Every entity connects to the works it produced, published, funded, or is about, and every one has a page here explaining where its records come from, what judgment calls we make in building it, and what each of its fields means.

This is one half of the reference work: **Entities** answers "what is this thing?", [Docs](/docs/) answers "how does querying / open access / getting the data work?", and the [API](/api/) covers the wire mechanics. They're split across tabs only to keep each table of contents scannable.

## Native vs. vocabulary: how much to trust an ID

Not all entities are the same *kind* of thing, and the difference tells you how much judgment is baked into an ID.

**Native** entities are ones where we mint our own IDs (`W123`, `A456`, `S789`) encoding our own judgment calls about genuine real-world boundary disputes — are these two records the same work? Is "Springer Nature" the same publisher as "Springer Verlag"? Is this affiliation string the University of Washington or Washington University? These IDs represent OpenAlex's best answer to a fuzzy question, and they can be wrong, which is why they're [curatable](/entities/curations/).

**Vocabulary** entities are a convenient, consistent vocabulary around things that already have very clear real-world existence with no fuzziness for us to adjudicate — [countries](/entities/countries/), [languages](/entities/languages/), [licenses](/entities/licenses/), [work types](/entities/work-types/). We don't decide what a country *is*; we just attach a consistent handle to one.

In between sit [**component**](/entities/component/) entities — [authorships](/entities/authorships/), [locations](/entities/locations/), [raw affiliation strings](/entities/raw-affiliation-strings/) — which are parts of a work that don't get their own OpenAlex ID, and [**user-created**](/entities/user-created/) entities like [collections](/entities/collections/) and [curations](/entities/curations/), which users mint rather than OpenAlex.

## The OpenAlex ID scheme

Every native entity has a stable **OpenAlex ID**: a single uppercase letter naming the entity type, followed by a number — `W` for works, `A` for authors, `S` for sources, `I` for institutions, `P` for publishers, `F` for funders, `T` for topics. The canonical form is a URL, e.g. `https://openalex.org/W2741809807`, which resolves to the entity's API record. The short form (`W2741809807`) works everywhere the long form does.

Every entity also carries an [`ids`](/entities/common-fields/#ids) object mapping it to the outside world's identifiers where they exist — DOIs, ORCIDs, RORs, ISSNs, Wikidata QIDs — so you can move between OpenAlex and the rest of the scholarly-metadata ecosystem.

## Merged entities

OpenAlex sometimes discovers that two IDs describe the same real-world thing — two author records that are actually one person, two work records for one paper. When that happens the entities are **merged**: one ID becomes canonical and the other becomes a *merged-away* ID that permanently redirects to it. Requesting a merged-away ID returns the canonical entity, so old IDs never break. Merges are a normal, ongoing part of keeping the map accurate.

## Dehydrated vs. full objects

An entity appears in two shapes depending on where you meet it:

- The **full object** is what you get when you fetch the entity directly (e.g. `GET /works/W2741809807`) — every field documented on its page.
- A **dehydrated object** is a compact stub — usually just `id` and `display_name`, sometimes a few more fields — used when the entity is *referenced from inside another entity*. A work's `authorships` list embeds dehydrated authors and institutions; fetch the author directly to get the full object.

Dehydrated objects keep responses small and avoid unbounded nesting. When a page's field dictionary says a field holds "a dehydrated [Author]", that's what it means.

## Common fields

A handful of fields appear on nearly every entity — `id`, `ids`, `display_name`, `counts_by_year`, `summary_stats`, `works_count`, `cited_by_count`, and the `created_date` / `updated_date` timestamps. They're documented once, on [Common fields](/entities/common-fields/); individual entity pages link there rather than repeating them.
