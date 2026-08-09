---
title: "Fixing your author profile"
description: "Claim your OpenAlex author profile and fix it yourself: add and remove works, merge duplicates, and correct your names."
tags: ["fixing"]
synonyms: ["author profile", "claim profile", "merge profiles", "alternate names", "wrong works"]
---
Your author profile is the big self-serve case in OpenAlex: you don't need to file a ticket — claim the profile and fix it yourself. This page is the recipes; the full story (everything you can change, how curations work, the API) is in the [Authors fixing-errors reference](/docs/fixing-errors/authors/).

## How do I claim my profile?

1. Sign in at [openalex.org](https://openalex.org) (create a free account if you don't have one).
2. Search for your name and open your author page ([finding your author ID](/help/finding-openalex-ids/#how-do-i-find-my-author-id)).
3. Click **Claim** near the top of the page.

Claims are reviewed before approval; having a validated academic email address on your account speeds things up. Once approved, you own the profile.

## How do I add or remove works?

On a profile you've claimed, add missing works by searching titles, pasting DOIs or OpenAlex IDs, or uploading your CV (we'll match the works in it). Remove works that aren't yours individually or in bulk. Changes are [curations](/data/curations/), applied at the next data refresh — typically live within about two days.

## How do I merge duplicate profiles?

If your works are spread across two profiles and you've claimed one: add the other profile's works to yours (the CV upload makes this fast). The emptied profile goes inert — it stops accruing works and drops out of matching, so it won't grow back. There's no separate merge button; moving the works is the merge.

## Someone else's works are on my profile. How do I split them out?

Remove them. The disambiguation algorithm re-homes removed works to the right profile — that part isn't your problem.

## What are alternate names, and how do I change them?

The alternate names on a profile are the name variants that appear on its linked publications — "K Demes", "Kyle W. Demes", "Kyle Demes". They're derived from the works, so they update automatically when you fix which works belong to you. If a name variant on your profile simply isn't you, remove that name directly — doing so detaches every work carrying it.

## Can an AI agent do this for me?

Yes — the curation API authenticates with just your [API key](/api/authentication/), so you can hand an agent your CV and author ID and let it do the whole cleanup. See [Using AI agents](/docs/fixing-errors/authors/#using-ai-agents) for a ready-made prompt and [Author Curation](/api/author-curation/) for the mechanics.

## Can I fix a profile that isn't mine?

Claiming is for your own profile only. Cleaning up someone else's — as a librarian, co-author, or research-office staffer — goes through a [ticket](https://openalex.org/contact); see [the reference](/docs/fixing-errors/authors/#fixing-a-profile-that-isnt-yours) for what to include.
