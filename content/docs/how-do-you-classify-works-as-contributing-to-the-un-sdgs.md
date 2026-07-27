---
title: "How do you classify works as contributing to the UN SDGs?"
description: "OpenAlex tags scholarly works with relevant United Nations Sustainable Development Goals(https://sdgs.un.org/goals) (SDGs). These are the 17 global goals adopted by the UN in 20…"
tags: ["data"]
source_id: "27972124390679"
source_url: "https://help.openalex.org/hc/en-us/articles/27972124390679-How-do-you-classify-works-as-contributing-to-the-UN-SDGs"
source_updated: "2026-03-06"
---
OpenAlex tags scholarly works with relevant [United Nations Sustainable Development Goals](https://sdgs.un.org/goals) (SDGs). These are the 17 global goals adopted by the UN in 2015 to address challenges like poverty, inequality, climate change, and environmental degradation. When a work's content aligns with one or more of these goals, OpenAlex applies the corresponding SDG tag.

This lets you find and analyze research related to specific global challenges — for example, pulling all works tagged with SDG 13 (Climate Action) to understand research trends around climate change.

## How classification works

We use the [Aurora Universities SDG Classifier](https://aurora-universities.eu/sdg-research/classify/) on works' title and abstract text to classify works as contributing to the SDGs.

When we first launched the feature, any work with a score above 0.1 for an SDG was given a tag. However, we heard from users that this led to an undesired balance of high recall (high likelihood of getting all publications from that SDG) with vastly lower precision (many publications erroneously tagged).

Through collaborations with universities in Canada and Europe, we altered the classification cut-off scores and tested fit of results to their expectations. We found that **0.4** was a much better cut-off threshold — values higher than that started to miss SDG matches and values lower than that brought in too many incorrect matches. Therefore, we now use 0.4 as the relevancy score cut-off.

The great part about using an open-source classifier is that folks around the world can use the same classifier in their internal systems for documents that don't get indexed in OpenAlex (e.g., course syllabi, non-published research, grants).

## The 17 SDGs

| ID | Name |
| --- | --- |
| 1 | No Poverty |
| 2 | Zero Hunger |
| 3 | Good Health and Well-being |
| 4 | Quality Education |
| 5 | Gender Equality |
| 6 | Clean Water and Sanitation |
| 7 | Affordable and Clean Energy |
| 8 | Decent Work and Economic Growth |
| 9 | Industry, Innovation and Infrastructure |
| 10 | Reduced Inequalities |
| 11 | Sustainable Cities and Communities |
| 12 | Responsible Consumption and Production |
| 13 | Climate Action |
| 14 | Life Below Water |
| 15 | Life on Land |
| 16 | Peace, Justice and Strong Institutions |
| 17 | Partnerships for the Goals |

## API access

You can browse SDGs and filter works by SDG through the API:

```
# List all SDGs
https://api.openalex.org/sdgs

# Get works tagged with SDG 3 (Good Health and Well-being)
https://api.openalex.org/works?filter=sustainable_development_goals.id:3

# Get works tagged with SDG 13 (Climate Action)
https://api.openalex.org/works?filter=sustainable_development_goals.id:13
```

For full details, see the [SDGs API documentation](https://docs.openalex.org/api-entities/sdgs).
