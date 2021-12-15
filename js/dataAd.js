const getRandomIntNumber = (minValue = 1, maxValue = 4) => {
  minValue = Math.ceil(Math.min(Math.abs(minValue)));
  maxValue = Math.floor(Math.max(Math.abs(maxValue)));
  const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  return randomNumber;
};

const getRandomFloatNumber = (minValue, maxValue, digits = 1) => {
  minValue = Math.ceil(Math.min(Math.abs(minValue)));
  maxValue = Math.floor(Math.max(Math.abs(maxValue)));
  const randomNumber = Math.random() * (maxValue - minValue) + minValue;
  return randomNumber.toFixed(digits);
};

const getAdressPicture = () => {
  const minNumber = 0;
  const maxNumber = 10;
  const numberUser = getRandomIntNumber(minNumber, maxNumber).toString();
  if(numberUser.length === 1) {
    return `img/avatars/user0${numberUser}.png`;
  }
  return `img/avatars/user${numberUser}.png`;
};

const getTypeOfHousing = () => {
  const typesOfHousing = ['palace', 'flat', 'house', 'bungalow' ,'hotel'];
  return typesOfHousing[getRandomIntNumber(0, typesOfHousing.length-1)];
};

const getTimeCheckin = () => {
  const timeCheckin = ['12:00', '13:00', '14:00'];
  return timeCheckin[getRandomIntNumber(0, timeCheckin.length-1)];
};

const getTimeCheckout = () => {
  const timeCheckout = ['12:00', '13:00', '14:00'];
  return timeCheckout[getRandomIntNumber(0, timeCheckout.length-1)];
};

const getFeatures = () => {
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const randomNumber = getRandomIntNumber(0, features.length-1);
  const newFeatures = features.slice(0, randomNumber+1);
  return newFeatures;
};

const getLinksPhotos = () => {
  const links = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
  const randomNumber = getRandomIntNumber(0, links.length-1);
  const newLinks = links.slice(0, randomNumber+1);
  return newLinks;
};

const generateDataAd = () => {
  const data = {};
  data.author = {};
  data.author.avatar = getAdressPicture();
  data.location = {};
  data.location.lat = getRandomFloatNumber(35.65000, 35.70000, 5);
  data.location.lng = getRandomFloatNumber(139.70000 , 139.80000,5);
  data.offer = {};
  data.offer.title = 'Уютная квартира, с хорошим дизайном и всем необходимым для комфортного жилья';
  data.offer.address = `${data.location.lat}, ${data.location.lng}`;
  data.offer.price = getRandomIntNumber(200, 1000);
  data.offer.type = getTypeOfHousing();
  data.offer.rooms = getRandomIntNumber(1,4);
  data.offer.guests = getRandomIntNumber(1,4);
  data.offer.checkin = getTimeCheckin();
  data.offer.checkout = getTimeCheckout();
  data.offer.photos = getLinksPhotos();
  data.offer.features = getFeatures();
  data.offer.description = 'раздельный сан-узел, кухня 7 квадратов, лоджия, и кладовое помещение';

  return data;
};

export {generateDataAd};
