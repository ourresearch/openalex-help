---
title: "Analyzing your institution"
description: "Count an institution's outputs on the OpenAlex website and break them down by type, subject, SDG, open access, citations, collaborators, and journals — plus APC spend and open-access trends."
tags: ["analytics"]
synonyms: ["institution outputs", "count publications", "outputs by type", "outputs by subfield", "SDG", "open access percentage", "APC fees", "citations", "collaborators", "journals published in"]
card: "One search plus the Stats panel: outputs by subject, SDG, and OA — even your APC spend."
---
Most of these questions are answered the same way, on [openalex.org](https://openalex.org): **search for your institution in the search bar and select it.** That creates a filter scoping the results to its works. Then open the **Stats** panel above the results — each panel below is one of the facets you can add there with the **"+"** button next to *Stats*.

## How many outputs does my institution have?

After you've filtered to your institution, the total under **Stats** is the count of all outputs affiliated with it.

## How many of each type of output does it have?

In the **Stats** panel, add the **type** facet (click **"+"** → *type*). It breaks the outputs down by work type — articles, books, datasets, and more. Click **More…** for the full list.

## How can I break outputs down by subject area?

Add the **subfield** facet under **Stats** (**"+"** → *subfield*) to chart the institution's publications across research subfields. Click **More…** for the full list.

## Which outputs contribute to UN Sustainable Development Goals?

Add the **Sustainable Development Goal** facet under **Stats** (**"+"** → *Sustainable Development Goal*) to see outputs counted by [SDG](/data/aboutness/sdgs/). Select any goal to see the works contributing to it.

## What percentage of its outputs are open access?

Add the **open access** facet under **Stats** (**"+"** → *open access*) to see the share of outputs that are open access. For the full picture of how OpenAlex tracks OA, see [Open access](/data/works/open-access/).

## How has open access changed over time?

Across all of OpenAlex, open access has grown from roughly **31% of indexed works in 2015 to about 68% in 2025** — OA works first outnumbered closed ones around 2021.

To get a year-by-year breakdown for any result set, group works by year, once for all works and once for OA works, and compare:

```text
https://api.openalex.org/works?filter=publication_year:2015-2025&group_by=publication_year
https://api.openalex.org/works?filter=publication_year:2015-2025,open_access.is_oa:true&group_by=publication_year
```

Add an institution filter (or any other filters) to scope the trend to your works.

## How much has it spent on APC fees?

An exact figure isn't possible, but you can estimate it. After filtering to your institution:

1. Use the **corresponding institution** filter (so only works your institution paid for are counted).
2. Restrict to **article** and **review** types — the work types where APCs apply.
3. Restrict the source type to **journal**.
4. Add the **APC Sum** facet under **Stats** (or `group_by=apc_sum` in an API call).

The estimate rests on several assumptions — [discussed in detail here](/data/sources/#about) — and APC behavior varies by discipline and institution type, so global patterns won't hold identically for every institution.

## How much is its work cited?

After filtering to your institution, add the **citations sum** facet under **Stats** to see the total citations its works have received. Divide by the total number of works for the average per work.

To count only works with **at least one** citation, add the **citation count** filter (**Add filter** → *citation count*) and enter `>0`; the results count then reflects works cited at least once.

## Which institutions does it collaborate with?

Add the **institution** facet under **Stats** (**"+"** → *institution*). Your institution sits at the top of the list; collaborating institutions follow, ranked by shared outputs. Click **More…** for the full list.

## Which journals do its researchers publish in?

Filter to journal articles first: **Add filter** → *source type* → *journal*. Then add the **source** facet under **Stats** (**"+"** → *source*) to rank the journals the institution's researchers publish in most. Click **More…** for the full list.
