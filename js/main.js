import './form-state.js';
import { addAdsToMap } from './map.js';
import { getDataAds } from './request.js';
import { sendUserForm } from './request.js';
import { setFieldsValueDefault, showAlert, showMessageSuccess, showMessageError } from './api.js';
import './form-validation.js';

getDataAds(addAdsToMap, showAlert);

document.querySelector('.ad-form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendUserForm(showMessageSuccess, showMessageError, setFieldsValueDefault);
});

document.querySelector('.ad-form__reset').addEventListener('click', (evt)=> {
  evt.preventDefault();
  setFieldsValueDefault();
});

// const typeOfHousing = document.querySelector('#housing-type');
// typeOfHousing.addEventListener('change', () => {
// });


