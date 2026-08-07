---
title: "How do you match affiliation text to institutions?"
description: "A quick answer to how OpenAlex turns raw affiliation strings into institution IDs."
tags: ["institutions"]
synonyms: ["affiliation", "institution matching", "raw affiliation string", "RAS", "ROR"]
canonical: /data/institutions/#about
---
The affiliation printed on a paper is free text — "Dept. of Physics, Univ. of Washington, Seattle" — so OpenAlex has to figure out which real organization it names. It keeps that exact text as a [raw affiliation string](/data/raw-affiliation-strings/) and runs it through a matcher that maps it to one or more [institutions](/data/institutions/), each identified by a [ROR](https://ror.org/) ID.

The matcher combines a machine-learning model with rules, and it handles the messy cases: abbreviations, multiple institutions in one string, sub-units, and names in many languages. Like any prediction it can miss — a string may match the wrong organization or none at all — so institution assignments are [correctable](/help/how-can-i-correct-institutional-affiliations-for-a-work/).

For the full pipeline and its known limitations, see [how we build institutions](/data/institutions/#about).
