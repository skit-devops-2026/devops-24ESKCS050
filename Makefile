.PHONY: install test build run docker-build docker-up

install:
	npm install

test:
	npm test

build:
	npm run build

run:
	npm start

docker-build:
	docker build --build-arg GIT_SHA=$$(git rev-parse HEAD) -t devops-24eskcs050:local .

docker-up:
	docker compose up --build
