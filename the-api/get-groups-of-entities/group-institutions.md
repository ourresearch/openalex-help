# Group institutions

You can group institutions with the `group_by` parameter:

* Get counts of institutions by country code:\
  [https://api.openalex.org/institutions?group\_by=country\_code](https://api.openalex.org/institutions?group\_by=country\_code)

Or you can group using one the attributes below.

{% hint style="info" %}
It's best to [read about group by](./) before trying these out. It will show you how results are formatted, the number of results returned, and how to sort results.
{% endhint %}

### `/institutions` group\_by attributes

* [`cited_by_count`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/institution-object.md#cited\_by\_count)
* [`continent`](../filters/filter-institutions.md#continent)
* [`country_code`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/institution-object.md#country\_code)
* [`is_global_south`](../filters/filter-institutions.md#is\_global\_south)
* [`has_ror`](../filters/filter-institutions.md#has\_ror)
* [`repositories.host_organization`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/institution-object.md#repositories)
* [`summary_stats.2yr_mean_citedness`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/institution-object.md#summary\_stats)
* [`summary_stats.h_index`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/institution-object.md#summary\_stats)
* [`summary_stats.i10_index`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/institution-object.md#summary\_stats)
* [`type`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/institution-object.md#type)
* [`works_count`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/institution-object.md#works\_count)
