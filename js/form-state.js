function removeAttributesOfChildElements(parentElement, atributte) {
  for (const item of parentElement.children) {
    item.removeAttribute(atributte);
  }
}

function enableFormActiveState(elementForm) {
  elementForm.classList.remove('ad-form--disabled');
  removeAttributesOfChildElements(elementForm, 'disabled');
}

function enableFormFilterActiveState(elementFormFilter) {
  elementFormFilter.classList.remove('map__filters--disabled');
  removeAttributesOfChildElements(elementFormFilter, 'disabled');
}

export { enableFormActiveState, enableFormFilterActiveState };
