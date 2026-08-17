---
title: "Overview"
updated: 2026-08-11
description: "Things OpenAlex users mint themselves — collections and curations — rather than things OpenAlex mints."
tags: ["reference"]
---
Almost every entity in OpenAlex is minted by OpenAlex: we create the [works](/data/works/), disambiguate the [authors](/data/authors/), assign the [topics](/data/topics/). **User-created** entities are the exception — things *you* mint.

They matter because they close the loop: OpenAlex builds the map, and users push back on it and build on top of it.

## The user-created entities

- [**Collections**](/data/collections/) — saved sets of entities (a reading list, a department's authors, a corpus for an analysis) that a user assembles and can re-query.
- [**Curations**](/data/curations/) — user-submitted corrections to native entities: fixing an [author profile](/data/authors/#about), correcting an [affiliation](/data/raw-affiliation-strings/), flagging a wrong [open-access status](/data/works/open-access/). A curation records who changed what, when, and its review status, and — once accepted — flows into the entity it corrects.

Because these come from users rather than the pipeline, they don't have an "About" provenance story; instead their pages describe who can create them, what states they move through, and how they feed back into OpenAlex.
