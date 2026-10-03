---
title: "AI agent connector"
updated: 2026-10-03
description: "The free OpenAlex connector for Claude (ChatGPT coming soon): ask about the literature in plain language, get the exact query behind every answer, and fix your own author profile in conversation."
synonyms: ["MCP", "MCP server", "Model Context Protocol", "Claude connector", "OpenAlex connector", "connectors directory", "Claude", "ChatGPT", "custom connector"]
tags: ["reference"]
---
The AI agent connector plugs OpenAlex into your AI assistant. Add it once, sign in with your OpenAlex account, and ask about the literature in plain language: the assistant picks the right OpenAlex calls, and you get answers with titles, authors, venues, citation counts and links, plus the exact query it ran. It's free, and it works in Claude today (web, desktop, mobile, and Claude Code), where it's listed in Claude's connector directory as **OpenAlex**. A ChatGPT version is coming soon.

In Claude, the connector is the easiest way to use OpenAlex. Most of what you'd do on the website or through the API, you can ask Claude to do instead. You never need it, since the website and the API work without it, but it saves most people a lot of clicking and query-writing.

You sign in with your OpenAlex account the first time you connect (a free account takes a minute). Every query runs on your own API key and [daily budget](/access/example-costs/), so your usage shows on your [dashboard](https://openalex.org/settings/usage). If you own an OpenAlex organization, the connector uses the organization's key for queries instead; the sign-in screen says which. The only thing the server can change is your own author profile, and only when you ask it to (see [Fixing your author profile](#fixing-your-author-profile) below).

## Connecting

Step-by-step instructions with screenshots are in [Using OpenAlex with an AI assistant](/how-to/ai-assistants/). The short version for Claude, on every plan including Free: **Customize → Connectors → Discover**, search for **OpenAlex**, click **Connect to Claude**, and sign in at openalex.org (or open [claude.ai/directory/openalex](https://claude.ai/directory/openalex) directly). Then set **Read-only tools** to *Always allow* on the connector's page so it stops asking before every search. On Team and Enterprise plans an organization owner adds it for everyone.

**Claude Code.**

```bash
claude mcp add --transport http openalex https://mcp.openalex.org/mcp
```

**ChatGPT.** A ChatGPT version is coming soon. Until then ChatGPT can use OpenAlex through the API with your key; see the [how-to](/how-to/ai-assistants/#chatgpt).

**Other clients.** Technically the connector is an MCP server ([Model Context Protocol](https://modelcontextprotocol.io)), so any client that speaks MCP over Streamable HTTP with OAuth can use it. Point it at this address:

```
https://mcp.openalex.org/mcp
```

It follows the current MCP specification and needs no session state.

## What you can ask

- *What are the most-cited papers on CRISPR off-target effects since 2020, and who are the top authors?*
- *Summarize the University of Toronto's 2024 research output: volume, open-access share, share in the top 10% most cited, strongest fields, and top collaborating countries.*
- *Who at Simon Fraser University works on scientometrics? Top five by output with h-index.*
- *Check whether these references are real and give me DOIs: [paste a bibliography].*
- *Which open-access journals in ecology charge no APC and have an h-index above 50?*
- *Who cites this paper: 10.1038/s41586-021-03819-2? Summarize the follow-up work.*
- *Do a really thorough search for research on how microplastics affect human health, open access only. How many are there, what are the most cited, and what's the query?*
- *Build a systematic search for studies of vaping among adolescents since 2018, show me the count and a sample, and give me the OQL.*

## Tools

The agent chooses among sixteen tools: eleven that read OpenAlex, and five that manage your own author profile once you ask for that. You don't call them yourself, but knowing they exist helps you ask well.

| Tool | What it does |
|------|--------------|
| `search_works` | Find papers by keyword (Boolean syntax; by default it matches titles, abstracts and the [keywords](/api/searching/#keywords-in-search) a phrase in your search names, and [reranks](/api/searching/#rerank) the top 100 so the most relevant come first) or by meaning (`mode: "semantic"`), with filters for year, type, open access, citations, and author/institution/source/topic/funder IDs. For complex selections pass an [OQL](https://help.openalex.org/access/oql/) query directly (nested groups, exclusions, exact phrases, proximity). `preview: true` returns just the count, the canonical OQL and a sample for tuning a query. Every response echoes the canonical OQL and a link that reproduces it. |
| `get_work` | Full record for one work by OpenAlex ID, DOI, PMID or PMCID: all authors and affiliations, abstract, topics, funding, citations by year. Free. |
| `resolve_references` | Check up to 25 citations (DOIs, PMIDs, or free-text references) in one call; reports whether each exists and how confidently it matched. Catches fabricated or garbled references and fills in DOIs. |
| `list_citations` | Works that cite a paper, the works it references, or related works. |
| `search_entities` | Find authors, institutions, sources (journals), topics, funders and publishers by name and/or filters: researchers at an institution working on a topic, open-access journals in a field under a given APC, companies in a country. |
| `get_entity` | Full profile for an author, institution, source, topic, funder or publisher. Free. |
| `group_works` | Count works by author, institution, institution type, country, source, publisher, funder, year, type, topic, subfield, field, domain, keyword, OA status, top-10%/top-1% cited, language or SDG. |
| `analyze_works` | One-call profile of any set of works (an institution's output, a funder's portfolio, a topic): totals, open-access share, top-cited share, trend by year, top fields, topics, institutions, countries, sources, funders and authors, and international and industry collaboration shares. |
| `find_keywords` | The OpenAlex [keywords](/how-to/finding-papers-with-keywords/) for a topic, from your description and its key phrases, with how many works carry each and their most-cited titles, so the agent can keep the ones that mean your topic. |
| `keyword_search` | A thorough search: each part of your topic matches on its words (in titles and abstracts, plus the keywords those words name) **or** on keywords the agent chose for it by meaning, and every part must match. Returns the query and counts for each piece (what the search alone finds, what the chosen keywords add, each part on its own) plus random samples to check that the results are on topic. Takes the same open-access, year, type and language filters. |
| `read_docs` | The canonical OpenAlex documentation pages the server bundles (OQL, the API quick reference, fixing author profiles, the curation API), so the agent can look up syntax instead of guessing. |
| `get_my_account` | Who is connected: your emails, which key the connection spends, the author profile you have claimed and its status, and whether a claim from your account would be approved instantly or needs a link. |
| `claim_author_profile` | Claim your author profile so it can be curated. Instant with a verified academic, institutional or government email on your account; otherwise the agent asks for a link to a page that shows your account email, which is checked automatically within minutes. |
| `find_candidate_works` | Works that are probably yours but missing from your profile: bylines matching your name and its variants, works carrying your ORCID (in OpenAlex and on your public ORCID record), and same-name profiles that may be duplicates of you. |
| `submit_curations` | Add or remove works, set your display name, match name or ORCID, or cancel a pending correction. Every change is a recorded, reversible curation. |
| `list_my_curations` | The status of everything submitted: pending, applied, superseded (a newer correction to the same item superseded it), or timed out. |

`search_works` and `resolve_references` also take your author ID, so the agent can audit your profile work by work and reconcile a CV against it.

Every search comes back with the exact query that ran, written in [OQL](/access/oql/), plus a link that reruns it. Ask Claude for "the query you used" and you can paste it into the OQL tab on openalex.org, put it in a methods section, or refine it by hand. For a systematic search, ask Claude to build the query, preview the count and a sample, and tighten it before running. Ask for a *thorough* search and Claude also uses OpenAlex's keywords: they find papers that use other wording, are written in other languages, or have no abstract, and Claude tells you how many the keywords added and shows you a sample of them.

Retracted works are left out by default, everywhere, including queries you write in OQL; ask for them explicitly ("include retracted works") when you want them, and a lookup of a retracted paper says so plainly. Keyword searches match titles and abstracts by default, which keeps citation-ranked results on topic. Ask for "full text" if you want the broader match. Semantic search works best with a sentence or two describing what you're after.

## Fixing your author profile

Ask Claude to *make my OpenAlex profile accurate* and attach your CV, a bio sketch, or any list of your publications; give it your ORCID if you have one. It checks whether you have claimed your profile (and claims it for you if your account email qualifies, or asks you for a link that shows your email if not), reads the profile work by work, finds works that are yours but missing, proposes removals and additions with the evidence for each, asks you about anything it isn't sure of, and submits the corrections. Corrections are [curations](/data/curations/): recorded, reversible, and live within about two days. The same self-serve rules as the website apply; see [Fixing errors: Authors](/access/fixing-errors/authors/).

## Signing in and budgets

Adding the server prompts you to sign in at openalex.org and approve the connection. From then on Claude queries OpenAlex as you: the same key, the same daily budget, the same [usage dashboard](https://openalex.org/settings/usage). Searches sorted by relevance are [reranked](/api/searching/#rerank) by default, which adds 10 credits to each (a search costs 20 credits instead of 10); ask for plain relevance order to skip it. When the budget runs low, results carry a short note saying how much is left and when it resets; when it runs out, single-record lookups still work and everything else resumes at midnight UTC, or immediately after you [add prepaid usage or a plan](https://openalex.org/pricing). Rotating your API key at [openalex.org/settings/api](https://openalex.org/settings/api) disconnects the server; Claude will ask you to sign in again.

## What it can't do

- **Total citations across a set of works.** Ask on the [website](/access/website-basic/) instead; the connector counts works, not their citations.
- **Bulk export.** It answers questions; it doesn't page through and download whole result sets. For a file, use the website's export, the [CLI](/access/cli/) or the [snapshot](/access/snapshot/).
- **Full text.** It reports where a free copy lives; it doesn't fetch PDFs. See [Fulltext](/access/fulltext/).
- **Fixing anything but your own author profile.** Other errors still go through [Fixing errors](/access/fixing-errors/).

## Troubleshooting

- **It says it can't reach your OpenAlex account.** Disconnect the connector and add it again. A connection made before profile curation existed, or one running on an organization key, can search OpenAlex but can't see your account or curate your profile.
- **The assistant asks you to sign in again.** You rotated your API key, or the connection expired. Reconnect from the connectors screen; nothing else changes.
- **A note says your budget is used up.** Single-record lookups keep working; everything else resumes at midnight UTC, or immediately after you [add prepaid usage or a plan](https://openalex.org/pricing).
- **You expected a different key to be charged.** If you own an OpenAlex organization the connector spends the organization's budget, otherwise your personal one; there is no chooser. Ask the assistant *"which OpenAlex account am I connected as?"* to see which.
- **Claude asks permission for every search.** That is Claude's default for every connector, not something OpenAlex controls. Under **Customize → Connectors → OpenAlex**, set **Read-only tools** to allow once; or click *Always allow* when prompted.
- **Claude won't let you add a connector.** On Team and Enterprise plans an organization owner adds connectors; click **Request** on the OpenAlex listing to ask. On the Free plan, add it from the directory rather than by address: Free allows only one connector added by address.
- **An answer looks wrong.** Ask for the query it ran and check it on [openalex.org](https://openalex.org); every answer carries the OQL.

## Privacy

Tool arguments are forwarded to the OpenAlex API and the results returned to your agent. The server stores no conversation content. It records per-call metrics (tool name, latency, credits used, success or failure) without query text. The API requests it makes for you run on your API key and go into the same request log as any other API request, which keeps them for 90 days; we use the requests your assistant makes only to answer them and to run and secure the service, never for search research. See the [OpenAlex privacy policy](https://openalex.org/privacy).

## Source and support

The server is open source: [github.com/ourresearch/openalex-mcp-server](https://github.com/ourresearch/openalex-mcp-server). Bugs and requests go to [support@openalex.org](mailto:support@openalex.org).

## Related pages

- [Using OpenAlex with an AI assistant](/how-to/ai-assistants/) — setup with screenshots, for people who don't write code
- [Other agents](/access/agents/) — ChatGPT, Cursor and other agents using OpenAlex through the API
- [LLM quick reference](/api/llm-quick-reference/) — the condensed API reference for agents that call the API directly
- [Authentication](/api/authentication/) — keys and budgets
