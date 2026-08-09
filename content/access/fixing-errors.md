---
title: "Overview"
description: "How to report errors in OpenAlex, fix them yourself, and get help — tickets, self-serve curation for authors and affiliations, and where support fits in."
tags: ["reference"]
---
OpenAlex is built by inference at enormous scale — [hundreds of millions of works](/data/how-its-built/), disambiguated authors, matched affiliations — and inference is sometimes wrong. This section is about what to do when you find an error: how to report it, which errors you can fix yourself, and how to get help.

## What to do, by what's wrong

| What's wrong | What to do |
|---|---|
| A work (OA status, metadata, links, citations, duplicates, missing) | File a ticket — see [Works](/access/fixing-errors/works/) |
| A source or journal (metadata, OA classification, missing journal) | File a [ticket](https://openalex.org/contact) |
| Your author profile | Fix it yourself — see [Authors](/access/fixing-errors/authors/) |
| Affiliation matching | Affiliation Editor (members) or ticket — see [Affiliations](/access/fixing-errors/affiliations/) |
| Institution metadata (name, hierarchy, ROR record) | Fix it at [ROR](https://ror.org/) — we sync from ROR |
| Anything else | File a [ticket](https://openalex.org/contact) — be specific, include URLs |

## How fixing errors works

There are two lanes:

**Ticket-based — the default, and it works for everything.** [File a ticket](https://openalex.org/contact) describing what's wrong. There are no forms and no special tools to learn: our AI agents read every report, turn it into a structured correction where they can, verify it against the evidence, and apply it — or escalate to a human when a report points at a bigger bug (say, a repository we're not harvesting). Verification matters more than you'd think: in our tests, about half of user-submitted corrections were themselves wrong (see [Works](/access/fixing-errors/works/) for the most common reason).

**Self-serve — for the two highest-volume cases.** If it's *your author profile*, [claim it and fix it yourself](/access/fixing-errors/authors/). If it's *affiliation matching* and you're at a [member institution](/access/pricing/), use the [Affiliation Editor](/access/fixing-errors/affiliations/). Both are also fully drivable by [AI agents](/access/agents/) with just your API key.

One case doesn't belong to us at all: **institution metadata** — the institution's name, alternate names, parent/child hierarchy, or anything else on its ROR record. OpenAlex syncs institutions from [ROR](https://ror.org/), so the fix happens there; see [Affiliations](/access/fixing-errors/affiliations/) for details.

## Writing a good ticket

The difference between a fixable report and an unfixable one is specificity: say exactly which record is wrong (URL or ID), what's wrong with it, what the right value is, and link evidence.

A fixable ticket:

> The OA status on https://openalex.org/W2741809807 (DOI 10.7717/peerj.4375) says closed, but the article is free to read on the publisher's site: https://peerj.com/articles/4375. Please mark it open.

An unfixable one:

> There are lots of errors in your data about my university. Many papers are wrong or missing. Please fix your database.

The first names one record, one problem, and links proof — an agent can act on it in minutes. The second gives us nothing to check: no IDs, no examples, no way to tell which of several possible problems is meant.

## How support works

Support requests go through [openalex.org/contact](https://openalex.org/contact) (the **Contact Support** button on this site's homepage goes there too). Some honesty about what to expect: we read every ticket, but we're a small team getting hundreds of tickets a month, so we can't respond to all of them. Tickets still matter even when they don't get a reply — they're a key input into what we prioritize and fix.

Other ways to get help:

- **Paid support.** Organizations that rely on OpenAlex can [subscribe to a plan](/access/pricing/) that includes guaranteed, timely support.
- **The community.** The [OpenAlex User Group](https://groups.google.com/g/openalex-users) is where users help each other and where we post announcements.
- **AI agents.** This entire site is built to be read by agents ([llms.txt](/llms.txt), a Markdown twin of every page) — asking your agent is often the fastest way to an answer. See [Agents](/access/agents/).
