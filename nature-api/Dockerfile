# Etapa 1 – Build Angular
FROM node:24-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --force

# Copiar proyecto completo
COPY . .

# Crear archivo secret.env.ts dentro de src/environments/
RUN node setup-env.js

# Build de producción Angular
RUN npm run build

# Etapa 2 – Servir con Nginx
FROM nginx:alpine

# Copiar build Angular (Angular 17+)
COPY --from=build /nature-api/dist/browser /usr/share/nginx/html

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
