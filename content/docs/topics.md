---
title: "Topics"
description: "How OpenAlex classifies works into ~4,500 research topics arranged in a four-level hierarchy (domains, fields, subfields, topics), how topics roll up to entities, and how topics compare to the deprecated concepts system."
tags: ["reference"]
source_id: "24736129405719"
source_url: "https://help.openalex.org/hc/en-us/articles/24736129405719-Topics"
source_updated: "2026-03-06"
---
OpenAlex organizes scholarly works into about 4,500 research **topics**, arranged in a four-level hierarchy: 4 domains, 26 fields, 252 subfields, and 4,516 topics. Every work with enough metadata is assigned topics automatically — about 88% of the works in OpenAlex have one.

![](/images/zendesk/24736129393431.png)

The classification system was developed in collaboration with [CWTS at Leiden University](https://www.cwts.nl/), extending their [open approach to classifying research publications](https://www.leidenmadtrics.nl/articles/an-open-approach-for-classifying-research-publications).

## How topics are assigned

Topic assignment has four steps:

### 1. Cluster the citation network

We start with works that have incoming and outgoing citations, and cluster them based on [citation relationships](https://en.wikipedia.org/wiki/Citation_graph). Works that cite each other frequently end up in the same cluster. These clusters naturally correspond to research communities — groups of scholars working on related problems.

### 2. Label the clusters with an LLM

Once we have meaningful clusters, we use a large language model to generate topic names and descriptions for each one. This gives us human-readable labels that capture what each research community is about.

### 3. Train a deep-learning classifier

We then train a deep-learning model to assign topics to any work based on its title, abstract, citations, and journal name. This is the model that does the heavy lifting in production. Importantly, it handles missing data gracefully — it can classify new works that don't have incoming citations yet, using just the title, abstract, and source.

### 4. Map topics to the hierarchy

Finally, each topic is mapped to a subfield, field, and domain based on Scopus's [ASJC categories](https://service.elsevier.com/app/answers/detail/a_id/12007/supporthub/scopus/). This gives every topic a place in the four-level hierarchy.

## How topics appear on works

The model scores each candidate topic for a given work. The highest-scoring topic becomes the work's `primary_topic`. Additional high-scoring topics appear in the `topics` array. For example:

- _Domain:_ "Health Sciences"
- _Field:_ "Medicine"
- _Subfield:_ "Health Informatics"
- _Topic:_ "Artificial Intelligence in Medicine"

Some works don't have enough data to classify: if there's no title, no abstract, and no citations, the model doesn't have enough to work with. About 12% of works have no topic for this reason (39.6M of 322M as of mid-2026; count them yourself with [`filter=primary_topic.id:null`](https://api.openalex.org/works?filter=primary_topic.id:null)).

## Topics on entities: `topics` vs `topics_share`

Topics also aggregate up to the entities that produce works. Authors, institutions, and sources each carry two topic lists that answer different questions:

- **`topics`** — the (up to) 25 topics with the highest **count** of the entity's works. "What does this entity publish the most of?"
- **`topics_share`** — the topics where the entity has the highest **share of that topic's global output** (the entity's works in the topic divided by all works in the topic). "Where does this entity loom largest?"

The lists are often similar, but they diverge when an entity's top topics differ in size. A university with 100 publications in a topic that has 5,000 publications globally (a 2% share) ranks that topic much higher by share than a topic where its 100 publications sit among 500,000 globally (a 0.02% share).

## Subfields vs concepts

Before topics, OpenAlex classified works with [concepts](/api/concepts/) — a Wikipedia-derived vocabulary inherited from Microsoft Academic Graph. Concepts are **deprecated**: they are no longer maintained, and topics are the supported classification system. If you're choosing between them:

- **Concepts** match work metadata to Wikipedia concepts, accepting all matches above a relevancy score, and parent concepts fire whenever a child matches. In practice this means high recall and low precision — concept queries return many works that aren't really what you're looking for.
- **Subfields** (and topics generally) are assigned through the primary-topic pipeline above, with each topic mapping to a single subfield. Precision is typically much higher, at the cost of missing works whose *primary* topic lands elsewhere.

To recover some of that recall, use the full `topics` array rather than `primary_topic` alone: filtering on `topics.subfield.id` matches any of a work's assigned topics, not just the primary one.

## Learn more

- **Methods paper:** [OpenAlex: End-to-End Process for Topic Classification](https://docs.google.com/document/d/1bDopkhuGieQ4F8gGNj7sEc8WSE8mvLZS/edit)
- **Code and model:** [openalex-topic-classification](https://github.com/ourresearch/openalex-topic-classification) on GitHub
- **API reference:** [Topics](/api/topics/) · [Subfields](/api/subfields/) · [Concepts (deprecated)](/api/concepts/)
- [Aboutness](/docs/aboutness/) — how topics fit among OpenAlex's other subject signals
