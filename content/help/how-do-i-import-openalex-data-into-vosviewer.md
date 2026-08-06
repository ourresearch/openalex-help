---
title: "How do I import OpenAlex data into VOSviewer?"
description: "VOSviewer builds and visualizes bibliometric networks — here's how to load OpenAlex data into it."
tags: ["general"]
source_id: "27218772811543"
source_url: "https://help.openalex.org/hc/en-us/articles/27218772811543-How-do-I-import-OpenAlex-data-into-VOSviewer"
source_updated: "2024-10-21"
---
[VOSviewer](https://www.vosviewer.com/) is an open source software tool that constructs and visualizes bibliometric network data. It's a powerful tool trusted by bibliometricians around the world and is completely free to use.

In the past, users needed to first download data files from whichever bibliometric database their institution subscribed to, import that data into VOSviewer, and then analyze it. Because OpenAlex data and API are also completely open, VOSviewer now supports direct integration with OpenAlex so that users don't have to download files first.

Now, anyone around the world can freely use the [openalex.org](https://openalex.org) user interface to create the query they want to analyze and simply copy and paste the URL from their web browser into VOSviewer without having to download a separate file. Here's how.

From openalex.org:

-   Design your query using any combination of our 40+ filters.
    -   if you haven't used our UI before or need a refresher, [check out this tutorial](https://www.youtube.com/watch?v=rGKF6jndCJw)
    -   if you need advanced support in designing and refining queries, [check out this webinar](https://www.youtube.com/watch?v=aoOjsdjLU2I)
    -   if you want an example, [try this one](https://openalex.org/works?page=1&filter=authorships.countries%3Acountries%2Fca,sustainable_development_goals.id%3Asdgs%2F13,publication_year%3A2018-) showing Canadian contributions to SDG 13: Climate Action since 2018 
-   Once you have settled on the query you would like to analyze, copy (Ctrl + C) the OpenAlex URL from your web browser. 

From VOSviewer:

-   click "create"
-   then, "Create a map based on bibliographic data"
-   then, "Download through the API"
    -   OpenAlex is the default
-   paste the URL (or API call) of your query into the "Request URL" field and hit next to specify your network
    -   note, VOSViewer only supports analyses with up to 50k records at a time, so you might need to add additional filters in the OpenAlex UI 

For more information on analyzing OpenAlex data with VOSviewer, check out this great webinar from Nees Jan van Eck, the lead developer of VOSviewer: [https://www.youtube.com/watch?v=ZNyi29IER90](https://www.youtube.com/watch?v=ZNyi29IER90)
