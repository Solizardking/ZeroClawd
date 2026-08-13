/**
 * ZK Shark TUI — an interactive, shark-themed terminal front end for
 * ZkSharkAgent. Launched by `zk-shark-agent` (no args, in a TTY) or
 * `zk-shark-agent tui`.
 *
 * Built on Node's own `readline/promises` — no ink/blessed/chalk — to
 * keep the agent's dependency footprint at zero.
 */

import { Buffer } from "node:buffer";
import { stdin as defaultStdin, stdout as defaultStdout } from "node:process";
import { createInterface, type Interface } from "node:readline/promises";
import { ZkSharkAgent } from "./agent.js";
import { routeIntent } from "./intents.js";
import * as theme from "./theme.js";

/** The active output stream. Set once per `runTui()` call; single-flight by design. */
let out: NodeJS.WritableStream = defaultStdout;

export interface TuiOptions {
  /** Override the input stream (defaults to `process.stdin`). Mainly for tests. */
  input?: NodeJS.ReadableStream;
  /** Override the output stream (defaults to `process.stdout`). Mainly for tests. */
  output?: NodeJS.WritableStream;
}

function parseHex32(label: string, hex: string): Uint8Array {
  const cleaned = hex.trim().replace(/^0x/i, "");
  if (cleaned.length !== 64) {
    throw new Error(`${label} must be 32 bytes (64 hex chars); got ${cleaned.length}.`);
  }
  return Uint8Array.from(cleaned.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));
}

async function ask(rl: Interface, label: string, opts: { optional?: boolean } = {}): Promise<string> {
  const suffix = opts.optional ? theme.dim(" (optional)") : "";
  const answer = (await rl.question(theme.prompt(`${label}${suffix} ▸`))).trim();
  return answer;
}

async function askHex32(rl: Interface, label: string): Promise<Uint8Array> {
  for (;;) {
    const raw = await ask(rl, `${label} (0x + 64 hex chars)`);
    try {
      return parseHex32(label, raw);
    } catch (err) {
      out.write(`${theme.finRed(err instanceof Error ? err.message : String(err))}\n`);
    }
  }
}

function printResult(title: string, lines: string[]): void {
  out.write(`\n${theme.box(title, lines)}\n`);
}

function printError(err: unknown): void {
  const message = err instanceof Error ? err.message : String(err);
  out.write(`\n${theme.errorBox(message)}\n`);
}

async function pressEnter(rl: Interface): Promise<void> {
  await rl.question(theme.dim("\nPress Enter to surface..."));
}

// ---------------------------------------------------------------------------
// Menu actions
// ---------------------------------------------------------------------------

async function handleInspect(_rl: Interface, agent: ZkSharkAgent): Promise<void> {
  printResult("configuration", agent.describe().split("\n").slice(1));
}

async function handleAttest(rl: Interface, agent: ZkSharkAgent): Promise<void> {
  const modelHash = await askHex32(rl, "Model hash");
  const payloadCommitment = await askHex32(rl, "Payload commitment");
  const proofPath = await ask(rl, "Path to proof.json");
  const contextInput = await ask(rl, "Context tag", { optional: true });
  const context = contextInput || `model-attest:v1:${Buffer.from(modelHash).toString("hex").slice(0, 12)}`;

  const proof = await theme.withSpinner("diving for the proof file...", () => ZkSharkAgent.loadProof(proofPath));
  const result = await theme.withSpinner("circling the target, building the bite...", () =>
    agent.attestModel({ modelHash: modelHash as never, payloadCommitment: payloadCommitment as never, proof, context }),
  );

  printResult("attestation ready", [
    ...result.summary.split("\n").slice(1),
    result.signature ? `signature      : ${result.signature}` : theme.dim("signature      : (instruction-only — no signer attached)"),
  ]);
}

async function handleCommit(rl: Interface, agent: ZkSharkAgent): Promise<void> {
  const ciphertextCommitment = await askHex32(rl, "Ciphertext commitment");
  const stateVersionInput = await ask(rl, "State version (integer)");
  const modelHashInput = await ask(rl, "Model hash", { optional: true });
  const proofPath = await ask(rl, "Path to proof.json");

  const stateVersion = BigInt(stateVersionInput || "1");
  const modelHash = modelHashInput ? parseHex32("Model hash", modelHashInput) : new Uint8Array(32);
  const proof = await theme.withSpinner("diving for the proof file...", () => ZkSharkAgent.loadProof(proofPath));
  const result = await theme.withSpinner("committing the catch to the reef...", () =>
    agent.commitEncryptedState({
      modelHash: modelHash as never,
      ciphertextCommitment: ciphertextCommitment as never,
      stateVersion,
      proof,
      context: `commit-state:v1:${stateVersion}`,
    }),
  );

  printResult("commit ready", result.summary.split("\n").slice(1));
}

async function handleVerify(rl: Interface, agent: ZkSharkAgent): Promise<void> {
  const proofPath = await ask(rl, "Path to proof.json");
  const proof = await theme.withSpinner("diving for the proof file...", () => ZkSharkAgent.loadProof(proofPath));
  const result = await theme.withSpinner("checking the proof's teeth...", () => agent.verifyProof({ proof }));

  const lines = [`ok             : ${result.ok ? theme.kelpGreen("true") : theme.finRed("false")}`];
  if (result.reason) lines.push(`reason         : ${result.reason}`);
  if (result.publicInputsPackedHex) lines.push(`public inputs  : 0x${result.publicInputsPackedHex}`);
  printResult("verify result", lines);
}

async function handleNullifier(rl: Interface, agent: ZkSharkAgent): Promise<void> {
  const context = (await ask(rl, "Context")) || "default";
  const secretInput = await ask(rl, "Secret phrase (min 16 bytes; blank = zero secret)", { optional: true });
  const secret = secretInput ? new TextEncoder().encode(secretInput.padEnd(16, "\0")) : new Uint8Array(32);

  const nullifier = await theme.withSpinner("scenting a deterministic trail...", () =>
    agent.computeNullifierFor(secret, context),
  );
  printResult("nullifier", [`0x${Buffer.from(nullifier).toString("hex")}`]);
}

async function handleAsk(rl: Interface, agent: ZkSharkAgent): Promise<void> {
  const text = await ask(rl, 'Ask the shark, e.g. "attest this model 0xab12..."');
  if (!text) return;
  const route = routeIntent(text, agent);
  printResult("intent route", JSON.stringify(route, null, 2).split("\n"));
}

async function handleHelp(): Promise<void> {
  printResult("help", [
    "attest    — build a publish_attestation instruction",
    "commit    — build a commit_encrypted_state instruction",
    "verify    — off-chain Groth16 sanity check",
    "nullifier — derive a deterministic 32-byte nullifier",
    "ask       — natural-language intent routing",
    "inspect   — show the active configuration",
    "",
    "Environment: ZK_SHARK_RPC_URL (required), ZK_SHARK_PROGRAM_ID, ZK_SHARK_KEYPAIR, ...",
    "Run `zk-shark-agent help` outside the TUI for the full flag reference.",
  ]);
}

interface MenuEntry {
  key: string;
  label: string;
  handler: (rl: Interface, agent: ZkSharkAgent) => Promise<void>;
}

const MENU: MenuEntry[] = [
  { key: "1", label: "🌊 Inspect configuration", handler: handleInspect },
  { key: "2", label: "🦈 Attest a model", handler: handleAttest },
  { key: "3", label: "🔐 Commit encrypted state", handler: handleCommit },
  { key: "4", label: "✅ Verify a proof", handler: handleVerify },
  { key: "5", label: "#️⃣  Compute a nullifier", handler: handleNullifier },
  { key: "6", label: "💬 Ask the shark (natural language)", handler: handleAsk },
  { key: "7", label: "❓ Help", handler: handleHelp },
];

function printMenu(agent: ZkSharkAgent): void {
  const signerLine = agent.signer
    ? `${theme.kelpGreen("●")} ${theme.dim(`signer attached — ${agent.signer.publicKey.toBase58()}`)}`
    : `${theme.sharkGray("○")} ${theme.dim("instruction-only — no signer attached")}`;
  out.write(`\n${signerLine}\n\n`);
  for (const entry of MENU) {
    out.write(`  ${theme.gold(entry.key)}) ${entry.label}\n`);
  }
  out.write(`  ${theme.gold("q")}) 🚪 Swim away (quit)\n`);
}

/** Runs the interactive TUI. Returns a process exit code. */
export async function runTui(opts: TuiOptions = {}): Promise<number> {
  const input = opts.input ?? defaultStdin;
  out = opts.output ?? defaultStdout;

  out.write(theme.clearScreen());
  out.write(`${theme.banner()}\n`);

  const rl = createInterface({ input, output: out });

  let agent: ZkSharkAgent;
  try {
    agent = await theme.withSpinner("diving to fetch configuration...", () => ZkSharkAgent.fromEnv());
  } catch (err) {
    printError(err);
    out.write(`${theme.dim("\nSet ZK_SHARK_RPC_URL (and friends) and try again. Swimming away.\n\n")}`);
    rl.close();
    return 1;
  }

  let running = true;
  while (running) {
    printMenu(agent);
    const choice = (await rl.question(theme.prompt("choose an action ▸"))).trim().toLowerCase();
    if (choice === "q" || choice === "quit" || choice === "exit") {
      running = false;
      break;
    }
    const entry = MENU.find((m) => m.key === choice);
    if (!entry) {
      out.write(`\n${theme.finRed(`No fin for "${choice}" — pick one of the numbers above, or "q".`)}\n`);
      continue;
    }
    try {
      await entry.handler(rl, agent);
    } catch (err) {
      printError(err);
    }
    await pressEnter(rl);
    out.write(theme.clearScreen());
    out.write(`${theme.banner()}\n`);
  }

  out.write(theme.farewell());
  rl.close();
  return 0;
}
