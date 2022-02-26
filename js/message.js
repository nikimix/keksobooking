const messageSuccessElement = document.querySelector('#success').content.firstElementChild.cloneNode(true);
const messageUnsuccessElement = document.querySelector('#error').content.firstElementChild.cloneNode(true);
const MESSAGE_DISPLAY_TIME = 5000;

function createErrorMessage(message) {
  const errorMessageElement = document.createElement('div');
  errorMessageElement.textContent = message;
  errorMessageElement.classList.add('error__alert');

  return errorMessageElement;
}

function deleteErrorMessage(element) {
  setTimeout(() => element.remove(), MESSAGE_DISPLAY_TIME);
}

function showErrorMessage(message) {
  const errorMessageElement = createErrorMessage(message);
  document.body.prepend(errorMessageElement);
  deleteErrorMessage(errorMessageElement);
}

function removeElementOnClick(target, element) {
  target.addEventListener('click', () => element.remove(), {once: true});
}

function removeElementOnEscDown(target, element) {
  target.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      element.remove();
    }
  }, {once: true});
}

function showSuccessMessage() {
  document.body.append(messageSuccessElement);
  removeElementOnClick(document, messageSuccessElement);
  removeElementOnEscDown(document, messageSuccessElement);
}

function showUnsuccessMessage() {
  document.body.append(messageUnsuccessElement);
  const buttonTryAgain = document.querySelector('.error__button');
  removeElementOnClick(document, messageUnsuccessElement);
  removeElementOnClick(buttonTryAgain, messageUnsuccessElement);
  removeElementOnEscDown(document, messageUnsuccessElement);
}


export { showErrorMessage, showSuccessMessage, showUnsuccessMessage };
