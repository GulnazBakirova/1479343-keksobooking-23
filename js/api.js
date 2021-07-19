import {
  DATA,
  SERVER,
  ERROR_POST_MESSAGE
} from './data.js';

// метод для получения данных
export const getData = (onSuccess) => {
  fetch(DATA)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    });
};

// метод для отправки данных
export const sendData = (onSuccess, onFail, body) => {
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
