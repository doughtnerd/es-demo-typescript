FROM node:18 AS base

WORKDIR /usr/src/

FROM base AS deps
COPY package*.json .
RUN npm install --no-audit --prefer-offline

FROM deps AS dev
COPY . .
CMD ['npm', 'dev']
