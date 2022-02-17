import { addAdsToMap, resetMap } from './map.js';
import { enableFormFilterActiveState } from './form-state.js';
import { onFilterChange } from './filter.js';
import { showErrorMessage, showSuccessMessage, showUnsuccessMessage } from './message.js';
import { resetPhoto } from './photo.js';
const adFilterElement = document.querySelector('.map__filters');
const adFormElement = document.querySelector('.ad-form');

function getDataAds() {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((response) => {
      addAdsToMap(response);
      enableFormFilterActiveState(adFilterElement);
      onFilterChange(response);
    })
    .catch((err) => {
      showErrorMessage(err);
    });
}

function sendUserForm() {
  fetch('https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: new FormData(adFormElement),
    })
    .then((response) => {
      if(response.ok) {
        showSuccessMessage();
        adFormElement.reset();
        adFilterElement.reset();
        resetMap();
        resetPhoto();
        getDataAds();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch(showUnsuccessMessage);
}

export { getDataAds, sendUserForm };
