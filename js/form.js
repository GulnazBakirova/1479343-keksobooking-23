import {
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  minPrices,
  NumberOfGuests
} from './data.js';

import {
  resetPage
} from './util.js';


const form = document.querySelector('.ad-form');
const error = document.querySelector('.error');
const success = document.querySelector('.success');

const titleInput = form.querySelector('#title');
const typeInput = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const addressInput = form.querySelector('#address');

const formChildren = [...form.children];
const mapFilters = document.querySelector('.map__filters');
const mapFiltersChildren = [...mapFilters.children];
const resetButton = form.querySelector('.ad-form__reset');

const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

const formTime = form.querySelector('.ad-form__element--time');
const guestNumber = capacity.querySelectorAll('option');

// при загрузке страницы форма находится в неактивном состоянии
const changeFormState = (node, condition) => {
  node.forEach((element) => {
    element.disabled = condition;
  });

  if (condition) {
    form.classList.add('ad-form--disabled');
  } else {
    form.classList.remove('ad-form--disabled');
  }
};

// при загрузке страницы фильтры находятся в неактивном состоянии
const changeFilterState = (node, condition) => {
  node.forEach((element) => {
    element.disabled = condition;
  });

  if (condition) {
    mapFilters.classList.add('map__filters--disabled');
  } else {
    mapFilters.classList.remove('map__filters--disabled');
  }
};

const changeTypeOfHouse = () => {
  const minPrice = minPrices[typeInput.value];
  priceInput.placeholder = minPrice;
  priceInput.min = minPrice;
};

typeInput.addEventListener('change', changeTypeOfHouse);

formTime.addEventListener('change', (evt) => {
  checkOut.value = evt.target.value;
  checkIn.value = evt.target.value;
});


const validateRooms = () => {
  const roomValue = roomNumber.value;

  guestNumber.forEach((guest) => {
    const isDisabled = (NumberOfGuests[roomValue].indexOf(guest.value) === -1);
    guest.selected = NumberOfGuests[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  });
};

validateRooms();

const changeRoomNumber = () => {
  validateRooms();
};

roomNumber.addEventListener('change', changeRoomNumber);

// валидация на достаточную длину строки title
const checkTitleInputHandler = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
};

const resetHandler = (evt) => {
  evt.preventDefault();
  resetPage();
};


// ставлю обработчики на форму
titleInput.addEventListener('input', checkTitleInputHandler);
resetButton.addEventListener('click', resetHandler);

export {
  form,
  formChildren,
  mapFilters,
  mapFiltersChildren,
  addressInput,
  changeFormState,
  changeFilterState,
  error,
  success
};
