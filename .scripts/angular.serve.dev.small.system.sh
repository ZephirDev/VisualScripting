#!/bin/bash

source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
set -e

echo "###> angular/serve ###"

cd "$PROJECT_DIR/visual-scripting-angular"
ng serve --watch=false

echo "###< angular/serve ###"
