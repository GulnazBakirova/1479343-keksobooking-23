import {
  START_POINTS,
  AVATAR_DEFAULT,
  FILES_TYPES
} from './data.js';

import {
  openModal
} from './user-modal.js';

import {
  setMapRefresh
} from './map.js';

import {
  addressInput,
  mapFilters,
  success
} from './form.js';

const TAGNAME = 'img';
const picture = {
  alt: 'Фотография жилья',
  width: 70,
  height: 70,
};

const avatar = document.querySelector('#avatar');
const form = document.querySelector('.ad-form');
const avatarImageContainer = form.querySelector('.ad-form-header__preview');
const inputPhotoOfHousing = form.querySelector('.ad-form__input');
const housingPictureContainer = form.querySelector('.ad-form__photo');

const showPreviewOfImage = (container, tagName, pictureAttribute) => {

  const changeAvatar = (evt) => {
    let element = container.querySelector(tagName);
    const file = evt.target.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILES_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {

        if (element === null) {
          element = document.createElement(tagName);
          element.width = pictureAttribute.width;
          element.height = pictureAttribute.height;
          element.alt = pictureAttribute.alt;
          container.appendChild(element);
        }

        element.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
  return changeAvatar;
};

avatar.addEventListener('change', showPreviewOfImage(avatarImageContainer,TAGNAME, picture));
inputPhotoOfHousing.addEventListener('change', showPreviewOfImage(housingPictureContainer,TAGNAME, picture));


// сброс страницы
export const resetPage = () => {
  form.reset();
  mapFilters.reset();
  addressInput.value = START_POINTS;
  avatarImageContainer.src = AVATAR_DEFAULT;
  housingPictureContainer.textContent = '';
  setMapRefresh();
};

// открытие модального окна
export const showModal = (response) => {
  openModal(response);
  if (response === success) {
    resetPage();
    setMapRefresh();
  }
};

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const removeDebounce = (func, wait, immediate) => {
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

