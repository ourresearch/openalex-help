---
title: "Versions"
description: "The three version categories OpenAlex reports for a location — published, accepted, and submitted — and what distinguishes them."
tags: ["reference"]
source_id: "41193818736663"
source_url: "https://help.openalex.org/hc/en-us/articles/41193818736663-Paper-version-definitions"
source_updated: "2026-06-13"
---
A single work can exist in several forms — the author's submitted manuscript, the peer-reviewed accepted manuscript, and the publisher's final version of record — often hosted in different places. Each [location](/api/works/) on a work carries a `version` field recording which of these it holds.

OpenAlex uses three version categories, following the [DRIVER Guidelines v2.0](https://wiki.surfnet.nl/display/DRIVERguidelines/DRIVER-VERSION+Mappings) standard, listed here from most to least authoritative:

- **`publishedVersion`** — the version of record, matching what is hosted on the publisher's website. This is the most authoritative version.
- **`acceptedVersion`** — the manuscript after peer review and formal acceptance for publication. It may differ from the version of record in minor ways (spelling, word choice, sentence structure) and typically lacks the publisher's formatting, but its content is essentially interchangeable with the published version for a reasonable reader's purposes.
- **`submittedVersion`** — the manuscript as submitted to the publisher, before peer review. Its content may differ significantly from the final article.

Version is central to open access: the [best OA location](/docs/open-access-oa/) OpenAlex reports for a work prefers the most authoritative freely available version. A work whose only free copy is a `submittedVersion` preprint is treated differently from one with a freely available `publishedVersion`.

If you run an institutional repository, see our [recommendations for version reporting](/docs/recommendation-for-irs-version-reporting/) to help OpenAlex classify your records correctly.
