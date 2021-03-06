FROM node:latest

LABEL maintainer="Carlos Abdalla"

# RUN apt-get update && apt-get -y install apt-transport-https curl
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# RUN apt-get update
# RUN apt-get install yarn -y

ADD . /app
WORKDIR /app

# RUN npm i

EXPOSE 3000

CMD ["npm","start"]
