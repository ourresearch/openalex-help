---
title: "Awards Overview"
description: "Schema reference for Awards entities"
tags: ["api"]
source_id: "api-reference/awards"
source_url: "https://developers.openalex.org/api-reference/awards"
source_updated: "2026-02-17"
---
Awards represent research grants and funding awards. They link funders to the works they have funded.

## Filter, sort, and group_by fields

The API supports filtering, sorting, and grouping on awards fields. See [Filtering](/api/filtering/), [Sorting](/api/sorting/), and [Grouping](/api/grouping/) for syntax.

Fields marked **(deprecated)** are `.search` filters — use the [`search` parameter](/api/searching/) instead.

| Field | Sort | Group_by | Filter |
|-------|:----:|:--------:|:------:|
| `amount` | ✓ |  | ✓ |
| `currency` | ✓ | ✓ | ✓ |
| `default.search` **(deprecated)** |  |  | ✓ |
| `description.search` **(deprecated)** |  |  | ✓ |
| `display_name.search` **(deprecated)** |  |  | ✓ |
| `doi` |  |  | ✓ |
| `end_year` | ✓ | ✓ | ✓ |
| `funded_outputs` | ✓ | ✓ | ✓ |
| `funded_outputs_count` | ✓ |  | ✓ |
| `funder.doi` | ✓ | ✓ | ✓ |
| `funder.id` | ✓ | ✓ | ✓ |
| `funder.ror` | ✓ | ✓ | ✓ |
| `funder_award_id` | ✓ | ✓ | ✓ |
| `funder_name` | ✓ | ✓ | ✓ |
| `funder_scheme` |  |  | ✓ |
| `funding_type` | ✓ | ✓ | ✓ |
| `id` | ✓ | ✓ | ✓ |
| `lead_investigator.affiliation.country` | ✓ | ✓ | ✓ |
| `lead_investigator.affiliation.name` |  |  | ✓ |
| `lead_investigator.family_name` |  |  | ✓ |
| `lead_investigator.given_name` |  |  | ✓ |
| `lead_investigator.orcid` | ✓ | ✓ | ✓ |
| `provenance` | ✓ | ✓ | ✓ |
| `start_year` | ✓ | ✓ | ✓ |
