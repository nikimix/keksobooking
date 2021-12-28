import { enableInactiveState } from './page-state.js';
import { addMap } from './map.js';
import { addAdsToMap } from './map.js';
import './validation.js';
const init = () => {
  enableInactiveState();
  addMap();
  addAdsToMap();
};
init();
