#!/bin/bash

#Move to docker directory
cd /docker/homeassistant
#Bring down the container with docker-compose
docker-compose down
#Grab the image ID into the variable. Docker images, search for home-assistant, print the 3rd column (the >
img_dock=$(docker images | grep home-assistant  | awk '{ print $3 }')
#Remove the image in the variable
docker image rm $img_dock
#remove image for zwavejs
img_zwave=$(docker images | grep zwavejs  | awk '{ print $3 }')
docker image rm $img_zwave
#Bring container back up.
docker-compose up -d