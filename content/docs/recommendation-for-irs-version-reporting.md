---
title: "Recommendation for IRs: Version reporting"
description: "How institutional repositories should report paper versions (publishedVersion, acceptedVersion, submittedVersion) in OAI-PMH metadata so OpenAlex records them accurately."
tags: ["unpaywall"]
source_id: "41193790429975"
source_url: "https://help.openalex.org/hc/en-us/articles/41193790429975-Recommendation-for-IRs-Version-reporting"
source_updated: "2026-06-13"
---
OpenAlex reports the [version](/docs/versions/) of the full-text papers it finds.

OpenAlex determines the version automatically, but in some cases it can improve accuracy for repositories to report version information when they know it.

  

If your repository knows the version of the PDF it is hosting, we recommend you put version information in the metadata as follows (based on the [DRIVER Guidelines v2.0 VERSION standard](https://wiki.surfnet.nl/display/DRIVERguidelines/DRIVER-VERSION+Mappings)):

  

-   `<dc:type>publishedVersion</dc:type>`  
    when you have verified that the PDF you are hosting is the version of record, with all publisher copyediting and formatting.  
      
    
-   `<dc:type>acceptedVersion</dc:type>`  
    when you have verified that the PDF you are hosting meets [the definition of acceptedVersion](/docs/versions/).  
      
    
-   `<dc:type>submittedVersion</dc:type>`  
    when you know the PDF you are hosting does **NOT** meet the definitions for publishedVersion or acceptedVersion (for example if it was uploaded before the paper was accepted for publication)

  

If you have not verified the version of the document you are hosting, don't specify version metadata — OpenAlex will determine it automatically.

  

In addition to this, if your repository has a policy of never hosting any submitted versions of papers, but only author accepted manuscripts or published versions of papers, [let us know](https://openalex.org/contact). We'll note this policy and tag your papers accordingly.

## Related pages

- [Repository records](/docs/repository-records/) — how repository records are harvested, matched, and located
- [Versions](/docs/versions/) — publishedVersion, acceptedVersion, and submittedVersion definitions
