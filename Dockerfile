# Multi-stage build for production TypeScript application

# Stage 1: Build stage - compile TypeScript
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

RUN npm run build

# Stage 2: Production stage - runtime only
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of app directory
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1

# Start the application
CMD ["node", "dist/main.js"]