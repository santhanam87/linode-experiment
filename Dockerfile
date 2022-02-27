FROM node:16
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
COPY . /app
RUN yarn build
CMD [ "yarn", "watch" ]
EXPOSE 8000
