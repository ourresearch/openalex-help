---
title: "Using OpenAlex with an AI assistant"
updated: 2026-09-30
description: "Most of what you'd do with OpenAlex, an AI assistant can do for you. In Claude, the free OpenAlex connector makes it easiest: add it from Claude's connector directory in about two minutes. Any assistant can also use OpenAlex with your API key, and a ChatGPT connector is coming soon."
tags: ["search"]
synonyms: ["Claude", "Claude connector", "OpenAlex connector", "connectors directory", "ChatGPT", "MCP", "MCP server", "connector", "custom connector", "AI agent", "AI assistant", "chatbot", "LLM"]
card: "In Claude, add the free OpenAlex connector and just ask. Any other assistant works with your API key."
---
Most of what people do with OpenAlex, an AI assistant can do for you: find the most-cited papers on a topic, check a bibliography, profile an institution's output, build a systematic search, clean up your own author profile. You ask in plain language. The assistant works out what to look up, runs the searches, and shows you the results with links and the exact query it used. You don't need to learn our query language or the API.

**In Claude, the easiest way is the OpenAlex connector.** It's free, it's listed in Claude's connector directory, and adding it takes about two minutes. You don't *need* it: any assistant, Claude included, can use OpenAlex with your API key ([below](#without-the-connector-paste-your-api-key)). But the connector makes everything easier. You sign in once instead of pasting a key, Claude gets purpose-built OpenAlex tools instead of working from the raw API, every answer comes back with the exact query it ran, and Claude can [fix your own author profile](/tutorials/fix-your-profile/) in conversation.

A ChatGPT version of the connector is coming soon; until then, see [ChatGPT](#chatgpt) below.

## Add OpenAlex to Claude

Do this once, on the web at [claude.ai](https://claude.ai). The desktop and phone apps pick it up automatically.

**1. Find OpenAlex in the directory.** Click **Customize** in the left sidebar, open the **Connectors** tab, and choose **Discover**. Search for **OpenAlex** and click it. Or go straight to its listing: [claude.ai/directory/openalex](https://claude.ai/directory/openalex).

![Claude's Customize page, Connectors tab, Discover view, with "OpenAlex" in the search box and the OpenAlex connector by OurResearch as the first result](/images/ai-assistants/claude-directory-search.png)

**2. Connect and sign in.** Click **Connect to Claude**. Claude first reminds you that OpenAlex is a *Community* connector, meaning Anthropic screened it automatically rather than reviewing it in depth; that's the standard label for connectors that Anthropic didn't build. Then a page opens at openalex.org headed **Connect to OpenAlex**. If you aren't signed in yet, enter your email address: OpenAlex sends you a login link (there's no password), and if you don't have an account it creates a free one. Click **Allow**, and you're back in Claude with OpenAlex connected.

**3. Use it in a chat.** Start a new chat, click the **+** button in the message box, open **Connectors**, and make sure the OpenAlex switch is on. From then on Claude uses OpenAlex whenever a question calls for it.

![The + menu in a Claude chat, showing the Connectors list with on/off switches](/images/ai-assistants/claude-chat-plus-menu.png)

**4. Stop it asking permission every time.** Claude asks before each tool the first time it uses one, which gets tiresome. Go back to **Customize → Connectors**, click **OpenAlex**, and next to **Read-only tools** choose **Always allow**. The two tools that can change your author profile keep asking, which is what you want.

![The OpenAlex connector's Tool permissions page, with the Read-only tools menu open on "Always allow"](/images/ai-assistants/claude-permissions.png)

A few things to know:

- **It's free on every Claude plan,** including the free one.
- **On a work or school Team or Enterprise plan,** an organization owner adds connectors for everyone, and then each person connects with their own OpenAlex account. If you see a **Request** button instead of **Connect to Claude**, click it and your owner gets the request.
- **In Claude Code,** run `claude mcp add --transport http openalex https://mcp.openalex.org/mcp`, then `/mcp` to sign in.
- **Already added OpenAlex by its address** (`https://mcp.openalex.org/mcp`) as a custom connector? It keeps working; there's nothing to change.

### Try it

The connector is at its best on questions that would take real work to turn into a search by hand. Try this one:

> Build me a systematic search in OpenAlex for original research since 2018 on vaping or e-cigarette use among adolescents and young adults, leaving out reviews, editorials and retracted papers. Show me how many papers match, a few examples, and the exact query so I can rerun it later.

Claude turns that into a query in [OQL](/access/oql/), OpenAlex's query language, previews the count and a sample, tightens it, and hands you the finished query. That query is yours: paste it into the OQL tab at [openalex.org](https://openalex.org) to see and export the full results, put it in a methods section, or refine it by hand.

![Claude's answer: a count, sample papers, and the OQL query it built](/images/ai-assistants/claude-answer.png)

Whenever an answer looks off, ask *"what query did you run?"* Every answer carries it. More ideas for what to ask are on the [connector reference](/access/connector/#what-you-can-ask).

## Without the connector: paste your API key

Every major assistant already knows how to use OpenAlex, and this help site is written so that assistants can read it. All they need is a key so their searches count against your free daily budget instead of the shared anonymous one. This is the way to go in ChatGPT, Gemini or Copilot today, or in Claude if you'd rather not add a connector.

1. Sign in at [openalex.org](https://openalex.org) (a free account takes a minute; the login link arrives by email).
2. Open **Settings → API key** and copy the key.
3. Start a chat and paste it in with your question, like this:

> My OpenAlex API key is `xxxxxxxx`. Using the OpenAlex API (the docs are at help.openalex.org), find the 25 most-cited papers about microplastics in drinking water since 2022 and list them with title, year, journal, citation count and DOI.

That's it. The assistant reads the documentation when it's unsure, calls the API, and answers. If it stalls, saying *"check help.openalex.org"* usually gets it going again. If a key ever leaks, rotate it in **Settings → API key** and the old one stops working immediately.

## ChatGPT

A ChatGPT version of the OpenAlex connector is coming soon. Until then, the [API-key method](#without-the-connector-paste-your-api-key) above works well in ChatGPT.

If you're comfortable with developer settings and are on a Plus, Pro, Business or Enterprise plan, ChatGPT's **Developer mode** can connect to the same address as Claude (`https://mcp.openalex.org/mcp`, with sign-in). OpenAI labels the mode "elevated risk" and it has to be chosen from the **+** menu in each chat, so we don't recommend it as the everyday route. We'll replace this section with real steps when the ChatGPT connector is out.

## What it costs

Nothing. The connector is free to add, and the OpenAlex account it signs in with is free. Both methods run on your account's own [daily API budget](/access/example-costs/): $1 of usage a day free, which covers hundreds of searches and is plenty for ordinary use. When it runs low the connector says so in its answers; when it runs out, single-record lookups keep working and everything else resumes at midnight UTC, or right away if you [add prepaid usage or a plan](https://openalex.org/pricing). Claude and ChatGPT charge you for their own service as usual, not for OpenAlex.

## Fixing your own author profile

With the connector, say *"make my OpenAlex author profile accurate"* and attach your CV. Claude claims your profile if you haven't, finds the papers that are yours but missing, spots the ones that aren't yours, checks with you, and submits the corrections. The walkthrough is [Fix your profile with Claude](/tutorials/fix-your-profile/).

## When something goes wrong

- **Claude says it can't reach your OpenAlex account.** Under Customize → Connectors, disconnect OpenAlex and connect it again.
- **Claude asks you to sign in again.** Your session expired or you changed your API key. Sign in when prompted; nothing else changes.
- **The answer says your budget is used up.** Wait for midnight UTC, or [add usage](https://openalex.org/pricing).

More cases, the full list of tools, and what the connector can't do are on the [connector reference](/access/connector/).
