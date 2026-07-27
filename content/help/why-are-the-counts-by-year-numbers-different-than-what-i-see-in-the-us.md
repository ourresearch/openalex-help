---
title: "Why are the counts_by_year numbers different than what I see in the user interface?"
description: "Users often want to know the total number of publications and citations of each entity (e.g., author, institution, source) in a large list of entities. For instance, of all the…"
tags: ["data"]
source_id: "27891614701207"
source_url: "https://help.openalex.org/hc/en-us/articles/27891614701207-Why-are-the-counts-by-year-numbers-different-than-what-I-see-in-the-user-interface"
source_updated: "2024-11-18"
---
Users often want to know the total number of publications and citations of each entity (e.g., author, institution, source) in a large list of entities. For instance, of all the Gold OA journals that have published on a particular topic, which have the highest counts of works published or cited. Or of all the authors at my institution, what are their total number of publications and/or citations.

Rather than requiring users to run a separate API call for each entity to see how many works/citations they have, we pre-calculate these numbers and nest them within the entity endpoint so that they are retrieved automatically with an API call. 

For instance, within an Author profile, we nest: [works\_count](https://docs.openalex.org/api-entities/authors/author-object#works_count), [cited\_by\_counts](https://docs.openalex.org/api-entities/authors/author-object#cited_by_count), and [counts\_by\_year](https://docs.openalex.org/api-entities/authors/author-object#counts_by_year) so that users can get all this information for any group of authors they analyze. 

Because these numbers are precalculated, they become out of date (particularly for entities that publish high volumes of research). We refresh these calculations every few months. If you want to have the most up to date count of works by an entity, it is best to use a works search with the entity as a filter. For instance: [https://openalex.org/works?filter=authorships.author.id:a5086928770](https://openalex.org/works?filter=authorships.author.id:a5086928770)
