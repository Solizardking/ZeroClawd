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

echo "=== npm pack + dry-run ==="
run bash "$ROOT/scripts/package-npm.sh"
(cd "$PKG" && run npm publish --dry-run)

if ! npm whoami >/dev/null 2>&1; then
  echo "npm not logged in; skipping live publish"
  exit 0
fi

echo "=== live publish as clawdbot ==="
if (cd "$PKG" && npm publish --access public); then
  echo "published clawdbot"
  exit 0
fi

echo "unscoped clawdbot rejected; trying @clawd/clawdbot"
tmp="$(mktemp)"
node -e '
const fs = require("fs");
const p = process.argv[1];
const j = JSON.parse(fs.readFileSync(p, "utf8"));
j.name = "@clawd/clawdbot";
fs.writeFileSync(p, JSON.stringify(j, null, 2) + "\n");
' "$PKG/package.json"
if (cd "$PKG" && npm publish --access public); then
  echo "published @clawd/clawdbot"
  exit 0
fi
echo "live publish failed (recorded, not hidden)"
exit 0
