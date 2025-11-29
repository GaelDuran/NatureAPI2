# Etapa 1 – Build Angular
FROM node:24-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --force

# Copia todo el proyecto
COPY . .

# Generar archivo secret.env.ts con las variables del contenedor
# Este archivo se creará usando setup-env.js (que debes tener en tu repo)
RUN node setup-env.js

# Build de producción Angular
RUN npm run build

# Etapa 2 – Servir con Nginx
FROM nginx:alpine

# Copiar build Angular a Nginx
COPY --from=build /app/dist/nature-api/browser /usr/share/nginx/html

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
