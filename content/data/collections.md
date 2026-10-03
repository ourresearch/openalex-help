---
title: "Collections"
updated: 2026-10-03
description: "What a collection is, what it can hold, who can see it (private, or shared by link), and what every attribute on a collection object means."
tags: ["reference"]
entity:
  example: "collections/col_8yWKmRNyEr"
  linksTo:
    - "works"
    - "authors"
    - "sources"
    - "institutions"
    - "locations"
---
A **collection** is a saved, named list of **members**: OpenAlex entities of a single type, such as "Papers I'm tracking for this grant", "Authors at my consortium" or "Journals in our Elsevier package". Unlike almost everything else in OpenAlex, a collection isn't minted by the pipeline: *you* create it, by picking the entities you care about and naming the set. It can hold any OpenAlex entity type, and its ID drops into the [`filter` parameter](/api/filtering/) anywhere in the API in place of hundreds of IDs. A collection's OpenAlex ID looks like `https://openalex.org/collections/col_8yWKmRNyEr`, or `col_8yWKmRNyEr` for short; open one shared by link at [openalex.org/collections/col_8yWKmRNyEr](https://openalex.org/collections/col_8yWKmRNyEr).

## About

### Who creates them

Any signed-in OpenAlex user can create collections, up to **100**, and a collection belongs to the user who made it. Every collection starts **private**: only you (or an OpenAlex admin) can see it or filter by it. You can **share it by link**: then anyone with its link or ID can view it and filter by it, logged in or not, though it's never listed or searchable. Only the owner changes a collection; anyone else with an account can make a private copy of one shared with them.

### Public collections

A third access level, **public**, is for lists OpenAlex makes and keeps up to date, starting with country groups such as the European Union (EU27), the UN M49 regions and the World Bank income groups. Public collections are listed and searchable for everyone at [openalex.org/collections](https://openalex.org/collections) and in [`api.openalex.org/collections`](https://api.openalex.org/collections?filter=access:public), and anyone can filter by them or make a copy. Only OpenAlex can make a collection public for now; to suggest one, write to support@openalex.org.

On [openalex.org](https://openalex.org), run a search, tick the rows you want and click the folder icon, or paste a list of IDs or DOIs into the create-collection wizard. Scripts and AI agents use the [collections API](/api/collections/); [Working with collections](/how-to/collections/) has worked examples of both.

### What a collection can hold

Every collection holds members of exactly **one type**, fixed when it's created: works, authors, sources, institutions, topics, countries, [locations](/data/locations/), or any other [entity type](/data/). To track works *and* the authors of those works, make two collections. A collection holds up to **1,000** members. Members are stored as short OpenAlex IDs (`W2755968057`, `US`, `cc-by`); a locations collection stores [location IDs](/data/locations/#id) such as `doi:10.7717/peerj.4375` exactly as given, since they are case-sensitive.

### How it's used

A collection doesn't change any native entity: it's a lens over them, not a correction to them (that's what [curations](/data/curations/) are for). Its ID resolves to its members at query time, so you use it two ways:

- **On its own endpoint**, with the `collection:` filter: `filter=collection:col_8yWKmRNyEr` on `/sources` returns the sources in a sources collection.
- **On any ID filter of the same type**, across endpoints: a sources collection in `primary_location.source.id:col_8yWKmRNyEr` on `/works` returns every work published in one of those journals.

Either way it combines with other filters, sorting, grouping, selecting and paging, and a leading `!` excludes its members. Saved searches can carry it, and their [alerts](/api/alerts/) run as long as you can read it.

## Attributes

This is the dictionary of every attribute on a **collection** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`display_name`](/data/common-attributes/#display_name), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/); collection-specific notes on them are below. The members aren't part of the object: they're paged separately, so it stays small however many a collection holds.

### `id`
*String.* The collection's OpenAlex ID, e.g. `https://openalex.org/collections/col_8yWKmRNyEr`. The short form `col_8yWKmRNyEr` (`col_` and 10 letters and digits) works wherever the URL does: in API paths, in filters and when copying. See [Common attributes](/data/common-attributes/#id).

### `display_name`
*String.* The collection's name, 1 to 30 characters, unique among its owner's collections (ignoring case). Searchable with `search=` on the list. See [Common attributes](/data/common-attributes/#display_name).

### `description`
*String.* An optional note about the collection, 0 to 500 characters; `""` when empty.

### `entity_type`
*String.* The type every member must be: `works`, `authors`, `sources`, `institutions`, `locations` and so on, as named by its API endpoint. Fixed at creation. An ID of another type is refused with a `400` (code `member_wrong_type`). Filterable on the list.

### `member_count`
*Integer.* How many members the collection holds, at most 1,000. Sortable on the list.

### `access`
*String.* Who can view it and filter by it: `private` (only its owner; the default), `shared_by_link` (anyone with its link or ID; never listed) or `public` (anyone; listed and searchable; set only by OpenAlex). Filterable and groupable on the list. See [Who can see a collection](/api/collections/#who-can-see-a-collection).

### `can_edit`
*Boolean.* `true` when you are the collection's owner, the only one who can change it. The object never says who the owner is: a link shares the list, not who made it.

### `created_date`
*String.* The date the collection was created (`YYYY-MM-DD`, UTC). Sortable on the list. See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC datetime of the last change to the collection's name, description, access or members. Sortable on the list. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

Collections live at [`api.openalex.org/collections`](https://api.openalex.org/collections), with your OpenAlex API key, at no credit cost. Fetch one by ID, `/collections/col_8yWKmRNyEr`, or list the public collections and your own and [filter](/api/filtering/) (`entity_type`, `access`, `can_edit`), [search](/api/searching/) (`display_name` and `description`), [group](/api/grouping/) (`entity_type`, `access`, `can_edit`), [sort](/api/sorting/) (`display_name`, `created_date`, `updated_date`, `member_count`), [select](/api/selecting-fields/) and [page](/api/paging/) over them, as on any entity. Nobody else's private or shared-by-link collections are listed, and one you can't read returns `404` (code `collection_not_found`). Members are at `/collections/{id}/members`. The [collections API](/api/collections/) has every endpoint, rule and error code; for the full list of endpoints see the [endpoints index](/api/endpoints/).
