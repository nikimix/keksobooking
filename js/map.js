import { dataAds } from './main.js';
import { createAd } from './ads.js';
import { enableActiveState } from './page-state.js';
import { formNode, filterNode } from './main.js';


const addressNode = document.querySelector('#address');

const coordinatesMainMarker = {
  lat : 35.6894,
  lng : 139.6920,
};
const {lat,lng} = coordinatesMainMarker;

// added map
const map = L.map('map-canvas');

const loadMap = () => {
  map.on('load', () => {
    enableActiveState(formNode, filterNode);
    addressNode.value = `${lat}, ${lng}`;
  }).setView({
    lat : lat,
    lng : lng,
  },10);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map);
};

// added layer
//added icon marker's
const mainPinIcon = L.icon({
  iconUrl : 'img/main-pin.svg',
  iconSize : [52,52],
  iconAnchor : [26,52],
});

const pinIcon = L.icon({
  iconUrl : 'img/pin.svg',
  iconSize : [40,40],
  iconAnchor : [20,52],
});

// create and added marker
const mainPinMarker = L.marker(
  {
    lat : lat,
    lng : lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const addedMainMarker = () => {
  mainPinMarker.addTo(map);
};

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressNode.value = `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`;
});

// added ads on map
const addedAdsOnMap = () => {
  dataAds.forEach(({offer, author, location}) => {
    L.marker(
      {
        lat : location.lat,
        lng : location.lng,
      },
      {
        icon: pinIcon,
      }).addTo(map).bindPopup(createAd({offer, author}));
  });
};

export {loadMap, addedMainMarker, addedAdsOnMap};
