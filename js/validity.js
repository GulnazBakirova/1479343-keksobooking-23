const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MAX_PRICE_LENGTH = 1000000;

const houseTypeMinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');

const submitButton = document.querySelector('.ad-form__submit');

const typeInput = document.querySelector('#type');

const adTitle = document.querySelector('#title');
const adPrice = document.querySelector('#price');

adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    adTitle.setCustomValidity('');
  }
  adTitle.reportValidity();
});

adPrice.addEventListener('input', () => {
  const valueLength = adPrice.value.length;

  if (valueLength > MAX_PRICE_LENGTH) {
    adPrice.setCustomValidity(`Удалите лишние ${  valueLength - MAX_PRICE_LENGTH } симв.`);
  } else {
    adPrice.setCustomValidity('');
  }

  adPrice.reportValidity();
});

const onTypeInputChange = function (evt) {
  const minPrice = houseTypeMinPrice[evt.target.value.toUpperCase()];
  adPrice.min = minPrice;
  adPrice.placeholder = minPrice.toString();
};

const onTimeInInputChange = function (evt) {
  timeOutInput.value = evt.target.value;
};

const onTimeOutInputChange = function (evt) {
  timeInInput.value = evt.target.value;
};

const checkValidation = function () {
  const inputsAll = document.querySelectorAll('input');
  inputsAll.forEach((item) => {
    if (item.checkValidity() === false) {
      item.classList.add('validation-error');
    } else {
      item.classList.remove('validation-error');
    }
  });
};

submitButton.addEventListener('click', checkValidation);
typeInput.addEventListener('change', onTypeInputChange);
timeInInput.addEventListener('change', onTimeInInputChange);
timeOutInput.addEventListener('change', onTimeOutInputChange);
