#!/bin/bash

#Move to docker directory
cd /docker/homeassistant
#Bring down the container with docker-compose
docker-compose down
#Grab the image ID into the variable. Docker images, search for home-assistant, print the 3rd column (the ID)
img_dock=$(docker images | grep home-assistant  | awk '{ print $3 }')
#Remove the image in the variable
docker image rm $img_dock
#Bring container back up.
docker-compose up -d

exit