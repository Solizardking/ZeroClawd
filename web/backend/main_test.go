package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/8bitlabs/clawdbot/pkg/config"
	"github.com/8bitlabs/clawdbot/pkg/strategy"
	"github.com/8bitlabs/clawdbot/pkg/trading"
)

func TestHealthAPIHandler(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/health", nil)
	rr := httptest.NewRecorder()
	healthAPIHandler().ServeHTTP(rr, req)

	if rr.Code != http.StatusOK {
		t.Fatalf("status = %d, want 200", rr.Code)
	}
	if ct := rr.Header().Get("Content-Type"); !strings.Contains(ct, "application/json") {
		t.Fatalf("Content-Type = %q, want application/json", ct)
	}

	var body map[string]string
	if err := json.Unmarshal(rr.Body.Bytes(), &body); err != nil {
		t.Fatalf("decode health body: %v\nraw: %s", err, rr.Body.String())
	}
	if body["status"] != "ok" {
		t.Fatalf("status = %q, want ok", body["status"])
	}
	if body["agent"] == "" {
		t.Fatal("agent identity field is empty")
	}
	// Contract must match the pure payload helper used by the live handler.
	want := healthPayload()
	if body["status"] != want["status"] || body["agent"] != want["agent"] {
		t.Fatalf("body = %#v, want %#v", body, want)
	}
}

func TestRedactedConfigMasksSecrets(t *testing.T) {
	cfg := config.DefaultConfig()
	cfg.ModelList[0].APIKey = "model-secret"
	cfg.Channels.Telegram.Token = "telegram-secret"
	cfg.Channels.Discord.Token = "discord-secret"
	cfg.Providers.OpenRouter.APIKey = "openrouter-secret"
	cfg.Providers.Anthropic.APIKey = "anthropic-secret"
	cfg.Providers.OpenAI.APIKey = "openai-secret"
	cfg.Providers.Groq.APIKey = "groq-secret"
	cfg.Providers.Ollama.APIKey = "ollama-secret"
	cfg.Providers.NVIDIA.APIKey = "nvidia-secret"
	cfg.Solana.HeliusAPIKey = "helius-secret"
	cfg.Solana.BirdeyeAPIKey = "birdeye-secret"
	cfg.Solana.JupiterAPIKey = "jupiter-secret"
	cfg.Solana.AsterAPIKey = "aster-key"
	cfg.Solana.AsterAPISecret = "aster-secret"
	cfg.Solana.WalletKeyPath = "/home/user/.config/solana/id.json"
	cfg.Supabase.ServiceKey = "supabase-secret"

	got := redactedConfig(cfg)

	secrets := []string{
		got.ModelList[0].APIKey,
		got.Channels.Telegram.Token,
		got.Channels.Discord.Token,
		got.Providers.OpenRouter.APIKey,
		got.Providers.Anthropic.APIKey,
		got.Providers.OpenAI.APIKey,
		got.Providers.Groq.APIKey,
		got.Providers.Ollama.APIKey,
		got.Providers.NVIDIA.APIKey,
		got.Solana.HeliusAPIKey,
		got.Solana.BirdeyeAPIKey,
		got.Solana.JupiterAPIKey,
		got.Solana.AsterAPIKey,
		got.Solana.AsterAPISecret,
		got.Solana.WalletKeyPath,
		got.Supabase.ServiceKey,
	}
	for _, value := range secrets {
		if value != "<redacted>" {
			t.Fatalf("secret was not redacted: %q", value)
		}
	}
	if cfg.ModelList[0].APIKey != "model-secret" {
		t.Fatal("redactedConfig mutated the input config")
	}
}

func TestVaultStatusDoesNotExposeValues(t *testing.T) {
	root := t.TempDir()
	writeWebTestFile(t, filepath.Join(root, ".env.local"), `
CLAWDBOT_VAULT_ENABLED=1
CLAWDBOT_VAULT_ALLOWED_IPS=127.0.0.1
CLAWDBOT_VAULT_TOKEN=vault-token
HELIUS_API_KEY=helius-secret
`)
	req := httptest.NewRequest(http.MethodGet, "/api/vault/status", nil)
	req.RemoteAddr = "127.0.0.1:1234"
	rec := httptest.NewRecorder()

	vaultStatusHandler(root).ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status code = %d, body=%s", rec.Code, rec.Body.String())
	}
	body := rec.Body.String()
	if strings.Contains(body, "helius-secret") || strings.Contains(body, "vault-token") {
		t.Fatalf("status leaked secret values: %s", body)
	}
	if !strings.Contains(body, `"keys":1`) || !strings.Contains(body, `"clientIpAllowed":true`) {
		t.Fatalf("status missing expected metadata: %s", body)
	}
}

func TestVaultKeyRequiresAllowedIPAndBearer(t *testing.T) {
	root := t.TempDir()
	writeWebTestFile(t, filepath.Join(root, ".env.local"), `
CLAWDBOT_VAULT_ENABLED=1
CLAWDBOT_VAULT_ALLOWED_IPS=203.0.113.7
CLAWDBOT_VAULT_TOKEN=vault-token
HELIUS_API_KEY=helius-secret
`)

	noToken := httptest.NewRequest(http.MethodGet, "/api/vault/key?name=HELIUS_API_KEY", nil)
	noToken.RemoteAddr = "203.0.113.7:1234"
	rec := httptest.NewRecorder()
	vaultKeyHandler(root).ServeHTTP(rec, noToken)
	if rec.Code != http.StatusUnauthorized {
		t.Fatalf("missing token code = %d", rec.Code)
	}

	deniedIP := httptest.NewRequest(http.MethodGet, "/api/vault/key?name=HELIUS_API_KEY", nil)
	deniedIP.RemoteAddr = "198.51.100.9:1234"
	deniedIP.Header.Set("Authorization", "Bearer vault-token")
	rec = httptest.NewRecorder()
	vaultKeyHandler(root).ServeHTTP(rec, deniedIP)
	if rec.Code != http.StatusForbidden {
		t.Fatalf("denied IP code = %d", rec.Code)
	}

	allowed := httptest.NewRequest(http.MethodGet, "/api/vault/key?name=HELIUS_API_KEY", nil)
	allowed.RemoteAddr = "203.0.113.7:1234"
	allowed.Header.Set("Authorization", "Bearer vault-token")
	rec = httptest.NewRecorder()
	vaultKeyHandler(root).ServeHTTP(rec, allowed)
	if rec.Code != http.StatusOK {
		t.Fatalf("allowed code = %d, body=%s", rec.Code, rec.Body.String())
	}
	if !strings.Contains(rec.Body.String(), "helius-secret") {
		t.Fatalf("expected secret value in authorized response: %s", rec.Body.String())
	}
}

func TestVaultExportExcludesControlKeys(t *testing.T) {
	root := t.TempDir()
	writeWebTestFile(t, filepath.Join(root, ".env.local"), `
CLAWDBOT_VAULT_ENABLED=1
CLAWDBOT_VAULT_ALLOWED_IPS=127.0.0.1
CLAWDBOT_VAULT_TOKEN=vault-token
HELIUS_API_KEY=helius-secret
`)
	req := httptest.NewRequest(http.MethodGet, "/api/vault/export", nil)
	req.RemoteAddr = "127.0.0.1:1234"
	req.Header.Set("Authorization", "Bearer vault-token")
	rec := httptest.NewRecorder()

	vaultExportHandler(root).ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status code = %d, body=%s", rec.Code, rec.Body.String())
	}
	body := rec.Body.String()
	if !strings.Contains(body, "export HELIUS_API_KEY='helius-secret'") {
		t.Fatalf("export missing key: %s", body)
	}
	if strings.Contains(body, "CLAWDBOT_VAULT_TOKEN") {
		t.Fatalf("export leaked control key: %s", body)
	}
}

func TestStrategyParamsFromConfig(t *testing.T) {
	cfg := config.DefaultConfig()
	params := strategyParamsFromConfig(cfg)
	if params.EMASlowPeriod != cfg.Strategy.EMASlowPeriod || params.EMAFastPeriod != cfg.Strategy.EMAFastPeriod {
		t.Fatal("strategy params did not map EMA periods from config")
	}
	// The mapped params must drive a runnable backtest end-to-end.
	res := strategy.Backtest(demoBars(300), params, params.EMASlowPeriod+5)
	if res.Trades != res.Wins+res.Losses {
		t.Fatalf("backtest inconsistent: %d != %d + %d", res.Trades, res.Wins, res.Losses)
	}
}

func writeWebTestFile(t *testing.T, path, content string) {
	t.Helper()
	if err := os.WriteFile(path, []byte(content), 0o600); err != nil {
		t.Fatal(err)
	}
}

func TestPortfolioLimitsFromConfig(t *testing.T) {
	cfg := config.DefaultConfig()
	limits := portfolioLimitsFromConfig(cfg)
	if limits.MaxConcurrent <= 0 {
		t.Fatal("expected positive MaxConcurrent")
	}
	if limits.MaxPerAsset != cfg.Solana.MaxPositionSOL {
		t.Fatalf("MaxPerAsset = %.4f, want %.4f", limits.MaxPerAsset, cfg.Solana.MaxPositionSOL)
	}
	// A flat book within limits should be allowed.
	got := limits.CheckEntry("SOL", cfg.Solana.MaxPositionSOL/2, trading.OpenExposure{
		PeakEquity: 10, Equity: 10, SessionStartEquity: 10,
	})
	if !got.Allowed {
		t.Fatalf("expected healthy entry allowed: %v", got.Reasons)
	}
}

func TestDemoSeriesShapes(t *testing.T) {
	closes, highs, lows := demoSeries()
	if len(closes) == 0 || len(highs) != len(closes) || len(lows) != len(closes) {
		t.Fatalf("demoSeries lengths mismatch: %d/%d/%d", len(closes), len(highs), len(lows))
	}
	for i := range closes {
		if highs[i] < closes[i] || lows[i] > closes[i] {
			t.Fatalf("bar %d violates high>=close>=low invariant", i)
		}
	}
}

func TestCorsAllowedOrigin(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "http://127.0.0.1:18800/api/status", nil)
	if err != nil {
		t.Fatal(err)
	}
	req.Host = "127.0.0.1:18800"

	if !corsAllowedOrigin(req, "http://127.0.0.1:18800") {
		t.Fatal("same-origin request was rejected")
	}
	if corsAllowedOrigin(req, "http://evil.example") {
		t.Fatal("cross-origin request was allowed without explicit config")
	}

	t.Setenv("CLAWDBOT_CORS_ORIGINS", "https://console.example")
	if !corsAllowedOrigin(req, "https://console.example") {
		t.Fatal("configured origin was rejected")
	}
}

func TestClientIPTrustsProxyHeadersOnlyWhenEnabled(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "http://localhost/api/install", nil)
	if err != nil {
		t.Fatal(err)
	}
	req.RemoteAddr = "192.0.2.1:3456"
	req.Header.Set("X-Forwarded-For", "203.0.113.7")

	if got := clientIP(req); got != "192.0.2.1" {
		t.Fatalf("clientIP trusted proxy header by default: %q", got)
	}

	t.Setenv("CLAWDBOT_TRUST_PROXY_HEADERS", "1")
	if got := clientIP(req); got != "203.0.113.7" {
		t.Fatalf("clientIP ignored trusted proxy header: %q", got)
	}
}
