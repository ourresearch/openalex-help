# 🗝️ Keywords

Our team put together a new implementation of keywords based on our [Topics](./topics.md). There are currently over 26,000 keywords and we expect to add more as time goes on. There was some normalization done so that slight differences in casing/spacing/punctuation did not result in similiar keywords being assigned to the same work (but this can be improved in the future).

You can see the source code behind the Keywords [on Github here](https://github.com/ourresearch/openalex-keywords/tree/main/v2).

## About keywords

With our new topics system that was developed in coordination with CWTS, we came out with a list of 10 keywords for each topic. In order to assign keywords to works, we took the topics assigned to that work (at most 3 topics), pulled the keywords associated with those topics (at most 30 keywords, for now) and then determined the similarity of the keyword to the title/abstract using embeddings (and the BGE M3-Embedding model). The top 5 keywords were taken as long as the similarity score was above a certain threshold. This is a very simple implementation and there are some serious drawbacks to this approach. The biggest drawback is that currently, there are only 10 keywords for each topic. For topics with a large number of works, this might not perform well because our system would benefit from a larger pool of keywords. Our hope is that as time goes on, we can either crowdsource the addition of keywords or use some automated methods. In the meantime, we believe this system is a step in the right direction and gives our users another level of granularity.

While we think most of the keywords generated will be useful/correct, there is always the chance for incorrect keywords to show up. If you see any issues with keywords, feel free to submit a support request at the following link: [Support Request](https://openalex.org/help)
