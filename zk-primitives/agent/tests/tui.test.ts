/**
 * End-to-end smoke test for the shark TUI: drives `runTui` over fake
 * stdin/stdout streams and asserts the menu, handlers, and quit flow
 * all produce the expected shark-flavored output.
 *
 * `@clawd/zk-client` is mocked the same way `agent.test.ts` mocks it —
 * see that file for why (a pre-existing bug in the real module's
 * top-level constant, unrelated to the TUI).
 */

import { PassThrough } from "node:stream";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("@clawd/zk-client", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createHash } = require("node:crypto") as typeof import("node:crypto");
  async function computeNullifier(args: { secret: Uint8Array; context: Uint8Array | string }): Promise<Uint8Array> {
    if (args.secret.length < 16) throw new Error("Nullifier secret must be at least 16 bytes.");
    const contextBytes = typeof args.context === "string" ? new TextEncoder().encode(args.context) : args.context;
    const hasher = createHash("sha256");
    hasher.update(args.secret);
    hasher.update(contextBytes);
    return new Uint8Array(hasher.digest()).subarray(0, 32);
  }
  class ClawdZkClient {
    constructor(_: unknown) {}
  }
  return { ClawdZkClient, computeNullifier };
});

// Never spawn the real ooda/loop.ts from these tests — fake the bridge
// and feed it a couple of synthetic events instead.
const runTradeLoopMock = vi.fn(
  async (
    _opts: unknown,
    handlers: { onEvent?: (ev: Record<string, unknown>) => void } = {},
  ): Promise<{ code: number | null }> => {
    handlers.onEvent?.({ event: "start", token: "TEST", ticks: 1 });
    handlers.onEvent?.({
      event: "tick",
      tick: 1,
      token: "TEST",
      price: 12345,
      decision: { action: "hold", reason: "mocked" },
      outcome: "applied",
    });
    handlers.onEvent?.({ event: "done", ticks: 1 });
    return { code: 0 };
  },
);
vi.mock("../src/tradeLoop.js", () => ({ runTradeLoop: runTradeLoopMock }));

// Never hit the real cheshireterminal.ai API or Solana RPC from these tests.
const checkClawdGateMock = vi.fn(async (wallet: string) => ({
  mint: "8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump",
  balance: 2_000_000,
  minimumBalance: 1_000_000,
  eligible: true,
  source: "mocked",
  wallet,
}));
const getClawdBalanceOnchainMock = vi.fn(async () => ({
  mint: "8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump",
  balanceRaw: 2_000_000n,
  balanceUi: 2,
  decimals: 6,
}));
vi.mock("../src/clawdToken.js", () => ({
  checkClawdGate: checkClawdGateMock,
  getClawdBalanceOnchain: getClawdBalanceOnchainMock,
}));

const { runTui } = await import("../src/tui.js");

class FakeTerminal {
  input = new PassThrough();
  output = new PassThrough();
  private buf = "";

  constructor() {
    this.output.on("data", (chunk: Buffer) => {
      this.buf += chunk.toString("utf-8");
    });
  }

  /** Queue a line of "typed" input, delivered on the next microtask tick. */
  async type(line: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 0));
    this.input.write(`${line}\n`);
  }

  text(): string {
    return this.buf;
  }

  end(): void {
    this.input.end();
  }
}

describe("runTui", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV, ZK_SHARK_RPC_URL: "https://example.invalid", NO_COLOR: "1" };
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  test("shows the shark banner and menu, runs inspect + nullifier, then quits", async () => {
    const term = new FakeTerminal();
    const runPromise = runTui({ input: term.input, output: term.output });

    await term.type("1"); // inspect
    await term.type(""); // press enter to continue
    await term.type("5"); // compute nullifier
    await term.type("smoke-test-context"); // context
    await term.type(""); // blank secret -> default zero secret
    await term.type(""); // press enter to continue
    await term.type("q"); // quit
    term.end();

    const code = await runPromise;
    const text = term.text();

    expect(code).toBe(0);
    expect(text).toContain("S H A R K");
    expect(text).toContain("Inspect configuration");
    expect(text).toContain("Swim away");
    expect(text).toContain("configuration");
    expect(text).toContain("program");
    expect(text).toContain("nullifier");
    expect(text).toMatch(/0x[0-9a-f]{64}/);
    expect(text).toContain("swimming off into deeper water");
  });

  test("rejects an unrecognised menu choice and keeps running", async () => {
    const term = new FakeTerminal();
    const runPromise = runTui({ input: term.input, output: term.output });

    await term.type("99");
    await term.type("q");
    term.end();

    const code = await runPromise;
    expect(code).toBe(0);
    expect(term.text()).toContain('No fin for "99"');
  });

  test("runs a trade loop through the mocked ooda bridge", async () => {
    const term = new FakeTerminal();
    const runPromise = runTui({ input: term.input, output: term.output });

    await term.type("8"); // trade loop
    await term.type("test"); // token
    await term.type("1"); // ticks
    await term.type("0"); // sleep
    await term.type("n"); // use llm
    await term.type("n"); // goblin
    await term.type(""); // press enter to continue
    await term.type("q");
    term.end();

    const code = await runPromise;
    const text = term.text();

    expect(code).toBe(0);
    expect(runTradeLoopMock).toHaveBeenCalledTimes(1);
    expect(runTradeLoopMock.mock.calls[0]?.[0]).toMatchObject({ token: "TEST", ticks: 1, sleepSeconds: 0 });
    expect(text).toContain("paper-trading only");
    expect(text).toContain("trade loop finished");
    expect(text).toContain("TEST");
  });

  test("checks the $CLAWD gate through the mocked bridge", async () => {
    const term = new FakeTerminal();
    const runPromise = runTui({ input: term.input, output: term.output });

    await term.type("9"); // $CLAWD gate
    await term.type("SomeWalletAddress111"); // wallet
    await term.type(""); // press enter to continue
    await term.type("q");
    term.end();

    const code = await runPromise;
    const text = term.text();

    expect(code).toBe(0);
    expect(checkClawdGateMock).toHaveBeenCalledWith("SomeWalletAddress111");
    expect(text).toContain("$CLAWD gate");
    expect(text).toContain("treasury-sponsored mint");
    expect(text).toContain("8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump");
  });

  test("exits with code 1 and a friendly error when config is missing", async () => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.ZK_SHARK_RPC_URL;
    delete process.env.CLAWD_ZK_RPC_URL;

    const term = new FakeTerminal();
    term.end();
    const code = await runTui({ input: term.input, output: term.output });

    expect(code).toBe(1);
    expect(term.text()).toContain("blood in the water");
  });
});
