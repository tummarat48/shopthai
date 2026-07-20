#!/usr/bin/env sh
set -e
mkdir -p dist
TS=$(date +%Y%m%d%H%M%S)
NAME="shopthai-${TS}.zip"
echo "Building project..."
npm run build
echo "Creating ${NAME}..."
zip -r "dist/${NAME}" . -x node_modules/**\* .git/**\* .next/**\* dist/**\* .github/**\*
echo "Created dist/${NAME}"
