#!/bin/bash

source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
set -e

echo "###> projects/docker-compose ###"
cd "$PROJECT_DIR/docker/compose"

DOCKER_COMPOSE_FILES="-f docker-compose.yml"
if [ "$APP_MODE" == "dev" ]; then
  DOCKER_COMPOSE_FILES="$DOCKER_COMPOSE_FILES -f docker-compose.dev.yml";
fi;

eval "docker-compose $DOCKER_COMPOSE_FILES pull"
eval "docker-compose $DOCKER_COMPOSE_FILES up -d --remove-orphans"

cd "$PROJECT_DIR"
echo "###< projects/setup ###"