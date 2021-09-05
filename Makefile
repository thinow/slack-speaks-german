init:
	npm install

test: init
	npm test

run: init
	node run.js

build: test
	./scripts/build.sh

deploy: build
	./scripts/deploy.sh
