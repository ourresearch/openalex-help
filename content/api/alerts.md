---
title: "Alerts and saved searches"
updated: 2026-10-03
description: "Save a works search and get emailed new works that match it: the API, built for scripts and AI agents"
tags: ["api"]
---
An **alert** emails you new works that match a search, daily, weekly or monthly.
An alert always belongs to a **saved search**: save the search, give it an alert,
and OpenAlex checks it on schedule and emails you what's new since the last email.
Everything you can do on the website (save, rename, turn an alert on or off,
change how often, delete) you can do through this API, so a script or an AI agent
can set up and manage alerts for you.

> [!claude]
> You can do this in conversation: *"Email me every week when new papers on
> microplastics in drinking water come out."* Claude builds the search, shows you a
> sample, and creates the alert. Set up once:
> [Using OpenAlex with an AI assistant](/how-to/ai-assistants/).

## Quick start

Create a saved search with a weekly alert in one request:

```bash
curl -X POST https://api.openalex.org/saved-searches \
  -H "Authorization: Bearer $OPENALEX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Microplastics in drinking water",
    "url": "https://api.openalex.org/works?filter=title_and_abstract.search:microplastic%20AND%20%22drinking%20water%22",
    "alert": { "frequency": "weekly" }
  }'
```

```json
{
  "id": "kwGHZstvJNb9nfZiNAipqw",
  "name": "Microplastics in drinking water",
  "description": "",
  "entity_type": "works",
  "url": "https://openalex.org/works?filter=title_and_abstract.search:microplastic%20AND%20%22drinking%20water%22&id=kwGHZstvJNb9nfZiNAipqw",
  "api_url": "https://api.openalex.org/works?filter=title_and_abstract.search:microplastic%20AND%20%22drinking%20water%22",
  "alert": {
    "frequency": "weekly",
    "last_sent_at": null,
    "next_check_at": "2026-10-09T13:05:00Z"
  },
  "cannot_alert": null,
  "created_at": "2026-10-02T13:05:00Z",
  "updated_at": "2026-10-02T13:05:00Z"
}
```

The response is `201 Created` with a `Location` header pointing at the new saved search.
The first email covers works added to OpenAlex after you created the alert.

## Authentication

All requests go to `https://api.openalex.org` with your [API key](/api/authentication/),
as `?api_key=` or an `Authorization: Bearer <api_key>` header. Managing saved searches
and alerts costs no credits. Each key acts as its owner: an agent using your key manages your saved
searches and alerts, and emails go to your account's address. Organization keys can't
own saved searches; use a personal key.

## The saved search object

| Field | Type | Notes |
|---|---|---|
| `id` | string | Assigned by OpenAlex. |
| `name` | string | 1 to 400 characters. Used as the alert email's subject. |
| `description` | string | Up to 400 characters. May be empty. |
| `entity_type` | string | What the search returns, from its URL: `works`, `authors`, `sources` and so on. Only `works` searches can have an alert. |
| `url` | string | The search on openalex.org. Open it to see the results in the website. |
| `api_url` | string | The same search on api.openalex.org, without your key. Call it to see what the search matches today. |
| `alert` | object or `null` | `null` means no alert. See below. |
| `cannot_alert` | object or `null` | Why this search can't have an alert, as `{ "code", "message" }`, or `null` if it can. |
| `created_at`, `updated_at` | string | ISO 8601, UTC. |

The `alert` object:

| Field | Type | Notes |
|---|---|---|
| `frequency` | string | `daily`, `weekly` or `monthly`. |
| `last_sent_at` | string or `null` | When the last email went out. `null` until the first one. An alert sends only when there are new works, so a quiet search can go a long time without one. |
| `next_check_at` | string | When OpenAlex next looks for new works. |

## Endpoints

| Method | Path | Does |
|---|---|---|
| `GET` | `/saved-searches` | List your saved searches. |
| `POST` | `/saved-searches` | Create a saved search, with or without an alert. |
| `GET` | `/saved-searches/{id}` | Get one. |
| `PATCH` | `/saved-searches/{id}` | Change any of `name`, `description`, `url`, `alert`. |
| `DELETE` | `/saved-searches/{id}` | Delete it and its alert. |

These first lived at `https://user.openalex.org/me/saved-searches`, which still works
(Bearer header only there) but is deprecated.

### List

```bash
GET /saved-searches?has_alert=true&page=1&per_page=50
```

`has_alert=true` lists only searches with an alert (your alerts); `false`, only those
without. Newest first. `per_page` defaults to 25 and is at most 100.

```json
{
  "meta": { "count": 3, "page": 1, "per_page": 50 },
  "results": [ { "id": "…", "name": "…", "alert": { "frequency": "weekly", … }, … } ]
}
```

### Create

`POST /saved-searches` with:

| Field | Required | Notes |
|---|---|---|
| `url` | yes | The search, as an api.openalex.org or openalex.org URL: `https://api.openalex.org/works?filter=…&search=…`, or an OQL query, `https://api.openalex.org/?oql=works where …`. Your key, paging and `select` are dropped; the filter, search and sort are kept. The `url` and `api_url` you get back are normalized (re-encoded), so don't compare them to what you sent as strings. |
| `name` | yes | |
| `description` | no | |
| `alert` | no | `{ "frequency": "weekly" }` to create the alert at the same time; `frequency` is required inside it (`daily`, `weekly` or `monthly`, any case). Omit or `null` for no alert. |

Saving the same search twice returns `409` with code `saved_search_exists` and the
existing search's id in `existing_id`; the order of parameters, paging and sort don't
make two searches different. So retrying a create is safe, but a `409` doesn't mean
your alert exists: the earlier save may have had none. After a `409`, `PATCH` the
`existing_id` with the `alert` you wanted. You can have up to 100 saved searches.

### Update

`PATCH /saved-searches/{id}` with any of `name`, `description`, `url`, `alert`.
Fields you leave out don't change.

```json
{ "alert": { "frequency": "monthly" } }   // add an alert, or change its frequency
{ "alert": null }                          // turn the alert off, keep the saved search
```

Changing `frequency` keeps the alert's history: the next check is the last check plus
the new interval. Turning an alert on for a search saved earlier makes its first email
cover works added since the search was saved (or since its last email); an alert
created together with its search starts from now.

### Delete

`DELETE /saved-searches/{id}` returns `204 No Content`. The alert goes with it.

## Which searches can have an alert

An alert needs a works search that can gain new works:

| Search | Alert? | `code` when refused |
|---|---|---|
| Works, by filter or search | Yes | |
| Works in a collection of authors, institutions, sources or another type | Yes, while you can read the collection | `collection_not_found` |
| `collection:` with a collection that isn't of works | No: `collection:` takes only collections of works; use the field for that type (below) | `collection_type_mismatch` |
| Works with no filter or search at all | No: it would send every new work | `search_is_empty` |
| Works in a collection of works (`collection:col_…`) | No: a collection of works is a fixed list and never gains new works | `works_collection_cannot_alert` |
| Semantic search (`search.semantic`, or OQL `is similar to`) | No: it can't be limited to newly added works | `semantic_search_cannot_alert` |
| OQL (`https://api.openalex.org/?oql=works where …`) | Yes, if it returns works | `alert_requires_works_search` |
| Authors, sources or any type but works | No: alerts send works | `alert_requires_works_search` |

To alert on works from a collection of something other than works, filter by that
type's field with the collection's id as the value:

| Collection of | Filter |
|---|---|
| Authors | `authorships.author.id:col_…` |
| Institutions | `authorships.institutions.lineage:col_…` (the institution and its parts) |
| Sources (journals, repositories) | `primary_location.source.id:col_…` |
| Publishers | `primary_location.source.publisher_lineage:col_…` |
| Funders | `funders.id:col_…` |
| Topics | `topics.id:col_…` |

For example `https://api.openalex.org/works?filter=authorships.institutions.lineage:col_abc123`.
See [Collections](/api/collections/#filtering-by-a-collection-on-a-related-entity) for every field.

Every saved search says whether it can have an alert in `cannot_alert`, so check
that before offering one. If a collection in an alert's search is deleted, or its owner
makes it private again, the alert turns off (`alert` becomes `null`) and you get an
email saying which collection.

## Errors

Errors return JSON with a stable `code` to branch on, a `message` to show people,
and `error`, a short title for the HTTP status (the same shape as api.openalex.org):

```json
{
  "error": "Bad Request",
  "code": "works_collection_cannot_alert",
  "message": "Alerts aren't available for a works collection: it's a fixed list of works, so it never gains new ones. To hear about new works, filter by a collection of authors, institutions or sources instead."
}
```

| Status | `code` | Meaning |
|---|---|---|
| 400 | `invalid_body` | The body isn't a JSON object. |
| 400 | `invalid_url` | `url` isn't an OpenAlex search URL. |
| 400 | `invalid_field` | A field is missing, unknown, the wrong type or too long; `message` names it. |
| 400 | `invalid_frequency` | `alert.frequency` is missing or isn't `daily`, `weekly` or `monthly`. |
| 400 | one of the codes in [the table above](#which-searches-can-have-an-alert) | This search can't have an alert. |
| 401 | `unauthorized` | Missing or invalid key. |
| 403 | `too_many_saved_searches` | You have 100 already. |
| 404 | `not_found` | No saved search with that `id` is yours. |
| 409 | `saved_search_exists` | You already saved this search; `existing_id` names it. |

## For agents

- Check what the user already has first (`GET /saved-searches?has_alert=true`): the
  same topic written another way is a different search to the API.
- Show the user what an alert will send before creating it: call the search's
  `api_url` with your key and `sort=publication_date:desc`, and show a few titles. (A
  search on a private collection matches nothing without the owner's key.)
- Name the alert after what the user asked for; it's the email's subject line.
- Use `has_alert=true` to answer "what alerts do I have?", and `PATCH` with
  `"alert": null` to stop one without losing the saved search.
- Branch on `code`, never on `message`; messages may change.
