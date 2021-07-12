const housingTypes = {
  palace: 'Дворец',
  house: 'Дом',
  flat: 'Квартира',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const checkInOut = [
  'checkin',
  'checkout',
];

// в попапе синхронизация поля «Количество комнат» с полем «Количество мест»
const getCapacityOfRooms = (guests, rooms) => {
  let capacity;

  switch (rooms) {
    case 1: capacity = `${rooms} комната - `;
      break;
    case 2:
    case 3:
    case 4: capacity = `${rooms} комнаты - `;
      break;
    case 100: capacity = `${rooms} комнат не для гостей.`;
      break;
    default: capacity = `${rooms} комнат - `;
  }

  if (typeof guests === 'number') {
    return capacity += `для ${guests} гост${guests === 1 ? 'я' : 'ей'}.`;
  }
  return capacity;
}

const getCurrentOffer = (currentOffer) => {
  const {author, offer, location, extended} = currentOffer;
  currentOffer = Object.assign({}, author, offer, location, extended);
  currentOffer.time = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  currentOffer.capacity = getCapacityOfRooms(currentOffer.guests, currentOffer.rooms);
  checkInOut.forEach(field => delete currentOffer[field]);
  return currentOffer;
}

// рендер и показ картинок жилья в попапе
const renderPhotos = (photos, photoElement) => {
  photoElement.textContent = '';
  photos.forEach((item) => {
    photoElement.insertAdjacentHTML('beforeend',
      `<img src=${item} class="popup__photo" width="50" height="50" alt="Фотография жилья">`);
  });
}

// рендер и показ части features в попапе
const renderFeatures = (features, featureElement) => {
  featureElement.textContent = '';
  features.forEach((item) => {
    featureElement.insertAdjacentHTML('beforeend',
      `<li class="popup__feature popup__feature--${item}"></li>`);
  });
}

// создаю попап, чтобы добавить его к меткам объявлений
const createCustomPopup = (currentOffer) => {
  const popup = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  const nodes = Array.from(popup.children);
  const keys = Object.keys(currentOffer);
  const classes = nodes.map(item => item.classList.value);
  classes.forEach((item, i) => {
    const key = keys.find(key => item.includes(key));
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
}

export {
  getCurrentOffer,
  createCustomPopup
};

