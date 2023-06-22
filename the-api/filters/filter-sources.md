# Filter sources

You can filter sources with the `filter` parameter:

* Get sources that have an ISSN\
  [https://api.openalex.org/sources?filter=has\_issn:true](https://api.openalex.org/sources?filter=has\_issn:true)

{% hint style="info" %}
It's best to [read about filters](broken-reference) before trying these out. It will show you how to combine filters and build an AND, OR, or negation query
{% endhint %}

### `/sources` attribute filters

You can filter using these attributes of the `Source` entity object (click each one to view their documentation on the [`Source`](broken-reference) object page):

* [`apc_prices.currency`](broken-reference)
* [`apc_prices.price`](broken-reference)
* [`apc_usd`](broken-reference)
* [`cited_by_count`](broken-reference)
* [`country_code`](broken-reference)
* [`host_organization`](broken-reference) (alias: `host_organization.id`)
* [`host_organization_lineage`](broken-reference) — Use this with a publisher ID to find works from that publisher and all of its children.
* [`ids.openalex`](broken-reference) (alias: `openalex`)
* [`is_in_doaj`](broken-reference)
* [`is_oa`](broken-reference)
* [`issn`](broken-reference)
* [`publisher`](broken-reference) — Requires exact match. Use the [`host_organization_lineage`](broken-reference) filter instead if you want to find works from a publisher and all of its children.
* [`summary_stats.2yr_mean_citedness`](broken-reference) (accepts float, null, !null, can use range queries such as < >)
* [`summary_stats.h_index`](broken-reference) (accepts integer, null, !null, can use range queries)
* [`summary_stats.i10_index`](broken-reference) (accepts integer, null, !null, can use range queries)
* [`type`](broken-reference)
* [`works_count`](broken-reference)
* [`x_concepts.id`](broken-reference) (alias: `concepts.id` or `concept.id`)

{% hint style="info" %}
Want to filter by `host_organization.display_name`? This is a two-step process:

1. Find the host organization's ID by searching by `display_name` in Publishers or Institutions, depending on which type you are looking for.
2. Filter works by `host_organization.id`.

To learn more about why we do it this way, [see here.](../search/search-works.md#why-cant-i-search-by-name-of-related-entity-author-name-institution-name-etc.)
{% endhint %}

### `/sources` convenience filters

These filters aren't attributes of the [`Source`](broken-reference) object, but they're included to address some common use cases:

#### `continent`

Value: a String with a valid [continent filter](../../the-data/geo/continents.md#filter-by-continent)

Returns: sources that are associated with the chosen continent.

* Get sources that are associated with Asia\
  [https://api.openalex.org/sources?filter=continent:asia](https://api.openalex.org/sources?filter=continent:asia)

#### `default.search`

Value: a search string

This works the same as using the [`search` parameter](../search/search-sources.md#search-sources) for Sources.

#### `display_name.search`

Value: a search string

Returns: sources with a [`display_name`](broken-reference) containing the given string; see the [search page](../search/search-sources.md) for details.

* Get sources with names containing "Neurology":\
  [`https://api.openalex.org/sources?filter=display_name.search:Neurology`](https://api.openalex.org/sources?filter=display\_name.search:Neurology)\`\`

{% hint style="info" %}
In most cases, you should use the [`search`](../search/search-sources.md#sources-full-search) parameter instead of this filter because it uses a better search algorithm.
{% endhint %}

#### `has_issn`

Value: a Boolean (`true` or `false`)

Returns: sources that have or lack an [ISSN](broken-reference), depending on the given value.

* Get sources without ISSNs:\
  [`https://api.openalex.org/sources?filter=has_issn:false`](https://api.openalex.org/sources?filter=has\_issn:false)\`\`

#### `is_global_south`

Value: a Boolean (`true` or `false`)

Returns: sources that are associated with the [Global South](../../the-data/geo/regions.md#global-south).

* Get sources that are located in the Global South\
  [https://api.openalex.org/sources?filter=is\_global\_south:true](https://api.openalex.org/sources?filter=is\_global\_south:true)
