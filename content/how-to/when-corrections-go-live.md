---
title: "When corrections go live"
updated: 2026-11-16
description: "How long a correction takes to show up in OpenAlex, which parts of the website and API update first, what happens to emptied profiles and removed works, and how to check on a correction."
tags: ["fixing"]
synonyms: ["how long", "when will my correction show up", "correction not showing", "changes not showing", "curation pending", "profile not updated", "works count wrong", "merged profile still there", "empty profile", "deleted profile", "redirect", "delay", "timeline", "nightly update", "data refresh"]
card: "Most are live in one to two days, but not everywhere at once. What updates first, and what to check."
---
Every correction to OpenAlex goes live through the same nightly update. That includes the ones you make yourself (on your [author profile](/how-to/fixing-authors/) or in the [Affiliation Editor](/how-to/fixing-affiliations/)) and the ones we make from your [ticket](/how-to/fixing-data-errors/). **Most are live within one to two days.** The parts of the website and API don't all update at the same moment, though. For a few hours, a work's page, its author's profile and search results can disagree. This page explains what updates when, and what to check if a correction hasn't shown up.

## How long does a correction take?

OpenAlex rebuilds its data once a day. The update starts at **05:00 UTC** and picks up every correction submitted before it starts. It then takes several hours to build and publish. Search results usually show it by mid-afternoon UTC, or by early evening after a heavy night.

So a correction made just before 05:00 UTC can be live that afternoon. One made just after has to wait for the next night's update, which means about a day and a half. Either way, **expect one to two days**. A few take longer, so give a correction a week before you write to us about it.

## Which parts update first?

| What you're looking at | When it shows the correction |
|---|---|
| Search results, filters and lists of works, including the works list on an author profile or an institution page | When the nightly update publishes. These change first. |
| A single work's page (`openalex.org/works/W…`, or `api.openalex.org/works/W…`) | A few hours later the same day; occasionally the next day |
| An author profile: its works count, citation count, institutions and topics | Usually the same day as the works. Profiles are rebuilt from the works after each nightly update. |
| A name or ORCID you set on your profile | On the profile, at the next profile rebuild. On each of your works, one nightly update after that. |
| Author suggestions as you type in the search box | Shortly after the profile rebuild |
| The works count on an institution's page | Recomputed once a day, so it can trail the institution's works list by up to a day |
| The [snapshot](/access/snapshot/) | In the free snapshot, at its next quarterly release. In the [daily snapshot](/access/sync/) (Member+ and Partner plans), the next day. |

If search already shows your change and the work's own page doesn't, nothing is wrong: look again later that day.

## Why does my profile still show the old number of works?

There are two common reasons:

- **The profile hasn't been rebuilt yet.** Profiles are rebuilt from their works after each nightly update, so the count can change a little after the works list. Look again later the same day.
- **The count includes works the list hides.** A profile's works count includes works that lists of works leave out by default, such as those in the [expansion corpus](/data/works/corpus/). To see them all, add `corpus=all` to the list, e.g. `api.openalex.org/works?filter=author.id:A5023888391&corpus=all`.

## What happens to a duplicate profile after I move its works?

To [merge duplicates](/how-to/fixing-authors/#how-do-i-merge-duplicate-profiles), you move every work from the duplicate profile onto yours. Once its last work has moved, the emptied profile is **deleted** that same day, when profiles are rebuilt. Its page and its API record then say "not found". It **doesn't redirect** to the profile the works moved to, so update any links you keep to the old ID. The one exception: a profile someone has claimed, or asked to claim, is kept even when it's empty.

So if the duplicate is still there a few days later, some works are probably still on it. Open it and look at its works list.

## What happens to a work I remove from my profile?

The work is detached from your profile, and it stays detached: later updates won't put it back. OpenAlex doesn't give it to anyone else, either. Each night, author matching runs on **new** works only, so works already in OpenAlex aren't matched again when a profile changes. The removed byline name stays without an author profile until someone claims it. If you know whose work it is, its author can [add it to their profile](/how-to/fixing-authors/#how-do-i-add-or-remove-works).

The same goes for the rest of a profile: correcting it doesn't start a new round of matching on other works. A name or [ORCID](/how-to/fixing-authors/#how-do-i-set-or-correct-my-orcid) you set helps match your **future** works. Works already on another profile only move when they're added to yours.

## What about affiliation corrections?

They take the same nightly update. Once it publishes, the work lists your institution (or no longer does), and institution filters and search results change with it. The works count on your institution's page follows within a day. Corrections made in the Affiliation Editor and corrections we make from tickets take the same path.

## What about open-access corrections?

You can't change a work's open-access status yourself. Report it in a [ticket](/how-to/fixing-data-errors/#how-do-i-fix-a-works-open-access-status). We check each report against the article itself before we change anything, and **there's no set timeline** for that check. Once we make a correction, it goes live with the next nightly update, like any other.

## How do I check whether my correction is live?

- **Look at its status.** Every correction is a [curation](/data/curations/) with a [status](/data/curations/#status). It reads `pending` until it's seen live, then `applied`. You can see yours in your account on [openalex.org](https://openalex.org). In the API, `GET https://user.openalex.org/curations?status=pending,timed_out` with your API key lists the ones still open.
- **`applied` means search shows it.** A curation is marked `applied` as soon as search results show the change, so a single work's page can still lag behind for a few hours.
- **Look at the record itself.** For a change to a work's authors, open the work in the API (`api.openalex.org/works/W…`) and read its `authorships`. For a profile, look at its works list.
- **Still pending after a week, or marked `not_applied`?** A `not_applied` curation gives the reason in `walden.reason`, for example that the work was merged into another one. If that doesn't explain it, [file a ticket](https://openalex.org/contact) with the curation's ID (`cur-…`).
