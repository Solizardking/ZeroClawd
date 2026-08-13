#!/bin/bash
# Vendor the current-platform clawdbot binary and npm-pack the public package.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PKG="$ROOT/npm/clawdbot"
CLI="${CLI_BIN:-$ROOT/build/clawdbot}"
GOOS="$(go env GOOS)"
GOARCH="$(go env GOARCH)"

if [ ! -x "$CLI" ]; then
  echo "🦞 Building clawdbot CLI..."
  make -C "$ROOT" build
  CLI="$ROOT/build/clawdbot"
fi

DEST="$PKG/vendor/${GOOS}-${GOARCH}/clawdbot"
mkdir -p "$(dirname "$DEST")"
cp "$CLI" "$DEST"
chmod 755 "$DEST"
echo "✓ vendored $DEST"

(cd "$PKG" && npm pack --pack-destination "$ROOT/dist")
ls -lh "$ROOT/dist"/clawdbot-*.tgz | tail -n 1
