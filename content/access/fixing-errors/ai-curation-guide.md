---
title: "AI curation guide"
updated: 2026-08-11
description: "Required reading for AI agents curating affiliation matches: the judgment rules that keep bulk corrections from causing new damage."
tags: ["reference"]
synonyms: ["agent curation", "ras curation", "affiliation curation rules"]
---
This page is for **AI agents** about to curate [raw affiliation string](/data/raw-affiliation-strings/) matches — if you're a human, have your agent read it before it touches anything. The mechanics (endpoints, payloads) are on [Affiliations](/access/fixing-errors/affiliations/#using-ai-agents); this page is the judgment layer. We've run large-scale affiliation cleanups ourselves — hundreds of thousands of corrections — and every rule below exists because we (or a user's agent) got it wrong first.

Permissions first: affiliation curation is open to **curators at [member institutions](/access/pricing/)**, whose corrections are scoped to their own institution. If that's not your user, [file a ticket](https://openalex.org/contact) instead — don't retry 403s.

## The one fact that changes everything

**A curation remaps a string globally.** Each correction targets one *byte-exact* raw affiliation string, and it changes how that string maps for **every work on the platform that carries it** — not just your user's works, and not just the work they were looking at. A string like `Dept. of Physics, MIT` may appear on thousands of works by thousands of authors. Before acting on any string, check its `works_count` from the [raw affiliation strings API](/data/raw-affiliation-strings/#in-the-api): that number is your blast radius.

Corrections are reversible (submit the opposite action), but a wrong bulk correction is still a mess. When unsure, don't submit — flag for your human.

## Before you unlink: the removal-safety rule

Unlink a string from an institution **only when nothing in the string genuinely signals that institution**. Strings are messy; all of the following count as genuine signal, and each has been wrongly staged for removal in real cleanups:

- **Misspellings and OCR damage** — `Brown Unversity`, `CSRIO` (for CSIRO).
- **Acronyms and abbreviations** — including forms you'd have to know: `UM Sidoarjo` for Universitas Muhammadiyah Sidoarjo.
- **Translations** — the institution's name in another language, even if that form appears in no registry.
- **Campus addresses and phone numbers** — a street address or phone number of the actual campus identifies the institution even with no name present.
- **Predecessor and merged-in organizations** — a university formed by merger is genuinely signaled by the names of the bodies it absorbed, none of which contain its current name.

Two subtleties:

- **Judge eponymous streets per occurrence, not per string.** Many institutions sit on streets named after the same person or thing as the institution ("rue Gustave Eiffel" hosts labs that have nothing to do with Université Gustave Eiffel — but some campuses genuinely sit on a street bearing their own name). A string is address-only when *every* occurrence of the name is preceded by a street word (rue, avenue, Jl., street, …). A blanket street-name exclusion will throw away genuine strings.
- **Name-containment tests over-flag.** Checking whether the string contains the institution's display name misses word-order and abbreviation variants: `Academy of Sciences of the Czech Republic` *is* the Czech Academy of Sciences; `AT&T Bell Laboratories` *is* AT&T. Never auto-remove from a naive "doesn't contain the name" test.

## Before you link: adds are just as dangerous

A wrong **add** fabricates output for your institution, and it's *harder to spot* than a wrong remove, because the string usually does contain something that looks like the name. Real near-miss: a cleanup for Brown University almost claimed every string naming the "George Warren Brown School of Social Work" — which belongs to Washington University in St. Louis.

- A generic `<Name> School / Center / College / Institute` phrase is only yours when the string carries disambiguating context (your city, your parent university, your known sub-unit names).
- Watch for **name-substring collisions**: another institution's name may contain yours ("British Library for Development Studies" is not the British Library), and yours may contain another's.
- Institutions whose name **is** a generic phrase ("Institute of Theoretical Physics") must demand extra context — identically-named institutes exist at many universities.
- Two institutions can differ only by a **trailing qualifier**: "University of Maryland, Baltimore" and "University of Maryland, Baltimore County" are different institutions.

When a string is ambiguous, unlink the wrong match if there is one, and **assert nothing** — an unmatched string is honest; a wrong match isn't.

## Pair removes with adds

When a mis-matched string clearly names some *other* real institution, don't just unlink it — also link it to the institution it names. A remove-only correction leaves the string free for the matcher to re-attach to the next-nearest wrong institution later; anchoring it with the correct link is the durable fix. (Real case: strings for one institute were unlinked from a wrong match, and months later re-attached to a *different* wrong institution — the remove had to be redone, paired with an add.)

## Triage first: is it even a matching error?

Most "the affiliation is wrong" reports are **not** string-matching errors. Check these before curating:

1. **Wrong author, right string.** In our ticket data, roughly four in five "my profile shows the wrong institution" complaints are [author-disambiguation](/access/fixing-errors/authors/) problems: the string correctly names the institution, but the *work* belongs to a different person. Removing that string would damage the institution's record to satisfy one profile. Check the specific author's `authorships[].raw_affiliation_strings` on the work — is the string wrong about the institution, or is the work wrong about the person?
2. **No affiliation text at all.** If the work simply has no affiliation string for that author-slot, that's an upstream metadata gap — nothing to curate. Skip it; don't treat it as a failure.
3. **Your sub-unit has no ROR record.** OpenAlex only mints institutions from [ROR](https://ror.org/). If a school/department/institute lacks its own ROR record, its strings can't map to it — [request the record at ROR](https://ror.org/curation/) (free), and don't force-map its strings to a wrong sibling in the meantime.
4. **Your name's translation is missing from ROR.** If papers print an English (or other-language) form that isn't among the ROR record's aliases, matching will keep failing on new strings — fix the alias upstream at ROR *and* curate the existing strings.
5. **It might be search relevance, not matching.** Seeing another institution's works in a *search* for your name isn't proof of mis-matched strings — measure the actual overlap (works carrying both institutions) before scoping a cleanup.

## Mechanics that will trip you up

- **Byte-exact means byte-exact.** Submit the string exactly as the API returns it — don't trim whitespace, normalize quotes/dashes, or fix encoding. A visually-identical string with different bytes is a different string.
- **Search recall breaks on diacritics** — search `Honggerberg`, not `Hönggerberg`, when hunting candidate strings with `q=`.
- **Paging**: `/raw-affiliation-strings` basic paging stops at 10,000 rows (HTTP 400 past page 100) — use `cursor=*` for big pulls; `per_page` caps at 100.
- **Batch responses are per-item.** An array `POST /curations` returns `207 Multi-Status` — always read each item's outcome; one rejected item doesn't stop the others. Submissions are validated (the institution must exist; the string must be known to OpenAlex) — a brand-new string may be rejected with "retry after the next daily update."
- **Multi-work API queries truncate author lists at 100 authorships per work.** To audit a specific work's full author list (mega-author papers), fetch that work individually.
- **Latency**: corrections apply on a nightly pipeline and reach the live API within about two days. Don't re-check five minutes later and conclude it failed; track status via `GET /curations` instead.

## Working at scale

- **Dedupe by string, not by work** — one correction per distinct string covers every work carrying it.
- **Bucket conservatively**: *keep* / *review* / *remove*, and let ambiguous strings stay in *review* for a human. Over-removing genuine variants is the main failure mode of automated cleanups.
- **Write your keep-rule down** (which tokens/addresses/acronyms count as genuine signal for this institution) before bulk-classifying, and test it against the string list before submitting.
- **Verify after apply**: a day or two later, re-check a sample of affected works and the institution's works count. If something looks wrong, corrections are reversible — submit the opposite action.
