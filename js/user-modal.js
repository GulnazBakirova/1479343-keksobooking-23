import {
  resetPage
} from './util.js';

import {
  SERVER
} from './data.js';

const errorGetData = document.querySelector('.error-data');
const resetFormButton = document.querySelector('.ad-form__reset');

const main = document.querySelector('main');
const successMesage = document.querySelector('#success')
  .content;
const errorMesage = document.querySelector('#error')
  .content;
const addOfferForm = document.querySelector('.ad-form');

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const addOfferFormSubmit = (onSuccess, onError) => {

  addOfferForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch(
      SERVER,
      {
        method: 'POST',
        body: formData,
      },
    ).then(() => onSuccess())
      .catch(() => onError());
  });
};

const closeModal = (response) => {
  response.classList.add('hidden');
};

const escapeSuccessKeydownHandler = (evt) => {
  const popUp = main.querySelector('.success');
  evt.preventDefault();

  if (isEscEvent(evt)) {
    popUp.remove();
    document.removeEventListener('keydown', escapeSuccessKeydownHandler);
    document.removeEventListener('click', closeSuccessModal);
  }
};

// function declaration для hoisting
function closeSuccessModal () {
  const popUp = main.querySelector('.success');
  popUp.remove();
  document.removeEventListener('click', closeSuccessModal);
  document.removeEventListener('keydown', escapeSuccessKeydownHandler);
}

const openModal = () => {
  const successPopUp = successMesage.cloneNode(true);
  document.addEventListener('keydown', escapeSuccessKeydownHandler);
  document.addEventListener('click', closeSuccessModal);
  main.appendChild(successPopUp);
};

const createErrorMesage = () => {
  const error = errorMesage.cloneNode(true);
  document.addEventListener('keydown', escapeErrorKeydownHandler);
  document.addEventListener('click', closeErrorModal);
  main.appendChild(error);
};

// function declaration для hoisting
function escapeErrorKeydownHandler (evt) {
  const popUpError = main.querySelector('.error');

  evt.preventDefault();

  if (isEscEvent(evt)) {
    popUpError.remove();
  }

  document.removeEventListener('keydown', escapeErrorKeydownHandler);
  document.removeEventListener('click', closeErrorModal);
}

// function declaration для hoisting
function closeErrorModal () {
  const popUpError = main.querySelector('.error');
  popUpError.remove();
  document.removeEventListener('click', closeErrorModal);
  document.removeEventListener('keydown', escapeErrorKeydownHandler);
}

resetFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

const createSuccessSubmission = () => {
  openModal();
  resetPage();
};

addOfferFormSubmit(createSuccessSubmission, createErrorMesage);

export {
  errorGetData,
  closeModal,
  openModal
};
