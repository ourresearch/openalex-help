---
title: "Institution types"
description: "The controlled vocabulary of institution types — education, healthcare, company, government, and more — what each value means, and how to filter works by the type of affiliated institution."
tags: ["reference"]
entity:
  example: "institution-types/education"
  api: "institution-types"
  linksTo:
    - "institutions"
---
An **institution type** classifies the kind of organization: a university (`education`), a hospital (`healthcare`), a `company`, a `government` agency, and so on. Every [institution](/data/institutions/) has exactly one type, exposed as its `type` field, chosen from the short controlled vocabulary below. Because an organization's kind already exists crisply in the real world, institution types are a [vocabulary entity](/data/vocabulary/): OpenAlex doesn't adjudicate what an institution *is*, it just standardizes the label so you can filter and group by it reliably. Institution types use short, human-readable IDs (`education`, `company`) rather than the minted `W`/`A`/`S` scheme; a type's full ID looks like `https://openalex.org/institution-types/education`.

## How it's made

The vocabulary is derived directly from [ROR](https://ror.org/), the Research Organization Registry, which assigns each organization a type. OpenAlex adopts ROR's type for each [institution](/data/institutions/), mapping onto the fixed list below (with an `other` bucket for organizations that don't fit ROR's standard categories). We don't decide the boundary between an education and a healthcare institution; we standardize the label from the ROR standard. See the [Institutions guide](/data/institutions/) for more.

## Values

The complete controlled vocabulary (live from [`api.openalex.org/institution-types`](https://api.openalex.org/institution-types)). The `display_name` for each type is identical to its ID.

| ID | Definition |
|----|------------|
| `education` | Universities, colleges, and medical schools that educate and employ researchers (e.g., Harvard, Oxford). |
| `healthcare` | Hospitals and medical centers like Mass General and Johns Hopkins Medicine — not medical schools. |
| `company` | For-profit companies involved in research, from Google to small biotech firms. |
| `archive` | Museums, libraries, and zoos that steward research and cultural heritage materials. |
| `nonprofit` | Non-governmental organizations like the Max Planck Society that conduct or fund research. |
| `government` | Government agencies that conduct or fund research, like CNRS or the U.S. Geological Survey. |
| `facility` | Specialized research facilities like national laboratories, telescopes, and particle accelerators. |
| `other` | Organizations like university presses that don't fit the standard ROR categories. |

## Attributes

Each institution type is a small object. Attributes shared with other entities are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/overview/#the-openalex-id-scheme) for this type, e.g. `https://openalex.org/institution-types/education`. See [Common attributes](/data/common-attributes/#id).

### `display_name`
*String.* The human-readable name of the type — identical to the ID's final segment (`education`, `company`). See [Common attributes](/data/common-attributes/#display_name).

### `description`
*String.* A one-line definition of the type (the same text shown in the [Values](#values) table above).

### `works_count`
*Integer.* How many [works](/data/works/) have an affiliated institution of this type. See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations across all works affiliated with an institution of this type. See [Common attributes](/data/common-attributes/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL listing every work affiliated with an institution of this type, e.g. `https://api.openalex.org/works?filter=authorships.institutions.type:education`.

### `created_date`
*String.* The date this type was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to this type object. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The institution-types endpoint is at [`api.openalex.org/institution-types`](https://api.openalex.org/institution-types); fetch a single type by ID at [`/institution-types/education`](https://api.openalex.org/institution-types/education). To filter [institutions](/data/institutions/) themselves by type, use [`filter=type:education`](https://api.openalex.org/institutions?filter=type:education) on the institutions endpoint. To filter [works](/data/works/) by the type of an affiliated institution, filter through the authorships: [`filter=authorships.institutions.type:company`](https://api.openalex.org/works?filter=authorships.institutions.type:company). See [Filtering](/api/filtering/) for filter syntax and the [endpoints index](/api/endpoints/) for all endpoints.
