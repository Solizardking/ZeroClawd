export const name = "The Clawd Bot ZK Primitives";
export const slug = "clawd-zk-primitives";
export const runtime = "clawdbot";
export const catalogCommand = "clawdbot catalog zk";
export const install = "curl -fsSL https://cheshireterminal.ai/clawdbot | bash";
export const operations = [
  "publish_attestation",
  "consume_attestation",
  "commit_encrypted_state",
  "verify_proof",
  "compute_nullifier",
];
export const packages = {
  agent: "@clawd/zk-shark-agent",
  client: "@clawd/zk-client",
  catalog: "@clawd/zk-primitives",
};
export const docs = {
  repo: "https://github.com/Solizardking/clawdbot-go/tree/main/zk-primitives",
  metadata: "https://zk.x402.wtf/clawdbot/.well-known/clawdbot-zk.json",
};

export function manifest() {
  return { name, slug, runtime, catalogCommand, install, operations, packages, docs };
}
