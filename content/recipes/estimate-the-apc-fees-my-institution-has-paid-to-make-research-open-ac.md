---
title: "Estimate the APC fees my institution has paid to make research Open Access"
description: "Calculating the exact amount of money an institution has spent on APC fees is not currently possible. We outline below an approach that estimates these spends:"
tags: ["libraries"]
source_id: "24942051299095"
source_url: "https://help.openalex.org/hc/en-us/articles/24942051299095-Estimate-the-APC-fees-my-institution-has-paid-to-make-research-Open-Access"
source_updated: "2024-08-05"
---
Calculating the exact amount of money an institution has spent on APC fees is not currently possible. We outline below an approach that estimates these spends:

1.  Use corresponding\_institution filter → select your institution
2.  Add filter=type:types/**article**|types/**review** to restrict analyses to only works where APC prices apply
3.  Add filter=primary\_location.source.type:source-types/**journal** to restrict analyses to journals 
4.  Add APC Sum to the stats report or group\_by=apc\_sum in API call

Example: [https://openalex.org/works?page=1&filter=corresponding\_institution\_ids%3Ai18014758,type%3Atypes%2Farticle%7Ctypes%2Freview,primary\_location.source.type%3Asource-types%2Fjournal&group\_by=,apc\_sum](https://openalex.org/works?page=1&filter=corresponding_institution_ids%3Ai18014758,type%3Atypes%2Farticle%7Ctypes%2Freview,primary_location.source.type%3Asource-types%2Fjournal&group_by=,apc_sum)

This approach is based on several assumptions which could bias the results—[these are discussed in detail here](/entities/sources/#how-we-build-it). Throughout the process, there are both under- and over-estimates, which interact to provide an estimate that is likely closer to the real values paid. It is important to note that APC fees and behaviours vary among disciplines and institution type and so global patterns will not hold the same for institutions that vary in size, disciplinary focus, and/or organizational type (e.g., government, academic, research hospital, company).

[Learn more about Open Access (OA) in OpenAlex](/docs/open-access/)
