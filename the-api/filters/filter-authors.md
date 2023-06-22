# Filter authors

You can filter authors with the `filter` parameter:

* Get authors that have an ORCID\
  [https://api.openalex.org/authors?filter=has\_orcid:true](https://api.openalex.org/authors?filter=has\_orcid:true)

{% hint style="info" %}
It's best to [read about filters](broken-reference) before trying these out. It will show you how to combine filters and build an AND, OR, or negation query.
{% endhint %}

### `/authors` attribute filters

You can filter using these attributes of the `Author` entity object (click each one to view their documentation on the [`Author`](broken-reference) object page):

* [`cited_by_count`](broken-reference)
* [`ids.openalex`](broken-reference) (alias: `openalex`)
* [`last_known_institution.country_code`](broken-reference)
* [`last_known_institution.id`](broken-reference)
* [`last_known_institution.ror`](broken-reference)
* [`last_known_institution.type`](broken-reference)
* [`orcid`](broken-reference)
* [`scopus`](broken-reference) (the author's scopus ID, as an integer)
* [`summary_stats.2yr_mean_citedness`](broken-reference) (accepts float, null, !null, can use range queries such as < >)
* [`summary_stats.h_index`](broken-reference) (accepts integer, null, !null, can use range queries)
* [`summary_stats.i10_index`](broken-reference) (accepts integer, null, !null, can use range queries)
* [`works_count`](broken-reference)
* [`x_concepts.id`](broken-reference) (alias: `concepts.id` or `concept.id`)

{% hint style="info" %}
Want to filter by `last_known_institution.display_name`? This is a two-step process:

1. Find the `institution.id` by searching institutions by `display_name`.
2. Filter works by `last_known_institution.id`.

To learn more about why we do it this way, [see here.](../search/search-works.md#why-cant-i-search-by-name-of-related-entity-author-name-institution-name-etc.)
{% endhint %}

### `/authors` convenience filters

These filters aren't attributes of the [`Author` object](broken-reference), but they're included to address some common use cases:

#### `default.search`

Value: a search string

This works the same as using the [`search` parameter](../search/search-authors.md#search-authors) for Authors.

#### `display_name.search`

Value: a search string

Returns: Authors whose [`display_name`](broken-reference) contains the given string; see the [search filter](../search/search-authors.md#search-a-specific-field) for details.

* Get authors named "tupolev":\
  [`https://api.openalex.org/authors?filter=display_name.search:tupolev`](https://api.openalex.org/authors?filter=display\_name.search:tupolev)

#### `has_orcid`

Value: a Boolean (`true` or `false`)

Returns: authors that have or lack an [orcid](broken-reference), depending on the given value.

* Get the authors that have an ORCID:\
  \`\`[`https://api.openalex.org/authors?filter=has_orcid:true`](https://api.openalex.org/authors?filter=has\_orcid:true)

#### `last_known_institution.continent`

Value: a String with a valid [continent filter](../../the-data/geo/continents.md#filter-by-continent)

Returns: authors where where the last known institution is in the chosen continent.

* Get authors where the last known institution is located in Africa\
  [https://api.openalex.org/authors?filter=last\_known\_institution.continent:africa](https://api.openalex.org/authors?filter=last\_known\_institution.continent:africa)

#### `last_known_institution.is_global_south`

Value: a Boolean (`true` or `false`)

Returns: works where at least _one_ of the author's institutions is in the [Global South](../../the-data/geo/regions.md#global-south).

* Get authors where the last known institution is located in the Global South\
  [https://api.openalex.org/authors?filter=last\_known\_institution.is\_global\_south:true](https://api.openalex.org/authors?filter=last\_known\_institution.is\_global\_south:true)
