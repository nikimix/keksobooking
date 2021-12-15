
const form = document.querySelector('.ad-form');
const filter = document.querySelector('.map__filters');

const isNotActivePageState = () => {
  form.classList.add('ad-form--disabled');
  form.querySelector('.ad-form-header').setAttribute('disbled', '');
  form.querySelectorAll('.ad-form__element').forEach((item) => {
    item.setAttribute('disabled', '');
  });
  filter.classList.add('map__filters--disabled');
  filter.querySelectorAll('.map__filter').forEach((item) => {
    item.setAttribute('disabled', '');
  });
  filter.querySelector('.map__features').setAttribute('disabled', '');
};

const isActivePageState = () => {
  form.classList.remove('ad-form--disabled');
  form.querySelector('.ad-form-header').removeAttribute('disbled');
  form.querySelectorAll('.ad-form__element').forEach((item) => {
    item.removeAttribute('disbled');
  });
  filter.classList.remove('map__filters--disabled');
  filter.querySelectorAll('.map__filter').forEach((item) => {
    item.removeAttribute('disbled');
  });
  filter.querySelector('.map__features').removeAttribute('disbled');
};
export {isNotActivePageState};
export {isActivePageState};
