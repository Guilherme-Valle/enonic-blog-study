.PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := all

CWD := $(shell pwd)
NODE := $(CWD)/xp/node_modules
DCWD := /enonic-xp/source
DNODE := $(DCWD)/node_modules
USER := $(shell /usr/bin/id -u)
APP := myproject-xp-app

## Docker tasks: ##

# Enonic XP App
all: down up

up:## Build the app container image (if it doesn't exists) and runs the containers
	docker-compose -f docker/dev/docker-compose.yml up

down:## Stop and remove the containers that was created by 'make up' command
	docker-compose -f docker/dev/docker-compose.yml down

access:## Run an interactive bash session on app container
	docker exec -it $(APP) bash

clean:## Clear all existent gradlew services, builds and deploys
	docker exec -it $(APP) sh -c "(cd $(DCWD) && ./gradlew clean)"

build:## Build the app with gradlew
	docker exec -it $(APP) sh -c "(cd $(DCWD) && ./gradlew build)"
	docker exec -it $(APP) sh -c "(cd $(DCWD)/build/libs && unzip \*.jar 'lib/*' -d tmp)"
	docker exec -it $(APP) sh -c "(mv $(DCWD)/build/libs/tmp/lib/* $(DCWD)/build/libs/ && rm -fr $(DCWD)/build/libs/tmp)"

deploy:## Deploy the app with gradlew
	docker exec -it $(APP) sh -c "(cd $(DCWD) && ./gradlew deploy)"

install:## Runs 'npm install'
	docker exec -it $(APP) sh -c "(cd $(DCWD) && npm install)"

gulp:## Runs 'gulp'
	docker exec -it $(APP) sh -c "(cd $(DNODE)/.bin/ && ./gulp)"

grant:## Grant permissions to all Enonic files (Use it if you have access permissions issues)
	bash -c "sudo chmod -R a+rw . && sudo chown -R $(USER):$(USER) ."

