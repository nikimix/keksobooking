const formNode = document.querySelector('.ad-form');
const filterNode = document.querySelector('.map__filters');
const enableInactiveState = () => {
  formNode.classList.add('ad-form--disabled');
  formNode.querySelector('.ad-form-header').setAttribute('disbled', '');
  formNode.querySelectorAll('.ad-form__element').forEach((item) => {
    item.setAttribute('disabled', '');
  });
  filterNode.classList.add('map__filters--disabled');
  filterNode.querySelectorAll('.map__filter').forEach((item) => {
    item.setAttribute('disabled', '');
  });
  filterNode.querySelector('.map__features').setAttribute('disabled', '');
};

const enableActiveState = () => {
  formNode.classList.remove('ad-form--disabled');
  formNode.querySelector('.ad-form-header').removeAttribute('disabled');
  formNode.querySelectorAll('.ad-form__element').forEach((item) => {
    item.removeAttribute('disabled');
  });
  filterNode.classList.remove('map__filters--disabled');
  filterNode.querySelectorAll('.map__filter').forEach((item) => {
    item.removeAttribute('disabled');
  });
  filterNode.querySelector('.map__features').removeAttribute('disabled');
};
export {enableInactiveState};
export {enableActiveState};
