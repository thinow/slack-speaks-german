#!/usr/bin/env bash -ex

SOURCE_CODE_BUCKET_NAME="thierry-nowak-eu-central-1"
SOURCE_CODE_BUCKET_KEY="aws-lambda-functions/slack-speaks-german/package.zip"

BASE_FOLDER=$(dirname "$0")

aws cloudformation deploy \
    --stack-name "slack-speaks-german" \
    --template-file "${BASE_FOLDER}/../proviosining/lambda-function.template" \
    --parameter-overrides \
        S3BucketName=${SOURCE_CODE_BUCKET_NAME} \
        S3BucketKey=${SOURCE_CODE_BUCKET_KEY} \
    --capabilities CAPABILITY_IAM
