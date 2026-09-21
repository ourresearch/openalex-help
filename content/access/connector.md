---
title: "AI agent connector"
updated: 2026-09-21
description: "Connect Claude (and soon ChatGPT) to OpenAlex: ask about the literature in plain language, get the exact query behind every answer, and fix your own author profile in conversation."
synonyms: ["MCP", "MCP server", "Model Context Protocol", "Claude connector", "Claude", "ChatGPT", "custom connector"]
tags: ["reference"]
---
The AI agent connector plugs OpenAlex into your AI assistant. Add it once, sign in with your OpenAlex account, and ask about the literature in plain language: the assistant picks the right OpenAlex calls, and you get answers with titles, authors, venues, citation counts and links, plus the exact query it ran. It works in Claude today (web, desktop, mobile, and Claude Code). A ChatGPT connector is coming.

```
https://mcp.openalex.org/mcp
```

You sign in with your OpenAlex account the first time you connect (a free account takes a minute). Every query runs on your own API key and [daily budget](/access/example-costs/), so your usage shows on your [dashboard](https://openalex.org/settings/usage). If you own an OpenAlex organization, the connector uses the organization's key for queries instead; the sign-in screen says which. The only thing the server can change is your own author profile, and only when you ask it to (see [Fixing your author profile](#fixing-your-author-profile) below).

## Connecting

**Claude (web, desktop, mobile).** Open **Customize → Connectors**, click **+**, choose **Add custom connector**, paste the URL above and save. Sign in at openalex.org when prompted. Claude asks before each tool the first time it uses it; to skip that for the search tools, open the connector under **Customize → Connectors** and set **Read-only tools** to allow (the two profile-editing tools keep asking, by design). Every Claude plan can do this, including Free (which allows one custom connector). On Team and Enterprise plans only an organization owner can add connectors, under **Organization settings → Connectors → Add → Custom → Web**. Once OpenAlex is listed in the Claude connectors directory, adding it there is one click.

**Claude Code.**

```bash
claude mcp add --transport http openalex https://mcp.openalex.org/mcp
```

**ChatGPT.** Coming. Until then ChatGPT can still use OpenAlex through the API; see [Other agents](/access/agents/).

**Other clients.** Technically the connector is an MCP server ([Model Context Protocol](https://modelcontextprotocol.io)), so any client that speaks MCP over Streamable HTTP can use it: point it at the URL above. It follows the current MCP specification and needs no session state.

## What you can ask

- *What are the most-cited papers on CRISPR off-target effects since 2020, and who are the top authors?*
- *Summarize the University of Toronto's 2024 research output: volume, open-access share, share in the top 10% most cited, strongest fields, and top collaborating countries.*
- *Who at Simon Fraser University works on scientometrics? Top five by output with h-index.*
- *Check whether these references are real and give me DOIs: [paste a bibliography].*
- *Which open-access journals in ecology charge no APC and have an h-index above 50?*
- *Who cites this paper: 10.1038/s41586-021-03819-2? Summarize the follow-up work.*
- *Build a systematic search for studies of vaping among adolescents since 2018, show me the count and a sample, and give me the OQL.*

## Tools

The agent chooses among fourteen tools: nine that read OpenAlex, and five that manage your own author profile once you ask for that. You don't call them yourself, but knowing they exist helps you ask well.

| Tool | What it does |
|------|--------------|
| `search_works` | Find papers by keyword (Boolean syntax) or by meaning (`mode: "semantic"`), with filters for year, type, open access, citations, and author/institution/source/topic/funder IDs. For complex selections pass an [OQL](https://help.openalex.org/access/oql/) query directly (nested groups, exclusions, exact phrases, proximity). `preview: true` returns just the count, the canonical OQL and a sample for tuning a query. Every response echoes the canonical OQL and a link that reproduces it. |
| `get_work` | Full record for one work by OpenAlex ID, DOI, PMID or PMCID: all authors and affiliations, abstract, topics, funding, citations by year. Free. |
| `resolve_references` | Check up to 25 citations (DOIs, PMIDs, or free-text references) in one call; reports whether each exists and how confidently it matched. Catches fabricated or garbled references and fills in DOIs. |
| `list_citations` | Works that cite a paper, the works it references, or related works. |
| `search_entities` | Find authors, institutions, sources (journals), topics, funders and publishers by name and/or filters: researchers at an institution working on a topic, open-access journals in a field under a given APC, companies in a country. |
| `get_entity` | Full profile for an author, institution, source, topic, funder or publisher. Free. |
| `group_works` | Count works by author, institution, institution type, country, source, publisher, funder, year, type, topic, subfield, field, domain, keyword, OA status, top-10%/top-1% cited, language or SDG. |
| `analyze_works` | One-call profile of any set of works (an institution's output, a funder's portfolio, a topic): totals, open-access share, top-cited share, trend by year, top fields, topics, institutions, countries, sources, funders and authors, and international and industry collaboration shares. |
| `read_docs` | The canonical OpenAlex documentation pages the server bundles (OQL, the API quick reference, fixing author profiles, the curation API), so the agent can look up syntax instead of guessing. |
| `get_my_account` | Who is connected: your emails, which key the connection spends, the author profile you have claimed and its status, and whether a claim from your account would be approved instantly or reviewed. |
| `claim_author_profile` | Claim your author profile so it can be curated. Instant with a verified academic, institutional or government email; otherwise the agent collects evidence and the claim queues for review. |
| `find_candidate_works` | Works that are probably yours but missing from your profile: bylines matching your name and its variants, works carrying your ORCID (in OpenAlex and on your public ORCID record), and same-name profiles that may be duplicates of you. |
| `submit_curations` | Add or remove works, set your display name, match name or ORCID, or cancel a pending correction. Every change is a recorded, reversible curation. |
| `list_my_curations` | The status of everything submitted: pending, applied, or timed out. |

`search_works` and `resolve_references` also take your author ID, so the agent can audit your profile work by work and reconcile a CV against it.

Every search comes back with the exact query that ran, written in [OQL](/access/oql/), plus a link that reruns it. Ask Claude for "the query you used" and you can paste it into the OQL tab on openalex.org, put it in a methods section, or refine it by hand. For a systematic search, ask Claude to build the query, preview the count and a sample, and tighten it before running.

Retracted works are left out by default, everywhere, including queries you write in OQL; ask for them explicitly ("include retracted works") when you want them, and a lookup of a retracted paper says so plainly. Keyword searches match titles and abstracts by default, which keeps citation-ranked results on topic. Ask for "full text" if you want the broader match. Semantic search works best with a sentence or two describing what you're after.

## Fixing your author profile

Ask Claude to *make my OpenAlex profile accurate* and attach your CV, a bio sketch, or any list of your publications; give it your ORCID if you have one. It checks whether you have claimed your profile (and claims it for you if your account email qualifies, or asks you for evidence if not), reads the profile work by work, finds works that are yours but missing, proposes removals and additions with the evidence for each, asks you about anything it isn't sure of, and submits the corrections. Corrections are [curations](/data/curations/): recorded, reversible, and live within about two days. The same self-serve rules as the website apply; see [Fixing errors: Authors](/access/fixing-errors/authors/).

## Signing in and budgets

Adding the server prompts you to sign in at openalex.org and approve the connection. From then on Claude queries OpenAlex as you: the same key, the same daily budget, the same [usage dashboard](https://openalex.org/settings/usage). When the budget runs low, results carry a short note saying how much is left and when it resets; when it runs out, single-record lookups still work and everything else resumes at midnight UTC, or immediately after you [add prepaid usage or a plan](https://openalex.org/pricing). Rotating your API key at [openalex.org/settings/api](https://openalex.org/settings/api) disconnects the server; Claude will ask you to sign in again.

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
- **Claude won't let you add a connector.** On Team and Enterprise plans ask an organization owner to add it. On the Free plan you may already have your one custom connector.
- **An answer looks wrong.** Ask for the query it ran and check it on [openalex.org](https://openalex.org); every answer carries the OQL.

## Privacy

Tool arguments are forwarded to the OpenAlex API and the results returned to your agent. The server stores no conversation content. It records per-call metrics (tool name, latency, credits used, success or failure) without query text. See the [OpenAlex privacy policy](https://openalex.org/privacy).

## Source and support

The server is open source: [github.com/ourresearch/openalex-mcp-server](https://github.com/ourresearch/openalex-mcp-server). Bugs and requests go to [support@openalex.org](mailto:support@openalex.org).

## Related pages

- [Other agents](/access/agents/) — ChatGPT, Cursor and other agents using OpenAlex through the API
- [LLM quick reference](/api/llm-quick-reference/) — the condensed API reference for agents that call the API directly
- [Authentication](/api/authentication/) — keys and budgets
