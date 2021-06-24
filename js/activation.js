const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('.ad-form__element');

const activateForm = function () {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((element) => {
    element.disabled = false;
  });
};

const deactivateForm = function () {
  adForm.reset();
  adFormFieldsets.forEach((element) => {
    element.disabled = true;
  });
  adForm.classList.add('ad-form--disabled');
};

deactivateForm();
