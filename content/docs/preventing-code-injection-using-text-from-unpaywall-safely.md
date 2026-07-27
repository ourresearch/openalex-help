---
title: "Preventing Code Injection - Using Text From Unpaywall Safely"
description: "Some fields in Unpaywall records include text from external sources like Crossref. If you're simply viewing an Unpaywall API response in a browser or reading a spreadsheet from…"
tags: ["unpaywall"]
source_id: "41193804772631"
source_url: "https://help.openalex.org/hc/en-us/articles/41193804772631-Preventing-Code-Injection-Using-Text-From-Unpaywall-Safely"
source_updated: "2026-06-13"
---
Some fields in Unpaywall records include text from external sources like Crossref. If you're simply viewing an Unpaywall API response in a browser or reading a spreadsheet from the [Simple Query Tool](https://unpaywall.org/products/simple-query-tool), this won't cause any problems. But if you write programs that process this text or include it on web pages, you should be aware of a kind of bug called a [code injection](https://en.wikipedia.org/wiki/Code_injection) vulnerability.

  

When you mix text that someone else gives you with code or markup that has to be executed or otherwise interpreted, the program doing the interpretation sees your code and that text the same way. Certain sequences can change the behavior of your application. Here's a simple example:

  

The title of [this article](https://api.unpaywall.org/v2/10.5749/natiindistudj.2.1.0067?email=unpaywall_00@example.com) is:

  

<em>Traje</em>'s Future: Gendered Paths in Guatemala

  

If you insert that directly into the markup of a web page you've written, the <em> tag will make it appear like this:

  

_Traje_'s Future: Gendered Paths in Guatemala

  

That doesn't seem so bad - maybe it even looks like an improvement. And for some use-cases, it is. But by doing this you give up control of how your application works. The author of this text can do anything you can do. For some use-cases, this is a problem. HTML solves this problem using [character entity references](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML); to make this title appear correctly, it should be converted to this:

  

&lt;em&gt;Traje&lt;/em&gt;'s Future: Gendered Paths in Guatemala

  

This lets your user's browser know that you want the text "<em>" and you don't want the enclosed text italicized.

  

This isn't unique to Unpaywall or to HTML. It can happen any time you include someone else's text in your code or markup. [Cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) and [SQL injection](https://en.wikipedia.org/wiki/SQL_injection) are two especially important types of code injection. Note that while much of the discussion of these subjects involves attacks by malicious actors, it's very easy to do this accidentally, as in the example above.

  

In general, the solution is to convert the text so that it won't be interpreted like the rest of the program code, or use features like [prepared statements](https://en.wikipedia.org/wiki/Prepared_statement) that do it for you. In most cases you'll find a library specific to the language you're working in and the language you're generating. For example, when we create an API response, we use Python's [json](https://docs.python.org/3/library/json.html) package to encode all text so that it can't alter the structure of the JSON object.

  

  

Unpaywall doesn't attempt to remove or change elements that look like HTML or SQL or any other language - you get the text we get. We think the official metadata is worth preserving even if it contains mistakes, and we'd rather provide it in its complete form than in an arbitrarily (and possibly ineffectively) sanitized form.
