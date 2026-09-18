---
title: "Repositories"
updated: 2026-09-18
description: "For repository managers: how to get harvested by OpenAlex, check your Harvest tab, allowlist our harvester, troubleshoot coverage, and report a problem so it gets fixed."
tags: ["data"]
synonyms: ["add my repository", "register repository", "institutional repository", "OAI-PMH endpoint", "not being harvested", "records missing", "harvest status", "DSpace", "EPrints", "Digital Commons", "firewall", "allowlist", "IP address", "user agent", "repository bug", "report a problem", "endpoint changed", "migrated repository", "expansion corpus", "coverage"]
card: "Get harvested, read your Harvest tab, and tell us what to fix — all by support ticket."
---
If you run a repository, OpenAlex is probably already harvesting it, and there's a lot you can do to make your records show up more completely and accurately. This page is the recipes. The mechanism (how harvesting, matching, and full-text detection actually work) lives in the [Repositories reference](/data/sources/repositories/).

Two words to keep straight: your **endpoint** is the OAI-PMH URL you run, and your **source** is the OpenAlex record we mint for your repository (`openalex.org/sources/S…`). You own the endpoint; we own the source. Fixes happen at the endpoint; results show up on the source.

Everything on this page ends the same way: if what you see doesn't explain itself, [file a support ticket](https://openalex.org/contact) and we'll take it from there. There's no form to fill in and no validator to run.

## How do I get my repository harvested by OpenAlex?

**First, check whether we already harvest you.** Search [our repository sources](https://openalex.org/sources?filter=type:repository) for your repository's name. If it's there, open it and click the **Harvest** tab: it shows the endpoint we have on file and when we last received records from it. If the endpoint is right and the status is healthy, you're in, and we'll keep checking you daily.

**If you're not listed, or the tab says we have no endpoint on file,** email [support@openalex.org](mailto:support@openalex.org?subject=Add%20my%20repository) (or use [openalex.org/contact](https://openalex.org/contact)) with:

```
Subject: Add my repository

Repository name: 
OAI-PMH endpoint URL: https://…/oai (the base URL, not your homepage)
Set (only if the endpoint serves several collections): 
Three or four example DOIs of open-access articles in the repository: 
```

That's the whole registration. We verify the endpoint, add it, and reply. If we need something else (a set name, a metadata prefix, an allowlist entry on your side) we'll ask; you don't need to validate anything before writing. Your receipt is the Harvest tab on your new source: once the endpoint is on file it appears there, and the first harvest pulls your whole back catalog, which can take a few days for a large or slow repository.

Running a **journal on OJS**? A journal belongs in [Crossref](/how-to/getting-indexed/#how-do-i-get-my-journal-indexed-in-openalex), not here, but OJS's built-in OAI-PMH endpoint can also be registered the same way. See [Getting indexed](/how-to/getting-indexed/#how-do-i-get-my-repository-indexed-in-openalex) for which path fits.

## Is my endpoint harvestable?

Most registration failures are the endpoint's own OAI-PMH quirks, and you can check all of them yourself in a browser before writing to us:

- **Give us the OAI-PMH base URL, not your homepage.** Test it: `https://your-endpoint/oai?verb=Identify` should return XML with your repository's name in it, and `…?verb=ListRecords&metadataPrefix=oai_dc` should return records. If either returns a web page or an error, that's not the URL we need. Typical shapes: `/oai/request` (DSpace), `/cgi/oai2` (EPrints), `/do/oai/` (Digital Commons), `/index.php/<journal>/oai` (OJS).
- **No login, API key, or IP restriction on the feed.** We fetch it anonymously. If you run a firewall or a bot-blocker in front of it, [allowlist us](#how-do-i-allowlist-openalexs-harvester).
- **A correct `earliestDatestamp` in your `Identify` response.** We start your first harvest there, and we read its format to decide whether to send dates with or without times. A date in the future or long after your oldest record silently truncates the back catalog.
- **Answer within 15 seconds per request.** That's our timeout. If your platform takes longer to warm up from cold, the first request of the day fails and we try again tomorrow. We make at most three requests to any host at once.
- **Serve `oai_dc`.** That is the metadata format we read. Records with an empty `<metadata>` element are skipped, not fatal.
- **A DOI and a title in each record**, so we can match it. Details in [Making your records match better](#how-can-i-make-my-records-match-better).

If everything above passes and you're still not harvested, [report it](#how-do-i-report-a-repository-problem); include the `Identify` URL and we'll look at the rest.

## How do I check OpenAlex's harvest of my repository?

Open your source on openalex.org and click **Harvest** (or go straight to `https://openalex.org/sources/S<id>?tab=harvest`). It is the live record of what we have from you and how the last attempt went. The tab is marked *beta*; the data is real.

**Harvest status.** *Last new records received* is the date we last stored a record we didn't already have. It only moves when your repository gives us something new, so a stable repository shows an old date and that's fine. *Next harvest* counts down to our next daily check.

**What we've harvested.** Three numbers, and they are different on purpose:

- *records (locations) harvested from this source*: every harvested record that parsed cleanly, one [location](/data/locations/) each. The API icon beside it opens the raw list: `api.openalex.org/locations?filter=source_id:S<id>`. This is the number to compare with your repository's own record count.
- *works include this source as a location*: how many works have at least one of your copies attached. Lower than the first number when several of your records describe the same paper.
- *works have this source as their primary location*: works where your copy is the main one, which usually means we found no publisher version. Lower still. See [Records are not works](/data/sources/repositories/#records-are-not-works) for why these diverge.

**Harvest history.** New records received per month since our first harvest. Early bars are large because the first harvests pull the back catalog. There's a CSV download.

**Endpoints on file.** The OAI-PMH URL (and set, and metadata prefix) we harvest, with two links: *Identify* opens your endpoint's `Identify` response, and *recent records* opens the same `ListRecords` request we send. If those links don't work in your browser, they don't work for us either. Under each endpoint is a health line: a green dot and *last harvest OK*, or a red dot with the status and the error your server returned, verbatim.

If the tab says *We don't have an OAI-PMH endpoint on file for this source*, we know the repository (usually from records that arrived some other way) but aren't harvesting it: [register the endpoint](#how-do-i-get-my-repository-harvested-by-openalex).

## What does my endpoint's harvest status mean?

The health line under each endpoint shows one of six statuses from our last attempt. The error text next to it is whatever your server or the protocol library said, unedited. We retry every failing endpoint the next day, so a fix on your side needs no re-registration; just watch the line turn green.

| Status | What happened | What to do |
|---|---|---|
| `last harvest OK` | We fetched the feed successfully. `0 records` here just means nothing changed in the date range we asked for; that's still OK. | Nothing. If records are missing anyway, see [records not showing up](#why-are-only-some-of-my-repositorys-records-showing-up). |
| `blocked` | Your server answered 401 or 403. A firewall, WAF, or bot-blocker refused us. | [Allowlist our IP and User-Agent](#how-do-i-allowlist-openalexs-harvester). |
| `timeout` | No response within 15 seconds. Cold-start delays, huge `ListRecords` pages, or an overloaded server. | Check the *recent records* link responds quickly. Keep the endpoint warm or shrink your page size. |
| `connection_error` | We couldn't reach the host, or it returned another HTTP error (404, 500, 502…). Includes a moved or retired URL. | Confirm the endpoint URL in your browser. If it changed, [tell us the new one](#we-changed-platforms-or-our-endpoint-url-moved). |
| `malformed` | The response wasn't valid XML, often an HTML error page or a truncated response. | Open the *recent records* link and check it's XML all the way down. |
| `oai_error` | Your server returned an OAI-PMH protocol error such as `badArgument`, `noSetHierarchy`, or `cannotDisseminateFormat`. The message names it. | Fix the thing it names: the set doesn't exist, `oai_dc` isn't served, or the date format we sent (derived from your `earliestDatestamp`) doesn't match what you accept. |

Anything else, or a status that stays red after you've fixed the cause, is a ticket: [report it](#how-do-i-report-a-repository-problem) with the status and the error text.

## Why are only some of my repository's records showing up?

Because a repository *record* isn't an OpenAlex *work*. When your record matches a paper we already know (from Crossref, DataCite, PubMed, another repository), it becomes a [location](/data/locations/) on that existing work rather than a new work of its own. Your source's work count is therefore the number of works that have you as a location, never a mirror of your record count. The full explanation is [Records are not works](/data/sources/repositories/#records-are-not-works) in the reference.

Matching also depends on metadata: records without a cleanly reported DOI, or a matchable title and first author, can fail to match, and a record whose only DOI is one your repository minted looks like a different paper to us. See [Why a repository seems to be missing most of its works](/data/sources/repositories/#why-a-repository-seems-to-be-missing-most-of-its-works).

To see exactly what we hold from you, use the *records (locations)* count on your Harvest tab and its API link: `api.openalex.org/locations?filter=source_id:S<id>`. Every record we harvested and kept is there, whether or not it matched.

## How do I see my repository's unmatched records?

Unmatched repository records aren't gone. Any record with a DOI or a usable title is minted as a work of its own, with your repository as its only source, and it sits in the core corpus like any other work. The exception is the backlog swept in at the November 2025 Walden cutover: those were minted into the [**expansion corpus**](/data/works/corpus/), which is excluded from API results by default. To include them, add `corpus=all` to your query:

```
api.openalex.org/works?filter=locations.source.id:S4306402521&corpus=all
```

For many repositories this changes the count dramatically. (Data quality in the expansion corpus is lower on average and improving.)

## Why did my repository's work count go down?

Usually because coverage got better, not worse. A work counts toward *works have this source as their primary location* only while your copy is the main one. When we later find the publisher's version of record, your copy stays on the work as its green-OA location but stops being primary, and the primary count drops. Nothing was removed. Compare the two queries:

```
api.openalex.org/works?filter=locations.source.id:S<id>          # every work with your copy
api.openalex.org/works?filter=primary_location.source.id:S<id>   # works where your copy is primary
```

If the *first* number dropped, or the *records (locations)* count on your Harvest tab did, that's a real loss and we want to hear about it: [report it](#how-do-i-report-a-repository-problem) with both numbers and the date you noticed.

## We changed platforms or our endpoint URL moved

Email us the old URL and the new one (plus a set name, if the new endpoint needs one), and we'll swap it on your source. Until we do, your Harvest tab will show the old endpoint going red with `connection_error`; after the swap, the next daily run picks up from where the old one stopped. Platform migrations often restamp every record's datestamp, which makes your whole catalog look new to us: that's fine, we re-fetch it and dedupe against what we already have. Watch the Harvest tab for the first green line on the new endpoint.

## How do I allowlist OpenAlex's harvester?

Our OAI-PMH harvester runs from a single static IP address and identifies itself in every request:

```
IP address:  18.213.181.255
User-Agent:  OpenAlexHarvester/1.0 (+https://help.openalex.org/how-to/repositories/; mailto:support@openalex.org)
```

Allowlist the IP, or the User-Agent, or both. This applies to **OAI-PMH harvesting only**. Fetching landing pages and PDFs to find full text uses rotating addresses we can't promise, and blocking those costs you open-access detection, so don't restrict it to the IP above. When we first verify a newly registered endpoint we may probe it once from a different address with a User-Agent that also starts with `OpenAlex`; if your firewall logs a block during registration, that's what it was.

## How often do you harvest, and how long until a new deposit shows up?

Daily. One run checks every registered endpoint for records changed since its last successful harvest (re-overlapping by a day so nothing at the boundary is missed). A deposit made today is normally in OpenAlex within a day or two of harvest, once it has been parsed and matched. A newly registered repository's first run fetches the entire back catalog in one pass; for a large or slow endpoint that can take days. If your Harvest tab's *last new records received* date doesn't move after you deposit, check that the record's datestamp actually changed: we ask for records by `from` date, so a deposit stamped in the past isn't new to us.

## How can I make my records match better?

Three metadata habits make the biggest difference:

1. **Report DOIs cleanly.** A record with the published version's DOI matches reliably; without one, matching falls back to title + first author. If you also mint your own DOI for a deposit, keep the publisher's DOI in the record too.
2. **Put the license in the record.** A `dc:rights` element with a license URL beats hoping we detect the license from the full text. See [License reporting](/data/sources/repositories/#license-reporting) for the exact format.
3. **Report the version when you've verified it.** `publishedVersion`, `acceptedVersion`, or `submittedVersion` in a `dc:type` element, see [Version reporting](/data/sources/repositories/#version-reporting). This one has funder-compliance stakes: a paper reported as `submittedVersion` when you hold the accepted manuscript can look non-compliant downstream. If you haven't verified the version, leave it out and we'll determine it automatically.

## How do I report a repository problem?

Email [support@openalex.org](mailto:support@openalex.org?subject=Repository%20problem) or use [openalex.org/contact](https://openalex.org/contact). Before you write, spend two minutes on the Harvest tab: it answers most "are you harvesting us?" questions, and its error text is the first thing we'd ask for.

A report we can act on has five things. The one that matters most is **several examples**: one record can be a coincidence, five is a pattern we can fix.

```
Subject: Repository problem: <one line, e.g. "accepted manuscripts showing as submittedVersion">

OpenAlex source: https://openalex.org/sources/S<id>
OAI-PMH endpoint: https://…/oai   (the base URL, not your homepage)
Harvest tab status + error text, if any:

What's wrong: 
What we expected: 

Examples (3–5, ideally both a case that works and cases that don't):
  https://openalex.org/W…   DOI 10.…   OAI record id oai:…   what's wrong with this one
  …

If it's about counts: which number, from where, and what you expected instead.
```

Paste evidence into the message rather than attaching a screenshot; we read the text, and links we can click are worth more than pictures of them. If a record is wrong in OpenAlex but right in your repository, say so, and include the OAI record identifier so we can look at what your endpoint served us.

Things to check first, because they're the usual answers:

- Is it a **count** question? Read [why only some records show up](#why-are-only-some-of-my-repositorys-records-showing-up) and [why the count went down](#why-did-my-repositorys-work-count-go-down).
- Is it an **OA status or license** question on a specific work? That's a data-error report, not a harvest problem: see [How do I fix a work's open-access status?](/how-to/fixing-data-errors/#how-do-i-fix-a-works-open-access-status). Check the PDF is reachable from outside your campus network first.
- Is it a **harvest failure**? The status table [above](#what-does-my-endpoints-harvest-status-mean) says what each one means and what fixes it.

Whatever it is, if it isn't explained by the time you've looked, write to us. We'd rather read a ticket than have you guess.
