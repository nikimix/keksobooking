const formElement = document.querySelector('.ad-form');
const filterElement = document.querySelector('.map__filters');

const enableInactiveState = () => {
  formElement.classList.add('ad-form--disabled');
  for (const item of formElement.children) {
    item.setAttribute('disabled', '');
  }
  filterElement.classList.add('map__filters--disabled');
  for (const item of filterElement.children) {
    item.setAttribute('disabled', '');
  }
};

const enableActiveState = () => {
  formElement.classList.remove('ad-form--disabled');
  for (const item of formElement.children) {
    item.removeAttribute('disabled');
  }
  filterElement.classList.remove('map__filters--disabled');
  for (const item of filterElement.children) {
    item.removeAttribute('disabled');
  }
};

export {enableInactiveState, enableActiveState};
