FROM alpine:3.4

LABEL authors="KYEWON SEO <k@bluehack.net>"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk add --update nodejs bash git

COPY package.json /usr/src/app/
RUN npm install
RUN npm install apiway-report -g

COPY . /usr/src/app

EXPOSE 8080

CMD [ "npm", "run", "pod" ]
