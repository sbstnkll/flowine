FROM alpine:latest

# npm, nodejs
RUN apk add --update npm
# python3, pip, pip3
RUN apk add py3-pip

WORKDIR dev_env

EXPOSE 3000 8000

COPY . /dev_env

#ENTRYPOINT ["npm", "start"]