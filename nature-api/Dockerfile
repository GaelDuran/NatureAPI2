# Etapa 1 – Build Angular
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --force

# Copiar todo el proyecto
COPY . .

# Generar secret.env.ts (asegúrate de que setup-env.js existe)
RUN node setup-env.js

# Build de producción Angular
RUN npm run build

# Etapa 2 – Nginx
FROM nginx:alpine

# Copiar build REAL de Angular (Angular 17+)
COPY --from=build /app/dist/nature-api/browser /usr/share/nginx/html

# Copiar nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
