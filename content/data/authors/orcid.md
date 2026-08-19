---
title: "ORCID"
updated: 2026-08-19
description: "How OpenAlex uses ORCID iDs today: where they come from, what they do (and don't do) in author disambiguation, why a profile can be missing one, and how to set or correct yours."
tags: ["reference"]
---
An [ORCID iD](https://orcid.org/) is the persistent identifier for researchers — a 16-digit number like `0000-0002-0889-9220` that a person registers once and attaches to their papers. OpenAlex records it in two places: on the [author](/data/authors/) profile, as [`orcid`](/data/authors/#orcid), and on each [authorship](/data/authorships/), as [`raw_orcid`](/data/authorships/#raw_orcid) — the ORCID exactly as it arrived on that work's source record.

ORCID is one of the six signals in [author disambiguation](/data/authors/disambiguation/#the-signals), and when it's present it's the strongest one. But it plays a smaller role in OpenAlex than most people expect, and the gap between what people assume ORCID does and what it actually does is behind many of the questions we get about author profiles. This page walks through how it works today.

## Where ORCIDs come from

OpenAlex doesn't look authors up in the ORCID registry to decide which works are theirs. An ORCID reaches OpenAlex **attached to a work** — the publisher collects it at submission and deposits it with the work's metadata (chiefly via [Crossref](https://www.crossref.org/) and [DataCite](https://datacite.org/)), and it arrives on the authorship as `raw_orcid`. That's the only way in.

Two consequences follow:

- **Having an ORCID isn't enough.** It has to be attached to the paper by the publisher. A researcher who registered an ORCID but never supplied it at submission — or whose publisher doesn't pass it on — is invisible to us on this axis, and so is every paper from before they registered.
- **Coverage is thin.** Only about **1 in 6** authorships on recent works arrives with an ORCID, and the share falls off steeply for older works. Because the ORCID is recorded on the profile and then shown on every work attached to it, the resolved [`author.orcid`](/data/authorships/#author) on authorships is filled in far more often than `raw_orcid` — but that's the profile's ORCID propagating back onto works, not new evidence from the work itself.

The practical upshot: names carry the main load in disambiguation, because every paper has them, and ORCID helps where it happens to be present.

## How ORCID is used in disambiguation

When a new authorship arrives carrying an ORCID that matches an existing profile's `orcid`, it's attached to that profile — full stop. The ORCID overrides the name-based matching: the authorship binds there even if the printed name is quite different from the profile's. One guard: an ORCID stamped on more than one authorship of the same work is treated as a data error and ignored.

Just as important is what ORCID does **not** do today:

- **It doesn't keep people apart.** Two authorships with *different* ORCIDs can still be merged into one profile on the strength of name, institution, and co-author signals. ORCID is a positive signal, not a veto.
- **It isn't applied retroactively.** OpenAlex doesn't periodically re-scan works already in the database for ORCIDs and re-assign them. An ORCID that arrives on a new work attaches that work; it doesn't go back and re-home earlier works.
- **Profiles that share an ORCID aren't automatically merged.** When two profiles end up carrying the same ORCID (which can happen — see below), we track the collision rather than merging on it.

### Why not lean on it harder?

An earlier version of OpenAlex trusted ORCID very heavily, and it taught us caution. The ORCIDs that arrive on works carry more errors than you'd expect — and the errors are generally not ORCID's. They're made upstream, when a publisher attaches iDs to a work's authorships: two co-authors' ORCIDs get swapped (author A gets B's iD and B gets A's), one author's iD is stamped on several authorships, an iD is mistyped or copied from the wrong submission form. In a system that also uses co-authorship as a merge signal, one wrong authorship doesn't stay contained: it affects everyone on that paper's author list, then their co-authors, and so on. A single bad assertion could spread a long way through the graph. Combined with the thin coverage above, that's why ORCID is a strong signal for the authorship it arrives on, and not the backbone of the whole system.

## Why a profile may have no ORCID

If an author's profile shows `orcid: null`, the reason is almost always that **no work attached to that profile ever arrived carrying one**. You can check this yourself: pull the profile's works and look at `raw_orcid` on the relevant authorships.

```
https://api.openalex.org/works?filter=author.id:A5022959619&select=id,authorships
```

If `raw_orcid` is null on every one of the author's authorships, there was nothing for OpenAlex to record — even if *other* authors on the same works have ORCIDs (which is a useful sign that the pipeline ingested the record's ORCIDs fine; this person's simply wasn't in it).

## Setting or correcting your ORCID

The owner of a [claimed profile](/how-to/fixing-authors/#how-do-i-claim-my-profile) can set the profile's ORCID, or detach a wrong one, through the [curation API](/api/author-curation/#modify-orcid) (`property: "orcid"`). The API checks the format and the ORCID check digit, then applies the change at the next data refresh — typically live within about two days.

It helps to be precise about what this does, because people reasonably expect more:

- **It does:** record the ORCID on your profile, and make it your profile's match key going forward. Future incoming works that carry your ORCID will attach to your profile, overriding the name match.
- **It doesn't:** move works that are already attached elsewhere, pull in missing works, drop works that carry a different ORCID, or merge duplicate profiles. Yesterday's papers don't move; tomorrow's papers find you.

To fix the works themselves, use the other author curations — [add and remove works](/access/fixing-errors/authors/#what-you-can-fix) — which are the tools that actually change what a profile contains. (See [Authors § A profile is built from its works](/data/authors/#a-profile-is-built-from-its-works) for why that's where the leverage is.)

There's no way to set your ORCID on the openalex.org website yet. That's deliberate: a button that records an ORCID but doesn't move works would do less than people expect, and we'd rather ship it alongside the deeper integration described below.

## ORCID roadmap

We plan to keep building out ORCID support — moving from today's shallow integration to a deeper one that does things like re-scan existing works for ORCIDs, pull works directly from researchers' ORCID records, and offer ORCID correction on the website. We'll proceed carefully, for the reasons above. And ORCID won't be a magic bullet even then: coverage on recent works is low, and for the large historical literature that predates ORCID it's nonexistent — so names, co-authors, and affiliations will keep doing most of the work.

## Looking up authors by ORCID

ORCID is a first-class identifier across the API:

- Fetch an author directly: [`api.openalex.org/authors/orcid:0000-0003-2780-0393`](https://api.openalex.org/authors/orcid:0000-0003-2780-0393).
- Filter authors: `filter=orcid:0000-0003-2780-0393`, or select on presence with `has_orcid:true` / `has_orcid:false`.
- Filter works by an author's ORCID: `filter=authorships.author.orcid:0000-0003-2780-0393`.
- Distinguish what the work asserted from what we resolved: compare [`authorships[].raw_orcid`](/data/authorships/#raw_orcid) with [`authorships[].author.orcid`](/data/authorships/#author).

Each ORCID is meant to map to one OpenAlex author, and the direct lookup returns one. In practice an ORCID can end up on more than one profile — usually because of the publisher-side errors described above (the same iD attached to several authorships, or to the wrong author) — and the pipeline doesn't merge profiles on a shared ORCID. You can see the effect with `group_by=orcid` on the authors endpoint. So if you're matching by ORCID at scale, treat a shared ORCID as a hint, not as proof that two profiles are the same person.
