FROM node:fermium-buster-slim

WORKDIR /app


# Needed for typescript language support
RUN npm install -g typescript

# Needed for building swagger
RUN npm install -g @nestjs/cli

COPY package*.json /app/

RUN npm install

COPY . /app/

# Use nest build underneath see package.json
RUN npm run build

CMD [ "node", "dist/main"]