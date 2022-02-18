import { getDataAds, sendUserForm, resetForm } from './request.js';
import './validation.js';
import './photo.js';

const adFormElement = document.querySelector('.ad-form');
const resetButtonElement = document.querySelector('.ad-form__reset');

getDataAds();

resetButtonElement.addEventListener('click', resetForm);

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendUserForm();
});
