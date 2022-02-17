import { sendUserForm, getDataAds } from './request.js';
import { resetMap } from './map.js';
import { resetPhoto } from './photo.js';

const adFormElement = document.querySelector('.ad-form');
const adFilterElement = document.querySelector('.map__filters');
const resetButtonElement = document.querySelector('.ad-form__reset');

resetButtonElement.addEventListener('click', () => {
  adFormElement.reset();
  adFilterElement.reset();
  resetMap();
  resetPhoto();
  getDataAds();
});

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendUserForm();
});
