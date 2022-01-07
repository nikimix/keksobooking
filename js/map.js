import { createAd } from './template.js';
import { onActiveStateFormAd } from './form-state.js';
const LAT = 35.6894;
const LNG = 139.6920;
const containerForMap = 'map-canvas';
const addressElement = document.querySelector('#address');

const setAddressDefault = () => {
  addressElement.value = `${LAT.toFixed(4)}, ${LNG.toFixed(4)}`;
};

const map = L.map(containerForMap).on('load', () => {
  onActiveStateFormAd();
  setAddressDefault();
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

const setCoordinatesMarkerInField = (marker, field) => {
  const coordinates = marker.getLatLng();
  field.value = `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`;
};

mainMarker.on('moveend', (evt) => {
  setCoordinatesMarkerInField(evt.target, addressElement);
});

const pinIcon = L.icon({
  iconUrl : 'img/pin.svg',
  iconSize : [40,40],
  iconAnchor : [20,52],
});

const createPinMarker = (lat, lng) => L.marker(
  {
    lat : lat,
    lng : lng,
  },
  {
    icon: pinIcon,
  }).addTo(map);

const addAdsToMap = (data) => {
  // const filteredArray = data.filter(({offer}) => offer.type !== 'flat').slice(0,10);
  data.forEach(({offer, author, location}) => {
    createPinMarker(location.lat, location.lng)
      .bindPopup(
        createAd({offer, author}),
        {
          keepInView: true,
        },
      );
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

document.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
  evt.preventDefault();
  setAddressDefault();
  setViewMapDefault();
  setPositinMainMarkerDefault();
});

export { addAdsToMap };
export { setAddressDefault, setViewMapDefault, setPositinMainMarkerDefault };
