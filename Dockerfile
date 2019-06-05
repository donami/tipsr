FROM node:10.11-alpine

ENV NPM_CONFIG_LOGLEVEL notice
# ENV GRAPHQL https://tipsr-backend.herokuapp.com/graphql
# ENV CLIENT_URL https://tipsr.herokuapp.com
ENV GRAPHQL http://18.216.230.185:3030/graphql
ENV CLIENT_URL http://18.216.230.185


# Install NPM packages
WORKDIR /app
ADD package*.json ./
RUN npm i
ADD . .

# Build
RUN npm run build

EXPOSE 3000

CMD npm run production
