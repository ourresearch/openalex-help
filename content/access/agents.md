---
title: "Agents"
description: "How to get the most out of AI agents — Claude, ChatGPT, Cursor, and friends — when working with OpenAlex."
tags: ["reference"]
---
AI agents are often the easiest way to use OpenAlex — and frequently the most powerful. You describe what you want; the agent figures out the queries, calls the [API](/api/), and hands you results. Agents already know OpenAlex well: for most tasks, "use OpenAlex" is all the setup they need.

```
Using the OpenAlex API, find the 25 most-cited papers about microplastics
published since 2024 and save them as a CSV with title, year, citations, and DOI.
```

This page is about how to work with agents effectively — which kind to use, how to set them up, and how far you can push them.

## Which agent, for what

- **A chat agent** (Claude, ChatGPT, Gemini) is right for one-off questions and small exports: "who are the most-cited authors at my university this decade?", "get me these 200 DOIs as a spreadsheet." Zero setup.
- **A coding agent** (Claude Code, Cursor, Codex) is right when the output is a *dataset or analysis*: it writes real scripts that page through results, retries failures, and save clean files — and the scripts are yours to re-run and audit. This is the sweet spot for systematic reviews, bibliometric analyses, and anything you'll want to reproduce later.
- **For big pulls**, a coding agent can drive the [CLI](/access/cli/) ("download all works on this topic as JSONL") or work against the [snapshot](/access/snapshot/) — you get bulk-scale results without learning the tooling yourself.

## Set your agent up for success

**Give it your API key.** Agents make a lot of requests, and the keyless budget runs out fast. Sign up free at [openalex.org](https://openalex.org), copy your key from **Settings → API key**, and paste it into the chat. (If a key ever leaks, rotate it in Settings — the old one dies instantly.) See [Authentication](/api/authentication/) for how budgets work.

**Point it at the docs.** Anything the agent is unsure of, it can read right here — this whole site is optimized for AI use. If it seems lost, saying "check help.openalex.org" is usually enough. For heavy API work, hand it the [LLM quick reference](/api/llm-quick-reference/), a condensed page written specifically for agents.

**For agents that write queries programmatically**, point them at [OQO](/access/oqo-schema/) — the JSON query format with a schema to validate against, much harder to get wrong than assembling query strings.

**Make it durable.** If you use a coding agent regularly, tell it once — in its memory or config file — that you use OpenAlex and where your key lives. Every future session starts already set up.

## Trust, but verify

Agents very rarely hallucinate OpenAlex results — the API is well-structured, and answers come from real responses, not the model's memory. Still, for consequential work:

- **Ask to see the API calls it made.** They're URLs; you can open them yourself.
- **Spot-check a few rows** against the [website](https://openalex.org).
- **Prefer scripts over vibes** for anything you'll cite: a coding agent's script is checkable and re-runnable in a way a chat transcript isn't.

## Related pages

- [Quick Start](/tutorials/quickstart/) — the five-minute version: website → API → agent
- [LLM quick reference](/api/llm-quick-reference/) — the condensed API reference to hand your agent
- [CLI](/access/cli/) — the command-line tool agents can drive for bulk downloads
