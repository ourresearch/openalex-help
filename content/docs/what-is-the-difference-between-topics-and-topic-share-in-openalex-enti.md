---
title: "What is the difference between topics and topic_share in OpenAlex entities?"
description: "Within some of the OpenAlex entities (institutions, authors, sources), we have separate fields for topics and topic\\shares."
tags: ["data"]
source_id: "27255333459991"
source_url: "https://help.openalex.org/hc/en-us/articles/27255333459991-What-is-the-difference-between-topics-and-topic-share-in-OpenAlex-entities"
source_updated: "2024-10-22"
---
Within some of the OpenAlex entities (institutions, authors, sources), we have separate fields for topics and topic\_shares.

_Topics_ are the (up to) 25 topics for which the entity has the highest number of works matching while _topics\_share_ is the topics for which the institution has the highest percent of that topic's total volume. So the first is raw publication counts while the second is the # publications in a topic divided by the total number of papers in that topic. Sometimes these lists will be similar, but they can be different when the top topics vary in size (e.g., university x has 100 publications in topic A which has 5,000 total publications in it globally vs. having 100 publications in topic B which has 500,000 total publications in it globally).
