import {
  ERROR_POST_MESSAGE,
  ERROR_GET_MESSAGE,
  FETCH_LINK
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

const getData = (onSuccess, onFail) => {
  fetch(FETCH_LINK)
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
    FETCH_LINK,
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

const sendOfferFormSubmit = (e) => {
  e.preventDefault();
  sendData(
    () => showModal(success),
    () => showModal(error),
    new FormData(e.target),
  );
};


export {getData, resetPage, sendOfferFormSubmit};
