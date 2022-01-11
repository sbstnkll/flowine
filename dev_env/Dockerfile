FROM ubuntu:latest

RUN apt-get -y update
RUN apt-get install -y curl
RUN apt-get install -y sudo

# download nodejs:
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
# install nodejs:
RUN sudo apt-get install -y nodejs
RUN sudo apt-get install -y python3-pip
# install opencv-python, skip questions:
#RUN sudo DEBIAN_FRONTEND=noninteractive apt-get -yq install python3-opencv

WORKDIR dev_env/dev_envexit

COPY . /dev_env

RUN pip3 install -r requirements.txt

EXPOSE 8000

#CMD ["npm", "start"]