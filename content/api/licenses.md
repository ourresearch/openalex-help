---
title: "Licenses Overview"
description: "All license values in OpenAlex"
tags: ["api"]
source_id: "api-reference/licenses"
source_url: "https://developers.openalex.org/api-reference/licenses"
source_updated: "2026-04-26"
---
Licenses describe the terms under which open access works are available. They are assigned to individual work locations.

## Values

| ID | Display name |
|----|-------------|
| `apache-2-0` | Apache License 2.0 |
| `cc-by` | CC BY |
| `cc-by-nc` | CC BY-NC |
| `cc-by-nc-nd` | CC BY-NC-ND |
| `cc-by-nc-sa` | CC BY-NC-SA |
| `cc-by-nd` | CC BY-ND |
| `cc-by-sa` | CC BY-SA |
| `gpl-v2` | GNU GPLv2 |
| `gpl-v3` | GNU GPLv3 |
| `isc` | ISC License |
| `mit` | MIT |
| `other-oa` | other open access |
| `public-domain` | public domain (CC0) |

Use these values with the `license` filter on works: `filter=primary_location.license:cc-by`
