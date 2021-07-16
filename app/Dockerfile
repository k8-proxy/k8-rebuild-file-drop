FROM node:12 AS builder
WORKDIR /context
COPY package*.json .
RUN npm install
COPY . .
ARG REACT_APP_ANALYSE_API_ENDPOINT='https://corpfiledrop.glasswallsolutions.com'
ARG REACT_APP_FILETYPEDETECTION_API_ENDPOINT='https://corpfiledrop.glasswallsolutions.com'
ARG REACT_APP_REBUILD_API_ENDPOINT='https://corpfiledrop.glasswallsolutions.com'
ARG REACT_APP_ANALYSE_API_KEY='no-need'
ARG REACT_APP_FILETYPEDETECTION_API_KEY='no-need'
ARG REACT_APP_REBUILD_API_KEY='no-need'
RUN yarn build

FROM nginx:1.21-alpine AS runner
ENV NGINX_ENTRYPOINT_QUIET_LOGS=1
COPY --from=builder /context/build /usr/share/nginx/html