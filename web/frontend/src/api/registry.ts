/**
 * Feature section registry + API path map for the ClawdBot web console.
 * Pure data — no React, no fetch — so unit tests can pin the contract.
 */

export type FeatureGroup =
  | 'core'
  | 'trading'
  | 'market'
  | 'governance'
  | 'compute'
  | 'ops'

export interface ApiEndpoint {
  /** Stable key used in UI state */
  id: string
  /** Real backend path */
  path: string
  /** Short human label */
  label: string
  /** Dashboard section group */
  group: FeatureGroup
  /** Whether the UI fetches this on the main poll loop */
  poll: boolean
  /** Optional description for nav tooltips */
  description?: string
}

/** Canonical map of every console-facing GET surface the UI binds to. */
export const API_ENDPOINTS: readonly ApiEndpoint[] = [
  { id: 'status', path: '/api/status', label: 'Status', group: 'core', poll: true, description: 'Runtime status' },
  { id: 'health', path: '/api/health', label: 'Health', group: 'core', poll: true, description: 'Liveness probe' },
  { id: 'connectors', path: '/api/connectors', label: 'Connectors', group: 'core', poll: true },
  { id: 'ecosystem', path: '/api/ecosystem', label: 'Ecosystem', group: 'core', poll: true },
  { id: 'dna', path: '/api/dna', label: 'Agent DNA', group: 'core', poll: true },
  { id: 'packages', path: '/api/packages', label: 'Packages', group: 'core', poll: true },
  { id: 'env', path: '/api/env', label: 'Environment', group: 'core', poll: true },
  { id: 'config', path: '/api/config', label: 'Config', group: 'core', poll: false },

  { id: 'cockpit', path: '/api/trading/cockpit', label: 'Cockpit', group: 'trading', poll: true },
  { id: 'signal', path: '/api/trading/signal', label: 'Signal', group: 'trading', poll: true },
  { id: 'backtest', path: '/api/trading/backtest', label: 'Backtest', group: 'trading', poll: true },
  { id: 'portfolio', path: '/api/trading/portfolio', label: 'Portfolio Guard', group: 'trading', poll: true },
  { id: 'optimize', path: '/api/trading/optimize', label: 'Optimize', group: 'trading', poll: true },

  { id: 'prices', path: '/api/market/prices', label: 'Prices', group: 'market', poll: true },
  { id: 'perps', path: '/api/market/perps', label: 'Perps OI', group: 'market', poll: true },
  { id: 'trending', path: '/api/market/trending', label: 'Trending', group: 'market', poll: true },
  { id: 'venues', path: '/api/perps/venues', label: 'Perps Venues', group: 'market', poll: true },

  { id: 'laws', path: '/api/laws', label: 'Six Laws', group: 'governance', poll: true },
  { id: 'doctor', path: '/api/doctor', label: 'Doctor', group: 'governance', poll: true },
  { id: 'council', path: '/api/lobster-council', label: 'Lobster Council', group: 'governance', poll: true },

  { id: 'size', path: '/api/size', label: 'Weissman Size', group: 'compute', poll: true },
  { id: 'life', path: '/api/life', label: 'Game of Life', group: 'compute', poll: true },
  { id: 'middleout', path: '/api/middleout', label: 'Middle-Out', group: 'compute', poll: true },

  { id: 'vaultStatus', path: '/api/vault/status', label: 'Vault Status', group: 'ops', poll: true },
  { id: 'vaultKeys', path: '/api/vault/keys', label: 'Vault Keys', group: 'ops', poll: false, description: 'Read-only inventory when authorized' },
] as const

/** Paths the main dashboard polls every refresh. */
export function pollPaths(): string[] {
  return API_ENDPOINTS.filter((e) => e.poll).map((e) => e.path)
}

/** All registered API paths (ordered). */
export function allPaths(): string[] {
  return API_ENDPOINTS.map((e) => e.path)
}

/** Paths required for the upgraded feature set (criterion 2). */
export const REQUIRED_FEATURE_PATHS: readonly string[] = [
  '/api/laws',
  '/api/doctor',
  '/api/trading/portfolio',
  '/api/trading/optimize',
  '/api/perps/venues',
  '/api/market/trending',
  '/api/size',
  '/api/life',
  '/api/middleout',
  '/api/lobster-council',
  '/api/vault/status',
] as const

/** Legacy surfaces that must remain wired. */
export const LEGACY_PATHS: readonly string[] = [
  '/api/status',
  '/api/health',
  '/api/connectors',
  '/api/ecosystem',
  '/api/dna',
  '/api/trading/cockpit',
  '/api/trading/signal',
  '/api/trading/backtest',
  '/api/market/prices',
  '/api/market/perps',
  '/api/packages',
  '/api/env',
  '/api/config',
] as const

export function endpointsByGroup(group: FeatureGroup): ApiEndpoint[] {
  return API_ENDPOINTS.filter((e) => e.group === group)
}

export function findEndpoint(id: string): ApiEndpoint | undefined {
  return API_ENDPOINTS.find((e) => e.id === id)
}

export const GROUP_META: Record<FeatureGroup, { title: string; accent: string }> = {
  core: { title: 'Core', accent: 'neon' },
  trading: { title: 'Trading', accent: 'purple' },
  market: { title: 'Market', accent: 'teal' },
  governance: { title: 'Governance', accent: 'amber' },
  compute: { title: 'Compute', accent: 'pink' },
  ops: { title: 'Ops', accent: 'neon' },
}
