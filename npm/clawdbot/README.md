# clawdbot

The **ClawdBot** CLI — Zero Clawd sovereign Solana trading intelligence.

```bash
npm i -g clawdbot
clawdbot version
clawdbot agent -m "What is SOL price?"
clawdbot ooda --sim
clawdbot solana trending
```

Or without a global install:

```bash
npx clawdbot version
```

This package wraps the same Go `clawdbot` binary the repo builds with `make build`.
The packed tarball from `make npm-pack` vendors the current-platform binary so a
fresh consumer can run `npx clawdbot` with no extra toolchain.

If the unscoped name `clawdbot` is already owned on the public registry, publish
uses `@clawd/clawdbot` instead. The `clawdbot` bin name stays the same.

macOS desktop install: download `Clawd Bot.dmg` and drag **Clawd Bot** into
Applications — same studio layout as Grok Bot.
