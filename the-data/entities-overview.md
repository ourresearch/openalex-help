# Data overview

The OpenAlex dataset describes scholarly _entities_ and how those entities are connected to each other. Together, these make a huge web (or more technically, heterogeneous directed [graph](https://en.wikipedia.org/wiki/Graph\_theory)) of hundreds of millions of entities and billions of connections between them all.

<figure><img src="../.gitbook/assets/entities.png" alt="Entity relation diagram for OpenAlex"><figcaption></figcaption></figure>

## The OpenAlex ID

All entities have their own unique _OpenAlex ID_. This ID is meant to identify one and only one OpenAlex entity.

OpenAlex IDs are meant to be stable.* The work associated with ID W1234 will keep the ID W1234.

*In July 2023, OpenAlex will switch to a new, more accurate, author identification system, and will be replacing all OpenAlex Author IDs with new ones. This is a very rare case in which we violate the rule of having stable IDs, which is needed to make the improvements. Old IDs and their connections to works will still be avaiable in the historical OpenAlex data.

### The OpenAlex Key

The OpenAlex ID has two parts. The first part is the Base; it's always `https://openalex.org/.` The second part is the Key; it's the unique primary key that identifies a given resource in our database.

The key starts with a letter; that letter tells you what kind of entity you've got: **W**(ork), **A**(uthor), **S**(ource), **I**(nstitution), **C**(oncept), **P**(ublisher), or **F**(under). The IDs are not case-sensitive, so `w2741809807` is just as valid as `W2741809807`. So in the example above, the Key is `W2741809807`, and the `W` at the front tells us that this is a `Work`.

## Merged Entity IDs

At times we need to merge two Entities, effectively deleting one of them. This usually happens when we discover two Entities that represent the same real-world entity - for example, two [`Authors`](../../api-entities/authors/) that are really the same person.

If you try to get an entity using its OpenAlex ID, and that entity has been merged into another entity, you will be redirected to the entity it has been merged into. 

## Canonical External IDs

Every entity has an OpenAlex ID. Most entities also have IDs in other systems, too. There are hundreds of different ID systems, but we've selected a single external ID system for each entity to provide the **Canonical External ID**--this is the ID in the system that's been most fully adopted by the community, and is most frequently used in the wild. 

These are the Canonical External IDs:

* Works: [DOI](https://en.wikipedia.org/wiki/Digital_object_identifier)
* Authors: [ORCID](https://en.wikipedia.org/wiki/ORCID)
* Sources: [ISSN-L](https://en.wikipedia.org/wiki/ISSN#Linking_ISSN)
* Institutions: [ROR ID](https://en.wikipedia.org/wiki/Research_Organization_Registry)
* Concepts: [Wikidata ID](https://en.wikipedia.org/wiki/Wikidata)
* Publishers: [Wikidata ID](https://en.wikipedia.org/wiki/Wikidata)
## Learn more about the OpenAlex entities:

* [Works](works/): Scholarly documents like journal articles, books, datasets, and theses
* [Authors](broken-reference): People who create works
* [Sources](broken-reference): Where works are hosted (such as journals, conferences, and repositories)
* [Institutions](institutions.md): Universities and other organizations to which authors claim affiliations
* [Concepts](broken-reference): Topics assigned to works
* [Publishers](broken-reference): Companies and organizations that distribute works
* [Funders](broken-reference): Organizations that fund research
* [Geo](geo/): Where things are in the world
