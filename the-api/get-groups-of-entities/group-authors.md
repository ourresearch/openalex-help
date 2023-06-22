# Group authors

You can group authors with the `group_by` parameter:

* Get counts of authors by the last known institution continent:\
  [`https://api.openalex.org/authors?group_by=last_known_institution.continent`](https://api.openalex.org/authors?group\_by=last\_known\_institution.continent)\`\`

Or you can group using one the attributes below.

{% hint style="info" %}
It's best to [read about group by](./) before trying these out. It will show you how results are formatted, the number of results returned, and how to sort results.
{% endhint %}

### `/authors` group\_by attributes

* [`cited_by_count`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/author-object.md#cited\_by\_count)
* [`has_orcid`](../filters/filter-authors.md#has\_orcid)
* [`last_known_institution.continent`](../filters/filter-authors.md#last\_known\_institution.continent)
* [`last_known_institution.country_code`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/author-object.md#last\_known\_institution)
* [`last_known_institution.id`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/author-object.md#last\_known\_institution)
* [`last_known_institution.is_global_south`](../filters/filter-authors.md#last\_known\_institution.is\_global\_south)
* [`last_known_institution.ror`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/author-object.md#last\_known\_institution)
* [`last_known_institution.type`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/author-object.md#last\_known\_institution)
* [`summary_stats.2yr_mean_citedness`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/author-object.md#summary\_stats)
* [`summary_stats.h_index`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/author-object.md#summary\_stats)
* [`summary_stats.i10_index`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/author-object.md#summary\_stats)
* [`works_count`](https://github.com/ourresearch/openalex-docs/blob/sandbox/the-api/get-groups-of-entities/author-object.md#works\_count)
