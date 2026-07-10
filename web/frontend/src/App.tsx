import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { API_ENDPOINTS, GROUP_META, type FeatureGroup } from './api/registry'
import {
  mapCouncil,
  mapDoctor,
  mapHealth,
  mapLaws,
  mapLife,
  mapMiddleout,
  mapOptimize,
  mapPortfolio,
  mapSize,
  mapTrending,
  mapVaultKeys,
  mapVaultStatus,
  mapVenues,
  type DisplayMetric,
  type DisplayRow,
} from './api/mappers'

/* ── Legacy + extended payload types (loose where external APIs vary) ── */

interface Connector { name: string; status: string; type: string }
interface StatusInfo {
  status: string; version: string; agent: string; config: string
  dna_path?: string; uptime: string; mode: string
  go_version: string; go_os: string; go_arch: string
  num_cpu: number; goroutines: number
}
interface HealthInfo { status: string; agent: string }
interface PackageInfo { name: string; path: string; file_count: number; description?: string }
interface EnvInfo { AGENT_MODE: string; HOSTNAME: string; PWD: string; SHELL: string }
interface EcosystemInfo { runtime_repo: string; hub_repo: string; gateway: string; terminal: string }
interface CockpitInfo {
  mode: string; watchlist: string[]
  readiness: { score: number; grade: string; status: string; reasons: string[] }
  risk: {
    maxPositionSol: number; positionSizePct: number
    stopLossPct: number; takeProfitPct: number
    minSignalStrength: number; minConfidence: number
  }
}
interface AgentDNA {
  agent: { name: string; role: string }
  sequence: { length: number; value: string }
  metrics: { gcContent: number; pamSites: unknown[]; tataBoxes: unknown[]; utilityScore: number; stabilityBand: string }
  proof: { dnaId: string; sequenceSha256: string }
  attestation: { status: string; network: string; pdaSeed: string }
}
interface DNAInfo { path: string; created: boolean; dna: AgentDNA }
interface SignalInfo {
  samples: number
  signal: {
    direction: string; strength: number; rsi: number
    emaFast: number; emaSlow: number; emaCross: string
    atr: number; stopLoss: number; takeProfit: number; reasoning: string
  }
}
interface BacktestInfo {
  bars: number
  result: {
    trades: number; wins: number; losses: number; winRate: number
    totalReturn: number; avgReturn: number; maxDrawdown: number
    profitFactor: number; sharpe: number; equityCurve: number[]
  }
}
interface PriceEntry { mint: string; usdPrice: number; priceChange24h: number; liquidity: number }
interface PricesInfo {
  ok: boolean; source: string; asOf: string; count?: number; error?: string
  prices: Record<string, PriceEntry>
}
interface PerpsToken {
  token: string; long_io: number; short_io: number
  open_interest: number; leverage: number; bias_text: string
}
interface PerpsInfo {
  ok: boolean; source: string; asOf: string; error?: string; tokens?: PerpsToken[]
}

async function fetchJSON<T>(path: string): Promise<T | null> {
  try {
    const r = await fetch(path)
    if (!r.ok) return null
    return (await r.json()) as T
  } catch {
    return null
  }
}

function MetricGrid({ metrics }: { metrics: DisplayMetric[] }) {
  return (
    <div className="metric-grid">
      {metrics.map((m) => (
        <div key={m.label} className={`metric ${m.tone ?? 'neutral'}`}>
          <div className="value">{m.value}</div>
          <div className="label">{m.label}</div>
        </div>
      ))}
    </div>
  )
}

function RowList({ rows }: { rows: DisplayRow[] }) {
  if (!rows.length) return <div className="empty">No rows</div>
  return (
    <div className="row-list">
      {rows.map((r) => (
        <div key={r.key} className="row">
          <div>
            <div className="primary">{r.primary}</div>
            {r.secondary && <div className="secondary">{r.secondary}</div>}
          </div>
          {r.badge && <span className={`badge ${r.tone ?? 'neutral'}`}>{r.badge}</span>}
        </div>
      ))}
    </div>
  )
}

function Sparkline({ data, width = 260, height = 48 }: { data: number[]; width?: number; height?: number }) {
  if (!data || data.length < 2) {
    return <div className="muted" style={{ fontSize: '0.75rem' }}>no equity data</div>
  }
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / span) * height
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  const up = data[data.length - 1] >= data[0]
  const stroke = up ? 'var(--neon)' : 'var(--red)'
  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Backtest equity curve"
      style={{ display: 'block', marginTop: 6 }}
    >
      <title>Backtest equity curve</title>
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function LifeCanvas({ cells, rows, cols }: { cells: number[][]; rows: number; cols: number }) {
  if (!rows || !cols || !cells.length) return <div className="empty">No life frame yet</div>
  // Downsample large grids for DOM budget.
  const stepR = rows > 40 ? Math.ceil(rows / 40) : 1
  const stepC = cols > 70 ? Math.ceil(cols / 70) : 1
  const displayRows: number[][] = []
  for (let r = 0; r < rows; r += stepR) {
    const line: number[] = []
    for (let c = 0; c < cols; c += stepC) {
      line.push(cells[r]?.[c] ? 1 : 0)
    }
    displayRows.push(line)
  }
  return (
    <div
      className="life-grid"
      style={{ gridTemplateColumns: `repeat(${displayRows[0]?.length || 1}, 1fr)` }}
      aria-label="Game of Life grid"
    >
      {displayRows.flatMap((line, ri) =>
        line.map((on, ci) => <div key={`${ri}-${ci}`} className={`life-cell ${on ? 'on' : ''}`} />),
      )}
    </div>
  )
}

const GROUPS: FeatureGroup[] = ['core', 'trading', 'market', 'governance', 'compute', 'ops']

export default function App() {
  const [status, setStatus] = useState<StatusInfo | null>(null)
  const [health, setHealth] = useState<HealthInfo | null>(null)
  const [connectors, setConnectors] = useState<Connector[]>([])
  const [packages, setPackages] = useState<PackageInfo[]>([])
  const [envInfo, setEnvInfo] = useState<EnvInfo | null>(null)
  const [ecosystem, setEcosystem] = useState<EcosystemInfo | null>(null)
  const [cockpit, setCockpit] = useState<CockpitInfo | null>(null)
  const [signal, setSignal] = useState<SignalInfo | null>(null)
  const [backtest, setBacktest] = useState<BacktestInfo | null>(null)
  const [prices, setPrices] = useState<PricesInfo | null>(null)
  const [perps, setPerps] = useState<PerpsInfo | null>(null)
  const [dnaInfo, setDNAInfo] = useState<DNAInfo | null>(null)
  const [lawsRaw, setLawsRaw] = useState<unknown>(null)
  const [doctorRaw, setDoctorRaw] = useState<unknown>(null)
  const [portfolioRaw, setPortfolioRaw] = useState<unknown>(null)
  const [optimizeRaw, setOptimizeRaw] = useState<unknown>(null)
  const [venuesRaw, setVenuesRaw] = useState<unknown>(null)
  const [trendingRaw, setTrendingRaw] = useState<unknown>(null)
  const [sizeRaw, setSizeRaw] = useState<unknown>(null)
  const [lifeRaw, setLifeRaw] = useState<unknown>(null)
  const [middleoutRaw, setMiddleoutRaw] = useState<unknown>(null)
  const [councilRaw, setCouncilRaw] = useState<unknown>(null)
  const [vaultStatusRaw, setVaultStatusRaw] = useState<unknown>(null)
  const [vaultKeysRaw, setVaultKeysRaw] = useState<unknown>(null)
  const [configText, setConfigText] = useState('')
  const [showConfig, setShowConfig] = useState(false)
  const [logs, setLogs] = useState<string[]>(['🦞 ClawdBot ops console online.'])
  const [activeNav, setActiveNav] = useState('status')
  const logRef = useRef<HTMLDivElement>(null)

  const pushLog = useCallback((line: string) => {
    setLogs((prev) => [`${new Date().toLocaleTimeString()}  ${line}`, ...prev].slice(0, 40))
  }, [])

  const fetchAll = useCallback(async () => {
    const [
      st, h, conn, pkgs, env, eco, cock, sig, bt, pr, pe, dna,
      laws, doc, port, opt, ven, trend, size, life, mid, council, vault,
    ] = await Promise.all([
      fetchJSON<StatusInfo>('/api/status'),
      fetchJSON<HealthInfo>('/api/health'),
      fetchJSON<Connector[]>('/api/connectors'),
      fetchJSON<PackageInfo[]>('/api/packages'),
      fetchJSON<EnvInfo>('/api/env'),
      fetchJSON<EcosystemInfo>('/api/ecosystem'),
      fetchJSON<CockpitInfo>('/api/trading/cockpit'),
      fetchJSON<SignalInfo>('/api/trading/signal'),
      fetchJSON<BacktestInfo>('/api/trading/backtest'),
      fetchJSON<PricesInfo>('/api/market/prices'),
      fetchJSON<PerpsInfo>('/api/market/perps'),
      fetchJSON<DNAInfo>('/api/dna'),
      fetchJSON<unknown>('/api/laws'),
      fetchJSON<unknown>('/api/doctor'),
      fetchJSON<unknown>('/api/trading/portfolio'),
      fetchJSON<unknown>('/api/trading/optimize'),
      fetchJSON<unknown>('/api/perps/venues'),
      fetchJSON<unknown>('/api/market/trending'),
      fetchJSON<unknown>('/api/size'),
      fetchJSON<unknown>('/api/life'),
      fetchJSON<unknown>('/api/middleout'),
      fetchJSON<unknown>('/api/lobster-council'),
      fetchJSON<unknown>('/api/vault/status'),
    ])

    if (st) setStatus(st)
    if (h) setHealth(h)
    if (conn) setConnectors(conn)
    if (pkgs) setPackages(pkgs)
    if (env) setEnvInfo(env)
    if (eco) setEcosystem(eco)
    if (cock) setCockpit(cock)
    if (sig) setSignal(sig)
    if (bt) setBacktest(bt)
    if (pr) setPrices(pr)
    if (pe) setPerps(pe)
    if (dna) setDNAInfo(dna)
    if (laws) setLawsRaw(laws)
    if (doc) setDoctorRaw(doc)
    if (port) setPortfolioRaw(port)
    if (opt) setOptimizeRaw(opt)
    if (ven) setVenuesRaw(ven)
    if (trend) setTrendingRaw(trend)
    if (size) setSizeRaw(size)
    if (life) setLifeRaw(life)
    if (mid) setMiddleoutRaw(mid)
    if (council) setCouncilRaw(council)
    if (vault) setVaultStatusRaw(vault)
  }, [])

  useEffect(() => {
    fetchAll().then(() => pushLog('synced feature surfaces'))
    const interval = setInterval(() => {
      fetchAll()
    }, 10000)
    return () => clearInterval(interval)
  }, [fetchAll, pushLog])

  // Step Game of Life a bit faster for a living panel.
  useEffect(() => {
    const id = setInterval(() => {
      fetchJSON<unknown>('/api/life').then((life) => {
        if (life) setLifeRaw(life)
      })
    }, 1200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = 0
  }, [logs])

  const healthView = useMemo(() => mapHealth(health), [health])
  const laws = useMemo(() => mapLaws(lawsRaw), [lawsRaw])
  const doctor = useMemo(() => mapDoctor(doctorRaw), [doctorRaw])
  const portfolio = useMemo(() => mapPortfolio(portfolioRaw), [portfolioRaw])
  const optimize = useMemo(() => mapOptimize(optimizeRaw), [optimizeRaw])
  const venues = useMemo(() => mapVenues(venuesRaw), [venuesRaw])
  const trending = useMemo(() => mapTrending(trendingRaw), [trendingRaw])
  const size = useMemo(() => mapSize(sizeRaw), [sizeRaw])
  const life = useMemo(() => mapLife(lifeRaw), [lifeRaw])
  const middleout = useMemo(() => mapMiddleout(middleoutRaw), [middleoutRaw])
  const council = useMemo(() => mapCouncil(councilRaw), [councilRaw])
  const vaultStatus = useMemo(() => mapVaultStatus(vaultStatusRaw), [vaultStatusRaw])
  const vaultKeys = useMemo(() => mapVaultKeys(vaultKeysRaw), [vaultKeysRaw])

  const connected = connectors.filter((c) => c.status === 'connected' || c.status === 'public' || c.status === 'configured').length
  const total = connectors.length

  const loadVaultKeys = async () => {
    const data = await fetchJSON<unknown>('/api/vault/keys')
    if (data) {
      setVaultKeysRaw(data)
      pushLog('vault key inventory loaded (names only)')
    } else {
      pushLog('vault keys unavailable (auth/disabled)')
      setVaultKeysRaw({ keys: [] })
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="brand-mark" aria-hidden>🦞</div>
          <div>
            <h1>CLAWDBOT OS</h1>
            <div className="sub">Sovereign ops console · Solana agent runtime</div>
          </div>
        </div>
        <div className="header-right">
          <span className={`pill ${healthView.ok ? 'ok' : 'err'}`}>
            <span className={`dot pulse`} />
            {healthView.label}
          </span>
          <span className="pill">{status?.version ?? '—'}</span>
          <span className="pill">{status?.mode || 'simulated'}</span>
          <span className="pill">{status?.uptime ?? '…'}</span>
        </div>
      </header>

      <nav className="rail" aria-label="Feature navigation">
        {GROUPS.map((g) => (
          <div key={g} className="rail-section">
            <div className="rail-title">{GROUP_META[g].title}</div>
            {API_ENDPOINTS.filter((e) => e.group === g && e.poll).map((e) => (
              <a
                key={e.id}
                href={`#panel-${e.id}`}
                className={activeNav === e.id ? 'active' : ''}
                onClick={() => setActiveNav(e.id)}
              >
                {e.label}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <main className="main">
        <div className="hero-strip">
          <div className="stat-card">
            <div className="label">Runtime</div>
            <div className="value">{status?.status ?? '…'}</div>
            <div className="hint">{status?.go_version} · {status?.go_os}/{status?.go_arch}</div>
          </div>
          <div className="stat-card">
            <div className="label">Connectors</div>
            <div className="value">{connected}/{total || '—'}</div>
            <div className="hint">{status?.num_cpu ?? '—'} cores · {status?.goroutines ?? '—'} goroutines</div>
          </div>
          <div className="stat-card">
            <div className="label">Readiness</div>
            <div className="value">
              {cockpit ? `${cockpit.readiness.grade} / ${cockpit.readiness.score}` : '—'}
            </div>
            <div className="hint">{cockpit?.watchlist.length ?? 0} watchlist assets</div>
          </div>
          <div className="stat-card">
            <div className="label">Doctor</div>
            <div className="value" style={{ color: doctor.ok ? 'var(--neon)' : 'var(--amber)' }}>
              {doctorRaw ? (doctor.ok ? 'PASS' : 'ISSUES') : '…'}
            </div>
            <div className="hint">{doctor.rows.length} diagnostic checks</div>
          </div>
        </div>

        {/* ── Core ── */}
        <div className="section-head" id="sec-core">
          <h2>Core systems</h2>
          <div className="line" />
        </div>
        <div className="dashboard">
          <section className="panel" id="panel-status">
            <div className="panel-head"><h3>System Status</h3>{healthView.ok && <span className="live-tag">LIVE</span>}</div>
            <div className="metric-grid">
              <div className="metric"><div className="value">{status?.version ?? '—'}</div><div className="label">Version</div></div>
              <div className="metric"><div className="value">{status?.mode || 'sim'}</div><div className="label">Mode</div></div>
              <div className="metric"><div className="value">{status?.uptime ?? '—'}</div><div className="label">Uptime</div></div>
              <div className="metric"><div className="value">{status?.agent ?? health?.agent ?? '—'}</div><div className="label">Agent</div></div>
            </div>
            <div style={{ marginTop: 12 }} className="label">Config path</div>
            <div className="value" style={{ fontSize: '0.72rem', wordBreak: 'break-all' }}>{status?.config ?? '—'}</div>
          </section>

          <section className="panel" id="panel-connectors">
            <div className="panel-head"><h3>Connectors</h3></div>
            {connectors.map((c) => (
              <div key={c.name} className="connector-row">
                <span className="connector-name">{c.name}</span>
                <span className="connector-type">{c.type}</span>
                <span className={`connector-status ${c.status}`}>{c.status}</span>
              </div>
            ))}
            {!connectors.length && <div className="empty">Loading connectors…</div>}
            <div style={{ marginTop: 12 }}>
              <button
                className="btn-config"
                type="button"
                onClick={() => {
                  if (!showConfig) {
                    fetch('/api/config')
                      .then((r) => r.text())
                      .then(setConfigText)
                      .catch(() => setConfigText('Failed to load config'))
                  }
                  setShowConfig(!showConfig)
                }}
              >
                {showConfig ? 'Hide' : 'View'} Config
              </button>
              {showConfig && <pre className="config-json">{configText}</pre>}
            </div>
          </section>

          <section className="panel" id="panel-dna">
            <div className="panel-head"><h3>Agent DNA</h3></div>
            {dnaInfo ? (
              <>
                <div className="metric-grid">
                  <div className="metric ok"><div className="value">{dnaInfo.dna.metrics.utilityScore}/100</div><div className="label">Utility</div></div>
                  <div className="metric"><div className="value">{dnaInfo.dna.sequence.length}</div><div className="label">Bases</div></div>
                  <div className="metric"><div className="value">{dnaInfo.dna.metrics.gcContent.toFixed(2)}%</div><div className="label">GC</div></div>
                  <div className="metric"><div className="value">{dnaInfo.dna.metrics.pamSites.length}/{dnaInfo.dna.metrics.tataBoxes.length}</div><div className="label">PAM/TATA</div></div>
                </div>
                <div className="label" style={{ marginTop: 10 }}>DNA ID</div>
                <div className="value" style={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>{dnaInfo.dna.proof.dnaId}</div>
                <div className="dna-sequence">{dnaInfo.dna.sequence.value.slice(0, 96)}…</div>
              </>
            ) : (
              <div className="empty">Loading agent DNA…</div>
            )}
          </section>

          <section className="panel" id="panel-ecosystem">
            <div className="panel-head"><h3>Ecosystem</h3></div>
            {ecosystem ? (
              <div>
                {Object.entries(ecosystem).map(([key, val]) => (
                  <div key={key} className="env-row">
                    <span className="env-key">{key}</span>
                    <a className="env-val" href={val} target="_blank" rel="noreferrer">{val}</a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty">Loading ecosystem…</div>
            )}
          </section>
        </div>

        {/* ── Trading ── */}
        <div className="section-head" id="sec-trading">
          <h2>Trading intelligence</h2>
          <div className="line" />
        </div>
        <div className="dashboard">
          <section className="panel" id="panel-cockpit">
            <div className="panel-head"><h3>Trading Cockpit</h3></div>
            {cockpit ? (
              <>
                <div className="metric-grid">
                  <div className="metric ok"><div className="value">{cockpit.readiness.grade}</div><div className="label">Grade</div></div>
                  <div className="metric"><div className="value">{cockpit.readiness.score}</div><div className="label">Score</div></div>
                  <div className="metric"><div className="value">{cockpit.mode || 'sim'}</div><div className="label">Mode</div></div>
                  <div className="metric"><div className="value">{cockpit.risk.maxPositionSol}</div><div className="label">Max SOL</div></div>
                </div>
                <div className="label" style={{ marginTop: 10 }}>
                  size {(cockpit.risk.positionSizePct * 100).toFixed(1)}% · SL {(cockpit.risk.stopLossPct * 100).toFixed(1)}% · TP {(cockpit.risk.takeProfitPct * 100).toFixed(1)}%
                </div>
              </>
            ) : (
              <div className="empty">Loading cockpit…</div>
            )}
          </section>

          <section className="panel" id="panel-signal">
            <div className="panel-head"><h3>Strategy Engine</h3></div>
            {signal && backtest ? (
              <>
                <div className="metric-grid">
                  <div className="metric">
                    <div className="value" style={{
                      color: signal.signal.direction === 'long' ? 'var(--neon)'
                        : signal.signal.direction === 'short' ? 'var(--red)' : 'var(--text-dim)',
                    }}>
                      {signal.signal.direction.toUpperCase()}
                    </div>
                    <div className="label">Signal</div>
                  </div>
                  <div className="metric"><div className="value">{(signal.signal.strength * 100).toFixed(0)}%</div><div className="label">Strength</div></div>
                  <div className="metric"><div className="value">{signal.signal.rsi.toFixed(1)}</div><div className="label">RSI</div></div>
                  <div className="metric"><div className="value">{signal.signal.emaCross}</div><div className="label">EMA</div></div>
                </div>
                <div className="label" style={{ marginTop: 10 }}>
                  Backtest · {backtest.bars} bars · {backtest.result.trades} trades
                </div>
                <Sparkline data={backtest.result.equityCurve} />
                <div className="metric-grid" style={{ marginTop: 8 }}>
                  <div className="metric"><div className="value">{(backtest.result.winRate * 100).toFixed(0)}%</div><div className="label">Win</div></div>
                  <div className="metric"><div className="value">{(backtest.result.totalReturn * 100).toFixed(1)}%</div><div className="label">Return</div></div>
                  <div className="metric"><div className="value">{backtest.result.sharpe.toFixed(2)}</div><div className="label">Sharpe</div></div>
                  <div className="metric"><div className="value">-{(backtest.result.maxDrawdown * 100).toFixed(1)}%</div><div className="label">Max DD</div></div>
                </div>
              </>
            ) : (
              <div className="empty">Running strategy engine…</div>
            )}
          </section>

          <section className="panel" id="panel-portfolio">
            <div className="panel-head"><h3>Portfolio Guard</h3></div>
            {portfolioRaw ? (
              <>
                <MetricGrid metrics={portfolio.metrics} />
                {portfolio.reasons.length > 0 && (
                  <div className="warn-text" style={{ marginTop: 10 }}>
                    {portfolio.reasons.join(' · ')}
                  </div>
                )}
              </>
            ) : (
              <div className="empty">Loading portfolio guard…</div>
            )}
          </section>

          <section className="panel" id="panel-optimize">
            <div className="panel-head"><h3>Walk-Forward Optimize</h3></div>
            {optimizeRaw ? (
              <MetricGrid metrics={optimize} />
            ) : (
              <div className="empty">Running optimizer…</div>
            )}
          </section>
        </div>

        {/* ── Market ── */}
        <div className="section-head" id="sec-market">
          <h2>Market surfaces</h2>
          <div className="line" />
        </div>
        <div className="dashboard">
          <section className="panel" id="panel-prices">
            <div className="panel-head">
              <h3>Live Market</h3>
              {prices?.ok && <span className="live-tag">JUPITER</span>}
            </div>
            {prices ? (
              prices.ok ? (
                <div>
                  {Object.values(prices.prices).map((p) => (
                    <div key={p.mint} className="env-row">
                      <span className="env-key" style={{ fontFamily: 'monospace' }}>
                        {p.mint.slice(0, 4)}…{p.mint.slice(-4)}
                      </span>
                      <span className="env-val">
                        ${p.usdPrice < 0.01 ? p.usdPrice.toExponential(2) : p.usdPrice.toFixed(4)}
                        <span style={{ marginLeft: 8, color: p.priceChange24h >= 0 ? 'var(--neon)' : 'var(--red)' }}>
                          {p.priceChange24h >= 0 ? '▲' : '▼'} {Math.abs(p.priceChange24h).toFixed(2)}%
                        </span>
                      </span>
                    </div>
                  ))}
                  <div className="label" style={{ marginTop: 8 }}>source: {prices.source} · {prices.count} tokens</div>
                </div>
              ) : (
                <div className="warn-text">live prices unavailable: {prices.error}</div>
              )
            ) : (
              <div className="empty">Loading live prices…</div>
            )}
          </section>

          <section className="panel" id="panel-perps">
            <div className="panel-head"><h3>Perps Open Interest</h3></div>
            {perps ? (
              perps.ok && perps.tokens && perps.tokens.length > 0 ? (
                <div>
                  {perps.tokens.slice(0, 8).map((t) => {
                    const tot = t.long_io + t.short_io || 1
                    const longPct = (t.long_io / tot) * 100
                    return (
                      <div key={t.token} style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                          <span>{t.token}</span>
                          <span className="muted">${(t.open_interest / 1e6).toFixed(1)}M · {t.bias_text}</span>
                        </div>
                        <div className="oi-bar">
                          <div className="oi-long" style={{ width: `${longPct}%` }} />
                          <div className="oi-short" style={{ width: `${100 - longPct}%` }} />
                        </div>
                      </div>
                    )
                  })}
                  <div className="label">source: {perps.source}</div>
                </div>
              ) : (
                <div className="warn-text">perps feed unavailable{perps.error ? `: ${perps.error}` : ''}</div>
              )
            ) : (
              <div className="empty">Loading perps…</div>
            )}
          </section>

          <section className="panel" id="panel-trending">
            <div className="panel-head"><h3>Trending</h3></div>
            {trendingRaw ? (
              trending.ok ? (
                <RowList rows={trending.rows} />
              ) : (
                <div className="warn-text">{trending.error}</div>
              )
            ) : (
              <div className="empty">Loading trending…</div>
            )}
          </section>

          <section className="panel" id="panel-venues">
            <div className="panel-head"><h3>Perps Venues</h3></div>
            {venuesRaw ? <RowList rows={venues} /> : <div className="empty">Loading venues…</div>}
          </section>
        </div>

        {/* ── Governance ── */}
        <div className="section-head" id="sec-governance">
          <h2>Governance & diagnostics</h2>
          <div className="line" />
        </div>
        <div className="dashboard">
          <section className="panel wide" id="panel-laws">
            <div className="panel-head"><h3>Six Laws Harness</h3></div>
            {lawsRaw ? <RowList rows={laws} /> : <div className="empty">Loading laws…</div>}
          </section>

          <section className="panel" id="panel-doctor">
            <div className="panel-head"><h3>Doctor</h3></div>
            {doctorRaw ? (
              <>
                <MetricGrid metrics={doctor.metrics} />
                <div style={{ marginTop: 12 }}><RowList rows={doctor.rows} /></div>
              </>
            ) : (
              <div className="empty">Running doctor…</div>
            )}
          </section>

          <section className="panel" id="panel-council">
            <div className="panel-head">
              <h3>Lobster Council</h3>
              <span className="badge">{council.count} members</span>
            </div>
            {councilRaw ? <RowList rows={council.rows} /> : <div className="empty">Loading council…</div>}
          </section>
        </div>

        {/* ── Compute ── */}
        <div className="section-head" id="sec-compute">
          <h2>Compute primitives</h2>
          <div className="line" />
        </div>
        <div className="dashboard">
          <section className="panel" id="panel-size">
            <div className="panel-head"><h3>Weissman Size</h3></div>
            {sizeRaw ? <MetricGrid metrics={size} /> : <div className="empty">Scanning footprint…</div>}
          </section>

          <section className="panel" id="panel-middleout">
            <div className="panel-head"><h3>Middle-Out Cache</h3></div>
            {middleoutRaw ? <MetricGrid metrics={middleout} /> : <div className="empty">Warming cache…</div>}
          </section>

          <section className="panel wide" id="panel-life">
            <div className="panel-head">
              <h3>Universal Computer · Game of Life</h3>
              <button
                className="btn-action"
                type="button"
                onClick={() => {
                  fetchJSON<unknown>('/api/life?reset=1').then((life) => {
                    if (life) {
                      setLifeRaw(life)
                      pushLog('life grid reseeded (Gosper gun)')
                    }
                  })
                }}
              >
                Reseed
              </button>
            </div>
            {lifeRaw ? (
              <>
                <MetricGrid metrics={life.metrics} />
                <LifeCanvas cells={life.cells} rows={life.rows} cols={life.cols} />
              </>
            ) : (
              <div className="empty">Booting cellular automaton…</div>
            )}
          </section>
        </div>

        {/* ── Ops ── */}
        <div className="section-head" id="sec-ops">
          <h2>Ops & environment</h2>
          <div className="line" />
        </div>
        <div className="dashboard">
          <section className="panel" id="panel-vaultStatus">
            <div className="panel-head">
              <h3>Vault Status</h3>
              <button className="btn-action" type="button" onClick={loadVaultKeys}>Load key names</button>
            </div>
            {vaultStatusRaw ? <MetricGrid metrics={vaultStatus} /> : <div className="empty">Loading vault…</div>}
            {vaultKeys.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div className="label">Key inventory (names only)</div>
                <RowList rows={vaultKeys} />
              </div>
            )}
          </section>

          <section className="panel" id="panel-packages">
            <div className="panel-head"><h3>Go Packages ({packages.length})</h3></div>
            <div>
              {packages.map((pkg) => (
                <div key={pkg.name} className="package-item">
                  <span className="package-name">{pkg.name}</span>
                  <span className="package-path">{pkg.path}</span>
                  <span className="package-files">{pkg.file_count}f</span>
                </div>
              ))}
              {!packages.length && <div className="empty">Loading packages…</div>}
            </div>
          </section>

          <section className="panel" id="panel-env">
            <div className="panel-head"><h3>Environment</h3></div>
            {envInfo ? (
              <div>
                {Object.entries(envInfo).map(([key, val]) => (
                  <div key={key} className="env-row">
                    <span className="env-key">{key}</span>
                    <span className="env-val">{val || '—'}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty">Loading environment…</div>
            )}
          </section>

          <section className="panel" id="panel-log">
            <div className="panel-head"><h3>System Log</h3></div>
            <div className="chat-messages" ref={logRef}>
              {logs.map((m, i) => (
                <div key={`${i}-${m}`} className="log-line">{m}</div>
              ))}
            </div>
          </section>
        </div>

        <div className="footer-note">
          CLAWDBOT · REAL API SURFACES · NO STUBBED HAPPY PATH · {API_ENDPOINTS.length} REGISTERED ENDPOINTS
        </div>
      </main>
    </div>
  )
}
