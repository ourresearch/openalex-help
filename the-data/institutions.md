---
description: Universities and other organizations to which authors claim affiliations
---

# 🏫 Institutions

## 🏫 Institutions

Institutions are universities and other organizations to which authors claim affiliations.

OpenAlex indexes about 109,000 institutions.

When you search for an institution in OpenAlex, here is what you'll get. Click on the shaded regions to learn more

{% embed url="https://github.com/ourresearch/openalex-help/raw/main/diagrams/institution-screenshot.drawio" %}

The Canonical External ID for institutions is the ROR ID. All institutions in OpenAlex have ROR IDs.

Our information about institutions comes from several sources: Crossref, PubMed, ROR, MAG, and publisher websites. In order to link institutions to works, we parse every affiliation listed by every author. These affiliation strings can be quite messy, so we’ve trained an algorithm to interpret them and extract the actual institutions with reasonably high reliability.

For a simple example: we will treat both “MIT, Boston, USA” and “Massachusetts Institute of Technology” as the same institution ([https://ror.org/042nb2s44](https://ror.org/042nb2s44)).

### Concepts

The concepts most frequently applied to works affiliated with this institution.

### Identifiers

All the external identifiers that we know about for this institution.

IDs are expressed as URIs whenever possible. Possible ID types:

* Grid: This institution's [GRID](https://www.grid.ac/) [ID](https://en.wikipedia.org/wiki/RAS\_syndrome)
* MAG: This institution's [Microsoft Academic Graph](https://www.microsoft.com/en-us/research/project/microsoft-academic-graph/) ID
* OpenAlex: This institution's [OpenAlex ID](broken-reference/). Same as [`Institution.id`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-data/institutions/institution-object.md#id)
* ROR: This institution's ROR ID. Same as [`Institution.ror`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-data/institutions/institution-object.md#ror)
* Wikipedia: This institution's Wikipedia page URL
* Wikidata: This institution's [Wikidata ID](https://www.wikidata.org/wiki/Wikidata:Identifiers)

{% hint style="info" %}
Many institution are missing one or more ID types (either because we don't know the ID, or because it was never assigned). Keys for null IDs are not displayed.
{% endhint %}

### Roles

List of roles that this organization has, such as Institution, Funder, and Publisher.

In many cases, a single organization does not fit neatly into one role. For example, Yale University is a single organization that is a research university, funds research studies, and publishes an academic journal. The Roles you see in OpenAlex are meant to link the entities together for a single organization, and includes counts for the works associated with each role.

### Summary statistics

Citation metrics for this institution.

<div align="left">

<figure><img src="../.gitbook/assets/Screenshot 2023-06-25 110211.png" alt="" width="368"><figcaption></figcaption></figure>

</div>

Here we show the _Cited by_ count, which is the total number of citations that this institution has ever received. In other words, this is the total number of citations to all papers to which at least one author has claimed affiliation to this institution.

We also show three derived citation measures:

* _H-index_: The [_h_-index](https://en.wikipedia.org/wiki/H-index) for this institution.
* _2yr mean citedness_: The 2-year mean citedness for this institution. Also known as [impact factor](https://en.wikipedia.org/wiki/Impact\_factor).
* _i10 index_: The [i-10 index](https://en.wikipedia.org/wiki/Author-level\_metrics#i-10-index) for this institution.

While the _h_-index and the i-10 index are normally author-level metrics and the 2-year mean citedness is normally a journal-level metric, they can be calculated for any set of papers, so we include them for institutions.

### Works

This is a list of all of this institution's works. This is defined as all works in which at least one author has claimed affiliation with this institution.

### Works by year

This shows the number of works for this institution for each year.
