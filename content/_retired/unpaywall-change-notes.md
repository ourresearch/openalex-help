<!--
RETIRED 2026-08-05 (Jason, oxjob #354): this change log is ~5 years out of
date, so we no longer share it publicly. Preserved here (outside the content
collections, so it does not build) in case we ever want to revive or mine it.
/docs/unpaywall-change-notes/ redirects to /docs/unpaywall/.
-->
---
title: "Unpaywall Change Notes"
description: "This page will summarize important changes to our methodology and data sources that we expect to significantly affect the Unpaywall dataset."
tags: ["unpaywall"]
source_id: "41193798060439"
source_url: "https://help.openalex.org/hc/en-us/articles/41193798060439-Unpaywall-Change-Notes"
source_updated: "2026-06-13"
---
This page will summarize important changes to our methodology and data sources that we expect to significantly affect the Unpaywall dataset. 

  

**2021-06-30:** Reclassified 400,000 Closed and Green Elsevier DOIs as Bronze OA. Details in [this mailing list announcement](https://groups.google.com/g/unpaywall/c/7ZqoWpk3-Lk).

  

**2021-02-02:** Removed duplicate oa\_locations in cases where the same publisher page was determined to have an OA copy in two different ways. Previously two oa\_locations representing the same page could be created with different licenses and oa\_dates.

  

**2021-01-19:** Updated our list of "detected OA" journals, as described in [Journal quality & OA status](/docs/journal-quality/), for 2021. Added about 200,000 Gold articles from 9,000 journals.

  

**2021-01-13:** Began counting journals using "publisher's own license" in DOAJ as Gold OA. See [https://doaj.org/toc/1930-2126](https://doaj.org/toc/1930-2126), for example. Added about 100,000 Gold articles.

  

**2021-01-07:** Added [oa\_locations\_embargoed](https://unpaywall.org/data-format#oa_locations_embargoed) to DOI records.

  

**2020-12-31**: Changed the version property of preprint locations from "publishedVersion" to "submittedVerson". This affects the preprints we reclassified as Green OA on 2020-05-01. We previously called these published because the preprint is often the final version, but this conflicts with the common expectation that accepted and published versions are peer-reviewed.

  

**2020-12-14:** New journals added to DOAJ are assumed to be Open Access starting on the date they were added, rather than a start date defined by DOAJ: [https://blog.doaj.org/2020/12/14/important-changes-to-our-journal-csv-and-how-we-license-metadata/](https://blog.doaj.org/2020/12/14/important-changes-to-our-journal-csv-and-how-we-license-metadata/). Journals that already have OA dates from DOAJ will keep those dates. 

  

**2020-10-09**: Changed the definition of “OA license” as it relates to the distinction between Hybrid and Bronze articles. See [What does oa\_date mean and how is it determined?](https://support.unpaywall.org/a/solutions/articles/44002063719) for details.

  

**2020-10-05****:** Added oa\_date property to oa\_locations, and first\_oa\_location to DOI records. See [What is an OA license?](https://support.unpaywall.org/a/solutions/articles/44002063718) for details.

  

**2020-09-14 - improved detection of Wiley Bronze OA**

  

We improved our Bronze OA validation process for Wiley, which will convert about 1 million Closed or Green articles to Bronze OA over the next few weeks.

  

**2020-05-01 - reclassified items on preprint servers as Green OA**

  

We've reclassified articles hosted on preprint servers to reflect their differences from traditional publishing platforms. Examples of this type of platform are [bioRxiv](https://www.biorxiv.org/), [MDPI Preprints](https://www.preprints.org/), and [ChemRxiv](https://chemrxiv.org/).

  

As described in [What do the types of oa\_status mean?](https://support.unpaywall.org/a/solutions/articles/44001777288), an article is Green OA if the host\_type of its best location is "repository". Until now, the URL resolved by an article's persistent DOI URL was always considered to have host\_type "publisher", and thus to be either Bronze, Hybrid, or Gold. Now, these locations are considered repositories and the articles are Green. At the time of this writing 170,000 articles are affected by this change.

  

**2020-02-25 - began retroactively applying Crossref metadata updates:**

  

We improved our Crossref data collection so that the latest article metadata is always reflected in Unpaywall, and we're retroactively applying Crossref updates from the last six months. This will affect the data feed for about 15 million articles and will produce larger-than-usual files between 2020-03-05 and 2020-03-19. We expect these files to contain about 8 million lines. The majority of these changes are revisions to _published\_date_, _publisher_, and _genre_ and do not affect _open\_locations_ or _oa\_status_.

  

**2019-12-08 - added articles from Semantic Scholar:**

  

We're adding about 8 million PDFs hosted by [Semantic Scholar.](https://www.semanticscholar.org/) We already have OA locations for many of these articles, but we expect this to create 3 million new Green OA articles by the end of 2019.

  

  

**2019-11-14 - improved PDF validation:**

  

Our automated PDF validation processes are now much more robust, allowing us to add about 1.5 million new OA articles. Half of these are in [newly-identified Gold OA journals](https://support.unpaywall.org/a/solutions/articles/44001792752) that we were previously unable to spot because these articles looked unavailable to us.
