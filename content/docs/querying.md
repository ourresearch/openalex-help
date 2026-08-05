---
title: "Querying"
description: "The several ways to ask OpenAlex a question — web interface, REST URLs, OQL, CLI, and agents — and how they all transpile to the same query object under the hood."
tags: ["reference"]
---
There are several ways to ask OpenAlex a question, each suited to a different kind of user: point-and-click on the website, a raw REST URL, the OpenAlex Query Language, the command line, or an AI agent. Pick whichever fits how you like to work.

Here's the key idea that ties them together: **every one of these surfaces transpiles to the same canonical query object internally — the OpenAlex Query Object, or OQO.** A click in the web interface, a `filter=` string in a URL, and a line of OQL all compile down to the same OQO and run against the same engine. That means they're **equivalent in power**, up to the limits of each surface — the differences below are about ergonomics and reach, not about which one can "really" ask the question.

## The ways to query, compared

| Way | What it is | Best for | Tradeoffs |
|---|---|---|---|
| **Web (basic)** | Point-and-click search and filters at [openalex.org](https://openalex.org) | Non-technical users; quick one-off questions; browsing and exporting | Easiest to learn; a friendly subset — not every query shape is expressible |
| **Web (advanced)** | The visual query builder at [openalex.org](https://openalex.org) | Complex filters without writing code; systematic reviews | More expressive than basic; covers the common shapes, not every valid query |
| **REST URL** | `filter=`/`search=`/`sort=`/`group_by=` params on `api.openalex.org` | Programmatic access; scripts; sharing a query as a link | Fast and well-documented; classic URL syntax can't express deep nesting or cross-field OR |
| **OQL** | The readable [OpenAlex Query Language](/docs/oql/) (alpha) | Writing and sharing complex queries in near-plain English | Most expressive by hand; still alpha, may change |
| **CLI** | Query from your terminal and pipe results into scripts | Terminal workflows; automation; feeding your own tools | Scriptable and composable; requires the command line |
| **Agents** | Just tell your AI agent to "use OpenAlex" | Letting an agent do the whole job for you | No syntax to learn; best to verify consequential results yourself |

## Where to go next

- **[Web interface](/docs/web-interface-basic/)** — the no-code way. Start with [basic](/docs/web-interface-basic/) search and filters, and move to [advanced](/docs/web-interface-advanced/) when you need more.
- **[REST URLs](/docs/url/)** — query by URL against `api.openalex.org`. The [API](/api/) tab documents the wire mechanics in full.
- **[OQL](/docs/oql/)** — the OpenAlex Query Language, a readable way to express queries the classic URL syntax can't.
- **[CLI](/docs/cli/)** — query from your terminal.
- **[Agents](/docs/agents/)** — hand the whole job to an AI agent.

For the underlying HTTP mechanics — endpoints, parameters, paging, and rate limits — see the [API](/api/) tab.
