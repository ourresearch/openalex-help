# Filter funders

You can filter funders with the `filter` parameter:

* Get funders that are located in Canada\
  [https://api.openalex.org/funders?filter=country\_code:ca](https://api.openalex.org/funders?filter=country\_code:ca)

{% hint style="info" %}
It's best to [read about filters](broken-reference) before trying these out. It will show you how to combine filters and build an AND, OR, or negation query
{% endhint %}

### `/funders` attribute filters

You can filter using these attributes of the `Funder` entity object (click each one to view their documentation on the [`Funder`](broken-reference) object page):

* [`cited_by_count`](broken-reference)
* [`country_code`](broken-reference)
* [`grants_count`](broken-reference)
* [`ids.openalex`](broken-reference) (alias: `openalex`)
* [`ids.ror`](broken-reference) (alias: `ror`)
* [`ids.wikidata`](broken-reference) (alias: `wikidata`)
* [`summary_stats.2yr_mean_citedness`](broken-reference) (accepts float, null, !null, can use range queries such as < >)
* [`summary_stats.h_index`](broken-reference) (accepts integer, null, !null, can use range queries)
* [`summary_stats.i10_index`](broken-reference) (accepts integer, null, !null, can use range queries)
* [`works_count`](broken-reference)

### `/funders` convenience filters

These filters aren't attributes of the [`Funder`](broken-reference) object, but they're included to address some common use cases:

#### `continent`

Value: a String with a valid [continent filter](../../the-data/geo/continents.md#filter-by-continent)

Returns: funders that are located in the chosen continent.

* Get funders that are located in South America\
  [`https://api.openalex.org/funders?filter=continent:south\_america`](https://api.openalex.org/funders?filter=continent:south\_america)

#### `default.search`

Value: a search string

This works the same as using the [`search` parameter](../search/search-funders.md#search-funders) for Funders.

#### `description.search`

Value: a search string

Returns: funders with a [`description`](broken-reference) containing the given string; see the [search page](../search/search-funders.md#search-a-specific-field) for details.

* Get funders with description containing "health":\
  [`https://api.openalex.org/funders?filter=description.search:health`](https://api.openalex.org/funders?filter=description.search:health)

#### `display_name.search`

Value: a search string

Returns: funders with a [`display_name`](broken-reference) containing the given string; see the [search page](../search/search-funders.md#search-a-specific-field) for details.

* Get funders with names containing "health":\
  [`https://api.openalex.org/funders?filter=display_name.search:health`](https://api.openalex.org/funders?filter=display\_name.search:health)

{% hint style="info" %}
In most cases, you should use the [`search` parameter](../search/search-funders.md) instead of this filter because it uses a better search algorithm.
{% endhint %}

#### `is_global_south`

Value: a Boolean (`true` or `false`)

Returns: funders that are located in the [Global South](../../the-data/geo/regions.md#global-south).

* Get funders that are located in the Global South\
  [https://api.openalex.org/funders?filter=is\_global\_south:true](https://api.openalex.org/funders?filter=is\_global\_south:true)
