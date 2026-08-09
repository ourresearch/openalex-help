---
title: "Raw affiliation strings"
description: "The exact affiliation text an author printed on a work, before OpenAlex matches it to an institution — the raw input to institution disambiguation."
tags: ["reference"]
entity:
  linksTo:
    - "authorships"
    - "institutions"
---
A **raw affiliation string** (RAS) is the exact affiliation text an author printed on a work, before OpenAlex matches it to an [institution](/data/institutions/) — free text like `"Impactstory, Sanford, NC, USA"` or `"Massachusetts Institute of Technology"`, often messy and inconsistent. It's the raw input to institution disambiguation: the thing OpenAlex parses to figure out *which organizations* an author was affiliated with. Raw affiliation strings are a [component](/data/component/) entity — they don't get their own OpenAlex ID. They live inside an [authorship](/data/authorships/), in its [`raw_affiliation_strings`](/data/authorships/#raw_affiliation_strings) list and its [`affiliations`](/data/authorships/#affiliations) mapping. They can also be queried in two other ways: a bespoke `raw_affiliation_strings.search` filter on [works](/data/works/), and a standalone [`/raw-affiliation-strings`](https://api.openalex.org/raw-affiliation-strings) list endpoint that pages over the distinct strings themselves.

## About

OpenAlex preserves the affiliation text exactly as it arrived on the source record, then parses each string to extract the institutions it names — so both `"MIT, Boston, USA"` and `"Massachusetts Institute of Technology"` resolve to the same institution ([ror.org/042nb2s44](https://ror.org/042nb2s44)).

### Parsing pipeline

Parsing runs in three steps:

1. **Deep-learning model** — an OpenAlex-trained model reads a string and assigns one or more institutions to it.
2. **Monthly string matching** — a rules pass fixes common model errors (adding or removing affiliations based on the raw string), run once a month.
3. **ROR matcher** — [ROR](https://ror.org/)'s own affiliation matcher, integrated into the OpenAlex codebase.

Steps 2 and 3 fill gaps left by the model, which hasn't been retrained since April 2023 — so institutions added to OpenAlex or ROR after that date won't be predicted by the model alone. On the [AffilGood benchmark](https://docs.google.com/spreadsheets/d/1YfmmPdJwCApv7pGEjf_SgFQWWRJOL5l2K1M_wCpuGi8/edit?gid=1092800650#gid=1092800650) (OpenAlex tab), the parser reaches roughly 0.92 recall and 0.93 precision. The result is stored on the authorship as the [`affiliations`](/data/authorships/#affiliations) mapping: each raw string paired with the institution IDs it produced. Country is assigned through the same matching — from the matched ROR record's metadata, or, when nothing matches but the address still names a country, directly from the string.

### Complex and layered systems

Some national research systems are layered — a French *unité mixte de recherche* (UMR) may belong to several parent organizations at once. OpenAlex handles these through ROR lineage: when a sub-unit has its own ROR record, the raw string matches to it, and lineage lets users roll the report up to the parent universities. The limiting factor is ROR coverage; where a sub-unit has no ROR record, a string can only match its parent. See [Affiliations](/data/raw-affiliation-strings/) for more on France and other layered systems.

### Failure modes

The parser can miss or mis-assign institutions, especially for organizations added to ROR after the April 2023 training cutoff (those depend entirely on the rules pass and ROR matcher). A raw string can also resolve to no institution at all while still yielding a country. Because the raw string is preserved verbatim, you can always see the original text even when matching fell short — and member institutions can review and correct their own affiliation matches with the [Affiliation Editor](/docs/fixing-errors/affiliations/). The parsing model, training data, and benchmarks are fully open ([openalex-institution-parsing](https://github.com/ourresearch/openalex-institution-parsing/tree/main/V2)); the monthly string-matching code lives in the [openalex-databricks repo](https://github.com/ourresearch/openalex-databricks/tree/main/jobs/string_matching_institutions).

## Attributes

A raw affiliation string is essentially a string plus its matched-institution mapping, both of which live on the [authorship](/data/authorships/). Being a component entity, it carries none of the [common attributes](/data/common-attributes/) and has no OpenAlex ID.

### `raw_affiliation_strings`
*List of strings.* On an authorship, the exact affiliation text this author printed, one string per affiliation — e.g. `["Impactstory, Sanford, NC, USA"]`. The unparsed input to institution matching.

### `affiliations`
*List of objects.* On an authorship, the mapping from each raw string to the institutions it matched. Each element has:

- **`raw_affiliation_string`** *(String)* — one raw affiliation string, verbatim.
- **`institution_ids`** *(List)* — the OpenAlex [institution](/data/institutions/) IDs that string resolved to (empty if nothing matched).

```json
"affiliations": [
  {
    "raw_affiliation_string": "Impactstory, Sanford, NC, USA",
    "institution_ids": [
      "https://openalex.org/I4200000001",
      "https://openalex.org/I4210166736"
    ]
  }
]
```

This is the authoritative record of *which printed string produced which institutions* — the flattened [`institutions`](/data/authorships/#institutions) list on the authorship loses that per-string provenance.

## In the API

Raw affiliation strings are a [component](/data/component/) entity — they carry no OpenAlex ID and you'll usually meet them as fields on an [authorship](/data/authorships/) (select [`authorships`](/data/works/attributes/#authorships) on a work). There are three ways to reach them:

- **The standalone list endpoint** at [`api.openalex.org/raw-affiliation-strings`](https://api.openalex.org/raw-affiliation-strings) pages over the *distinct* strings themselves, rather than through works. Each row is a raw string plus its `works_count`, the institution IDs it resolved to (`institution_ids_final`, and any curated `institution_ids_override`), and its `countries` — handy for auditing how a given affiliation string is being matched across the whole corpus.
- **Search the raw text** with the `raw_affiliation_strings.search` filter on [works](/data/works/): `filter=raw_affiliation_strings.search:impactstory` returns works whose authors printed that affiliation text — matching on the *raw string*, before institution disambiguation. Useful for finding an organization's works when its name never resolved cleanly to a ROR-backed institution.
- **Filter on the resolved mapping** with `authorships.affiliations.institution_ids`, which filters works on the institution IDs a raw string produced.

See [Filtering](/api/filtering/) for filter syntax and [Searching](/api/searching/) for how `.search` behaves. To filter on the resolved institution itself (rather than the raw text), use `authorships.institutions.id` on [works](/data/works/).
