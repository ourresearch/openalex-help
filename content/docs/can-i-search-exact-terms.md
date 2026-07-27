---
title: "Can I search exact terms?"
description: "Our text searching defaults to stemming, which means that if you search \"research\" or \"researcher\" in the fulltext search field, you'll get the same results because both searche…"
tags: ["reference"]
source_id: "28951241521047"
source_url: "https://help.openalex.org/hc/en-us/articles/28951241521047-Can-I-search-exact-terms"
source_updated: "2025-01-03"
---
Our text searching defaults to stemming, which means that if you search "research" or "researcher" in the fulltext search field, you'll get the same results because both searches are stemmed to {research} before searching. 

Last year, we enabled a [feature to disable stemming](https://docs.openalex.org/how-to-use-the-api/get-lists-of-entities/search-entities#search-without-stemming) and allow users to search exact terms. Unfortunately, that feature proved very costly to operate and we have currently disabled it. If the our communities of users decide it should be a priority or institutions are willing to pay for it via [Premium subscriptions](https://help.openalex.org/hc/en-us/articles/24397762024087-Pricing), we hope to provide that again in the future.

In the meantime, if you do need to use exact searching, one work-around is to do the search in OpenAlex and download the results locally. Then, you can run an exact search locally on your machine. For instance, if you search "researcher" in OpenAlex, it will default to {research} and return all those results. Once you have downloaded all the records, you can then search on your computer for "researcher" within that subset.
