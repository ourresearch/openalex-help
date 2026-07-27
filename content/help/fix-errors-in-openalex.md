---
title: "Fix errors in OpenAlex"
description: "There are lots of ways that errors can get into OpenAlex. There may be an error in one of our upstream data sources (like Crossref or a repository). It's also possible an error…"
tags: ["general"]
source_id: "27714298573719"
source_url: "https://help.openalex.org/hc/en-us/articles/27714298573719-Fix-errors-in-OpenAlex"
source_updated: "2025-01-27"
---
There are lots of ways that errors can get into OpenAlex. There may be an error in one of our upstream data sources (like Crossref or a repository). It's also possible an error was fixed upstream, but hasn't yet been updated in our system yet. Or perhaps Crossref didn't have the metadata field and when we tried to get it from an open access PDF, we grabbed the metadata incorrectly. It's also possible the metadata was accurate upstream, we got the metadata correctly, and something else happened (like we matched it incorrectly).

Our development team is currently on changes to the OpenAlex guts code that will make it easier for any OpenAlex user to fix any type of error they find. We'll bake those features into the OpenAlex user interface once they're ready (by Spring 2025).

In the meantime, the best way to submit curation requests for common errors is to use our google forms:

-   [Fixing Author Profiles](https://docs.google.com/forms/d/e/1FAIpQLSeHpt3yWbWoB5MK1K6wVWThI5fglZzk-GPniaih0JT_rCMdYA/viewform?usp=sf_link)
-   [Fixing Source Profiles](https://docs.google.com/forms/d/e/1FAIpQLSehRQBTvckqFhmbTLruRxu-GEOuaIpZWGBI4PDGcI4E4kZqWQ/viewform?usp=sf_link)
-   [Fixing Work records](https://docs.google.com/forms/d/e/1FAIpQLScUcNZdqOBFxVJ0oihjeHFilm9IqqWKQY4WDmmqgxUNGr3R1g/viewform?usp=sf_link)

If the errors you've found are related to affiliation metadata and matching, you should first make sure your institution's ROR record is correct (and update it, if needed). Then you can use the works-magnet to fix our algorithmic matching. [More on that here](https://help.openalex.org/hc/en-us/articles/27204855162007-I-think-my-institution-is-missing-works-in-OpenAlex-What-can-I-do).

For all other errors, send us a ticket: [support@openalex.org](mailto:support@openalex.org)
