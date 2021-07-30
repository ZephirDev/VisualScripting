
all: setup

setup:
	@./.scripts/setup.sh

build: angular-build electron-build

angular-build:
	@./.scripts/angular.build.sh

electron-build:
	@./.scripts/electron.build.sh

dev: electron-dev

angular-dev: angular-build
	@./.scripts/angular.serve.dev.small.system.sh

electron-serve:
	@./.scripts/electron.serve.sh

electron-dev: angular-build electron-build electron-serve

up:
	@./.scripts/docker-compose.up.sh

down:
	@./.scripts/docker-compose.down.sh
