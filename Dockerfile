# ---------- Build stage ----------
FROM node:20-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy and install dependencies first (for better caching)
COPY package*.json ./
RUN npm install

# Copy the rest of your source code
COPY . .

# Accept build argument from docker-compose or CLI
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build the React app (this step bakes REACT_APP_API_URL into the JS bundle)
RUN npm run build


# ---------- Runtime stage ----------
FROM nginx:alpine

# Copy the optimized build files to Nginx’s default html folder
COPY --from=build /app/build /usr/share/nginx/html

# (Optional) custom Nginx config to route /api to backend internally
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
 