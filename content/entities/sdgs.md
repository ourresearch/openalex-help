---
title: "Sustainable Development Goals"
description: "The UN's 17 Sustainable Development Goals as OpenAlex entities, how works are tagged to them by an open-source machine-learning classifier, and what every field on an SDG object means."
tags: ["reference"]
source_id: "27972124390679"
source_url: "https://help.openalex.org/hc/en-us/articles/27972124390679-How-do-you-classify-works-as-contributing-to-the-UN-SDGs"
source_updated: "2026-03-06"
---
The **Sustainable Development Goals** (SDGs) are the [17 global goals](https://sdgs.un.org/goals) the United Nations adopted in 2015 to address challenges like poverty, inequality, climate change, and environmental degradation — from *No poverty* (SDG 1) to *Partnerships for the goals* (SDG 17). OpenAlex tags each [work](/entities/works/) with the SDGs its title and abstract are relevant to, so you can find and analyze research on a given global challenge — for example, pulling every work tagged with SDG 13 (*Climate action*) to study climate-research trends. There are exactly 17, one of [several aboutness signals](/entities/aboutness/) OpenAlex offers. An SDG's OpenAlex ID looks like `https://openalex.org/sdgs/3`; list them all at [`api.openalex.org/sdgs`](https://api.openalex.org/sdgs).

## How we build it

The 17 goals themselves are a fixed UN vocabulary, so this section is about the tagging: how OpenAlex decides which works contribute to which goal.

OpenAlex runs the open-source [Aurora Universities SDG Classifier](https://aurora-universities.eu/sdg-research/classify/) over each work's title and abstract. For every goal, the model returns a predicted-probability score, and OpenAlex keeps the goals scoring above a relevancy threshold — attaching them to the work's [`sustainable_development_goals`](/entities/works/#sustainable_development_goals) list (each with its `score`) and rolling them up into each SDG's [`works_count`](#works_count) and [`cited_by_count`](#cited_by_count).

The threshold is **0.4**. At launch the cutoff was 0.1, which gave high recall but poor precision — many works were tagged with goals they weren't really about. Working with universities in Canada and Europe to test results against expert expectations, we found 0.4 struck the best balance: higher values started to miss genuine matches, lower values pulled in too many spurious ones.

Two things to keep in mind:

- **It's a text classifier, so it inherits text-classifier limits.** Tags come only from the title and abstract; a work with no abstract has less signal, and the model can still mislabel. Treat SDG tags as a broad, comparable filter, not a precise verdict on a single paper.
- **The classifier is open source.** Because Aurora is public, you can run the identical model on documents OpenAlex doesn't index — course syllabi, grant proposals, unpublished research — and get tags in the same form. OpenAlex also exposes it directly through the [text aboutness endpoint](/api/tag-aboutness/).

For the fuller write-up, see [How we classify works as contributing to the UN SDGs](/docs/sdg-classification/).

## Fields

This is the canonical dictionary of every field on an **SDG** object. Fields shared with other entities are documented once on [Common fields](/entities/common-fields/) and linked below.

### `id`
*String.* The [OpenAlex ID](/entities/overview/#the-openalex-id-scheme) for this goal, e.g. `https://openalex.org/sdgs/3`. Unlike most entities, the numeric part is just the goal number (1–17). See [Common fields](/entities/common-fields/#id).

### `display_name`
*String.* The goal's name, e.g. `Good health and well-being`. See [Common fields](/entities/common-fields/#display_name).

### `description`
*String.* A one-sentence statement of the goal, e.g. "Ensure healthy lives and promote well-being for all at all ages."

### `ids`
*Object.* External identifiers for this goal as URIs. SDG-specific keys: `openalex`, `un` (the goal's [UN metadata](https://metadata.un.org/sdg/) URI, e.g. `https://metadata.un.org/sdg/3`), and `wikidata`.

### `image_url`
*String.* URL of the goal's official UN icon (an SVG on Wikimedia Commons).

### `image_thumbnail_url`
*String.* The same icon as [`image_url`](#image_url), scaled down (`width=300`).

### `works_count`
*Integer.* How many works are tagged with this goal (i.e. scored above 0.4 for it). See [Common fields](/entities/common-fields/#works_count).

### `cited_by_count`
*Integer.* Total citations across all works tagged with this goal. See [Common fields](/entities/common-fields/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works API](/entities/works/) URL that returns every work tagged with this goal — i.e. `works?filter=sustainable_development_goals.id:<un-uri>`.

### `created_date`
*String.* The date this goal was added to OpenAlex (`YYYY-MM-DD`). See [Common fields](/entities/common-fields/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to this object. See [Common fields](/entities/common-fields/#updated_date).

Of these, [`works_count`](#works_count), [`cited_by_count`](#cited_by_count), [`display_name`](#display_name), and [`id`](#id) can be used as filters and sort keys; `works_count`, `cited_by_count`, and `id` also support `group_by`. The others are select-only columns.

## In the API

The SDGs endpoint is at [`api.openalex.org/sdgs`](https://api.openalex.org/sdgs) — a short, fixed list of 17. Fetch a single goal by number — [`/sdgs/3`](https://api.openalex.org/sdgs/3) — or the whole list, and [filter](/api/filtering/), sort, and [group](/api/grouping/) over the fields above. For the full list of endpoints see the [endpoints index](/api/endpoints/).

The more common way to use SDGs is from the works side: every [work](/entities/works/) carries a [`sustainable_development_goals`](/entities/works/#sustainable_development_goals) list, and you can filter works by goal.

```
# List all 17 SDGs
https://api.openalex.org/sdgs

# One goal
https://api.openalex.org/sdgs/13

# Works tagged with SDG 3 (Good health and well-being)
https://api.openalex.org/works?filter=sustainable_development_goals.id:3
```

See the [SDGs API reference](/api/sdgs/) for the filter/sort/group_by table.
