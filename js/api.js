import { setAddressDefault, setViewMapDefault, setPositinMainMarkerDefault } from './map.js';
const templateSuccessElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const templateErrorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const setFieldsValueDefault = () => {
  document.querySelector('.ad-form').reset();
  setAddressDefault();
  setViewMapDefault();
  setPositinMainMarkerDefault();
};

const showMessageSuccess = () => {
  document.body.appendChild(templateSuccessElement);
  const successElement = document.querySelector('.success');

  const onClick = () => {
    removeMessageSuccess();
  };

  const onEscKeydown = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      removeMessageSuccess();
    }
  };
  function removeMessageSuccess() {
    successElement.remove();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onEscKeydown);
  }

  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onEscKeydown);
};

const showMessageError = () => {
  document.body.appendChild(templateErrorElement);
  const messageErrorElement = document.querySelector('.error');
  const buttonMessageClose = messageErrorElement.querySelector('.error__button');
  const onClick = () => {
    removeMessageError();
  };

  const onEscKeydown = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      removeMessageError();
    }
  };

  function removeMessageError() {
    messageErrorElement.remove();
    document.removeEventListener('keydown', onEscKeydown);
    buttonMessageClose.removeEventListener('click', onClick);
    document.removeEventListener('click', onClick);
  }
  document.addEventListener('keydown', onEscKeydown);
  buttonMessageClose.addEventListener('click', onClick);
  document.addEventListener('click', onClick);
};

export { setFieldsValueDefault };
export { showAlert, showMessageSuccess, showMessageError };
