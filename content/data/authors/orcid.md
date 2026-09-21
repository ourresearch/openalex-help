---
title: "ORCID"
updated: 2026-09-21
description: "How OpenAlex records ORCID iDs: where they come from, how rare they are, how the primary is chosen, why a profile can have several, why one can be wrong, and how lookup works."
tags: ["reference"]
---
An [ORCID iD](https://orcid.org/) is a persistent identifier for a researcher, a 16-digit number like `0000-0002-0889-9220` that a person registers and attaches to their papers. OpenAlex records it in three places:

- [`raw_orcid`](/data/authorships/#raw_orcid) on an [authorship](/data/authorships/): the ORCID exactly as the publisher or repository deposited it on that work.
- [`orcid`](/data/authors/#orcid) on an [author](/data/authors/) profile: the primary ORCID.
- [`observed_orcids`](/data/authors/#observed_orcids) on a profile: every ORCID trusted on the profile's works, with the primary first.

Most profiles have one ORCID or none, so `orcid` and `observed_orcids` usually say the same thing. This profile has two:

```json
{
  "id": "https://openalex.org/A5016346717",
  "display_name": "Michael R. Harrison",
  "orcid": "https://orcid.org/0000-0003-1703-9879",
  "observed_orcids": [
    "https://orcid.org/0000-0003-1703-9879",
    "https://orcid.org/0000-0002-9894-8857"
  ]
}
```

## Where ORCIDs come from, and how many there are

OpenAlex never looks a person up in the ORCID registry to decide which works are theirs. An ORCID reaches OpenAlex **attached to a work**: the publisher collects it at submission and deposits it with the work's metadata (mostly via [Crossref](https://www.crossref.org/) and [DataCite](https://datacite.org/)), or a repository asserts it in its own records. That is the only way in. A researcher who has an ORCID but never gave it to a publisher is invisible on this axis, and so is every paper written before they registered.

That makes ORCID far rarer in the literature than people expect:

| works published | authorships with an ORCID | works with at least one ORCID author |
|---|---|---|
| before 2010 | about 1 in 20 | 7% |
| 2010–2019 | about 1 in 13 | 14% |
| 2020–2022 | about 1 in 7 | 23% |
| 2023 onward | about 4 in 10 | 47% |

Across the whole corpus, one authorship in six carries an ORCID. About one author profile in ten has one; among profiles with five or more works, about one in three. So a profile with `orcid: null` is the normal case, not a defect. It means no work attached to that profile ever arrived carrying one. You can check for yourself by pulling the profile's works and reading `raw_orcid` on the relevant authorships:

```
https://api.openalex.org/works?filter=author.id:A5022959619&select=id,authorships
```

If other authors on the same works have ORCIDs and this one does not, the record was ingested fine; this person's ORCID simply was not in it.

## How the primary ORCID is chosen

`orcid` is set by the first rule that applies:

1. The ORCID the profile's owner set by [curation](/how-to/fixing-authors/#how-do-i-set-or-correct-my-orcid).
2. Otherwise, the trusted ORCID that appears on the most of the profile's works.
3. Otherwise, the ORCID the profile was created with, kept from before OpenAlex tracked ORCIDs per work.

"Trusted" is a filter applied to each `raw_orcid` before it counts. An ORCID is not trusted on a work when it is stamped on more than one author of that work, when it arrives on a bulk data deposit, or when the name on the authorship is incompatible with the name that ORCID carries on its other works. Untrusted ORCIDs still appear as `raw_orcid`, because that is what the source said; they just do not shape the profile.

## Why a profile can have more than one ORCID

Three ordinary reasons, in rough order of how often we see them:

- **The person registered more than once.** Journal submission systems ask for an ORCID and offer to create one on the spot, and many researchers end up with two or three over a career. Both are real, both are theirs.
- **A publisher attached the wrong ORCID to the authorship.** See the next section. The stray ORCID sits on one of the person's works and gets picked up.
- **The profile is overmerged.** It has absorbed works by someone else, and their ORCID came along.

Because the first reason is common, two ORCIDs on one profile is not evidence of two people, and OpenAlex does not split a profile on it. A long `observed_orcids` list is a hint to look closer, not a verdict; the list reports what the works actually carry.

## Why an ORCID can be wrong

Errors are made when the ORCID is attached to the work, upstream of OpenAlex. The common ones: two co-authors' ORCIDs are swapped, one author's ORCID is stamped on every authorship of the paper, an editor's or corresponding author's ORCID lands on someone else's seat, or an iD is copied from the wrong submission form. None of these are ORCID's fault, and none can be detected from the ORCID alone.

The trust filter above catches the obvious cases. What it cannot catch, a person can: the profile's owner can [remove an ORCID that is not theirs](/how-to/fixing-authors/#how-do-i-set-or-correct-my-orcid), and remove a work that is not theirs, which takes its ORCID with it. The `raw_orcid` on the work itself stays as deposited; that is the publisher's record, and [correcting it means correcting it with the publisher](/how-to/fixing-authors/#a-paper-shows-the-wrong-orcid-for-me-can-i-fix-it).

## One ORCID, one profile

One ORCID should belong to at most one OpenAlex author. When two profiles carry the same ORCID they are almost always the same person split in two, and we merge those splinters over time.

OpenAlex does not merge automatically the moment two profiles share an ORCID. A shared ORCID is usually right, but not always (the wrong-attachment cases above are exactly how one person's ORCID ends up on a stranger's profile), and a wrong merge is harder to undo than a missing one. If you are the person, you do not have to wait: [claim your profile and merge the duplicates yourself](/how-to/fixing-authors/#how-do-i-merge-duplicate-profiles). If you are matching by ORCID at scale, treat a shared ORCID as a strong hint rather than proof, and expect the count of shared ORCIDs to fall from release to release.

## What ORCID does in matching

When a new work arrives with a trusted ORCID that matches a profile (the primary or any observed ORCID), the authorship attaches to that profile even if the printed name is quite different. Two limits matter:

- **It is not applied retroactively.** OpenAlex does not periodically re-scan works already in the database and re-home them by ORCID. An ORCID on a new work attaches that work; earlier works stay where they are. A work that carries your ORCID but sits on another profile is fixed by [moving the work](/how-to/fixing-authors/#how-do-i-add-or-remove-works).
- **It does not keep people apart.** Two authorships with different ORCIDs can still be merged on the strength of name, institution, and co-author signals, for the reasons above.

ORCID is the strongest of the [disambiguation signals](/data/authors/disambiguation/#the-signals) where it exists. Names carry most of the load because every work has them.

## Looking up authors by ORCID

ORCID is a first-class identifier across the API. Lookup and filtering check the primary and every observed ORCID:

- Fetch an author directly: [`api.openalex.org/authors/orcid:0000-0003-2780-0393`](https://api.openalex.org/authors/orcid:0000-0003-2780-0393), or with the full URL, `/authors/https://orcid.org/0000-0003-2780-0393`. This returns one profile. If the ORCID is shared by splinters, it returns one of them; use the filter below to see all.
- Filter authors: `filter=orcid:0000-0003-2780-0393` matches the primary or any observed ORCID and returns every profile that carries it. `filter=observed_orcids:...` matches the list specifically. `has_orcid:true` / `false` selects on presence.
- Filter works by an author's ORCID: `filter=authorships.author.orcid:0000-0003-2780-0393`. This matches the resolved author's primary ORCID.
- Compare what the work asserted with what OpenAlex resolved: [`authorships[].raw_orcid`](/data/authorships/#raw_orcid) against [`authorships[].author.orcid`](/data/authorships/#author).

## Changing your ORCID

The owner of a claimed profile can set the primary ORCID or remove a wrong one; `observed_orcids` follows. How, and what it does and does not change: [How do I set or correct my ORCID?](/how-to/fixing-authors/#how-do-i-set-or-correct-my-orcid)
