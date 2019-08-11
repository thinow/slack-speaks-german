#!/usr/bin/env bash -ex

npm install
npm test

rm -rfv generated

mkdir -p generated/package/resources

# Generate the resources
node ./scripts/prints-filtered-words.js > generated/package/resources/words.json

# Remove the unnecessary dependencies
npm prune --production

# Copy the sources
cp -R node_modules src index.js generated/package

# Compress in a zip file
pushd generated/package
    zip -r ../package.zip ./node_modules src/* resources/* index.js
popd

# Reinstall the dependencies
npm install
