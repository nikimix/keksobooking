import { enableFormActiveState } from './form-state.js';
import { createAd } from './ad.js';
const LAT = 35.6894;
const LNG = 139.6920;
const addressElement = document.querySelector('#address');
const adFormElement = document.querySelector('.ad-form');

function createMap(container, lat, lng) {
  return L.map(container).on('load', () => enableFormActiveState(adFormElement))
    .setView({
      lat,
      lng,
    }, 10);
}

function createTileLayer() {
  return L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
  });
}

const map = createMap('map-canvas', LAT, LNG);

createTileLayer().addTo(map);

function createMainMarkerIcon() {
  return L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52,52],
    iconAnchor: [26,52],
  });
}

function createMainMarker(lat, lng) {
  return L.marker(
    {
      lat,
      lng,
    },
    {
      draggable: true,
      icon: createMainMarkerIcon(),
    },
  );
}

const mainMarker = createMainMarker(LAT, LNG).addTo(map);

function getMainMarkerCoordinates(marker) {
  const coordinates = marker.getLatLng();
  return `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`;
}

function setMainMarkerCoordinatesInAddress(address = addressElement, marker = mainMarker) {
  address.value = getMainMarkerCoordinates(marker);
}

setMainMarkerCoordinatesInAddress();

mainMarker.on('moveend', () => setMainMarkerCoordinatesInAddress());

const markerGroup = L.layerGroup().addTo(map);

function createMarkerIcon() {
  return L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40,40],
    iconAnchor: [20,52],
  });
}

function createMarker(lat, lng) {
  return L.marker(
    {
      lat,
      lng,
    },
    {
      icon: createMarkerIcon(),
    });
}

function addAdToMap(ad) {
  const {lat, lng} = ad.location;
  const marker = createMarker(lat, lng);
  marker.addTo(markerGroup);
  marker.bindPopup(createAd(ad), {keepInView: false});
}

function addAdsToMap(ads) {
  markerGroup.clearLayers();
  ads.slice(0, 10).forEach((ad) => addAdToMap(ad));
}

function setDefaultMapView(lat = LAT, lng = LNG) {
  map.setView({lat, lng}, 10);
}

function setDefaultMainMarkerPosition(lat = LAT, lng = LNG) {
  mainMarker.setLatLng({lat, lng});
}

function resetMap() {
  setDefaultMapView();
  setDefaultMainMarkerPosition();
  setMainMarkerCoordinatesInAddress();
}

export { addAdsToMap, resetMap };
