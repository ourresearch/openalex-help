---
title: "Using Unpaywall data safely"
description: "Metadata fields can contain text from external sources — how to avoid code-injection bugs when processing or displaying it."
tags: ["unpaywall"]
source_id: "41193804772631"
source_url: "https://help.openalex.org/hc/en-us/articles/41193804772631-Preventing-Code-Injection-Using-Text-From-Unpaywall-Safely"
source_updated: "2026-06-13"
---
Some fields in [Unpaywall](/docs/unpaywall/) records (and OpenAlex records generally) include text from external sources like Crossref. If you're simply viewing an API response in a browser or reading a spreadsheet from the [Simple Query Tool](https://unpaywall.org/products/simple-query-tool), this causes no problems. But if you write programs that process this text or include it on web pages, be aware of a class of bug called a [code injection](https://en.wikipedia.org/wiki/Code_injection) vulnerability.

When you mix text someone else gives you with code or markup that gets interpreted, the interpreter sees your code and that text the same way — certain sequences can change your application's behavior. A real example: the title of [this article](https://api.unpaywall.org/v2/10.5749/natiindistudj.2.1.0067?email=unpaywall_00@example.com) is:

```
<em>Traje</em>'s Future: Gendered Paths in Guatemala
```

Insert that directly into a web page and the `<em>` tag italicizes the word rather than displaying as text. That seems harmless — maybe even an improvement — but you've given up control of how your application behaves: the author of that text can now do anything your markup can do. HTML solves this with [character entity references](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML); to display correctly, the title should be converted to:

```
&lt;em&gt;Traje&lt;/em&gt;'s Future: Gendered Paths in Guatemala
```

This isn't unique to Unpaywall or to HTML — it applies any time you include someone else's text in code or markup. [Cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) and [SQL injection](https://en.wikipedia.org/wiki/SQL_injection) are two especially important variants. And while most discussion of these involves malicious attackers, it's very easy to hit accidentally, as in the example above.

**The general solution:** encode the text so it can't be interpreted as part of your program, or use features like [prepared statements](https://en.wikipedia.org/wiki/Prepared_statement) that do it for you. In most cases there's a library for your language and output format. (When OpenAlex creates an API response, Python's [json](https://docs.python.org/3/library/json.html) package encodes all text so it can't alter the JSON structure.)

Unpaywall doesn't remove or alter text that looks like HTML, SQL, or any other language — you get the text we get. The official metadata is worth preserving even when it contains oddities, complete rather than arbitrarily (and possibly ineffectively) sanitized. Handling it safely is the consumer's job — now you know how.
