---
description: People who create works
---

# 👩 Authors

## 👩 Authors

Authors are people who create works.

We try to identify authors and their works automatically. We describe the ways we do this below. If you are an author, and you've noticed that some of your data in OpenAlex is incorrect, please let us know by using the [Author Profile Change Request Form](https://docs.google.com/forms/d/e/1FAIpQLSel6otVekIyVOl46eh59mSkruIz32hAnGbJR6KM925E8wiCSg/viewform?usp=sf_link).

## Author disambiguation

Our information about authors comes from MAG, Crossref, PubMed, ORCID, and publisher websites. We use an algorithm to [disambiguate](https://en.wikipedia.org/wiki/Author\_name\_disambiguation) authors; this uses an author’s name, their publication record, their citation patterns, and (where available) their ORCID.

So for example, if J. Schmidt and John Jacob Jingleheimer Schmidt both write about 19th-century ketchup production, we’ll treat them as one author–but we won’t include the JJJ Schmidt who writes about weasel migration (even though his name is their name, too).

You can read more about how we disambiguate authors in our [technical documentation here.](https://docs.openalex.org/api-entities/authors/author-disambiguation)

## Author profile curation

You may have noticed errors in the OpenAlex author profiles, such as incorrect information about yourself or someone you know.

Thank you to everyone who has reached out with curation requests to help improve the accuracy of individual author profiles in OpenAlex! We greatly value these contributions and are committed to continuing to support grass-roots curation of metadata.

The requests submitted so far have helped identify improvements with our author disambiguation system that will benefit many author profiles across our database in a systematic way.

Here's what we are currently working on:

* making improvements to our author disambiguation pipeline that better leverage existing ORCID data

* closing the loop with updated Crossref data (names and ORCIDs)

* building an author profile curation system to automate requests for common author profile errors (e.g., merging profiles; splitting profiles; adding or removing works from a profile)

We believe these enhancements will fix many of the outstanding curation request support tickets and so we are going to pause work on individual tickets so that we can focus on these systematic changes. 

If your request is urgent within the next few months, please write "urgent" in the subject of the [support ticket](https://openalex.org/feedback) and let us know the circumstances. Otherwise, check back again soon for when we launch the enhancements, and we hope to have an automated way of handling individual requests live.

Thanks for using OpenAlex and helping us to make it better for everyone!