---
title: "Unpaywall Extension"
subtitle: "Wire the Unpaywall extension's open-access lookups into your own website."
description: "The Unpaywall browser extension(https://unpaywall.org/products/extension) gets open access locations by calling our REST API.(https://unpaywall.org/products/api) The API is call…"
tags: ["recipes", "unpaywall"]
source_id: "41193838350359"
source_url: "https://help.openalex.org/hc/en-us/articles/41193838350359-How-do-I-make-the-Unpaywall-extension-work-on-my-site"
source_updated: "2026-06-13"
---
The Unpaywall [browser extension](https://unpaywall.org/products/extension) gets open access locations by calling our [REST API.](https://unpaywall.org/products/api) The API is called using [DOIs](https://www.doi.org/), so the extension needs to be able to find the DOI of the article a page is about in order to call it. For example, on [https://www.nature.com/articles/nature21360](https://www.nature.com/articles/nature21360), the extension finds this HTML element:

  

<meta name="citation\_doi" content="10.1038/nature21360"/>

  

and looks up 10.1038/nature21360 in the API.

  

If you're a publisher, or run a preprint repository, institutional repository, or any other site with pages about items with DOIs, we'll need to be able to find them for the extension to work. The best, most consistent way for Unpaywall and other applications to find the DOI is by including a meta element as in the example above. The _name_ attributes we recognize are:

  

-   citation\_doi
-   doi
-   dc.doi
-   dc.identifier
-   dc.identifier.doi
-   bepress\_citation\_doi
-   rft\_id
-   dcsext.wt\_doi

  

Repository software will generally include one of these automatically, often through a plugin. If you're building your own platform, you'll need to include one of these yourself.

  

Note that the extension can only recognize a page as being "about" one DOI. Sometimes it isn't clear what this should be. For a page that centers on content _related_ to another item with a DOI (a book review, for example) it may not be appropriate to present that DOI as representing the page - especially if the review or other related item has its own DOI.
