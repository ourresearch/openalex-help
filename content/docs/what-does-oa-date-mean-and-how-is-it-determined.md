---
title: "What does oa_date mean and how is it determined?"
description: "In each oa\\location, the purpose of oa\\date is to tell you when the full text of this version of the article was first available at this location. Here’s an example of an articl…"
tags: ["unpaywall"]
source_id: "41193804710935"
source_url: "https://help.openalex.org/hc/en-us/articles/41193804710935-What-does-oa-date-mean-and-how-is-it-determined"
source_updated: "2026-06-13"
---
In each oa\_location, the purpose of oa\_date is to tell you when the full text of this version of the article was first available at this location. Here’s an example of an article published in an OA journal:

  

 [10.5713/ajas.18.0801](https://doi.org/10.1093/nar/gkv035) (published 2015-01-27) has these oa\_locations, among others:

  

    {

      "url": "[https://doi.org/10.1093/nar/gkv035",](https://doi.org/10.1093/nar/gkv035%22,%C2%A0) 

      "endpoint\_id": null, 

      "is\_best": false, 

      "version": "publishedVersion", 

      "evidence": "oa journal (via doaj)", 

      "updated": "2020-10-02T18:30:06.322302", 

      "oa\_date": "2015-01-27", 

      "url\_for\_pdf": null, 

      "license": "cc-by-nc", 

      "pmh\_id": null, 

      "host\_type": "publisher", 

      "url\_for\_landing\_page": "[https://doi.org/10.1093/nar/gkv035",](https://doi.org/10.1093/nar/gkv035%22,%C2%A0) 

      "repository\_institution": null

    }, 

    {

      "url": "[http://europepmc.org/articles/pmc4402511?pdf=render",](http://europepmc.org/articles/pmc4402511?pdf=render%22,%C2%A0) 

      "endpoint\_id": "b5e840539009389b1a6", 

      "is\_best": false, 

      "version": "publishedVersion", 

      "evidence": "oa repository (via OAI-PMH doi match)", 

      "updated": null, 

      "oa\_date": "2015-05-01", 

      "url\_for\_pdf": "[http://europepmc.org/articles/pmc4402511?pdf=render",](http://europepmc.org/articles/pmc4402511?pdf=render%22,%C2%A0) 

      "license": "implied-oa", 

      "pmh\_id": "oai:europepmc.org:Zi9o7sxgPaDf63F2WTWh", 

      "host\_type": "repository", 

      "url\_for\_landing\_page": "[http://europepmc.org/articles/pmc4402511",](http://europepmc.org/articles/pmc4402511%22,%C2%A0) 

      "repository\_institution": "PubMed Central - Europe PMC"

     } 

  

Since this article was published in an OA journal, it was available from the publisher immediately. Then a few months later, full text was also posted to Europe PMC.

  

If we’re not confident in our estimation of the the date we’ll say it’s null. How the oa\_date is calculated depends on the type of oa\_location, its [oa\_status](https://support.unpaywall.org/a/solutions/articles/44001777288), and in some cases metadata we have for individual repositories.

  

-   Publisher-hosted articles:
    
    -   Gold: This one is easy - the article is free at the time of publication. oa\_date = published\_date.  
          
        
    -   Hybrid: Also easy, but not as obvious. By “Hybrid” we mean the article has been published with an OA license in an otherwise toll-access journal.
        
        -   If the published version of the article is available immediately, oa\_date = published\_date.
            
        -   If a submitted or accepted manuscript is available under a license separate from that of the published version, **oa\_date = manuscript license effective date.**  
              
            
    -   Bronze:  Although we may support oa\_date for bronze in the future, currently the oa\_date for bronze articles is always null. This is for a few reasons:
        
        -   Bronze OA can come and go - if we record the first date we find the article there is no guarantee it was continuously available from that date until now.
            
        -   We’re more likely to discover Bronze OA after a significant delay than other types, so we’re less confident in the date.
            
        -   Bronze is rarely relevant to OA mandates.
            

  

-   Repositories:
    
    -   Determining an oa\_date for repository locations is challenging. In brief, we create repository locations by:
        
        -   Querying an Institutional Repository for [OAI-PMH records](https://www.openarchives.org/pmh/),
            
        -   using URLs in those records to locate full-text copies of articles, and
            
        -   matching the articles we find to published articles by DOI or by title and author.
            

  
Each OAI-PMH record has a timestamp that tells when it was last modified. We can use this to determine when the full text article was first posted, but there are two problems:

-   The record can be created well before full text is posted, so it could be earlier than the actual OA date.
    
-   The record can continue to be modified, updating its timestamp, long after full text is posted, so it could be later than the actual OA date.
    

  

So we can’t just take the record timestamp at face value. We have to record the timestamp when we first find the full text article, then preserve that as the first availability date.

  

We started recording these timestamps on 2020-08-07, so we only have reliable information for articles first posted on or after that date.  
  

-   Articles posted 2020-08-07 or later: When we discover an article in a repository, we record the date portion of the OAI-PMH record timestamp. This date is frozen - it doesn’t change even if the record timestamp does. Internally, we call this date PmhVersionFirstAvailable. oa\_date = PmhVersionFirstAvailable.  
      
    
-   Articles posted before 2020-08-07: Because these timestamps could have been updated after the article was posted, there is too much uncertainty to use them. oa\_date = null.
