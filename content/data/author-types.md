---
title: "Author types"
updated: 2026-11-21
description: "What kind of author is on a byline: a human, an organization, or a software agent such as an AI; what null means, how software agents are found, and how to find or leave out works with known AI authors."
tags: ["reference"]
entity:
  example: "author-types/software-agent"
  api: "author-types"
  linksTo:
    - "works"
    - "authors"
    - "authorships"
---
An **author type** says what kind of [author](/data/authors/) is named on a work: a human, an organization, or a software agent. There are three: `human`, `organization` and `software-agent`. Every author object and every [authorship](/data/authorships/)'s `author` carries a [`type`](/data/authors/#type). Most are null: null means the type is not stated. An author type's OpenAlex ID looks like `https://openalex.org/author-types/software-agent`; list all three at [`api.openalex.org/author-types`](https://api.openalex.org/author-types).

Author types are a [vocabulary](/data/vocabulary/): OpenAlex sets a type only where a source states it or a rule we have checked can tell.

## About

### What the types mean

- **Human**: a person.
- **Organization**: a group credited as one author, such as a consortium, a committee, a working group, a company or an institution.
- **Software agent**: running software credited as an author, such as an AI research agent, an AI model named on the byline, a persona the byline presents as an AI (a name followed by the model it runs on), or another bot. A handful are not AI at all, such as a bot credited on a software release.

### Null means not stated

Most authors have no type. Null means no source stated it and no rule could tell, not that the author is a human. Today typed authors are software agents and organizations that a source identifies with a ROR ID. More organizations, and humans, will be typed as we read them from sources that state them.

So filter on `software-agent`, not on `human`: a filter for humans would leave out nearly every human author.

### How software agents are found

Each author on a byline is typed on its own, before authors are grouped into profiles:

- **A source says so.** When a source states that an author is software, OpenAlex records it.
- **The byline names an AI product.** OpenAlex keeps a list of AI products and agents, each with its launch date and the ways bylines write its name. A byline name counts only on a work published after that product's launch date, so an older author who shares a name is never typed.
- **Never a first name alone.** Some AI products share a first name with many people. A first name on its own never makes an author a software agent.
- **Read in context.** Before a byline name is typed, an AI model reads it beside the rest of the byline and the work's title and venue, and confirms that it names software. That leaves out lab instruments, teams and companies named after AI products, and entries that join a person and an AI.

Each rule is checked on a random sample of bylines before it is used, and new typed authors are checked again every week.

### How organizations are found

An author is typed `organization` when the source record names it as an organization and gives its [ROR](https://ror.org) ID. Most of these are museums, herbaria and other collections credited on their own records. A group name on a byline, such as "Study Group" or "Collaboration", is not enough on its own yet: too many people's names and affiliations look like one.

### Authorships and profiles

The `type` on an [authorship](/data/authorships/#author) is the type of that one author on that one work. The `type` on an [author profile](/data/authors/#type) is the type every authorship on the profile shares. If some authorships on a profile are typed and some are not, or they differ, the profile's type is null.

### No stance on AI authorship

OpenAlex records bylines as they were published. When a byline names an AI system, we record it and type it as a software agent. That says what the byline names. It takes no stance on whether an AI can be an author: venues and publishers set their own rules on that.

### How author types are named

Each type is named in plain words, and [`standard_terms`](#standard_terms) lists the matching term in standard vocabularies. We say `human` rather than "person": a company is a legal person, so "person" is read two ways. "Human" is also Wikidata's name for its class of people.

## Values

| ID | Display name | Definition |
|----|--------------|------------|
| `human` | Human | The author is a person. |
| `organization` | Organization | The author is a group credited as one author: a consortium, committee, working group, company or institution. |
| `software-agent` | Software agent | The author is running software, such as an AI research agent or another bot. |

The live list is at [`api.openalex.org/author-types`](https://api.openalex.org/author-types).

## Attributes

The top-level fields on an **author type** object. Attributes shared with other entities ([`id`](/data/common-attributes/#id), [`display_name`](/data/common-attributes/#display_name), [`works_count`](/data/common-attributes/#works_count), [`created_date`](/data/common-attributes/#created_date), [`updated_date`](/data/common-attributes/#updated_date)) are documented once on [Common attributes](/data/common-attributes/).

### `id`
*String.* The [OpenAlex ID](/data/#the-openalex-id-scheme) for this author type, e.g. `https://openalex.org/author-types/software-agent`. The last segment is the value you filter on.

### `display_name`
*String.* The type's name, e.g. `Software agent`.

### `description`
*String.* What the type means, in a sentence (the definitions in [Values](#values)).

### `standard_terms`
*List of objects.* The same kind of agent in standard vocabularies, so you can map OpenAlex author types to linked data. Each object has:

- `vocabulary`: the vocabulary's name, e.g. `W3C PROV-O`.
- `term`: the term as that vocabulary spells it, e.g. `SoftwareAgent`.
- `url`: where that vocabulary defines the term.

```json
"standard_terms": [
  {"vocabulary": "W3C PROV-O", "term": "SoftwareAgent", "url": "http://www.w3.org/ns/prov#SoftwareAgent"},
  {"vocabulary": "Wikidata", "term": "software agent (Q2297769)", "url": "https://www.wikidata.org/wiki/Q2297769"},
  {"vocabulary": "W3C ActivityStreams 2.0", "term": "Application", "url": "https://www.w3.org/ns/activitystreams#Application"}
]
```

At launch the terms are:

| Author type | Vocabulary | Term |
|-------------|------------|------|
| `human` | W3C PROV-O | [Person](http://www.w3.org/ns/prov#Person) |
| `human` | schema.org | [Person](https://schema.org/Person) |
| `human` | Wikidata | [human (Q5)](https://www.wikidata.org/wiki/Q5) |
| `organization` | W3C PROV-O | [Organization](http://www.w3.org/ns/prov#Organization) |
| `organization` | schema.org | [Organization](https://schema.org/Organization) |
| `organization` | Wikidata | [organization (Q43229)](https://www.wikidata.org/wiki/Q43229) |
| `software-agent` | W3C PROV-O | [SoftwareAgent](http://www.w3.org/ns/prov#SoftwareAgent) |
| `software-agent` | Wikidata | [software agent (Q2297769)](https://www.wikidata.org/wiki/Q2297769) |
| `software-agent` | W3C ActivityStreams 2.0 | [Application](https://www.w3.org/ns/activitystreams#Application) |

The `standard_terms` in the API record is the full, current list. Scholarly metadata standards such as Crossref, DataCite and JATS have person and organization contributors but no software type yet, so `software-agent` has no term from them.

### `works_count`
*Integer.* How many works have at least one author of this type. See [Common attributes](/data/common-attributes/#works_count).

### `works_api_url`
*String.* A ready-made [Works](/data/works/) API URL for the works with at least one author of this type (`filter=authorships.author.type:<ID>`).

### `created_date`
*String.* When the author type was added to OpenAlex (`YYYY-MM-DDTHH:MM:SS`, an ISO 8601 date and time). See [Common attributes](/data/common-attributes/#created_date).

### `updated_date`
*String.* When the record last changed. See [Common attributes](/data/common-attributes/#updated_date).

## In the API

The Author types endpoint is at [`api.openalex.org/author-types`](https://api.openalex.org/author-types). Fetch one by ID, [`/author-types/software-agent`](https://api.openalex.org/author-types/software-agent), or list all three.

Author types are most useful as filters:

```
# Works with known AI authors (at least one author typed software-agent)
https://api.openalex.org/works?filter=authorships.author.type:software-agent

# Works with no known AI authors (no author typed software-agent)
https://api.openalex.org/works?filter=authorships.author.type:!software-agent

# Author profiles that are software agents
https://api.openalex.org/authors?filter=type:software-agent
```

`authorships.author.type` looks at every author on a work, not only the first 100. With `!`, it keeps a work only when it has no known AI authors: no author on it is typed `software-agent`. Only typed authors are caught, so this keeps works whose authors have no type stated (an AI author nobody typed among them) and works with no authors listed. It does not mean every author is human. The few non-AI bots typed `software-agent` count as known AI authors in these filters.

The filters take the short value (`software-agent`). See [Filtering](/api/filtering/) for the syntax and the [endpoints index](/api/endpoints/) for every endpoint.

On [openalex.org](https://openalex.org), works search has one choice of three: All works, Only works with known AI authors, or No known AI authors. A software-agent author carries a small tag on work and author pages.
