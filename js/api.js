import {
  ERROR_POST_MESSAGE,
  ERROR_GET_MESSAGE
} from './data.js';

import {
  openModal,
  closeModal,
  addressInput
} from './map.js';

import {
  adForm,
  adFormImgPreview
} from './form.js';

const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking ')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        onFail(ERROR_GET_MESSAGE);
      }
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      onFail(ERROR_GET_MESSAGE);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking ',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(ERROR_POST_MESSAGE);
      }
    })
    .catch(() => {
      onFail(ERROR_POST_MESSAGE);
    });
};


const resetPage = () => {
  adForm.reset();
  mapFilters.reset();
  addressInput.value = '35.6895, 139.69171';
  adFormImgPreview.src = 'img/muffin-grey.svg';
  adFormPhoto.textContent = '';
};

const showModal = (response) => {
  if (response === success) {
    openModal(response);
    resetPage();
  }
  else {
    openModal(response);
  }

  setTimeout(() => {
    closeModal(response);
  }, 5000);
};

const sendOfferFormSubmit = (e) => {
  e.preventDefault();
  sendData(
    () => showModal(success),
    () => showModal(error),
    new FormData(e.target),
  );
};


export {getData, resetPage, sendOfferFormSubmit}
