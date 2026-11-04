---
title: "Matching and merging"
updated: 2026-11-04
description: "How OpenAlex decides that two records are the same work: shared identifiers and declared links first, then rules that keep different items apart, then a trained matcher that joins a record only when it is very confident. What we merge, what we keep separate, and how to report a mistake."
tags: ["reference"]
synonyms: ["duplicate", "duplicates", "duplicate works", "merge", "merged works", "deduplication", "dedup", "same work", "two works", "preprint and published version", "versions", "location matching", "record linkage", "matcher", "wrong merge", "split"]
---
OpenAlex collects records of the same paper from many places: the publisher's record at Crossref, a preprint on arXiv, a PubMed entry, a copy in a university repository. Each record becomes a [location](/data/locations/). For every new record, OpenAlex makes one decision: does it belong to a work we already have, or is it a new work?

## How a new record finds its work

Every night, each new record takes this path. It stops as soon as it finds its work.

<figure class="mflow" aria-label="How a new record finds its work">
  <div class="mf-node mf-start"><b>A new record arrives</b><span>A journal article, a preprint, a repository copy, a PubMed entry…</span></div>
  <div class="mf-down" aria-hidden="true">↓</div>
  <div class="mf-step"><span class="mf-n">1</span><div><b>Does it share an ID with a work we have?</b><span>The same DOI, PubMed ID or arXiv ID, or a link the record declares itself: “preprint of”, “version of”.</span></div></div>
  <div class="mf-yes"><span class="mf-label">Yes →</span><span class="mf-out">Joins that work</span></div>
  <div class="mf-down"><span aria-hidden="true">↓</span> No</div>
  <div class="mf-step"><span class="mf-n">2</span><div><b>Find works that look like it</b><span>Similar titles, the same authors, close in meaning. Items that are never the same work, like a correction notice or a book chapter for an article, are set aside.</span></div></div>
  <div class="mf-down" aria-hidden="true">↓</div>
  <div class="mf-step"><span class="mf-n">3</span><div><b>Is the matcher confident one of them is the same work?</b><span>Two trained models compare the record with the closest candidates, side by side.</span></div></div>
  <div class="mf-yes"><span class="mf-label">Yes →</span><span class="mf-out">Joins that work</span></div>
  <div class="mf-down"><span aria-hidden="true">↓</span> No</div>
  <div class="mf-node mf-end"><b>Becomes a new work</b><span>When in doubt, we keep records apart: a duplicate is easier to fix than two different papers merged into one.</span></div>
</figure>

<style>
  .mflow { display: grid; grid-template-columns: minmax(0, 1fr) 10.5rem; column-gap: 0.75rem; margin: 1.5rem 0 1.75rem; font-size: 0.95rem; line-height: 1.45; }
  .mflow > .mf-node, .mflow > .mf-step, .mflow > .mf-down { grid-column: 1; }
  .mflow > .mf-yes { grid-column: 2; align-self: center; display: flex; align-items: center; gap: 0.5rem; }
  .mflow b { display: block; color: var(--ink); font-weight: 600; }
  .mflow span { color: var(--muted); }
  .mf-node, .mf-step { border: 1px solid var(--line-strong); border-radius: 10px; padding: 0.75rem 1rem; background: var(--bg); }
  .mf-start { background: var(--panel); }
  .mf-end { background: var(--panel-strong); border-color: var(--faint); }
  .mf-step { display: flex; gap: 0.75rem; align-items: flex-start; }
  .mf-n { flex: none; width: 1.6rem; height: 1.6rem; border-radius: 50%; background: var(--ink); color: var(--bg) !important; font-weight: 600; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; margin-top: 0.05rem; }
  .mf-down { text-align: center; padding: 0.3rem 0; font-size: 0.85rem; color: var(--muted); }
  .mf-down > span[aria-hidden] { font-size: 1.1rem; margin-right: 0.15rem; }
  .mf-label { white-space: nowrap; font-size: 0.85rem; }
  .mflow .mf-out { white-space: nowrap; background: var(--accent-wash); color: var(--accent); border: 1px solid var(--accent); border-radius: 999px; padding: 0.3rem 0.8rem; font-weight: 600; font-size: 0.9rem; }
  @media (max-width: 36rem) {
    .mflow { grid-template-columns: minmax(0, 1fr); }
    .mflow > .mf-yes { grid-column: 1; padding: 0.5rem 0 0 2.4rem; }
  }
  .prose details.mf-more { border: 1px solid var(--line); border-radius: 10px; padding: 0.6rem 1rem; margin: 0 0 1.5rem; }
  .prose details.mf-more summary { cursor: pointer; font-weight: 600; }
  .prose details.mf-more[open] summary { margin-bottom: 0.5rem; }
</style>

<details class="mf-more">
<summary>The steps in more detail</summary>

1. **Shared identifiers.** If a work already holds the record's DOI, PubMed ID or arXiv ID, the record joins that work. Most records are decided here.
2. **Declared links.** If the record says it is a version of another record, or the preprint of a published article, it joins that record's work. These links come from the record's own metadata: DataCite's `IsVersionOf` and `HasVersion`, and Crossref's `is-preprint-of` and `has-preprint`.
3. **Rules that keep items apart.** Some pairs are never the same work, however alike they look: a journal article and a conference paper, thesis, report or book chapter; a book and one of its chapters; an article and a correction notice or peer review. These pairs are ruled out before any scoring. The full list is [below](#separate-works).
4. **Finding candidates.** OpenAlex gathers the existing works the record could belong to: works that share a URL or repository ID with it, works with the same title, works by the same first author within two years, works with very similar titles, and works whose title and abstract are closest in meaning.
5. **Ranking.** A ranking model (gradient-boosted trees, about 90 measurements of how alike the record and each candidate are: titles, authors, years, venues, abstracts, identifiers) scores every candidate. If even the best candidate scores very low, the record becomes a new work.
6. **Reading.** A fine-tuned language model (Qwen3.5, 9 billion parameters) reads the record next to its 10 best candidates and gives each one a probability of being the same work. The record joins the top candidate only when that probability is 0.91 or higher; we set the bar high so that wrong merges are rare. When several candidates are copies of the same paper (a repository copy and an aggregator copy, say), their probabilities are added together, so the record joins that paper instead of starting yet another copy.
7. **Otherwise, a new work.** A record that no step joins starts a new work of its own.

</details>

Every decision is automatic and takes effect the same night.

### An example

The journal article *Heritability estimation of subcortical volumes in a multi-ancestry multi-site cohort study* arrived from Crossref in 2026 ([`10.1162/imag.a.1455`](https://doi.org/10.1162/imag.a.1455)). It shared no identifier with its 2024 bioRxiv preprint ([`10.1101/2024.01.11.575231`](https://doi.org/10.1101/2024.01.11.575231)). The matcher found the preprint's work among the candidates and joined them: [W4390839382](https://api.openalex.org/works/W4390839382?select=id,display_name,locations) now holds the article, the preprint, and their PubMed and PubMed Central copies.

## When it's unsure

The matcher's misses are mostly duplicates rather than wrong merges, because it starts a new work whenever it is unsure. The most common one is a repository sending again a copy of an item the work already holds.

## Training and code

The models were trained on 100,000 real records whose matches were labelled by a large language model (Anthropic's Claude Opus) and spot-checked by hand.

Everything behind the matcher is public: the code as it runs, the models, the training labels and every test set, with a tool that runs the same matcher on your own records. See [openalex-work-matcher on GitHub](https://github.com/ourresearch/openalex-work-matcher).

## What counts as one work

The rule of thumb for journal articles: **another journal publishing it under its own DOI makes it its own work**, in any language. **Copies, preprints and translated metadata of one journal's article join it.**

### One work

| These records | Example |
|---|---|
| Copies of the same item: a repository, aggregator, catalogue or library record of a published article, chapter, book, thesis or dataset. The same text deposited twice. | A university repository's copy of a journal article. |
| A preprint, submitted or accepted manuscript, working paper or discussion paper, and its published version, in whatever form the paper was published: journal article, chapter, conference paper, report, book or thesis. | The arXiv preprint and the journal article of *The NumPy Array* ([W2146292423](https://api.openalex.org/works/W2146292423?select=id,doi,locations)). See [DOIs](/data/works/dois/). |
| A paper with both a conference version and a journal article (which are two works, see below): its preprint joins the version it declares, and the journal article when it declares neither. | An arXiv preprint that names its journal DOI joins the journal article. |
| Versions of one deposit declared in DataCite: a concept DOI and its version DOIs, even when the title or type changes between versions. | A Zenodo record's concept and version DOIs; Figshare `.v1` and `.v2`; software releases. |
| The same item with its metadata in another language. | A translated, bilingual or machine-translated title or abstract; SciELO's per-language DOIs within one journal; the same paper deposited in two languages. |
| The same journal's article under a new DOI prefix or a new journal name. | |
| The same book edition in print and as an ebook, or reissued by another publisher. | The journal rule above does not apply to books. |

### Separate works

| These records | Example |
|---|---|
| The same article published by another journal under its own DOI, in any language: co-publications, syndicated pieces, translations, separately registered language editions. | *The PRISMA 2020 statement* in *BMJ* ([W3118615836](https://api.openalex.org/works/W3118615836)) and in *PLOS Medicine* ([W3148962211](https://api.openalex.org/works/W3148962211)); a German journal's article and its English translation journal's. |
| A conference version and the journal article, even in the same journal with the same title and authors. The same study presented at two meetings. | A meeting abstract in a journal supplement and the full paper. |
| A thesis or technical report and the article based on it. | A dissertation and the journal article drawn from it. |
| A book chapter and a journal article. | An article reprinted in an edited book. (A chapter's own preprint joins the chapter.) |
| Notices about a work: corrections, retractions, expressions of concern, comments, replies and peer reviews. | A correction carrying the article's exact title and authors. |
| A retracted article and its corrected republication under a new DOI. | |
| Parts of a work: a supplement, figure, table or dataset and the article; a book and its chapters or its reviews; a summary and the full report. This holds even when a dataset or software deposit declares itself a version of the article. | Replication data deposited on Zenodo for a journal article. |
| A new edition of a book; a revised version of a standard. | |
| Multi-part articles. | "… Part I" and "… Part II" by the same authors in the same journal. |
| Neighbours in a series or catalogue. | Monthly data uploads with templated titles; generic titles such as "Editorial" or "Book reviews". |
| Versions that don't declare themselves as versions. | Kaggle dataset versions. If you publish versions and want them shown as one work, link them in your DataCite metadata with `IsVersionOf` and `HasVersion`. |

Matching uses each record's [type](/data/work-types/) as given. When a copy carries the wrong type (a repository labelling a book chapter as an article, say), the type rules can keep it apart from its work; we fix the type rather than the match.

## Found a wrong merge or a duplicate?

Tell us. File a report with the work IDs (both works, for a duplicate) or the DOI that doesn't belong on a work, as described in [Fixing data errors](/how-to/fixing-data-errors/).
