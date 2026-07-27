---
title: "Which DOIs does Unpaywall cover?"
description: "DOIs can be created by one of several Registration Agencies(https://www.doi.org/registrationagencies.html). The Unpaywall dataset only covers articles issued by one: Crossref(ht…"
tags: ["unpaywall"]
source_id: "41193838206743"
source_url: "https://help.openalex.org/hc/en-us/articles/41193838206743-Which-DOIs-does-Unpaywall-cover"
source_updated: "2026-06-13"
---
DOIs can be created by one of several [Registration Agencies](https://www.doi.org/registration_agencies.html). The Unpaywall dataset only covers articles issued by one: [Crossref](https://www.crossref.org/). If you're looking for a DOI that isn't in Unpaywall, it might be invalid or created by a different agency. In either case, the Unpaywall REST API will give a 404 response, the Simple Query Tool will have a blank row, and it will be absent from the database snapshot.

  

You can find out if a DOI is valid by checking the [doi.org proxy server REST API](https://www.doi.org/factsheets/DOIProxy.html#rest-api), and you can find out which Registration Agency created a valid DOI using [Crossref's _agency_ endpoint](https://github.com/CrossRef/rest-api-doc). From the Crossref API docs:

  

Testing the following Crossref DOI:

`10.1037/0003-066X.59.1.29`

Using the URL:

`https://api.crossref.org/works/10.1037/0003-066X.59.1.29/agency`

Will return the following result:

```
{  status: "ok",  message-type: "work-agency",  message-version: "1.0.0",  message: {    DOI: "10.1037/0003-066x.59.1.29",    agency: {      id: "crossref",      label: "Crossref"    }  }}
```

Some valid Crossref DOIs aren't included because they've been deleted or are used for testing. For example:

  

[https://doi.org/10.1037/e461202008-001](https://doi.org/10.1037/e461202008-001) ([Crossref API](https://api.crossref.org/v1/works/http://dx.doi.org/10.1037/e461202008-001), [Unpaywall API](https://api.unpaywall.org/v2/10.1037/e461202008-001?email=unpaywall_00@example.com))

[https://doi.org/10.1306/a260066f-171b-11d7-8645000102c1865d](https://doi.org/10.1306/a260066f-171b-11d7-8645000102c1865d) [(Crossref API](https://api.crossref.org/v1/works/http://dx.doi.org/10.1306/a260066f-171b-11d7-8645000102c1865d), [Unpaywall API](https://api.unpaywall.org/v2/10.1306/a260066f-171b-11d7-8645000102c1865d?email=unpaywall_00@example.com))

  

We used to include **DataCite** DOIs, but we don't anymore. In practice we added very little value because almost everything with a DataCite DOI is OA. We decided to remove them at a time when article access was the primary use case for Unpaywall, and going to the doi.org URL is virtually guaranteed to give you that. Essentially, all we could do was be wrong, and we had an ever-growing list of exceptions people told us were closed. As Unpaywall is increasingly used for OA policy audits and analyses, the case for including them is stronger. For now, for statistical purposes, if you have a DataCite DOI, it's OA.

  

We'd like to include other Registration Agencies in due time, especially [JaLC](https://japanlinkcenter.org/top/) and [mEDRA](http://www.medra.org/). For now, Crossref gives us excellent coverage of the articles people are looking for the most.
