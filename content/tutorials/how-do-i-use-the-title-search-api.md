---
title: "Title Search API"
subtitle: "Look up a work by its title through the Unpaywall-compatible title search endpoint."
description: "The Unpaywall title search endpoint gives you the full DOI API(https://unpaywall.org/products/apiget-doi) response for articles with titles matching your query. 50 results are r…"
tags: ["recipes", "unpaywall"]
source_id: "41193820492951"
source_url: "https://help.openalex.org/hc/en-us/articles/41193820492951-How-do-I-use-the-title-search-API"
source_updated: "2026-06-13"
---
> **Note:**
> This recipe covers **Unpaywall's** title-search endpoint (`api.unpaywall.org/v2/search`), part of the [Unpaywall legacy-format surface](/access/unpaywall/). For OpenAlex-native search — which covers titles, abstracts, and full text with more filters — see [Searching](/api/searching/).

## Unpaywall Title Search Endpoint

  

The Unpaywall title search endpoint gives you the full [DOI API](https://unpaywall.org/products/api#get-doi) response for articles with titles matching your query. 50 results are returned at a time. The _page_ argument can be used to get results after the first 50. The main use cases are:

  

-   Collecting metadata (titles, years, DOIs, fulltext availability status, etc.) for articles on a certain topic.
    
-   Using the is\_oa filter to find fulltext articles about topics you’re interested in.
    

  

An example query and its response looks like this:

  

[https://api.unpaywall.org/v2/search/?query=hungry%20hippos&is\_oa=true&email=YOUR\_EMAIL](https://api.unpaywall.org/v2/search/?query=hungry%20hippos&is_oa=true&email=unpaywall_01@example.com)

  

{

  "results": \[

    {

      "response": a [DOI object](https://unpaywall.org/data-format) as returned by [/v2/:doi](https://unpaywall.org/products/api#get-doi)

      "score": 0.055811062,

      "snippet": "<b>Hippo</b>: <b>Hungry</b>, <b>Hungry</b> for Melanoma Invasion"

    },

   … more results

  \]

  "elapsed\_seconds": 0.047,

}

  

This endpoint is in its early stages, and is pretty basic for now. We may add other features based on demand, like different sorting, more results, and more filters. If there’s a feature you want to see, get in touch with us and lay out your use case.

  

A simple frontend for the search API is here: [](http://unpaywall.org/articles)[http://unpaywall.org/articles](http://unpaywall.org/articles) 

  

## Usage Notes and Limitations

  

-   It only searches article _titles_. Not authors, affiliations, journal names, abstracts, or anything else. You can search for repositories and journal titles (eg. “BioRxiv” or “New England Journal of Medicine”)  at [https://unpaywall.org/sources](https://unpaywall.org/sources). If you already have a list of DOIs, the Simple Query Tool is for you: [https://unpaywall.org/products/simple-query-tool](https://unpaywall.org/products/simple-query-tool).  
      
    
-   All 120M+ articles in our database are searched - not just OA ones. We are searching every title that has a Crossref DOI, including just-published ones (with a lag of up to 24 hours). Use the is\_oa parameter to limit results to OA articles if desired.
    
-   Results are ranked by relevance using a form of [cover density ranking](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.12.1615&rep=rep1&type=pdf). No other ranking is supported for now. In order of decreasing importance, relevance is determined by:
    
    -   How many words in the query are in the title. 
        
        -   For the query tree frogs, _All About Tree Frogs_ is a better match than _All About Frogs_
            
    -   How close together the matched terms are:
        
        -   For the query peanut butter, _I Love Peanut Butter_ is a better match than _Peanuts Are Great And So Is Butter_
            
    -   How long the title is:
        
        -   The more of the title your search terms make up, the better. For the query turtles, _I Like Turtles_ is a better match than _These Are_ _A Few Of My Favorite Turtles_.
            

  

  

-   Search terms are separated by whitespace and are AND-ed together by default. The title must contain all search terms to be matched. This can be modified by:
    
    -   "quoted text": words inside quotation marks must appear as a phrase to match
        
        -   "hungry hippos" matches _Hungry Hippos Ate All My Marbles_, but not _Those Hippos Sure Look Hungry_
            
    -   OR: replaces the default AND between words, making a match on either word
        
        -   rock OR roll matches _1001 Facts about Rocks_ and _How To Bake Rolls_ and _Rock and/or Roll_
            
    -   \-: negation, only titles not containing this term will match
        
        -   hungry -hippos matches _Hungry Rhinoceri_ but not _Hungry Hippos_
            

  

-   is\_oa is the only available attribute filter
    

  

-   Use the _page_ argument to get results after first 50. _page=3_ will return the 101st through 150th best matches.
    

  

## Example Queries

  

-   [query: cell thermometry, is\_oa: true](https://api.unpaywall.org/v2/search?query=cell%20thermometry&is_oa=true&email=unpaywall_01@example.com)
    
    -   Get the most relevant OA results with “cell” AND “thermometry” in their titles.
        

  

-   [query: wave or particle](https://api.unpaywall.org/v2/search?query=wave%20OR%20particle&email=unpaywall_01@example.com)
    
    -   Get the most relevant results with “wave” OR “particle” in their titles, regardless of OA status.
        

  

-   [query: wave particle, is\_oa: false](https://api.unpaywall.org/v2/search?query=wave%20particle&is_oa=false&email=unpaywall_01@example.com)
    
    -   Get the most relevant closed articles with “wave” AND “particle” in their titles.  
          
        
-   [query: “wave particle duality”](https://api.unpaywall.org/v2/search/?query=%22wave%20particle%20duality%22&email=unpaywall_01@example.com)
    
    -   Get the most relevant articles with the exact phrase “wave particle duality” in their titles, regardless of OA status.
        

  

-   [query: wave -ocean](https://api.unpaywall.org/v2/search/?query=wave%20-ocean&email=unpaywall_01@example.com)
    
    -   Get the most relevant articles with titles containing “wave” but NOT “ocean”, regardless of OA status.
