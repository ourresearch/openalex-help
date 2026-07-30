---
title: "Field-Weighted Citation Impact (FWCI)"
description: "FWCI measures a work's citation impact normalized for its subfield, work type, and publication year — 1.0 is world average. How OpenAlex calculates it and how it compares to other databases' FWCI."
tags: ["reference"]
source_id: "24735753007895"
source_url: "https://help.openalex.org/hc/en-us/articles/24735753007895-Field-Weighted-Citation-Impact-FWCI"
source_updated: "2026-03-06"
---
Field-Weighted Citation Impact (FWCI) is a [snowball metric](https://arma.ac.uk/wp-content/uploads/2021/08/Snowball-Metrics-Recipe-Book-edition-2.pdf) that takes into account differences in publication type, field (specifically [subfield](/docs/topics/)), and year of publication to help understand the citation impact of a particular publication. The formula is straightforward:

```
FWCI = citations received / citations expected
```

Here's how to read FWCI values:

- **1.0** means the work received exactly the world average number of citations
- **2.0** means twice the expected citations
- **0.5** means half the expected citations

So if a 2020 journal article in Endocrinology typically gets 10 citations in its first four years, and your article got 20, your FWCI would be 2.0.

## How FWCI is calculated

To calculate the **citations received** (numerator) for a work, we sum the number of papers that cite that paper in the same year it was published and three years following.

To calculate the **citations expected** (denominator) for a work, we average the citations received in publication year and following three years for every publication with the same publication year, publication type, and publication subfield. Note: for work type = "article", we separate out journals vs. conference proceedings.

[Code used for calculating FWCI for OpenAlex works](https://github.com/ourresearch/openalex-databricks/tree/main/jobs/weekly_metric_creation)

## Is FWCI the same in other bibliometric databases?

Like other products, we calculate FWCI using the [snowball metric recipe book](https://arma.ac.uk/wp-content/uploads/2021/08/Snowball-Metrics-Recipe-Book-edition-2.pdf). Therefore, the calculations are exactly the same. However, some differences in the underlying data are worth considering when comparing to other datasets:

1. Our database is more comprehensive than others and includes many works without citations — this drives down the average expected citation values so that works that do get cited are likely to have higher FWCI values in OpenAlex.
2. We classify each work into a single primary subfield based on the text of the work, not the main fields of the journal it is published in (see [Topics](/docs/topics/)) — when works in a particular subfield are published in a journal with different primary subfields, this likely leads to differences in FWCI for that work in databases that use work-level vs. journal-level subfield classifiers.
3. Our year of publication is typically the date a publication is first online, but this differs from using the periodical date which can be in the year after a publication is online.

## Why don't all works have a FWCI value?

Not all work types are expected to receive many citations (e.g., paratext), and when works in those types do receive citations, their FWCI can be outliers with extremely high values. Because a common use case is to find the average FWCI for an institution, these work types can have disproportionate effects. For now, we have chosen to omit those work types so that they are not included in averages and are also not zero (which would drive down averages). As of mid-2026, about 218M of OpenAlex's 322M works (68%) carry an FWCI value. We may re-evaluate the omitted types in the future, particularly as dataset sharing and citing gains more momentum globally.

## Related API fields

You can access FWCI data on the Work object through two fields:

- `fwci` — the raw FWCI value
- `citation_normalized_percentile` — the same information expressed as a percentile, which also includes `is_in_top_1_percent` and `is_in_top_10_percent` flags

For full details on these fields, see the [Works API reference](/api/works/).
