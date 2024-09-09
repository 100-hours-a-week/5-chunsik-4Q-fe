# 1. Install dependencies only when needed
FROM node:18 AS deps
RUN apt update && \
    apt install -y python3 make g++ build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev && \
    apt clean
RUN npm install -g node-gyp
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM node:18 AS builder
RUN apt update && \
    apt install -y python3 make g++ build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev && \
    apt clean
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# 3. Production image, copy all the files you need to run the app
FROM node:18-alpine AS runner
WORKDIR /app

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