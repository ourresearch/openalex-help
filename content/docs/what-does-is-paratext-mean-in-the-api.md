---
title: "What does is_paratext mean in the API?"
description: "Almost anything can have a DOI, so Unpaywall indexes a lot of things besides the journal articles most people use it for. This can be a problem for analyses that use Unpaywall.…"
tags: ["unpaywall"]
source_id: "41193838188439"
source_url: "https://help.openalex.org/hc/en-us/articles/41193838188439-What-does-is-paratext-mean-in-the-API"
source_updated: "2026-06-13"
---
Almost anything can have a DOI, so Unpaywall indexes a lot of things besides the journal articles most people use it for. This can be a problem for analyses that use Unpaywall. If you want to collect statistics about Open Access, you probably want to focus on articles, without including extraneous content like issue covers.

  

Crossref’s [content type](https://support.crossref.org/hc/en-us/articles/213123586-Metadata-and-content-type-overview) metadata helps with this: most articles have the type _journal-article_. But it’s not perfect; not every publisher uses these types consistently and a lot of journal content that isn’t an article is also called _journal-article_. Unpaywall still includes this information as-is in the API (as the genre field), but we also have added a new attribute that aims to identify this non-article content: _is\_paratext_.

  

From [Wikipedia](https://en.wikipedia.org/wiki/Paratext):

> [](https://en.wikipedia.org/wiki/Paratext)The main text of published authors (e.g. the story, non-fiction description, poems, etc.) is often surrounded by other material supplied by the authors, editors, printers, and publishers, which is known as the paratex.

  

Paratext is pretty much the same as _journal matter_ as described in [this paper](https://www.ncbi.nlm.nih.gov/books/NBK100350/). It’s similar to what folks call _front matter_, but it excludes some items that are considered front matter (for example, letters to the editor) and includes some new ones (for example, back covers). We use a more restrictive and specific definition. If the item’s title begins with one of the following, it’s paratext:

  

author index

back cover

contents:

cover image

cover picture

editorial board

front cover

frontispiece

inside back cover

inside cover

inside front cover

issue information

list of contents

masthead

title page

  

We’ll keep adding to this list when we see _journal-article_s that aren’t journal articles.
