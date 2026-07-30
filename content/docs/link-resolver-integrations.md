---
title: "Link Resolver Integrations"
description: "Unpaywall is used as a data source in several third-party link resolvers, for example SFX(https://knowledge.exlibrisgroup.com/SFX/KnowledgeArticles/HowtoEnabletheUnpaywall\\(form…"
tags: ["unpaywall"]
source_id: "41193820448023"
source_url: "https://help.openalex.org/hc/en-us/articles/41193820448023-Link-Resolver-Integrations"
source_updated: "2026-06-13"
---
Unpaywall is used as a data source in several third-party link resolvers, for example [SFX](https://knowledge.exlibrisgroup.com/SFX/Knowledge_Articles/How_to_Enable_the_Unpaywall_\(formerly_oaDOI\)_Service_on_SFX), [EBSCO Discovery Service](https://cloud.ebsco.com/apps/unpaywall), and [360 Link](https://knowledge.exlibrisgroup.com/360_Services/360_Link/0Product_Documentation/Overview/360_Link_with_IEDL%3A_Open_Access_Lookup_Service_Integration). If you have a problem with one of these integrations, it’s important to understand a little about how they work so you can go to the right place for help.

  

## How it works:

  

Unpaywall link resolver integrations allow users who click on a link resolver link to get an open access copy of that resource, if one exists and your library doesn’t have a subscription. (Unpaywall is OpenAlex's legacy-format API surface — the same underlying data.) These integrations offer a seamless way to bring over 100 million OA papers directly to your users:

**OA copies → Unpaywall data → Link resolver software → your users**

  

Link resolvers get Unpaywall data by using one of two services:

  

-   A redirect service that takes a DOI and sends you to the best open access location Unpaywall has, or to the publisher page if we don’t have one. For example:
    
    -   [https://unpaywall.org/10.1007/s10657-009-9104-z](https://unpaywall.org/10.1007/s10657-009-9104-z) redirects to [this open access location](https://escholarship.org/content/qt1px9k0gz/qt1px9k0gz.pdf?t=krnm5v).
        
    -   [https://unpaywall.org/10.1016/j.jevs.2017.12.011](https://unpaywall.org/10.1016/j.jevs.2017.12.011) redirects to the [publisher page](https://doi.org/10.1016/j.jevs.2017.12.011).
        

  

-   Our [REST API](http://unpaywall.org/products/api), which does pretty much the same thing as the redirect service--but instead of redirecting you to the best open location, it tells you about the best open location, including its URL, its host, and other metadata. For example: [https://api.unpaywall.org/v2/10.1038/nature12373?email=YOUR\_EMAIL](https://api.unpaywall.org/v2/10.1038/nature12373?email=unpaywall_01@example.com).
    

  

Both of these are free services we provide to help link resolvers (and others) find and use open access locations. 

  

## Where we can help, and where we can’t:

  

EBSCO, ExLibris, and others have integrated these free services into their link resolver tools. Since they maintain the link resolvers, when there is a bug with their integration, often they are the only ones who can help.  However, we’re able to help if the problem is with the link between a DOI and an OA location in our database:

  

  

OA copies → Unpaywall data → Link resolver software → your users

\----------------------------------------------------------------

     we can help here       |     we can’t help here

  

## I found a bug. What do I do?

  

Let’s say you’ve found a link from Unpaywall that leads to an incomplete, toll access, or otherwise incorrect article in your link resolver. 

  

-   If the link looks like [https://unpaywall.org/DOI](https://unpaywall.org/DOI) or [https://oadoi.org/DOI](https://oadoi.org/DOI), the integration is using the redirect service. These links are usually displayed for every item with a DOI, regardless of OA status.
    
    -   If it leads to a toll-access publisher page, everything is working correctly, but we don’t have an open access location.
        
    -   If it leads to the wrong article or to an incomplete copy somewhere other than the publisher’s site, let us know at [support@unpaywall.org](mailto:support@unpaywall.org) and we’ll fix it.
        
-   If it’s a direct link, i.e., not using the redirect service, the integration is using the API and usually provides links for OA articles only. If it leads to anything other than a full, free copy of the correct article, the problem is likely on our end. Please let us know about it.
    

  

For most other issues, contact your link resolver vendor. This includes trouble installing the integration, formatting problems - pretty much everything besides the two scenarios above. We’re always happy to help your link resolver vendor, if they need help from us. If it looks like an Unpaywall problem, please contact us with the DOI of the problem article and, if it’s publicly available, the item’s link resolver page.
