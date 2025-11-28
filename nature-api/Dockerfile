# ----------- STAGE 1: Build Angular App -----------
FROM node:24-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --force

# Copiar código fuente
COPY . .

# Generar archivo .env si existe el script (no falla si no existe)
RUN npm run create:secret-env || true

# Build de producción Angular
RUN npm run build

# Borrar .env para no incluir secretos en la imagen final
RUN rm -f .env


# ----------- STAGE 2: NGINX SERVE -----------
FROM nginx:alpine

# Copiar build de Angular al contenedor de Nginx
COPY --from=build /app/dist/nature-api/browser /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
