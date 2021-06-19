const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('.ad-form__element');
const adFormHeader = document.querySelector('.ad-form-header');
const invalidElements = [];
const highlightInvalidElement = function (item) {
  invalidElements.push(item);
  item.classList.add('invalid-element');
};
const onFormInvalid = function (evt) {
  highlightInvalidElement(evt.target);
};

const addFormListeners = function () {
  adForm.addEventListener('invalid', onFormInvalid, true);
};
const removeFormListeners = function () {
  adForm.removeEventListener('invalid', onFormInvalid, true);
};


const activateForm = function () {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach(function (ab) {
    ab.disabled = false;
  });
  adFormHeader.disabled = false;
  addFormListeners();
};

const deactivateForm = function () {
  adForm.reset();
  adFormFieldsets.forEach(function (ab) {
    ab.disabled = true;
  });
  adFormHeader.disabled = true;
  adForm.classList.add('ad-form--disabled');
  removeFormListeners();
};

deactivateForm();
