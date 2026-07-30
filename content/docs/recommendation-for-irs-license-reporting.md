---
title: "Recommendation for IRs: License reporting"
description: "How institutional repositories should report article licenses in OAI-PMH metadata (dc:rights elements) so OpenAlex records them accurately."
tags: ["unpaywall"]
source_id: "41193790460055"
source_url: "https://help.openalex.org/hc/en-us/articles/41193790460055-Recommendation-for-IRs-License-reporting"
source_updated: "2026-06-13"
---
OpenAlex reports the [license](/docs/open-access/#licenses) that articles in your repository are distributed under. If you know the license, you can include it in the OAI-PMH record in a _rights_ element like this:

```xml
<dc:rights>https://creativecommons.org/licenses/by/4.0</dc:rights>
```
or
```xml
<dc:rights.license>CC BY-NC</dc:rights.license>
```

If an element like this isn't present, OpenAlex looks for a license statement inside any full-text item it finds. This is less accurate: it relies on full license URLs or text patterns seen before, like "distributed under the terms ..." or "This is an open access article published under ...", which may not include the pattern used by your repository software. We recommend including the license in the OAI-PMH record as shown above.

## Related pages

- [Repository records](/docs/repository-records/) — how repository records are harvested, matched, and located
- [Open Access](/docs/open-access/) — what counts as an open license, and how licenses affect OA status
