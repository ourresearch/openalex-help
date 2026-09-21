---
title: "Fixing authors"
updated: 2026-09-21
description: "Claim your OpenAlex author profile and fix it yourself: add and remove works, merge duplicates, and correct your names."
tags: ["fixing"]
synonyms: ["author profile", "claim profile", "merge profiles", "alternate names", "wrong works", "ORCID", "claim verification"]
card: "No ticket needed — claim it and fix it yourself: works, name variants, merged twins."
---
Your author profile is the big self-serve case in OpenAlex: you don't need to file a ticket — claim the profile and fix it yourself. This page is the recipes; the full story (everything you can change, how curations work, the API) is in the [Authors fixing-errors reference](/access/fixing-errors/authors/).

> [!claude]
> You can do the whole cleanup in conversation: *"Make my OpenAlex author profile accurate"*, with your CV or publication list attached. It claims the profile if you haven't, reads it work by work, and proposes what to add and remove. Expect it to ask you about lookalikes: byline searches turn up other researchers who share your surname and initials. Walkthrough: [Fix Your Profile with Claude](/tutorials/fix-your-profile/). Set up once: [Using OpenAlex with an AI assistant](/how-to/ai-assistants/).

## How do I claim my profile?

1. Sign in at [openalex.org](https://openalex.org) (create a free account if you don't have one).
2. Search for your name and open your author page ([finding your author ID](/how-to/finding-openalex-ids/#how-do-i-find-my-author-id)).
3. Click **Claim** near the top of the page.

If your account has a **verified academic or institutional email address** (a university, research institute, or government domain), the claim is approved on the spot: no waiting period, and you can start fixing the profile right away. So sign up with your institutional address rather than a personal one if you can, or add and verify it in your account settings before you claim.

Without one, your claim goes into a review queue, which usually takes a few days. Help it through by giving evidence that you're the scholar behind these works: a link to a page or paper that shows both the name on the profile and your account email (a departmental page, a lab site, a paper's author list). You don't need to prove you wrote any particular work, only that you're who you say you are.

Either way, claims can be reviewed at any time, and a fraudulent claim is revoked and its edits reverted. The bar is deliberately low, Wikipedia-style: every edit anyone makes to a profile is recorded and can be reverted, so we'd rather make claiming easy and undo the rare bad edit than make everyone wait. Once approved, you own the profile.

## How do I add or remove works?

On a profile you've claimed, add missing works by searching titles, pasting DOIs or OpenAlex IDs, or uploading your CV (we'll match the works in it). Remove works that aren't yours individually or in bulk. Changes are [curations](/data/curations/), applied at the next data refresh — typically live within about two days.

## How do I merge duplicate profiles?

If your works are spread across two profiles and you've claimed one: add the other profile's works to yours (the CV upload makes this fast). The emptied profile goes inert — it stops accruing works and drops out of matching, so it won't grow back. There's no separate merge button; moving the works is the merge.

## Someone else's works are on my profile. How do I split them out?

Remove them. The disambiguation algorithm re-homes removed works to the right profile — that part isn't your problem.

## Alternate names

The alternate names on a profile are the name variants that appear on its linked publications — "K Demes", "Kyle W. Demes", "Kyle Demes". They're derived from the works, so they update automatically when you fix which works belong to you. If a name variant on your profile simply isn't you, remove that name directly — doing so detaches every work carrying it.

## I removed a name (or a work) and an institution disappeared. Why?

Because a profile is built from its works. The institutions, topics, alternate names, and citation counts on a profile aren't stored separately — they're computed from whatever works are attached. Remove a work, and anything that work alone was contributing (an affiliation, a topic) goes with it; remove a name variant, and every work printed under that name goes, along with their affiliations. Institutions still supported by the works you keep stay put. This is the intended behavior, not a side effect: on a profile, **works are the only thing you edit; everything else is a result.** So if something on your profile looks wrong, the question to ask is "which work is bringing this in?" and fix that work. (A wrong institution on a work that *is* yours is an [affiliation fix](/how-to/fixing-affiliations/), not an author fix.) The longer explanation: [Authors § A profile is built from its works](/data/authors/#a-profile-is-built-from-its-works).

## How do I set or correct my ORCID?

Claim your profile, then set the ORCID through the [curation API](/api/author-curation/#modify-orcid) with `property: "orcid"`: `replace` to set it, `remove` to detach one that is not yours. There is no button for it on the website yet. The change shows within about two days, and the new primary appears in [`observed_orcids`](/data/authors/#observed_orcids) right away, even before any work carries it.

Know what it does before you reach for it. It records the ORCID on your profile and makes it your match key for *future* works. It does not move works already sitting on another profile, pull in missing works, or merge duplicates; those are fixed by [adding and removing works](#how-do-i-add-or-remove-works). Why ORCID works this way, and why a profile often has none: [ORCID](/data/authors/orcid/).

## A paper shows the wrong ORCID for me. Can I fix it?

Not in OpenAlex, for now. The ORCID on a work (`raw_orcid` on the authorship) is the publisher's record: they collected it at submission and deposited it with the paper, and OpenAlex reports it as deposited, right or wrong. The fix is with the publisher, who can update the metadata at Crossref or DataCite; OpenAlex picks up the corrected record when that work is next refreshed.

What you can do here: if the wrong ORCID has landed on your *profile*, remove it as above; if the work is not yours at all, remove the work. Either way the profile stops carrying that ORCID. How wrong ORCIDs get onto papers in the first place: [ORCID § Why an ORCID can be wrong](/data/authors/orcid/#why-an-orcid-can-be-wrong).

## Can Claude fix my profile for me?

Yes, and it's the shortest path. Add the [AI agent connector](/access/connector/) once, then say *"Make my OpenAlex author profile accurate"* and attach your CV or publication list. Claude claims the profile if you haven't, searches for works you're missing under your name variants and ORCID, shows you the byline, affiliation and co-authors behind each candidate, and asks about the ones that don't obviously fit before submitting anything. Expect that question: name searches turn up other researchers who share your surname and initials, and only you can tell them apart. Walkthrough: [Fix Your Profile with Claude](/tutorials/fix-your-profile/).

Any other agent can do the same through the curation API, which authenticates with just your [API key](/api/authentication/): see [Using AI agents](/access/fixing-errors/authors/#using-ai-agents) for a ready-made prompt and [Author Curation](/api/author-curation/) for the mechanics.

## Can I fix a profile that isn't mine?

Claiming is for your own profile only. Cleaning up someone else's — as a librarian, co-author, or research-office staffer — goes through a [ticket](https://openalex.org/contact); see [the reference](/access/fixing-errors/authors/#fixing-a-profile-that-isnt-yours) for what to include.
