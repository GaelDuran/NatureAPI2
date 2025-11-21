# Multi-stage Dockerfile for Angular production build and Nginx serving
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build -- --configuration production

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/nature-api /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
