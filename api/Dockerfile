# Use the specific Node.js image that supports import.meta.dirname
FROM node:20.11

# Create and change to the app directory inside the container.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install all dependencies, including devDependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Install nodemon globally
RUN npm install -g nodemon

# Run the web service on container startup in development mode with nodemon.
CMD [ "nodemon", "." ]

# Expose the port the app runs on
EXPOSE 2000