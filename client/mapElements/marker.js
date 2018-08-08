import Leaflet from 'leaflet';

export const markerIcon = new Leaflet.Icon({
  iconUrl: require('../../public/images/ufo-icon.png'), 
  iconSize: [38, 38], 
  iconAnchor: [13, 16], //point of the icon which will correspond to the marker
  popupAnchor: [-3, -76] //point from which the popup should open relative to the iconAnchor
})

export const loadingIcon = new Leaflet.Icon({
  iconUrl: require('../../public/images/alien-head.png'),
  iconSize: [38, 38], 
  iconAnchor: [13, 16], //point of the icon which will correspond to the marker
  popupAnchor: [-3, -76] //point from which the popup should open relative to the iconAnchor
})