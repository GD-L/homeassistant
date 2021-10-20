# Home Assistant Setup

<div align="center">
  <img src="https://raw.githubusercontent.com/home-assistant/assets/master/logo/logo-pretty.png" height ="220" align="center">
</div>

[![GitHub Super-Linter](https://github.com/GD-L/homeassistant/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)


This is my Home Assistant setup. I have Home Assistant have set up on Ubunutu Server on ESXi, hosting [Docker](https://www.docker.com/).

In order to get [Haaska](https://github.com/mike-grant/haaska) working, I used [NginxProxyManager](https://nginxproxymanager.com/) to server Home Assistant along with other services.

Home Assistant was set up using the [homeassistant/home-assistant](https://hub.docker.com/r/homeassistant/home-assistant/) Docker Image. `/PATH_TO_YOUR_CONFIG` was remapped to `/docker/homeassistant`
The equivalent docker run would be:

`docker run --init -d --name="home-assistant" -e "TZ=America/New_York" -v /docker/homeassistant:/config --net=host homeassistant/home-assistant:stable`

Update 2020-01-23: Docker run command migrated to [docker-compose](docker-compose.yaml). This will make it easier in the future to update Home Assistant releases.

## Components

### Hardware

* ~~[Wink Hub 2](https://www.wink.com/products/wink-hub-2/) - This currently serves as my hub for most components, specifically for Z-Wave and Zigbee devices.~~
* After Wink decided they wanted to start charging for their services, I threw the hub in the trash can, and got a [HUSBZB-1](https://www.amazon.com/GoControl-CECOMINOD016164-HUSBZB-1-USB-Hub/dp/B01GJ826F8), that now serves as my Z-Wave and ZigBee hub.
  
  * [Sylvania Smart Plug](https://consumer.sylvania.com/our-products/smart/product-info/zigbee/sylvania-smart-zigbee-indoor-smart-plug/index.jsp) (2x)
  * [GE Z-Wave In-Wall Switch](https://byjasco.com/products/ge-z-wave-plus-wall-smart-switch-white-toggle)
  * [Wink Door Sensor](https://www.wink.com/products/wink-doorwindow-sensor/) (2x)
  * [Wink Siren and Chime](https://www.wink.com/products/wink-siren-and-chime/)
* [Ecobee Lite3 Thermostats](https://www.ecobee.com/ecobee3-lite/) (2x: Upstairs, Downstairs)
* [WeMo Smart Plug (F7C027)](https://www.belkin.com/us/Products/smarthome-iot/c/wemo/)
* [Roku Streaming Stick+](https://www.roku.com/products/streaming-stick-plus)

### Sensors & Integrations

* [piHole](https://www.home-assistant.io/components/pi_hole/)
* [Glances](https://www.home-assistant.io/components/glances/)
* [UPnP](https://www.home-assistant.io/components/upnp/)
* [Vacuum](https://www.home-assistant.io/components/template/) Uses a template sensor to gather `battery_level` and `status` from state attribute.
* [Weather](https://www.home-assistant.io/components/darksky/) Uses DarkSky for additional weather sensors.
* [Plex](https://www.home-assistant.io/components/plex/)
* [Ecobee](https://www.home-assistant.io/components/ecobee/)
* [DarkSky](https://www.home-assistant.io/components/darksky/)
* [Roku](https://www.home-assistant.io/components/roku/)
* [Ecovacs](https://www.home-assistant.io/components/ecovacs/)
* [Speedtest](https://www.home-assistant.io/components/speedtestdotnet/)
* [Owntracks](https://www.home-assistant.io/components/owntracks/)

## Automations
[Automations](https://github.com/gregdelima/homeassistant/tree/master/automations) moved to directory and split out based on functionality:
* [Lights](https://github.com/gregdelima/homeassistant/blob/master/automations/lights.yaml)
* [Sensors](https://github.com/gregdelima/homeassistant/blob/master/automations/sensors.yaml)
* [Telegram](https://github.com/gregdelima/homeassistant/blob/master/automations/telegram.yaml)
* [Thermostats](https://github.com/gregdelima/homeassistant/blob/master/automations/thermostatautomations.yaml)

## WIP
As with most things, this is a work in progress so there may be updates and/or small tweaks here and there.