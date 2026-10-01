---
title: "Fixing authors"
updated: 2026-10-01
description: "Claim your OpenAlex author profile and fix it yourself: add and remove works, merge duplicates, and correct your names."
tags: ["fixing"]
synonyms: ["author profile", "claim profile", "merge profiles", "alternate names", "wrong works", "ORCID", "link ORCID", "connect ORCID", "sync ORCID", "import from ORCID", "claim verification"]
card: "No ticket needed — claim it and fix it yourself: works, name variants, merged twins."
---
Your author profile is the big self-serve case in OpenAlex: you don't need to file a ticket — claim the profile and fix it yourself. This page is the recipes; the full story (everything you can change, how curations work, the API) is in the [Authors fixing-errors reference](/access/fixing-errors/authors/).

> [!claude]
> You can do the whole cleanup in conversation: *"Make my OpenAlex author profile accurate"*, with your CV or publication list attached. It claims the profile if you haven't, reads it work by work, and proposes what to add and remove. Expect it to ask you about lookalikes: byline searches turn up other researchers who share your surname and initials. Walkthrough: [Fix Your Profile with Claude](/tutorials/fix-your-profile/). Set up once: [Using OpenAlex with an AI assistant](/how-to/ai-assistants/).

## How do I claim my profile?

1. Sign in at [openalex.org](https://openalex.org) (create a free account if you don't have one).
2. Open your author page ([finding your author ID](/how-to/finding-openalex-ids/#how-do-i-find-my-author-id)).
3. Click **Claim**.

**With a university email, your claim is approved right away.** This works when your account has a verified email from a university, a research institute or a government agency.

**Add your university email, even if you use another email.** Your account can have more than one email. Keep your current email, and add your university email in [Settings](https://openalex.org/settings). We send a link to that address. Click it, and your claims are approved right away. This is by far the easiest way.

**Or link your ORCID.** If the profile shows your ORCID iD, click **Link your ORCID** in the claim window and sign in to ORCID. Your claim is approved right away. If you have already [linked your ORCID](#how-do-i-link-my-orcid), claiming a profile that carries it takes one click.

**No university email? Send a link that shows your email.** The page must show the email address of your OpenAlex account.

- ✓ Your page on your university's or institute's website
- ✓ A paper or preprint (for example on arXiv) that lists your email
- ✗ A page that shows your name but not your email
- ✗ A page you made yourself: a personal website, LinkedIn, ResearchGate

**Why your email, and not your name?** Anyone can type any name into an OpenAlex account. Your email is the only thing we have checked. So the page must show that exact email.

We check every link automatically and answer in a few minutes. If we can't approve your claim, we tell you what is missing, by email and on the profile page. You can send a new link at any time. Once approved, you own the profile.

## How do I link my ORCID?

1. Sign in at [openalex.org](https://openalex.org) and open [Settings](https://openalex.org/settings/profile).
2. In the ORCID row, click **Link ORCID**.
3. Sign in to ORCID. You come back to Settings, where the row shows your iD and **✓ Linked**.

If an OpenAlex profile carries your iD, linking claims it for you, and the Author profile row shows it within about a minute. If several profiles carry your iD, linking claims the one with the most works; it doesn't merge them, so [merge the others into it](#how-do-i-merge-duplicate-profiles). To unlink, use the **⋮** menu next to **✓ Linked**; your claimed profile stays yours.

Linking is not the same as [setting the ORCID on your profile](#how-do-i-set-or-correct-my-orcid): linking proves who you are, and the profile's ORCID is the iD shown on your author page. More: [ORCID § Linking your ORCID to your account](/data/authors/orcid/#linking-your-orcid-to-your-account).

## Will linking my ORCID add my works from ORCID?

No, and OpenAlex doesn't sync from ORCID. Linking proves who you are; it doesn't copy the works on your ORCID record, because those records often include works by namesakes, many people have more than one, and most leave works out. Add missing works yourself (below), or ask [Claude](#can-claude-fix-my-profile-for-me), which checks your ORCID record and asks you about any work it isn't sure of. Why: [ORCID § Linking doesn't copy your ORCID record](/data/authors/orcid/#linking-your-orcid-to-your-account).

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

This is the ORCID shown on your author page, which is not the one [linked to your account](#how-do-i-link-my-orcid). Claim your profile, then set the ORCID through the [curation API](/api/author-curation/#modify-orcid) with `property: "orcid"`: `replace` to set it, `remove` to detach one that is not yours. There is no button for it on the website yet. The change shows within about two days, and the new primary appears in [`observed_orcids`](/data/authors/#observed_orcids) right away, even before any work carries it.

Know what it does before you reach for it. It records the ORCID on your profile and makes it your match key for *future* works. It does not move works already sitting on another profile, pull in missing works, or merge duplicates; those are fixed by [adding and removing works](#how-do-i-add-or-remove-works). Why ORCID works this way, and why a profile often has none: [ORCID](/data/authors/orcid/).

## A paper shows the wrong ORCID for me. Can I fix it?

Not in OpenAlex, for now. The ORCID on a work (`raw_orcid` on the authorship) is the publisher's record: they collected it at submission and deposited it with the paper, and OpenAlex reports it as deposited, right or wrong. The fix is with the publisher, who can update the metadata at Crossref or DataCite; OpenAlex picks up the corrected record when that work is next refreshed.

What you can do here: if the wrong ORCID has landed on your *profile*, remove it as above; if the work is not yours at all, remove the work. Either way the profile stops carrying that ORCID. How wrong ORCIDs get onto papers in the first place: [ORCID § Why an ORCID can be wrong](/data/authors/orcid/#why-an-orcid-can-be-wrong).

## Can Claude fix my profile for me?

Yes, and it's the shortest path. Add the [AI agent connector](/access/connector/) once, then say *"Make my OpenAlex author profile accurate"* and attach your CV or publication list. Claude claims the profile if you haven't, searches for works you're missing under your name variants and ORCID, shows you the byline, affiliation and co-authors behind each candidate, and asks about the ones that don't obviously fit before submitting anything. Expect that question: name searches turn up other researchers who share your surname and initials, and only you can tell them apart. Walkthrough: [Fix Your Profile with Claude](/tutorials/fix-your-profile/).

Any other agent can do the same through the curation API, which authenticates with just your [API key](/api/authentication/): see [Using AI agents](/access/fixing-errors/authors/#using-ai-agents) for a ready-made prompt and [Author Curation](/api/author-curation/) for the mechanics.

## Can I fix a profile that isn't mine?

Claiming is for your own profile only. Cleaning up someone else's — as a librarian, co-author, or research-office staffer — goes through a [ticket](https://openalex.org/contact); see [the reference](/access/fixing-errors/authors/#fixing-a-profile-that-isnt-yours) for what to include.
