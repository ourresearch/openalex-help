---
title: "What is FWCI and how is it calculated?"
description: "A quick answer to what Field-Weighted Citation Impact means and how OpenAlex computes it."
tags: ["metrics"]
synonyms: ["FWCI", "field weighted citation impact", "citation impact", "normalized citations"]
canonical: /entities/works/#field-weighted-citation-impact
---
**Field-Weighted Citation Impact (FWCI)** tells you how a work's citation count compares to what's normal for similar work. It's `citations received ÷ citations expected`, where "expected" is the average for works of the same type, publication year, and [subfield](/entities/subfields/). A value of **1.0** means exactly average, **2.0** means twice the expected citations, and **0.5** means half.

Normalizing this way lets you compare across fields fairly — a chemistry paper and a mathematics paper accrue citations at very different rates, and FWCI accounts for that. Not every work gets one: work types that aren't expected to be cited (like paratext) are left out so they don't distort averages.

For the exact formula, the citation window, and how OpenAlex's FWCI compares to other databases', see [FWCI on the works page](/entities/works/#field-weighted-citation-impact).
