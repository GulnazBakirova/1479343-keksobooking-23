import {
  resetPage,
  sendOfferFormSubmit
} from './api.js';


const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.querySelectorAll('.map__filter');

const adFormImgPreview = adForm.querySelector('.ad-form-header__preview img');
const adFormPhoto = adForm.querySelector('.ad-form__photo');
const resetButton = adForm.querySelector('.ad-form__reset');

const typeInput = document.querySelector('#type');
const checkinTime = document.querySelector('#timein');
const checkoutTime = document.querySelector('#timeout');

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

const activateMapForm = function () {
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
    default: break;
  }
}

const changeTypeHandler = (targetValue) => {
  const price = houseTypeMinPrice[targetValue];
  priceInput.min = price;
  priceInput.placeholder = price;
};

const changeTimeHandler = (targetValue) => {
  checkoutTime.value = targetValue;
  checkinTime.value = targetValue;
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

adForm.addEventListener('blur', () => {
  adForm.removeEventListener('change', changeHandler, true);
  adForm.removeEventListener('submit', sendOfferFormSubmit, true);
  resetButton.removeEventListener('click', resetHandler, true);
});

export {adForm, adFormImgPreview, adFormPhoto};
