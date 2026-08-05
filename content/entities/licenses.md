---
title: "Licenses"
description: "The licenses an open-access work location can carry, the fields on a license object, and how to filter works by license."
tags: ["reference"]
source_id: "api-reference/licenses"
source_url: "https://developers.openalex.org/api-reference/licenses"
source_updated: "2026-04-26"
---
A **license** describes the terms under which an open-access copy of a work may be reused — `cc-by`, `cc-by-nc-nd`, `public-domain`, and so on. Licenses are a [vocabulary](/entities/vocabulary/): OpenAlex doesn't invent the concept of a CC-BY license, it just attaches a consistent handle to each recognized one. A license is a property of a [location](/entities/locations/) (each copy of a work can have its own license), so you'll see a license on a work's [`primary_location`](/entities/works/#primary_location) and in its [`locations`](/entities/works/#locations). A license's OpenAlex ID looks like `https://openalex.org/licenses/cc-by`; fetch one at [`api.openalex.org/licenses/cc-by`](https://api.openalex.org/licenses/cc-by).

## How we build it

The list is the set of licenses OpenAlex recognizes: the [Creative Commons](https://creativecommons.org/) suite (CC-BY and its variants, plus CC0 / public domain), a handful of common software/open-source licenses (MIT, Apache 2.0, GPL, ISC), and two catch-alls (`other-oa`, `publisher-specific-oa`) for openly-readable copies whose exact terms we can't pin to a specific license. There are 14 licenses.

## Values

The complete list of all 14 licenses:

| ID | Display name | Terms |
|----|--------------|-------|
| `cc-by` | CC-BY | Reuse with credit, including commercial use |
| `cc-by-sa` | CC-BY-SA | Reuse with credit; adaptations keep the same license |
| `cc-by-nd` | CC-BY-ND | Sharing with credit, no adaptations |
| `cc-by-nc` | CC-BY-NC | Reuse with credit, non-commercial only |
| `cc-by-nc-sa` | CC-BY-NC-SA | Non-commercial reuse with credit; adaptations keep the same license |
| `cc-by-nc-nd` | CC-BY-NC-ND | Sharing with credit, no commercial use, no adaptations |
| `public-domain` | public domain (CC0) | No rights reserved |
| `mit` | MIT | Permissive; preserve copyright notice |
| `apache-2-0` | Apache License 2.0 | Permissive; copyright notices + patent grant |
| `gpl-v2` | GNU GPLv2 | Copyleft |
| `gpl-v3` | GNU GPLv3 | Copyleft; modified versions stay open under the same terms |
| `isc` | ISC License | Permissive; equivalent to MIT / BSD 2-Clause |
| `other-oa` | other open access | Looks open, but we don't have the specific license listed |
| `publisher-specific-oa` | publisher specific open access | Open access under a publisher-specific license |

The live list is at [`api.openalex.org/licenses`](https://api.openalex.org/licenses).

## Fields

The top-level fields on a **license** object. Fields shared with other entities ([`id`](/entities/common-fields/#id), [`display_name`](/entities/common-fields/#display_name), [`works_count`](/entities/common-fields/#works_count), [`cited_by_count`](/entities/common-fields/#cited_by_count), [`created_date`](/entities/common-fields/#created_date), [`updated_date`](/entities/common-fields/#updated_date)) are documented once on [Common fields](/entities/common-fields/).

### `id`
*String.* The [OpenAlex ID](/entities/overview/#the-openalex-id-scheme) for this license, e.g. `https://openalex.org/licenses/cc-by`. See [Common fields](/entities/common-fields/#id).

### `display_name`
*String.* The license's name, e.g. `CC-BY`. See [Common fields](/entities/common-fields/#display_name).

### `url`
*String.* A link to the canonical license text (a [Creative Commons](https://creativecommons.org/) deed or an [SPDX](https://spdx.org/licenses/) page), or null for the catch-all licenses that have no single URL.

### `description`
*String.* A short plain-language summary of the reuse terms.

### `works_count`
*Integer.* How many works have a location under this license. See [Common fields](/entities/common-fields/#works_count).

### `cited_by_count`
*Integer.* Total citations across those works. See [Common fields](/entities/common-fields/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works](/entities/works/) API URL for every work with a location under this license (`filter=locations.license_id:licenses/<ID>`).

### `created_date`
*String.* When the license record was added to OpenAlex (`YYYY-MM-DD`). See [Common fields](/entities/common-fields/#created_date).

### `updated_date`
*String.* When the license record last changed. See [Common fields](/entities/common-fields/#updated_date).

## In the API

The Licenses endpoint is at [`api.openalex.org/licenses`](https://api.openalex.org/licenses). Fetch one by ID — [`/licenses/cc-by`](https://api.openalex.org/licenses/cc-by) — or list them all.

Licenses are most useful as a filter on [works](/entities/works/), keyed to a [location](/entities/locations/): `filter=primary_location.license:cc-by` matches works whose best copy is CC-BY, `filter=locations.license:cc-by` matches works with *any* CC-BY copy, and `group_by=primary_location.license` breaks a result set down by license. See [Filtering](/api/filtering/) for the full syntax and the [endpoints index](/api/endpoints/) for every endpoint.
