---
title: "Collections"
updated: 2026-10-02
description: "Save named lists of OpenAlex entities and filter searches against them"
tags: ["api"]
source_id: "guides/collections"
source_url: "https://developers.openalex.org/guides/collections"
source_updated: "2026-06-01"
---
A **collection** is a named list of OpenAlex entities of one type — for
example, "Papers I'm tracking for this grant", "Authors at my consortium", or
"Journals I publish in". Collections give you a single ID you can drop into the
[`filter` parameter](/api/filtering/) anywhere in the API, instead of pasting
hundreds of OpenAlex IDs into every request.

> **Note:**
> Collections start private to the user who creates them. The owner can
> [share one by link](#sharing-by-link): then anyone with its link or `col_` ID
> can view it and filter by it, logged in or not. Manage collections via
> authenticated requests against `user.openalex.org`, with your OpenAlex API key
> in the `Authorization: Bearer` header.

## Concepts

| Property                         | Value                                                     |
| -------------------------------- | --------------------------------------------------------- |
| One entity type per collection   | `works`, `authors`, `sources`, `institutions`, `topics`, `sdgs`, `funders`, `publishers`, `keywords`, or `concepts` |
| Max entities per collection      | 1,000                                                     |
| Max collections per user         | 100                                                       |
| Display-name length              | 1–30 characters; case-insensitive unique per user         |
| Description length               | 0–500 characters                                          |
| ID shape                         | `col_` followed by 10 alphanumeric characters             |

A collection holds entities of a single type. To track works *and* the authors
of those works, create two collections.

## Creating a collection

The easiest way to create a collection is in the OpenAlex web UI at
[openalex.org](https://openalex.org):

1. Run a search.
2. Tick the rows you want to save (or use the master checkbox to select the
   whole page).
3. Click the folder icon in the results toolbar → **Create a new collection**.

You can also paste a list of IDs or DOIs straight into the create-collection
wizard at `https://openalex.org/settings/collections`.

To create one programmatically, `POST` to `/me/collections`:

```bash
POST https://user.openalex.org/me/collections
Authorization: Bearer <your-api-key>
Content-Type: application/json

{
  "display_name": "My altmetrics papers",
  "entity_type": "works",
  "description": "Papers I'm tracking for the altmetrics review",
  "entity_ids": [
    "https://openalex.org/W2755968057",
    "https://openalex.org/W4404012345"
  ]
}
```

`entity_ids` is optional — you can create an empty collection and add entities
later. IDs may be supplied in full-URL form (`https://openalex.org/W123…`) or
short form (`W123…`); the API normalizes them. Every ID must match the
collection's `entity_type` — adding `A123…` to a `works` collection returns a
`400` naming the offending ID.

A successful create returns `201` with the saved collection:

```json
{
  "id": "col_beNWUTw6qY",
  "user_id": "user-TSamuHxDbnhn",
  "entity_type": "works",
  "display_name": "My altmetrics papers",
  "description": "Papers I'm tracking for the altmetrics review",
  "entity_count": 2,
  "created_at": "2026-05-26T14:00:00",
  "updated_at": "2026-05-26T14:00:00"
}
```

## Filtering search results by collection

Once a collection exists, drop its ID into any search on the matching entity
type using the `collection:` filter:

```bash
# Every work in the col_beNWUTw6qY collection
GET https://api.openalex.org/works?filter=collection:col_beNWUTw6qY
Authorization: Bearer <your-api-key>
```

This works on every entity type the collection system supports —
`/works`, `/authors`, `/sources`, `/institutions`, `/topics`, `/sdgs`,
`/funders`, `/publishers`, `/keywords`, `/concepts` — as long as the collection
and the endpoint match. Filtering an `authors` collection on `/works` returns
a `400`:

```
collection col_beNWUTw6qY is type 'authors', not valid for /works
```

The collection ID resolves to the underlying entity IDs at query time, so the
filter combines normally with other filters and with sorting, grouping,
selecting, and pagination:

```bash
# Open-access papers in this collection, newest first
GET https://api.openalex.org/works?filter=collection:col_beNWUTw6qY,is_oa:true&sort=publication_date:desc
```

### Negation

Prepend `!` to exclude the entities in the collection instead of including them:

```bash
GET https://api.openalex.org/works?filter=collection:!col_beNWUTw6qY
```

### Limits

- **One `collection:` filter per request.** Repeated or `|`-OR'd collection
  values return a `400`. To combine collections, snapshot the resolved IDs
  client-side and pass them via the `openalex:` filter.
- **Per-request entity-list ceiling: 10,000.** With the per-collection cap of
  1,000 entities, a single collection is always within budget.
- **Access.** A private collection filters only for its owner: pass your
  OpenAlex API key in the `Authorization: Bearer …` header or as `?api_key=`
  (both work the same). A collection
  [shared by link](#sharing-by-link) filters for anyone, with or without a key.
  A collection you can't read (missing, deleted, or private to someone else)
  returns `404` with "Collection col_… not found." and
  `"code": "collection_not_found"`, never a silent zero.

## Filtering by a collection on a related entity

The `collection:` filter above matches a collection against the endpoint of the
*same* type — a `sources` collection on `/sources`, an `authors` collection on
`/authors`. But collections are often most useful **across** types: filtering
one kind of entity by a collection of a *different* kind.

Any filter field whose value is an OpenAlex ID also accepts a `col_…`
collection of the matching type. OpenAlex resolves the collection to its member
IDs at query time and matches that field against them — so the collection ID
behaves exactly like a value for that field.

**Example — the library-subscription workflow.** A librarian builds a `sources`
collection of the ~1,000 journal IDs in their Elsevier (or Wiley, Springer, …)
package, then filters *works* by it through the `primary_location.source.id`
field:

```bash
# Every work published in a journal in your subscription collection
GET https://api.openalex.org/works?filter=primary_location.source.id:col_beNWUTw6qY
Authorization: Bearer <your-api-key>
```

Because the collection resolves to ordinary field values, it composes with every
other filter, plus sorting, grouping, selecting, and pagination. For example,
"open-access works from 2024 in my subscribed journals, grouped by author
institution":

```bash
GET https://api.openalex.org/works?filter=primary_location.source.id:col_beNWUTw6qY,is_oa:true,publication_year:2024&group_by=authorships.institutions.id
Authorization: Bearer <your-api-key>
```

The same pattern works for any ID-valued filter field, on any endpoint:

| Filter clause                                        | Collection type | Meaning                                       |
| ---------------------------------------------------- | --------------- | --------------------------------------------- |
| `/works?filter=primary_location.source.id:col_…`     | `sources`       | Works published in these journals/sources     |
| `/works?filter=authorships.author.id:col_…`          | `authors`       | Works by any of these authors                 |
| `/works?filter=authorships.institutions.id:col_…`    | `institutions`  | Works affiliated with these institutions      |
| `/works?filter=primary_topic.id:col_…`               | `topics`        | Works on these topics                         |
| `/works?filter=funders.id:col_…`                     | `funders`       | Works funded by these funders                 |

This covers the ID-valued fields on `/works`, `/authors`, `/sources`, and
`/institutions` — including author and institution fields such as
`last_known_institutions.id` and `affiliations.institution.id`.

### Type matching

The collection's type must match the type the filter field expects. A `sources`
collection works on `primary_location.source.id` but not on
`authorships.author.id`; a mismatch returns a `400` naming both sides:

```
collection col_beNWUTw6qY is type 'sources', not valid for the `authorships.author.id` filter (expects 'authors').
```

A field that doesn't take an entity ID (for example a date or boolean field)
can't take a collection at all:

```
The `publication_year` filter does not support cross-type collection references (col_...). Use a same-type `collection:` filter or a literal value list.
```

### Negation

Prepend `!` to the collection ID to exclude its members, just like any other
filter value:

```bash
# Works NOT published in your subscribed journals
GET https://api.openalex.org/works?filter=primary_location.source.id:!col_beNWUTw6qY
Authorization: Bearer <your-api-key>
```

### Limits

- **One collection per filter field.** You can't OR two collections onto the
  same field (`field:col_a|col_b`) or repeat the field with a second collection
  — either returns a `400`. Use one collection per field; different fields in
  the same request can each carry their own collection.
- **Don't mix a collection with literal IDs in one clause.**
  `primary_location.source.id:col_…|S12345` returns a `400`. Pass the collection
  alone, or pass literal IDs alone.
- The per-collection cap of 1,000 entities still applies, and a single request
  resolves to at most 10,000 entity IDs across all of its collection filters.

## Sharing by link

Every collection is `private` or `shared_by_link`:

| `access`         | Who can view it and filter by it                          |
| ---------------- | --------------------------------------------------------- |
| `private`        | Only its owner. The default for every new collection.     |
| `shared_by_link` | Anyone with its link or `col_` ID, logged in or not.      |

A collection shared by link is never listed or searchable anywhere: people find
it only through a link or ID you give them. Only the owner can change it; anyone
else with an account can [make a copy](#make-a-copy). Share or unshare with:

```bash
PATCH https://user.openalex.org/me/collections/{collection_id}
Content-Type: application/json

{ "access": "shared_by_link" }
```

`{ "access": "private" }` makes it private again, at once, for every link and
saved search that uses it. In the OpenAlex website, use **Share** on the
collection's page or in the row menu on your Collections page.

Lists of people say something about them. Don't share lists drawn from HR
records.

## Alerts and exports

**Alerts.** Save a works search that filters by a collection of authors,
institutions, sources or another type, turn on its alert, and OpenAlex emails
you new works that match, like any other alert. A search limited to a works
collection (`collection:col_…`) can't alert: a collection of works is a fixed
list, so it never gains new ones. Turning on such an alert returns `400` with
that reason. An alert runs only while you can still read every collection in
its search. If one is deleted, or its owner makes it private again, the alert
turns off and you get an email saying which collection and how to fix it.

**Exports.** An export of a search that filters by a collection reads it with
your API key, so it counts and exports your own private collections. If you
can't read a collection in the search, the export is refused with the same
`404` "Collection col_… not found." (code `collection_not_found`) rather than producing an
empty file.

## Managing collections

The endpoints below live on `user.openalex.org`. Reading a collection follows
its [access](#sharing-by-link); everything else requires your OpenAlex API key in
the `Authorization: Bearer` header and works only on collections you own.

### List your collections

```bash
GET https://user.openalex.org/me/collections
```

Supports `?page=` and `?per_page=` (max 100). Pass `?entity_id=W2755968057` to
filter to collections that contain a specific entity — used by the
collection-chip strip on entity pages in the OpenAlex UI.

Response:

```json
{
  "meta": {
    "page": 1, "per_page": 25, "total_count": 3, "total_pages": 1
  },
  "results": [
    {
      "id": "col_beNWUTw6qY",
      "user_id": "user-TSamuHxDbnhn",
      "entity_type": "works",
      "display_name": "My altmetrics papers",
      "description": "Papers I'm tracking for the altmetrics review",
      "entity_count": 4,
      "created_at": "2026-05-20T16:00:00",
      "updated_at": "2026-05-26T14:00:00"
    }
  ]
}
```

### Get a single collection

```bash
GET https://user.openalex.org/collections/{collection_id}
```

Returns the same shape as one row in `results` above, plus `can_edit` (true
only for the owner). Anyone but the owner sees it without `user_id`. A
collection you can't read returns `404` "Collection not found."
whether it's missing or private, and reads by anyone but the owner are rate
limited (120 a minute per IP when logged out, 300 a minute per account). The
collection's entities are paged separately to keep response sizes bounded:

```bash
GET https://user.openalex.org/collections/{collection_id}/entities?per_page=1000
```

Returns the collection metadata plus the page of `entity_ids` (max
`per_page=1000`).

### Make a copy

```bash
POST https://user.openalex.org/me/collections
Content-Type: application/json

{ "source_collection_id": "col_beNWUTw6qY" }
```

Copies any collection you can read (your own, or one shared by link) into a new
**private** collection you own, with the same type, description and members.
Pass `display_name` to name it; otherwise it keeps the source's name, with
"(copy 2)" and so on if you already use that name. The copy doesn't follow later
changes to the source.

### Update name, description, or entity type

```bash
PATCH https://user.openalex.org/me/collections/{collection_id}
Content-Type: application/json

{ "display_name": "Renamed", "description": "Updated notes" }
```

`entity_type` can be changed only while the collection is empty.

### Delete a collection

```bash
DELETE https://user.openalex.org/me/collections/{collection_id}
```

Returns `{"deleted_collection_id": "col_…"}`. All `collection_entities` rows
cascade-delete.

### Add or remove entities

```bash
# Bulk add
POST https://user.openalex.org/me/collections/{collection_id}/entities
Content-Type: application/json

{ "entity_ids": ["W123…", "W456…"] }
```

Returns `{ "added": N, "already_present": M, "rejected_wrong_type": 0 }`.
Wrong-type IDs (e.g. an `A…` in a `works` collection) fast-fail with `400`
naming the first offender, so `rejected_wrong_type` is always `0` on
success — it's preserved in the response shape for backward compatibility.

```bash
# Bulk remove
DELETE https://user.openalex.org/me/collections/{collection_id}/entities
Content-Type: application/json

{ "entity_ids": ["W123…"] }
```

```bash
# Single remove via URL
DELETE https://user.openalex.org/me/collections/{collection_id}/entities/W123…
```

## Admin endpoints

OpenAlex admins can list, read, edit, or delete any user's collection:

| Method   | Path                                                | Notes                          |
| -------- | --------------------------------------------------- | ------------------------------ |
| `GET`    | `/admin/collections?q=&owner_id=&entity_type=`      | Cross-user search, paged       |
| `GET`    | `/admin/collections/{collection_id}`                | Read any collection            |
| `PATCH`  | `/admin/collections/{collection_id}`                | Same body as the user PATCH, plus `user_id` to transfer ownership |
| `DELETE` | `/admin/collections/{collection_id}`                | Hard-delete with cascade       |

Non-admin callers get `403`.

## Validation rules

Collections are validated before they hit the database. The most common 400s:

| Code                       | Cause                                                                   |
| -------------------------- | ----------------------------------------------------------------------- |
| `entity_type_invalid`      | `entity_type` missing or not one of the 10 supported types              |
| `display_name_invalid`     | Empty after trim, contains control characters, URL-shaped, or profane   |
| `display_name_too_long`    | More than 30 characters                                                 |
| `display_name_duplicate`   | You already have a collection with this name (case-insensitive)         |
| `description_invalid`      | Not a string, or contains control characters, or URL-shaped             |
| `entity_id_invalid`        | An ID doesn't look like any OpenAlex ID shape                           |
| `entity_id_wrong_type`     | An ID's type doesn't match the collection's `entity_type`               |
| `collection_full`          | Adding entities would exceed the 1,000-entity cap                       |
| `too_many_collections`     | You already own 100 collections                                         |
