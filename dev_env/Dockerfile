FROM alpine:latest

# npm, nodejs
RUN apk add --update npm
# python3, pip, pip3
RUN apk add py3-pip

WORKDIR dev_env

COPY . /dev_env

RUN chown -R root /dev_env/
RUN chmod -R 777 /dev_env/

EXPOSE 3000 8000

#ENTRYPOINT ["npm", "start"]