---
title: "Why are some authors assigned to \"NULL AUTHOR_ID\" (A9999999999)?"
description: "There are two different scenarios where OpenAlex uses an author ID which falls outside of the normal author ID process. You may come across an OpenAlex Author with these IDs par…"
tags: ["data"]
source_id: "28763618477975"
source_url: "https://help.openalex.org/hc/en-us/articles/28763618477975-Why-are-some-authors-assigned-to-NULL-AUTHOR-ID-A9999999999"
source_updated: "2024-12-25"
---
There are two different scenarios where OpenAlex uses an author ID which falls outside of the normal author ID process. You may come across an OpenAlex Author with these IDs particularly if you use the data snapshot.

The first ID (A9999999999) is for "Null Authors" or "No Author ID". We use this author ID internally within the disambiguation system and is assigned to all authorships that do not go through disambiguation. Usually, this is because we did not receive an author name for that authorship, the name was too short to disambiguate (or way too long!), or it was a phrase we have specifically called out to ignore in our disambiguation process (for example, "'Unknown Unknown" or "Unknown Author"). Also, if an author requests to have their disambiguated author profile removed from OpenAlex, we will assign all works to this ID, effectively removing that author's profile from our data.

The second ID (A5317838346) is for "Deleted Authors" and is used when an author ID is removed from OpenAlex. Usually this occurs because the author ID no longer has any works associated with the ID either from works being merged or deleted.
