---
title: "Open Access (OA)"
description: "There are many ways to define OA(https://peerj.com/articles/4375/literature-review). OpenAlex uses a broad definition: having a URL where you can read the fulltext of this work…"
tags: ["data"]
source_id: "24347035046295"
source_url: "https://help.openalex.org/hc/en-us/articles/24347035046295-Open-Access-OA"
source_updated: "2024-07-30"
---
There are [many ways to define OA](https://peerj.com/articles/4375/#literature-review). OpenAlex uses a broad definition: having a URL where you can read the fulltext of this work without needing to pay money or log in. For each work, OpenAlex decides whether the work meets this definition using several techniques, such as looking for it in the Directory of Open Access Journals, or trying to find a publicly available PDF on the internet. If a work is Open Access, OpenAlex is able to provide you with a link to the full text of the work.

In addition to whether or not a work is Open Access, OpenAlex can tell you about the Open Access status of works, which corresponds to the following labels:

-   [**diamond**](https://en.wikipedia.org/wiki/Diamond_open_access): Published in a fully OA journal—one that is indexed by the [DOAJ](https://doaj.org/) or that we have determined to be OA—with no article processing charges (i.e., free for both readers and authors).
-   **gold**: Published in a fully OA journal.
-   **green**: Toll-access on the publisher landing page, but there is a free copy in an [OA repository](https://en.wikipedia.org/wiki/Open-access_repository).
-   **hybrid**: Free under an [open license](https://support.unpaywall.org/support/solutions/articles/44002063718-what-is-an-oa-license-) in a toll-access journal.
-   **bronze**: Free to read on the publisher landing page, but without any identifiable license.
-   **closed**: All other articles.

You can learn more about Open Access in OpenAlex in the [technical documentation](https://docs.openalex.org/api-entities/works/work-object#the-openaccess-object).

# Article Processing Charges (APC)

The Article Processing Charge (APC) is a fee which is sometimes chaged to authors in order to make a work available as open access. This fee can be charged for gold or hybrid OA works. OpenAlex provides estimates for APCs at the journal level and the work level. However, these are rough estimates, because the APC market is not transparent. At the work level, the APC is sometimes reported publicly via [OpenAPC](https://www.openapc.net/). We have OpenAPC data for about 200k works (~1% of gold or hybrid journal articles). When the OpenAPC price is not available, we fall back to the journal's list price, which can come either from [DOAJ](https://doaj.org/) or from the journal website; this is the case for about 9 million works (~50% of gold or hybrid journal articles).

### Estimating APC paid

Since the actual APC amount is often unknown, any count of APC spend using OpenAlex will be an estimate. You can find an example of how to estimate the spend for an institution in the article: [Estimate the APC fees my institution has paid to make research Open Access](https://help.openalex.org/hc/en-us/articles/24942051299095). These methods are based on certain assumptions that could bias the results:

-   **Assumption: corresponding author is the author that is most likely to be associated with the APC** 
    -   This is not always true and may be an over-estimate, but is the best option available as a default since corresponding institution is used in Transformative Agreements with publishers
    -   Sometimes there are multiple corresponding authors and when that occurs, each institution is being assigned that APC paid– this over-estimates the amount each institution paid for that APC. About 9M journal articles have more than one corresponding institution (~6% of journal articles, or 23% of articles for which we have any corresponding institution information).
-   **Assumption: OpenAlex has corresponding institution metadata for all works**
    -   OpenAlex is missing that metadata for 10M works (60% of journal articles), and so this under-estimates total APC spend.
-   **Assumption: only documents that are types article or reviews are likely to incur APC fees (i.e, editorials, paratext, etc are not APC-able)**
    -   This would underestimate APC spends if other document types are charged APC fees.
-   **Assumption: other sources of articles (e.g., Conference Proceedings) do not charge APC costs**
    -   This would underestimate APC spends if non-journal sources charge APC fees for publishing articles or reviews.
-   **Assumption: OpenAlex APC (paid) field accurately represents the amount spent on APC fees for each work**
    -   As described above, the actual paid APC value is often unavailable, and we fall back to the list price reported by the journal. As list prices continue to climb each year, this may overestimate the true paid value in previous years by the percent increase in APC of that journal.

To learn more about the nuances of APC analyses, check out these works:

Asai, S. Which database with article processing charges should be used?. Scientometrics 128, 6293–6298 (2023). [https://doi.org/10.1007/s11192-023-04841-z](https://doi.org/10.1007/s11192-023-04841-z)

Butler, L. et al. (2024). An open dataset of article processing charges from six large scholarly publishers (2019-2023). ArXiv. [https://doi.org/10.48550/arXiv.2406.08356](https://doi.org/10.48550/arXiv.2406.08356)
