---
title: "Finding papers with keywords"
updated: 2026-10-03
description: "Find the papers a text search misses: OpenAlex search matches keywords along with titles and abstracts, and your AI agent can add more keywords by meaning."
tags: ["search"]
synonyms: ["keyword search", "keywords", "subject search", "controlled vocabulary", "recall", "find more papers", "synonyms", "literature search", "search strategy", "missing papers"]
card: "Find the papers your text search misses, and let your AI agent pick the keywords."
---
A text search finds papers that use your words. A [keyword](/data/keywords/) finds papers about your subject, whatever words their authors used, and works with no abstract too. OpenAlex search now uses both at once, so you find far more of what you're looking for.

## Just search

Say you're studying antimicrobial resistance. A title and abstract search for the phrase finds about 119,000 works. Search titles, abstracts and keywords together and you get about 241,000: the `antimicrobial-resistance` keyword brings in about 122,000 works that say "antibiotic resistance", "drug-resistant bacteria" or nothing at all (about 47,000 of them have no abstract), and most of those are on topic (about four in five).

```
https://api.openalex.org/works?search.title_abstract_keywords="antimicrobial resistance"
```

On openalex.org that's the default, and the top results are [reranked](/api/searching/#rerank) so the papers most clearly about your topic come first. In [OQL](/api/oql/) it's `works where title/abstract/keywords has ("antimicrobial resistance")`. How it works: when a phrase in your search names a keyword (or one of its synonyms), a work matches if the phrase is in its text or it carries the keyword, and every other word in your search must still be in the text. [More in the search guide](/api/searching/#keywords-in-search).

## Find more keywords

The search catches keywords your search names. To find keywords that mean your topic in other words, or to filter by a keyword directly, look them up. There are about 1.9 million keywords, so the one you need usually exists; the trick is finding its name. Two ways:

- **Search the keywords** at [`api.openalex.org/keywords?search=`](https://api.openalex.org/keywords?search=antimicrobial) and check each one's `works_count`.
- **Ask OpenAlex.** Send a sentence describing your topic to [`/text/keywords`](/api/tag-aboutness/), and you get back the keywords that fit it.

If your topic has several parts, require a keyword for each part. "How remote work affects employee wellbeing" needs `remote-work` **and** `employee-health`; `remote-work` alone brings in everything about remote work. (The search does this on its own for the keywords it finds in your words.)

## Let your AI agent do it

**In Claude, just ask.** Add the free [OpenAlex connector](/how-to/ai-assistants/) and ask for a thorough search in one sentence:

> *Do a thorough search for open-access papers on how remote work affects employee wellbeing.*

The connector searches titles, abstracts and keywords, adds keywords that mean your topic in other words, reranks the results so the most relevant come first, tells you how many works each part found, and gives you the query it ran.

**In other agents** (ChatGPT, Codex, or Claude Code without the connector), tell it something like this, with your own topic and a [free API key](/api/authentication/):

```
Check help.openalex.org first, then use the OpenAlex API to find papers on <your topic>. Use the title, abstract and keywords search, and add OpenAlex keywords that describe my topic in other words, all in one query. Each paper should cover every part of my topic. Read the results as you go and keep only the papers that are really about my topic. Save the 200 most-cited of those as a CSV and show me the query and how many papers each part found.
My API key: <your key>
```

Keep the "check help.openalex.org" part: without it, agents work from what they remember about the OpenAlex API, which is out of date. We tested this prompt on fresh installs of Claude Code and Codex: every run found the title, abstract and keywords search here and built one working query with it, and on remote work and employee wellbeing, 99% of the papers in their final lists were at least partly on topic (about seven in ten clearly so). The agent's own reading is what narrows the wide net down, so keep that sentence too. In the Claude app, set the chat to Auto (next to the model name, under the message box), or it will ask your permission before every search.

Keep the query the agent shows you: rerun it later, or share it so others can check your search.

## What keywords miss

Keywords are assigned by a model, so some are wrong and some works have none (about 11% of works). For a search that must find everything, such as a systematic review, use keywords alongside your text search, never instead of it. If a keyword is wrong, or two keywords should be one, [tell us](https://openalex.org/help).
