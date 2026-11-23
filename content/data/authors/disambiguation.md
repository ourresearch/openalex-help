---
title: "Disambiguation"
updated: 2026-11-23
description: "How OpenAlex turns the author names printed on works into author profiles today: which system matched which works, how the nightly matcher decides, how accurate the profiles are, the special and missing author IDs, and the ways it fails."
tags: ["reference"]
source_id: "24347048891543"
source_url: "https://help.openalex.org/hc/en-us/articles/24347048891543-Author-disambiguation"
source_updated: "2026-03-06"
---
Works print author names inconsistently: "J. Smith," "John Smith," and "John A. Smith" might be one person or three. OpenAlex groups these [authorships](/data/authorships/) into [author](/data/authors/) profiles automatically. (An authorship is one author entry on one work; this page calls it an *author entry*.) The system that does this changed in late 2025, and older works were not re-matched as a whole. So today's profiles come from two systems, depending on when each work was added.

What a profile *is*, and why nearly every fix to one goes through its works, is on the [Authors overview](/data/authors/#a-profile-is-built-from-its-works). The role of ORCID has [its own page](/data/authors/orcid/).

## Which system matched which works

A new nightly matcher assigns the authors of every work added since 20 December 2025. Older works keep the assignments the 2023 model gave them. "Added" means when OpenAlex first added the work (its [`created_date`](/data/common-attributes/#created_date)), not when it was published.

- **Works first added up to about 3 November 2025** keep the assignments of our July 2023 clustering model ("V3"). We don't re-match them as a whole. They change through bulk [clean-up passes](#clean-up-passes-over-existing-profiles) and user corrections. The V3 code is in [openalex-name-disambiguation](https://github.com/ourresearch/openalex-name-disambiguation/tree/main/V3), with [the pipeline that ran it](https://github.com/ourresearch/openalex-databricks/tree/main/jobs/author_name_disambiguation/v3).
- **Works first added from 4 November to 19 December 2025** arrived after the old system's last run and before the new matcher's start date. Most author entries on these roughly 4 million works have no author ID (see [Known failure modes](#known-failure-modes)).
- **Works first added on or after 20 December 2025** go through the nightly author matcher, which is part of our public data pipeline, [openalex-walden](https://github.com/ourresearch/openalex-walden). The matcher is [MatchAuthors](https://github.com/ourresearch/openalex-walden/blob/main/notebooks/end2end/MatchAuthors.ipynb), its vector step is in [vector_match](https://github.com/ourresearch/openalex-walden/tree/main/notebooks/end2end/vector_match), and the profile tables are built in [notebooks/authors](https://github.com/ourresearch/openalex-walden/tree/main/notebooks/authors).

## The signals

The nightly matcher compares each new author entry with existing profiles using six kinds of evidence:

- **ORCID**, the strongest signal when it is usable (see [ORCID](/data/authors/orcid/)).
- **The printed name**: first, middle and last names. It also tries other readings of the name, such as reversed order, compound surnames and transliterations.
- **Institutions**, from the work's [raw affiliation strings](/data/raw-affiliation-strings/) matched to [institutions](/data/institutions/).
- **Sources**: the journal or other source that published the work.
- **Topics**: the work's research [topics](/data/topics/).
- **Context**: the work's field, year, title and three nearest co-authors. These enter through the vector comparison described below.

The matcher does not use citation patterns; the 2023 model did. OpenAlex rebuilds each profile's own signals (name forms, institutions, topics, sources, ORCIDs) every day from the works it holds. So a corrected profile matches better the next night.

## How the nightly matcher decides

The matcher tries three methods in order: ORCID, then vector similarity, then name rules. If none of them finds exactly one profile, it creates a new profile. It does this on purpose: a wrong merge is harder to notice and undo than a split.

**ORCID comes first.** Publishers sometimes put one ORCID on every author of a work, so the matcher uses an ORCID only when it appears on a single author of the work. The entry then joins the profile that holds that ORCID. If several profiles hold it, the most-cited one wins.

**Candidates share a name block.** Without an ORCID match, the candidates are profiles in the same name block: first initial plus surname, like `j smith`. Another reading of the name can reach a profile in a different block, but only under a stricter test: that profile must be small and share both an institution and a source with the work.

**Vectors compare the new entry with each candidate's recent works.** The matcher writes the entry as a short text card (name, institution, field, source, year, three co-authors, title). A fine-tuned multilingual text model, based on `multilingual-e5-base`, turns each card into a vector. The entry joins a candidate profile when it is very close to that profile's recent works. Very common names skip this step. The exact thresholds are in the [vector_match code](https://github.com/ourresearch/openalex-walden/tree/main/notebooks/end2end/vector_match).

**Name rules decide the rest.** They check how much of the name agrees (full first and middle names, a middle initial, or only a first initial). They also check whether the profile shares an institution, a source or a topic with the work. The rules go from strongest to weakest and stop at the first level where exactly one profile qualifies. A first initial needs at least a shared institution or source. Two names given only as initials are never matched by name rules.

**Names that aren't people get no profile, unless they carry an ORCID.** Examples are "Anonymous," "et al." and "Unknown."

**New profiles group within one night.** Unmatched entries from the same night share one new profile when they carry the same usable ORCID. They also share one when they have the same name and the same institutions (or, with no institution, the same sources).

**Later changes to a work are handled every night, for works of any age.** Sometimes a publisher adds, removes or reorders a work's authors. The matcher then puts existing author IDs back by printed name. It also re-matches entries whose profile now has a clearly different surname, up to a nightly limit.

**User corrections win.** OpenAlex reapplies [user corrections](/data/curations/) every night, so the matcher can't undo them.

## Clean-up passes over existing profiles

Since September 2026, we have also cleaned up existing profiles in bulk, including profiles built from older works. Some passes take works off profiles that mix two or more people: an AI model reads each profile's works and groups them by person. Others merge profiles that belong to one person, or fix profiles that hold two different people on the same work.

For example, in September 2026 we merged profiles that shared an ORCID with a bigger profile. We also moved works listed on researchers' own public ORCID records onto their main profiles. We measure every pass with the accuracy method below, before and after.

## How accurate it is

Our latest estimate, from 22 November 2026, is **precision 97.1% (±0.5) and recall 91.6% (±0.8)**, with 95% intervals. On average, about 3 in 100 works on a researcher's main profile belong to someone else. About 8 in 100 of a researcher's works sit somewhere else: on other profiles, or on author entries with no profile. So missing works are a bigger problem than wrong ones.

These numbers describe the whole database: profiles from both systems, after clean-up passes and user corrections. They are not a test of the nightly matcher alone. They are judged by a language model, not by people.

We follow the metric definitions of [Baas et al. (2020)](https://doi.org/10.1162/qss_a_00019). For each researcher, take the profile that holds most of their works. Precision is the share of that profile's works that are theirs. Recall is the share of all their works that sit on it. We average over researchers, each counting once.

Our sample is a fixed random panel of 2,640 profiles, drawn from every profile with at least one work. A researcher with several profiles is weighted down, so each researcher counts once. A language model (Claude Opus) reads every work on each sampled profile and separates the people on it. It then searches OpenAlex for the main person's other works: on other profiles, under other name forms, and on author entries with no profile. We re-read the same panel after each change. The panel is never used to train the clean-up models. A researcher with no profile at all cannot be sampled.

## Special author IDs

An author entry is either on a profile or has no author ID. Profiles also get merged and deleted. This section covers the IDs you may see in each case.

**An author entry with no profile has `author.id: null`** and keeps its printed name. This happens for names that aren't people, for works removed from a profile that no other profile took, and for the unmatched entries described below. The earlier system grouped such entries under a single NULL author, `A9999999999`, and used `A5317838346` for deleted authors. You may still see these in old files, but neither resolves in the API today.

**Merged author IDs usually still resolve.** When two profiles of the same person are merged, the API returns the surviving profile for the merged-away ID, filters on it return the surviving profile's works, and the snapshot lists every such pair in [`authors/merged_ids.csv.gz`](/access/sync/#merged-ids-merged_idscsvgz). This is best effort, not a permanence promise; store an ORCID alongside the ID if you need a link that lasts. A deleted profile's ID (one with no surviving profile) returns 404.

## Known failure modes

Disambiguation isn't perfect. It fails in three ways:

- **Splitting**: one person's works spread across several profiles. Creating a new profile when in doubt makes this more likely than a wrong merge.
- **Merging**: works from different people collapsed into one profile.
- **No profile**: most author entries on the roughly 4 million works first added from 4 November to 19 December 2025 have `author.id: null`. More generally, an entry on an older work that has no profile is not re-matched automatically.

All three are fixed by [correcting which works belong to the profile](/data/curations/), because [a profile is built from its works](/data/authors/#a-profile-is-built-from-its-works). For an entry with no profile, the person can [add the work to their profile](/how-to/fixing-authors/#how-do-i-add-or-remove-works). See [Fixing errors: Authors](/access/fixing-errors/authors/).

## History: the July 2023 upgrade

In July 2023, OpenAlex switched to the V3 clustering model. It weighed name similarity, co-authors, institutional affiliations, research topics, citation patterns and ORCID, and it matched new works until early November 2025. With that switch, all older author IDs were deprecated and every author got a new ID. The old IDs and their works are preserved [as a data dump](https://zenodo.org/record/8189450). Author IDs since then have a numeric component above 5000000000 (used since late July 2023, and in snapshots from August 2023 onward).
