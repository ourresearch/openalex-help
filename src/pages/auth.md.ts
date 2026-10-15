import type { APIRoute } from 'astro';

// auth.md (oxjob #1697): how an AI agent gets credentials for OpenAlex, in the shape of WorkOS's auth.md convention
// (https://github.com/workos/auth.md), which agent-auth scanners look for. The one method today is an API key an
// agent asks for on its user's behalf; the details live on the Authentication page, linked below.
export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL('https://help.openalex.org')).href.replace(/\/$/, '');
  const body = `---
title: OpenAlex agent authentication
description: How AI agents get an API key for OpenAlex, the free index of the world's research.
canonical: ${base}/auth.md
last-updated: 2026-10-15
---

# auth.md

This file describes how AI agents can get credentials for the OpenAlex API.

**Resource:** https://api.openalex.org
**Auth spec:** https://github.com/workos/auth.md

---

## Without credentials

Every endpoint works with no key, on a free daily budget ($0.10) shared by everyone on the caller's network
(an IPv4 address or an IPv6 /64). A key gives the caller a budget of its own.

## Supported Registration Methods

### API key, requested by an agent for its user

- **identity_types_supported:** \`["email"]\`
- **credential_types_supported:** \`["api_key"]\`
- **register_uri:** https://api.openalex.org/api-keys (POST, JSON \`{"email": "<your user's email>"}\`; GET it for instructions)
- **guide:** ${base}/api/authentication/#getting-a-key-for-your-user

We email the address a link; when the person clicks it, the key starts working, with a free account's $1 a day.
Until then, requests with the key get a 403 (key_not_activated). The key is for API calls only: it can't sign in
to openalex.org, and the person can revoke it there. Ask your user for their real
address; placeholders and addresses that already have an account are refused.

### API key, from the person's account

- **credential_types_supported:** \`["api_key"]\`
- **where:** https://openalex.org/settings/api-key (the person signs up at https://openalex.org/signup)

## Using the key

Send it as \`api_key=KEY\` on any request, or as an \`Authorization: Bearer KEY\` header. Keep it in an
environment variable (\`OPENALEX_API_KEY\`), not in code you share.

## Discovery Documents

- llms.txt: ${base}/llms.txt
- API root: https://api.openalex.org/
- LLM quick reference: ${base}/api/llm-quick-reference/

## Support

support@openalex.org
`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
