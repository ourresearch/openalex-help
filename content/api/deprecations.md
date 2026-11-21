---
title: "Deprecations"
updated: 2026-11-21
description: "Deprecated features and migration guides"
tags: ["api"]
source_id: "guides/deprecations"
source_url: "https://developers.openalex.org/guides/deprecations"
source_updated: "2026-02-18"
---
This page is a centralized reference for all deprecated features in the OpenAlex API. Use it to migrate old code and avoid using features that will be removed.

## Already Removed

These features have been removed from the API. Using them will cause errors.

### `host_venue` and `alternate_host_venues`

**Removed:** These Work object properties no longer exist.

**Replacement:** Use `primary_location` and `locations` instead.

**Migration:**

```diff
- work.host_venue.display_name
+ work.primary_location.source.display_name

- work.alternate_host_venues
+ work.locations
```

**Filter changes:**

```diff
- filter=host_venue.id:S123
+ filter=primary_location.source.id:S123

- filter=host_venue.publisher:P123
+ filter=primary_location.source.host_organization:P123
```

### `grants`

**Removed:** The `grants` property on Works has been removed.

**Replacement:** Use `funders` and `awards` for more comprehensive funding data.

**Migration:**

```diff
- work.grants[0].funder
+ work.funders[0].display_name

- work.grants[0].award_id
+ work.awards[0].funder_award_id
```

The new `awards` entity provides detailed award information including DOIs when available.

### `has_ngrams` filter

**Removed:** This filter no longer works.

**Replacement:** Use `has_fulltext` instead.

```diff
- filter=has_ngrams:true
+ filter=has_fulltext:true
```

### `sustainable_development_goals_aurora` on Works

**Removed:** 2 November 2026, as announced. Added in October 2026 as a deprecated field, it held the Aurora classifier's SDG tags as they stood when OpenAlex switched [`sustainable_development_goals`](/data/works/attributes/#sustainable_development_goals) to its own classifier. A `select` that names it now returns HTTP 400.

**Replacement:** Use `sustainable_development_goals`. See [SDGs](/data/sdgs/#the-old-aurora-tags-removed).

```diff
- work.sustainable_development_goals_aurora
+ work.sustainable_development_goals
```

### `volume` on Works

**Removed 14 November 2026:** the `volume` object on works, and the `volume.id` filter, sort and group_by. They answer an error that names the replacement.

**Replacement:** [`parent_works`](/data/works/attributes/#parent_works). A chapter's book is now one of its parent works, with `link_type: "volume"`. `parent_works` also covers the other part-of links (figures, files, data series), and a work can have more than one parent.

**Migration:**

```diff
- work.volume.id
+ work.parent_works[].id        (the entry whose link_type is "volume")

- filter=volume.id:W3109397498
+ filter=parent_works.id:W3109397498

- group_by=volume.id
+ group_by=parent_works.id

- select=volume
+ select=parent_works
```

`biblio.volume`, the volume number printed in a citation, is unchanged.

## Scheduled Changes

### Relationships renamed link types

**Changes Monday 7 December 2026**, with that day's update (the API around 13:00 UTC). The vocabulary of links between works, called relationships since 14 November 2026, is now called **link types**, with the field `link_type`. "Relationship" also names the parent, child and related links between institutions, so we use one word for one thing. Existing values are unchanged: `citation`, `volume`, `component`, `data-series` and `part`. One value is new: [`review`](/data/link-types/#reviews), live now on `/links` (it never appears in `parent_works`).

**Already working in the API, so you can switch now:**

- The endpoint [`/link-types`](https://api.openalex.org/link-types) and single records like [`/link-types/review`](https://api.openalex.org/link-types/review), with IDs `https://openalex.org/link-types/<value>`.
- `link_type` on every [`/links`](/data/links/) result, as a full ID (`https://openalex.org/link-types/citation`), beside the old `relationship` (`https://openalex.org/relationships/citation`).
- `link_type` on every entry of a work's [`parent_works`](/data/works/attributes/#parent_works), as a short value (`volume`), beside the old `relationship`.
- The filters `link_type:` on `/links` and `parent_works.link_type:` on works, and `group_by=parent_works.link_type`. Group keys are the same short values under either name.

**The snapshot** carries only `parent_works[].relationship` until 6 December and only `parent_works[].link_type` from the 7 December snapshot. Code that reads `link_type` and falls back to `relationship` works on both, and on older snapshot files you keep.

**On 7 December:**

| Before | From 7 December |
|---|---|
| `/relationships`, `/relationships/<value>` and every path under them, and `/work-relationships/...` | Redirect (301) to the same path under `/link-types`, query string kept, until at least 1 March 2027. Point your code at `/link-types`: some HTTP clients don't follow redirects |
| Link type IDs `https://openalex.org/relationships/<value>` | `https://openalex.org/link-types/<value>`. The API still accepts the old form as input until 1 March 2027. If you store these IDs or join on them, map `/relationships/` to `/link-types/` |
| `relationship` on `/links` results | Removed: read `link_type` |
| `parent_works[].relationship` on works | Removed: read `parent_works[].link_type` |
| Filter `relationship:` on `/links` | Still works, read as `link_type:`, until 1 March 2027; then an error that names `link_type` |
| Filter and group_by `parent_works.relationship` on works | Still work, read as `parent_works.link_type`, until 1 March 2027; then an error that names the new name |

**A large update that day.** The 83.6 million works that have parent works (about a fifth of all works) take a new `updated_date` on 7 December, so a copy kept up to date by `updated_date` (the API's `from_updated_date` filter, or the snapshot's updated files) receives each of them again, with the new name. If you sync that way, plan for that day's update being several times its usual size. The rename changes nothing else in those works.

**Migration:**

```diff
- https://api.openalex.org/relationships
+ https://api.openalex.org/link-types

- link["relationship"]                       # https://openalex.org/relationships/citation
+ link["link_type"]                          # https://openalex.org/link-types/citation

- work["parent_works"][0]["relationship"]    # volume
+ work["parent_works"][0]["link_type"]       # volume  (snapshot: p.get("link_type") or p.get("relationship"))

- /links?filter=target:W2741809807,relationship:component
+ /links?filter=target:W2741809807,link_type:component

- /works?filter=parent_works.relationship:volume
+ /works?filter=parent_works.link_type:volume

- /works?group_by=parent_works.relationship
+ /works?group_by=parent_works.link_type
```

## Deprecated (Still Working)

These features still work but are not recommended. They will be removed in the future.

### Concepts Entity

> **Warning:**
> Concepts are deprecated in favor of **Topics**. We will continue to provide Concepts on Works, but we are not actively maintaining, updating, or providing support for them.

**Replacement:** Use [Topics](/data/topics/) instead.

**Why Topics are better:**

| Feature | Concepts | Topics |
|---------|----------|--------|
| Count | ~65,000 | ~4,500 |
| Hierarchy | 6 levels | 4 levels (domain → field → subfield → topic) |
| Source | Microsoft Academic Graph | OpenAlex native (with CWTS) |
| Status | Deprecated | Active |

**Migration:**

| Concepts | Topics |
|----------|--------|
| `work.concepts` | `work.topics` |
| `work.concepts[0].id` | `work.primary_topic.id` |
| `/concepts` endpoint | `/topics` endpoint |
| `filter=concepts.id:C123` | `filter=topics.id:T123` |

```diff
- /works?filter=concepts.id:C86803240
+ /works?filter=topics.id:T10234
```

### `x_concepts` on Entities

**Deprecated:** The `x_concepts` property on Authors, Sources, and Institutions will be removed.

**Replacement:** Use Topics-based filtering and aggregation instead.

```diff
- author.x_concepts
+ # Use: /works?filter=authorships.author.id:A123&group_by=topics.id
```

### `last_known_institution` (singular)

**Deprecated:** The singular `last_known_institution` on Authors is deprecated.

**Replacement:** Use `last_known_institutions` (plural) instead.

```diff
- author.last_known_institution
+ author.last_known_institutions[0]
```

The plural form supports authors with multiple current affiliations.

### `include_xpac` parameter and `is_xpac` filter

> **Warning:**
> The legacy corpus controls are deprecated in favor of the first-class `corpus` parameter (added August 2026). They still work, but new code should use `corpus=` — and a request that combines `corpus=` with either legacy control returns an error.

**Replacement:** Use [`corpus=core|expansion|all`](/data/works/corpus/) instead.

**Migration:**

```diff
- /works?include_xpac=true
+ /works?corpus=all

- /works?filter=is_xpac:true&include_xpac=true
+ /works?corpus=expansion
```

The [`is_xpac`](/data/works/attributes/#is_xpac) *attribute* on work objects is not deprecated — it's still the way to tell which results in a `corpus=all` response came from the expansion.

## Filter Aliases (Deprecated)

These filter aliases still work but use the canonical form instead:

| Deprecated | Use Instead |
|------------|-------------|
| `concept.id` | `topics.id` |
| `concepts.id` | `topics.id` |
| `x_concepts.id` | `topics.id` |

## Historical: Polite Pool

Before February 2026, OpenAlex used a "polite pool" system where you could get higher rate limits by including `mailto=you@example.com` in your requests.

**This system has been replaced by API keys.**

- The `mailto` parameter is ignored
- All users need an [API key](/api/authentication/) (free)
- See the [announcement](https://groups.google.com/g/openalex-users/c/rI1GIAySpVQ) for details

## Timeline

| Feature | Status | Action Required |
|---------|--------|-----------------|
| `host_venue` | Removed | Migrate to `primary_location` |
| `grants` | Removed | Migrate to `funders` / `awards` |
| `has_ngrams` | Removed | Migrate to `has_fulltext` |
| Concepts | Deprecated | Migrate to Topics |
| `x_concepts` | Deprecated | Will be removed soon |
| Polite pool | Replaced | Use API keys |
| `include_xpac` / `is_xpac` filter | Deprecated | Migrate to `corpus=` |
| `sustainable_development_goals_aurora` | Removed (2 November 2026) | Use `sustainable_development_goals` |
| `volume` on works, `volume.id` | Removed (14 November 2026) | Use `parent_works`, `parent_works.id` |
| `/relationships`, `relationship` | Renamed; old fields removed 7 December 2026 (old filter names read until 1 March 2027) | Use `/link-types`, `link_type` |

## Staying Updated

For announcements about deprecations and breaking changes:
- Join the [OpenAlex User Group](https://groups.google.com/g/openalex-users) for announcements
- Follow [@OpenAlex_org](https://twitter.com/openalex_org) on Twitter
