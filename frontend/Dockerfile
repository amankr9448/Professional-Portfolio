# --- build stage ---
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- serve stage ---
# The build output is static HTML/CSS/JS (next.config.ts sets output:"export"),
# so the runtime image is just a static file server -- no Node.js needed.
FROM nginx:1.27-alpine
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
