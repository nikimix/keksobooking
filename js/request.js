const getDataAds = (setData, onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        onError();
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((response) => {
      setData(response.slice(0,10));
    })
    .catch((err) => {
      onError(err);
    });
};

const sendUserForm = (onSuccess, onError, resetForm) => {
  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: new FormData(document.querySelector('.ad-form')),
    })
    .then((response) => {
      if(response.ok) {
        onSuccess();
        resetForm();
      } else {
        onError();
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch(() => {
      onError();
    });
};

export {getDataAds, sendUserForm};
