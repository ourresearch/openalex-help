---
title: "Keywords"
description: "What a keyword is, how OpenAlex derives keywords from a work's topics, and what every field on a keyword object means."
tags: ["reference"]
source_id: "24736201130391"
source_url: "https://help.openalex.org/hc/en-us/articles/24736201130391-Keywords"
source_updated: "2026-03-06"
---
A **keyword** is a short phrase describing what a work is about — `machine-learning`, `type-1-diabetes`, `citation`. Keywords are one of OpenAlex's [aboutness](/entities/aboutness/) signals: finer-grained than [topics](/entities/topics/) and a good fit for narrow, specific slices of the literature. There are about 65,000 keywords in the system, and each work can be tagged with up to five. A keyword's OpenAlex ID is a readable slug rather than the usual letter-and-number code — `machine-learning` — so a keyword looks like `https://openalex.org/keywords/machine-learning`; fetch one at [`api.openalex.org/keywords/machine-learning`](https://api.openalex.org/keywords/machine-learning).

## How we build it

Keywords are derived from [topics](/entities/topics/): every topic carries a curated set of associated keywords, and a work's keywords are drawn from the keyword sets of the topics it was assigned. Tagging a work runs in four steps:

1. **Gather candidates.** Take the work's assigned topics (up to three) and pull the keywords associated with each. This yields up to 30 candidate keywords.
2. **Score similarity.** Score each candidate against the work's title and abstract using embeddings from the [BGE M3-Embedding model](https://huggingface.co/BAAI/bge-m3), a multilingual embedding model that captures semantic meaning — so a keyword can match even when its exact phrase never appears in the text, and across languages.
3. **Apply a threshold.** Keep only candidates whose similarity score clears a threshold. This filters out keywords that belong to the work's topic area but aren't really relevant to the specific work.
4. **Keep the top five.** From the keywords that pass, the five highest-scoring are assigned to the work.

Each keyword on a work therefore carries a `score` — its similarity to that work's title and abstract. On the keyword object itself, [`works_count`](#works_count) and [`cited_by_count`](#cited_by_count) roll those assignments up across the whole corpus.

The keyword-extraction pipeline is open source: [openalex-keywords (v2)](https://github.com/ourresearch/openalex-keywords/tree/main/v2) on GitHub. See [Aboutness](/entities/aboutness/) for how keywords compare to topics, SDGs, and text search.

## Fields

This is the canonical dictionary of every field on a **keyword** object. Fields shared with other entities are documented once on [Common fields](/entities/common-fields/); keyword-specific notes are below.

### `id`
*String.* The [OpenAlex ID](/entities/overview/#the-openalex-id-scheme) for this keyword. Unlike most entities, a keyword's ID is a readable slug rather than a letter-and-number code, e.g. `https://openalex.org/keywords/machine-learning`. See [Common fields](/entities/common-fields/#id).

### `display_name`
*String.* The keyword's human-readable label, e.g. `Machine learning`. See [Common fields](/entities/common-fields/#display_name).

### `works_count`
*Integer.* The number of works tagged with this keyword. See [Common fields](/entities/common-fields/#works_count).

### `cited_by_count`
*Integer.* The total citations received by all works tagged with this keyword. See [Common fields](/entities/common-fields/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works API](/entities/works/#in-the-api) URL returning every work tagged with this keyword, e.g. `https://api.openalex.org/works?filter=keywords.id:keywords/machine-learning`. A convenience link — it's the same query you'd build with the [`keywords.id`](/entities/works/#keywords) filter.

### `created_date`
*String.* The date this keyword was added to OpenAlex (`YYYY-MM-DD`). See [Common fields](/entities/common-fields/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to this keyword object. See [Common fields](/entities/common-fields/#updated_date).

## In the API

The Keywords endpoint is at [`api.openalex.org/keywords`](https://api.openalex.org/keywords). Fetch a single keyword by its slug ID — [`/keywords/machine-learning`](https://api.openalex.org/keywords/machine-learning) — or a list, and [filter](/api/filtering/), [search](/api/searching/), [sort](/api/sorting/), [group](/api/grouping/), and [page](/api/paging/) over the fields above.

To find the works carrying a keyword, filter on the [Works](/entities/works/) endpoint:

```
https://api.openalex.org/works?filter=keywords.id:machine-learning
```

For the full list of filterable, sortable, and groupable fields see the [Keywords API reference](/api/keywords/); for all endpoints see the [endpoints index](/api/endpoints/).
