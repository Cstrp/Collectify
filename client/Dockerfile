FROM node:16-alpine
WORKDIR /app
RUN npm install -g @angular/cli@13
COPY package.json pnpm-lock.yaml ./
RUN npm install
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
