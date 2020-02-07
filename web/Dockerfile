# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.16.2

# Set the working directory to /web
WORKDIR /web

# copy package.json into the container at /web
COPY package*.json /web/

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /web
COPY . /web/

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]