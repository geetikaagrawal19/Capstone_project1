# Stage 1: Build frontend
FROM node:18 AS build-frontend

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build


# Stage 2: Final image with backend and frontend build
FROM node:18

WORKDIR /app

# Copy backend source code
COPY backend ./backend

# Copy frontend build from build-frontend stage into backend's public folder
COPY --from=build-frontend /app/frontend/build /app/backend/public

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Expose backend port
EXPOSE 5001

# Start backend server (serves frontend too if configured)
CMD ["node", "server.js"]