# Etapa 1: Build de Angular
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .
RUN node setup-env.js
RUN npm run build


# Etapa 2: Nginx
FROM nginx:alpine

# ❗ ELIMINAR default.conf para que NO se muestre la página default de nginx
RUN rm -f /etc/nginx/conf.d/default.conf

# Copiar build Angular
COPY --from=build /app/dist/nature-api/browser /usr/share/nginx/html

# Copiar tu config de nginx
COPY nginx.conf /etc/nginx/nginx.conf
