#!/usr/bin/env bash
set -euo pipefail

cd /workspace/MASTERCLASS.CORP
node --version
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run build
