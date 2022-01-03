const adFormElement = document.querySelector('.ad-form');
const titleAdElement = adFormElement.querySelector('#title');
const priceForNightElement = adFormElement.querySelector('#price');
const typeOfHousingElement = adFormElement.querySelector('#type');
const timeCheckinElement = adFormElement.querySelector('#timein');
const timeCheckoutElement = adFormElement.querySelector('#timeout');
const dictionaryMinPriceForHousing = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace' : 10000,
};

const checkLength = (element) => {
  if(element.validity.tooShort) {
    const minLength = element.getAttribute('minlength');
    element.setCustomValidity(`Минимальное колличество символов ${minLength} не хватает ${minLength - element.value.length} символов`);
  }
  else {
    element.setCustomValidity('');
  }
  element.reportValidity();
};

//check Lengh title
titleAdElement.addEventListener('input', () => {
  checkLength(titleAdElement);
});

const checkMinMax = (element) => {
  if(element.validity.rangeUnderflow) {
    element.setCustomValidity(`Минимальное значение ${element.min}`);
  }
  else if(element.validity.rangeOverflow) {
    element.setCustomValidity(`Максимальное значение ${element.max}`);
  }
  else {
    element.setCustomValidity('');
  }
  element.reportValidity();
};

// check price
priceForNightElement.addEventListener('input', () => {
  checkMinMax(priceForNightElement);
});

// check type of housing
typeOfHousingElement.addEventListener('change', () => {
  priceForNightElement.min = dictionaryMinPriceForHousing[typeOfHousingElement.value];
  priceForNightElement.placeholder = priceForNightElement.min;
});

const synchronizeTime = (selectedTime, synchronizedTime) => {
  for(const item of synchronizedTime) {
    if(item.value === selectedTime) {
      item.selected = true;
    }
  }
};

// synchronize time
timeCheckinElement.addEventListener('change', () => {
  synchronizeTime(timeCheckinElement.value, timeCheckoutElement.children);
});

timeCheckoutElement.addEventListener('change', () => {
  synchronizeTime(timeCheckoutElement.value, timeCheckinElement.children);
});

// check number of guests
const numberOfRoomsElement = adFormElement.querySelector('#room_number');
const numberOfGuestsElement = adFormElement.querySelector('#capacity');

const checkRatio = (firstInput, secondInput, eventElement) => {
  let firstValue = firstInput.value;
  firstValue = parseInt(firstValue, 10);
  let secondValue = secondInput.value;
  secondValue = parseInt(secondValue, 10);
  if (firstValue >= secondValue && secondValue !== 0 && firstValue !== 100) {
    firstInput.setCustomValidity('');
    secondInput.setCustomValidity('');
  }  else if(firstValue === 100 && secondValue === 0) {
    firstInput.setCustomValidity('');
    secondInput.setCustomValidity('');
  }  else {
    eventElement.setCustomValidity('Колличество гостей не соответствует комнате, выберете другой вариант');
  }
  eventElement.reportValidity();
};

numberOfRoomsElement.addEventListener('change', () => {
  checkRatio(numberOfRoomsElement, numberOfGuestsElement, numberOfRoomsElement);
});

numberOfGuestsElement.addEventListener('change', () => {
  checkRatio(numberOfRoomsElement, numberOfGuestsElement, numberOfGuestsElement);
});

window.addEventListener('load', () => {
  synchronizeTime(timeCheckinElement.value, timeCheckoutElement.children);
  priceForNightElement.min = dictionaryMinPriceForHousing[typeOfHousingElement.value];
  priceForNightElement.placeholder = priceForNightElement.min;
});
