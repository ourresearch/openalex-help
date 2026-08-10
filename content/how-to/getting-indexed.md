---
title: "Getting indexed"
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

First, check whether we already harvest your repository: go to [openalex.org/sources?filter=type:repository](https://openalex.org/sources?filter=type:repository) and search for your repository's name. If it's listed, you're in — we check it for new records as part of our regular harvest.

If it's not listed, send us a support request at [openalex.org/contact](https://openalex.org/contact) with your repository's name and its OAI-PMH endpoint (or base URL), and we'll look at adding it.

For how harvesting and matching actually work — and how your repository's metadata affects them — see [Repositories](/data/sources/repositories/) in the Data reference.

## My journal or repository is indexed, but works are missing. What now?

For repositories, this is common and usually isn't a harvesting failure — see [Repositories](/how-to/repositories/) for how to troubleshoot coverage. For journals, check that the missing articles have registered DOIs; if they do and they're still absent after a few weeks, [file a support request](https://openalex.org/contact) with a few example DOIs.
