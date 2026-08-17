---
title: "Author profile privacy"
updated: 2026-08-15
description: "What an author profile is, how to fix one, and how we handle requests to remove one — including privacy and personal-data requests."
tags: ["fixing"]
synonyms: ["remove my profile", "delete my profile", "personal data", "GDPR", "privacy", "consent", "right to be forgotten", "data removal"]
card: "Profiles are built from the public scholarly record. Errors are fixable; removal has a defined path."
---
OpenAlex indexes the world's scholarly research: over 250 million works, gathered from public sources like publishers, repositories, Crossref, and ORCID. When several works share the same author, our system groups them into an **author profile**.

Your author profile isn't a biography, and nobody wrote it — it's generated automatically, and it contains only bibliographic facts that are already part of the public scholarly record: your name as printed on your papers, the affiliations listed on those papers, and public identifiers like your ORCID iD. If you've published research, you likely have a profile, just as you appear in a library catalog — no account or consent is involved, and there's nothing private in it.

Because profiles are assembled by an algorithm matching names across millions of works, they sometimes get things wrong: a paper by someone with a similar name lands on your profile, your work is split across two profiles, or an old affiliation shows up as current. **These errors are fixable, and we want to fix them.**

## Fixing your profile

The fastest paths, in order:

1. **Claim your profile.** Sign in at [openalex.org](https://openalex.org), find your profile, and [claim it](/how-to/fixing-authors/#how-do-i-claim-my-profile). Once verified, you can correct which works belong to you directly.
2. **Report an error.** Use the "Fix errors" option on the profile page, or see [reporting data errors](/how-to/fixing-data-errors/). Tell us the profile ID (like `A5012345678`) and the specific works or affiliations that are wrong — links or DOIs help a lot.
3. **[Email support](/how-to/support/)** if neither works for you.

Corrections are free and don't require any legal paperwork. Common fixes: removing works that aren't yours, merging duplicate profiles, splitting conflated authors, correcting a linked ORCID, and updating affiliations. The full self-serve story is on the [fixing authors](/how-to/fixing-authors/) page.

One thing to know: fixes flow through our data pipeline, so they can take a few days to appear everywhere.

## Removing your profile

Some researchers ask us to delete their profile entirely. Here's how we handle that, honestly and up front:

- **We don't delete author profiles simply on request.** OpenAlex exists to provide a complete public record of scholarship, and that record includes who wrote what. A missing profile makes the record wrong for everyone who cites, funds, hires, or builds on your work. (This is the norm for scholarly databases generally — bibliographic indexes preserve the published record.)
- **Most removal requests are really correction requests.** If the reason you want your profile gone is that it's *wrong* — wrong papers, wrong affiliation, mixed up with someone else — a correction solves the actual problem, usually quickly. Start there.
- **We will remove a profile when your particular situation outweighs the public record.** If you have specific circumstances — for example, a verified safety risk — email **privacy@openalex.org** and describe your situation. We weigh each request individually, acknowledge promptly, and aim to give you a substantive answer within 30 days. If we decline, we'll tell you why, and if you're in the EU or UK you can raise it with your data protection authority.
- **What removal can and can't cover.** We can suppress the *profile* — the page that groups your works. We can't remove your name from the *works themselves*: bylines are the published record, supplied by publishers and repositories. To change a byline, contact the publisher of record; once they correct it, OpenAlex reflects the change.

## For institutions and repositories

If your institution received a data-subject request that requires removing a harvested record, and you've already removed it at the source, email privacy@openalex.org with the work ID and evidence of the upstream removal — we'll mirror it. We can't remove records that are still live at the source.

## The legal details

The formal version of this policy — what data we hold about researchers in the dataset, its public bibliographic sources, our legal basis for processing it, and how we handle correction and removal requests — lives in the "Personal Data in the OpenAlex Dataset" section of our [Privacy Policy](https://openalex.org/privacy).
