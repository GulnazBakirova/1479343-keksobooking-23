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

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (immediate && !timeout) {
      func.apply(context, args);
    }
  };
};

