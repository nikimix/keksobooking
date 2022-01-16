import { createAd } from './ad.js';
import { onActiveStateFormAd } from './form-state.js';
const LAT = 35.6894;
const LNG = 139.6920;
const addressElement = document.querySelector('#address');

const map = L.map('map-canvas').on('load', () => {
  onActiveStateFormAd();
})
  .setView({
    lat: LAT,
    lng: LNG,
  },10);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);

const iconMainMarker = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52,52],
  iconAnchor: [26,52],
});

const mainMarker =  L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: iconMainMarker,
  },
).addTo(map);

const setCoordinatesMarkerInField = () => {
  const coordinates = mainMarker.getLatLng();
  addressElement.value = `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`;
};
setCoordinatesMarkerInField();

mainMarker.on('moveend', () => {
  setCoordinatesMarkerInField();
});


const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {lat, lng} = point.location;
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40,40],
    iconAnchor: [20,52],
  });
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    });
  marker
    .addTo(markerGroup)
    .bindPopup(
      createAd(point),
      {
        keepInView: false,
      },
    );
};

const addAdsToMap = (dataAds) => {
  markerGroup.clearLayers();
  dataAds.slice(0, 10).forEach((item) => {
    createMarker(item);
  });
};

const setViewMapDefault = () => {
  map.setView({
    lat: LAT,
    lng: LNG,
  },10);
};

const setPositinMainMarkerDefault = () => {
  mainMarker.setLatLng(
    {
      lat: LAT,
      lng: LNG,
    },
  );
};

export { addAdsToMap };
export { setCoordinatesMarkerInField, setViewMapDefault, setPositinMainMarkerDefault };
