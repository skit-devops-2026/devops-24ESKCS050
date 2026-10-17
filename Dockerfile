FROM node:20-alpine

WORKDIR /app

# Install dependencies first so Docker can cache this layer between builds
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the rest of the project
COPY server.js ./
COPY frontend ./frontend

# Commit SHA gets baked in at build time (see docker-compose.yml / CI) so
# /health can report exactly which build is running.
ARG GIT_SHA=unknown
ENV GIT_SHA=$GIT_SHA
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
