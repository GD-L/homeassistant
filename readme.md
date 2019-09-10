<p align="center">
  <img src="https://raw.githubusercontent.com/home-assistant/home-assistant-assets/master/logo-pretty.png" height ="220" align="center">
</p>

# Home Assistant Setup

This is my Home Assistant setup. I have Home Assitant setup on a [CoreOS](https://coreos.com/) instance on ESXi. CoreOS then hosts [Docker](https://www.docker.com/) with 8GB RAM (currently) dedicated to all Docker instances.

I set up HomeAssistant along side my [Docker-Nginx](https://gitlab.com/gregdelima/docker-nginx) instance allowing for SSL and building with [Haaska](https://github.com/mike-grant/haaska).

Home Assistant was set up using the [homeassistant/home-assistant](https://hub.docker.com/r/homeassistant/home-assistant/) Docker Image. `/PATH_TO_YOUR_CONFIG` was remapped to `/docker/homeassistant` 
The equvanelnt docker run would be:

`docker run --init -d --name="home-assistant" -e "TZ=America/New_York" -v /docker/homeassistant:/config --net=host homeassistant/home-assistant:stable`

## Components

### Hardware

* [Wink Hub 2](https://www.wink.com/products/wink-hub-2/) - This currently serves as my hub for most components, specifically for Z-Wave and Zigbee devices.
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
Automations are currently built into the [automations.yaml](https://gitlab.com/gregdelima/homeassistant/blob/master/automations.yaml) this may change to a `!include_dir_merge_list` in a future state.

# WIP
As with most things, this is a work in progress so there may be updates and/or small tweaks here and there.