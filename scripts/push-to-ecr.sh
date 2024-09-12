#!/bin/bash

ECR_URL=202533511551.dkr.ecr.ap-northeast-2.amazonaws.com

echo "Step 1: Logging into ECR at $ECR_URL"
aws ecr get-login-password --region ap-northeast-2 --profile default | docker login --username AWS --password-stdin $ECR_URL
if [ $? -eq 0 ]; then
    echo "Successfully logged into ECR."
else
    echo "Failed to log into ECR." >&2
    exit 1
fi

echo "Step 2: Building Docker image for platform linux/arm64 with tag chunsik/dev/fe"
docker build --platform linux/arm64 -t chunsik/dev/fe ..
if [ $? -eq 0 ]; then
    echo "Docker image built successfully."
else
    echo "Failed to build Docker image." >&2
    exit 1
fi

echo "Step 3: Tagging Docker image with ECR URL $ECR_URL"
docker tag chunsik/dev/fe:latest $ECR_URL/chunsik/dev/fe:latest
if [ $? -eq 0 ]; then
    echo "Docker image tagged successfully."
else
    echo "Failed to tag Docker image." >&2
    exit 1
fi

echo "Step 4: Pushing Docker image to ECR repository $ECR_URL"
docker push $ECR_URL/chunsik/dev/fe:latest
if [ $? -eq 0 ]; then
    echo "Docker image pushed to ECR successfully."
else
    echo "Failed to push Docker image to ECR." >&2
    exit 1
fi

echo "All steps completed successfully."