---
title: "Quick Start"
subtitle: "Get real data out of OpenAlex in five minutes — on the website, through the API, or by asking your agent."
description: "Get real data out of OpenAlex in five minutes — on the website, through the API, or by asking your agent."
tags: ["tutorials"]
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

Here's the thing about steps 1 and 2: we didn't really need to learn the API — or use the website — at all. We could have just asked an AI agent (Claude, ChatGPT, Cursor, or whatever you use) and let *it* do the whole job:

> Using the OpenAlex API, find the 25 most-cited papers about microplastics published since 2024 and save them as a CSV with title, year, citations, and DOI.

That's it. Agents already know OpenAlex, and anything they're unsure of they can find right here at [help.openalex.org](https://help.openalex.org) — the site is optimized for AI use.

**Give your agent your API key.** Agents make a lot of requests, so the keyless budget runs out fast; at any reasonable scale your agent should use your free key. Just paste it into the chat and your agent will take it from there. (If a key ever leaks, no big deal: rotate it in **Settings → API key**, which invalidates the old one instantly.)

It's very unusual for agents to hallucinate results here, since the API is so well-structured — but for consequential queries, it's a good idea to check against the [website](https://openalex.org) yourself.

## Where next

<div class="access-grid">
  <a class="access-card" href="/help/">
    <span class="ac-title">Help</span>
    <span class="ac-body">Friendly answers to common questions — accounts, exports, fixing your profile.</span>
  </a>
  <a class="access-card" href="/tutorials/">
    <span class="ac-title">More tutorials</span>
    <span class="ac-body">Step-by-step walkthroughs of real research questions.</span>
  </a>
  <a class="access-card" href="/api/">
    <span class="ac-title">API docs</span>
    <span class="ac-body">Endpoints, filters, paging, and rate limits.</span>
  </a>
</div>

<style>
  .access-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    gap: 0.9rem;
    margin: 1.25rem 0 1.5rem;
  }
  .access-card {
    display: block;
    background: var(--bg);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 0.9rem 1rem;
    color: inherit;
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.04);
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .access-card:hover {
    border-color: var(--line-strong);
    box-shadow:
      0 2px 5px rgb(64 68 82 / 0.08),
      0 3px 9px rgb(64 68 82 / 0.08);
    text-decoration: none;
    color: inherit;
  }
  .ac-title {
    display: block;
    font-weight: 600;
    font-size: 0.93rem;
    margin-bottom: 0.2rem;
  }
  .ac-body {
    display: block;
    font-size: 0.85rem;
    color: var(--muted);
  }
</style>
