---
title: "Advanced"
description: "The visual query builder at openalex.org — build complex queries without writing code."
tags: ["reference"]
---
The advanced query builder at [openalex.org](https://openalex.org) lets you build complex queries visually, without writing code. Where [basic](/access/website-basic/) search covers the common cases, the advanced builder lets you combine filters, group them, and express conditions that don't fit the point-and-click model.

## How it works

You assemble a query by adding filter clauses and combining them with **and** / **or**, grouping with parentheses as needed. As you build, the builder shows you the query in [OQL](/access/oql/), the OpenAlex Query Language — so what you build always *looks like* a valid OQL query, and you can flip between the point-and-click builder and the OQL text.

## Builder and OQL

The builder and OQL are two views of the same underlying query, but they don't cover exactly the same ground. The builder always produces valid OQL — but the reverse isn't true: **not all valid OQL can be expressed as an advanced-builder shape.** The builder covers the common shapes; some queries you can write in OQL by hand don't have a builder representation.

So the two work together: use the builder for the shapes it covers, and drop into the [OQL](/access/oql/) text when you need the full range. If you want the simpler no-code path instead, go back to [basic](/access/website-basic/).
