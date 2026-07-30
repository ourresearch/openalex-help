---
title: "Sources"
description: "What sources are in OpenAlex — journals, repositories, conferences, and more — how works link to them through locations, and the curated source lists you can filter by."
tags: ["reference"]
source_id: "24347057529623"
source_url: "https://help.openalex.org/hc/en-us/articles/24347057529623-Sources-in-OpenAlex"
source_updated: "2024-07-26"
---
Sources are where works live: the journals, repositories, conference proceedings, ebook platforms, and book series that host scholarly output. OpenAlex tracks about 255,000 sources; roughly 80% are journals, with repositories, conferences, and book series making up most of the rest.

## Sources and works: locations

A work connects to sources through its **locations**. Many works exist in more than one place — published in a journal, with another copy deposited in a repository. OpenAlex records all of these versions, and designates one location holding the work's [version of record](https://en.wikipedia.org/wiki/Version_of_record) as the **primary location** — typically the version accepted and published by a journal. See [Versions](/docs/versions/) for how versions are modeled, and the [Works API reference](/api/works/) for the location object itself.

## Source types

Every source carries a `type`:

| Type | What it is |
|---|---|
| `journal` | Peer-reviewed serials — the large majority of sources |
| `repository` | OA repositories like arXiv or institutional repositories |
| `conference` | Conference proceedings series |
| `ebook platform` | Book-hosting platforms |
| `book series` | Serial book publications |
| `metadata` | Metadata-only sources |
| `other` | Everything else |

## Curated source lists

OpenAlex [deliberately does not impose a quality bar](/docs/journal-quality/) on which sources it indexes. Instead, it carries flags for membership in externally curated **allow lists**, so you can narrow to trusted sources when your analysis calls for it:

- **`is_in_doaj`** — the source is indexed in the [Directory of Open Access Journals](https://doaj.org/), which vets the legitimacy of fully-OA journals. About 23,000 sources.
- **`is_core`** — the source is on the [CWTS Core sources list](https://zenodo.org/records/13879982) (about 36,000 sources). See below.

## CWTS Core sources

The [Centre for Science and Technology Studies](https://www.cwts.nl/) (CWTS) at Leiden University maintains the **Core sources** list: the subset of OpenAlex sources included in their [Leiden Ranking Open Edition](https://open.leidenranking.com/). Filtering works by [`primary_location.source.is_core`](https://openalex.org/works?page=1&filter=primary_location.source.is_core%3Atrue) returns only publications from those sources — letting you explore the data underlying the rankings, or negate the filter to see what the rankings exclude.

CWTS Core is **not** the same thing as the [Web of Science Core Collection](https://webofscience.help.clarivate.com/Content/wos-core-collection/wos-core-collection.htm), a selective journal list maintained by [Clarivate](https://clarivate.com/). The similar names are coincidence; the lists have different maintainers, criteria, and contents.

## Related pages

- [Journal quality & OA status](/docs/journal-quality/) — inclusion philosophy, fully-OA determination, and APC data
- [Sources API reference](/api/sources/) — the Source object and its filters
- [How do I find the OpenAlex Source ID?](/help/how-do-i-find-the-openalex-source-id/)
