---
title: "Authentication"
updated: 2026-11-17
description: "API keys, sending your key, rate limits, and keeping tabs on your usage"
tags: ["api"]
source_id: "api-reference/authentication"
source_url: "https://developers.openalex.org/api-reference/authentication"
source_updated: "2026-08-09"
---
OpenAlex data is free, and so is casual use of the API — you can make basic queries with no key at all. To use the API at any real scale, though, you'll want a **free API key**: it raises your daily budget 10×, lets you track your usage, and is required for [cursor paging](/api/paging/#cursor-paging) past the first page. This page covers getting a key, sending it, and staying inside the rate limits. For **what the API costs** and how billing works — that's a separate concern — see [Pricing](/access/pricing/), with worked numbers on the [Example costs](/access/example-costs/) page.

## Getting an API key

It's free, and there are two ways to get one:

- **On the website.** [Make an account](https://openalex.org/signup) (about 30 seconds), then copy your key from [Settings → API key](https://openalex.org/settings/api-key).
- **From your AI agent.** If you work with a coding agent (Claude Code, Codex, Cursor and the like), give it your email address and let it [ask for a key](#getting-a-key-for-your-user). You click one link in the email we send, and the agent's key starts working. Nothing to copy or paste.

Either way, a key works only once its email address is verified. So there are just two states: no key, or a key with a verified email.

## Getting a key for your user

An AI agent (Claude Code, Codex, Cursor, a notebook) can get a free key for the person it works for in one call, with no browser sign-up first:

```bash
curl -X POST https://api.openalex.org/api-keys \
  -H "Content-Type: application/json" \
  -d '{"email": "ana.silva@usp.br"}'
```

The answer carries the key:

```json
{
  "api_key": "...",
  "status": "pending_activation",
  "email": "ana.silva@usp.br",
  "daily_budget_usd_after_activation": 1.0,
  "activation_link_expires": "2026-10-22T17:30:05Z",
  "message": "We emailed ana.silva@usp.br a link. This key starts working when they click it, ..."
}
```

- **We email the address a link** titled "Activate your OpenAlex API key." When the person clicks it, the key starts working, with a free account's $1 a day. Nothing in the code has to change. The click also signs them in to [openalex.org](https://openalex.org), where they can see their usage.
- **Until then, the key doesn't work.** Requests with it get a `403` with the code `key_not_activated`; the agent can call without a key meanwhile. A key works only once its email is verified, so there are just two states: no key, or a key with a verified email.
- **The link lasts 7 days.** If it runs out, the agent asks again with the same address and we resend it (at most once a day).
- **The agent's key is for API calls only.** It can't sign in to openalex.org, it spends from the person's daily budget, and the person can revoke it in [Settings → API key](https://openalex.org/settings/api-key). Their own account key is separate and stays with them.

**Ask your user for their email address; never invent one.** We email that address, and the key works only after its owner clicks the link, so a made-up address gets you nothing. Placeholders like `you@example.com` and addresses named after an agent (`claude@…`, `gpt.user@…`) are refused. So are addresses that already have an account: that person copies their key from [Settings → API key](https://openalex.org/settings/api-key) instead.

The body can also carry `"name"` (the person's name) and `"agent"` (what's asking, such as `"Claude Code"`). An `Idempotency-Key` header (a fresh UUID) makes a retry return the same key instead of an error.

| Response | What it means |
|----------|---------------|
| `201` | Here's the key. |
| `400` | The address is missing, malformed, a placeholder, or one we can't email. Ask the person for theirs. |
| `409 account_exists` | The address already has an account. The person copies their key from Settings → API key. |
| `409 activation_pending` | A key for the address is waiting for activation. The person clicks the emailed link (we resend it at most once a day). |
| `403 key_not_activated` | (On any API call with the key.) The person hasn't clicked the link yet. |
| `429` | Too many keys from this network or email domain today. The person can [sign up](https://openalex.org/signup) on the website instead. |

`GET https://api.openalex.org/api-keys` returns these instructions as JSON, for agents that can only fetch URLs.

Keep the key out of code you share: an `OPENALEX_API_KEY` environment variable, or a `.env` file listed in `.gitignore`, is a good home.

## Sending your key

Add it as an `api_key` query parameter:

```bash
curl "https://api.openalex.org/works?api_key=YOUR_KEY"
```

…or send it as a bearer token in the `Authorization` header:

```bash
curl -H "Authorization: Bearer YOUR_KEY" "https://api.openalex.org/works"
```

Both work identically. The [openalex.org](https://openalex.org) website runs on this same API, so anonymous browsing draws from the keyless budget; sign in and it uses your own key.

## Rotating your key

You can replace your key with a new one anytime in [Settings → API key](https://openalex.org/settings/api). When you rotate, you choose when the old key stops working:

- **Immediately** (the default) — the old key dies on the spot. The right choice when a key has leaked.
- **In 24 hours** or **in 7 days** — both keys work during the window, so you can deploy the new key to your systems with no downtime. The old key keeps its normal limits, then stops for good. If you discover a leak mid-window, the **Expire now** button kills the old key early.

Organization keys work the same way, from the organization's API settings. One thing to know about personal keys: your key is also your openalex.org sign-in credential, so rotating it logs you out on your other browsers and devices right away — the grace window applies to API requests only.

## Organization keys and budgets

An organization on an [annual plan](/access/pricing/) has an **organization key** that carries the plan's daily budget ($20 a day on Member, $100 on Member+, $200 or more on Partner). Owners of the organization manage it on [openalex.org/settings/org-api](https://openalex.org/settings/org-api).

- **Personal keys stay personal.** Everyone in your organization also has their own key with its own budget ($1 a day on a free account). A personal key never spends the organization's budget, and the organization key never spends anyone's personal budget.
- **Seeing the organization's budget.** Owners see what the organization key has used and has left today on the same settings page. Other members don't see that page. Anyone who holds the organization key can check it any time with [`/rate-limit`](#keeping-tabs-on-your-usage); each person sees their own key's usage at [openalex.org/settings/usage](https://openalex.org/settings/usage).
- **High-volume user keys (Partner).** A Partner organization's owners can give up to 3 members a bigger budget on their personal key: $25 a day instead of $1. It comes on top of the organization key's budget, not out of it, so it suits staff who run their own scripts or tests apart from your production key. Owners assign them in the "High-volume user keys" section of the settings page; the member's openalex.org account must belong to your organization (an email on one of its domains). If everything you run uses the organization key, you don't need them.

## Rate limits

Basic use is free and generous, and a free key gives you 10× the keyless budget; you can raise it further with a [paid plan](/access/pricing/). Three things return `429 Too Many Requests`: exceeding your daily budget, sending requests faster than your per-second limit, or a [new account](#new-accounts) spending its first $1 faster than the new-account pace. For the budget numbers themselves — and what typical activity actually uses — see [Example costs](/access/example-costs/).

### Per-second limits

Every key can send a set number of requests per second, and a few heavy kinds of request have lower limits of their own. With no key, the limits count per IP address.

| Requests per second | No API key | Free key, or prepaid usage | [Member](/access/member/) | [Member+](/access/member-plus/) or [Partner](/access/partner/) |
|---|---|---|---|---|
| All requests | 10 | 30 | 50 | 50 |
| Searches with more than 5 `AND`/`OR`/`NOT` operators | 1 | 2 | 2 | 5 |
| Filters with more than 10 values joined by `\|` on `topics.id`, `primary_topic.id`, `concepts.id` or `concept.id` | 1 | 1 | 1 | 1 |
| [Semantic search](/api/semantic-search/) | 1 | 1 | 1 | 1 |

- **All requests:** you can send up to a second's worth at once (50 on an annual plan), and the allowance refills at the same rate. Above the limit, only the excess is refused: at a steady 60 requests a second on a 50 limit, about 1 in 6 gets a `429`; at 100 a second, half do.
- **The three search limits:** these refuse a request that comes too soon after the previous one, with no room for bursts. Send these requests one at a time, or evenly spaced. The numbers above are the steady rates that run with no `429`s; parallel bursts can be refused even below them.
- **A per-second `429` costs nothing and leaves your daily budget alone.** Its body says which limit you hit (`"reason"`: `requests_per_second`, `broad_boolean_query`, `wide_or_filter` or `semantic_search`) and the limit itself (`"perSecondLimit"`). Wait the `Retry-After` seconds (usually 1) and retry. `"reason": "daily_budget"` means today's budget is spent; it resets at midnight UTC.
- **[`/rate-limit`](#keeping-tabs-on-your-usage)** lists your key's per-second limits under `per_second_limits`.

Until 27 June 2026 every caller could send 100 requests per second; older copies of these docs say 100.

### New accounts

A new free account spends its first $1 at up to $0.10 every 5 minutes. Once it has spent its first $1, which takes about 50 minutes of steady use, this limit no longer applies. Your daily budget stays the same; only the first dollar is paced, so nobody can make a new account and use up its budget in a minute.

If you hit it, the `429` tells you how many seconds to wait, in its message and in the `Retry-After` header. Waiting costs nothing. The pace doesn't apply to annual plans, prepaid usage, organization keys, or accounts made before 3 November 2026.

Individual queries also have hard limits:

| Limit | Value |
|-------|-------|
| OR values per filter | 100 |
| `per_page` maximum | 100 |
| `sample` maximum | 10,000 |
| Basic paging limit | 10,000 results |

To retrieve more than 10,000 results, use [cursor paging](/api/paging/#cursor-paging) (with a free key: without one, only the first page works).

## Keeping tabs on your usage

Every response carries headers and a `meta` block showing where you stand:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Your total daily budget |
| `X-RateLimit-Remaining` | Remaining for today |
| `X-RateLimit-Credits-Used` | Cost of this request |
| `X-RateLimit-Reset` | Seconds until reset (midnight UTC) |

The [`meta`](/api/#response-format) object also reports the cost of the call and the total result count, so you can estimate a full paginated pull before committing to it. For a running total, check the [usage dashboard](https://openalex.org/settings/usage) (the battery icon in the lower-left of [openalex.org](https://openalex.org)), or query it programmatically:

```bash
curl "https://api.openalex.org/rate-limit?api_key=YOUR_KEY"
```

```json
{
  "api_key": "abc...xyz",
  "rate_limit": {
    "daily_budget_usd": 200,
    "daily_used_usd": 56.8,
    "daily_remaining_usd": 143.2,
    "prepaid_balance_usd": 0,
    "resets_at": "2026-11-18T00:00:00.000Z",
    "resets_in_seconds": 10612,
    "per_second_limits": {
      "all_requests": 50,
      "searches_with_more_than_5_boolean_operators": 5,
      "filters_with_more_than_10_topic_or_concept_ids": 1,
      "semantic_search": 1,
      "docs": "https://help.openalex.org/api/authentication/#rate-limits"
    },
    "endpoint_costs_usd": { "singleton": 0, "list": 0.0001, "search": 0.001, "...": "..." }
  }
}
```

It returns today's budget, what you've used and what's left, when it resets, and your key's per-second limits (`per_second_limits`). Checking `/rate-limit` is free: it never counts against your budget. If it can't read your usage at that moment, it says so instead of guessing: it answers `503` with `"reason": "usage_lookup_failed"` and a `Retry-After` header. Wait that many seconds and check again.

## Best practices

- Use `per_page=100` to get more per request — it makes your budget go much further.
- Batch ID lookups with the [OR syntax](/api/filtering/#addition-or) (up to 100 values per filter).
- Use [`select=`](/api/selecting-fields/) to return only the fields you need, for faster responses.
- Implement [exponential backoff](/api/errors/#retry-logic) when you hit a `429`.
- The API is plain GET requests, so you can test any query in your browser — a JSON formatter extension ([JSONVue](https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc) for Chrome, [JSONView](https://addons.mozilla.org/en-US/firefox/addon/jsonview) for Firefox) makes responses easier to read.
