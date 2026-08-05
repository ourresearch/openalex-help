---
title: "Component entities"
description: "Parts of a work — authorships, locations, raw affiliation strings — that OpenAlex models richly but doesn't give their own OpenAlex IDs."
tags: ["reference"]
---
**Component** entities are structured *parts of a work* that OpenAlex models in detail but doesn't give their own OpenAlex IDs. They don't stand alone: you never fetch one directly or filter a `/component/` endpoint — they appear *inside* a [work](/entities/works/) object, and you reach them by selecting the field that holds them.

They sit between [native entities](/entities/native/) (which get minted IDs and are curatable) and [vocabulary](/entities/vocabulary/) (fixed controlled lists). A component is real and richly structured, but it's meaningful only in the context of its work.

## The component entities

- [**Authorships**](/entities/authorships/) — the join between a work and its authors: for each author, their raw name as printed, their position, whether they're corresponding, and the institutions they listed. Lives in `work.authorships`.
- [**Locations**](/entities/locations/) — each place a version of the work is available (the publisher's site, a repository, a preprint server), with its version, license, and open-access status. Lives in `work.locations` / `primary_location` / `best_oa_location`.
- [**Raw affiliation strings**](/entities/raw-affiliation-strings/) — the exact affiliation text an author printed on a work, before OpenAlex matches it to an [institution](/entities/institutions/). The raw input to institution disambiguation.

Because components carry much of a work's richest metadata, their fields are documented on their own pages here rather than crammed into the [works field dictionary](/entities/works/#fields).
