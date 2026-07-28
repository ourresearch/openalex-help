---
title: "Topics"
description: "OpenAlex organizes scholarly works into roughly 4,500 research topics, arranged in a four-level hierarchy: domains (4), fields (26), subfields (254), and topics (~4,500). Every…"
tags: ["data"]
source_id: "24736129405719"
source_url: "https://help.openalex.org/hc/en-us/articles/24736129405719-Topics"
source_updated: "2026-03-06"
---
OpenAlex organizes scholarly works into roughly 4,500 research topics, arranged in a four-level hierarchy: domains (4), fields (26), subfields (254), and topics (~4,500). Every work with enough metadata gets assigned to one or more topics automatically.

![](/images/zendesk/24736129393431.png)

This system was developed in collaboration with [CWTS at Leiden University](https://www.cwts.nl/), extending their [Open Leiden Rankings approach](https://www.leidenmadtrics.nl/articles/an-open-approach-for-classifying-research-publications).

## The four-step methodology

Here's how topic assignment works:

### 1\. Cluster the citation network

We start with works that have incoming and outgoing citations, and cluster them based on [citation relationships](https://en.wikipedia.org/wiki/Citation_graph). Works that cite each other frequently end up in the same cluster. These clusters naturally correspond to research communities — groups of scholars working on related problems.

### 2\. Label the clusters with an LLM

Once we have meaningful clusters, we use a large language model to generate topic names and descriptions for each one. This gives us human-readable labels that capture what each research community is about.

### 3\. Train a deep-learning classifier

We then train a deep-learning model to assign topics to any work based on its title, abstract, citations, and journal name. This is the model that does the heavy lifting in production. Importantly, it handles missing data gracefully — it can classify new works that don't have incoming citations yet, using just the title, abstract, and source.

### 4\. Map topics to the hierarchy

Finally, each topic gets mapped to a subfield, field, and domain based on Scopus's [ASJC categories](https://service.elsevier.com/app/answers/detail/a_id/12007/supporthub/scopus/). This gives every topic a place in the four-level hierarchy.

## How topics appear on works

The model scores each candidate topic for a given work. The highest-scoring topic becomes the work's `primary_topic`. Additional high-scoring topics appear in the `topics` array. For example:

-   _Domain:_ "Health Sciences"
-   _Field:_ "Medicine"
-   _Subfield:_ "Health Informatics"
-   _Topic:_ "Artificial Intelligence in Medicine"

Some works don't have enough data to classify — if there's no title, no abstract, and no citations, the model doesn't have enough to work with, and those works won't have topics assigned.

## Topics coverage

Most works are assigned topics — as well as domains, fields, subfields, and keywords — using the methods above. Some works, however, don't have enough associated data to be classified. The following table from the methods paper shows how many works were classified and how many were excluded:

![](/images/zendesk/24736129398167.png)

## Learn more

-   **Methods paper:** [OpenAlex: End-to-End Process for Topic Classification](https://docs.google.com/document/d/1bDopkhuGieQ4F8gGNj7sEc8WSE8mvLZS/edit)
-   **Code and model:** [openalex-topic-classification](https://github.com/ourresearch/openalex-topic-classification) on GitHub
-   **API docs:** [Topics](https://docs.openalex.org/api-entities/topics), [Domains](https://docs.openalex.org/api-entities/domains), [Fields](https://docs.openalex.org/api-entities/fields), [Subfields](https://docs.openalex.org/api-entities/subfields)
