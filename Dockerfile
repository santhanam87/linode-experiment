FROM node:16
ENV SERVICE_URL="23.239.26.178/gql"
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
COPY . /app
RUN yarn build
CMD [ "yarn", "serve" ]
EXPOSE 8000

