---
title: "How do I find a publication's OpenAlex work ID?"
description: "The OpenAlex Work ID is a unique identifier that refers to an OpenAlex work (e.g., publication, dataset, thesis, etc). All work IDs begin with a W and are followed by numbers, l…"
tags: ["how-do-i"]
source_id: "27526559172759"
source_url: "https://help.openalex.org/hc/en-us/articles/27526559172759-How-do-I-find-a-publication-s-OpenAlex-work-ID"
source_updated: "2024-11-03"
---
The OpenAlex Work ID is a unique identifier that refers to an OpenAlex work (e.g., publication, dataset, thesis, etc). All work IDs begin with a W and are followed by numbers, like _W2884670852._

To find the Work ID for a specific publication in OpenAlex, search for the publication at openalex.org using the information you know about it. For instance:

-   if you have the doi, you can type in doi: and then the doi to retrieve the exact work. for instance, "doi:10.1098/rspb.2018.0553" 
-   if you have the title of the publication, you can paste it in the main search bar and then select the work if it appears
    -   if the title is common and your publication doesn't appear in the first results, you can go to openalex.org/works and return all publications with that title by clicking the blue + sign near the top, selecting "title" under more, and then entering the title ([example](https://openalex.org/works?page=1&filter=display_name.search%3Akelp%20ecology))
-   if you have many DOIs and want to find the OpenAlex id for all of them, try the [Open Research Converter](https://orc-demo.gesis.org/)

Whenever you select a publication from the user interface, the URL with update, ending with the Work ID.

Tip: You can view the openalex work record in the user interface by adding openalex.org/works/ before the work id (e.g., openalex.org/works/W2884670852). If you want to see more information than is available for the work record in the user interface, add api. infront of that URL to get the API response (e.g., [api.openalex.org/works/W2884670852](https://api.openalex.org/works/W2884670852)) with the record's full information. For a list of all information available about works in OpenAlex, check out [our documentation here](/entities/works/#fields).
