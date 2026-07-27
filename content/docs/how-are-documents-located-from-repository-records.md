---
title: "How are documents located from repository records?"
description: "In each OAI-PMH record, we’ll look for a URL that leads to either"
tags: ["unpaywall"]
source_id: "41193820666263"
source_url: "https://help.openalex.org/hc/en-us/articles/41193820666263-How-are-documents-located-from-repository-records"
source_updated: "2026-06-13"
---
In each OAI-PMH record, we’ll look for a URL that leads to either

-   the article in PDF format, or
-   an HTML page containing the article.

  

Without the location of the document, we don’t know it’s open and can’t send people to it.

  

**Guidelines:**

-   Put either or both of the above in <[dc:identifier](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#terms-identifier)\> elements in the PMH record.
-   The PDF or webpage must be retrievable without logging into the repository site.

  

If the URL leads to a PDF, we’re done. We’ll use that as an open location.

  

If the URL leads to an HTML page, we’ll retrieve the page contents and look for either a PDF URL or license information. If found, we’ll decide the document is open.

  

**Guidelines:**

-   PDF links should be in citation\_pdf\_url meta tags, for example <meta name="citation\_pdf\_url" content="YOUR\_URL"/>
-   The page should contain a link to the article’s license terms or a notice that the work is in the public domain. Ideally this will be a [Creative Commons](https://creativecommons.org/licenses/) license, for example [https://creativecommons.org/licenses/by/4.0/](https://creativecommons.org/licenses/by/4.0/). If you use a different type of open license, let us know.
