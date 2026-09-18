---
title: "Getting indexed"
updated: 2026-09-18
description: "How to get your journal's or repository's works into OpenAlex."
tags: ["general"]
synonyms: ["journal indexing", "repository indexing", "add my journal", "add my repository"]
card: "We don’t index journals directly — we harvest Crossref and friends, so get in there first."
---
OpenAlex indexes works — publications, datasets, theses, and so on — by harvesting the big scholarly [indexes](/data/indexes/): Crossref, DataCite, PubMed, and others, plus thousands of repositories. So "getting indexed" means getting your works into a place we already harvest.

## How do I get my journal indexed in OpenAlex?

Get your articles into one of the [indexes](/data/indexes/) we harvest, and they'll flow into OpenAlex automatically. For most journals that means registering DOIs through [Crossref](https://www.crossref.org/) (or [DataCite](https://datacite.org/), for data-heavy publishing). Beyond OpenAlex, DOIs are infrastructure your articles should have anyway — they're how citations, reference lists, and discovery services link to your work across the whole scholarly ecosystem.

Once your DOIs are registered, no separate OpenAlex submission is needed: new records show up as we harvest.

## How do I get my repository indexed in OpenAlex?

Check whether we already harvest you at [openalex.org/sources?filter=type:repository](https://openalex.org/sources?filter=type:repository); if not, email [support@openalex.org](mailto:support@openalex.org?subject=Add%20my%20repository) with your OAI-PMH endpoint URL and we'll add it. That's the whole process: no form, no validator. The full recipe, the endpoint checklist, and how to read your source's Harvest tab afterwards are on [Repositories](/how-to/repositories/#how-do-i-get-my-repository-harvested-by-openalex).

**Running a journal on OJS?** OJS exposes an OAI-PMH endpoint, so journals often ask to be registered as repositories. Which path fits depends on DOIs. If your articles have Crossref DOIs, nothing more is needed: they arrive through Crossref, with the journal as their source. If they don't, we can harvest your OJS endpoint like a repository, but matching and metadata are weaker that way, and the lasting fix is still to register DOIs.

## My journal or repository is indexed, but works are missing. What now?

For repositories, this is common and usually isn't a harvesting failure — see [Repositories](/how-to/repositories/) for how to troubleshoot coverage. For journals, check that the missing articles have registered DOIs; if they do and they're still absent after a few weeks, [file a support request](https://openalex.org/contact) with a few example DOIs.
