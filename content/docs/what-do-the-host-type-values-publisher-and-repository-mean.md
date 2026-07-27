---
title: "What do the host_type values \"publisher\" and \"repository\" mean?"
description: "In general, publisher means this location is provided by the article's original publisher, through the canonical doi.org URL, as a Published or Accepted version. For example, th…"
tags: ["unpaywall"]
source_id: "41193790368279"
source_url: "https://help.openalex.org/hc/en-us/articles/41193790368279-What-do-the-host-type-values-publisher-and-repository-mean"
source_updated: "2026-06-13"
---
In general, **publisher** means this location is provided by the article's original publisher, through the canonical doi.org URL, as a Published or Accepted version. For example, the full text of [https://doi.org/10.3390/polym10111254](https://doi.org/10.3390/polym10111254) is available from MDPI and the corresponding OA location looks like this:

  

  {

    **"host\_type": "publisher",** 

    "pmh\_id": null, 

    "updated": "2019-11-12T05:55:06.811259", 

    "version": "publishedVersion", 

    "url\_for\_landing\_page": "[https://doi.org/10.3390/polym10111254",](https://doi.org/10.3390/polym10111254%22,%C2%A0) 

    "license": "cc-by", 

    "url": "[https://www.mdpi.com/2073-4360/10/11/1254/pdf",](https://www.mdpi.com/2073-4360/10/11/1254/pdf%22,%C2%A0) 

    "endpoint\_id": null, 

    "repository\_institution": null, 

    "evidence": "open (via page says license)", 

    "oa\_date": "2018-11-12", 

    "is\_best": true, 

    "url\_for\_pdf": "[https://www.mdpi.com/2073-4360/10/11/1254/pdf](https://www.mdpi.com/2073-4360/10/11/1254/pdf)"

  }

  

The notable exception is **preprint repositories**, which we call **repository** even though the preprint may be the final version of the document represented by the DOI. For example, [https://doi.org/10.21203/rs.2.23921/v1](https://doi.org/10.21203/rs.2.23921/v1) is available from Research Square, but its OA location looks like this:

  

  {

    "url\_for\_pdf": "[https://www.researchsquare.com/article/rs-14482/v1.pdf",](https://www.researchsquare.com/article/rs-14482/v1.pdf%22,%C2%A0) 

    "oa\_date": "2020-02-19", 

    "evidence": "oa repository (via page says license)", 

    "is\_best": true, 

    **"host\_type": "repository",** 

    "url\_for\_landing\_page": "[https://doi.org/10.21203/rs.2.23921/v1",](https://doi.org/10.21203/rs.2.23921/v1%22,%C2%A0) 

    "pmh\_id": null, 

    "license": "cc-by", 

    "url": "[https://www.researchsquare.com/article/rs-14482/v1.pdf",](https://www.researchsquare.com/article/rs-14482/v1.pdf%22,%C2%A0) 

    "version": "submittedVersion", 

    "repository\_institution": null, 

    "updated": "2020-08-27T18:26:50.464062", 

    "endpoint\_id": null

  }

  

The more common case where host\_type is **repository** is in **institutional repositories**, often managed by an institution one of the authors is affiliated with. [https://doi.org/10.1039/c3cp54043j](https://doi.org/10.1039/c3cp54043j) isn't available from the RSC, but it is in [Refubium](https://refubium.fu-berlin.de/). This location looks like this:

  

  {

    "endpoint\_id": "tfns8wvw5hkwxjnh5ysu", 

    **"host\_type": "repository",** 

    "repository\_institution": "Universit\\u00e4tsbibliothek der Freien Universit\\u00e4t Berlin - Refubium", 

    "url": "[https://refubium.fu-berlin.de/bitstream/fub188/15972/1/c3cp54043j.pdf",](https://refubium.fu-berlin.de/bitstream/fub188/15972/1/c3cp54043j.pdf%22,%C2%A0) 

    "is\_best": true, 

    "url\_for\_landing\_page": "[https://refubium.fu-berlin.de/handle/fub188/15972",](https://refubium.fu-berlin.de/handle/fub188/15972%22,%C2%A0) 

    "pmh\_id": "oai:refubium.fu-berlin.de:fub188/15972", 

    "license": null, 

    "updated": "2020-11-02T03:49:56.084478", 

    "evidence": "oa repository (via OAI-PMH doi match)", 

    "version": "submittedVersion", 

    "oa\_date": null, 

    "url\_for\_pdf": "[https://refubium.fu-berlin.de/bitstream/fub188/15972/1/c3cp54043j.pdf](https://refubium.fu-berlin.de/bitstream/fub188/15972/1/c3cp54043j.pdf)"

  }
