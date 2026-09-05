# Nearr website hosting

## Production configuration

- Provider: Vercel
- Account/team: `andrewmahran7s-projects`
- Project: `nearr-web`
- Project ID: `prj_co38Va94il5wGXQopQzhKOxqacOV`
- Framework: Next.js App Router
- Node.js: `24.x` (pinned in `package.json`)
- Package manager: npm, using `package-lock.json`
- Install command: `npm ci`
- Build command: `npm run build`
- Output: Vercel's native Next.js output
- Production branch: `main`
- Canonical origin: `https://nearrapp.com`
- Redirect: `https://www.nearrapp.com/:path*` ->
  `https://nearrapp.com/:path*` with status 308

The Vercel project is connected to
`https://github.com/AndrewMahran7/nearr-web`. Pushes to `main` create
Production deployments. Other branches and pull requests create Preview
deployments.

## Environment variables

Only public browser configuration is used. Never place secrets in variables
whose names start with `NEXT_PUBLIC_`.

| Name | Scope | Requirement |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Required; set to `https://nearrapp.com` |
| `NEXT_PUBLIC_APP_STORE_URL` | Any | Optional; the checked-in Apple URL is the default |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Any | Optional; the checked-in support address is the default |

Preview builds intentionally omit `NEXT_PUBLIC_SITE_URL`. They remain
non-canonical and non-indexable instead of advertising a preview hostname.

## Domain and DNS

The domain is registered and DNS-hosted by Network Solutions (WorldNIC
nameservers). Both domains are attached to the Vercel project. Vercel manages
their TLS certificates after DNS points to its edge.

The required web-only DNS records are:

| Type | Name | Value |
| --- | --- | --- |
| `A` | `@` | `216.198.79.1` |
| `A` | `@` | `64.29.17.1` |
| `CNAME` | `www` | `38074872c67eede8.vercel-dns-017.com` |

These are the exact highest-priority targets returned by
`vercel domains verify` during the initial setup. Change only the existing
parking records for `@` and `www`.
Do not remove or replace MX, SPF, DKIM, DMARC, verification, or unrelated TXT
records if any are added later. Do not replace the domain's nameservers.

After a DNS change, verify configuration and certificate issuance:

```powershell
npx vercel@latest domains verify nearrapp.com
npx vercel@latest domains verify www.nearrapp.com
Resolve-DnsName nearrapp.com -Type A
Resolve-DnsName www.nearrapp.com -Type A
curl.exe -I https://nearrapp.com
curl.exe -I https://www.nearrapp.com/test-path
```

The `www` project-domain entry is configured with `redirect=nearrapp.com` and
`redirectStatusCode=308`, so Vercel preserves the requested path while sending
traffic to the apex domain.

## Deploy and verify

Normal releases use Git integration:

1. Push a feature branch and verify its Vercel Preview deployment.
2. Run `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, and
   `npm run build` locally.
3. Merge the exact tested commit to `main`.
4. Wait for the corresponding Vercel Production deployment to report Ready.
5. Smoke-test the apex, `www` redirect, metadata, assets, dynamic routes, and
   404 response over public HTTPS.

For an authorized manual deployment of the current clean commit:

```powershell
npx vercel@latest deploy
npx vercel@latest deploy --prod
```

Vercel exposes build output, deployment logs, and runtime/function logs in the
project's Deployments and Logs views. The CLI equivalents include
`vercel inspect`, `vercel logs`, and `vercel list nearr-web`.

## Future public place and well-known routes

Vercel's native Next.js deployment supports a future App Router route at
`src/app/p/[id]/page.tsx`, including server-side data lookup and
`generateMetadata` for per-place Open Graph cards. The current generic fallback
remains at `/place/[id]`; this hosting setup does not constrain the new `/p`
contract.

Universal Links and App Links files should be added only when their real IDs
and fingerprints are known:

- `public/.well-known/apple-app-site-association`
- `public/.well-known/assetlinks.json`

Files under `public/.well-known` are served at the exact root paths by Next.js.
Do not deploy fabricated placeholders.

## Rollback

Before this setup, the domain resolved to a Network Solutions parking address
and there was no `nearr-web` Vercel deployment to restore.

For an application rollback, select a previous known-good Production deployment
in Vercel and use Instant Rollback, or run:

```powershell
npx vercel@latest rollback <deployment-id-or-url> --yes
```

Then verify the apex and `www` routes. Leave DNS pointed at Vercel unless the
Vercel service itself must be abandoned; application rollbacks do not require a
DNS change.
