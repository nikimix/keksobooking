import { generateAd } from './create-ad';

const ads = new Array(10).fill(null).map(() => generateAd());
