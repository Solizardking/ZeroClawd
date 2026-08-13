#!/bin/bash
# Build Clawd Bot.app + a studio-style drag-to-Applications DMG.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

VERSION="${VERSION:-$(git describe --tags --always --dirty 2>/dev/null || echo dev)}"
DIST="$ROOT/dist/macos"
DMG_ROOT="$DIST/dmg"
APP_BIN="$DIST/ClawdBot"
ICON_SRC_JPG="$ROOT/packaging/macos/icon-src.jpg"
ICON_PNG="$ROOT/packaging/macos/icon-1024.png"
ICONSET="$DIST/icon.iconset"
ICNS="$ROOT/packaging/macos/icon.icns"
BG_SRC="$ROOT/packaging/macos/dmg-background.jpg"
CLI="${CLI_BIN:-$ROOT/build/clawdbot}"
DMG_OUT="$DIST/Clawd-Bot.dmg"

mkdir -p "$DIST" "$ROOT/packaging/macos"

if [ ! -x "$CLI" ]; then
  echo "🦞 Building clawdbot CLI..."
  make -C "$ROOT" build
  CLI="$ROOT/build/clawdbot"
fi

if [ ! -f "$ICNS" ]; then
  echo "🦞 Building lobster icon.icns..."
  if [ -f "$ICON_SRC_JPG" ]; then
    sips -s format png -z 1024 1024 "$ICON_SRC_JPG" --out "$ICON_PNG" >/dev/null
  elif [ ! -f "$ICON_PNG" ]; then
    echo "missing $ICON_SRC_JPG (lobster source icon)" >&2
    exit 1
  fi
  rm -rf "$ICONSET"
  mkdir -p "$ICONSET"
  for size in 16 32 64 128 256 512 1024; do
    sips -z "$size" "$size" "$ICON_PNG" --out "$ICONSET/icon_${size}x${size}.png" >/dev/null
  done
  cp "$ICONSET/icon_32x32.png" "$ICONSET/icon_16x16@2x.png"
  cp "$ICONSET/icon_64x64.png" "$ICONSET/icon_32x32@2x.png"
  cp "$ICONSET/icon_256x256.png" "$ICONSET/icon_128x128@2x.png"
  cp "$ICONSET/icon_512x512.png" "$ICONSET/icon_256x256@2x.png"
  cp "$ICONSET/icon_1024x1024.png" "$ICONSET/icon_512x512@2x.png"
  iconutil -c icns "$ICONSET" -o "$ICNS"
fi

echo "🦞 Compiling windowed Clawd Bot..."
swiftc -O -o "$APP_BIN" \
  -framework Cocoa -framework WebKit \
  "$ROOT/packaging/macos/main.swift"

echo "🦞 Staging DMG root..."
go run "$ROOT/packaging/macos/stage.go" \
  -root "$DMG_ROOT" \
  -bin "$CLI" \
  -app-bin "$APP_BIN" \
  -icon "$ICNS" \
  -html "$ROOT/packaging/macos/studio.html" \
  -version "$VERSION"

if [ -f "$BG_SRC" ]; then
  mkdir -p "$DMG_ROOT/.background"
  sips -s format png -z 480 800 "$BG_SRC" --out "$DMG_ROOT/.background/background.png" >/dev/null || true
fi

echo "🦞 Creating $DMG_OUT..."
rm -f "$DMG_OUT"
hdiutil create \
  -volname "Clawd Bot" \
  -srcfolder "$DMG_ROOT" \
  -ov -format UDZO \
  "$DMG_OUT" >/dev/null

echo "✓ $DMG_OUT"
ls -lh "$DMG_OUT"
