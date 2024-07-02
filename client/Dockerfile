# Use the official Node.js image.
FROM node:20.11

# Create and change to the app directory inside the container.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install all dependencies, including devDependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the client in development mode with hot-reloading.
CMD [ "npm", "start" ]