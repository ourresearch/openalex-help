---
title: "Finding papers with keywords"
updated: 2026-10-01
description: "Find the papers a text search misses: pick the right keywords with the /text endpoint or your AI agent, then combine them with a title and abstract search."
tags: ["search"]
synonyms: ["keyword search", "keywords", "subject search", "controlled vocabulary", "recall", "find more papers", "synonyms", "literature search", "search strategy", "missing papers"]
card: "Find the papers your text search misses, and let your AI agent pick the keywords."
---
A text search finds papers that use your words. A [keyword](/data/keywords/) finds papers about your subject, whatever words their authors used, and works with no abstract too. Use both together and you find far more of what you're looking for.

## Combine a keyword with a text search

Say you're studying antimicrobial resistance. A title and abstract search for the phrase finds about 137,000 works. The `antimicrobial-resistance` keyword finds about 146,000 more that say "antibiotic resistance", "drug-resistant bacteria" or nothing at all: about 43,000 of them have no abstract. Most are on topic. Get both in one [OQL](/api/oql/) query:

```
works where keyword is (antimicrobial-resistance) or title/abstract has ("antimicrobial resistance")
```

On openalex.org, search for your phrase, then add a keyword filter.

## Find the right keywords

There are about 1.9 million keywords, so the one you need usually exists; the trick is finding its name. Two ways:

- **Search the keywords** at [`api.openalex.org/keywords?search=`](https://api.openalex.org/keywords?search=antimicrobial) and check each one's `works_count`.
- **Ask OpenAlex.** Send a sentence describing your topic to [`/text/keywords`](/api/tag-aboutness/), and you get back the keywords that fit it.

If your topic has several parts, require a keyword for each part. "How remote work affects employee wellbeing" needs `remote-work` **and** `employee-health`; `remote-work` alone brings in everything about remote work.

## Let your AI agent do it

This is a good job for an AI agent such as Claude Code or Codex. Paste in this prompt, with your own topic and a [free API key](/api/authentication/):

```
Use the OpenAlex API to find research on the topic below. Read the docs first: https://help.openalex.org/llms.txt. Send my description to the /text/keywords endpoint to see which OpenAlex keywords fit it. Look each one up and keep only those that match my topic; if a keyword covers just one part of it, require a keyword for every part. Then search works that have those keywords, or my main phrase in the title or abstract. Save a CSV (OpenAlex ID, DOI, title, year, cited-by count) of up to the 2,000 most-cited works, and show me the exact query you ran and how many works each part found.
My OpenAlex API key: <your key>
My topic: <describe your topic in a sentence>
```

We tested it on fresh installs of two agents, and it worked every time. For remote work and employee wellbeing, the agents chose `remote-work` plus `employee-health` or `work-life-balance`. A title and abstract search found 2,457 works; the keywords found 3,876 more, on topic about as often as the text matches. That's more than twice as many relevant works, including [papers on "telework"](https://openalex.org/works/W4318067105) and [papers in Spanish](https://openalex.org/works/W4387828597) that the phrase search can't see.

Keep the query the agent shows you: rerun it later, or share it so others can check your search.

## What keywords miss

Keywords are assigned by a model, so some are wrong and some works have none (about 11% of works). For a search that must find everything, such as a systematic review, use keywords alongside your text search, never instead of it. If a keyword is wrong, or two keywords should be one, [tell us](https://openalex.org/help).
