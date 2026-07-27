---
title: "How do we decide if a given journal is fully OA?"
description: "We set the oa\\status of an article to “gold” if that article is published in a fully OA journal. We have three steps to decide if a given journal is fully OA."
tags: ["unpaywall"]
source_id: "41193790227991"
source_url: "https://help.openalex.org/hc/en-us/articles/41193790227991-How-do-we-decide-if-a-given-journal-is-fully-OA"
source_updated: "2026-06-13"
---
We set the oa\_status of an article to “gold” if that article is published in a fully OA journal. We have three steps to decide if a given journal is fully OA.

To start with, we ask **is it in the Directo****ry of Open Access Journals (DOAJ)?** If it’s in DOAJ, we know the journal is fully OA. In the schema, it looks like:

  

journal\_is\_oa=true

journal\_is\_in\_doaj=true

However, not all fully OA journals are indexed in DOAJ, particularly smaller titles and journals published in the developing world. So for journals **not** indexed by DOAJ, we do some additional work to determine if they are fully OA. 

As we continue, keep this in mind: DOAJ verifies the credibility and legitimacy of journals in its index. _Unpaywall does not._ That’s not our gig... we just monitor access status, and leave the whitelisting to the great folks at DOAJ. This is why we include both journal\_is\_oa and journal\_is\_in\_doaj in the data schema - depending on the kind of questions you’re asking, you may want one or the other.

So, for journals not in DOAJ, we do three additional checks:

First, **is it a known fully-OA publisher?** We maintain a small whitelist of publishers that we know only publish OA content (for instance, many publishers using the SciELO model). If the journal’s publisher is on this list, it’s a fully OA journal, even though it’s not in DOAJ. In the schema, that looks like:

journal\_is\_oa=true

journal\_is\_in\_doaj=false

Second, **does the journal publish only OA articles?** Since we index the complete output of over 70,000 journals, we’re able to check our database to see if a given journal publishes exclusively OA content. If they do, they’re a fully OA journal, even if they’re not listed in DOAJ. This determination is made automatically to help us credit smaller publishers who might not know about DOAJ or have the resources to register. We also individually set some journals to Fully OA after manual review.

A cool thing is that we can detect “flipped” journals this way, by observing that they’ve been publishing exclusively OA since some “flip date” in the past (when they flipped from toll-access to OA). An OA article in that journal _before_ the flip would be hybrid/bronze, since it’s published in a toll-access journal. After the flip, an OA article in that same journal would be called gold, since it’s published in a (now) fully OA journal.

If a journal isn’t in DOAJ, but we did determine it’s fully OA, the schema will show this:

  

journal\_is\_oa=true

journal\_is\_in\_doaj=false
