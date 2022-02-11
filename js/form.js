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

const checkAd = (ad) => {
  // попробовать написать отдельную универсальную функцию которая возвращает результат проверки. что бы не городить if
  let truth = true;
  const housingTypeInput = document.querySelector('#housing-type');
  const housingPriceInput = document.querySelector('#housing-price');
  const housingRoomsInput = document.querySelector('#housing-rooms');
  const housingGuestsInput = document.querySelector('#housing-guests');
  const housingFeatures = document.querySelectorAll('.map__checkbox');
  const getPriceValue = () => {
    if(ad.offer.price <= LOW_PRICE) {
      return 'low';
    }
    else if(ad.offer.price >= LOW_PRICE && ad.offer.price <= HIGH_PRICE){
      return 'middle';
    }
    return 'high';
  };

  if(truth){
    truth = !!((housingTypeInput.value !== 'any' && housingTypeInput.value === ad.offer.type));
    if(housingTypeInput.value === 'any') {
      truth = true;
    }
  }
  if(truth) {
    truth = !!((housingPriceInput.value !== 'any' && housingPriceInput.value === getPriceValue()));
    if(housingPriceInput.value === 'any') {
      truth = true;
    }
  }
  if(truth) {
    truth = !!((housingRoomsInput.value !== 'any' && parseInt(housingRoomsInput.value, 10) === ad.offer.rooms));
    if(housingRoomsInput.value === 'any') {
      truth = true;
    }
  }
  if(truth) {
    truth = !!((housingGuestsInput.value !== 'any' && parseInt(housingGuestsInput.value,10) === ad.offer.guests));
    if(housingGuestsInput.value === 'any') {
      truth = true;
    }
  }
  if(truth) {
    const features = [];
    for (const item of housingFeatures) {
      if(item.checked) {
        features.push(item.value);
      }
    }
    if(features.length !== 0) {
      if(ad.offer.features) {
        features.forEach((item) => {
          if(!ad.offer.features.includes(item)) {
            truth = false;
          }
        });
      } else {
        return false;
      }
    }
    return truth;
  }
  return truth;
};

const onChangeMapFilter = (data) => {
  const filteredData = [];
  data.forEach((item) => {
    if(checkAd(item)) {
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
