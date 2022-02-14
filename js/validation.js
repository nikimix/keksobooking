const adFormElement = document.querySelector('.ad-form');
const titleAdElement = adFormElement.querySelector('#title');
const priceForNightElement = adFormElement.querySelector('#price');
const typeOfHousingElement = adFormElement.querySelector('#type');
const timeCheckinElement = adFormElement.querySelector('#timein');
const timeCheckoutElement = adFormElement.querySelector('#timeout');
const numberOfRoomsElement = adFormElement.querySelector('#room_number');
const numberOfSeatsElement = adFormElement.querySelector('#capacity');

function getMinPriceHousing(typeHousing) {
  switch(typeHousing) {
    case 'bungalow':
      return 0;
    case 'flat':
      return 1000;
    case 'hotel':
      return 3000;
    case 'house':
      return 5000;
    case 'palace':
      return 10000;
  }
}

function setEventListener(element, typeEvent, cb) {
  element.addEventListener(typeEvent, cb);
}

function changeMinAndPlaceholderValue(element, minValue = getMinPriceHousing(typeOfHousingElement.value)) {
  element.min = minValue;
  element.placeholder = element.min;
}

setEventListener(titleAdElement, 'input', () => titleAdElement.reportValidity());

setEventListener(priceForNightElement, 'input', () => priceForNightElement.reportValidity());

setEventListener(typeOfHousingElement, 'change', () => changeMinAndPlaceholderValue(priceForNightElement));

function synchronizeTime(currentTime, sinhronizedTime) {
  for(const hour of sinhronizedTime) {
    if(hour.value === currentTime) {
      hour.selected = true;
    }
  }
}

setEventListener(timeCheckinElement, 'change', () => synchronizeTime(timeCheckinElement.value, timeCheckoutElement.children));

setEventListener(timeCheckoutElement, 'change', () => synchronizeTime(timeCheckoutElement.value, timeCheckinElement.children));

function checkNumberOfSeatsInRoom(rooms, seats, changedInput) {
  const room = Number(rooms.value);
  const seat = Number(seats.value);

  if (room >= seat && seat !== 0 && room !== 100) {
    rooms.setCustomValidity('');
    seats.setCustomValidity('');
  }  else if(room === 100 && seat === 0) {
    rooms.setCustomValidity('');
    seats.setCustomValidity('');
  }  else {
    changedInput.setCustomValidity('Колличество гостей не соответствует комнате, выберете другой вариант');
  }

  changedInput.reportValidity();
}

setEventListener(numberOfRoomsElement, 'change', () => checkNumberOfSeatsInRoom(numberOfRoomsElement, numberOfSeatsElement, numberOfRoomsElement));

setEventListener(numberOfSeatsElement, 'change', () => checkNumberOfSeatsInRoom(numberOfRoomsElement, numberOfSeatsElement, numberOfSeatsElement));

export { changeMinAndPlaceholderValue };
