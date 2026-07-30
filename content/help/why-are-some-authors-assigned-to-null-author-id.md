---
title: "Why are some authors assigned to \"NULL AUTHOR_ID\" (A9999999999)?"
description: "A9999999999 is the NULL author — authorships that didn't go through disambiguation. Here's when it's used."
tags: ["data"]
source_id: "28763618477975"
source_url: "https://help.openalex.org/hc/en-us/articles/28763618477975-Why-are-some-authors-assigned-to-NULL-AUTHOR-ID-A9999999999"
source_updated: "2024-12-25"
---
`A9999999999` is the **NULL author** — a single catch-all ID for authorships that didn't go through OpenAlex's disambiguation process. You'll most often see it in the [data snapshot](/docs/bulk-data/).

An authorship lands here when:

- no author name was received from the source,
- the name was too short or too long to disambiguate reliably,
- the name matched an ignored phrase (like "Unknown Author"), or
- the author asked to have their disambiguated profile removed (all their works are reassigned to NULL, removing the profile).

There's a second special ID, `A5317838346`, for **deleted authors** — used when an author ID is removed because it no longer has any works.

For the full explanation of how OpenAlex assigns author IDs, see [Author disambiguation](/docs/author-disambiguation/) in the docs.
