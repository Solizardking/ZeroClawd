#!/bin/bash
# Vendor the current-platform clawdbot binary and npm-pack the public packages.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

CLI="${CLI_BIN:-$ROOT/build/clawdbot}"
GOOS="$(go env GOOS)"
GOARCH="$(go env GOARCH)"

if [ ! -x "$CLI" ]; then
  echo "🦞 Building clawdbot CLI..."
  make -C "$ROOT" build
  CLI="$ROOT/build/clawdbot"
fi

vendor_cli() {
  local pkg="$1"
  local dest="$pkg/vendor/${GOOS}-${GOARCH}/clawdbot"
  mkdir -p "$(dirname "$dest")"
  cp "$CLI" "$dest"
  chmod 755 "$dest"
  echo "✓ vendored $dest"
}

vendor_cli "$ROOT/npm/clawdbot"
vendor_cli "$ROOT/npm/clawd-bot"

mkdir -p "$ROOT/dist"
(cd "$ROOT/npm/clawdbot" && npm pack --pack-destination "$ROOT/dist")
(cd "$ROOT/npm/clawd-bot" && npm pack --pack-destination "$ROOT/dist")
(cd "$ROOT/npm/zk-primitives" && npm pack --pack-destination "$ROOT/dist")
ls -lh "$ROOT/dist"/*clawd*.tgz "$ROOT/dist"/*zk-primitives*.tgz 2>/dev/null | tail -n 20
