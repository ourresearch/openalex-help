---
title: "Authentication"
updated: 2026-10-15
description: "API keys, sending your key, rate limits, and keeping tabs on your usage"
tags: ["api"]
source_id: "api-reference/authentication"
source_url: "https://developers.openalex.org/api-reference/authentication"
source_updated: "2026-08-09"
---
OpenAlex data is free, and so is casual use of the API — you can make basic queries with no key at all. To use the API at any real scale, though, you'll want a **free API key**: it raises your daily budget 10×, lets you track your usage, and is required for [cursor paging](/api/paging/#cursor-paging) past the first page. This page covers getting a key, sending it, and staying inside the rate limits. For **what the API costs** and how billing works — that's a separate concern — see [Pricing](/access/pricing/), with worked numbers on the [Example costs](/access/example-costs/) page.

## Getting an API key

It's free. [Make an account](https://openalex.org/) (about 30 seconds) and copy your key from [openalex.org/settings/api](https://openalex.org/settings/api). An AI agent can also [get a key for you](#getting-a-key-for-your-user) with one call.

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

Use the person's real address, so ask them for it. Placeholders like `you@example.com` are refused, and so are addresses that already have an account: that person copies their key from [Settings → API key](https://openalex.org/settings/api-key) instead.

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

## Rate limits

Basic use is free and generous, and a free key gives you 10× the keyless budget; you can raise it further with a [paid plan](/access/pricing/). Two things return `429 Too Many Requests`: exceeding your daily budget, or sending requests faster than your per-second limit. For the budget numbers themselves — and what typical activity actually uses — see [Example costs](/access/example-costs/).

| Who's calling | Requests per second |
|---------------|---------------------|
| No API key | 10 |
| Free API key, or prepaid usage | 30 |
| [Annual plan](/access/pricing/) | 50 |

A few heavy request types have lower limits of their own: [semantic search](/api/semantic-search/) is 1 request per second, and searches with more than 5 `OR`/`AND`/`NOT` operators are limited to 1 (no key), 5 (free key or prepaid usage) or 25 (annual plan) per second. A per-second 429 costs nothing; wait a moment and retry.

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

## Best practices

- Use `per_page=100` to get more per request — it makes your budget go much further.
- Batch ID lookups with the [OR syntax](/api/filtering/#addition-or) (up to 100 values per filter).
- Use [`select=`](/api/selecting-fields/) to return only the fields you need, for faster responses.
- Implement [exponential backoff](/api/errors/#retry-logic) when you hit a `429`.
- The API is plain GET requests, so you can test any query in your browser — a JSON formatter extension ([JSONVue](https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc) for Chrome, [JSONView](https://addons.mozilla.org/en-US/firefox/addon/jsonview) for Firefox) makes responses easier to read.
