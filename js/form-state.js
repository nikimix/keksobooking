const formAdElement = document.querySelector('.ad-form');
const formFilterElement = document.querySelector('.map__filters');

const offActiveStateFormAd = () => {
  formAdElement.classList.add('ad-form--disabled');
  for (const item of formAdElement.children) {
    item.setAttribute('disabled', '');
  }
};
const onActiveStateFormAd = () => {
  formAdElement.classList.remove('ad-form--disabled');
  for (const item of formAdElement.children) {
    item.removeAttribute('disabled');
  }
};
const offActiveStateFormFilter = () => {
  formFilterElement.classList.add('map__filters--disabled');
  for (const item of formFilterElement.children) {
    item.setAttribute('disabled', '');
  }
};

const onActiveStateFormFilter = () => {
  formFilterElement.classList.remove('map__filters--disabled');
  for (const item of formFilterElement.children) {
    item.removeAttribute('disabled');
  }
};

offActiveStateFormAd();
offActiveStateFormFilter();
export { offActiveStateFormAd, offActiveStateFormFilter, onActiveStateFormAd, onActiveStateFormFilter };
