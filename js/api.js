const templateSuccessMessage = document.querySelector('#success').content.firstElementChild.cloneNode(true);
const templateErrorMessage = document.querySelector('#error').content.firstElementChild.cloneNode(true);
const ALERT_SHOW_TIME = 5000;
const errorAlertElement = document.querySelector('.error__alert');

const showErrorAlert = (message) => {
  errorAlertElement.textContent = message;
  errorAlertElement.classList.add('error__alert--show');
  setTimeout(() => errorAlertElement.classList.remove('error__alert--show'), ALERT_SHOW_TIME);
};

const removeElement = (item) => {
  item.remove();
};
// I think that the logic of functions showSuccessMessage and showErrorMessage can be separated

const addEventHandler = (element) => {
  const buttonMessageClose = element.querySelector('.error__button');
  const onClick = () => {
    removeElement(element);
    document.removeEventListener('click', onClick);
    if(buttonMessageClose) {
      buttonMessageClose.removeEventListener('click', onClick);
    }
  };
  const onEscKeydown = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      removeElement(element);
      document.removeEventListener('keydown', onEscKeydown);
    }
  };
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onClick);
  if(buttonMessageClose) {
    buttonMessageClose.addEventListener('click', onClick);
  }
};

const showSuccessMessage = () => {
  document.body.appendChild(templateSuccessMessage);
  addEventHandler(templateSuccessMessage);
};

const showErrorMessage = () => {
  document.body.appendChild(templateErrorMessage);
  addEventHandler(templateErrorMessage);
};

// Были сложности с пониманием работы метода clearTimeout();
const debounce = (cb, time = 500) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(cb, time);
  };
};
export { showErrorAlert, showSuccessMessage, showErrorMessage, debounce};
// Были сложности с удалением обработчика
