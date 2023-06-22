# Group works

You can group works with the `group_by` parameter:

* Get counts of works by Open Access status:\
  [`https://api.openalex.org/works?group_by=oa_status`](https://api.openalex.org/works?group\_by=oa\_status)

Or you can group using one the attributes below.

{% hint style="info" %}
It's best to [read about group by](./) before trying these out. It will show you how results are formatted, the number of results returned, and how to sort results.
{% endhint %}

### `/works` group\_by attributes

{% hint style="danger" %}
The `host_venue` and `alternate_host_venues` properties have been deprecated in favor of [`primary_location`](broken-reference) and [`locations`](broken-reference). `host_venue` and `alternate_host_venues` are no longer available in the Work object, and trying to access them in filters or group-bys will return an error.
{% endhint %}

* [`authors_count`](../filters/filter-works.md#authors\_count)
* [`authorships.author.id`](broken-reference) (alias `author.id`)
* [`authorships.author.orcid`](broken-reference) (alias `author.orcid`)
* [`authorships.institutions.country_code`](broken-reference) (alias `institutions.country_code`)
* [`authorships.institutions.continent`](../filters/filter-works.md#authorships.institutions.continent-alias-institutions.continent) (alias `institutions.continent`)
* [`authorships.institutions.is_global_south`](../filters/filter-works.md#authorships.institutions.is\_global\_south-alias-institutions.is\_global\_south)
* [`authorships.institutions.id`](broken-reference) (alias `institutions.id`)
* [`authorships.institutions.ror`](broken-reference) (alias `institutions.ror`)
* [`authorships.institutions.type`](broken-reference) (alias `institutions.type`)
* [`authorships.is_corresponding`](broken-reference) (alias: `is_corresponding`): this marks whether or not we have corresponding author information for a given work
* [`apc_payment.price`](broken-reference)
* [`apc_payment.currency`](broken-reference)
* [`apc_payment.provenance`](broken-reference)
* [`apc_payment.price_usd`](broken-reference)
* [`best_oa_location.is_oa`](broken-reference)
* [`best_oa_location.license`](broken-reference)
* [`best_oa_location.source.host_organization`](broken-reference)
* [`best_oa_location.source.id`](broken-reference)
* [`best_oa_location.source.issn`](broken-reference)
* [`best_oa_location.source.type`](broken-reference)
* [`best_oa_location.version`](broken-reference)
* [`best_open_version`](../filters/filter-works.md#best\_open\_version)
* [`cited_by_count`](broken-reference)
* [`cites`](../filters/filter-works.md#cites)
* [`concepts_count`](../filters/filter-works.md#concepts\_count)
* [`concepts.id`](broken-reference)
* [`concepts.wikidata`](broken-reference)
* [`corresponding_author_ids`](broken-reference)
* [`corresponding_institution_ids`](broken-reference)
* [`grants.award_id`](broken-reference)
* [`grants.funder`](broken-reference)
* [`has_abstract`](../filters/filter-works.md#has\_abstract)
* [`has_doi`](../filters/filter-works.md#has\_doi)
* [`has_orcid`](../filters/filter-works.md#has\_orcid)
* [`has_pmid`](../filters/filter-works.md#has\_pmid)
* [`has_pmcid`](../filters/filter-works.md#has\_pmcid)
* [`has_ngrams`](../filters/filter-works.md#has\_ngrams)
* [`has_references`](../filters/filter-works.md#has\_references)
* [`is_retracted`](broken-reference)
* [`is_paratext`](broken-reference)
* [`journal`](../filters/filter-works.md#journal)
* [`language`](broken-reference)
* [`locations.source.host_institutions_lineage`](../filters/filter-works.md#locations.source.host\_institution\_lineage)
* [`locations.source.publisher_lineage`](../filters/filter-works.md#locations.source.publisher\_lineage)
* [`locations_count`](broken-reference)
* [`open_access.any_repository_has_fulltext`](broken-reference)
* [`open_access.is_oa`](broken-reference) (alias `is_oa`)
* [`open_access.oa_status`](broken-reference) (alias `oa_status`)
* [`primary_location.is_oa`](broken-reference)
* [`primary_location.license`](broken-reference)
* [`primary_location.source.has_issn`](broken-reference)
* [`primary_location.source.host_organization`](broken-reference)
* [`primary_location.source.id`](broken-reference)
* [`primary_location.source.issn`](broken-reference)
* [`primary_location.source.type`](broken-reference)
* [`primary_location.version`](broken-reference)
* [`publication_year`](broken-reference)
* [`repository`](../filters/filter-works.md#repository)
* [`version`](broken-reference)
