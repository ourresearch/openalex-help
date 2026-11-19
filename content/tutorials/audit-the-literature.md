---
title: "Audit the Literature with AI"
updated: 2026-11-19
subtitle: "Point a model at thousands or millions of papers: choose the set, screen the abstracts, get the full text, and see what each paper is tied to."
description: "Build an AI audit of the scientific literature on OpenAlex: define the corpus, screen abstracts for cents, get GROBID-parsed full text (TEI XML) or PDFs by work ID, add citations and retractions as context, and see what it costs."
tags: ["recipes", "downloads"]
card: "150M+ abstracts and 60M+ parsed full texts, one ID per paper, every field: the corpus for checking papers at scale."
---
Language models can now read a paper and check it: recompute a number, catch a duplicated image, notice a claim its data don't support. Doing that across a whole field takes three things: the list of papers, their text, and the context around each one (what it cites, who cites it, whether it was retracted). OpenAlex has all three for every field, under one ID per paper.

| What | Works (Nov 2026) |
|------|------------------|
| Works | 296M |
| With an abstract | 152M |
| With a cached PDF | 64M |
| With full text parsed into TEI XML | 62M |

Already have text from arXiv or Europe PMC? Keep it, and join it to OpenAlex by DOI, arXiv ID or PMCID: you get the other fields, and the citations and retractions around each paper, under the same ID.

Coding agents can follow this page as written: hand yours the [Markdown version](https://help.openalex.org/tutorials/audit-the-literature.md) and ask it to build the pipeline.

## 1. Choose the papers

Any OpenAlex filter defines the corpus. Here, psychology papers from 2010 to 2020, most-cited first, with what the later steps need:

```
https://api.openalex.org/works?filter=primary_topic.field.id:32,publication_year:2010-2020&include_pulled=true&sort=cited_by_count:desc&select=id,doi,title,cited_by_count,fwci,is_retracted,abstract_inverted_index,has_content,content_urls&per_page=100&cursor=*&api_key=YOUR_KEY
```

That's about 2.6 million works. Swap the [field](/data/fields/) for any subfield, topic, journal, institution or funder. Two choices to make on purpose:

- **Keep the retracted papers.** Lists leave out retracted, withdrawn and removed works unless you add `include_pulled=true`. An audit wants them: they are the known errors you calibrate against (`is_retracted` marks them; [pulled works](/data/works/pulled/)).
- **Save the list.** Counts and citations change as the index updates, so the saved work IDs and the date you pulled them, not the query, are your audit's corpus. For a random sample instead of the most-cited, swap the `sort` and `cursor` for `sample=1000&seed=42`.

Page through with the `cursor` that each response returns ([paging](/api/paging/)).

## 2. Screen with abstracts

Abstracts come in the list results, so screening is cheap: one call returns 100 works for $0.0001. All 2.6 million psychology works cost about $2.60, and all 152 million abstracts about $150, or nothing from the [snapshot](/access/snapshot/). About 1.6 million of these psychology works have an abstract (filter `has_abstract:true` to get just those). Use them to pick the papers worth a full read.

Abstracts arrive as `abstract_inverted_index` (each word with its positions), and some works have none. Rebuild the text like this:

```python
def abstract(inv):
    if not inv:
        return None
    words = sorted((pos, word) for word, positions in inv.items() for pos in positions)
    return " ".join(word for _, word in words)
```

## 3. Get the full text for your shortlist

Of the 2.6 million, about 611,000 have full text parsed by [GROBID](https://github.com/kermitt2/grobid) into TEI XML (`has_content.grobid_xml: true`): sections with their headings, formulas, figure captions, table text, the reference list as structured records, and each in-text citation linked to its reference. A model usually reads that more reliably than a PDF. TEI holds no images, so for figure and image checks get the PDF too.

```bash
curl --compressed -o W3006659024.xml "https://content.openalex.org/works/W3006659024.grobid-xml?api_key=YOUR_KEY"
curl -o W3006659024.pdf "https://content.openalex.org/works/W3006659024.pdf?api_key=YOUR_KEY"
```

Each file costs $0.01, so a shortlist of 1,000 papers costs $10 for one format, and a free key covers 100 files a day. A `HEAD` request (size and type) is free. For a long shortlist, save its work IDs one per line and give them to the [CLI](/access/cli/), which downloads in parallel, retries, and picks up where it stopped:

```bash
pip install openalex-official
cat shortlist.txt | openalex download --api-key YOUR_KEY --output ./psych --stdin --content xml
```

Use `--content xml,pdf` for both. Expect 20,000 to 50,000 files an hour from home, several times that from a cloud machine. For the whole archive, see [Fulltext](/access/fulltext/#option-3-complete-archive-sync).

The text is an open-access copy, and it keeps its source's license (`best_oa_location.license` on the work); OpenAlex's own metadata is CC0.

## 4. Add the context

- **What a paper cites:** `referenced_works` on the work.
- **Who cites it:** `https://api.openalex.org/works?filter=cites:W3006659024`. A citation can agree, criticize or just mention, so to follow an error forward, read the citing passage: TEI links each in-text citation to its reference.
- **Which papers get the most attention:** `fwci` and `cited_by_percentile_year` rank a paper's citations against its field and year.
- **Who to tell:** `authorships` lists each author with their ORCID and institutions, and marks the corresponding authors.

## 5. What the data costs

| Step | Cost |
|------|------|
| 1 million abstracts, by API | about $1 |
| 1,000 full-text files (PDF or TEI XML) | $10 |
| A free API key, every day | $1: about 100 files, or about 1 million abstracts |

Model costs come on top. [Prepaid usage and plans](/access/pricing/) cover more data; see [Example costs](/access/example-costs/) for the rest.

## Before you publish a finding

A model's flag is a lead, not a finding. Check each one by hand against the original paper (a parsing slip is not a research error), and give the authors a chance to respond before you go public. Building an audit on OpenAlex? We'd like to hear what you're doing: [support@openalex.org](mailto:support@openalex.org).
