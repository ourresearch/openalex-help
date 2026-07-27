---
title: "Should I use Subfields or Concepts for my search?"
description: "Concepts(https://docs.openalex.org/api-entities/works/work-objectconcepts) and Subfields (linked to Topics(https://docs.openalex.org/api-entities/topics)) are both different way…"
tags: ["reference"]
source_id: "27882764757527"
source_url: "https://help.openalex.org/hc/en-us/articles/27882764757527-Should-I-use-Subfields-or-Concepts-for-my-search"
source_updated: "2024-12-09"
---
[Concepts](https://docs.openalex.org/api-entities/works/work-object#concepts) and Subfields (linked to [Topics](https://docs.openalex.org/api-entities/topics)) are both different ways of classifying research outputs. 

For Concepts, we match metadata about the work to wikipedia concepts and accept all matches with a relevancy score >0.3. Concepts are also hierarchical, so child concepts with scores > 0.3 also trigger a match of the parent concept. For some concepts, the 0.1 cutoff works better than others. But, in practice, concepts will have much higher recall and include lots of works that probably aren't what you're looking for (i.e., lower precision).

Subfields are matched by determining the [primary Topic](https://docs.openalex.org/api-entities/works/work-object#primary_topic) a work belongs to, with each topic being mapped to the single, most relevant subfield. In practice, this means precision is typically higher, but it might miss some works that are related to your search if they have a different primary topic. In the [work object](https://docs.openalex.org/api-entities/works/work-object) we nest both [primary\_topic](https://docs.openalex.org/api-entities/works/work-object#primary_topic) and [topics](https://docs.openalex.org/api-entities/works/work-object#topics) (primary\_topic plus two additional, highly ranked topic matches) so that you can balance the lost recall a bit when works span multiple topics.

Generally, users tell us that topics and subfields provide better fits to their needs than concepts. However, if you want to increase recall with subfields, you can search for all subfields that related to any topics instead of just the primary\_topic, which is the default.
