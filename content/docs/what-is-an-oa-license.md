---
title: "What is an OA license?"
description: "There are many definitions of what constitutes an OA license, including the BOAI(https://www.budapestopenaccessinitiative.org/read), OSI(http://osiglobal.org/2018/11/15/osi-brie…"
tags: ["unpaywall"]
source_id: "41193820509079"
source_url: "https://help.openalex.org/hc/en-us/articles/41193820509079-What-is-an-OA-license"
source_updated: "2026-06-13"
---
There are many definitions of what constitutes an OA license, including the [BOAI](https://www.budapestopenaccessinitiative.org/read), [OSI](http://osiglobal.org/2018/11/15/osi-brief-what-do-we-mean-by-open/) and [SPARC](https://sparcopen.org/open-access/) (for a more comprehensive list, see [this literature review](https://peerj.com/articles/4375/#literature-review)). At Unpaywall, our job is not to decide which of these definitions is “truly” open, but rather to collect all the data that users need to make their own decisions.

  

However, many users have requested that we apply our own definition as a convenience to them, and so we have done so: assigning “OA colors” (Gold, Hybrid, Bronze, or Green) to Open Access papers. You can learn more about those definitions here: [What do the types of oa\_status (green, gold, hybrid, and bronze) mean?](https://support.unpaywall.org/a/solutions/articles/44001777288)

  

As part of distinguishing between Hybrid and Bronze OA, we need a definition of what an “open license” is. Again, we’d like to emphasize that the purpose of Unpaywall is not to decide what is sufficiently open in any global sense, as this depends on the context (for example, many funders require a CC-BY license to fulfill OA mandates, a practice we support).

  

Rather, we have adopted definitions that (we hope) maximize value for downstream users. In this context, we tend to err in the direction of greatest inclusiveness - in other words, our cutoff for “is this license open” is very low. We include even relatively restrictive licenses (e.g. [CC-BY-NC-ND](https://creativecommons.org/licenses/by-nc-nd/2.0/)), and leave it to downstream users to filter these out if they want to.

  

Again: like any OA taxonomy, this is open to interpretation and the right classification depends on your use case. If you’d like to categorize articles differently, you can easily do that by using the additional data included for each article, including oa\_date, host\_type, license, version, and so on. You can find more documentation for these properties here: [http://unpaywall.org/data-format#oa-location-object](http://unpaywall.org/data-format#oa-location-object).

  

Licenses that we call OA Licenses include:

-   Any [Creative Commons](https://creativecommons.org/licenses/) license.
    
-   Public Domain / [CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)
    
-   [ACS Editors' Choice](https://pubs.acs.org/page/policy/authorchoice_termsofuse.html)
    
-   [APS License for Accepted Manuscripts](http://link.aps.org/licenses/aps-default-accepted-manuscript-license#accepted)
    
-   [Open Access for APA Journals Authors](http://www.apa.org/pubs/journals/resources/open-access.aspx)  
    
-   Many other less-common licenses, as long as they grant users sufficient rights to freely use and redistribute content.
    

  

Licenses we recognize but don’t count as OA License include:

-   [Elsevier User licences](https://www.elsevier.com/about/policies/open-access-licenses/elsevier-user-license) (does not allow any redistribution of content)
    

  

Expect these lists to grow and change.

  

The pseudo-license “implied-oa” is used for articles that are labeled as Open Access on the publisher page, and are published under a traditional Hybrid OA model such as the use of APCs. For example, this article and its journal’s OA policy:

  

Article: [https://www.sciencedirect.com/science/article/pii/S0264410X19314689](https://www.sciencedirect.com/science/article/pii/S0264410X19314689?via%3Dihub)

Journal policy: [Open access options - Vaccine - ISSN 0264-410X](https://www.elsevier.com/journals/vaccine/0264-410X/open-access-options)  

  

If we find an OA license for a OA location, [it appears in the](http://unpaywall.org/data-format#oa-location-license) [license](http://unpaywall.org/data-format#oa-location-license) [field](http://unpaywall.org/data-format#oa-location-license). If it's not an OA license (or if we can't find a license for it at all), license is null.
