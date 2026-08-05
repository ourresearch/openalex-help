---
title: "Where can I find information about which issue of a journal an article is in?"
description: "Issue-level metadata for an article lives in the biblio field — find it by exporting search results from the website or in the API response."
tags: ["how-do-i"]
source_id: "27626749267223"
source_url: "https://help.openalex.org/hc/en-us/articles/27626749267223-Where-can-I-find-information-about-which-issue-of-a-journal-an-article-is-in"
source_updated: "2024-11-07"
---
You can find issue-level metadata for an article either by exporting search results from the user interface or in the ["biblio" field](/entities/works/#biblio) in the response to an API call for a specific work. For instance: 

[api.openalex.org/works/W2016949000](http://api.openalex.org/works/W2016949000)  --> 

"biblio": {  
"volume": "48",  
"issue": "5",  
"first\_page": "1064",  
"last\_page": "1078"
