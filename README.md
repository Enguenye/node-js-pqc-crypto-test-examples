This repository contains simple examples showing how to use the post-quantum cryptography algorithms available in the Node.js [`node:crypto`](https://nodejs.org/api/crypto.html) API.

## Examples

- **ML-KEM-768**
  - Generates a post-quantum key pair.
  - Establishes a shared secret using key encapsulation and decapsulation.
  - Uses the shared secret to encrypt and decrypt a message.

- **ML-DSA-65**
  - Generates a post-quantum signing key pair.
  - Signs a message using the private key.
  - Verifies the signature using the public key.

## Requirements

A recent Node.js version with support for ML-KEM and ML-DSA is required.
"""
