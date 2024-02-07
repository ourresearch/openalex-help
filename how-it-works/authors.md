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

