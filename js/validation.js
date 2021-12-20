const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 1000000;
const adFormNode = document.querySelector('.ad-form');
const titleAdNode = adFormNode.querySelector('#title');

const showMessage = (node,message) => {
  node.setCustomValidity(message);
};

// validation title
const checkLength = (node) => {
  const stringLength = node.value.length;
  if(stringLength < MIN_LENGTH_TITLE) {
    showMessage(node,`Минимальное колличество символов 30 не хватает ${MIN_LENGTH_TITLE - stringLength} символов`);
  }
  else if(stringLength > MAX_LENGTH_TITLE) {
    showMessage(node,`Максимальное колличество символов 100 превышен лимит в ${stringLength - MAX_LENGTH_TITLE} символов`);
  }
  else {
    showMessage(node,'');
  }
  node.reportValidity();
};

titleAdNode.addEventListener('input', () => {
  checkLength(titleAdNode);
});

// validation price
const priceForNightNode = adFormNode.querySelector('#price');

const checkPrice = (node) => {
  const price = node.value;
  if(price > MAX_PRICE) {
    showMessage(node,'Маскимальная цена 1000000');
  }
  else {
    showMessage(node,'');
  }
  node.reportValidity();
};

priceForNightNode.addEventListener('input', () => {
  checkPrice(priceForNightNode);
});

// validation typeOfHousing and min price
const typeOfHousingNode = adFormNode.querySelector('#type');
const dictionaryMinPriceForHousing = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace' : 10000,
};

typeOfHousingNode.addEventListener('change', () => {
  priceForNightNode.min = dictionaryMinPriceForHousing[typeOfHousingNode.value];
  priceForNightNode.placeholder = priceForNightNode.min;
});

window.addEventListener('load', () => {
  priceForNightNode.min = dictionaryMinPriceForHousing[typeOfHousingNode.value];
  priceForNightNode.placeholder = priceForNightNode.min;
});

// synchronize time checkin and time checkout
const timeCheckinNode = adFormNode.querySelector('#timein');
const timeCheckoutNode = adFormNode.querySelector('#timeout');

const synchronizeTime = (selectedTime, synchronizedTime) => {
  for(const item of synchronizedTime) {
    if(item.value === selectedTime) {
      item.selected = true;
    }
  }
};

timeCheckinNode.addEventListener('change', () => {
  synchronizeTime(timeCheckinNode.value, timeCheckoutNode.children);
});

timeCheckoutNode.addEventListener('change', () => {
  synchronizeTime(timeCheckoutNode.value, timeCheckinNode.children);
});

window.addEventListener('load', () => {
  synchronizeTime(timeCheckinNode.value, timeCheckoutNode.children);
});

// validation number of guests in room
const numberOfRoomsNode = adFormNode.querySelector('#room_number');
const numberOfGuestsNode = adFormNode.querySelector('#capacity');

const checkRatio = (numberOfRooms, numberOfGuests, node) => {
  numberOfRooms = parseInt(numberOfRooms,10);
  numberOfGuests = parseInt(numberOfGuests,10);
  if (numberOfRooms>=numberOfGuests && numberOfGuests!==0 && numberOfRooms!==100) {
    showMessage(node,'');
  }
  else if(numberOfRooms === 100 && numberOfGuests===0) {
    showMessage(node,'');
  }
  else {
    showMessage(node,'Колличество гостей не соответствует комнате, выберете другой вариант');
  }
  numberOfRoomsNode.reportValidity();
};

numberOfRoomsNode.addEventListener('change', () => {
  checkRatio(numberOfRoomsNode.value, numberOfGuestsNode.value, numberOfRoomsNode);
});

numberOfGuestsNode.addEventListener('change', () => {
  checkRatio(numberOfRoomsNode.value, numberOfGuestsNode.value, numberOfGuestsNode);
});

window.addEventListener('load', () => {
  checkRatio(numberOfRoomsNode.value, numberOfGuestsNode.value, numberOfRoomsNode);
});
