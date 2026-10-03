---
title: "Collections"
updated: 2026-10-03
description: "What a collection is, what it can hold, who can see it (private, shared by link or public), the public collections OpenAlex keeps, and what every attribute on a collection object means."
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
A **collection** is a saved, named list of **members**: OpenAlex entities of a single type, such as "Papers I'm tracking for this grant", "Authors at my consortium" or "Journals in our Elsevier package". Unlike almost everything else in OpenAlex, a collection isn't minted by the pipeline: *you* create it, by picking the entities you care about and naming the set. OpenAlex also keeps a few [public collections](#public-collections), such as country groups, that anyone can browse and use. It can hold any OpenAlex entity type, and its ID drops into the [`filter` parameter](/api/filtering/) anywhere in the API in place of hundreds of IDs. A collection's OpenAlex ID looks like `https://openalex.org/collections/col_8yWKmRNyEr`, or `col_8yWKmRNyEr` for short; open one shared by link at [openalex.org/collections/col_8yWKmRNyEr](https://openalex.org/collections/col_8yWKmRNyEr).

## About

### Who creates them

Any signed-in OpenAlex user can create collections, up to **500**, and a collection belongs to the user who made it. Every collection starts **private**: only you (or an OpenAlex admin) can see it or filter by it. You can **share it by link**: then anyone with its link or ID can view it and filter by it, logged in or not, though it's never listed or searchable. Only the owner changes a collection; anyone else with an account can make a private copy of one shared with them.

On [openalex.org](https://openalex.org), run a search, tick the rows you want and click the folder icon, or paste a list of IDs or DOIs into the create-collection wizard. Scripts and AI agents use the [collections API](/api/collections/); [Working with collections](/how-to/collections/) has worked examples of both.

### Who can see them

| `access` | Who can view it and filter by it | Who sees it listed |
| --- | --- | --- |
| `private` | Its owner. The default. | Its owner |
| `shared_by_link` | Anyone with its link or ID, logged in or not | Its owner |
| `public` | Anyone, logged in or not | Everyone, at [openalex.org/collections](https://openalex.org/collections) and in [`/collections`](https://api.openalex.org/collections?filter=access:public) |

The owner chooses between private and shared by link. Only OpenAlex makes a collection public.

### Public collections

Public collections are lists OpenAlex makes and keeps up to date, for groupings people ask for but OpenAlex doesn't model as entities, starting with country groups. Anyone can find them, filter by them and [make a copy](/api/collections/#make-a-copy) to edit; nobody but OpenAlex can change them. Each description names its source and the date it was checked; the World Bank groups are revised after the World Bank's annual update each July.

| Collection | ID | Countries | Source |
| --- | --- | --- | --- |
| [European Union (EU27)](https://openalex.org/collections/col_LV29j8URoX) | `col_LV29j8URoX` | 27 | EU member list |
| [Latin America and the Caribbean (UN M49)](https://openalex.org/collections/col_WzKmMjhM92) | `col_WzKmMjhM92` | 52 | UN M49 standard |
| [Africa (UN M49)](https://openalex.org/collections/col_9efrGJ3bc9) | `col_9efrGJ3bc9` | 58 | UN M49 standard |
| [Americas (UN M49)](https://openalex.org/collections/col_2oHXPDj8kP) | `col_2oHXPDj8kP` | 57 | UN M49 standard |
| [Asia (UN M49)](https://openalex.org/collections/col_iHPNsaFk5D) | `col_iHPNsaFk5D` | 50 | UN M49 standard |
| [Europe (UN M49)](https://openalex.org/collections/col_fYwE5vyVuM) | `col_fYwE5vyVuM` | 51 | UN M49 standard |
| [Oceania (UN M49)](https://openalex.org/collections/col_m5Rvr345BN) | `col_m5Rvr345BN` | 28 | UN M49 standard |
| [Low income (World Bank)](https://openalex.org/collections/col_WXiZS2Kp4u) | `col_WXiZS2Kp4u` | 25 | World Bank income classification |
| [Lower-middle income (World Bank)](https://openalex.org/collections/col_GsJkKYB59g) | `col_GsJkKYB59g` | 47 | World Bank income classification |
| [Upper-middle income (World Bank)](https://openalex.org/collections/col_UR9CThUB32) | `col_UR9CThUB32` | 59 | World Bank income classification |
| [High income (World Bank)](https://openalex.org/collections/col_2CFt5cQgLh) | `col_2CFt5cQgLh` | 85 | World Bank income classification |
| [OECD members](https://openalex.org/collections/col_WrLDEu2hj4) | `col_WrLDEu2hj4` | 38 | OECD member list |

A few territories in these sources have no OpenAlex country and are left out: Western Sahara, the French Southern Territories, the US Minor Outlying Islands and the World Bank's "Channel Islands". A country group works on every country filter, such as authors' countries, a journal's country or a funder's country: see [Filter by a country group](/how-to/collections/#how-do-i-filter-by-a-country-group-like-the-eu-or-low-income-countries). To suggest a public collection, write to support@openalex.org.

### What a collection can hold

Every collection holds members of exactly **one type**, fixed when it's created: works, authors, sources, institutions, topics, countries, [locations](/data/locations/), or any other [entity type](/data/). To track works *and* the authors of those works, make two collections. A collection holds up to **1,000,000** members. As a filter it works live up to 300,000 members, and an author collection up to 100,000; a bigger one still holds and exports its members ([limits](/api/collections/#limits)). Members are stored as short OpenAlex IDs (`W2755968057`, `US`, `cc-by`); a locations collection stores [location IDs](/data/locations/#id) such as `doi:10.7717/peerj.4375` exactly as given, since they are case-sensitive.

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
*String.* The collection's name, 1 to 100 characters, unique among its owner's collections (ignoring case). Searchable with `search=` on the list. See [Common attributes](/data/common-attributes/#display_name).

### `description`
*String.* An optional note about the collection, 0 to 500 characters; `""` when empty.

### `entity_type`
*String.* The type every member must be: `works`, `authors`, `sources`, `institutions`, `locations` and so on, as named by its API endpoint. Fixed at creation. An ID of another type is refused with a `400` (code `member_wrong_type`). Filterable on the list.

### `member_count`
*Integer.* How many members the collection holds, at most 1,000,000. Sortable on the list.

### `access`
*String.* Who can view it and filter by it: `private` (only its owner; the default), `shared_by_link` (anyone with its link or ID; never listed) or `public` (anyone; listed and searchable; set only by OpenAlex). Filterable and groupable on the list. See [Who can see a collection](/api/collections/#who-can-see-a-collection).

### `can_edit`
*Boolean.* `true` when you are the collection's owner, the only one who can change it; always `false` on public collections unless you are OpenAlex. Filterable and groupable on the list: `can_edit:true` is your own collections. The object never says who the owner is: a link shares the list, not who made it.

### `created_date`
*String.* The date the collection was created (`YYYY-MM-DD`, UTC). Sortable on the list. See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC datetime of the last change to the collection's name, description, access or members. Sortable on the list. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

Collections live at [`api.openalex.org/collections`](https://api.openalex.org/collections), at no credit cost. Public collections need no key; your own need your OpenAlex API key. Fetch one by ID, `/collections/col_8yWKmRNyEr`, or list the public collections and your own and [filter](/api/filtering/) (`entity_type`, `access`, `can_edit`), [search](/api/searching/) (`display_name` and `description`), [group](/api/grouping/) (`entity_type`, `access`, `can_edit`), [sort](/api/sorting/) (`display_name`, `created_date`, `updated_date`, `member_count`), [select](/api/selecting-fields/) and [page](/api/paging/) over them, as on any entity. Nobody else's private or shared-by-link collections are listed, and one you can't read returns `404` (code `collection_not_found`). Members are at `/collections/{id}/members`. The [collections API](/api/collections/) has every endpoint, rule and error code; for the full list of endpoints see the [endpoints index](/api/endpoints/).
