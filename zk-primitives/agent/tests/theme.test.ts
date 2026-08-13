/**
 * Unit tests for the shark/ocean TUI theme.
 *
 * These are pure-formatting checks: no TTY, no readline. Colors are
 * disabled in the test environment (stdout isn't a TTY), so assertions
 * check plain-text content rather than escape codes.
 */

import { describe, expect, test } from "vitest";
import * as theme from "../src/theme.js";

describe("banner", () => {
  test("mentions the shark and the streets", () => {
    const out = theme.banner();
    expect(out).toContain("S H A R K");
    expect(out).toContain("Shark of All Streets");
  });
});

describe("wave", () => {
  test("produces a line of the requested width", () => {
    expect(theme.wave(20)).toHaveLength(20);
    expect(theme.wave(9)).toHaveLength(9);
  });
});

describe("box", () => {
  test("wraps content lines with a title and border", () => {
    const out = theme.box("test title", ["line one", "line two"]);
    expect(out).toContain("test title");
    expect(out).toContain("line one");
    expect(out).toContain("line two");
    expect(out.split("\n").length).toBeGreaterThanOrEqual(4);
  });
});

describe("errorBox", () => {
  test("carries the shark error framing and the message", () => {
    const out = theme.errorBox("something bit the connection");
    expect(out).toContain("blood in the water");
    expect(out).toContain("something bit the connection");
  });
});

describe("withSpinner", () => {
  test("resolves to the wrapped function's return value", async () => {
    const result = await theme.withSpinner("testing", async () => 42);
    expect(result).toBe(42);
  });

  test("propagates errors from the wrapped function", async () => {
    await expect(
      theme.withSpinner("testing", async () => {
        throw new Error("nope");
      }),
    ).rejects.toThrow("nope");
  });
});

describe("farewell", () => {
  test("says goodbye", () => {
    expect(theme.farewell()).toContain("swimming off");
  });
});
