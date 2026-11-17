---
title: "Error Handling"
updated: 2026-11-17
description: "API error codes and retry strategies"
tags: ["api"]
source_id: "api-reference/errors"
source_url: "https://developers.openalex.org/api-reference/errors"
source_updated: "2026-02-18"
---
The OpenAlex API uses standard HTTP status codes to indicate success or failure.

## HTTP Status Codes

| Code | Meaning | What to Do |
|------|---------|------------|
| `200` | Success | Request completed successfully |
| `301` | Moved Permanently | Entity was merged; follow the redirect (api.openalex.org follows it for you and returns the surviving record; best effort) |
| `400` | Bad Request | Check your filter syntax or parameters |
| `403` | Forbidden | You don't have access to this resource, or your plan doesn't include it ([Plan upgrade required](#plan-upgrade-required)). Retrying won't help. (A collection you can't read returns `404`, not `403`.) |
| `404` | Not Found | Entity doesn't exist |
| `429` | Too Many Requests | Rate limit or daily credit budget exceeded; slow down or wait for the reset |
| `500` | Server Error | Temporary issue; retry with backoff |
| `503` | Service Unavailable | Temporarily unable to answer; wait the seconds in the `Retry-After` header if there is one (else back off), then retry |

## Error Response Format

Error responses include a message explaining what went wrong:

```json
{
  "error": "Invalid filter",
  "message": "Unknown filter field: author_name. Did you mean: authorships.author.id?"
}
```

## Common Errors

### Invalid Filter Syntax

```
400 Bad Request
"Invalid filter: publication_year:abc"
```

**Fix:** Ensure values match expected types. `publication_year` expects an integer.

### Unknown Filter Field

```
400 Bad Request
"Unknown filter field: author_name"
```

**Fix:** Use the correct filter field. For authors, use `authorships.author.id` with an ID, not a name. See [Resolve IDs](/how-to/finding-openalex-ids/).

### Rate Limit Exceeded

```
429 Too Many Requests
{
  "error": "Rate limit exceeded",
  "message": "Rate limit exceeded: this key can send 50 requests per second. Your daily budget is not affected ($143.20 left today). Retry after 1s. Limits: https://help.openalex.org/api/authentication/#rate-limits",
  "reason": "requests_per_second",
  "perSecondLimit": 50,
  "retryAfter": 0.012,
  "dailyRemainingUsd": 143.2
}
```

The body's `reason` says which limit you hit:

| `reason` | What happened | What to do |
|---|---|---|
| `requests_per_second` | More requests per second than your key's limit (10, 30 or 50; see [Per-second limits](/api/authentication/#per-second-limits)) | Wait `Retry-After` (usually 1 second) and retry. Your daily budget is untouched. |
| `broad_boolean_query` | A search with more than 5 `AND`/`OR`/`NOT` came too soon after the previous one (1, 2 or 5 a second) | Send these searches one at a time, or narrow the query. |
| `wide_or_filter` | A filter joins more than 10 `topics.id`, `primary_topic.id`, `concepts.id` or `concept.id` values with `\|` (1 a second) | Split the list into requests of at most 10 values. |
| `semantic_search` | A second [semantic search](/api/semantic-search/) within the same second | Wait a second and retry. |
| `first_dollar` | A [new account](/api/authentication/#new-accounts) spending its first $1 faster than the new-account pace | Wait the `Retry-After` seconds. |
| `daily_budget` | Today's budget (and any prepaid usage) is spent | Wait for midnight UTC, or add [prepaid usage](/access/pricing/). |

A per-second `429` costs nothing. `perSecondLimit` gives the limit you hit, and `dailyRemainingUsd` and the `X-RateLimit-Remaining` headers show what's left of today's budget. A few rarer `429`s (keyless traffic while search is under heavy load, an account we've throttled) carry no `reason`; wait the `Retry-After` seconds and retry.

**To stay under the limits:**
- Check [`/rate-limit`](/api/authentication/#keeping-tabs-on-your-usage) for your key's limits and today's budget
- Use `per_page=100` to reduce total requests
- Consider a [paid plan](/access/pricing/) for a bigger daily budget

### Plan upgrade required

```
403 Forbidden
"Plan upgrade required"
```

You filtered or sorted by when records were created or updated (`from_updated_date` and the other [sync filters](/api/filtering/#sync-filters-member-and-partner)). They are the one exception to "every filter is free": they're part of daily sync, which needs a Member+ or Partner plan.

Waiting or retrying won't change the answer. (Until November 2026 this came as a `429`.)

**Fix:** Remove the filter or sort. To keep a copy of OpenAlex up to date, see [Sync](/access/sync/): the quarterly snapshot is free, and daily updates come with the [Member+ and Partner plans](/access/pricing/#free-data-paid-services).

### Entity Not Found

```
404 Not Found
"Work W9999999999 not found"
```

**Fix:** Verify the ID exists. A merged-away work, author, source, institution or funder ID usually returns the surviving record instead of a 404 (best effort, not a permanence promise); a deleted ID returns 404 (see [Merged entities](/api/get-single-entities/#merged-entities)).

## Retry Logic

Implement exponential backoff for transient errors:

```python
import time
import requests

def fetch_with_retry(url, max_retries=5):
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=30)

            if response.status_code == 200:
                return response.json()

            if response.status_code == 429:
                # Rate limited - wait longer
                wait_time = 2 ** attempt
                time.sleep(wait_time)
                continue

            if response.status_code >= 500:
                # Server error - retry
                wait_time = 2 ** attempt
                time.sleep(wait_time)
                continue

            # Client error - don't retry
            response.raise_for_status()

        except requests.exceptions.Timeout:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)
            else:
                raise

    raise Exception(f"Failed after {max_retries} retries")
```

## Rate Limit Headers

Every response includes headers showing your current status:

```
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 8766
X-RateLimit-Credits-Used: 1
X-RateLimit-Reset: 43200
```

Error responses are free. Any `4xx` or `5xx` response costs 0 credits, and its `X-RateLimit-Credits-Used` header reports `0`. A typo in a filter or search does not use up your daily budget.

An OQL table of groups, or a query in OQL's general form, is priced from what it does (see
[Example costs](/access/example-costs/#what-an-oql-calculation-costs)).
If it costs more than you have left today, it is refused before it runs, with HTTP `429` and
`"error": "not_enough_credits"`. The body names the price (`cost`, step by step) and how to fix
it: run it after the daily reset, add [prepaid usage](/access/buying-and-renewing/), or narrow
the query (fewer listed searches). The refusal itself is free.

Use these to:
- Monitor your usage
- Pause before hitting limits
- Calculate when limits reset (seconds until midnight UTC)

## Best Practices

1. **Always set timeouts** — Use 30-second timeouts to avoid hanging requests
2. **Implement backoff** — Don't retry immediately; wait 1s, 2s, 4s, etc.
3. **Check headers** — Monitor `X-RateLimit-Remaining` to avoid hitting limits
4. **Log errors** — Record failures for debugging
5. **Use bulk endpoints** — Batch requests to reduce total API calls
