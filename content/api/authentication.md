---
title: "Authentication"
updated: 2026-08-19
description: "API keys, sending your key, rate limits, and keeping tabs on your usage"
tags: ["api"]
source_id: "api-reference/authentication"
source_url: "https://developers.openalex.org/api-reference/authentication"
source_updated: "2026-08-09"
---
OpenAlex data is free, and so is casual use of the API — you can make basic queries with no key at all. To use the API at any real scale, though, you'll want a **free API key**: it raises your daily budget 10× and lets you track your usage. This page covers getting a key, sending it, and staying inside the rate limits. For **what the API costs** and how billing works — that's a separate concern — see [Pricing](/access/pricing/), with worked numbers on the [Example costs](/access/example-costs/) page.

## Getting an API key

It's free. [Make an account](https://openalex.org/) (about 30 seconds) and copy your key from [openalex.org/settings/api](https://openalex.org/settings/api).

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

- **In 24 hours** (the default) or **in 7 days** — both keys work during the window, so you can deploy the new key to your systems with no downtime. The old key keeps its normal limits, then stops for good.
- **Immediately** — the old key dies on the spot. Pick this if the key leaked; and if you've already rotated with a grace window and then discover a leak, use the **Expire now** button to kill the old key early.

Organization keys work the same way, from the organization's API settings.

## Rate limits

Basic use is free and generous, and a free key gives you 10× the keyless budget; you can raise it further with a [paid plan](/access/pricing/). Two things return `429 Too Many Requests`: exceeding your daily budget, or making more than **100 requests per second**. For the budget numbers themselves — and what typical activity actually uses — see [Example costs](/access/example-costs/).

Individual queries also have hard limits:

| Limit | Value |
|-------|-------|
| OR values per filter | 100 |
| `per_page` maximum | 100 |
| `sample` maximum | 10,000 |
| Basic paging limit | 10,000 results |

To retrieve more than 10,000 results, use [cursor paging](/api/paging/#cursor-paging).

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
