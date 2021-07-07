import {
  resetPage,
  sendOfferFormSubmit
} from './api.js';

import {
  houseTypeMinPrice
} from './validity.js';


const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.querySelectorAll('.map__filter');

const adFormImgPreview = adForm.querySelector('.ad-form-header__preview img');
const adFormPhoto = adForm.querySelector('.ad-form__photo');
const resetButton = adForm.querySelector('.ad-form__reset');

const typeInput = document.querySelector('#housing-type');
const checkinTime = document.querySelector('#timein');
const checkoutTime = document.querySelector('#timeout');
const priceInput = document.querySelector('#housing-price');

const addressInput = document.querySelector('#address');

const setAddressCoords = function (coords) {
  addressInput.value = `${coords.x}, ${coords.y}`;
};

const activateAdForm = function () {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((element) => {
    element.disabled = false;
  });
};

const deactivateAdForm = function () {
  adForm.reset();
  adFormFieldsets.forEach((element) => {
    element.disabled = true;
  });
  adForm.classList.add('ad-form--disabled');
};

deactivateAdForm();

window.form = {
  setAddress: setAddressCoords,
  activate: activateAdForm,
};

/*const activateMapForm = function () {
  mapForm.classList.remove('map-form--disabled');
  mapFilters.forEach((element) => {
    element.disabled = false;
  });
};

const deactivateMapForm = function () {
  mapForm.reset();
  mapFilters.forEach((element) => {
    element.disabled = true;
  });
  mapForm.classList.add('map-form--disabled');
};*/

const changeTypeHandler = (targetValue) => {
  const price = houseTypeMinPrice[targetValue];
  priceInput.min = price;
  priceInput.placeholder = price;
};

const changeTimeHandler = (targetValue) => {
  checkoutTime.value = targetValue;
  checkinTime.value = targetValue;
};

const changeHandler = (e) => {
  const targetInput = e.target;
  const targetValue = targetInput.value;

  switch (targetInput) {
    case typeInput:
      changeTypeHandler(targetValue);
      break;
    case checkinTime:
      changeTimeHandler(targetValue);
      break;
    case checkoutTime:
      changeTimeHandler(targetValue);
      break;
    default:
      break;
  }
};

const resetHandler = (e) => {
  e.preventDefault();
  resetPage();
};

adForm.addEventListener('focus', () => {
  adForm.addEventListener('change', changeHandler);
  adForm.addEventListener('submit', sendOfferFormSubmit);
  resetButton.addEventListener('click', resetHandler);
}, true);

export {
  adForm,
  mapFilters,
  adFormImgPreview,
  adFormPhoto
};
