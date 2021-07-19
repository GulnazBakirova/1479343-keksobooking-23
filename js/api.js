import {
  DATA,
  SERVER
} from './data.js';

const form = document.querySelector('.ad-form');

// метод для получения данных
export const getData = (onSuccess) => {
  fetch(DATA)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    });
};

// метод для отправки данных
export const sendData = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
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
