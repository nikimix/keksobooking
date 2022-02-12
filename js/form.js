import { setCoordinatesMarkerInField, setViewMapDefault, setPositinMainMarkerDefault, addAdsToMap } from './map.js';
import { sendUserForm } from './request.js';
import { debounce } from './api.js';
import { setMinPriceAndPlaceholder } from './form-validation.js';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const RENDER_DELAY = 500;

const setFieldsValueDefault = () => {
  document.querySelector('.ad-form').reset();
  document.querySelector('.map__filters').reset();
  setViewMapDefault();
  setPositinMainMarkerDefault();
  setCoordinatesMarkerInField();
  setMinPriceAndPlaceholder();
  document.querySelector('.ad-form__photo').innerHTML = '';
  document.querySelector('.ad-form-header__preview').firstElementChild.src = 'img/muffin-grey.svg';
};

function getStringPriceValue(number) {
  if(number <= LOW_PRICE) {
    return 'low';
  }
  else if(number >= HIGH_PRICE) {
    return 'high';
  }
  return 'middle';
}

function getCurrentFiltersValues() {
  const type = document.querySelector('#housing-type').value;
  const price = document.querySelector('#housing-price').value;
  const roomOfNumber = document.querySelector('#housing-rooms').value;
  const guestOfNumbers = document.querySelector('#housing-guests').value;
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

  return [type, price, roomOfNumber, guestOfNumbers, features.join('')];
}

function getStringAdValuesForValidate(ad) {
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

function checkMatchesAdToFilters(adValues, filterValues) {
  for(let index = 0; index < filterValues.length; index++) {
    if(filterValues[index] === 'any') {
      continue;
    }

    if(filterValues[index] !== adValues[index]) {
      return false;
    }
  }
  return true;
}

const onChangeMapFilter = (data) => {
  const currentFilterValues = getCurrentFiltersValues();
  const filteredData = [];
  data.forEach((item) => {
    if(checkMatchesAdToFilters(getStringAdValuesForValidate(item), currentFilterValues)) {
      filteredData.push(item);
    }
  });
  addAdsToMap(filteredData);
};

const resetFiter = (data) => {
  addAdsToMap(data);
};

let dataAds;
const setFilterChangeHandler = (data) => {
  document.querySelector('.map__filters').addEventListener('change', debounce(() => onChangeMapFilter(data), RENDER_DELAY));
  dataAds = data;
};

document.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
  evt.preventDefault();
  setFieldsValueDefault();
  if(dataAds) {
    resetFiter(dataAds);
  }
});

document.querySelector('.ad-form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendUserForm(setFieldsValueDefault);
  if(dataAds) {
    resetFiter(dataAds);
  }
});

export { setFilterChangeHandler };
