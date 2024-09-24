# Stage 1: Install base dependencies
FROM --platform=linux/arm64 node:18 AS pre
WORKDIR /app
RUN apt-get update && \
    apt-get install -y python3 make g++ build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev && \
    apt-get clean

# Stage 2: Install project dependencies based on the lockfile
FROM --platform=linux/arm64 pre AS deps
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn install --immutable; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Stage 3: Build the project
FROM --platform=linux/arm64 pre AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Set environment variables using build arguments
ARG NEXT_PUBLIC_API_URL
RUN echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> .env.production
ARG NEXT_PUBLIC_GA_ID
RUN echo "NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID" >> .env.production

RUN yarn build

# Stage 4: Final production image
FROM --platform=linux/arm64 node:18-alpine AS runner
WORKDIR /app

# Install curl for health check
RUN apk update && apk add --no-cache curl

ENV NODE_ENV production

# Copy built assets from builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "start"]
