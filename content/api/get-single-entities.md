---
title: "Get Singleton"
updated: 2026-10-26
description: "Retrieve a single entity by ID"
tags: ["api"]
source_id: "guides/get"
source_url: "https://developers.openalex.org/guides/get"
source_updated: "2026-02-18"
---
Use `GET /{entity_type}/{id}` to retrieve a single entity. The response is the full entity object.

```bash
curl "https://api.openalex.org/works/W2741809807"
```

**Cost:** Free

**Fetching many?** One list request returns up to 100 records by ID, much faster than 100 single requests. It costs 1 credit for the whole list (see [OR filters](/api/filtering/#addition-or)):

```bash
curl "https://api.openalex.org/works?filter=ids.openalex:W2741809807|W2100837269&per_page=100"
```

## OpenAlex IDs

Every entity has a unique OpenAlex ID with a letter prefix indicating the type:

| Prefix | Entity |
|--------|--------|
| W | Work |
| A | Author |
| S | Source |
| I | Institution |
| T | Topic |
| K | Keyword |
| P | Publisher |
| F | Funder |
| G | Award |

You can use the full URL or just the key:

```bash
# Full URL
curl "https://api.openalex.org/works/https://openalex.org/W2741809807"

# Key only (recommended)
curl "https://api.openalex.org/works/W2741809807"
```

IDs are case-insensitive: `W2741809807` and `w2741809807` are equivalent.

## External ID lookups

You can look up entities using external identifiers. Pass the full external ID URL or use shorthand notation.

```bash
# DOI
curl "https://api.openalex.org/works/https://doi.org/10.7717/peerj.4375"

# ORCID
curl "https://api.openalex.org/authors/https://orcid.org/0000-0001-6187-6610"

# ROR
curl "https://api.openalex.org/institutions/https://ror.org/02y3ad647"

# ISSN
curl "https://api.openalex.org/sources/issn:0028-0836"

# PMID
curl "https://api.openalex.org/works/pmid:29456894"
```

### Short-form IDs

For convenience, you can use prefix notation instead of full URLs:

```bash
curl "https://api.openalex.org/works/doi:10.7717/peerj.4375"
curl "https://api.openalex.org/works/pmid:29456894"
```

### Supported external IDs

Each entity type has a primary (canonical) external identifier, and most accept a few more. Use the prefix form (`ror:02y3ad647`) or, for IDs that have one, the full URL (`https://ror.org/02y3ad647`, `https://orcid.org/...`, `https://doi.org/...`):

| Entity | Canonical ID | Lookup forms |
|--------|--------------|--------------|
| Works | DOI | `doi:`, `pmid:` (or the PubMed URL `https://pubmed.ncbi.nlm.nih.gov/29456894`) |
| Authors | ORCID | `orcid:` |
| Sources | ISSN-L | `issn_l:`, `issn:` |
| Institutions | ROR | `ror:`, `wikidata:` |
| Funders | ROR or Funder DOI | `ror:`, `doi:` (the Funder DOI, e.g. `doi:10.13039/100000001`), `crossref:` (the Funder Registry id, e.g. `crossref:100000001`), `wikidata:` |
| Publishers | Wikidata ID | `wikidata:`, `ror:` |
| Concepts (deprecated) | Wikidata ID | `wikidata:` |

Wikidata IDs work as `wikidata:Q746413` or either Wikidata URL (`https://www.wikidata.org/wiki/Q746413` or `.../entity/Q746413`). [Topics](/data/topics/) have no external ID to look up by: their `ids.wikipedia` is a link, not a key. Keywords, fields, subfields and domains are looked up by their OpenAlex ID only.

For authors, lookup by ORCID resolves by the primary ORCID or any [observed ORCID](/data/authors/#observed_orcids), not just the one currently shown as `orcid`.

**When several records share an ID**, the lookup returns one: for an ORCID, the profile that holds it as its primary `orcid` (over one that only observed it), then the one with the most works; for every other ID, the record with the most works (a funder over a sub-unit that carries the same ROR, a publishing group over an imprint). To see all of them, use the matching filter, e.g. `/authors?filter=orcid:0000-0002-5787-4927`.

## Component ids: locations

[Locations](/data/locations/) have no letter-prefixed OpenAlex ID. Their id is the identifier the copy was harvested under, prefixed with its namespace (`doi:`, `pmh:`, `pmid:`, `mag:`). `GET /locations/{id}` accepts the bare id, the `locations/`-prefixed key, or the full openalex.org URL:

```bash
curl "https://api.openalex.org/locations/doi:10.7717/peerj.4375"
curl "https://api.openalex.org/locations/locations/doi:10.7717/peerj.4375"
curl "https://api.openalex.org/locations/https://openalex.org/locations/doi:10.7717/peerj.4375"
```

Unlike OpenAlex IDs these are **case-sensitive** and contain `/` and `:`; copy them verbatim from a response. See [Locations](/data/locations/#fetching-one-location).

## Merged entities

When duplicate authors, sources or funders are merged, the old ID keeps working: requesting it returns the record it was merged into. The API redirects the old ID to the surviving one and follows that redirect for you, so you get a normal `200` response whose `id` is the surviving ID:

```bash
$ curl -s "https://api.openalex.org/authors/A5107411446?select=id,display_name"
{"id": "https://openalex.org/A5107863564", "display_name": "Sonia Luquín"}
```

To tell that an ID was merged, compare the `id` in the response with the ID you asked for. Filters resolve the same way: `filter=authorships.author.id:A5107411446` returns the surviving author's works. Merges are followed to the end of the chain (if A was merged into B and B later into C, A returns C).

A **deleted** ID (one with no surviving record) returns `404`, and so does a merged-away work ID: for works, see [Deletions and merged entities](/access/sync/#deletions-and-merged-entities). For bulk repair of stored IDs, the snapshot publishes every merged-away author and source ID with its surviving ID in [`merged_ids.csv.gz`](/access/sync/#merged-authors-and-sources-merged_idscsvgz).
