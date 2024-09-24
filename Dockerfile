# 1. Base image with system dependencies
FROM --platform=linux/arm64 node:18 AS base
WORKDIR /app

RUN apt-get update && \
    apt-get install -y python3 make g++ build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev && \
    apt-get clean

# Copy project files required for dependency installation
COPY package.json yarn.lock ./

# 2. Install dependencies only when needed
FROM base AS deps
RUN yarn install --frozen-lockfile

# 3. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy all source code and installed node_modules
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Set dotenv using the build arguments (Next.js automatically picks up env vars prefixed with NEXT_PUBLIC_)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GA_ID

# Next.js build step
RUN yarn build

# 4. Production image, copy only the necessary files
FROM --platform=linux/arm64 node:18-alpine AS runner
WORKDIR /app

# Install curl for health checks
RUN apk update && apk add --no-cache curl

ENV NODE_ENV production

# Copy built assets from builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the application port
EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "start"]
