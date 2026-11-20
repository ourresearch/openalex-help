---
title: "Security"
updated: 2026-11-20
subtitle: "Found a security hole in OpenAlex, Unpaywall or Unsub? Tell us privately. We'll fix it, credit you, and publish what happened."
description: "How to report a security vulnerability in OpenAlex, Unpaywall or Unsub, what we do with a report, and the security advisories we've published."
---
## How to report

- **By email.** Write to [security@openalex.org](mailto:security@openalex.org). Only our security team reads it.
- **On GitHub.** Open the repository for the affected code at [github.com/ourresearch](https://github.com/ourresearch), go to its **Security** tab, and click **Report a vulnerability**. Only our maintainers see the report. Not sure which repository? Pick the closest one and we'll move it.

Please include what's affected (a URL, an API route, or a file and line), the steps to reproduce it, what an attacker could do with it, and how to reach you. Please don't post it in a public issue, the forum, or social media.

## What we do with a report

1. **Acknowledge it within 3 business days.**
2. **Confirm it** and keep you posted as we work on it.
3. **Fix it.** Serious holes get fixed in days; we aim to fix everything else within 90 days.
4. **Check our logs** for any sign someone used it before the fix.
5. **Publish an advisory** on GitHub once the fix is live, crediting you by name (or not, if you'd rather). When people can run the affected code themselves, we also request a CVE.

We ask that you give us up to 90 days before you share details publicly, and agree the date with us. If the fix lands sooner, we're happy to publish sooner.

## Testing guidelines

- Test only with accounts and data that are yours, or with our open-source code running on your own machine.
- Don't read, change, or delete other people's data. If you reach some by accident, stop there and tell us.
- Don't degrade the service for others: no denial-of-service tests and no high-volume scanning.
- Don't target our team with phishing, social engineering, or physical attacks.

If you act in good faith and follow these guidelines, we consider your research authorized, and we won't take legal action against you over it.

## Scope

**In scope:** openalex.org and its subdomains (including api.openalex.org), unpaywall.org, unsub.org, and the open-source code at [github.com/ourresearch](https://github.com/ourresearch).

**Not security holes:**

- **Reading OpenAlex or Unpaywall data.** It's open (CC0) on purpose. Found an error in the data? See [Fixing errors](/access/fixing-errors/).
- Automated scanner output with no working attack, and missing headers or settings that no attack uses.
- Email SPF, DKIM and DMARC settings; clickjacking on pages with no sensitive action; self-XSS.
- Holes in services we use (such as Cloudflare, Heroku or GitHub). Please report those to that company.

## Thanks and credit

We're a small nonprofit, so we don't pay bug bounties. We do credit every reporter in the advisory and on this page, and we're grateful.

## Advisories

| Published | Advisory | Affects | Severity | Credit |
|---|---|---|---|---|
| 17 Nov 2026 | [SQL injection and missing authorization in Unsub scenario routes](https://github.com/ourresearch/jump-api/security/advisories/GHSA-j65m-jwh9-39gg) (GHSA-j65m-jwh9-39gg; CVE requested) | Unsub's API ([jump-api](https://github.com/ourresearch/jump-api)) | Medium | Santosh Kumar Puppala |

Machine-readable contact details: [openalex.org/.well-known/security.txt](https://openalex.org/.well-known/security.txt) ([RFC 9116](https://www.rfc-editor.org/rfc/rfc9116)).
