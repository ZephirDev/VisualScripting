#!/bin/bash

source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
set -e

cd "$PROJECT_DIR/visual-scripting-electron"
rm -rf ./dist
mkdir -p ./dist

echo "###> angular/build/copy ###"
for folder in $(ls "$PROJECT_DIR/visual-scripting-angular/dist/"); do
    cp -Rv "$PROJECT_DIR/visual-scripting-angular/dist/$folder" "./dist/"
done
echo "###< angular/build/copy ###"

echo "###> electron/build ###"
pwd
$PROJECT_DIR/visual-scripting-electron/node_modules/.bin/tsc
cp package.json ./dist/visual-scripting-electron/
echo "###< electron/build ###"
