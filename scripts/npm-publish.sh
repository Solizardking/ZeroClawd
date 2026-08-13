#!/bin/bash
# Dry-run always. Live publish if npm is logged in.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOG="${NPM_PUBLISH_LOG:-}"

run() {
  if [ -n "$LOG" ]; then
    "$@" >>"$LOG" 2>&1
  else
    "$@"
  fi
}

echo "=== npm pack + dry-run (The Clawd Bot scoped packages) ==="
run bash "$ROOT/scripts/package-npm.sh"

for pkg in clawdbot clawd-bot zk-primitives; do
  (cd "$ROOT/npm/$pkg" && run npm publish --dry-run --access public) || echo "dry-run recorded a registry warning for $pkg"
done

if ! npm whoami >/dev/null 2>&1; then
  echo "npm not logged in; skipping live publish"
  echo "Run: npm login"
  echo "Then: make npm-publish"
  exit 0
fi

echo "=== live publish @clawd/clawdbot @clawd/clawd-bot @clawd/zk-primitives ==="
failed=0
for pkg in clawdbot clawd-bot zk-primitives; do
  if (cd "$ROOT/npm/$pkg" && npm publish --access public); then
    echo "published $(node -p "require('./package.json').name")"
  else
    echo "live publish failed for npm/$pkg"
    failed=1
  fi
done
exit "$failed"
