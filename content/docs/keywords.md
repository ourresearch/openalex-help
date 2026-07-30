---
title: "Keywords"
description: "Keywords are short phrases describing what a work is about — about 65,000 in the system, up to 5 per work — assigned by scoring topic-derived candidates against the work's title and abstract with a multilingual embedding model."
tags: ["reference"]
source_id: "24736201130391"
source_url: "https://help.openalex.org/hc/en-us/articles/24736201130391-Keywords"
source_updated: "2026-03-06"
---
Keywords in OpenAlex are short phrases that describe what a work is about. There are about 65,000 keywords in the system, and each work can be tagged with up to 5 of them. Keywords are derived from [topics](/docs/topics/) — each topic has a set of associated keywords.

## How keywords are assigned

The process for assigning keywords to a work has four steps:

1. **Gather candidate keywords** — Take the topics assigned to the work (up to 3) and pull the keywords associated with those topics. This gives up to 30 candidate keywords.
2. **Score similarity** — Score each candidate keyword's similarity to the work's title and abstract using embeddings from the [BGE M3-Embedding model](https://huggingface.co/BAAI/bge-m3). This is a multilingual embedding model that captures semantic meaning, so it can match keywords even when the exact phrase doesn't appear in the text.
3. **Apply a threshold** — Only keywords that score above a similarity threshold are kept. This filters out keywords that are related to the work's topic area but aren't really relevant to the specific work.
4. **Keep the top 5** — From the keywords that pass the threshold, the top 5 by similarity score are assigned to the work.

## Source code

The keyword extraction pipeline is open source: [openalex-keywords (v2)](https://github.com/ourresearch/openalex-keywords/tree/main/v2) on GitHub.

## API access

You can browse and filter keywords through the API:

```
https://api.openalex.org/keywords
https://api.openalex.org/keywords/type-1-diabetes
```

To find works with a specific keyword:

```
https://api.openalex.org/works?filter=keywords.id:machine-learning
```

For full details, see the [Keywords API reference](/api/keywords/).

## Related pages

- [Aboutness](/docs/aboutness/) — how keywords fit among OpenAlex's other subject signals
- [Topics](/docs/topics/) — the classification system keywords are derived from

If you see any issues with keywords, feel free to submit a [support request](https://openalex.org/help).
