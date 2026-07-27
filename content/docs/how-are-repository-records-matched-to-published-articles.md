---
title: "How are repository records matched to published articles?"
description: "We try to match the articles we find to a published article with a Crossref DOI(https://support.unpaywall.org/a/solutions/articles/44001900286) in one of two ways: by DOI, or by…"
tags: ["unpaywall"]
source_id: "41193798254743"
source_url: "https://help.openalex.org/hc/en-us/articles/41193798254743-How-are-repository-records-matched-to-published-articles"
source_updated: "2026-06-13"
---
We try to match the articles we find to a [published article with a Crossref DOI](https://support.unpaywall.org/a/solutions/articles/44001900286) in one of two ways: by DOI, or by title and author.

  

Matching by DOI is greatly preferred because it’s an exact one-to-one match. 

  

**Guidelines:** 

-   The article’s DOI should be in a <[dc:identifier](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#terms-identifier)\> element in the PMH record.
    -   The value of this element should be formatted like <dc:identifier>doi:YOUR\_DOI</dc:identifier>
    -   There should be only one identifier element containing a DOI.
-   If an identifier element cannot be used, put the DOI in a <dc:relation> element instead.
    -   The relation should be formatted the same way as an identifier.
    -   If there is more than relation with a DOI, we'll assume they belong to the article's references rather than the article itself.

  

Matching by title and author is possible as a fallback.

  

**Guidelines:**

-   The article’s title should be present in a <[dc:title](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#terms-title)\> element.
-   The name of at least the article’s first author should be present in a <[dc:creator](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/#terms-creator)\> element.
