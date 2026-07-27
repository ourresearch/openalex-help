---
title: "How is the best OA location determined?"
description: "When an article has more than one OA location, we need to decide which is the most current, authoritative version, which is first in oa\\locations and is called the best\\oa\\locat…"
tags: ["unpaywall"]
source_id: "41193798112151"
source_url: "https://help.openalex.org/hc/en-us/articles/41193798112151-How-is-the-best-OA-location-determined"
source_updated: "2026-06-13"
---
When an article has more than one OA location, we need to decide which is the most current, authoritative version, which is first in _oa\_locations_ and is called the _best\_oa\_location__._

  

Each location is assigned a sort score based on:

1.  _host\_type:_ "publisher" is better than "repository".
2.  [version](https://support.unpaywall.org/a/solutions/articles/44000708792): "publishedVersion" is better than "acceptedVersion", which is better than "submittedVersion".
3.  _url\_for\_pdf_: A location with a direct PDF link is better than one without.
4.  for repository locations, _evidence_: A repository record matched by DOI is better than one matched by title.
5.  repository rankings: Some major repositories like PubMed Central and arXiv are ranked above others.

  

These attributes are compared and treated as a series of tiebreakers, producing an ordered list of locations.
