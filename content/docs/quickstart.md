---
title: "Quickstart"
description: "Get real data out of OpenAlex in five minutes — on the website, through the API, or by asking your agent."
tags: ["reference"]
---
Let's get real data out of OpenAlex in about five minutes. We'll answer the same question three ways, moving up the power curve each time: on the website, through the API, and by handing the whole job to an AI agent.

Our question: **what are the most-cited recent papers about microplastics?**

## 1. On the website

1. Go to [openalex.org](https://openalex.org) and search **microplastics**.
2. Use the filters to narrow to works published since 2024.
3. Sort by citation count, and export your results to CSV when you're happy with them.

No code, no account, no charge. For most one-off questions, this is all you need — see [exporting results](/help/export-results-from-the-openalex-website/) for the details.

## 2. Through the API

Everything the website can do, the [API](/api/) can do programmatically. The same question is one URL:

```
https://api.openalex.org/works?search=microplastics&filter=from_publication_date:2024-01-01&sort=cited_by_count:desc
```

Paste that into your browser or `curl` it — you'll get JSON back, no key required.

To go past casual use, you'll want a **free API key**: it raises your daily request budget by 10×. Sign up at [openalex.org](https://openalex.org), copy your key from **Settings → API key**, and send it with each request:

```bash
curl "https://api.openalex.org/works?search=microplastics" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

From here, see the [API quickstart](/api/quickstart/) and [authentication](/api/authentication/) pages.

## 3. Or just ask your agent

Here's the thing about step 2: we didn't really need to learn the API at all. We could have just asked an AI agent (Claude, ChatGPT, Cursor, or whatever you use) and let *it* call the API for us:

> Using the OpenAlex API, find the 25 most-cited papers about microplastics published since 2024 and save them as a CSV with title, year, citations, and DOI.

That's it. Agents already know OpenAlex, and for anything they're unsure of they can read this site directly — every page here has a Markdown twin, indexed at [/llms.txt](/llms.txt). Point your agent there for best results.

**Give your agent your API key.** Agents make a lot of requests, so the keyless budget runs out fast; at any reasonable scale your agent should use your free key. The clean way to do that without pasting secrets into chats:

1. Put the key in an environment variable, e.g. add `export OPENALEX_API_KEY=...` to your shell profile.
2. Tell your agent about it once, in its memory or config file (`CLAUDE.md`, `AGENTS.md`, or your tool's equivalent):

```markdown
When calling the OpenAlex API, authenticate with
`Authorization: Bearer $OPENALEX_API_KEY` (already set in my environment).
Docs: https://help.openalex.org/llms.txt
```

Your key never appears in the conversation, and every session picks it up automatically. (If a key does leak, no big deal: rotate it in **Settings → API key**, which invalidates the old one instantly.)

One honest caveat: agent results vary. Agents occasionally misread a filter or hallucinate a field name, so for anything that matters, spot-check a few rows against the [website](https://openalex.org) — or have the agent show you the API calls it made.

## Where next

- **[How it works](/docs/how-it-works/)** — how the data gets gathered, connected, and shared
- **[API reference](/api/)** — endpoints, filters, paging, and rate limits
- **[Recipes](/learn/)** — step-by-step walkthroughs of real research questions
