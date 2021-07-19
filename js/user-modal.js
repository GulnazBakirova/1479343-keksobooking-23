import {
  resetPage,
  isEscEvent
} from './util.js';

import {
  sendData
} from './api.js';

const form = document.querySelector('.ad-form');
const errorGetData = document.querySelector('.error-data');
const resetButton = document.querySelector('.ad-form__reset');
const main = document.querySelector('main');
const successMesage = document.querySelector('#success')
  .content;
const errorMesage = document.querySelector('#error')
  .content;

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

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

const createSuccessSubmission = () => {
  openModal();
  resetPage();
};

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(createSuccessSubmission, createErrorMesage, formData);
});


export {
  errorGetData,
  openModal
};
