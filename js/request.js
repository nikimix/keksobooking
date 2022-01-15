import { onActiveStateFormFilter } from './form-state.js';
import { showErrorAlert, showSuccessMessage, showErrorMessage } from './api.js';
import { addAdsToMap } from './map.js';

const getDataAds = (cb) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((response) => {
      addAdsToMap(response);
      onActiveStateFormFilter();
      cb(response);
    })
    .catch((err) => {
      showErrorAlert(err);
    });
};

const sendUserForm = (resetForm) => {
  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: new FormData(document.querySelector('.ad-form')),
    })
    .then((response) => {
      if(response.ok) {
        showSuccessMessage();
        resetForm();
      } else {
        showErrorMessage();
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch(() => {
      showErrorMessage();
    });
};

export {getDataAds, sendUserForm};
