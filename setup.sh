#!/bin/bash
set -e

# Install pnpm globally
npm install -g pnpm@latest

# Add pnpm to PATH
export PNPM_HOME="/root/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

# Verify installation
which pnpm
pnpm --version