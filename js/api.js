import {
  ERROR_POST_MESSAGE,
  ERROR_GET_MESSAGE
} from './data.js';

export const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
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
