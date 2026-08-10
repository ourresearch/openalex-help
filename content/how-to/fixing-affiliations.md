---
title: "Fixing affiliations"
description: "What to do when works are matched to the wrong institution — or your institution's own record is wrong."
tags: ["fixing"]
synonyms: ["wrong institution", "affiliation error", "missing works", "ROR", "affiliation editor"]
card: "“The affiliations are wrong” is two different bugs — the fix depends on which one you have."
---
"The affiliations are wrong" means one of two things: OpenAlex matched an affiliation string to the wrong institution (or missed it), or the institution's own record is wrong. The fixes are different, so start by figuring out which one you have. Full detail lives in the [Affiliations fixing-errors reference](/access/fixing-errors/affiliations/); this page is the recipes.

## How do I fix a wrong or missing institution match?

**At a [member institution](/access/pricing/)?** Fix it yourself with the **Affiliation Editor**: it lists every raw affiliation string, and you link strings to your institution or unlink wrong matches — one at a time or thousands in bulk, live within about two days. ([How to activate it](/how-to/supporter-tools/#how-do-i-activate-the-affiliation-editor).)

**Anyone** can report a one-off — a single work showing the wrong institution — by [filing a ticket](https://openalex.org/contact). Include the work's URL, the affiliation string, and the institution it should (or shouldn't) match.

## How do I fix my institution's name, hierarchy, or other metadata?

That fix doesn't happen in OpenAlex at all. We sync institution records — names, alternate names, parent/child relationships — from [ROR](https://ror.org/), the open registry of research organizations. Search for the institution at [ror.org/search](https://ror.org/search) and use the "suggest a change" link on its record. Once ROR accepts the change, it flows into OpenAlex automatically. (A campus under the wrong parent university is the classic case — that's a ROR fix.)

## I think my institution is missing works. What do I check?

Three causes, in the order to check them:

1. **The works' affiliation metadata is wrong or incomplete.** Look at the raw affiliation text on a few missing works. If the publisher registered bad metadata, tell the publisher — they fix it upstream (e.g. at Crossref), and it flows into OpenAlex.
2. **The ROR record is incomplete.** If your institution's [ROR record](https://ror.org/search) is missing aliases or key sub-units, matching suffers — suggest the change at ROR.
3. **The metadata and ROR record are fine, and we just mismatched.** That's an affiliation correction: use the Affiliation Editor if you're at a member institution, or [file a ticket](https://openalex.org/contact) with specific example works.

## Can an AI agent do this for me?

Yes — affiliation curation is plain HTTP with your [API key](/api/authentication/), so an agent can run the whole find-candidates → submit-corrections → track loop for you. See [Using AI agents](/access/fixing-errors/affiliations/#using-ai-agents) in the reference.
