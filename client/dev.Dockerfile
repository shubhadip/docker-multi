# base image
FROM node:alpine

WORKDIR '/app'
COPY ./package.json .
# install dependency 
RUN npm install
COPY ./ ./ 

# start command
CMD ["npm", "run", "start"]