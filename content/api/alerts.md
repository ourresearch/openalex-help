---
title: "Alerts and saved searches"
updated: 2026-10-02
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
curl -X POST https://user.openalex.org/me/saved-searches \
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

All requests go to `https://user.openalex.org` with your [API key](/api/authentication/)
in the `Authorization: Bearer <api_key>` header (a `?api_key=` parameter doesn't work
on this host). Each key acts as its owner: an agent using your key manages your saved
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
| `GET` | `/me/saved-searches` | List your saved searches. |
| `POST` | `/me/saved-searches` | Create a saved search, with or without an alert. |
| `GET` | `/me/saved-searches/{id}` | Get one. |
| `PATCH` | `/me/saved-searches/{id}` | Change any of `name`, `description`, `url`, `alert`. |
| `DELETE` | `/me/saved-searches/{id}` | Delete it and its alert. |

### List

```bash
GET /me/saved-searches?has_alert=true&page=1&per_page=50
```

`has_alert=true` lists only searches with an alert (your alerts); `false`, only those
without. Newest first. `per_page` is at most 100.

```json
{
  "meta": { "count": 3, "page": 1, "per_page": 50 },
  "results": [ { "id": "…", "name": "…", "alert": { "frequency": "weekly", … }, … } ]
}
```

### Create

`POST /me/saved-searches` with:

| Field | Required | Notes |
|---|---|---|
| `url` | yes | The search, as an api.openalex.org or openalex.org URL: `https://api.openalex.org/works?filter=…&search=…`. Your key, paging and `select` are dropped; the filter, search and sort are kept. |
| `name` | yes | |
| `description` | no | |
| `alert` | no | `{ "frequency": "weekly" }` to create the alert at the same time. Omit or `null` for no alert. |

Saving the same search twice returns `409` with code `saved_search_exists` and the
existing search's `id`, so retrying a create is safe. You can have up to 100 saved searches.

### Update

`PATCH /me/saved-searches/{id}` with any of `name`, `description`, `url`, `alert`.
Fields you leave out don't change.

```json
{ "alert": { "frequency": "monthly" } }   // add an alert, or change its frequency
{ "alert": null }                          // turn the alert off, keep the saved search
```

Changing `frequency` keeps the alert's history: the next check is the last check plus the new interval.

### Delete

`DELETE /me/saved-searches/{id}` returns `204 No Content`. The alert goes with it.

## Which searches can have an alert

An alert needs a works search that can gain new works:

| Search | Alert? | `code` when refused |
|---|---|---|
| Works, by filter or search | Yes | |
| Works in a collection of authors, institutions, sources or another type | Yes, while you can read the collection | `collection_not_found_or_not_shared` |
| Works with no filter or search at all | No: it would send every new work | `search_is_empty` |
| Works in a collection of works (`collection:col_…`) | No: a collection of works is a fixed list and never gains new works | `works_collection_cannot_alert` |
| Semantic search (`search.semantic`) | No: it can't be limited to newly added works | `semantic_search_cannot_alert` |
| OQL (`/?oql=…`) | Not yet | `oql_cannot_alert` |
| Authors, sources or any type but works | No: alerts send works | `alert_requires_works_search` |

Every saved search says whether it can have an alert in `cannot_alert`, so check
that before offering one. If a collection in an alert's search is deleted, or its owner
makes it private again, the alert turns off (`alert` becomes `null`) and you get an
email saying which collection.

## Errors

Errors return JSON with a stable `code` to branch on and a `message` to show people:

```json
{
  "error": true,
  "code": "works_collection_cannot_alert",
  "message": "Alerts aren't available for a works collection: it's a fixed list of works, so it never gains new ones. To hear about new works, filter by a collection of authors, institutions or sources instead.",
  "HTTP_status_code": 400
}
```

| Status | `code` | Meaning |
|---|---|---|
| 400 | `invalid_body` | The body isn't a JSON object. |
| 400 | `invalid_url` | `url` isn't an OpenAlex search URL. |
| 400 | `invalid_field` | A field is missing, unknown, the wrong type or too long; `message` names it. |
| 400 | `invalid_frequency` | `frequency` isn't `daily`, `weekly` or `monthly`. |
| 400 | one of the codes in [the table above](#which-searches-can-have-an-alert) | This search can't have an alert. |
| 401 | `unauthorized` | Missing or invalid key. |
| 403 | `too_many_saved_searches` | You have 100 already. |
| 404 | `not_found` | No saved search with that `id` is yours. |
| 409 | `saved_search_exists` | You already saved this search; `existing_id` names it. |

## For agents

- Show the user what an alert will send before creating it: call the search's
  `api_url` with `sort=publication_date:desc` and show a few titles.
- Name the alert after what the user asked for; it's the email's subject line.
- Use `has_alert=true` to answer "what alerts do I have?", and `PATCH` with
  `"alert": null` to stop one without losing the saved search.
- Branch on `code`, never on `message`; messages may change.
