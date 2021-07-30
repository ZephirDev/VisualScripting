#!/bin/bash

source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
source "$(dirname "${BASH_SOURCE[0]}")/docker-compose.env.sh"
set -e

echo "###> projects/docker-compose ###"
cd "$PROJECT_DIR/docker/compose"
eval "docker-compose $DOCKER_COMPOSE_FILES down"
cd "$PROJECT_DIR"
echo "###< projects/docker-compose ###"