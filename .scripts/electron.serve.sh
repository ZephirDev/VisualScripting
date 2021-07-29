#!/bin/bash

source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
set -e

echo "###> electron/serve ###"
cd "$PROJECT_DIR/visual-scripting-electron/dist/visual-scripting-electron/src"
$PROJECT_DIR/visual-scripting-electron/node_modules/.bin/electron .
echo "###> electron/serve ###"
