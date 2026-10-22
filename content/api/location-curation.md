---
title: "Location Curation"
updated: 2026-10-22
description: "Correct the open-access fields on a work's locations: is_oa, pdf_url and license."
tags: ["api"]
synonyms: ["open access curation", "oa curation", "pdf_url curation", "license curation"]
---
Each [work](/data/works/) has one or more [locations](/data/locations/): the places where a copy of it can be found.
Location curation corrects three fields on one location: `is_oa`, `pdf_url` and `license`.
It is open to site-wide curators only; anyone else can report an open-access error [by ticket](/access/fixing-errors/works/#wrong-open-access-status).

## What you can curate

| `property` | `action`  | `value`                          |
| ---------- | --------- | -------------------------------- |
| `is_oa`    | `replace` | `"true"` or `"false"`            |
| `pdf_url`  | `replace` | An `http` or `https` URL         |
| `license`  | `replace` | A valid open license (see below) |
| `license`  | `remove`  | The license being removed        |

The valid open licenses are `cc-by`, `cc-by-sa`, `cc-by-nd`, `cc-by-nc`, `cc-by-nc-sa`, `cc-by-nc-nd`, `public-domain`, `other-oa` and `mit` (see [Licenses](/data/licenses/)). Publisher-specific licenses (`publisher-specific-oa`) don't count.

A `pdf_url` is never removed.

Open-access status (`oa_status`: `diamond`, `gold`, `green`, `hybrid`, `bronze` or `closed`) can't be curated. It is derived from the license, the host type and `is_oa`, and a curation of it gets a `400`.

## Finding the location id

The `entity_id` is the location's [`id`](/data/locations/#id), exactly as the API shows it, for example `doi:10.1177/2516602619833219` or `pmh:oai:HAL:hal-04048618v1`. Ids are case-sensitive; copy them verbatim. To look one up:

```bash
GET https://api.openalex.org/locations/doi:10.1177/2516602619833219
```

An id OpenAlex doesn't know gets a `400`. If OpenAlex can't be reached to check the id, the response is a `503`.

## Submitting a curation

Submit curations to:

```bash
POST https://user.openalex.org/curations
```

The endpoint accepts a single JSON object or an array of objects.

Requests are authenticated with your [API key](/api/authentication/), passed as an `Authorization: Bearer <api_key>` header.

### Set is_oa

If location `doi:10.1177/2516602619833219` is paywalled:

```json
{
  "entity": "locations",
  "entity_id": "doi:10.1177/2516602619833219",
  "property": "is_oa",
  "action": "replace",
  "value": "false"
}
```

`value` is the string `"true"` or `"false"`.

### Set pdf_url

"The PDF for location `pmh:oai:HAL:hal-04048618v1` is at `https://hal.science/hal-04048618v1/document`."

```json
{
  "entity": "locations",
  "entity_id": "pmh:oai:HAL:hal-04048618v1",
  "property": "pdf_url",
  "action": "replace",
  "value": "https://hal.science/hal-04048618v1/document"
}
```

A `pdf_url` is where the PDF is. It doesn't mean the location is open: the PDF may need payment, and a location can have a `pdf_url` and `is_oa: false`. We change a `pdf_url` only when given a working one.

### Set or remove license

If location `doi:10.1177/2516602619833219` is available under CC BY:

```json
{
  "entity": "locations",
  "entity_id": "doi:10.1177/2516602619833219",
  "property": "license",
  "action": "replace",
  "value": "cc-by"
}
```

To remove a license, use `remove`. `value` is still the license, the one being removed:

```json
{
  "entity": "locations",
  "entity_id": "pmh:oai:HAL:hal-04048618v1",
  "property": "license",
  "action": "remove",
  "value": "other-oa"
}
```

## License and is_oa

`is_oa` and `pdf_url` are curated independently: curating one never changes the other.

License and `is_oa` are the one pair that depend on each other, and the API handles it:

- Setting `is_oa` to `false` on a location that has a license also creates a curation removing the license.
- Adding a valid open license to a location that isn't open also creates a curation setting `is_oa` to `true`.

The second curation is a **twin**. Its submitter is the first curation: its `caused_by` field holds the first curation's `id`, and its `user_id` is null. Both are saved in the same request and applied together.

A successful request returns `201` with the saved curation, and the twin, if there is one, under `twin`. In the array form, each item carries its own `twin`. Every curation has a `caused_by` field, null unless it's a twin.

Setting `is_oa` to `false` on a location whose license is `other-oa`:

```json
{
  "id": "cur-4Hq8ZmVbN2sTcW",
  "user_id": "usr-abc123",
  "user_name": "Casey M",
  "caused_by": null,
  "entity": "locations",
  "entity_id": "pmh:oai:HAL:hal-04048618v1",
  "property": "is_oa",
  "value": "false",
  "action": "replace",
  "created": "2026-10-22T12:34:56Z",
  "is_applied": false,
  "applied_at": null,
  "twin": {
    "id": "cur-7Kp2XcRdM5wQhB",
    "user_id": null,
    "user_name": null,
    "caused_by": "cur-4Hq8ZmVbN2sTcW",
    "entity": "locations",
    "entity_id": "pmh:oai:HAL:hal-04048618v1",
    "property": "license",
    "value": "other-oa",
    "action": "remove",
    "created": "2026-10-22T12:34:56Z",
    "is_applied": false,
    "applied_at": null
  }
}
```

## Several curations on one field

The last one wins, per field on each location.

Submitting exactly what the newest curation on that field already says returns that curation instead of a new one. If the live location already has the value, the response is `200` with `{"skipped": true, "reason": "..."}`.

## Undoing a curation

Location curations are never deleted: `DELETE /curations/<id>` on one returns `400`. To undo a curation, submit a new one.

## When changes appear

Location curations are applied in the nightly build. The change shows in the API the next day.
