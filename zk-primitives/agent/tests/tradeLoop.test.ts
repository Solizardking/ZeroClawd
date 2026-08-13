/**
 * Unit tests for the ooda trade-loop bridge.
 *
 * `buildLoopArgs` / `resolveOodaDir` are pure and tested directly.
 * `runTradeLoop` is tested with an injected fake `spawn` so no real
 * child process (and no ticks/LLM calls) ever runs.
 */

import { EventEmitter } from "node:events";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { PassThrough } from "node:stream";
import { describe, expect, test } from "vitest";
import { buildLoopArgs, resolveOodaDir, runTradeLoop, type TradeLoopEvent } from "../src/tradeLoop.js";

describe("buildLoopArgs", () => {
  test("builds the base argv with token/ticks/sleep/--tui", () => {
    const args = buildLoopArgs({ token: "bonk", ticks: 25, sleepSeconds: 0.1, useLlm: false, goblin: false });
    expect(args).toEqual(["loop.ts", "--token", "BONK", "--ticks", "25", "--sleep", "0.1", "--tui"]);
  });

  test("appends --llm and --goblin when requested", () => {
    const args = buildLoopArgs({ token: "sol", ticks: 10, sleepSeconds: 0, useLlm: true, goblin: true });
    expect(args).toContain("--llm");
    expect(args).toContain("--goblin");
  });

  test("clamps ticks to at least 1 and sleep to non-negative", () => {
    const args = buildLoopArgs({ token: "sol", ticks: -5, sleepSeconds: -1, useLlm: false, goblin: false });
    expect(args).toContain("1");
    expect(args).toContain("0");
  });
});

describe("resolveOodaDir", () => {
  test("finds the ooda/ harness next to zk-primitives/ in this monorepo", () => {
    const dir = resolveOodaDir();
    expect(dir.endsWith("ooda")).toBe(true);
    expect(existsSync(join(dir, "loop.ts"))).toBe(true);
  });
});

interface FakeChild extends EventEmitter {
  stdout: PassThrough;
  stderr: PassThrough;
}

function makeFakeChild(): FakeChild {
  const child = new EventEmitter() as FakeChild;
  child.stdout = new PassThrough();
  child.stderr = new PassThrough();
  return child;
}

describe("runTradeLoop", () => {
  test("parses JSONL stdout as events and resolves with the exit code", async () => {
    const child = makeFakeChild();
    let captured: { command: string; args: string[] } | undefined;
    const events: TradeLoopEvent[] = [];
    const logs: string[] = [];

    const resultPromise = runTradeLoop(
      { token: "wif", ticks: 2, sleepSeconds: 0, useLlm: false, goblin: false },
      { onEvent: (ev) => events.push(ev), onLog: (l) => logs.push(l) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((command: string, args: string[]) => {
        captured = { command, args };
        return child as any;
      }) as any,
    );

    child.stdout.write(`${JSON.stringify({ event: "start", token: "WIF", ticks: 2 })}\n`);
    child.stdout.write(`${JSON.stringify({ event: "tick", tick: 1, token: "WIF", price: 100 })}\n`);
    child.stderr.write("not-json diagnostic line\n");
    child.stdout.write(`${JSON.stringify({ event: "done", ticks: 2 })}\n`);
    child.emit("close", 0);

    const result = await resultPromise;

    expect(result.code).toBe(0);
    expect(events.map((e) => e.event)).toEqual(["start", "tick", "done"]);
    expect(events[1]).toMatchObject({ token: "WIF", price: 100 });
    expect(logs).toContain("not-json diagnostic line");
    expect(captured?.args).toContain("WIF");
    expect(captured?.args).toContain("--tui");
  });

  test("rejects when the child process errors", async () => {
    const child = makeFakeChild();
    const resultPromise = runTradeLoop(
      { token: "sol", ticks: 1, sleepSeconds: 0, useLlm: false, goblin: false },
      {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (() => child as any) as any,
    );
    child.emit("error", new Error("spawn failed"));
    await expect(resultPromise).rejects.toThrow("spawn failed");
  });
});
