---
title: "Fix Your Profile with Claude"
updated: 2026-09-21
subtitle: "Claim your author profile and clean it up in conversation — no API key, no spreadsheet."
description: "Walk through fixing your OpenAlex author profile with the AI agent connector: claim it, find the works it's missing, remove the ones that aren't yours, and fix your name and ORCID."
tags: ["recipes"]
card: "Claim it, audit it, correct it — a conversation instead of a ticket."
---
Your OpenAlex author profile is built automatically, so it drifts: a paper published under a name variant never got linked, and a same-named researcher's work got attached to you by mistake. You can fix all of that yourself in a conversation. This tutorial walks through it with the [AI agent connector](/access/connector/), from claiming the profile to watching the corrections go live.

If you'd rather do it by hand, the same corrections are available on the website ([Fixing authors](/how-to/fixing-authors/)) and through the [curation API](/api/author-curation/). If you want to audit *someone else's* profile without changing it, see [Audit a Profile](/tutorials/audit-a-profile/).

## Before you start

Add the connector once (one URL, then sign in with your OpenAlex account): see [Connecting](/access/connector/#connecting). Have your ORCID handy if you have one, and a CV or publication list if you want the fastest path — the assistant can read an attached file.

## Step 1: Say what you want

The whole tutorial is really one instruction:

> Make my OpenAlex author profile accurate.

Attach your CV or publication list if you have one. The assistant works through the rest in order, checking with you before anything is submitted.

## Step 2: It checks who you are, and claims the profile

First it looks up your account and the profile you've claimed. If you haven't claimed one yet, it finds your profile and claims it for you. Whether that is instant depends on your email: a verified academic, institutional or government address is approved on the spot, and anything else queues for review with evidence. That gate is the same as the website's, and it's explained in [Fixing errors: Authors](/access/fixing-errors/authors/).

If the assistant says it can't reach your OpenAlex account, disconnect and reconnect the connector; a connection made before profile curation existed can't see accounts.

## Step 3: It finds works that are probably yours

Next it searches for works your profile is missing. It doesn't just search your display name; it walks a ladder of byline forms (the name as you write it, reversed, initials, looser word order), then checks your ORCID both in OpenAlex and on your public ORCID record, then looks for other profiles with your name that may be duplicates of you.

Expect more candidates than you'd guess. Running this on a real profile turned up 70 raw byline hits for a fairly uncommon surname. Which brings us to the interesting part.

## Step 4: You say no to the ones that aren't you

Initials are ambiguous, and the ladder's looser rungs match other people. On the profile we tested, a search for "Priem" surfaced papers on scrapie in Italian goats and on prenatal muscle tissue in pigs, all bylined "J. Priem" — a different researcher entirely, at a Dutch animal-science institute.

The assistant doesn't decide this for you. For each candidate it shows the byline exactly as printed, the affiliation strings on that paper, and the co-authors, then adds the clear matches and asks you about the rest. Those three signals are usually enough: if the affiliation is an institution you've never been at and you recognize none of the co-authors, it isn't yours.

This is the step worth your attention. Everything else is bookkeeping.

## Step 5: It removes what doesn't belong, and fixes your name

The same conversation handles the other direction: works attached to you that belong to someone else, your display name, the name variants you publish under, and your ORCID. Ask for whatever is wrong:

> Remove the prion papers, set my display name to the form I publish under, and add my ORCID.

## Step 6: Corrections go live

Every change is a [curation](/data/curations/): recorded, attributed, and reversible. Submitted corrections are pending until the next refresh and typically appear within about two days. Ask at any time:

> What corrections have I submitted, and what state are they in?

If you submitted something by mistake, ask to cancel it while it's still pending.

## What this doesn't cover

The connector can only curate **your own** claimed profile. Errors on works, sources or institutions, and affiliation corrections for an institution, still go through [Fixing errors](/access/fixing-errors/). And if you want the underlying payloads for a bulk job, that's the [curation API](/api/author-curation/).
