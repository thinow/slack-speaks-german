#!/usr/bin/env bash -ex

BASE_FOLDER=$(dirname "$0")

# check environment variables
[[ -z "${BUCKET_NAME}" ]] && echo "Error: Missing the environment variable BUCKET_NAME" && exit 1
[[ -z "${BUCKET_KEY}" ]] && echo "Error: Missing the environment variable BUCKET_KEY" && exit 1
[[ -z "${WEBHOOK}" ]] && echo "Error: Missing the environment variable WEBHOOK" && exit 1

# Search the source code
PACKAGE_PATH=$(find "${BASE_FOLDER}/../generated" -name *.zip)
PACKAGE_FILENAME=$(basename ${PACKAGE_PATH})

[[ -z "${PACKAGE_PATH}" ]] && echo "Error: Package file is missing. Building is required before publishing." && exit 2

# Publishes the source code to S3
aws s3 cp "${PACKAGE_PATH}" "s3://${BUCKET_NAME}/${BUCKET_KEY}/${PACKAGE_FILENAME}"

# Runs the provisioning
aws cloudformation deploy \
    --stack-name "${STACK_NAME:-slack-speaks-german}" \
    --template-file "${BASE_FOLDER}/../provisioning/lambda-function.yaml" \
    --parameter-overrides \
        S3BucketName="${BUCKET_NAME}" \
        S3BucketKey="${BUCKET_KEY}/${PACKAGE_FILENAME}" \
        WebHook="${WEBHOOK}" \
        ScheduleState="${SCHEDULE_STATE:-DISABLED}" \
        ScheduleExpression="${SCHEDULE_EXPRESSION:-cron(0 6 ? * MON-FRI *)}" \
        LambdaFunctionName="${LAMBDA_FUNCTION_NAME:-SlackSpeaksGerman}" \
        RolePermissionsBoundary="${ROLE_PERMISSIONS_BOUNDARY:-}" \
        ResourcesPath="${RESOURCES_PATH:-/}" \
        TagTeam="${TAG_TEAM:-undefined}" \
        TagSystemID="${TAG_SYSTEM_ID:-undefined}" \
    --capabilities CAPABILITY_IAM
