import {
  ERROR_POST_MESSAGE,
  ERROR_GET_MESSAGE,
  SERVER,
  DATA
} from './data.js';

import {
  addressInput
} from './map.js';

import {
  adForm,
  adFormImgPreview,
  mapFilters,
  adFormPhoto
} from './form.js';

const success = document.querySelector('.success');
const error = document.querySelector('.error');

const getData = (onSuccess) => {
  fetch(DATA)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER,
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
    resetPage();
  }
};

const sendOfferFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
};


export {getData, resetPage, sendOfferFormSubmit};
