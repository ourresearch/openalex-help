---
title: "Overview"
updated: 2026-11-16
description: "Parts of a work — authorships, locations, links, raw affiliation strings — that OpenAlex models richly but doesn't give their own OpenAlex IDs."
tags: ["reference"]
---
**Component** entities are structured *parts of a work* that OpenAlex models in detail but doesn't give their own OpenAlex IDs. They aren't full citizens of the [entity galaxy](/data/): a component has no minted ID, and you'll normally meet one *inside* a [work](/data/works/) object, by selecting the field that holds it.

But "no ID" no longer means "no endpoint." Three of the four components now have their own top-level list endpoints you can page and filter directly — [`/locations`](https://api.openalex.org/locations), [`/links`](https://api.openalex.org/links?filter=origin:W2741809807) and [`/raw-affiliation-strings`](https://api.openalex.org/raw-affiliation-strings) — and an authorships endpoint is on the way. These are views over the same work-embedded data, not a promotion to native status: the rows carry namespaced handles (`doi:…`, `pmh:…`) or none at all rather than minted OpenAlex IDs, and are still defined only in relation to their work.

Components sit between [native entities](/data/native/) (which get minted IDs and are curatable) and [vocabulary](/data/vocabulary/) (fixed controlled lists). A component is real and richly structured, but it's meaningful only in the context of its work.

## The component entities

- [**Authorships**](/data/authorships/) — the join between a work and its authors: for each author, their raw name as printed, their position, whether they're corresponding, and the institutions they listed. Lives in `work.authorships`; a standalone authorships endpoint is on the way.
- [**Locations**](/data/locations/) — each place a version of the work is available (the publisher's site, a repository, a preprint server), with its version, license, and open-access status. Lives in `work.locations` / `primary_location` / `best_oa_location`, and also has a standalone [`/locations`](https://api.openalex.org/locations) endpoint you can filter, search, and group, with each copy fetchable at `/locations/{id}`.
- [**Links**](/data/links/) — the links between a work and other works: the works it cites, and the works it is part of (a chapter's book, a figure's paper). Read from `work.referenced_works` and `work.parent_works`, and listed from either side at [`/links`](https://api.openalex.org/links?filter=target:W2741809807), one work at a time.
- [**Raw affiliation strings**](/data/raw-affiliation-strings/) — the exact affiliation text an author printed on a work, before OpenAlex matches it to an [institution](/data/institutions/). The raw input to institution disambiguation; also queryable directly at [`/raw-affiliation-strings`](https://api.openalex.org/raw-affiliation-strings).

Because components carry much of a work's richest metadata, their fields are documented on their own pages here rather than crammed into the [works attribute dictionary](/data/works/attributes/).
