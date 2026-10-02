---
title: "Collections"
updated: 2026-10-02
description: "Save named lists of OpenAlex entities and filter searches against them"
tags: ["api"]
source_id: "guides/collections"
source_url: "https://developers.openalex.org/guides/collections"
source_updated: "2026-06-01"
---
A **collection** is a named list of **members**, OpenAlex entities of one type — for
example, "Papers I'm tracking for this grant", "Authors at my consortium", or
"Journals I publish in". Collections give you a single ID you can drop into the
[`filter` parameter](/api/filtering/) anywhere in the API, instead of pasting
hundreds of OpenAlex IDs into every request.

> **Note:**
> Collections start private to the user who creates them. The owner can
> [share one by link](#sharing-by-link): then anyone with its link or `col_` ID
> can view it and filter by it, logged in or not. Manage collections at
> `https://api.openalex.org/collections` with your OpenAlex API key, as
> `?api_key=` or an `Authorization: Bearer` header. Managing collections costs
> no credits.

## Concepts

| Property                         | Value                                                     |
| -------------------------------- | --------------------------------------------------------- |
| One entity type per collection   | `works`, `authors`, `sources`, `institutions`, `topics`, `sdgs`, `funders`, `publishers`, `keywords`, or `concepts` |
| Max members per collection       | 1,000                                                     |
| Max collections per user         | 100                                                       |
| Display-name length              | 1–30 characters; case-insensitive unique per user         |
| Description length               | 0–500 characters                                          |
| ID shape                         | `col_` followed by 10 alphanumeric characters             |

A collection holds members of a single type. To track works *and* the authors
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

To create one programmatically, `POST` to `/collections`:

```bash
POST https://api.openalex.org/collections
Authorization: Bearer <your-api-key>
Content-Type: application/json

{
  "display_name": "My altmetrics papers",
  "entity_type": "works",
  "description": "Papers I'm tracking for the altmetrics review",
  "member_ids": ["W2755968057", "https://openalex.org/W4404012345"]
}
```

`member_ids` is optional: you can create an empty collection and
[add members](#add-and-remove-members) later. IDs may be short (`W123…`) or
full URLs (`https://openalex.org/W123…`); the API stores the short form. Every
ID must match the collection's `entity_type`: adding `A123…` to a `works`
collection returns a `400` with code `member_wrong_type`, naming the ID. Pass
`"access": "shared_by_link"` to [share it](#sharing-by-link) from the start.

A successful create returns `201`, a `Location` header with the collection's
URL, and the collection:

```json
{
  "id": "col_beNWUTw6qY",
  "display_name": "My altmetrics papers",
  "description": "Papers I'm tracking for the altmetrics review",
  "entity_type": "works",
  "member_count": 2,
  "access": "private",
  "can_edit": true,
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
PATCH https://api.openalex.org/collections/{collection_id}
Authorization: Bearer <your-api-key>
Content-Type: application/json

{ "access": "shared_by_link" }
```

`{ "access": "private" }` makes it private again, at once, for every link and
saved search that uses it. In the OpenAlex website, use **Share** on the
collection's page or in the row menu on your Collections page.

Lists of people say something about them. Don't share lists drawn from HR
records.

## Alerts and exports

**Alerts** ([full API](/api/alerts/)). Save a works search that filters by a collection of authors,
institutions, sources or another type, turn on its alert, and OpenAlex emails
you new works that match, like any other alert. A search limited to a works
collection (`collection:col_…`) can't alert: a collection of works is a fixed
list, so it never gains new ones. Turning on such an alert returns `400` with
code `works_collection_cannot_alert`. An alert runs only while you can still read every collection in
its search. If one is deleted, or its owner makes it private again, the alert
turns off and you get an email saying which collection and how to fix it.

**Exports.** An export of a search that filters by a collection reads it with
your API key, so it counts and exports your own private collections. If you
can't read a collection in the search, the export is refused with the same
`404` "Collection col_… not found." (code `collection_not_found`) rather than producing an
empty file.

## Managing collections

Every collection is one resource at `https://api.openalex.org/collections/{id}`,
and its members are `.../members`:

| Method   | Path                                     | What it does                                   | Who            |
| -------- | ---------------------------------------- | ---------------------------------------------- | -------------- |
| `GET`    | `/collections`                           | Your collections, paged                        | You            |
| `POST`   | `/collections`                           | Create one, or [make a copy](#make-a-copy)     | Any account    |
| `GET`    | `/collections/{id}`                      | Read one                                       | Per its [access](#sharing-by-link) |
| `PATCH`  | `/collections/{id}`                      | Change `display_name`, `description`, `access` | Owner          |
| `DELETE` | `/collections/{id}`                      | Delete it (`204`)                              | Owner          |
| `GET`    | `/collections/{id}/members`              | Its members, paged                             | Per its access |
| `POST`   | `/collections/{id}/members`              | Add members                                    | Owner          |
| `DELETE` | `/collections/{id}/members/{member_id}`  | Remove one member (`204`)                      | Owner          |
| `DELETE` | `/collections/{id}/members?member_ids=…` | Remove up to 100 members                       | Owner          |

Send your OpenAlex API key as `?api_key=` or an `Authorization: Bearer` header
(a personal key; organization keys aren't accepted here). Without one you can
read only collections shared by link. These calls cost no credits. Reads by
anyone but the owner are rate limited: 120 a minute per IP logged out, 300 a
minute per account.

### List your collections

```bash
GET https://api.openalex.org/collections?api_key=<your-api-key>
```

Returns only your own collections: nobody's collections are ever listed to
anyone else. Supports `page` and `per_page` (1 to 100, default 25). Add
`member_ids=W2755968057,W4404012345` (up to 100) to list only your
collections that hold any of those IDs; each result then carries
`matching_member_ids`.

```json
{
  "meta": { "count": 3, "page": 1, "per_page": 25 },
  "results": [
    {
      "id": "col_beNWUTw6qY",
      "display_name": "My altmetrics papers",
      "description": "Papers I'm tracking for the altmetrics review",
      "entity_type": "works",
      "member_count": 4,
      "access": "private",
      "can_edit": true,
      "created_at": "2026-05-20T16:00:00",
      "updated_at": "2026-05-26T14:00:00"
    }
  ]
}
```

### Get a collection

```bash
GET https://api.openalex.org/collections/{collection_id}
```

Returns the collection as above. `can_edit` is `true` only for its owner. A
collection you can't read returns `404` with code `collection_not_found`,
whether it's missing, deleted or private, so nobody can probe for private ones.

### List its members

```bash
GET https://api.openalex.org/collections/{collection_id}/members?per_page=1000
```

```json
{
  "meta": { "count": 4, "page": 1, "per_page": 1000 },
  "results": [
    { "id": "W2755968057", "added_at": "2026-05-20T16:00:00" }
  ]
}
```

Members come in the order they were added. Page with `page` and `per_page`
(1 to 1,000, default 100), or with a cursor: pass `cursor=*`, then each
response's `meta.next_cursor` until it's `null`.

### Make a copy

```bash
POST https://api.openalex.org/collections
Content-Type: application/json

{ "copy_of": "col_beNWUTw6qY" }
```

Copies any collection you can read (your own, or one shared by link) into a new
**private** collection you own, with the same type, description and members.
Pass `display_name` to name it; otherwise it keeps the source's name, with
"(copy 2)" and so on if you already use that name. The copy doesn't follow later
changes to the source. Change it with `PATCH` once it's made.

### Change a collection

```bash
PATCH https://api.openalex.org/collections/{collection_id}
Content-Type: application/json

{ "display_name": "Renamed", "description": "Updated notes" }
```

`PATCH` takes `display_name`, `description` and `access`, and returns the
collection. `entity_type` is fixed when a collection is created.

### Delete a collection

```bash
DELETE https://api.openalex.org/collections/{collection_id}
```

Returns `204` with no body. Its members go with it; saved searches that filter
by it start returning `404`.

### Add and remove members

```bash
POST https://api.openalex.org/collections/{collection_id}/members
Content-Type: application/json

{ "member_ids": ["W2755968057", "https://openalex.org/W4404012345"] }
```

Returns `{"added": 1, "already_present": 1, "member_count": 5}`. Adding a
member that's already there is not an error. If any ID is the wrong type or not
an OpenAlex ID, nothing is added and the `400` names it.

```bash
# Remove one member
DELETE https://api.openalex.org/collections/{collection_id}/members/W2755968057

# Remove several (up to 100), no request body
DELETE https://api.openalex.org/collections/{collection_id}/members?member_ids=W2755968057,W4404012345
```

Removing one returns `204`, or `404` with code `member_not_found` if it wasn't
a member. Removing several returns `{"removed": 2, "member_count": 3}`.

### Errors

Errors look like the rest of the API, with a stable `code` to branch on:

```json
{ "error": "Not Found", "code": "collection_not_found", "message": "Collection not found." }
```

| Status | `code`                     | Cause                                                              |
| ------ | -------------------------- | ------------------------------------------------------------------ |
| 400    | `invalid_body`             | The body isn't a JSON object (send `Content-Type: application/json`) |
| 400    | `unknown_field`            | A field this endpoint doesn't take; the message names the right one |
| 400    | `field_not_editable`       | `entity_type` in a `PATCH`                                         |
| 400    | `no_fields`                | A `PATCH` with nothing to change                                   |
| 400    | `entity_type_invalid`      | `entity_type` missing or not a supported type                      |
| 400    | `display_name_blank`, `display_name_whitespace`, `display_name_too_long`, `display_name_url`, `display_name_reserved`, `display_name_invalid_character` | The name is empty, over 30 characters, a URL, reserved, or has control characters |
| 400    | `display_name_duplicate`   | You already have a collection with this name (case-insensitive)    |
| 400    | `description_invalid`, `description_too_long`, `description_url` | The description isn't a string, is over 500 characters, or is a URL |
| 400    | `access_invalid`           | `access` isn't `private` or `shared_by_link`                       |
| 400    | `member_id_invalid`        | An ID isn't an OpenAlex ID                                         |
| 400    | `member_wrong_type`        | An ID's type doesn't match the collection's `entity_type`          |
| 400    | `member_limit_reached`     | The collection would pass 1,000 members                            |
| 400    | `member_ids_required`, `too_many_member_ids` | Bulk remove without `member_ids`, or over 100           |
| 400    | `invalid_paging`, `invalid_cursor` | `page`, `per_page` or `cursor` out of range                |
| 401    | `unauthorized`             | No valid API key, on a call that needs one                         |
| 403    | `not_collection_owner`     | Only the owner can change it; [make a copy](#make-a-copy) instead  |
| 403    | `collection_limit_reached` | You already own 100 collections                                    |
| 404    | `collection_not_found`     | Missing, deleted, or private to someone else                       |
| 404    | `member_not_found`         | Removing an ID that isn't a member                                 |
| 429    | `rate_limited`             | Too many reads; wait for `Retry-After` seconds                     |

### Older routes (deprecated)

The first version of this API lives on `user.openalex.org` and keeps working,
with its old response shape, for scripts already built on it. New code should
use the routes above.

| Deprecated                                                  | Use instead                                  |
| ----------------------------------------------------------- | -------------------------------------------- |
| `GET user.openalex.org/me/collections`                      | `GET /collections`                           |
| `POST user.openalex.org/me/collections` (`entity_ids`, `source_collection_id`) | `POST /collections` (`member_ids`, `copy_of`) |
| `GET user.openalex.org/collections/{id}`                    | `GET /collections/{id}`                      |
| `GET user.openalex.org/collections/{id}/entities`           | `GET /collections/{id}/members`              |
| `PATCH`, `DELETE user.openalex.org/me/collections/{id}`     | `PATCH`, `DELETE /collections/{id}`          |
| `POST user.openalex.org/me/collections/{id}/entities`       | `POST /collections/{id}/members`             |
| `DELETE user.openalex.org/me/collections/{id}/entities` (body) | `DELETE /collections/{id}/members?member_ids=` |
| `DELETE user.openalex.org/me/collections/{id}/entities/{id}` | `DELETE /collections/{id}/members/{id}`     |

The old routes take the key only as `Authorization: Bearer`, call members
`entity_ids` and `entity_count`, and answer errors as
`{"HTTP_status_code", "error": true, "message", "code"}`.

## Admin endpoints

OpenAlex admins can list, read, edit, or delete any user's collection on `https://user.openalex.org`:

| Method   | Path                                                | Notes                          |
| -------- | --------------------------------------------------- | ------------------------------ |
| `GET`    | `/admin/collections?q=&owner_id=&entity_type=`      | Cross-user search, paged       |
| `GET`    | `/admin/collections/{collection_id}`                | Read any collection            |
| `PATCH`  | `/admin/collections/{collection_id}`                | Same body as the user PATCH, plus `user_id` to transfer ownership |
| `DELETE` | `/admin/collections/{collection_id}`                | Hard-delete with cascade       |

Non-admin callers get `403`.
