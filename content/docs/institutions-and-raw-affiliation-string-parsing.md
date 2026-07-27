---
title: "Institutions and Raw Affiliation String Parsing"
description: "This page contains all information related to our institution parsing. This help page will be updated with the latest information as it becomes available."
tags: ["data"]
source_id: "24831328396311"
source_url: "https://help.openalex.org/hc/en-us/articles/24831328396311-Institutions-and-Raw-Affiliation-String-Parsing"
source_updated: "2025-01-15"
---
This page contains all information related to our institution parsing. This help page will be updated with the latest information as it becomes available.

### Technical documentation and overview

Institutions are universities and other organizations to which authors claim affiliations.

We work closely with [ROR](https://ror.org/), so every OpenAlex institution has a corresponding entry in ROR.

Our information about institutions comes from several sources: Crossref, PubMed, ROR, MAG, and publisher websites. In order to link institutions to works, we parse every affiliation listed by every author. These affiliation strings can be quite messy, so we’ve trained an algorithm to interpret them and extract the actual institutions with reasonably high reliability.

For a simple example: we will treat both “MIT, Boston, USA” and “Massachusetts Institute of Technology” as the same institution ([https://ror.org/042nb2s44](https://ror.org/042nb2s44)).

You can find more information about OpenAlex institutions in our [technical documentation](https://docs.openalex.org/api-entities/institutions).

### Super systems

We mark certain institutions as "super systems". These include large university systems such as the [University of California System](https://openalex.org/I2803209242), as well as some governments and multinational companies. These are excluded from the results when doing analyses such as [Identifying collaborating institutions.](https://help.openalex.org/hc/en-us/articles/24346841662615) You can learn more in the [technical documentation here](https://docs.openalex.org/api-entities/institutions/institution-object#is_super_system).

### Institution Parsing

OpenAlex has to parse a lot of raw affiliation strings in order to affiliate authors with institutions. To do this effectively, a deep learning model was created which takes in a string and assigns one or more institutions to that string. If you would like to learn more about this model and how it was created/trained, you can go to this [google doc](https://docs.google.com/document/d/1ppbKRVtyneWc7Hjpo8TOm57YLGx1C2Oo/edit#heading=h.5w2tb5fcg77r) which goes into much more detail.

Overall, institution parsing is done in 3 steps:

1.  String parsing using the deep learning model developed by OpenAlex
2.  String matching which is done once per month in order to fix common model prediction errors (adding/removing institutional affiliations based on the raw affiliation string)
3.  Matching process developed by [ROR](https://ror.org/) (see the code [here](https://gitlab.com/crossref/labs/marple/-/tree/main/strategies_available/affiliation_single_search?ref_type=heads))

Steps 2 and 3 were added in order to fill in the gaps that are observed in the deep learning model because it has not been updated since April 2023. This means that any institutions that are added to OpenAlex/ROR after that date will not be predicted by the model and so, additional methods are needed. The string matching code can be found in the [OpenAlex databricks repo](https://github.com/ourresearch/openalex-databricks/tree/main/jobs/string_matching_institutions). while the ROR matcher has been integrated into our [main code base](https://github.com/ourresearch/openalex-guts).

### Code/Training Data/Benchmarks

If you are interested in setting up the institution parsing model on your own, going through the code, looking at the training data, or viewing the benchmark data, The [institution-parsing github repo](https://github.com/ourresearch/openalex-institution-parsing/tree/main/V2) is the best place to find more details about our parsing system. From that page, you are able to do the following:

-   Set up the institution parsing model on your own computer (requires semi-advanced knowledge of python/coding)
-   View the code used to develop, train, test, and deploy the model
-   Get the model artifacts
-   Download the training data
-   View the benchmark data used to test the model

If you would like a comprehensive benchmark dataset, we recommend checking out the following benchmark: [AffilGood Benchmark](https://docs.google.com/spreadsheets/d/1YfmmPdJwCApv7pGEjf_SgFQWWRJOL5l2K1M_wCpuGi8/edit?gid=1092800650#gid=1092800650). We only tested our model on the strings found in the "OpenAlex" tab as this benchmark had not yet been created when we were developing the institution parsing model. For the works in the "OpenAlex" tab, we achieved around 0.92 recall and 0.93 precision.

### Works-Magnet Tool

In order to give users and institutions the ability to change affiliations in OpenAlex, the [works-magnet tool](https://works-magnet.esr.gouv.fr/) was created by our friends at the _Ministère de l'enseignement supérieur et de la recherche_ (MESR). Please see [this article](https://help.openalex.org/hc/en-us/articles/28764358342807) for more information.
