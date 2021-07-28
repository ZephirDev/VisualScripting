#!/bin/bash

PROJECT_DIR="$(dirname "${BASH_SOURCE[0]}")/../"

if [ "${PROJECT_DIR:0:1}" != "/" ]; then
    PROJECT_DIR="$(pwd)/$PROJECT_DIR"
fi

if [ -z "$APP_MODE" ]; then
    APP_MODE="dev"
fi