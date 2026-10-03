---
title: "Collections"
updated: 2026-10-03
description: "Save named lists of OpenAlex entities and filter any search by them: the collections API, with the same IDs, list parameters and errors as every other endpoint"
tags: ["api"]
source_id: "guides/collections"
source_url: "https://developers.openalex.org/guides/collections"
source_updated: "2026-06-01"
---
A **collection** is a named list of **members**: OpenAlex entities of one type,
such as "Papers I'm tracking for this grant", "Authors at my consortium" or
"Journals in our Elsevier package". A collection can hold any OpenAlex entity
type. Its ID drops into the [`filter` parameter](/api/filtering/) anywhere in the
API, in place of hundreds of IDs pasted into every request.

Collections behave like every other OpenAlex entity: an `id` that is a URL
(`https://openalex.org/collections/col_8yWKmRNyEr`, with the short `col_8yWKmRNyEr`
accepted everywhere), `display_name`, `created_date` and `updated_date`, and a
list endpoint that takes `filter`, `search`, `sort`, `select` and cursor paging.
What a collection is, and every attribute, is on the [Collections entity
page](/data/collections/); worked examples are in [Working with
collections](/how-to/collections/).

> [!claude]
> You can do this in conversation: *"Make a collection of the journals in this
> list, then show me our open-access share in them by year."* Set up once:
> [Using OpenAlex with an AI assistant](/how-to/ai-assistants/).

## Quick start

Create a collection with two works, then search inside it:

```bash
curl -X POST https://api.openalex.org/collections \
  -H "Authorization: Bearer $OPENALEX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "display_name": "My altmetrics papers",
    "entity_type": "works",
    "member_ids": ["W2755968057", "https://openalex.org/W4404012345"]
  }'
```

```json
{
  "id": "https://openalex.org/collections/col_8yWKmRNyEr",
  "display_name": "My altmetrics papers",
  "description": "",
  "entity_type": "works",
  "member_count": 2,
  "access": "private",
  "can_edit": true,
  "created_date": "2026-10-03",
  "updated_date": "2026-10-03T14:00:00.000000"
}
```

```bash
curl "https://api.openalex.org/works?filter=collection:col_8yWKmRNyEr,is_oa:true&api_key=$OPENALEX_API_KEY"
```

## Authentication

Send your OpenAlex API key as `?api_key=` or an `Authorization: Bearer` header: a
personal key (organization keys aren't accepted here). Without one you can read
only [public collections](#public-collections) and collections [shared by link](#sharing-by-link). Managing collections costs
no credits; a search that filters by a collection costs what any search costs.

## The collection object

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | string | `https://openalex.org/collections/col_…`, the collection's OpenAlex ID. The short `col_…` works wherever the URL does: in paths, in filters and in `copy_of`. |
| `display_name` | string | 1 to 30 characters, unique per owner (ignoring case). |
| `description` | string | 0 to 500 characters; `""` when empty. |
| `entity_type` | string | What every member is: `works`, `authors`, `sources`, `locations`, `countries` or any other [entity type](/data/). Fixed at creation. |
| `member_count` | integer | How many members it holds, at most 1,000. |
| `access` | string | `private` (the default), `shared_by_link` or `public`. See [Who can see a collection](#who-can-see-a-collection). |
| `can_edit` | boolean | `true` only for the owner. The object never says who the owner is. |
| `created_date` | string | The date it was created, `YYYY-MM-DD` (UTC). |
| `updated_date` | string | The datetime of the last change to it or its members (ISO 8601 in UTC, written without a `Z`, as on every entity). |

The members aren't in the object: page through them at
[`/collections/{id}/members`](#list-its-members), or get them as full entities with
a [filter](#filtering-by-a-collection).

## Endpoints

| Method | Path | What it does | Who |
| --- | --- | --- | --- |
| `GET` | `/collections` | Your collections, with `filter`, `search`, `sort`, `select` and paging | You |
| `POST` | `/collections` | Create one, or [make a copy](#make-a-copy) | Any account |
| `GET` | `/collections/{id}` | Read one; takes `select` | Per its [access](#who-can-see-a-collection) |
| `PATCH` | `/collections/{id}` | Change `display_name`, `description`, `access` | Owner |
| `DELETE` | `/collections/{id}` | Delete it (`204`) | Owner |
| `GET` | `/collections/{id}/members` | Its members, paged | Per its access |
| `POST` | `/collections/{id}/members` | Add members | Owner |
| `DELETE` | `/collections/{id}/members/{member_id}` | Remove one member (`204`) | Owner |
| `DELETE` | `/collections/{id}/members?member_ids=…` | Remove up to 100 members | Owner |

`{id}` is the URL ID or the short `col_…`, as with every entity:
`/collections/col_8yWKmRNyEr` and `/collections/https://openalex.org/collections/col_8yWKmRNyEr`
are the same collection. Some HTTP clients fold the `//` in a path, so percent-encode
the URL there (`https%3A%2F%2Fopenalex.org%2Fcollections%2Fcol_8yWKmRNyEr`), or use the
short form. Reads by anyone but the
owner are rate limited: 120 a minute per IP logged out, 300 a minute per account.

### List collections

```bash
# Public collections, which anyone can list, no key needed
GET https://api.openalex.org/collections?filter=access:public&search=income

# Your own collections
GET https://api.openalex.org/collections?filter=can_edit:true&sort=updated_date:desc&api_key=<your-api-key>
```

Lists the [public collections](#who-can-see-a-collection), which OpenAlex makes, plus
your own when you send an API key. Nobody else's private or shared-by-link collections
are ever listed. `filter=access:public` is the public list; `filter=can_edit:true` is
yours. Logged out, the list is the public collections alone, 120 requests a minute per
IP. The parameters work as on every [list endpoint](/api/filtering/):

| Parameter | Takes | Example |
| --- | --- | --- |
| `filter` | `entity_type`, `access` and `can_edit` (`true` = yours); `\|` for OR, `!` to negate, commas to AND | `filter=entity_type:countries,access:public` |
| `search` | Text in `display_name` or `description` (case-insensitive) | `search=latin america` |
| `group_by` | `entity_type`, `access` or `can_edit`: a count per value, in `group_by`, with `results` empty | `group_by=entity_type` |
| `sort` | One of `display_name` (the default), `created_date`, `updated_date`, `member_count`; ascending unless you add `:desc`. Dates sort by full creation and update time, ties by `id`, so paging is stable | `sort=member_count:desc` |
| `select` | Any [fields of the object](#the-collection-object), plus `matching_member_ids` with `member_ids` | `select=id,display_name,member_count` |
| `page`, `per_page` | Basic paging; `per_page` 1 to 100, default 25 | `page=2&per_page=50` |
| `cursor` | Cursor paging: `cursor=*`, then each `meta.next_cursor` until it's `null` | `cursor=*` |
| `member_ids` | Up to 100 member IDs of any type, comma-separated and URL-encoded (location IDs too): only listed collections holding any of them, each with `matching_member_ids`. Add `filter=can_edit:true` for yours alone | `member_ids=W2755968057,W4404012345` |

```json
{
  "meta": { "count": 3, "page": 1, "per_page": 25 },
  "results": [
    {
      "id": "https://openalex.org/collections/col_Jr8sWq2LmT",
      "display_name": "UC agreement journals",
      "description": "Journals in the UC transformative agreements",
      "entity_type": "sources",
      "member_count": 412,
      "access": "shared_by_link",
      "can_edit": true,
      "created_date": "2026-09-30",
      "updated_date": "2026-10-03T09:12:44.512000"
    }
  ]
}
```

With `group_by`, the answer counts the same collections the list would return:

```json
{
  "meta": { "count": 15, "page": null, "per_page": null, "groups_count": 2 },
  "results": [],
  "group_by": [
    { "key": "public", "key_display_name": "Public", "count": 12 },
    { "key": "private", "key_display_name": "Private", "count": 3 }
  ]
}
```

In cursor mode `meta` is `{"count": 3, "page": null, "per_page": 25, "next_cursor": "…"}`.
A cursor belongs to its `sort`: change the sort and start again with `cursor=*`.

### Get a collection

```bash
GET https://api.openalex.org/collections/col_8yWKmRNyEr?select=id,display_name,member_count
```

Returns the collection, or only the selected fields. A collection you can't read
returns `404` with code `collection_not_found`, whether it's missing, deleted or
private, so nobody can probe for private ones.

### Create a collection

```bash
POST https://api.openalex.org/collections
Content-Type: application/json

{
  "display_name": "My altmetrics papers",
  "entity_type": "works",
  "description": "Papers I'm tracking for the altmetrics review",
  "member_ids": ["W2755968057", "https://openalex.org/W4404012345"],
  "access": "private"
}
```

Only `display_name` and `entity_type` are required. `member_ids` takes up to 1,000
OpenAlex IDs, short (`W2755968057`) or as URLs; the API stores the short form. It
takes OpenAlex IDs only: turn DOIs, ORCIDs or ISSNs into OpenAlex IDs first
([how](/how-to/collections/#how-do-i-make-a-collection-from-a-list-of-dois-orcids-or-issns)). Every
ID must match the collection's `entity_type`: `A5023888391` in a `works` collection
returns `400` with code `member_wrong_type`, naming the ID, and nothing is created.
Returns `201`, the collection, and a `Location` header with its URL.

Members of a `locations` collection are [location IDs](/data/locations/#id), stored
exactly as given: `doi:10.7717/peerj.4375`, `pmh:oai:arXiv.org:cond-mat/0404022`.
They are case-sensitive and contain `/` and `:`, so copy them verbatim. A work's
copies are `locations[].id` in `GET /works/W2741809807?select=locations`.

### Make a copy

```bash
POST https://api.openalex.org/collections
Content-Type: application/json

{ "copy_of": "https://openalex.org/collections/col_8yWKmRNyEr" }
```

Copies any collection you can read (your own, or one shared by link) into a new
**private** collection you own, with the same type, description and members. Pass
`display_name` to name it; otherwise it keeps the source's name, with "(copy 2)"
and so on if you already use that name. The copy doesn't follow later changes to
the source.

### Change a collection

```bash
PATCH https://api.openalex.org/collections/col_8yWKmRNyEr
Content-Type: application/json

{ "display_name": "Renamed", "description": "Updated notes", "access": "shared_by_link" }
```

Takes `display_name`, `description` and `access`, and returns the collection.
`entity_type` is fixed when a collection is created.

### Delete a collection

```bash
DELETE https://api.openalex.org/collections/col_8yWKmRNyEr
```

Returns `204` with no body. Its members go with it; saved searches that filter by
it start returning `404`.

### List its members

```bash
GET https://api.openalex.org/collections/col_8yWKmRNyEr/members?per_page=1000
```

```json
{
  "meta": { "count": 4, "page": 1, "per_page": 1000 },
  "results": [
    { "id": "W2755968057", "added_at": "2026-05-20T16:00:00" }
  ]
}
```

Each member is its `id` (stored as described [above](#create-a-collection)) and
`added_at`, when it was added (ISO 8601, UTC). Members come oldest first; members added
in the same call come in no set order, so compare them as a set. Page with `page` and `per_page` (1 to 1,000, default 100), or with
`cursor=*` and `meta.next_cursor`. For the members as full entities, filter their
endpoint instead: `/works?filter=collection:col_8yWKmRNyEr`.

### Add and remove members

```bash
POST https://api.openalex.org/collections/col_8yWKmRNyEr/members
Content-Type: application/json

{ "member_ids": ["W2755968057", "https://openalex.org/W4404012345"] }
```

Returns `{"added": 1, "already_present": 1, "member_count": 5}`. Adding a member
that's already there is not an error. If any ID is the wrong type or not an
OpenAlex ID, nothing is added and the `400` names it.

```bash
# Remove one member
DELETE https://api.openalex.org/collections/col_8yWKmRNyEr/members/W2755968057

# Remove several (up to 100), no request body
DELETE https://api.openalex.org/collections/col_8yWKmRNyEr/members?member_ids=W2755968057,W4404012345
```

Removing one returns `204`, or `404` with code `member_not_found` if it wasn't a
member. Removing several returns `{"removed": 2, "member_count": 3}`.

## Filtering by a collection

### On its own endpoint: `collection:`

```bash
# Every work in a works collection
GET https://api.openalex.org/works?filter=collection:col_8yWKmRNyEr

# Every location in a locations collection
GET https://api.openalex.org/locations?filter=collection:col_Lo7kq2PZab
```

`collection:` works on the endpoint of every type a collection can hold, as long
as the two match: an `authors` collection on `/works` returns `400` naming both.
The collection resolves to its members at query time, so it combines with every
other filter, `sort`, `group_by`, `select` and paging:

```bash
# Open-access papers in this collection, newest first
GET https://api.openalex.org/works?filter=collection:col_8yWKmRNyEr,is_oa:true&sort=publication_date:desc
```

### On a related endpoint: any ID filter

Any filter whose value is an OpenAlex ID also takes a collection of that type, so a
collection of one type filters another. Some common ones (the [how-to](/how-to/collections/#which-filters-take-a-collection)
has more, such as `locations.source.id` and `authorships.countries`):

| Filter clause | Collection type | Meaning |
| --- | --- | --- |
| `/works?filter=primary_location.source.id:col_…` | `sources` | Works published in these journals |
| `/works?filter=authorships.author.id:col_…` | `authors` | Works by any of these authors |
| `/works?filter=authorships.institutions.lineage:col_…` | `institutions` | Works from these institutions or their parts |
| `/works?filter=corresponding_institution_ids:col_…` | `institutions` | Works with a corresponding author at one of these |
| `/works?filter=topics.id:col_…` | `topics` | Works on these topics |
| `/works?filter=funders.id:col_…` | `funders` | Works funded by these funders |
| `/authors?filter=last_known_institutions.id:col_…` | `institutions` | Authors last seen at these institutions |

A mismatch returns `400`, for example "collection col_… is type 'sources', not
valid for the `authorships.author.id` filter (expects 'authors')." A field that
doesn't take an entity ID (a date, a boolean) can't take a collection at all.

### Excluding a collection

Prepend `!`: `/works?filter=primary_location.source.id:!col_8yWKmRNyEr` is every
work *not* published in those journals.

### Limits

- **One collection per filter field.** `field:col_a|col_b`, a second clause on the
  same field with another collection, or a collection mixed with literal IDs
  (`field:col_a|S123`) return `400`. Different fields can each carry one.
- **At most 5 collections per request, and 10,000 resolved IDs in all.**
- **Access.** A private collection filters only for its owner's key; one shared by
  link or public filters for anyone. One you can't read returns `404` "Collection col_… not
  found." (code `collection_not_found`), never a silent zero.

## Who can see a collection

| `access` | Who can view it and filter by it | Listed? |
| --- | --- | --- |
| `private` | Only its owner. The default for every new collection. | Only to its owner |
| `shared_by_link` | Anyone with its link or ID, logged in or not. | Only to its owner |
| `public` | Anyone, logged in or not. | To everyone, in `GET /collections` and on [openalex.org/collections](https://openalex.org/collections) |

### Public collections

Public collections are lists OpenAlex makes and keeps up to date, starting with
country groups: the European Union (EU27), the UN M49 regions and Latin America and
the Caribbean, the World Bank income groups and OECD members. Each one's description
names its source and date. Use one like any other collection, for example works with
an author in a low-income country:

```bash
GET https://api.openalex.org/works?filter=authorships.countries:col_…
```

Only OpenAlex can make a collection public for now: `{"access": "public"}` from
anyone else returns `403 public_needs_review`. To suggest a list for the public
collections, write to support@openalex.org. Anyone can [make a copy](#make-a-copy) of
a public collection and edit their own.

### Sharing by link

A collection shared by link is never listed or searchable: people find it only
through a link or ID you give them. Only the owner can change it; anyone else with
an account can [make a copy](#make-a-copy). Share with `PATCH /collections/{id}` and
`{"access": "shared_by_link"}`; `{"access": "private"}` unshares it at once, for
every link and saved search that uses it. On the website, use **Share** on the
collection's page. Lists of people say something about them: don't share lists
drawn from HR records.

## Alerts and exports

**Alerts** ([full API](/api/alerts/)). Save a works search that filters by a
collection of authors, institutions, sources or another type, turn on its alert,
and OpenAlex emails you new works that match. A search limited to a works
collection (`collection:col_…`) can't alert: a fixed list of works never gains new
ones (`400`, code `works_collection_cannot_alert`). An alert runs only while you can
still read every collection in its search; if one is deleted or made private, the
alert turns off and you get an email saying which collection.

**Exports.** An export of a search that filters by a collection reads it with your
key. If you can't read a collection in the search, the export is refused with
`404` (code `collection_not_found`) rather than producing an empty file.

## Limits

| Limit | Value |
| --- | --- |
| Members per collection | 1,000 |
| Collections per account | 100 |
| `display_name` | 1 to 30 characters, unique per owner (ignoring case) |
| `description` | 0 to 500 characters |
| IDs in one `member_ids` query string | 100 |

## Errors

Errors look like the rest of the API, with a stable `code` to branch on:

```json
{ "error": "Bad Request", "code": "invalid_sort", "message": "Can't sort collections by `cited_by_count`. Sort by: display_name, created_date, updated_date, member_count." }
```

| Status | `code` | Cause |
| --- | --- | --- |
| 400 | `invalid_filter` | A filter other than `entity_type` or `access`, or a value it doesn't take; the message lists the valid ones |
| 400 | `invalid_sort` | Not a sortable field, a direction other than `asc` or `desc`, or more than one field |
| 400 | `invalid_select` | A field the collection object doesn't have; the message lists them |
| 400 | `invalid_search` | `search` over 200 characters |
| 400 | `invalid_paging`, `invalid_cursor` | `page`, `per_page` or `cursor` out of range, both `page` and `cursor`, or a cursor from a different `sort` |
| 400 | `invalid_body` | The body isn't a JSON object (send `Content-Type: application/json`) |
| 400 | `unknown_field` | A field this endpoint doesn't take; the message names the right one (`member_ids`, not `entity_ids`) |
| 400 | `field_not_editable`, `no_fields` | `entity_type` in a `PATCH`, or a `PATCH` with nothing to change |
| 400 | `entity_type_invalid` | `entity_type` missing or not an entity type |
| 400 | `display_name_blank`, `display_name_too_long`, `display_name_duplicate`, `display_name_url`, `display_name_reserved`, `display_name_whitespace`, `display_name_invalid_character` | The name is empty, over 30 characters, already yours, a URL, reserved, or has control characters |
| 400 | `description_invalid`, `description_too_long`, `description_url` | The description isn't a string, is over 500 characters, or is a URL |
| 400 | `access_invalid` | `access` isn't `private`, `shared_by_link` or `public` |
| 400 | `invalid_group_by` | `group_by` isn't `entity_type`, `access` or `can_edit` |
| 400 | `invalid_copy_of` | `copy_of` isn't a collection ID |
| 400 | `member_id_invalid`, `member_wrong_type` | An ID isn't an OpenAlex ID, or isn't the collection's type |
| 400 | `member_limit_reached` | The collection would pass 1,000 members |
| 400 | `member_ids_required`, `too_many_member_ids` | Bulk remove without `member_ids`, or over 100 |
| 401 | `unauthorized` | No valid API key, on a call that needs one, or an invalid key on any call (a bad key never gets the logged-out answer) |
| 403 | `not_collection_owner` | Only the owner can change it; [make a copy](#make-a-copy) instead |
| 403 | `public_needs_review` | Only OpenAlex can make a collection public; write to support@openalex.org to suggest one |
| 403 | `collection_limit_reached` | You already own 100 collections |
| 404 | `collection_not_found` | Missing, deleted, or private to someone else |
| 404 | `member_not_found` | Removing an ID that isn't a member |
| 429 | `rate_limited` | Too many reads; wait for `Retry-After` seconds |

## For agents

- Build a collection from a pasted list by resolving each line to an OpenAlex ID
  first ([Finding OpenAlex IDs](/how-to/finding-openalex-ids/)), then one `POST`
  with up to 1,000 `member_ids`.
- Use the `id` the API returns; both its forms work everywhere. Find a collection by
  name with `GET /collections?search=…&select=id,display_name`.
- To answer "which of my collections hold X", use `GET /collections?member_ids=X`.
  For a work, add its location IDs too, to catch locations collections holding its copies.
- A work's location IDs are `locations[].id` from `GET /works/{id}?select=locations`.
- Before filtering by a collection, match its `entity_type` to the filter:
  `collection:` on its own endpoint, or the ID field of that type elsewhere.
- Branch on `code`, never on `message`.

## Older routes (deprecated)

The first version of this API lives on `user.openalex.org` and keeps working, with
its old response shape (bare `col_…` IDs, `created_at` and `updated_at`), for
scripts already built on it. New code should use the routes above.

| Deprecated | Use instead |
| --- | --- |
| `GET user.openalex.org/me/collections` | `GET /collections` |
| `POST user.openalex.org/me/collections` (`entity_ids`, `source_collection_id`) | `POST /collections` (`member_ids`, `copy_of`) |
| `GET user.openalex.org/collections/{id}` | `GET /collections/{id}` |
| `GET user.openalex.org/collections/{id}/entities` | `GET /collections/{id}/members` |
| `PATCH`, `DELETE user.openalex.org/me/collections/{id}` | `PATCH`, `DELETE /collections/{id}` |
| `POST user.openalex.org/me/collections/{id}/entities` | `POST /collections/{id}/members` |
| `DELETE user.openalex.org/me/collections/{id}/entities` (body) | `DELETE /collections/{id}/members?member_ids=` |
| `DELETE user.openalex.org/me/collections/{id}/entities/{id}` | `DELETE /collections/{id}/members/{id}` |

The old routes take the key only as `Authorization: Bearer`, call members
`entity_ids` and `entity_count`, and answer errors as
`{"HTTP_status_code", "error": true, "message", "code"}`.

## Admin endpoints

OpenAlex admins can list, read, edit or delete any user's collection on `https://user.openalex.org`:

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/admin/collections?q=&owner_id=&entity_type=` | Cross-user search, paged |
| `GET` | `/admin/collections/{collection_id}` | Read any collection |
| `PATCH` | `/admin/collections/{collection_id}` | Same body as the user PATCH, plus `user_id` to transfer ownership |
| `DELETE` | `/admin/collections/{collection_id}` | Hard-delete with cascade |

Non-admin callers get `403`.
