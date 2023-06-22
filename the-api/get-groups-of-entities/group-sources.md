# Group sources

You can group sources with the `group_by` parameter:

* Get counts of sources by publisher:\
  [https://api.openalex.org/sources?group\_by=publisher](https://api.openalex.org/sources?group\_by=publisher)

Or you can group using one the attributes below.

{% hint style="info" %}
It's best to [read about group by](./) before trying these out. It will show you how results are formatted, the number of results returned, and how to sort results.
{% endhint %}

### `/sources` group\_by attributes

* [`apc_prices.currency`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#apc\_prices)
* [`apc_usd`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#apc\_usd)
* [`cited_by_count`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#cited\_by\_count)
* [`has_issn`](../filters/filter-sources.md#has\_issn)
* [`continent`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/geo/continents.md#group-by-continent)
* [`country_code`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#country\_code)
* [`host_organization`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#host\_organization) (alias: `host_organization.id`)
* [`host_organization_lineage`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#host\_organization\_lineage) (alias: `host_organization.id`)
* [`is_global_south`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/geo/regions.md#group-by-global-south)
* [`is_in_doaj`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#is\_in\_doaj)
* [`is_oa`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#is\_oa)
* [`issn`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#issn)
* [`publisher`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#publisher)
* [`summary_stats.2yr_mean_citedness`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#summary\_stats)
* [`summary_stats.h_index`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#summary\_stats)
* [`summary_stats.i10_index`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#summary\_stats)
* [`type`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#type)
* [`works_count`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/source-object.md#works\_count)
