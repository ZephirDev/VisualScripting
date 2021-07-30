#!/bin/bash

DOCKER_COMPOSE_FILES="-f docker-compose.yml"
if [ "$APP_MODE" == "dev" ]; then
  DOCKER_COMPOSE_FILES="$DOCKER_COMPOSE_FILES -f docker-compose.dev.yml";
fi;
