FROM node:10.16.3

RUN mkdir -p /project
WORKDIR /project

# RUN npm i -g pm2

COPY . /project

EXPOSE 8000

CMD ["node", "app.js"]