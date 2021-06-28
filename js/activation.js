const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.querySelectorAll('.map__filter');

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