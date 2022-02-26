function removeAttributesOfChilds(parentElement, atributte) {
  for (const item of parentElement.children) {
    item.removeAttribute(atributte);
  }
}

function enableFormActiveState(elementForm) {
  elementForm.classList.remove('ad-form--disabled');
  removeAttributesOfChilds(elementForm, 'disabled');
}

function enableFormFilterActiveState(elementFilter) {
  elementFilter.classList.remove('map__filters--disabled');
  removeAttributesOfChilds(elementFilter, 'disabled');
}

export { enableFormActiveState, enableFormFilterActiveState };
