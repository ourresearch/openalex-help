---
title: "What are alternate names and how I do change them?"
description: "The display_name_alternatives field on OpenAlex author profiles holds name variants for an author, and how to request changes to them."
tags: ["data"]
source_id: "27282148869399"
source_url: "https://help.openalex.org/hc/en-us/articles/27282148869399-What-are-alternate-names-and-how-I-do-change-them"
source_updated: "2024-10-23"
---
The alternate names field for OpenAlex author profiles ([display\_name\_alternatives](/data/authors/)) are the versions of the name that have been used on publications linked to an author profile. For instance, Kyle Demes ([A5086928770](https://openalex.org/authors/a5086928770)) has published papers using an author name of "K Demes", "Kyle W. Demes", and "Kyle Demes" and so all of these are included in his author profile as alternate names.

Sometimes authors change names and so the primary display name might not match their alternate names. But sometimes we also match author names incorrectly to an author's profile. For instance, our algorithmic matching might not have matched "Kyle William Glenn" to the same profile when it should have and it might have matched "Kyla Demers" when it should not have.

You cannot remove or add alternate names in an author profile since they are derived from the publications linked to that author. However, you can add or remove publications from an author profile [using this form](https://docs.google.com/forms/d/1WzSGs0AIPyghKuSHHzlh3uLJ2QOzz3UJ4feO8xZh_9o). When the missing works get added to the author profile or the incorrect works get removed from the profile, the alternate names will get updated automatically to reflect the names used on the revised publication lists.
