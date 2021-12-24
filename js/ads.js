const dictionaryTypeOfHousing = {
  flat : 'Квартира',
  bungalow : 'Бунгало',
  house : 'Дом',
  place : 'Дворец',
  hotel : 'Отель',
};
const templateAd = document.querySelector('#card').content.querySelector('.popup');
const createAd = ({offer, author}) => {
  const ad = templateAd.cloneNode(true);
  ad.querySelector('.popup__title').textContent = offer.title;
  ad.querySelector('.popup__text--address').textContent = offer.address;
  const price = ad.querySelector('.popup__text--price');
  price.textContent = `${offer.price} `;
  price.insertAdjacentHTML('beforeend','<span>₽/ночь</span>');
  ad.querySelector('.popup__type').textContent = dictionaryTypeOfHousing[offer.type];
  ad.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  ad.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresList = ad.querySelector('.popup__features');
  const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
  featuresList.querySelectorAll('.popup__feature').forEach((item)=>{
    const modifier = item.classList[1];
    if(!modifiers.includes(modifier)) {
      item.remove();
    }
  });
  // check feature list on children
  if (featuresList.children.length === 0) {
    featuresList.setAttribute('style', 'display: none');
  }

  if(offer.description) {
    ad.querySelector('.popup__description').textContent = offer.description;
  }
  else {
    ad.querySelector('.popup__description').setAttribute('style', 'display: none');
  }
  for(let index = 0; index < ad.querySelector('.popup__photos').children.length; index++) {
    ad.querySelector('.popup__photos').children[index].remove();
  }
  offer.photos.forEach((link) => {
    if(link) {
      ad.querySelector('.popup__photos').insertAdjacentHTML('afterbegin', `<img src="${link}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    }
  });
  if(ad.querySelector('.popup__photos').children.length === 0) {
    ad.querySelector('.popup__photos').setAttribute('style', 'display: none');
  }
  if(author.avatar) {
    ad.querySelector('.popup__avatar').src = author.avatar;
  }
  else {
    ad.querySelector('.popup__avatar').setAttribute('style', 'display: none');
  }
  return ad;
};

export {createAd};
