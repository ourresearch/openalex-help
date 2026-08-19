---
title: "Fixing authors"
updated: 2026-08-19
description: "Claim your OpenAlex author profile and fix it yourself: add and remove works, merge duplicates, and correct your names."
tags: ["fixing"]
synonyms: ["author profile", "claim profile", "merge profiles", "alternate names", "wrong works", "ORCID", "claim verification"]
card: "No ticket needed — claim it and fix it yourself: works, name variants, merged twins."
---
Your author profile is the big self-serve case in OpenAlex: you don't need to file a ticket — claim the profile and fix it yourself. This page is the recipes; the full story (everything you can change, how curations work, the API) is in the [Authors fixing-errors reference](/access/fixing-errors/authors/).

## How do I claim my profile?

1. Sign in at [openalex.org](https://openalex.org) (create a free account if you don't have one).
2. Search for your name and open your author page ([finding your author ID](/how-to/finding-openalex-ids/#how-do-i-find-my-author-id)).
3. Click **Claim** near the top of the page.

Claims are reviewed before approval. Right now, a **verified academic (institutional) email address** on your OpenAlex account is enough for a claim to be approved automatically; claims without one get a closer look, which takes longer. So sign up with your institutional address rather than a personal one if you can. The bar is deliberately low, Wikipedia-style: every edit anyone makes to a profile is recorded and can be reverted, so we'd rather make claiming easy and undo the rare bad edit than make everyone wait. The process is still evolving and may change; claims and edits are also subject to spot checks by our staff. Once approved, you own the profile.

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

## How do I add or fix my ORCID?

You can set your profile's ORCID (or detach a wrong one) through the [curation API](/api/author-curation/#modify-orcid) once you've claimed the profile — there's no button for it on the website yet. Know what it does before you reach for it: it records the ORCID and makes it your match key for *future* works, but it doesn't move works already attached elsewhere or merge duplicate profiles. To fix what's on the profile, add and remove works. Everything about how OpenAlex sources and uses ORCID — and why a profile often has none — is on the [ORCID](/data/authors/orcid/) page.

## Using an AI agent

Yes — the curation API authenticates with just your [API key](/api/authentication/), so you can hand an agent your CV and author ID and let it do the whole cleanup. See [Using AI agents](/access/fixing-errors/authors/#using-ai-agents) for a ready-made prompt and [Author Curation](/api/author-curation/) for the mechanics.

## Can I fix a profile that isn't mine?

Claiming is for your own profile only. Cleaning up someone else's — as a librarian, co-author, or research-office staffer — goes through a [ticket](https://openalex.org/contact); see [the reference](/access/fixing-errors/authors/#fixing-a-profile-that-isnt-yours) for what to include.
