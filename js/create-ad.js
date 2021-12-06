const getRandomIntNumber = function (minValue = 1, maxValue = 10) {
  minValue = Math.ceil(Math.min(Math.abs(minValue)));
  maxValue = Math.floor(Math.max(Math.abs(maxValue)));
  const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  return randomNumber;
};

const getRandomFloatNumber = function (minValue, maxValue, digits = 1) {
  minValue = Math.ceil(Math.min(Math.abs(minValue)));
  maxValue = Math.floor(Math.max(Math.abs(maxValue)));
  const randomNumber = Math.random() * (maxValue - minValue) + minValue;
  return randomNumber.toFixed(digits);
};

const getAdressPicture = function() {
  const minNumber = 0;
  const maxNumber = 10;
  const numberUser = getRandomIntNumber(minNumber, maxNumber).toString();
  if(numberUser.length === 1) {
    return `img/avatars/user0${numberUser}.png`;
  }
  return `img/avatars/user${numberUser}.png`;
};

const getTypeOfHousing = function() {
  const typeOfHousing = ['palace', 'flat', 'house', 'bungalow' ,'hotel'];
  return typeOfHousing[getRandomIntNumber(0, typeOfHousing.length-1)];
};

const getTimeCheckin = function() {
  const timeCheckin = ['12:00', '13:00', '14:00'];
  return timeCheckin[getRandomIntNumber(0, timeCheckin.length-1)];
};

const getTimeCheckout = getTimeCheckin();

const getFeatures = function() {
  const arrFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const randomNumber = getRandomIntNumber(0, arrFeatures.length-1);
  const newArrFeatures = arrFeatures.slice(0, randomNumber+1);
  return newArrFeatures;
};

const getLinksPhotos = function() {
  const arrLinks = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
  const randomNumber = getRandomIntNumber(0, arrLinks.length-1);
  const newArrLinks = arrLinks.slice(0, randomNumber+1);
  return newArrLinks;
};

const generateAd = function() {
  const ad = {};
  ad.author = {};
  ad.author.avatar = getAdressPicture();
  ad.location = {};
  ad.location.lat = getRandomFloatNumber(35.65000, 35.70000, 5);
  ad.location.lng = getRandomFloatNumber(139.70000 , 139.80000,5);
  ad.offer = {};
  ad.offer.title = 'Уютная квартира, с хорошим дизайном и всем необходимым для комфортного жилья';
  ad.offer.address = `${ad.location.lat}, ${ad.location.lng}`;
  ad.offer.price = getRandomIntNumber();
  ad.offer.type = getTypeOfHousing();
  ad.offer.rooms = getRandomIntNumber();
  ad.offer.guests = getRandomIntNumber();
  ad.offer.checkin = getTimeCheckin();
  ad.offer.checkout = getTimeCheckout();
  ad.offer.photos = getLinksPhotos();
  ad.offer.features = getFeatures();
  ad.offer.description = '3 комнаты, раздельный сан-узел, кухня 7 квадратов, лоджия, и кладовое помещение';

  return ad;
};

export {generateAd};
