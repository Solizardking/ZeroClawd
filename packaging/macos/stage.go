// Command stage builds a Grok-like Clawd Bot.app and optional DMG root.
//
//	go run ./packaging/macos/stage.go -root dist/macos/dmg -bin build/clawdbot -icon packaging/macos/icon.icns -app-bin dist/macos/ClawdBot
package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"

	"github.com/8bitlabs/clawdbot/pkg/config"
	"github.com/8bitlabs/clawdbot/pkg/packaging"
)

func main() {
	root := flag.String("root", "dist/macos/dmg", "DMG source folder")
	bin := flag.String("bin", "build/clawdbot", "clawdbot CLI to embed")
	appBin := flag.String("app-bin", "", "windowed MacOS executable (ClawdBot)")
	icon := flag.String("icon", "packaging/macos/icon.icns", "icns path")
	html := flag.String("html", "packaging/macos/studio.html", "studio HTML")
	version := flag.String("version", config.GetVersion(), "bundle version")
	flag.Parse()

	if err := os.RemoveAll(*root); err != nil {
		fatal(err)
	}
	if err := os.MkdirAll(*root, 0o755); err != nil {
		fatal(err)
	}

	execPath := *appBin
	if execPath == "" {
		execPath = *bin
	}
	opts := packaging.AppOptions{
		Version:      *version,
		BinaryPath:   execPath,
		IconPath:     *icon,
		ResourceHTML: *html,
	}
	if err := packaging.StageDMGRoot(*root, opts); err != nil {
		fatal(err)
	}

	app := packaging.AppBundlePath(*root, packaging.DefaultAppName)
	cliDest := filepath.Join(app, "Contents", "MacOS", "clawdbot-cli")
	if err := copyFile(*bin, cliDest, 0o755); err != nil {
		fatal(fmt.Errorf("embed clawdbot-cli: %w", err))
	}
	if err := packaging.ValidateDMGRoot(*root); err != nil {
		fatal(err)
	}
	fmt.Printf("staged %s\n", app)
}

func copyFile(src, dst string, mode os.FileMode) error {
	data, err := os.ReadFile(src)
	if err != nil {
		return err
	}
	if err := os.MkdirAll(filepath.Dir(dst), 0o755); err != nil {
		return err
	}
	return os.WriteFile(dst, data, mode)
}

func fatal(err error) {
	fmt.Fprintf(os.Stderr, "stage: %v\n", err)
	os.Exit(1)
}
