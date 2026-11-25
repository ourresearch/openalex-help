---
title: "Reference lists"
updated: 2026-11-25
description: "Each work's reference list, line by line: the text of each reference, the DOI its source gave, and the OpenAlex work it links to. Served at /works/{id}/references."
tags: ["reference"]
---
A work's **reference list** is the list of references printed at the end of the paper, line by line. For each line OpenAlex keeps the text as we read it, the DOI the source gave for it, and the work in OpenAlex it links to, if any. Get a work's list at `/works/{id}/references`, for example [`api.openalex.org/works/W2741809807/references`](https://api.openalex.org/works/W2741809807/references):

```json
{
  "references": [
    {
      "raw_reference_string": "Anderson. 2017. When the wolf finally arrives: big deal cancelations in North American Libraries",
      "raw_doi": null,
      "work_id": null
    },
    {
      "raw_reference_string": "Anderson. 2017. The forbidden forecast: thinking about open access and library subscriptions",
      "raw_doi": null,
      "work_id": "https://openalex.org/W2611818942"
    },
    {
      "raw_reference_string": null,
      "raw_doi": "https://doi.org/10.1016/j.joi.2016.08.002",
      "work_id": "https://openalex.org/W2520991028"
    }
  ]
}
```

(Three of its 52 lines: one we couldn't match, one matched by its text, one the publisher gave only as a DOI.)

A work's [`referenced_works`](/data/works/attributes/#referenced_works) lists only the references we matched to a work. The reference list shows every line, matched or not, so you can see what a paper cites that isn't in OpenAlex, and the line each citation came from.

## About

### Where the lists come from

From the work's own records: the reference list a publisher deposits with Crossref, the one PubMed gives, the one DataCite gives, and the one we read from the PDF of an open copy. A work with several lists shows one: the longest list of its best version (the published or accepted version before a preprint), in printed order. How each line is matched to a work: [Citations](/data/works/citations/#citations-and-references).

The list then has up to two more groups of lines, in this order:

1. **Every line of that list, in printed order.**
2. **Lines from the work's other lists** that link to a work the first list doesn't, once each, with that list's text.
3. **Citations with no printed line**, with both `raw_reference_string` and `raw_doi` null: links in `referenced_works` inherited from Microsoft Academic Graph. Since 25 November 2026 a work keeps these only when its own reference lists link no work at all, mostly works we hold no list for.

So the `work_id`s on a work's list are exactly its `referenced_works`: the same works, from the same matches, updated together. The list is usually longer, since unmatched lines are on it (with `work_id` null) and two lines can link to one work. `referenced_works` stops at 5,000 works; the reference list has no limit.

About 165 million works have a printed reference list (November 2026), and 8.5 million more list only citations with no printed line: 4.8 billion lines in all, 3.5 billion of them linked to a work. A work with no reference list answers an empty list.

## Attributes

### `references`
*List.* The work's reference lines, in the order above. Each line has three attributes:

### `raw_reference_string`
*String.* The reference as we read it: the line as printed in the PDF or as the source gave it. Some sources give a reference only as separate fields (authors, year, title) and no text; when such a line also has no DOI, this shows those fields joined, such as `Anderson. 2017. When the wolf finally arrives…`. Null when the source gave no text but a DOI, and on citations with no printed line.

### `raw_doi`
*String.* The DOI the source gave for this line, in `https://doi.org/…` form, as given (it may differ from the DOI of the work we linked). Crossref and DataCite lists often give one; DOIs printed in a PDF's text stay in `raw_reference_string`. Null when the source gave none.

### `work_id`
*String.* The OpenAlex ID of the work this line links to, or null when we matched it to no work.

## In the API

```
# A work's reference list
https://api.openalex.org/works/W2741809807/references
```

- Use the work's OpenAlex ID (`W…`). Other ID forms (DOI, PMID) don't work here yet: look the work up first, e.g. [`/works/doi:10.7717/peerj.4375`](https://api.openalex.org/works/doi:10.7717/peerj.4375), and use its `id`.
- An ID merged into another work redirects to that work's list. An unknown ID answers `404`.
- The response is the whole list: no paging, `select` or filters. Reference lists aren't in `/works` responses, and their text isn't searchable.
- Lists are updated once a day, in the afternoon (UTC) after each night's update.
- Reference lists aren't in the [snapshot](/access/snapshot/) yet.
