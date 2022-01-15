const templateSuccessMessage = document.querySelector('#success').content.firstElementChild.cloneNode(true);
const templateErrorMessage = document.querySelector('#error').content.firstElementChild.cloneNode(true);
const ALERT_SHOW_TIME = 5000;
const errorAlert = document.querySelector('.error__alert');

const showErrorAlert = (message) => {
  errorAlert.textContent = message;
  errorAlert.classList.add('error__alert--show');
  setTimeout(() => errorAlert.classList.remove('error__alert--show'), ALERT_SHOW_TIME);
};

const removeElement = (item) => {
  item.remove();
};

const showSuccessMessage = () => {
  document.body.appendChild(templateSuccessMessage);
  const onClick = () => {
    removeElement(templateSuccessMessage);
    document.removeEventListener('click', onClick);
  };
  const onEscKeydown = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      removeElement(templateSuccessMessage);
      document.removeEventListener('keydown', onEscKeydown);
    }
  };
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onEscKeydown);
};

const showErrorMessage = () => {
  document.body.appendChild(templateErrorMessage);
  const buttonMessageClose = templateErrorMessage.querySelector('.error__button');
  const onClick = () => {
    removeElement(templateErrorMessage);
    document.removeEventListener('click', onClick);
    buttonMessageClose.removeEventListener('click', onClick);
  };
  const onEscKeydown = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      removeElement(templateErrorMessage);
      document.removeEventListener('keydown', onEscKeydown);
    }
  };
  document.addEventListener('keydown', onEscKeydown);
  buttonMessageClose.addEventListener('click', onClick);
  document.addEventListener('click', onClick);
};

const debounce = (cb, time = 500) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(cb, time);
  };
};
export { showErrorAlert, showSuccessMessage, showErrorMessage, debounce};
