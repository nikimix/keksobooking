const adFormElement = document.querySelector('.ad-form');
const adTitleElement = adFormElement.querySelector('#title');
const priceForNightElement = adFormElement.querySelector('#price');
const housingTypeElement = adFormElement.querySelector('#type');
const checkinTimeElement = adFormElement.querySelector('#timein');
const checkoutTimeElement = adFormElement.querySelector('#timeout');
const numberOfRoomsElement = adFormElement.querySelector('#room_number');
const numberOfSeatsElement = adFormElement.querySelector('#capacity');

const minHosuingPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

function changeMinAndPlaceholderValue(element, minValue = minHosuingPrice[housingTypeElement.value]) {
  element.min = minValue;
  element.placeholder = element.min;
}

function synchronizeTime(currentTime, sinhronizedTime) {
  for(const hour of sinhronizedTime) {
    if(hour.value === currentTime) {
      hour.selected = true;
    }
  }
}

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

function setEventListenersOnValidationElements() {

  adTitleElement.addEventListener('input', () => adTitleElement.reportValidity());

  priceForNightElement.addEventListener('input', () => priceForNightElement.reportValidity());

  housingTypeElement.addEventListener('change', () => changeMinAndPlaceholderValue(priceForNightElement));

  checkinTimeElement.addEventListener('change', () => synchronizeTime(checkinTimeElement.value, checkoutTimeElement.children));

  checkoutTimeElement.addEventListener('change', () => synchronizeTime(checkoutTimeElement.value, checkinTimeElement.children));

  numberOfRoomsElement.addEventListener('change', () => checkNumberOfSeatsInRoom(numberOfRoomsElement, numberOfSeatsElement, numberOfRoomsElement));

  numberOfSeatsElement.addEventListener('change', () => checkNumberOfSeatsInRoom(numberOfRoomsElement, numberOfSeatsElement, numberOfSeatsElement));
}

setEventListenersOnValidationElements();

export { changeMinAndPlaceholderValue };
