FROM node:alpine

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install --only=production

COPY . .

# RUN npm run webpack

CMD [ "npm", "start" ]
