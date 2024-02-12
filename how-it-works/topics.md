# 💡 Topics

Works in OpenAlex are tagged with Topics using an automated system that takes into account the available information about the work, including title, abstract, source (journal) name, and citations.

There are around 4,500 Topics. Topics are grouped into subfields, which are grouped into fields, which are grouped into top-level domains. This is shown in the diagram below, along with the counts for each.

<figure><img src="../.gitbook/assets/topics_diag1.png" alt=""><figcaption></figcaption></figure>

Works are assigned topics using a model that assigns scores for each topic for a work. The highest-scoring topic is that work's "primary topic". Each topic has one subfield, one field, and one domain, so each of these may also be used to classify the work, depending on the level of granularity you want. For example:

#### Example Topic: "Artificial Intelligence in Medicine"

* _Domain:_ "Health Sciences"
* _Field:_ "Medicine"
* _Subfield:_ "Health Informatics"
* _Topic:_ "Artificial Intelligence in Medicine"

We developed the method for classifying our works in collaboration with [CWTS at Leiden University](https://www.cwts.nl/), extending the methods they used in their Open Leiden rankings, which they explain [in this article](https://www.leidenmadtrics.nl/articles/an-open-approach-for-classifying-research-publications). Here is an outline of the overall method:

#### The steps we used to assign Topics to works

1. Cluster the [citation network](https://en.wikipedia.org/wiki/Citation\_graph) for works that have incoming and outgoing citations. This provides meaningful clusters of works that strongly correspond to research communities focused on different topics.
2. Use a Large Language Model (LLM) to get labels and descriptions for these clusters.
3. Use this labeled data to train a deep-learning model that can assign topics using titles, abstracts, citations, and journal name.
   * This model can handle cases with missing data, so we can use it to classify most of our works, including new works that don't have any incoming citations.
4. Assign each topic to subfields, fields, and domains, which are based on Scopus's [ASJC categories](https://service.elsevier.com/app/answers/detail/a\_id/12007/supporthub/scopus/)

For a detailed description of the methods, see our paper: "OpenAlex: End-to-End Process for Topic Classification" (LINK COMING SOON). The code and model are available at (LINK COMING SOON).

## Technical documentation

You can find more information about how OpenAlex Topics are included in the API and snapshot data in our [technical documentation Topics pages](https://docs.openalex.org/api-entities/topics).
