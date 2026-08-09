---
title: "Authors"
description: "Fix your OpenAlex author profile yourself: claim it, add and remove works, correct your names and ORCID, merge duplicates — by hand or with an AI agent."
tags: ["reference"]
---
OpenAlex assembles [author](/data/authors/) profiles algorithmically: it takes the author names on hundreds of millions of works and decides which names refer to the same real person. Modern disambiguation is very good, but at this scale it's never perfect — works get attached to the wrong profile, one person ends up split across duplicates, names display wrong.

Authors are the big self-serve exception to the [ticket-based default](/docs/fixing-errors/): **you can fix your own profile yourself, by claiming it.**

## Claim your profile

1. Sign in at [openalex.org](https://openalex.org) (create a free account if you don't have one).
2. Go to your author page — search for your name and open the best match.
3. Click **Claim** near the top of the page.

Your claim is reviewed before it's approved. We look at many factors when moderating claims; having a **validated academic email address** on your OpenAlex account speeds things up. Once approved, you own the profile and can curate it.

## What you can fix

Every correction is a [curation](/data/curations/) — an auditable record of who changed what, when. On a profile you've claimed, you can:

- **Add missing works** — search by title, paste a DOI or OpenAlex ID, or upload your CV and we'll match the works in it. (Adds are capped at 1,000 per rolling 24 hours; removals are uncapped.)
- **Remove works that aren't yours** — including in bulk.
- **Remove a wrong name** — if a name variant on your profile isn't you, removing it detaches every work carrying that name.
- **Change your display name** — the name shown on your profile.
- **Change your match name** — the name used to match future works to you (API only).
- **Set or correct your ORCID** (API only).

Everything else on a profile — alternate names, institutional affiliations, topics, citation metrics — is *derived* from its works, so you don't (and can't) edit those directly: fix which works belong to you and the rest follows. (Wrong institution showing on one of your works? That's an [affiliation-matching fix](/docs/fixing-errors/affiliations/), not an author fix.)

Curations don't apply instantly: each one is **pending** until the next data refresh picks it up, and your changes are typically live within about two days. You can track (and cancel) your pending curations from your account.

## Split and merge

The two classic disambiguation failures are **duplicates** (your works spread across two or more profiles) and **wrong merges** (someone else's works mixed into yours). There's no separate merge or split button — both are fixed by moving works, and the moves do the whole job:

- **Merge duplicates.** Say profiles A and B are both you, and you've claimed A. Add all of B's works to A (the CV upload makes this fast). The emptied profile goes **inert**: it stops accruing works and drops out of matching, so it won't grow back.
- **Split out someone else's works.** If another person's works have been merged into your profile, remove them. The disambiguation algorithm re-homes removed works to the right profile — that part isn't your problem.

## Using AI agents

The curation API is designed to be agent-legible, and it authenticates with nothing but your [API key](/api/authentication/) — which means you can hand the whole cleanup to an [AI agent](/docs/agents/) instead of clicking through it yourself. Give an agent your key and a prompt like:

```
Here's my CV (attached) and my OpenAlex author ID (A5023888391).
Add my missing works, remove the ones that aren't mine, and set my
display name to "J. García-Martínez". Use the OpenAlex curation API;
docs at help.openalex.org/api/author-curation/.
```

The agent reads your profile, submits the corrections as curations (a `POST` to `/curations` with `Authorization: Bearer <api_key>`), and can poll their status until they're applied. See [Author Curation](/api/author-curation/) for the API mechanics.

## Fixing a profile that isn't yours

Claiming is for your own profile. If you're a librarian, co-author, or research-office staffer cleaning up someone else's profile, [file a ticket](https://openalex.org/contact) — include the author ID, the specific works or names that are wrong, and evidence, per the [good-ticket guidance](/docs/fixing-errors/).
