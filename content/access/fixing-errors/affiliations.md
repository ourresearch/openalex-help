---
title: "Affiliations"
updated: 2026-08-10
description: "Fix affiliation errors: the Affiliation Editor for wrong institution matches (self-serve for members), tickets for one-offs, and ROR for the institution record itself."
tags: ["reference"]
---
"The affiliations are wrong" means one of two different things, with two different fixes: either OpenAlex **matched an affiliation string to the wrong institution** (or missed it), or **the institution's own record is wrong**. Figure out which one you have and the rest is easy.

## Wrong or missing institution match

OpenAlex reads the [raw affiliation strings](/data/raw-affiliation-strings/) authors put on their papers ("Dept. of Physics, MIT, Cambridge MA") and matches each one to an [institution](/data/institutions/). The matcher handles messy text in many languages, but it can pick the wrong institution or fail to match at all.

**If you're at a [member institution](/access/pricing/), fix it yourself with the Affiliation Editor** (in your account settings on [openalex.org](https://openalex.org)). It shows every raw affiliation string, searchable and filterable by whether it's linked to your institution; for each string you can see the works carrying it, then **link** it to your institution or **unlink** a wrong match — one at a time or in bulk, thousands of rows at once. Corrections apply automatically as [curations](/data/curations/), no review queue, and are live within about two days; you can track each one's status (pending → applied) from your account. To undo a correction, submit the opposite one.

**Anyone can report a one-off** — a single work showing the wrong institution, a string matched badly — by [filing a ticket](https://openalex.org/contact): include the work URL, the affiliation string, and the institution it should (or shouldn't) match.

## Using AI agents

Like [author curation](/access/fixing-errors/authors/), affiliation curation is plain HTTP with your [API key](/api/authentication/) — an [AI agent](/access/agents/) can do an entire cleanup for you. **Make sure your agent reads the [AI curation guide](/access/fixing-errors/ai-curation-guide/) first** — it's the judgment rules (when a string genuinely signals your institution, why adds are as risky as removes, what isn't a matching error at all), learned from our own large-scale cleanups.

The fastest start: [**do this in Claude**](https://claude.ai/new?q=Before%20doing%20anything%2C%20read%20https%3A//help.openalex.org/access/fixing-errors/ai-curation-guide.md%20and%20https%3A//help.openalex.org/access/fixing-errors/affiliations.md.%20Then%20help%20me%20curate%20the%20affiliation%20strings%20matched%20to%20my%20institution%20in%20OpenAlex%3A%20find%20wrong%20matches%20and%20missing%20strings%2C%20and%20submit%20corrections%20with%20my%20API%20key.%20My%20institution%20is%3A%20) — it opens your assistant pre-primed with the guide and this page; just append your institution.

The loop an agent runs:

1. **Find candidates**: `GET api.openalex.org/raw-affiliation-strings?q=<search>&unmatched-institutions=I123…` lists strings containing your search text that aren't yet linked to your institution (`matched-institutions=` audits existing links).
2. **Submit corrections**: `POST user.openalex.org/curations` (with `Authorization: Bearer <api_key>`) — a JSON array of `{"entity": "ras", "entity_id": "<the exact string>", "property": "institution_ids", "action": "add", "value": "https://openalex.org/I123…"}` (or `"action": "remove"` to unlink). The response reports each item's outcome individually.
3. **Track**: `GET user.openalex.org/curations?entity=ras&status=pending` until they're applied.

One quirk worth knowing: a string OpenAlex hasn't indexed yet is rejected with a "retry after the next daily update" message — wait a day and resubmit.

## The institution itself is wrong

If the problem is the institution's **name, alternate names, parent/child hierarchy, or other metadata** — a campus listed under the wrong parent university is the classic case — the fix doesn't happen in OpenAlex at all. OpenAlex syncs its institution records from [ROR](https://ror.org/), the open registry of research organizations. Look up the institution at [ror.org/search](https://ror.org/search) and use the "suggest a change" link on its record; once ROR accepts the change, it flows into OpenAlex automatically.

## How matching works

Curious why a string matched the way it did? [Raw affiliation strings](/data/raw-affiliation-strings/) explains the matching pipeline — the model, the rules pass, and its known failure modes.
