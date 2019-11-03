init:
	npm install

test: init
	npm test

build: test
	./scripts/build.sh

deploy: build
	./scripts/deploy.sh
