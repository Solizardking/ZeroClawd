/**
 * Ocean/shark theme for the ZK Shark TUI.
 *
 * Pure ANSI escape codes — no chalk/ink/blessed, so the agent keeps its
 * zero-extra-dependency footprint. Colors degrade to plain text when
 * stdout isn't a TTY or `NO_COLOR` is set.
 */

import { stdout } from "node:process";

const ESC = "\x1b[";
const RESET = `${ESC}0m`;

export const isColorEnabled = Boolean(stdout.isTTY) && process.env.NO_COLOR == null;

function wrap(code: string): (s: string) => string {
  return (s: string) => (isColorEnabled ? `${ESC}${code}m${s}${RESET}` : s);
}

export const bold = wrap("1");
export const dim = wrap("2");
export const italic = wrap("3");
export const underline = wrap("4");

export const deepBlue = wrap("38;5;25");
export const oceanBlue = wrap("38;5;31");
export const cyan = wrap("38;5;51");
export const foam = wrap("38;5;159");
export const sharkGray = wrap("38;5;245");
export const finRed = wrap("38;5;203");
export const gold = wrap("38;5;220");
export const kelpGreen = wrap("38;5;35");

export function hideCursor(): string {
  return isColorEnabled ? `${ESC}?25l` : "";
}

export function showCursor(): string {
  return isColorEnabled ? `${ESC}?25h` : "";
}

export function clearScreen(): string {
  return isColorEnabled ? `${ESC}2J${ESC}H` : "";
}

/** A wavy ocean-surface divider, sized to fit the box width. */
export function wave(width = 74): string {
  const seg = "~^~^";
  const line = seg.repeat(Math.ceil(width / seg.length)).slice(0, width);
  return oceanBlue(line);
}

const FIN = [
  "                    .",
  "                   /|",
  "                  / |",
  "                 /  |",
  "      __________/   |____________________________________________",
];

/** Full startup banner: a fin breaking the surface, then the title card. */
export function banner(): string {
  const width = 68;
  const lines: string[] = [];
  for (const finLine of FIN) lines.push(oceanBlue(finLine.padEnd(width)));
  lines.push(wave(width));
  lines.push("");
  lines.push(centered(bold(cyan("Z K   S H A R K")), width));
  lines.push(centered(foam("🦈  the Shark of All Streets  🦈"), width));
  lines.push(centered(dim("nullifiers · Groth16 proofs · Light Protocol attestations"), width));
  lines.push("");
  lines.push(wave(width));
  return lines.join("\n");
}

function visibleLength(s: string): number {
  // eslint-disable-next-line no-control-regex
  return s.replace(/\x1b\[[0-9;]*m/g, "").length;
}

export function centered(s: string, width = 74): string {
  const pad = Math.max(0, Math.floor((width - visibleLength(s)) / 2));
  return " ".repeat(pad) + s;
}

/** A bordered box for showing command results. */
export function box(title: string, lines: string[], width = 74): string {
  const inner = Math.max(width, title.length + 6);
  const top = oceanBlue(`┌─ ${bold(cyan(title))}${oceanBlue(" " + "─".repeat(Math.max(1, inner - title.length - 4)) + "┐")}`);
  const bottom = oceanBlue(`└${"─".repeat(inner)}┘`);
  const body = lines.flatMap((l) => l.split("\n")).map((l) => {
    const pad = Math.max(0, inner - 2 - visibleLength(l));
    return `${oceanBlue("│")} ${l}${" ".repeat(pad)}${oceanBlue("│")}`;
  });
  return [top, ...body, bottom].join("\n");
}

export function errorBox(message: string, width = 74): string {
  return box("🦈💢 blood in the water", [finRed(message)], width);
}

export function prompt(label: string): string {
  return `${gold("🦈")} ${bold(foam(label))} `;
}

/** A shark cruising back and forth while an async op is in flight. */
export async function withSpinner<T>(label: string, fn: () => Promise<T> | T): Promise<T> {
  if (!isColorEnabled) return fn();

  const trackWidth = 24;
  let pos = 0;
  let dir = 1;
  stdout.write(hideCursor());
  const timer = setInterval(() => {
    const before = " ".repeat(pos);
    const after = " ".repeat(Math.max(0, trackWidth - pos));
    const glyph = dir > 0 ? "🦈" : "🐟";
    stdout.write(`\r${oceanBlue("~")}${before}${glyph}${after}${oceanBlue("~")} ${dim(label)}   `);
    pos += dir;
    if (pos >= trackWidth || pos <= 0) dir *= -1;
  }, 90);

  try {
    return await fn();
  } finally {
    clearInterval(timer);
    stdout.write(`\r${" ".repeat(trackWidth + label.length + 12)}\r`);
    stdout.write(showCursor());
  }
}

export function farewell(): string {
  return [
    "",
    wave(68),
    centered(foam("🦈  swimming off into deeper water — tight lines  🦈"), 68),
    wave(68),
    "",
  ].join("\n");
}
