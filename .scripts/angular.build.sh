#!/bin/bash

source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
set -e

echo "###> angular/build ###"

cd "$PROJECT_DIR/visual-scripting-angular"
ng build visual-scripting-common
ng build visual-scripting-editor
ng build --base-href="./"

echo "###< angular/build ###"
