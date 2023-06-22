# Filter institutions

You can filter institutions with the `filter` parameter:

* Get institutions that are located in Canada\
  [https://api.openalex.org/institutions?filter=country\_code:ca](https://api.openalex.org/institutions?filter=country\_code:ca)

{% hint style="info" %}
It's best to [read about filters](broken-reference) before trying these out. It will show you how to combine filters and build an AND, OR, or negation query
{% endhint %}

### `/institutions` attribute filters

You can filter using these attributes of the `Institution` entity object (click each one to view their documentation on the [`Institution`](broken-reference) object page):

* [`cited_by_count`](broken-reference)
* [`country_code`](broken-reference)
* [`openalex`](broken-reference): the OpenAlex ID of the Institution
* [`repositories.host_organization`](broken-reference): OpenAlex ID for an [`Institution`](../../the-data/institutions.md)
* [`repositories.host_organization_lineage`](broken-reference): OpenAlex ID for an [`Institution`](../../the-data/institutions.md)
* [`repositories.id`](broken-reference): the OpenAlex ID of a repository (a [`Source`](../../the-data/sources.md))
* [`ror`](broken-reference): the ROR ID of the Institution
* [`summary_stats.2yr_mean_citedness`](broken-reference) (accepts float, null, !null, can use range queries such as < >)
* [`summary_stats.h_index`](broken-reference) (accepts integer, null, !null, can use range queries)
* [`summary_stats.i10_index`](broken-reference) (accepts integer, null, !null, can use range queries)
* [`type`](broken-reference)
* [`works_count`](broken-reference)
* [`x_concepts.id`](broken-reference) (alias: `concepts.id` or `concept.id`)

### `/institutions` convenience filters

These filters aren't attributes of the [`Institution`](broken-reference) object, but they're included to address some common use cases:

#### `continent`

Value: a String with a valid [continent filter](../../the-data/geo/continents.md#filter-by-continent)

Returns: institutions that are located in the chosen continent.

* Get institutions that are located in South America\
  [https://api.openalex.org/institutions?filter=continent:south\_america](https://api.openalex.org/institutions?filter=continent:south\_america)

#### `default.search`

Value: a search string

This works the same as using the [`search` parameter](../search/search-institutions.md#search-institutions) for Institutions.

#### `display_name.search`

Value: a search string

Returns: institutions with a [`display_name`](broken-reference) containing the given string; see the [search page](../search/search-institutions.md#search-a-specific-field) for details.

* Get institutions with names containing "technology":\
  [`https://api.openalex.org/institutions?filter=display_name.search:technology`](https://api.openalex.org/institutions?filter=display\_name.search:technology)

{% hint style="info" %}
In most cases, you should use the [`search` parameter](../search/search-institutions.md) instead of this filter because it uses a better search algorithm.
{% endhint %}

#### `has_ror`

Value: a Boolean (`true` or `false`)

Returns: institutions that have or lack a [ROR ID](broken-reference), depending on the given value.

* Get institutions without ROR IDs:\
  [`https://api.openalex.org/institutions?filter=has_ror:false`](https://api.openalex.org/institutions?filter=has\_ror:false)

#### `is_global_south`

Value: a Boolean (`true` or `false`)

Returns: institutions that are located in the [Global South](../../the-data/geo/regions.md#global-south).

* Get institutions that are located in the Global South\
  [https://api.openalex.org/institutions?filter=is\_global\_south:true](https://api.openalex.org/institutions?filter=is\_global\_south:true)
