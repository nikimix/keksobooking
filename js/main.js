import {createAds} from './ads.js';
import {enableInactiveState} from './page-state.js';
import {enableActiveState} from './page-state.js';
import './validation.js';

const init = () => {
  const formNode = document.querySelector('.ad-form');
  const filterNode = document.querySelector('.map__filters');
  createAds();
  enableInactiveState(formNode, filterNode);
  enableActiveState(formNode, filterNode);
};
init();
