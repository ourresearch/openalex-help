---
title: "Working with collections"
updated: 2026-10-03
description: "Recipes for collections: build one from a list of DOIs, ORCIDs or ISSNs or from a search, share it, copy someone else's, report on a set of journals or institutions, exclude a list, get alerts, export members, and do it all from a script or an AI agent."
tags: ["how-do-i"]
synonyms: ["collection", "saved list", "reading list", "journal list", "list of authors", "col_"]
card: "Save a list once, then filter any search by it: journals in a deal, a department's authors, a reading list."
---
A [collection](/data/collections/) is a named list of OpenAlex entities you save once and then use in any search, in place of hundreds of pasted IDs. These recipes cover the jobs people use them for. Each works on [openalex.org](https://openalex.org) or through the [collections API](/api/collections/); API examples use your key as `$OPENALEX_API_KEY`, and managing collections costs no credits.

> [!claude]
> You can do all of this in conversation: *"Make a collection of the journals in this spreadsheet, then show me how many papers UC corresponding authors published in them each year, and how many were open access."* Set up once: [Using OpenAlex with an AI assistant](/how-to/ai-assistants/).

## How do I make a collection from a list of DOIs, ORCIDs or ISSNs?

On the website: open [your collections](https://openalex.org/settings/collections), click **New collection**, and paste the list. The wizard finds each item's OpenAlex ID, shows what it matched, and saves the ones you keep.

With the API, turn the list into OpenAlex IDs first, up to 100 values per request with `|` between them, then create the collection with those IDs:

```bash
# 1. Look up the OpenAlex IDs (DOIs here; use filter=orcid: on /authors, filter=issn: on /sources)
curl "https://api.openalex.org/works?filter=doi:10.7717/peerj.4375|10.1038/nature12373&select=id,doi&api_key=$OPENALEX_API_KEY"

# 2. Create the collection with the IDs that came back
curl -X POST https://api.openalex.org/collections \
  -H "Authorization: Bearer $OPENALEX_API_KEY" -H "Content-Type: application/json" \
  -d '{"display_name": "Reading list", "entity_type": "works",
       "member_ids": ["https://openalex.org/W2741809807", "https://openalex.org/W2159974629"]}'
```

The IDs can go in exactly as the lookup returns them (`https://openalex.org/W…`). A collection holds up to 1,000,000 members, and one request adds up to 10,000. Anything the lookup didn't find simply isn't in its results: compare counts before you save. More ways to find IDs are in [Finding OpenAlex IDs](/how-to/finding-openalex-ids/).

## How do I save the results of a search as a collection?

On the website: run the search and click the folder icon at the top, **Save results as a collection**, in any mode. Every result goes in, up to 1,000,000, added on our servers with the progress shown. To add a search's results to a collection you already have, tick the master checkbox, choose **Select all**, then the folder icon and the collection; untick rows first to leave them out.

With the API, send the search itself; OpenAlex pages through it for you:

```python
import os, time, requests
key = os.environ["OPENALEX_API_KEY"]
auth = {"Authorization": f"Bearer {key}"}
c = requests.post("https://api.openalex.org/collections", headers=auth,
                  json={"display_name": "MIT authors, 50+ works", "entity_type": "authors"}).json()
imp = requests.post(f"https://api.openalex.org/collections/{c['id'].rsplit('/', 1)[-1]}/imports", headers=auth,
                    json={"query": "https://api.openalex.org/authors?filter=last_known_institutions.id:I63966007,works_count:>50"})
status_url = imp.headers["Location"]
while (s := requests.get(status_url, headers=auth).json())["status"] in ("queued", "running"):
    time.sleep(2)
print(s["status"], s["added"], "added")
```

The search runs with your key, one request per 200 results, so it costs what paging the results would. See [imports](/api/collections/#add-a-searchs-results).

A collection is a snapshot: it doesn't follow the search. To keep a live list, [save the search](/api/alerts/) instead.

## How do I find and tidy up my collections?

List them with the usual parameters: filter by type or access, search the names, sort, select only what you need.

```text
https://api.openalex.org/collections?filter=entity_type:sources&sort=updated_date:desc&select=id,display_name,member_count
https://api.openalex.org/collections?search=elsevier
https://api.openalex.org/collections?member_ids=S137773608
```

The last one answers "which of my collections hold this journal?" On the website, your collections are at [openalex.org/settings/collections](https://openalex.org/settings/collections).

## How do I share a collection, and use one someone shared with me?

Share it by link: on its page click **Share**, or `PATCH` it with `{"access": "shared_by_link"}`. Anyone with the link or ID can then view it and filter by it, logged in or not; it never shows up in any listing. Make it private again the same way, and every link stops working at once.

To use one shared with you, use its ID like your own: `filter=collection:col_…`. You can't change it, but you can [copy it](#how-do-i-copy-a-collection-and-change-it).

## How do I copy a collection and change it?

On its page, click **Make a copy**. With the API:

```bash
curl -X POST https://api.openalex.org/collections \
  -H "Authorization: Bearer $OPENALEX_API_KEY" -H "Content-Type: application/json" \
  -d '{"copy_of": "https://openalex.org/collections/col_8yWKmRNyEr", "display_name": "My copy"}'
```

The copy is private and yours, with the same type, description and members; change it freely. It doesn't follow later changes to the original.

## How do I report on a set of journals or institutions?

Put the set in a collection, then use it as a filter value and group the results. For example, a consortium tracking its transformative agreements keeps two collections: the journals in the agreements (a sources collection) and its member campuses (an institutions collection). Papers in those journals with a corresponding author at a member campus, by year:

```text
https://api.openalex.org/works?filter=primary_location.source.id:col_JOURNALS,corresponding_institution_ids:col_CAMPUSES,publication_year:2020-2025&group_by=publication_year
```

The same papers by open-access status, or by journal:

```text
https://api.openalex.org/works?filter=primary_location.source.id:col_JOURNALS,corresponding_institution_ids:col_CAMPUSES,publication_year:2025&group_by=open_access.oa_status
https://api.openalex.org/works?filter=primary_location.source.id:col_JOURNALS,corresponding_institution_ids:col_CAMPUSES,publication_year:2025&group_by=primary_location.source.id
```

A request can use up to 5 collections, one per filter field. More report patterns are in [Analyzing your institution](/how-to/analyzing-your-institution/).

## Which filters take a collection?

`collection:` takes one of the endpoint's own type, and every filter whose value is an OpenAlex ID takes one of that ID's type:

| You have a collection of | Use it on `/works` as |
| --- | --- |
| works | `collection:col_…` |
| authors | `authorships.author.id:col_…` |
| institutions | `authorships.institutions.lineage:col_…` (with their parts) or `corresponding_institution_ids:col_…` |
| sources | `primary_location.source.id:col_…` (published there), or `locations.source.id:col_…` (any copy there, repositories included) |
| publishers | `primary_location.source.publisher_lineage:col_…` |
| funders | `funders.id:col_…` |
| topics | `topics.id:col_…` |
| countries | `authorships.countries:col_…` |

On other endpoints the same holds: an institutions collection on `/authors` is `last_known_institutions.id:col_…`, and a locations collection on `/locations` is `collection:col_…`. A mismatch returns a `400` naming both types.

## How do I leave a list out of my results?

Put `!` before the collection: `/works?filter=primary_location.source.id:!col_…,publication_year:2025` is the year's works *outside* those journals. Use it to drop a set of predatory journals, papers you've already screened, or authors you already know.

## Can I get an alert for new works in a collection?

Yes, for a collection of anything but works: save a search such as `/works?filter=authorships.author.id:col_…` and turn on its alert, on the website or with the [alerts API](/api/alerts/). New works by any author in the collection arrive by email. A works collection is a fixed list, so it never gains new works and can't alert. The alert runs while you can read the collection, so it keeps working as you add members.

## How do I export a collection?

The member IDs: `GET /collections/col_…/members?format=csv` returns all of them as CSV, however many there are (on the website: the collection's **More** menu, **Export members as CSV**). The full records: filter the members' endpoint, `/works?filter=collection:col_…`, and page with a cursor, or open that search on the website and use **Export** (CSV, RIS and more).

## Can a collection hold locations?

Yes. A location is one copy of a work: the publisher's page, a repository record, a preprint. A locations collection holds [location IDs](/data/locations/#id) such as `doi:10.7717/peerj.4375` or `pmh:oai:arXiv.org:cond-mat/0404022`, exactly as written (they're case-sensitive), and `/locations?filter=collection:col_…` lists those copies. Use one to track the repository copies of your papers. A work's copies, with their IDs, are in its `locations` list:

```text
https://api.openalex.org/works/W2741809807?select=locations
```

Put the `locations[].id` values you want into `member_ids`.

## Can an AI agent do this for me?

Yes. With the [OpenAlex connector](/how-to/ai-assistants/), ask Claude to build, share or report on collections in plain language. For your own agent or script, the [collections API](/api/collections/) works like the rest of the API: an `id` you can put straight into a filter, the usual list parameters, and errors with a stable `code` to branch on. Its [For agents](/api/collections/#for-agents) section lists the moves that matter.
