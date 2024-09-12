#!/bin/bash

# 색상 코드 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # 색상 초기화

ECR_URL=202533511551.dkr.ecr.ap-northeast-2.amazonaws.com

echo "Step 1: Logging into ECR at $ECR_URL"
aws ecr get-login-password --region ap-northeast-2 --profile default | docker login --username AWS --password-stdin $ECR_URL
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully logged into ECR.${NC}"
else
    echo -e "${RED}Failed to log into ECR.${NC}" >&2
    exit 1
fi

echo "Step 2: Building Docker image for platform linux/arm64 with tag chunsik/dev/fe"
docker build --platform linux/arm64 -t chunsik/dev/fe --target dev ..
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Docker image built successfully.${NC}"
else
    echo -e "${RED}Failed to build Docker image.${NC}" >&2
    exit 1
fi

echo "Step 3: Tagging Docker image with ECR URL $ECR_URL"
docker tag chunsik/dev/fe:latest $ECR_URL/chunsik/dev/fe:latest
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Docker image tagged successfully.${NC}"
else
    echo -e "${RED}Failed to tag Docker image.${NC}" >&2
    exit 1
fi

echo "Step 4: Pushing Docker image to ECR repository $ECR_URL"
docker push $ECR_URL/chunsik/dev/fe:latest
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Docker image pushed to ECR successfully.${NC}"
else
    echo -e "${RED}Failed to push Docker image to ECR.${NC}" >&2
    exit 1
fi

echo -e "${GREEN}All steps completed successfully.${NC}"