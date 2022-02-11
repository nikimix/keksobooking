const adFormElement = document.querySelector('.ad-form');
const titleAdElement = adFormElement.querySelector('#title');
const priceForNightElement = adFormElement.querySelector('#price');
const typeOfHousingElement = adFormElement.querySelector('#type');
const timeCheckinElement = adFormElement.querySelector('#timein');
const timeCheckoutElement = adFormElement.querySelector('#timeout');
const MAX_GUEST = 100;

const getMinPriceHousing = (typeHousing) => {
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
};

const setValidationMessages = (item, message) => {
  item.setCustomValidity(message);
};

//check Lengh title
const checkLength = (element) => {
  if(element.validity.tooShort) {
    const minLength = element.getAttribute('minlength');
    setValidationMessages(element,`Минимальное колличество символов ${minLength} не хватает ${minLength - element.value.length} символов`);
  }
  else {
    setValidationMessages(element,'');
  }
  element.reportValidity();
};
titleAdElement.addEventListener('input', () => {
  checkLength(titleAdElement);
});

// check price
const checkMinMax = (element) => {
  if(element.validity.rangeUnderflow) {
    setValidationMessages(element,`Минимальное значение ${element.min}`);
  }
  else if(element.validity.rangeOverflow) {
    setValidationMessages(element,`Максимальное значение ${element.max}`);
  }
  else {
    setValidationMessages(element,'');
  }
  element.reportValidity();
};
priceForNightElement.addEventListener('input', () => {
  checkMinMax(priceForNightElement);
});

// check type of housing
const setMinPriceAndPlaceholder = () => {
  priceForNightElement.min = getMinPriceHousing(typeOfHousingElement.value);
  priceForNightElement.placeholder = priceForNightElement.min;
};
typeOfHousingElement.addEventListener('change', () => {
  setMinPriceAndPlaceholder();
});

// synchronize time
const synchronizeTime = (changeableInput, synchronizedInput) => {
  for(const item of synchronizedInput) {
    if(item.value === changeableInput) {
      item.selected = true;
    }
  }
};
timeCheckinElement.addEventListener('change', () => {
  synchronizeTime(timeCheckinElement.value, timeCheckoutElement.children);
});
timeCheckoutElement.addEventListener('change', () => {
  synchronizeTime(timeCheckoutElement.value, timeCheckinElement.children);
});

// check number of guests
const numberOfRoomsElement = adFormElement.querySelector('#room_number');
const numberOfGuestsElement = adFormElement.querySelector('#capacity');

const checkRatio = (firstInput, secondInput, currentElement) => {
  let firstValue = firstInput.value;
  firstValue = parseInt(firstValue, 10);
  let secondValue = secondInput.value;
  secondValue = parseInt(secondValue, 10);

  if (firstValue >= secondValue && secondValue !== 0 && firstValue !== MAX_GUEST) {
    setValidationMessages(firstInput,'');
    setValidationMessages(secondInput,'');
  }  else if(firstValue === MAX_GUEST && secondValue === 0) {
    setValidationMessages(firstInput,'');
    setValidationMessages(secondInput,'');
  }  else {
    setValidationMessages(currentElement,'Колличество гостей не соответствует комнате, выберете другой вариант');
  }
  currentElement.reportValidity();
};

numberOfRoomsElement.addEventListener('change', () => {
  checkRatio(numberOfRoomsElement, numberOfGuestsElement, numberOfRoomsElement);
});

numberOfGuestsElement.addEventListener('change', () => {
  checkRatio(numberOfRoomsElement, numberOfGuestsElement, numberOfGuestsElement);
});

export {setMinPriceAndPlaceholder};
