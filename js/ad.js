const templateAd = document.querySelector('#card').content.querySelector('.popup');
const getTypeOfHousing = (type) => {
  switch(type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
};
// s
// const setTextContet = (element, content) => {
//   element.textContent = content;
// };

// const createAd = ({offer, author}) => {
//   const ad = templateAd.cloneNode(true);
//   setTextContet(ad.querySelector('.popup__title'), offer.title);
//   setTextContet(ad.querySelector('.popup__text--address'), offer.address);
//   setTextContet(ad.querySelector('.popup__text--price'), `${offer.price} `);
//   ad.querySelector('.popup__text--price').insertAdjacentHTML('beforeend','<span>₽/ночь</span>');
//   setTextContet(ad.querySelector('.popup__type'), getTypeOfHousing(offer.type);
//   setTextContet(ad.querySelector('.popup__text--capacity'), `${offer.rooms} комнаты для ${offer.guests} гостей`);
//   setTextContet(ad.querySelector('.popup__text--time'), `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);

//   if(offer.features) {
//     const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);

//     ad.querySelectorAll('.popup__feature').forEach((item)=>{
//       const modifier = item.classList[1];
//       if(!modifiers.includes(modifier)) {
//         item.remove();
//       }
//     });
//   } else {
//     ad.querySelector('.popup__features').remove();
//   }

//   if(offer.description) {
//     setTextContet(ad.querySelector('.popup__description'), offer.description);
//   }
//   else {
//     ad.querySelector('.popup__description').remove();
//   }

//   if(offer.photos) {
//     ad.querySelector('.popup__photo:first-child').remove();
//     offer.photos.forEach((link) => {
//       if(link) {
//         ad.querySelector('.popup__photos').insertAdjacentHTML('afterbegin', `<img src="${link}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
//       }
//     });
//   }
//   else {
//     ad.querySelector('.popup__photos').remove();
//   }

//   if(author.avatar) {
//     ad.querySelector('.popup__avatar').src = author.avatar;
//   }
//   else {
//     ad.querySelector('.popup__avatar').remove();
//   }
//   return ad;
// };

const createAd = ({offer, author}) => {
  const ad = templateAd.cloneNode(true);
  ad.querySelector('.popup__title').textContent = offer.title;
  ad.querySelector('.popup__text--address').textContent = offer.address;
  const priceElement = ad.querySelector('.popup__text--price');
  priceElement.textContent = `${offer.price} `;
  priceElement.insertAdjacentHTML('beforeend','<span>₽/ночь</span>');
  ad.querySelector('.popup__type').textContent = getTypeOfHousing(offer.type);
  ad.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  ad.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if(offer.features) {
    const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);

    ad.querySelectorAll('.popup__feature').forEach((item)=>{
      const modifier = item.classList[1];
      if(!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    ad.querySelector('.popup__features').remove();
  }

  if(offer.description) {
    ad.querySelector('.popup__description').textContent = offer.description;
  }
  else {
    ad.querySelector('.popup__description').remove();
  }

  if(offer.photos) {
    ad.querySelector('.popup__photo:first-child').remove();
    offer.photos.forEach((link) => {
      if(link) {
        ad.querySelector('.popup__photos').insertAdjacentHTML('afterbegin', `<img src="${link}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
      }
    });
  }
  else {
    ad.querySelector('.popup__photos').remove();
  }

  if(author.avatar) {
    ad.querySelector('.popup__avatar').src = author.avatar;
  }
  else {
    ad.querySelector('.popup__avatar').remove();
  }
  return ad;
};

export {createAd};
