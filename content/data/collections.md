---
title: "Collections"
updated: 2026-10-02
description: "What a collection is, what it can hold, who can see it (private, or shared by link), and what every attribute on a collection object means."
tags: ["reference"]
entity:
  example: "col_beNWUTw6qY"
---
A **collection** is a saved, named list of **members**, OpenAlex entities of a single type — "Papers I'm tracking for this grant", "Authors at my consortium", "Journals in our Elsevier package". Unlike almost everything else in OpenAlex, a collection isn't minted by the pipeline; *you* create it, by picking entities you care about and giving the set a name. The payoff is a single ID you can drop into the [`filter` parameter](/api/filtering/) anywhere in the API instead of pasting hundreds of OpenAlex IDs into every request. A collection's ID looks like `col_beNWUTw6qY` (the prefix `col_` followed by 10 alphanumeric characters).

## Who creates it, and how it's used

Collections are made by users, so they have no "About" provenance story. Instead:

### Who creates them

Any signed-in OpenAlex user can create collections, and a collection belongs to the user who made it. Every collection starts **private**: only you (or an OpenAlex admin) can see it or filter by it. You can **share it by link**: then anyone with its link or ID can view it and filter by it, logged in or not, though it's never listed or searchable. Only the owner edits a collection; anyone else with an account can make a private copy of one shared with them. A user can own up to **100** collections.

The easiest way to make one is in the web UI at [openalex.org](https://openalex.org): run a search, tick the rows you want, and click the folder icon → **Create a new collection**. You can also paste a list of IDs or DOIs into the create-collection wizard, or build one programmatically with `POST https://api.openalex.org/collections`.

### What a collection can contain

Every collection holds members of exactly **one type**, fixed when the collection is created. The supported types are `works`, `authors`, `sources`, `institutions`, `topics`, `sdgs`, `funders`, `publishers`, `keywords`, and `concepts`. To track works *and* the authors of those works, you make two collections. A collection can hold up to **1,000** members.

### How it feeds back into OpenAlex

A collection doesn't change any native entity — it's a lens over them, not a correction to them (that's what [curations](/data/curations/) are for). Once a collection exists, its ID resolves to its member entity IDs at query time, so you can use it two ways:

- **The `collection:` filter**, matching a collection against the endpoint of the *same* type — `filter=collection:col_beNWUTw6qY` on `/works` returns every work in a `works` collection.
- **As a value on any ID-valued filter field**, matching a collection of the *matching* type across entity types — e.g. a `sources` collection dropped into `primary_location.source.id:col_…` on `/works` returns every work published in one of those journals (the library-subscription workflow).

Either way the collection composes normally with other filters, sorting, grouping, selecting, and pagination, and can be negated with a leading `!` to *exclude* its members. The full mechanics, type-matching rules, and limits live in the [API guide](/api/collections/).

## Attributes

A collection object is small — it carries metadata about the set, not the members themselves (those are paged separately). Attributes shared with other entities are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The collection's ID: the literal prefix `col_` followed by 10 alphanumeric characters, e.g. `col_beNWUTw6qY`. This is the value you pass to the `collection:` filter (or to an ID-valued filter field). Unlike native-entity [OpenAlex IDs](/data/common-attributes/#id), it is not a resolvable `openalex.org` URL.

### `can_edit`
*Boolean.* `true` when you are the collection's owner, the only person who can change it. A collection shared by link never says who owns it.

### `access`
*String.* Who can view the collection and filter by it: `private` (only its owner; the default) or `shared_by_link` (anyone with its link or ID, logged in or not; never listed). See [Sharing by link](/api/collections/#sharing-by-link).

### `entity_type`
*String.* The single entity type every member of the collection must be — one of `works`, `authors`, `sources`, `institutions`, `topics`, `sdgs`, `funders`, `publishers`, `keywords`, or `concepts`. Fixed at creation. Every ID you add must match it; a wrong-type ID (an `A…` in a `works` collection) is rejected with a `400` (code `member_wrong_type`).

### `display_name`
*String.* The human-readable name of the collection, 1–30 characters. Case-insensitively unique per user, so you can't own two collections with the same name. See [Common attributes](/data/common-attributes/#display_name).

### `description`
*String.* An optional free-text note about the collection, 0–500 characters. Empty by default.

### `member_count`
*Integer.* How many members the collection currently holds, capped at 1,000.

### `created_at`
*String.* The timestamp when the collection was created (an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime, UTC). Note this uses `created_at`/`updated_at`, not the `created_date`/`updated_date` naming on native entities.

### `updated_at`
*String.* The timestamp of the last change to the collection's metadata or membership (an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime).

The members themselves are **not** part of the collection object. They're fetched from a separate, paged endpoint (`/collections/{id}/members`) so response sizes stay bounded however many members a collection holds.

## In the API

Collections live at `https://api.openalex.org/collections`, the same host you filter on: list yours, create, read, share, change and delete them, and add or remove members, at no credit cost. A private collection works only for its owner, with your OpenAlex API key as `?api_key=` or an `Authorization: Bearer` header; a collection shared by link works for anyone. The first version of these routes, on `user.openalex.org`, still works but is deprecated. A collection you can't read, whether missing, deleted or private to someone else, returns `404` "Collection col_… not found." (code `collection_not_found`), never an empty result. See the [Collections guide](/api/collections/) for the endpoint mechanics — creating, editing, adding and removing members, the `collection:` and cross-type filters, and every validation rule. For the full list of endpoints see the [endpoints index](/api/endpoints/).
