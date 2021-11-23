const getRandomIntNumber = function (minValue, maxValue) {
  minValue = Math.ceil(Math.min(Math.abs(minValue)));
  maxValue = Math.floor(Math.max(Math.abs(maxValue)));
  const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  return randomNumber;
};
getRandomIntNumber(0,30);

const getRandomFloatNumber = function (minValue, maxValue, digits = 1) {
  minValue = Math.ceil(Math.min(Math.abs(minValue)));
  maxValue = Math.floor(Math.max(Math.abs(maxValue)));
  const randomNumber = Math.random() * (maxValue - minValue) + minValue;
  return randomNumber.toFixed(digits);
};
getRandomFloatNumber (0,30,3);

const getAdressPicture = function() {
  const minNumber = 0;
  const maxNumber = 10;
  const numberUser = getRandomIntNumber(minNumber, maxNumber).toString();
  if(numberUser.length === 1) {
    return `img/avatars/user0${numberUser}.png`;
  }
  return `img/avatars/user${numberUser}.png`;
};

// 1 создать массив из 10 сгенерерированных объектов.
// нужно сгенерировать объект из следющих данных

const obj= {
  author: {field:''},
  avatar: getAdressPicture(),
  offer: {}
};
/*author, объект — описывает автора. Содержит одно поле:

avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.

offer, объект — содержит информацию об объявлении. Состоит из полей:

title, строка — заголовок предложения. Придумайте самостоятельно.

address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}.

price, число — стоимость. Случайное целое положительное число.

type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.

rooms, число — количество комнат. Случайное целое положительное число.

guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.

checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.

checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.

features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.

description, строка — описание помещения. Придумайте самостоятельно.

photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.

location, объект — местоположение в виде географических координат. Состоит из двух полей:

lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.

lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000. */
