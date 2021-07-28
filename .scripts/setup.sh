#!/bin/bash

source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
set -e

echo "###> projects/setup ###"

function setupSymlink() {
    file="$1"
    shift
    while [ -n "$1" ]; do
      echo "Setup symlink: '$PROJECT_DIR/$file' -> '$PROJECT_DIR/$1'"
      rm -f "$PROJECT_DIR/$1"
      ln -s "$PROJECT_DIR/$file" "$PROJECT_DIR/$1"
      shift
    done;
}

setupSymlink "visual-scripting-common" \
  "visual-scripting-electron/src/common" \
  "visual-scripting-angular/projects/visual-scripting-common/src/lib";

setupSymlink "env.json" \
  "visual-scripting-electron/src/assets/env.json" \
  "visual-scripting-angular/src/assets/env.json";

setupSymlink "env.dev.json" \
  "visual-scripting-electron/src/assets/env.dev.json" \
  "visual-scripting-angular/src/assets/env.dev.json";


echo "###< projects/setup ###"
