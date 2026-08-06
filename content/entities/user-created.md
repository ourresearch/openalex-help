---
title: "Overview"
description: "Things OpenAlex users mint themselves — collections and curations — rather than things OpenAlex mints."
tags: ["reference"]
---
Almost every entity in OpenAlex is minted by OpenAlex: we create the [works](/entities/works/), disambiguate the [authors](/entities/authors/), assign the [topics](/entities/topics/). **User-created** entities are the exception — things *you* mint.

They matter because they close the loop: OpenAlex builds the map, and users push back on it and build on top of it.

## The user-created entities

- [**Collections**](/entities/collections/) — saved sets of entities (a reading list, a department's authors, a corpus for an analysis) that a user assembles and can re-query.
- [**Curations**](/entities/curations/) — user-submitted corrections to native entities: fixing an [author profile](/entities/authors/#how-we-build-it), correcting an [affiliation](/entities/raw-affiliation-strings/), flagging a wrong [open-access status](/entities/works/). A curation records who changed what, when, and its review status, and — once accepted — flows into the entity it corrects.

Because these come from users rather than the pipeline, they don't have a "How we build it" provenance story; instead their pages describe who can create them, what states they move through, and how they feed back into OpenAlex.
