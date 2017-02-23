# Makefile

install:
	npm install

build:
	npm run build

start:
	npm run babel-node -- src/bin/brain-games.js

publish:
	npm publish

lint:
	npm run eslint -- src

test:
	npm run test

.PHONY: test
