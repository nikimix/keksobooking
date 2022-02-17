import { addAdsToMap } from './map.js';

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const RENDER_DELAY = 500;
const adFilterElement = document.querySelector('.map__filters');

function getStringPriceValue(number) {
  if(number <= LOW_PRICE) {
    return 'low';
  } else if(number >= HIGH_PRICE) {
    return 'high';
  }

  return 'middle';
}

function getCurrentFiltersValues() {
  const type = document.querySelector('#housing-type').value;
  const price = document.querySelector('#housing-price').value;
  const numberRooms = document.querySelector('#housing-rooms').value;
  const numberGuests = document.querySelector('#housing-guests').value;
  const features = [];
  const housingFeatures = document.querySelectorAll('.map__checkbox');

  housingFeatures.forEach((feature) => {
    if(feature.checked) {
      features.push(feature.value);
    }
  });

  if(features.length === 0) {
    features.push('any');
  } else {
    features.sort((firstFeature, secondFeature) => (firstFeature > secondFeature) ? 1 : -1);
  }

  return [type, price, numberRooms, numberGuests, features.join('')];
}

function getStringAdValues(ad) {
  const housingType = ad.offer.type;
  const housingPrice = getStringPriceValue(ad.offer.price);
  const numberOfRooms = String(ad.offer.rooms);
  const numberOfGuests = String(ad.offer.guests);
  const housingFeatures = [];

  if(ad.offer.features) {
    ad.offer.features.forEach((item) => housingFeatures.push(item));
    housingFeatures.sort((firstFeature, secondFeature) => (firstFeature > secondFeature) ? 1 : -1);
  } else {
    housingFeatures.push('');
  }

  return [housingType, housingPrice, numberOfRooms, numberOfGuests, housingFeatures.join('')];
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
  const filteredAds = [];
  const currentFiltersValues = getCurrentFiltersValues();

  ads.forEach((ad) => {
    if(isMatchAdToFilters(getStringAdValues(ad), currentFiltersValues)) {
      filteredAds.push(ad);
    }
  });
  addAdsToMap(filteredAds);
}

function debounce(cb, time = 500) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(cb, time);
  };
}

function onFilterChange(ads) {
  adFilterElement.addEventListener('change', debounce(() => filterAds(ads), RENDER_DELAY));
}

export { onFilterChange };
