import { enableFormFilterActiveState } from './form-state.js';
import { showErrorAlert, showSuccessMessage, showErrorMessage } from './api.js';
import { addAdsToMap } from './map.js';
const formFilterElement = document.querySelector('.map__filters');

function getDataAds(cb) {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((response) => {
      addAdsToMap(response);
      enableFormFilterActiveState(formFilterElement);
      cb(response);
    })
    .catch((err) => {
      showErrorAlert(err);
    });
}

function sendUserForm(resetForm) {
  fetch('https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: new FormData(document.querySelector('.ad-form')),
    })
    .then((response) => {
      if(response.ok) {
        showSuccessMessage();
        resetForm();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch(() => showErrorMessage());
}

export {getDataAds, sendUserForm};
