FROM node:20-alpine

WORKDIR /app
COPY src /app/src
COPY entrypoint.sh /app
COPY next-env.d.ts /app
COPY next.config.mjs /app
COPY package.json /app
COPY package-lock.json /app
COPY postcss.config.mjs /app
COPY tailwind.config.ts /app
COPY tsconfig.json /app

RUN npm ci

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh", "npm", "run", "start"]