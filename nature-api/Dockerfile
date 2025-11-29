# ============================
# Etapa 1 · Build Angular
# ============================
FROM node:24-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --force

# Copiar todo el proyecto
COPY . .

# Generar archivo secret.env.ts DENTRO de src/environments/
RUN node setup-env.js

# Compilar Angular (Angular 17 usa esta ruta)
RUN npm run build


# ============================
# Etapa 2 · Servir con Nginx
# ============================
FROM nginx:alpine

# Copiar archivos generados por Angular
COPY --from=build /app/dist/nature-api/browser /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
