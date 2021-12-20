const enableInactiveState = (form, filter) => {
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

const enableActiveState = (form, filter) => {
  form.classList.remove('ad-form--disabled');
  form.querySelector('.ad-form-header').removeAttribute('disabled');
  form.querySelectorAll('.ad-form__element').forEach((item) => {
    item.removeAttribute('disabled');
  });
  filter.classList.remove('map__filters--disabled');
  filter.querySelectorAll('.map__filter').forEach((item) => {
    item.removeAttribute('disabled');
  });
  filter.querySelector('.map__features').removeAttribute('disabled');
};
export {enableInactiveState};
export {enableActiveState};
