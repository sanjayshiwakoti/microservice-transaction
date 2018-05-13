FROM node:9

# Port Application listens on
EXPOSE 9001

# Copy app and install packages
WORKDIR /app
COPY . /app/
RUN yarn install

# Default app commands
ENTRYPOINT ["yarn"]
CMD ["start:dev"]
