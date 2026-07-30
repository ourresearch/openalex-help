---
title: "Aboutness"
description: "The subject signals OpenAlex offers — topics, keywords, SDGs, concepts, and text search — and how to choose among them by granularity, familiarity, and fit to your research question."
tags: ["reference"]
source_id: "24859286130583"
source_url: "https://help.openalex.org/hc/en-us/articles/24859286130583-Aboutness"
source_updated: "2024-07-26"
---
**Aboutness** is what the things in OpenAlex are about. Most works are "about" something, and that aboutness aggregates up to characterize authors, institutions, sources, and other entities. OpenAlex offers several distinct aboutness signals, each usable as a filter; which one fits depends on your question.

Two properties help you choose. **Granularity** (the number of groups) sets how fine-grained an analysis can be. **Familiarity** is how recognizable the scheme is to others — how easily you can compare or share results.

| Signal | # groups | Familiarity | Fit to custom areas |
|---|---|---|---|
| [SDGs](/docs/sdg-classification/) | 17 | High | Low |
| [Domains](/docs/topics/) | 4 | High | Low |
| [Fields](/docs/topics/) | 26 | High | Low |
| [Subfields](/docs/topics/) | 252 | High | Medium |
| [Topics](/docs/topics/) | 4,516 | Low | Medium-high |
| [Keywords](/docs/keywords/) | ~65,000 | Medium | High |
| [Concepts](/api/concepts/) (deprecated) | ~65,000 | High | Variable |
| [Text search](/api/searching/) | ∞ | Low | High |

A rough guide: the **topics hierarchy** (domains → fields → subfields → topics) is the supported general-purpose system — pick the level whose granularity matches your question. **Keywords** fit narrower, more specific slices. **SDGs** map research onto the UN Sustainable Development Goals and little else. **Concepts** are deprecated — kept for continuity with Microsoft Academic Graph, no longer maintained; see [subfields vs concepts](/docs/topics/#subfields-vs-concepts). **Text search** fits custom areas no scheme covers, at the cost of comparability.

## Aboutness for your own text

For the topics hierarchy and keywords, you can supply your own custom text — the title and abstract of an unpublished article, say, or a grant proposal — and get back SDGs, domains, fields, subfields, topics, and keywords in exactly the form OpenAlex assigns them to works. See the [text aboutness endpoint](/api/tag-aboutness/).

## Related pages

- [Topics](/docs/topics/) — the four-level hierarchy and how it's assigned
- [Keywords](/docs/keywords/) — how keyword tagging works
- [SDG classification](/docs/sdg-classification/) — the Sustainable Development Goals tagger
- [FWCI](/docs/fwci/) — the field-normalized citation metric built on subfields
