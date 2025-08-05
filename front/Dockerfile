#Stage 1: Build the frontend application
# This stage compiles the frontend code and prepares it for production.
# Use Node.js for building the frontend application

FROM node:18-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
# This stage uses Nginx to serve the built frontend application.
# It copies the built files from the first stage and configures Nginx.
# Use Nginx to serve the built application

FROM nginx:alpine
COPY --from=base /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]