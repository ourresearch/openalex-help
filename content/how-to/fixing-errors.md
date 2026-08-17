---
title: "Fixing Errors: Overview"
navLabel: "Overview"
updated: 2026-08-17
description: "Found an error in OpenAlex? Start here: what you can fix yourself right now, and how to report everything else."
tags: ["fixing"]
synonyms: ["report error", "report bug", "found a mistake", "wrong data", "fix error", "error portal"]
card: "Start here: what you can fix yourself right now, and how to report everything else."
---
OpenAlex is built by inference at enormous scale, and inference is sometimes wrong. When you find an error, there are two lanes: a few high-volume cases you can **fix yourself, right now, in the app** — and everything else, which is a **ticket** that our AI agents turn into a verified correction. This page routes you to the right lane.

## Which lane am I in?

| What's wrong | What to do |
|---|---|
| **Your own author profile** — wrong or missing works, name variants, duplicate profiles | Fix it yourself, no ticket needed — [Fixing authors](/how-to/fixing-authors/) |
| **Affiliation matching** — works matched to the wrong institution, or your institution seems to be missing works | Self-serve for [member institutions](/access/pricing/), ticket otherwise — [Fixing affiliations](/how-to/fixing-affiliations/) |
| **Your institution's own record** — its name, alternate names, or hierarchy | Fix it at [ROR](https://ror.org/) — OpenAlex syncs institution records from ROR |
| **Anything else** — a work's open-access status, metadata, dates, citations, a missing work or journal | [File a ticket](https://openalex.org/contact) — [Fixing data errors](/how-to/fixing-data-errors/) has the recipes |

## What can I fix myself?

The two highest-volume error classes are fully self-serve:

- **Your author profile.** [Claim it](/how-to/fixing-authors/) and you can add and remove works, correct your names, and merge duplicate profiles — the fix is live within a day or two. (You can also make your profile [private](/how-to/author-profile-privacy/).)
- **Affiliation matching.** If you're at a [member institution](/access/pricing/), the Affiliation Editor lets you correct how affiliation strings map to your institution — see [Fixing affiliations](/how-to/fixing-affiliations/).

Both are also fully drivable by [AI agents](/access/agents/): hand your agent your CV and your API key, and it can do the whole cleanup for you.

## How do I report everything else?

[File a ticket](https://openalex.org/contact). No forms, no special tools — just include four things, and your report can be acted on in minutes:

1. **The record's ID or URL** (e.g. `W2741809807` or the DOI) — not just a title.
2. **What's wrong** — the specific field or claim.
3. **What's right** — the correct value.
4. **Evidence** — a URL we can check.

[Fixing data errors](/how-to/fixing-data-errors/) has recipes for the most common reports (open-access status, sources, dates, missing works).

## What happens after I report?

Our AI agents read every report, verify it against the evidence, and apply the fix — or escalate to a human when a report points at a bigger bug. We're a small team with a big pipeline, so not every ticket gets a reply, but every ticket is read and acted on where it can be. The full story of how corrections work is in the [Fixing errors reference](/access/fixing-errors/).
