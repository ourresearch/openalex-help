---
title: "SDGs"
updated: 2026-10-04
description: "The UN's 17 SDGs as OpenAlex entities, how works are tagged to them by a classifier OpenAlex trained and tested, what a tag's score means, and what every attribute on an SDG object means."
tags: ["reference"]
source_id: "27972124390679"
source_url: "https://help.openalex.org/hc/en-us/articles/27972124390679-How-do-you-classify-works-as-contributing-to-the-UN-SDGs"
source_updated: "2026-03-06"
entity:
  example: "sdgs/3"
  api: "sdgs"
  linksTo:
    - "works"
---
The **Sustainable Development Goals** (SDGs) are the [17 global goals](https://sdgs.un.org/goals) the United Nations adopted in 2015 to address challenges like poverty, inequality, climate change and environmental degradation, from *No poverty* (SDG 1) to *Partnerships for the goals* (SDG 17). OpenAlex tags each [work](/data/works/) with the goals it addresses, so you can find and analyze research on a given global challenge: for example, every work tagged with SDG 13 (*Climate action*), to study climate-research trends. There are exactly 17; SDGs are one of [several aboutness signals](/data/aboutness/) OpenAlex offers. An SDG's OpenAlex ID looks like `https://openalex.org/sdgs/3`; list them all at [`api.openalex.org/sdgs`](https://api.openalex.org/sdgs).

## About

The 17 goals themselves are a fixed UN vocabulary, so this section is about the tagging: how OpenAlex decides which works address which goal.

**Since October 2026, SDG tags come from a classifier OpenAlex trained and tested itself.** A large language model read the titles and abstracts of 200,000 works and decided, goal by goal, whether each work addresses that goal. We trained a small classifier on those decisions and run it on every work's vector, a numeric summary of its title and abstract. For each goal it gives a `score` from 0 to 1. A work's [`sustainable_development_goals`](/data/works/attributes/#sustainable_development_goals) list holds every goal scoring 0.4 or above, and those lists add up to each SDG's [`works_count`](#works_count) and [`cited_by_count`](#cited_by_count). It replaced the Aurora SDG classifier, whose tags stay in a deprecated field [until November 2026](#the-old-aurora-tags-deprecated).

### How well it works

**The new tags are right far more often than the old ones.** We drew 2,000 works at random from OpenAlex and had a committee of AI judges decide every goal for every work against the UN's goal and target text: two judges independently, and a third where they disagreed. Against those decisions the new tags score F1 0.70 (precision 0.68, recall 0.72); Aurora's scored 0.29.

On a test with no model in the loop, the survey in which researchers voted on whether papers contribute to a goal (8,767 paper-and-goal questions with a clear majority, collected by the Aurora project), the new classifier scores F1 75.5 to Aurora's 63.6.

Works with a title but no abstract are tagged too, a little less accurately: about 65% of their tags are right.

### What `score` means

**`score` is the classifier's confidence, not a probability.** It runs from 0 to 1, a goal appears on a work at 0.4 or above, and a higher score means the classifier is surer. When the judges checked, tags scored 0.4 to 0.5 were right about a quarter of the time, tags scored 0.5 to 0.8 about half the time, 0.8 to 0.9 about 7 times in 10, and above 0.9 about 8 times in 10. Use it to rank works or to keep only the surest tags in your own analysis.

### What counts as addressing a goal

**A work counts when it addresses one of the goal's [UN targets](https://sdgs.un.org/goals), not when it only touches the goal's theme.** SDG 15 (*Life on land*), for example, is about protecting and restoring land ecosystems, forests, soils and biodiversity: a study of deforestation, land degradation or invasive species is SDG 15, but a species occurrence record, a specimen record or a species description with no conservation or ecosystem aim is not. Mentioning a theme in passing is not addressing it.

### Things to keep in mind

- **It reads the title and abstract only, and it can be wrong.** Treat SDG tags as a broad, comparable filter, not a verdict on a single paper.
- **Counts per goal changed at the switch, some of them a lot.** If you compare SDG numbers from before October 2026 with numbers from after, say which classifier each came from.
- **`updated_date` did not change for the switch.** The new tags reached most works without changing their [`updated_date`](/data/common-attributes/#updated_date). If you keep a copy current with `from_updated_date` or by downloading only changed [snapshot](/access/snapshot/) partitions, the new tags will not reach you that way: reload `sustainable_development_goals` for all works once, from a full snapshot released after the switch or from the API.

### The old Aurora tags (deprecated)

**Aurora's tags stay available until November 2026, in their own field.** Every work carries [`sustainable_development_goals_aurora`](/data/works/attributes/#sustainable_development_goals_aurora): the Aurora tags as they stood in October 2026, in the same shape (`id`, `display_name`, `score`). It is output only: you can read it and [select](/api/selecting-fields/) it, but you cannot filter, sort or group by it. It is deprecated and will be removed in November 2026, so use `sustainable_development_goals`, and save anything you need from the old tags before then.

Questions, or a tag that looks wrong: [support@openalex.org](mailto:support@openalex.org).

## Attributes

This is the canonical dictionary of every attribute on an **SDG** object. Attributes shared with other entities are documented once on [Common attributes](/data/common-attributes/) and linked below.

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this goal, e.g. `https://openalex.org/sdgs/3`. Unlike most entities, the numeric part is just the goal number (1 to 17). See [Common attributes](/data/common-attributes/#id).

### `display_name`
*String.* The goal's name, e.g. `Good health and well-being`. See [Common attributes](/data/common-attributes/#display_name).

### `description`
*String.* A one-sentence statement of the goal, e.g. "Ensure healthy lives and promote well-being for all at all ages."

### `ids`
*Object.* External identifiers for this goal as URIs. SDG-specific keys: `openalex`, `un` (the goal's [UN metadata](https://metadata.un.org/sdg) URI, e.g. `https://metadata.un.org/sdg/3`), and `wikidata`.

### `image_url`
*String.* URL of the goal's official UN icon (an SVG on Wikimedia Commons).

### `image_thumbnail_url`
*String.* The same icon as [`image_url`](#image_url), scaled down (`width=300`).

### `works_count`
*Integer.* How many works are tagged with this goal (scored 0.4 or above for it). See [Common attributes](/data/common-attributes/#works_count).

### `cited_by_count`
*Integer.* Total citations across all works tagged with this goal. See [Common attributes](/data/common-attributes/#cited_by_count).

### `works_api_url`
*String.* A ready-made [Works API](/data/works/) URL that returns every work tagged with this goal: `works?filter=sustainable_development_goals.id:<un-uri>`.

### `created_date`
*String.* The date this goal was added to OpenAlex (`YYYY-MM-DD`). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC timestamp of the last change to this object. See [Common attributes](/data/common-attributes/#updated_date).

Of these, [`works_count`](#works_count), [`cited_by_count`](#cited_by_count), [`display_name`](#display_name), and [`id`](#id) can be used as filters and sort keys; `works_count`, `cited_by_count`, and `id` also support `group_by`. The others are select-only columns.

## In the API

The SDGs endpoint is at [`api.openalex.org/sdgs`](https://api.openalex.org/sdgs), a short, fixed list of 17. Fetch a single goal by number ([`/sdgs/3`](https://api.openalex.org/sdgs/3)) or the whole list, and [filter](/api/filtering/), sort, and [group](/api/grouping/) over the fields above. For the full list of endpoints see the [endpoints index](/api/endpoints/).

The more common way to use SDGs is from the works side: every [work](/data/works/) carries a [`sustainable_development_goals`](/data/works/attributes/#sustainable_development_goals) list, and you can filter works by goal.

```
# List all 17 SDGs
https://api.openalex.org/sdgs

# One goal
https://api.openalex.org/sdgs/13

# Works tagged with SDG 3 (Good health and well-being)
https://api.openalex.org/works?filter=sustainable_development_goals.id:3
```
