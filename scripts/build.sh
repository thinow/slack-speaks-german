#!/usr/bin/env bash -ex

rm -rfv generated

mkdir -p generated/package

# Remove the unnecessary dependencies
npm prune --production

# Copy the sources
cp -R node_modules src resources index.js generated/package

# Compress in a zip file
pushd generated/package
    TIMESTAMP=$(date +"%s")
    OUTPUT_FILE_NAME="package.${TIMESTAMP}.zip"
    zip -r "../${OUTPUT_FILE_NAME}" ./node_modules src/* resources/* index.js
popd

# Reinstall the dependencies
npm install
