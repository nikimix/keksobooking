import { generateDataAd } from './data-ad.js';
import './map.js';
import './validation.js';
import {enableInactiveState} from './page-state.js';
import {loadMap, addedMainMarker, addedAdsOnMap} from './map.js';
const NUMBER_OF_ADS = 10;
const formNode = document.querySelector('.ad-form');
const filterNode = document.querySelector('.map__filters');
const dataAds = new Array(NUMBER_OF_ADS).fill(null).map(() => generateDataAd());

const init = () => {
  enableInactiveState(formNode, filterNode);
  loadMap();
  addedMainMarker();
  addedAdsOnMap();
};
init();

export {formNode,filterNode};
export {dataAds};

