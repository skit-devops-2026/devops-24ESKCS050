.PHONY: install test build run docker-build docker-up

install:
	npm install

test:
	npm test

build:
	npm run build

run:
	npm run dev

# Needed from M4 onwards
docker-build:
	@echo "TODO: docker build for frontend and backend" && exit 1

docker-up:
	docker compose up --build
