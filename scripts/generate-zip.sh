#!/usr/bin/env bash -ex

npm test

npm prune --production

rm -rfv build
mkdir build
zip -r build/aws-lambda-export.zip node_modules src/* index.js

npm install
