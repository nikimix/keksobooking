const adTemplateElement = document.querySelector('#card').content.querySelector('.popup');

const housingTypeDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

function getTemplateElements(template) {
  return {
    title: template.querySelector('.popup__title'),
    address: template.querySelector('.popup__text--address'),
    price: template.querySelector('.popup__text--price'),
    housingType: template.querySelector('.popup__type'),
    numberRooms: template.querySelector('.popup__text--capacity'),
    bookingTime: template.querySelector('.popup__text--time'),
    features: template.querySelector('.popup__features'),
    description: template.querySelector('.popup__description'),
    photos: template.querySelector('.popup__photos'),
    avatar: template.querySelector('.popup__avatar'),
  };
}

function createAd({offer, author}) {
  const ad = adTemplateElement.cloneNode(true);
  const {
    title,
    address,
    price,
    housingType,
    numberRooms,
    bookingTime,
    features,
    description,
    photos,
    avatar,
  } = getTemplateElements(ad);

  title.textContent = offer.title;
  address.textContent = offer.address;
  price.textContent = `${offer.price} `;
  price.insertAdjacentHTML('beforeend','<span>₽/ночь</span>');
  housingType.textContent = housingTypeDictionary[offer.type];
  numberRooms.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  bookingTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if(offer.features) {
    features.innerHTML = '';
    offer.features.forEach((feature) => features.insertAdjacentHTML('beforeend',`<li class="popup__feature popup__feature--${feature}"></li>`));
  } else {
    features.remove();
  }

  if(offer.description) {
    description.textContent = offer.description;
  } else {
    description.remove();
  }

  if(offer.photos) {
    photos.innerHTML ='';
    offer.photos.forEach((link) => photos.insertAdjacentHTML('afterbegin', `<img src="${link}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`));
  } else {
    photos.remove();
  }

  if(author.avatar) {
    avatar.src = author.avatar;
  } else {
    avatar.remove();
  }

  return ad;
}

export {createAd};
