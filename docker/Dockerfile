# Stage 1: Build with PNPM
FROM node:24.0.2 AS builder

LABEL Title="Dockerized Hakibets UI"
LABEL Description="Hakibets UI containerized"
LABEL Authors="Calvine Otieno"

# Install PNPM globally
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files first for better caching
COPY pnpm-lock.yaml package.json ./

# Install dependencies (including approved build scripts)
RUN pnpm install --frozen-lockfile --unsafe-perm

# Copy the rest of the files
COPY . .

# Dynamic app version (pass via --build-arg APP_VERSION=...)
ARG APP_VERSION=unknown
ENV VITE_APP_VERSION=$APP_VERSION

# Build the app
RUN pnpm run build

# Stage 2: Nginx for serving static files
FROM nginx:alpine

ARG PORT=80
ENV PORT=$PORT

EXPOSE ${PORT}

# Copy Nginx configs
COPY docker/config/app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/config/app/nginx/conf.d/ /etc/nginx/conf.d/
COPY docker/config/app/entrypoint.sh /entrypoint.sh

# Make scripts executable
RUN chmod +x /entrypoint.sh /docker-entrypoint.d/*.sh

WORKDIR /usr/share/nginx/html

# Copy built files from builder stage
COPY --from=builder /app/dist ./

# Health check (optional)
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:${PORT} || exit 1
