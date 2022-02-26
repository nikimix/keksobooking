import { addAdsToMap, resetMap } from './map.js';
import { enableFormFilterActiveState } from './form-state.js';
import { onFilterChange, debounce, filterAds } from './filter.js';
import { showErrorMessage, showSuccessMessage, showUnsuccessMessage } from './message.js';
import { resetPhoto } from './photo.js';
const adFilterElement = document.querySelector('.map__filters');
const adFormElement = document.querySelector('.ad-form');
const RENDER_DELAY = 500;


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
      onFilterChange(debounce(() => filterAds(response), RENDER_DELAY));
    })
    .catch((err) => {
      showErrorMessage(err);
    });
}

function resetForm() {
  adFormElement.reset();
  adFilterElement.reset();
  resetMap();
  resetPhoto();
  getDataAds();
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
        resetForm();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch(showUnsuccessMessage);
}

export { getDataAds, sendUserForm, resetForm };
