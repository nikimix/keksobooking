import { addAdsToMap } from './map.js';
import { getDataAds } from './request.js';
import './form-validation.js';
import { sendUserForm } from './request.js';
import { setStateFormDefault, showAlert, showMessageSuccess, showMessageError } from './api.js';

getDataAds(addAdsToMap, showAlert);

document.querySelector('.ad-form').addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendUserForm(showMessageSuccess, showMessageError, setStateFormDefault);
});
