#!/usr/bin/env bash -ex

rm -rfv generated

mkdir -p generated/package

# Remove the unnecessary dependencies
npm prune --production

# Copy the sources
cp -R node_modules src resources index.js generated/package

# Compress in a zip file
pushd generated/package
    zip -r ../package.zip ./node_modules src/* resources/* index.js
popd

# Reinstall the dependencies
npm install
