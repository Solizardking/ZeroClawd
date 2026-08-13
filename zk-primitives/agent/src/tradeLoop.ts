/**
 * Trade loop bridge — lets the ZK Shark TUI launch a paper-trading OODA
 * loop (`../../ooda/loop.ts` in the go-bot monorepo) for any token the
 * caller names.
 *
 * IMPORTANT: this does not implement trading itself. It shells out to
 * the existing `ooda/` harness, which enforces its own safety contract
 * (paper mode + devnet only, mainnet RPCs rejected, position-size caps,
 * kill-switch) entirely in that module — this file cannot weaken any of
 * that. The "token" here only labels the run (journal, prompt, perps OI
 * symbol); the price feed is the harness's seeded synthetic generator,
 * not a live market feed. See `ooda/README.md` for the full contract.
 *
 * Requires running from inside the go-bot monorepo (the `ooda/`
 * directory must exist next to `zk-primitives/`); throws a clear error
 * otherwise.
 */

import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn as defaultSpawn, type ChildProcess } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface TradeLoopOptions {
  /** Token symbol to label the run with, e.g. "SOL", "BONK". */
  token: string;
  /** Number of OODA ticks to run. */
  ticks: number;
  /** Seconds to sleep between ticks (0 = fastest). */
  sleepSeconds: number;
  /** Use an LLM for decisions instead of the deterministic SMA fallback. */
  useLlm: boolean;
  /** GOBLIN MODE — aggressive strategy, forces LLM + 0ms sleep in the harness. */
  goblin: boolean;
}

export interface TradeLoopEvent {
  event: "start" | "tick" | "killswitch" | "done";
  [key: string]: unknown;
}

export interface TradeLoopHandlers {
  /** One parsed JSONL event from `ooda/loop.ts --tui`. */
  onEvent?: (ev: TradeLoopEvent) => void;
  /** A non-JSON stdout/stderr line (fatal errors, tsx/npx diagnostics). */
  onLog?: (line: string) => void;
}

export interface TradeLoopResult {
  code: number | null;
}

type SpawnFn = (command: string, args: string[], opts: { cwd: string; env: NodeJS.ProcessEnv }) => ChildProcess;

/** Locate the `ooda/` harness relative to this package inside the go-bot monorepo. */
export function resolveOodaDir(): string {
  const candidate = resolve(__dirname, "../../../ooda");
  if (existsSync(join(candidate, "loop.ts"))) return candidate;
  throw new Error(
    `Could not find the ooda/ trade-loop harness (looked at "${candidate}"). ` +
      `Trade loops require running zk-shark-agent from inside the go-bot monorepo, next to zk-primitives/.`,
  );
}

/** Prefer the harness's own local tsx binary; fall back to `npx tsx`. */
function resolveRunner(oodaDir: string): { command: string; prefixArgs: string[] } {
  const localTsx = join(oodaDir, "node_modules", ".bin", "tsx");
  if (existsSync(localTsx)) return { command: localTsx, prefixArgs: [] };
  return { command: "npx", prefixArgs: ["--yes", "tsx"] };
}

/** Build the `loop.ts` argv for the given options. Pure — no I/O, easy to test. */
export function buildLoopArgs(opts: TradeLoopOptions): string[] {
  const ticks = Math.max(1, Math.trunc(opts.ticks));
  const sleepSeconds = Math.max(0, opts.sleepSeconds);
  const args = [
    "loop.ts",
    "--token",
    opts.token.toUpperCase(),
    "--ticks",
    String(ticks),
    "--sleep",
    String(sleepSeconds),
    "--tui",
  ];
  if (opts.useLlm) args.push("--llm");
  if (opts.goblin) args.push("--goblin");
  return args;
}

/**
 * Spawn the ooda trade loop and stream its `--tui` JSONL events back to
 * the caller. Resolves once the child process exits.
 */
export function runTradeLoop(
  opts: TradeLoopOptions,
  handlers: TradeLoopHandlers = {},
  spawnFn: SpawnFn = defaultSpawn,
): Promise<TradeLoopResult> {
  const oodaDir = resolveOodaDir();
  const { command, prefixArgs } = resolveRunner(oodaDir);
  const args = [...prefixArgs, ...buildLoopArgs(opts)];

  return new Promise((resolvePromise, reject) => {
    const child = spawnFn(command, args, { cwd: oodaDir, env: process.env });

    let outBuf = "";
    child.stdout?.on("data", (chunk: Buffer) => {
      outBuf += chunk.toString("utf-8");
      let idx: number;
      while ((idx = outBuf.indexOf("\n")) !== -1) {
        const line = outBuf.slice(0, idx);
        outBuf = outBuf.slice(idx + 1);
        if (!line.trim()) continue;
        try {
          handlers.onEvent?.(JSON.parse(line) as TradeLoopEvent);
        } catch {
          handlers.onLog?.(line);
        }
      }
    });

    child.stderr?.on("data", (chunk: Buffer) => {
      for (const line of chunk.toString("utf-8").split("\n")) {
        if (line.trim()) handlers.onLog?.(line);
      }
    });

    child.on("error", reject);
    child.on("close", (code) => resolvePromise({ code }));
  });
}
