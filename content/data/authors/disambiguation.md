---
title: "Disambiguation"
updated: 2026-08-19
description: "How OpenAlex turns the author names printed on works into stable author profiles: the signals the model weighs, the 2023 upgrade, the special NULL and deleted-author IDs, and the two ways it fails."
tags: ["reference"]
source_id: "24347048891543"
source_url: "https://help.openalex.org/hc/en-us/articles/24347048891543-Author-disambiguation"
source_updated: "2026-03-06"
---
Scholarly works list author names in all sorts of ways. "J. Smith," "John Smith," and "John A. Smith" might all be the same person — or three different people. **Author disambiguation** — the process we call **author entity resolution (AER)** — is how OpenAlex decides which [authorships](/data/authorships/) across millions of works belong to the same real-world person, and assigns each person a stable [author](/data/authors/) ID. Author data comes from [Crossref](https://www.crossref.org/), [PubMed](https://pubmed.ncbi.nlm.nih.gov/), [ORCID](https://orcid.org/), publisher websites, and the legacy [Microsoft Academic Graph](https://en.wikipedia.org/wiki/Microsoft_Academic).

This page is how the matching works. What a profile *is* — and why nearly every fix to one goes through its works — is on the [Authors overview](/data/authors/#a-profile-is-built-from-its-works); the role of ORCID specifically has [its own page](/data/authors/orcid/).

## The challenge

The same person's name appears differently from paper to paper, and different people share the same name. OpenAlex uses machine learning to cluster authorships into real-world authors even when the name strings vary — and to keep distinct people apart even when their names match.

## The signals

The disambiguation model weighs six signals when deciding whether two authorship records belong to the same person:

1. **Name similarity** — string matching across name variants.
2. **Co-author patterns** — shared collaborators across papers.
3. **Institutional affiliations** — consistent workplace signals.
4. **Research topics** — whether the publication record is topically coherent.
5. **Citation patterns** — self-citation and reference overlap.
6. **ORCID** — when present, an authoritative identity signal (though it's present far less often than people assume, and it isn't applied retroactively — see [ORCID](/data/authors/orcid/)).

So if "J. Schmidt" and "John Jacob Jingleheimer Schmidt" both write about 19th-century ketchup production at the same university, we treat them as one author — but we won't lump in the J.J.J. Schmidt who writes about weasel migration, even though the names match.

The institutional-affiliation signal itself comes from OpenAlex parsing each work's [raw affiliation strings](/data/raw-affiliation-strings/) into [institutions](/data/institutions/) — see those pages for how affiliation text is matched to ROR-backed institutions and countries.

## The July 2023 upgrade

In July 2023, OpenAlex switched to a significantly improved disambiguation system: a better clustering model, smarter assignment for newly published works, and deeper ORCID integration. As part of the switch, all old author IDs were deprecated and every author was assigned a new ID. The old IDs and their works are preserved [as a data dump](https://zenodo.org/record/8189450). New author IDs have a numeric component above 5000000000 and have been used since late July 2023 (and in snapshots from August 2023 onward).

## Special author IDs

Two author IDs fall outside the normal disambiguation process; you may encounter them, especially in the [snapshot](/access/snapshot/):

- **`A9999999999` — the NULL author.** Assigned to authorships that never went through disambiguation: no author name was received, the name was too short or too long to disambiguate reliably, or the name matched an ignored phrase (like "Unknown Author"). If an author asks to have their disambiguated profile removed, their works are reassigned here — effectively removing the profile. These records are grouped under this single NULL author rather than real profiles.
- **`A5317838346` — deleted authors.** Used when an author ID is removed from OpenAlex, usually because it no longer has any works (its works were merged into another author or deleted).

## Known failure modes

Disambiguation isn't perfect. The two failure modes are **splitting** (one real person's works spread across several profiles) and **merging** (works from different people collapsed into one profile). Both are fixed the same way — by [correcting which works belong to the profile](/data/curations/), because [a profile is built from its works](/data/authors/#a-profile-is-built-from-its-works): see [Fixing errors: Authors](/access/fixing-errors/authors/). Our methods, code, and trained models are fully open source ([openalex-name-disambiguation](https://github.com/ourresearch/openalex-name-disambiguation/tree/main/V3); [live pipeline](https://github.com/ourresearch/openalex-databricks/tree/main/jobs/author_name_disambiguation/v3)).
