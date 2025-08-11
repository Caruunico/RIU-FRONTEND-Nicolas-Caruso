# Etapa 1: Build Angular
FROM node:latest AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build -- --configuration=production

# Etapa 2: Servir con nginx
FROM nginx:latest

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/riu-frontend-nicolas-caruso/browser/. /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
