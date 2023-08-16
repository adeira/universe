# Use the official nginx Docker image as base
# This image includes EXPOSE 80 which matches the default nginx port
# https://hub.docker.com/_/nginx
FROM nginx:1.25.2

# Define the maintainer of the Dockerfile
LABEL maintainer="mrtnzlml+abacus-tools@gmail.com"

# Copy the HTML file to the nginx default directory for hosting static files
# If you have more files, like CSS or JS files, you should add more COPY commands or
# switch to use the ADD command to copy a whole directory.
COPY newtab.html /usr/share/nginx/html/index.html

# The default command will start nginx in the foreground,
# as defined in the base image (nginx)
# It is not necessary to include a CMD or ENTRYPOINT instruction, unless you want to modify it

# The docker container will listen on port 80, as nginx runs on this port by default
EXPOSE 80

# This Dockerfile does not require any arguments at runtime
