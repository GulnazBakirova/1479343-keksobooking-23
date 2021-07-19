import {
  housingTypes,
  checkInOut
} from './data.js';

const GuestsQuantity = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  HUNDRED: 100,
};

// в попапе синхронизация поля «Количество комнат» с полем «Количество мест»
const getCapacityOfRooms = (guests, rooms) => {
  let capacity;

  switch (rooms) {
    case GuestsQuantity.ONE:
      capacity = `${rooms} комната - `;
      break;
    case GuestsQuantity.TWO:
    case GuestsQuantity.THREE:
    case GuestsQuantity.HUNDRED:
      capacity = `${rooms} комнат не для гостей.`;
      break;
    default:
      capacity = `${rooms} комнат - `;
  }

  if (typeof guests === 'number') {
    return capacity += `для ${guests} гост${guests === 1 ? 'я' : 'ей'}.`;
  }
  return capacity;
};

const getCurrentOffer = (currentOffer) => {
  const {
    author,
    offer,
    location,
    extended,
  } = currentOffer;
  currentOffer = Object.assign({}, author, offer, location, extended);
  currentOffer.time = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  currentOffer.capacity = getCapacityOfRooms(currentOffer.guests, currentOffer.rooms);
  checkInOut.forEach((field) => delete currentOffer[field]);
  return currentOffer;
};

// рендер и показ картинок жилья в попапе
const renderPhotos = function (array) {
  const fragment = document.createDocumentFragment();
  array.forEach((element) => {
    const image = document.createElement('img');
    image.classList.add('popup__photo');
    image.src = element;
    image.alt = 'Фотография жилья';
    fragment.appendChild(image);
  });
  return fragment;
};

// рендер и показ части features в попапе
const renderFeatures = function (array) {
  const fragment = document.createDocumentFragment();
  array.forEach((element) => {
    const container = document.createElement('li');
    container.className = 'feature';
    container.classList.add(`feature--${element}`);
    fragment.appendChild(container);
  });
  return fragment;
};


// создаю попап, чтобы добавить его к меткам объявлений
const createCustomPopup = (currentOffer) => {
  const popup = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  const nodes = Array.from(popup.children);
  const keys = Object.keys(currentOffer);
  const classes = nodes.map((item) => item.classList.value);
  classes.forEach((item, i) => {
    const key = keys.find((keyValue) => item.includes(keyValue));
    const value = currentOffer[key];
    const node = nodes[i];
    if (!key || !value || value.length === 0) {
      node.classList.add('hidden');
    }

    if (!Array.isArray(value) && key !== 'avatar') {
      node.textContent = value;
    }

    if (key === 'features') {
      renderFeatures(value, node);
    }

    if (key === 'photos') {
      renderPhotos(value, node);
    }

    if (key === 'type') {
      node.textContent = housingTypes[value];
    }

    node.src = value;

  });
  return popup;
};

export {
  getCurrentOffer,
  createCustomPopup
};
