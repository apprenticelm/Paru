# Build stage
FROM node:16-alpine AS build
ENV NODE_ENV production


ARG JWT_KEY=K1K1A9R1A9T13s3e3c3r3e7t73k3e3y
ENV JWT_KEY $JWT_KEY

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application files
COPY . .

EXPOSE 5000

# Start the application
CMD ["yarn", "start"]
