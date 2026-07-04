# ClawdBot Cloudflare Installer

This Worker turns the GitHub installer into branded install surfaces:

```bash
curl -fsSL https://install.onchainai.fund | bash
curl -fsSL https://install.x402.wtf | bash
curl -fsSL https://x402.wtf/clawdbot | bash
curl -fsSL https://zk.x402.wtf/clawdbot | bash
```

`/` serves a tiny wrapper that sets `CLAWDBOT_INSTALL_COMPLETE=1` and runs the
canonical GitHub installer. `/install.sh` proxies the raw installer without
forcing complete mode.

## Deploy

```bash
npx wrangler deploy
```

The route configuration lives in `../wrangler.toml`.

## Cloudflare Setup

1. Put `onchainai.fund` and `x402.wtf` on Cloudflare.
2. Deploy the Worker with `npx wrangler deploy`.
3. Use a Worker custom domain for the exact `onchainai.fund` install host:

```text
install.onchainai.fund
```

4. Use Worker routes for `x402.wtf` installs while existing Vercel DNS records
   are present:

```text
install.x402.wtf/*
x402.wtf/clawdbot*
zk.x402.wtf/clawdbot*
```

For the `x402.wtf` routes, make sure the DNS records for `install.x402.wtf`,
`x402.wtf`, and `zk.x402.wtf` exist in Cloudflare, are proxied, and are not
blocked by a Cloudflare challenge rule. To convert `install.x402.wtf` into a
Worker custom domain, delete or replace its existing externally managed DNS
record first.

## Smoke Tests

```bash
curl -fsSL https://install.onchainai.fund/healthz
curl -fsSL https://install.onchainai.fund/.well-known/clawdbot-install.json
curl -fsSL https://install.onchainai.fund/install.sh | bash -n
curl -fsSL https://install.onchainai.fund | bash
```

## Routes

| Path | Behavior |
| --- | --- |
| `/` | Complete install wrapper |
| `/complete` | Complete install wrapper |
| `/full` | Complete install wrapper |
| `/core-ai` | Installer wrapper with `CLAWDBOT_INSTALL_CORE_AI=1` |
| `/install.sh` | Raw upstream installer proxy |
| `/raw` | Raw upstream installer proxy |
| `/lite` | Raw upstream installer proxy |
| `/healthz` | Plain health check |
| `/.well-known/clawdbot-install.json` | Installer metadata |
