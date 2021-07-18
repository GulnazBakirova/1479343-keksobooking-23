import {
  START_POINTS,
  AVATAR_DEFAULT,
  FILE_TYPES
} from './data.js';

import {
  openModal
} from './user-modal.js';

import {
  refreshMap
} from './map.js';

import {
  addressInput,
  form,
  mapFilters,
  avatarImagePreview,
  housingImagePreview,
  success
} from './form.js';


// сброс страницы
export const resetPage = () => {
  form.reset();
  mapFilters.reset();
  addressInput.value = START_POINTS;
  avatarImagePreview.src = AVATAR_DEFAULT;
  housingImagePreview.textContent = '';
  refreshMap();
};

// открытие модального окна
export const showModal = (response) => {
  if (response === success) {
    openModal(response);
    resetPage();
    refreshMap();
  } else {
    openModal(response);
  }
};

// валидация на формат картинки
export const checkPictureFormat = (pictureName) => {
  pictureName.toLowerCase();
  return FILE_TYPES.some((fileTypes) => pictureName.endsWith(fileTypes));
};

