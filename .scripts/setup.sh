#!/bin/bash

source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
set -e

echo "###> projects/setup ###"

for project_common_symlink in \
        "visual-scripting-electron/src/common" \
        "visual-scripting-angular/projects/visual-scripting-common/src/lib";
do
    echo "Setup '$PROJECT_DIR/$project_common_symlink' symlink"
    rm -f "$PROJECT_DIR/$project_common_symlink"
    ln -s "$PROJECT_DIR/visual-scripting-common" "$PROJECT_DIR/$project_common_symlink"
done;

echo "###< projects/setup ###"
