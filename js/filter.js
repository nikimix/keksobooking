import { addAdsToMap } from './map.js';

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const adFilterElement = document.querySelector('.map__filters');

function getStringPriceValue(number) {
  if(number <= LOW_PRICE) {
    return 'low';
  }

  if(number >= HIGH_PRICE) {
    return 'high';
  }

  return 'middle';
}

function getFilterFeatures() {
  const selectedFeatures = document.querySelectorAll('.map__checkbox:checked');

  if (selectedFeatures.length > 0) {
    return Array.from(selectedFeatures).map((feature) => feature.value).sort().join(', ');
  }

  return 'any';
}

function getFilterElements() {
  return {
    housingType: document.querySelector('#housing-type').value,
    housingPrice: document.querySelector('#housing-price').value,
    numberRooms: document.querySelector('#housing-rooms').value,
    numberGuests: document.querySelector('#housing-guests').value,
    housingFeatures: getFilterFeatures(),
  };
}

function getCurrentFiltersValues() {
  const {housingType, housingPrice, numberRooms, numberGuests, housingFeatures} = getFilterElements();

  return [housingType, housingPrice, numberRooms, numberGuests, housingFeatures];
}

function getAdFeatures(features) {
  const housingFeatures = features;

  if(housingFeatures) {
    return Array.from(housingFeatures).map((feature) => feature).sort().join(', ');
  }

  return '';
}

function getStringAdValues(ad) {
  const housingType = ad.offer.type;
  const housingPrice = getStringPriceValue(ad.offer.price);
  const numberOfRooms = `${ad.offer.numberRooms}`;
  const numberOfGuests = `${ad.offer.guests}`;
  const housingFeatures = getAdFeatures(ad.offer.features);

  return [housingType, housingPrice, numberOfRooms, numberOfGuests, housingFeatures];
}

function isMatchAdToFilters(adValues, filtersValues) {
  for(let index = 0; index < filtersValues.length; index++) {
    if(filtersValues[index] === 'any') {
      continue;
    }

    if(filtersValues[index] !== adValues[index]) {
      return false;
    }
  }

  return true;
}

function filterAds(ads) {
  const currentFiltersValues = getCurrentFiltersValues();

  addAdsToMap(ads.filter((ad) => isMatchAdToFilters(getStringAdValues(ad), currentFiltersValues)));
}

function debounce(cb, time = 500) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(cb, time);
  };
}

function onFilterChange(cb) {
  adFilterElement.addEventListener('change', cb);
}

export { onFilterChange, debounce, filterAds };
