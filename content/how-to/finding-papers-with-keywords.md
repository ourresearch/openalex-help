---
title: "Finding papers with keywords"
updated: 2026-10-02
description: "Find the papers a text search misses: pick the right keywords with the /text endpoint or your AI agent, then combine them with a title and abstract search."
tags: ["search"]
synonyms: ["keyword search", "keywords", "subject search", "controlled vocabulary", "recall", "find more papers", "synonyms", "literature search", "search strategy", "missing papers"]
card: "Find the papers your text search misses, and let your AI agent pick the keywords."
---
A text search finds papers that use your words. A [keyword](/data/keywords/) finds papers about your subject, whatever words their authors used, and works with no abstract too. Use both together and you find far more of what you're looking for.

## Combine a keyword with a text search

Say you're studying antimicrobial resistance. A title and abstract search for the phrase finds about 118,000 works. The `antimicrobial-resistance` keyword finds about 123,000 more that say "antibiotic resistance", "drug-resistant bacteria" or nothing at all: about 47,000 of them have no abstract. Most are on topic (about four in five). Get both in one [OQL](/api/oql/) query:

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

**In Claude, just ask.** Add the free [OpenAlex connector](/how-to/ai-assistants/) and ask for a thorough search in one sentence:

> *Do a thorough search for open-access papers on how remote work affects employee wellbeing.*

The connector picks the keywords, combines them with a title and abstract search, tells you how many works each part found, and gives you the query it ran.

**In other agents** (ChatGPT, Codex, or Claude Code without the connector), tell it something like this, with your own topic and a [free API key](/api/authentication/):

```
Check help.openalex.org first, then use the OpenAlex API to find papers on <your topic>. Search titles and abstracts, but also use OpenAlex keywords to catch papers that word it differently, all in one query. Each paper should cover every part of my topic. Save the 200 most-cited as a CSV and show me the query and how many papers each part found.
My API key: <your key>
```

Keep the "check help.openalex.org" part: without it, agents work from what they remember about the OpenAlex API, which is out of date. We tested it on fresh installs of Claude Code and Codex, and it built one working query every time. For remote work and employee wellbeing, the keywords added 3,000 to 4,000 papers that the agents' own text searches (which already included "telework" and "working from home") missed, many of them not in English. In the Claude app, set the chat to Auto (next to the model name, under the message box), or it will ask your permission before every search.

Keep the query the agent shows you: rerun it later, or share it so others can check your search.

## What keywords miss

Keywords are assigned by a model, so some are wrong and some works have none (about 11% of works). For a search that must find everything, such as a systematic review, use keywords alongside your text search, never instead of it. If a keyword is wrong, or two keywords should be one, [tell us](https://openalex.org/help).
