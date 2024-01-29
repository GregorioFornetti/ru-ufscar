FROM node:18-alpine
ARG admin_path
ARG public_path
ARG api_path
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY . .
WORKDIR /home/node/app/backend
RUN npm install
WORKDIR /home/node/app/frontend/admin
RUN npm install
ENV BASE_PATH $admin_path
ENV VITE_API_BASE_PATH $api_path
RUN npm run build
WORKDIR /home/node/app/frontend/public
RUN npm install
ENV BASE_PATH $public_path
RUN npm run build
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "app.js" ]