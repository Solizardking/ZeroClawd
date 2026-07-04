# ZK Tests

Cross-package tests for the Clawd ZK primitive layer.

## Off-Chain Tests

```bash
cd client
npm test

cd ../agent
npm test
```

These cover nullifier derivation, public-input packing, proof-shape validation,
and deterministic intent routing.

## On-Chain Tests

```bash
cd programs/clawd-zk
cargo test-sbf
```

The Rust/SBF path needs a Light-compatible validator and configured state trees.
Use it for instruction-level behavior after deployment addresses are set.

## Test Boundaries

- Off-chain tests prove local packing/routing behavior.
- On-chain tests prove Anchor instruction behavior and CPI boundaries.
- Neither test path should require private keys committed to this repo.
