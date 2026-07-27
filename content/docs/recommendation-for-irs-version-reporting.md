---
title: "Recommendation for IRs: Version reporting"
description: "Unpaywall reports the version(https://help.openalex.org/hc/en-us/articles/41193818736663-Paper-version-definitions) of the full-text papers it finds."
tags: ["unpaywall"]
source_id: "41193790429975"
source_url: "https://help.openalex.org/hc/en-us/articles/41193790429975-Recommendation-for-IRs-Version-reporting"
source_updated: "2026-06-13"
---
Unpaywall reports the [version](https://help.openalex.org/hc/en-us/articles/41193818736663-Paper-version-definitions) of the full-text papers it finds.  

  

Unpaywall determines the version automatically, but in some cases it can improve accuracy for repositories to report version information when they know it.

  

If your repository knows the version of the PDF it is hosting, we recommend you put version information in the metadata as follows (based on the [DRIVER Guidelines v2.0 VERSION standard](https://wiki.surfnet.nl/display/DRIVERguidelines/DRIVER-VERSION+Mappings)):

  

-   <dc:type>publishedVersion</dc:type>  
    when you have verified that the PDF you are hosting is the version of record, with all publisher copyediting and formatting.  
      
    
-   <dc:type>acceptedVersion</dc:type>  
    when you have verified that the PDF you are hosting meets [this definition of acceptedVersion](https://help.openalex.org/hc/en-us/articles/41193818736663-Paper-version-definitions).  
      
    
-   <dc:type>submittedVersion</dc:type>  
    when you know the PDF you are hosting does **NOT** meet the definitions for publishedVersion or acceptedVersion (for example if it was uploaded before the paper was accepted for publication)

  

If you have not verified the version of the document you are hosting, don't specify version metadata  -- Unpaywall will determine it automatically.

  

In addition to this, if your repository has a policy of never hosting any submitted versions of papers, but only author accepted manuscripts or published versions of papers, email us and let us know.  We'll note this policy and tag your papers accordingly.
