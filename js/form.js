import {
  MAX_ROOMS,
  MAX_TITLE_LENGTH,
  MIN_PRICE,
  MIN_TITLE_LENGTH,
  NO_ROOMS
} from './data.js';
import {
  success,
  error
} from './user-modal.js';
import {
  showModal,
  resetPage,
  pictureFormat
} from './util.js';
import {
  sendData
} from './api.js';

const form = document.querySelector('.ad-form');

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

const avatarInput = document.querySelector('#avatar');
const avatarImagePreview = form.querySelector('.ad-form-header__preview img');
const housingImageInput = form.querySelector('#images');
const housingImagePreview = form.querySelector('.ad-form__photo');

// ставлю обработчик инпута для выбора файлов на аватарку
avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name;
  if (pictureFormat(fileName)) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarImagePreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

// ставлю обработчик инпута для выбора файлов на картинку жилья
housingImageInput.addEventListener('change', () => {
  const file = housingImageInput.files[0];
  const fileName = file.name;
  if (pictureFormat(fileName)) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const image = reader.result;
      housingImagePreview.insertAdjacentHTML('beforeend',
        `<img src="${image}" alt="Фотография жилья" width="100%" height="100%">`);
    });
    reader.readAsDataURL(file);
  }
});


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

const changeTypeHandler = (targetValue) => {
  const price = MIN_PRICE[targetValue];
  priceInput.min = price;
  priceInput.placeholder = price;
};

const changeTimeHandler = (targetValue) => {
  checkOut.value = targetValue;
  checkIn.value = targetValue;
};

const getOptionsHandler = (options) => {
  let memoOptions = [];

  return (targetValue) => {
    memoOptions.forEach((item) => {
      item.disabled = false;
    });

    const index = options.findIndex((elem) => elem.value === targetValue);
    const arrayToDisabled = index !== -1 ? options.slice(index + 1) : options.slice(0, options.length - 1);
    arrayToDisabled.forEach((item) => {
      item.disabled = true;
    });

    memoOptions = [...arrayToDisabled];
  };
};

const getCapacityHandler = getOptionsHandler([...capacity]);
getCapacityHandler(roomNumber.value);

const selectCapacityHandler = (targetValue) => {
  capacity.value = +targetValue === MAX_ROOMS ? NO_ROOMS : targetValue;
  getCapacityHandler(targetValue);
};

const changeHandler = (e) => {
  const targetInput = e.target;
  const targetValue = targetInput.value;

  switch (targetInput) {
    case typeInput:
      changeTypeHandler(targetValue);
      break;
    case checkIn:
      changeTimeHandler(targetValue);
      break;
    case checkOut:
      changeTimeHandler(targetValue);
      break;
    case roomNumber:
      selectCapacityHandler(targetValue);
      break;
    default:
      break;
  }
};

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

//отправка формы
const sendOfferFormSubmit = (evt) => {
  evt.preventDefault();
  sendData(
    () => showModal(success),
    () => showModal(error),
    new FormData(e.target),
  );
};

// ставлю обработчики на форму
form.addEventListener('change', changeHandler);
form.addEventListener('submit', sendOfferFormSubmit);
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
  avatarImagePreview,
  housingImagePreview
};
