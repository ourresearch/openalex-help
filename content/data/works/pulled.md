---
title: "Pulled works"
updated: 2026-11-17
description: "A work is pulled when its publisher, host or authors retracted, withdrew or removed it. OpenAlex keeps pulled works, marks them with is_pulled, and leaves them out of lists, searches and counts unless you add include_pulled=true."
tags: ["reference"]
synonyms: ["retracted", "retraction", "retracted works", "withdrawn", "withdrawal", "removed", "pulled", "is_pulled", "include_pulled", "is_retracted", "retraction watch"]
---
A work is **pulled** when its publisher, its host (a journal, preprint server or repository) or its authors retracted, withdrew or removed it. OpenAlex keeps every pulled work and marks it with [`is_pulled`](/data/works/attributes/#is_pulled). "Pulled" reports what someone else did to the work. It is not our judgment of the research. About 118,000 works are pulled.

> **Starting Thursday 19 November 2026.** The `is_pulled` field is live now; the default described here starts on the 19th. Until then, pulled works still show in lists and counts.

> **The one thing to know:** pulled works are left out of works lists, searches and counts by default. Add `include_pulled=true` to bring them back. Looking a work up by its ID or DOI always answers, with `is_pulled` showing.

## What counts

| Pulled | Not pulled |
|---|---|
| Retracted works ([`is_retracted`](/data/works/attributes/#is_retracted)) | Corrections, errata and addenda |
| Works the publisher withdrew or removed, as its Crossref record says | Expressions of concern |
| Preprints and repository records their host marks withdrawn or removed ("WITHDRAWN:", "Removed due to policy violations") | Partial retractions |
| | A retract-and-replace: the corrected version stands |
| | A Cochrane review withdrawn because it is out of date |

The last two need a word. Retraction Watch records a retract-and-replace, and a Cochrane review withdrawn as out of date, as retractions, so a few hundred of these works read `is_retracted: true` but `is_pulled: false`. A Cochrane review withdrawn for a problem with the review itself (unreliable data, misconduct) is pulled.

## Left out by default

Pulled works are the third rule of the default view, beside the [expansion corpus and pieces of other works](/data/works/corpus/). Nothing is deleted:

```bash
# The default view: pulled works left out
curl "https://api.openalex.org/works?search=ivermectin"

# Pulled works brought back
curl "https://api.openalex.org/works?search=ivermectin&include_pulled=true"

# Only the pulled works
curl "https://api.openalex.org/works?filter=is_pulled:true&include_pulled=true"
```

A filter or `group_by` that names `is_pulled` or `is_retracted` asks about pulled works, so it brings them back too, exactly as if you had added `include_pulled=true`. `include_pulled=false` keeps them out even then.

So `filter=is_retracted:false` no longer means "the default view without retracted works". It means every work that isn't retracted, withdrawn ones included. To leave pulled works out, add nothing.

In [OQL](/access/oql/), the word is `pulled`, like `retracted`: `get pulled works about ivermectin`, `get the percent pulled of works in [Heliyon](S2898612692) by year`. A query that names `pulled` or `retracted` (in a condition, a split or a percent) counts the pulled works. The website and the [AI agent connector](/access/connector/) follow the same default.

## Counts on authors, journals and institutions

Pulled works still count toward an author's, journal's or institution's [`works_count`](/data/common-attributes/#works_count), `cited_by_count`, h-index and i10-index. A list of an author's works leaves them out, so the list can come out shorter than `works_count`. This may change later.

## Where the flag comes from

- **Crossref:** a retraction, withdrawal or removal the publisher deposits on the work's record or in a notice that names it.
- **[Retraction Watch](https://doi.org/10.13003/c23rw1d9):** works it lists as retracted and never reinstated, read every day.
- **PubMed:** retractions it records.
- **The work's own title:** a stamp such as "Retracted:", "WITHDRAWN:" or "REMOVED:", unless the work is the notice about another paper.
- **[Curations](/data/curations/):** our curators' corrections to `is_retracted` win over every source.

The flag is rebuilt every night. A retraction Crossref records today shows in the API tomorrow (10 to 38 hours later); one known only to Retraction Watch waits for Retraction Watch's own update. A pulled work's [`updated_date`](/data/works/attributes/#updated_date) is the night it changed.

## Known gaps

We don't yet read arXiv withdrawals, withdrawn conference abstracts, or IEEE's "Notice of Retraction" title stamps, so some pulled works still read `false`. The notice itself (with its date and reason) isn't linked to the work yet. If a work is pulled and we say it isn't, or the other way round, [report it](/access/fixing-errors/works/#wrong-retracted-or-pulled-flag).
