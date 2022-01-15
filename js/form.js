import { setCoordinatesMarkerInField, setViewMapDefault, setPositinMainMarkerDefault, addAdsToMap } from './map.js';
import { sendUserForm } from './request.js';
import { debounce } from './api.js';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const RENDER_DELAY = 500;

const getMinPriceHousing = (typeHousing) => {
  switch(typeHousing) {
    case 'bungalow':
      return 0;
    case 'flat':
      return 1000;
    case 'hotel':
      return 3000;
    case 'house':
      return 5000;
    case 'palace':
      return 10000;
  }
};

const setFieldsValueDefault = () => {
  document.querySelector('.ad-form').reset();
  document.querySelector('.map__filters').reset();
  setViewMapDefault();
  setPositinMainMarkerDefault();
  setCoordinatesMarkerInField();
  document.querySelector('#price').placeholder = getMinPriceHousing(document.querySelector('#type').value);
  if(document.querySelector('.ad-form__photo').firstElementChild) {
    document.querySelector('.ad-form__photo').firstElementChild.remove();
  }
  document.querySelector('.ad-form-header__preview').firstElementChild.src = 'img/muffin-grey.svg';
};

const getAdRank = (ad) => {
  let rank=0;
  const housingTypeInput = document.querySelector('#housing-type');
  const housingPriceInput = document.querySelector('#housing-price');
  const housingRoomsInput = document.querySelector('#housing-rooms');
  const housingGuestsInput = document.querySelector('#housing-guests');
  const housingFeatures = document.querySelectorAll('.map__checkbox');
  if (housingTypeInput.value === ad.offer.type) {
    rank+=2;
  }
  const countPriceValue = () => {
    if(ad.offer.price <= LOW_PRICE) {
      return 'low';
    }
    else if(ad.offer.price >= LOW_PRICE && ad.offer.price <= HIGH_PRICE){
      return 'middle';
    }
    return 'high';
  };
  if(housingPriceInput.value === countPriceValue()) {
    rank+=2;
  }
  if(parseInt(housingRoomsInput.value,10) === ad.offer.rooms) {
    rank+=2;
  }
  if(parseInt(housingGuestsInput.value,10) === ad.offer.guests) {
    rank+=2;
  }
  if(ad.offer.features) {
    for (const index of housingFeatures) {
      if(index.checked) {
        if(ad.offer.features.includes(index.value)) {
          rank +=2;
        }
      }
    }
  }
  return rank;
};

const compareAds = (firsAd, secondAd) => {
  const rankA = getAdRank(firsAd);
  const rankB = getAdRank(secondAd);
  return rankB - rankA;
};

const onChangeMapFilter = (data) => addAdsToMap(data.slice().sort(compareAds));

let dataAds;
const setFilterChangeHandler = (data) => {
  document.querySelector('.map__filters').addEventListener('change', debounce(() => onChangeMapFilter(data), RENDER_DELAY));
  dataAds = data;
};

document.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
  evt.preventDefault();
  setFieldsValueDefault();
  if(dataAds) {
    onChangeMapFilter(dataAds);
  }
});

document.querySelector('.ad-form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendUserForm(setFieldsValueDefault);
  if(dataAds) {
    onChangeMapFilter(dataAds);
  }
});

export { setFilterChangeHandler };
