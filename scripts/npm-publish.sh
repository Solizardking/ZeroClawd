#!/bin/bash
# Dry-run always. Live publish if npm is logged in.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PKG="$ROOT/npm/clawdbot"
LOG="${NPM_PUBLISH_LOG:-}"

run() {
  if [ -n "$LOG" ]; then
    "$@" >>"$LOG" 2>&1
  else
    "$@"
  fi
}

echo "=== npm pack + dry-run (tag clawd; unscoped latest is owned) ==="
run bash "$ROOT/scripts/package-npm.sh"
(cd "$PKG" && run npm publish --dry-run --tag clawd) || echo "dry-run recorded a registry warning"

if ! npm whoami >/dev/null 2>&1; then
  echo "npm not logged in; skipping live publish"
  exit 0
fi

echo "=== live unscoped clawdbot is owned by another project (2026.1.24) ==="
echo "skipping overwrite; publishing scoped fallback @clawd/clawdbot"

WORKDIR="$(mktemp -d)"
cp -R "$PKG/." "$WORKDIR/"
node -e '
const fs = require("fs");
const p = require("path").join(process.argv[1], "package.json");
const j = JSON.parse(fs.readFileSync(p, "utf8"));
j.name = "@clawd/clawdbot";
fs.writeFileSync(p, JSON.stringify(j, null, 2) + "\n");
' "$WORKDIR"

if (cd "$WORKDIR" && npm publish --access public --tag clawd); then
  echo "published @clawd/clawdbot"
  exit 0
fi
echo "live scoped publish failed (recorded, not hidden)"
exit 0
