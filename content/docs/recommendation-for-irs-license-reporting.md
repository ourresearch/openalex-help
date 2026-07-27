---
title: "Recommendation for IRs: License reporting"
description: "Unpaywall can report the license terms articles in your repository are distributed under. If you know the license, you can include it in the OAI-PMH record in a rights element l…"
tags: ["unpaywall"]
source_id: "41193790460055"
source_url: "https://help.openalex.org/hc/en-us/articles/41193790460055-Recommendation-for-IRs-License-reporting"
source_updated: "2026-06-13"
---
Unpaywall can report the license terms articles in your repository are distributed under. If you know the license, you can include it in the OAI-PMH record in a _rights_ element like this:

<dc:rights>https://creativecommons.org/licenses/by/4.0</dc:rights>
or
<dc:rights.license>CC BY-NC</dc:rights.license>

  

If an element like this isn't present, we'll look for a license statement inside any full text item we find. This is less accurate and relies on full license URLs or text patterns we've seen before, like "distributed under the terms ..." or "This is an open access article published under ..." which may not include the pattern used by your repository software. We recommend including the license in the OAI-PMH record as shown above.
