FROM node:alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

#node modules
RUN npm i 

COPY . .

#Como es el ultimo comando para levantar el contendor se usa CMD donde el codgio va en corchetes, separado por comas y entre comillas
RUN npm run build
CMD ["node", "index.js"]