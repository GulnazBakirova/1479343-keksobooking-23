import {
  START_POINTS,
  AVATAR_DEFAULT
} from './data.js';

import {
  openModal,
  success
} from './user-modal.js';

import {
  refreshMap
} from './map.js';

import {
  addressInput,
  form,
  mapFilters,
} from './form.js';

// сброс страницы
export const resetPage = () => {
  form.reset();
  mapFilters.reset();
  addressInput.value = START_POINTS;
  avatarPreview.src = AVATAR_DEFAULT;
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
