# base image
FROM node:alpine

WORKDIR '/app'
COPY package*.json .
# install dependency 
RUN npm install
COPY . .
RUN npm run build

# /app/build build directory


FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf  /etc/nginx/conf.f/default.conf
COPY --from=0 /app/build /usr/share/nginx/html
