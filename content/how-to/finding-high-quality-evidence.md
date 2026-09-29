---
title: "Finding high-quality evidence"
updated: 2026-09-29
description: "Narrow any search to randomized controlled trials, systematic reviews and meta-analyses, see what kind of evidence a topic has, and compare what the strongest studies say with the literature as a whole."
tags: ["search"]
synonyms: ["RCT", "RCTs", "randomized controlled trial", "systematic review", "meta-analysis", "evidence", "evidence-based", "best evidence", "study design", "study type", "levels of evidence", "high-quality evidence"]
card: "Filter to RCTs, systematic reviews and meta-analyses, and compare them with everything else."
---
How far to trust a paper depends more on how the study was done than on where it was published. A randomized trial in a small journal can tell you more than an observational study in a famous one. OpenAlex tags works with their [study design](/data/study-designs/), so you can put the strongest evidence first.

## Filter to the strongest designs

Add a study design filter to any search. On openalex.org, for example: [randomized controlled trials that mention semaglutide](https://openalex.org/works?filter=default.search:semaglutide,study_designs.id:randomized-controlled-trial).

In the API, use `|` to combine designs:

```
https://api.openalex.org/works?search=semaglutide&filter=study_designs.id:randomized-controlled-trial|meta-analysis
```

Designs nest: every randomized controlled trial is also a clinical trial, and every meta-analysis is also a systematic review. So `study_designs.id:systematic-review` already includes the meta-analyses.

## See what kind of evidence a topic has

Group a search by design to see its evidence at a glance:

```
https://api.openalex.org/works?search=%22long%20covid%22&group_by=study_designs.id
```

A topic built mostly on observational studies and case reports is less settled than one with many trials and systematic reviews.

## Compare the strongest studies with everything else

Ask whether the trials agree with the rest of the literature. Pull the randomized trials and the other papers separately and compare what each group concludes. An [AI assistant connected to OpenAlex](/how-to/ai-assistants/) can do this for you. Try:

> Using OpenAlex, find the randomized controlled trials on intermittent fasting for weight loss (filter `study_designs.id:randomized-controlled-trial`) and a sample of the other papers on the same question. Summarize what each group concludes, and tell me where the trials agree or disagree with the rest.

To get everything except the trials, negate the filter: `study_designs.id:!randomized-controlled-trial`.

## Keep in mind

- **No tag doesn't mean no trial.** We tag only when we're confident, so we miss about 3 in 10 randomized trials. The negated filter above includes those.
- **Only works with an abstract are tagged.** Older papers and some journals have none in OpenAlex.
- **Design isn't a quality score.** A careful observational study can beat a sloppy trial. Design is a strong signal, not the whole story.
