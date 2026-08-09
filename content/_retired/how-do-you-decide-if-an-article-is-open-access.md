---
title: "How do you decide whether an article is open access?"
description: "A quick answer to how OpenAlex determines a work's open-access status."
tags: ["open access"]
synonyms: ["open access", "oa status", "is it free to read", "gold green bronze"]
canonical: /data/works/open-access/
---
OpenAlex calls a work **open access** when a free-to-read full text of it exists somewhere the public can reach without paying or logging in — whether that's on the publisher's site or in a repository. That's a deliberately broad definition, so a work counts as OA even if the free copy lives somewhere other than the journal.

Every work carries an [`open_access`](/data/works/attributes/#open_access) object with an `is_oa` flag and an `oa_status` color: `diamond` and `gold` (free in a fully-OA journal), `hybrid` (free under an open license in an otherwise paywalled journal), `green` (a free repository copy exists), `bronze` (free on the publisher page but with no clear license), or `closed`. The status depends both on the work and on the journal it appeared in, which is why the same paper can be labeled differently across databases.

For how the statuses are defined, how "best" free copies are chosen, and how licenses factor in, see [Open access](/data/works/open-access/).
