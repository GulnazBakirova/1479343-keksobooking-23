import {
  SIMILAR_ADVERT_COUNT,
  MAX_PRICE,
  MAX_ROOMS,
  MAX_GUESTS,
  LAT_MIN,
  LAT_MAX,
  LNG_MIN,
  LNG_MAX,
  FEATURES,
  PHOTOS,
  CHECKIN_TIMES,
  CHECKOUT_TIMES,
  TITLES,
  TYPES
} from './data.js';

/*const typesRussian = {
  palace: 'дворец',
  flat: 'квартира',
  house: 'дом',
  bungalow: 'бунгало',
  hotel: 'отель',
};

function getRandomIntegerInRange(min, max) {
  if (max <= min) {
    return 'Второе число не может быть меньше первого!';
  }
  if (min < 0 || max < 0) {
    return 'Нельзя использовать отрицательное число!';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomFloat(min, max, num) {
  if (max <= min) {
    return 'Второе число не может быть меньше первого!';
  }
  if (min < 0 || max < 0) {
    return 'Нельзя использовать отрицательное число!';
  }
  return (Math.random() * (max - min) + min).toFixed(num);
}


function chooseAvatar() {
  const i = Math.round(Math.random() * (8 - 1) + 1);
  const link = `img/avatars/user0 + ${i} + .png`;
  return link;
}


function getFirst(array) {
  if (!array) {
    return [];
  }
  const n = getRandomIntegerInRange(0, array.length - 1);
  return array.slice(0, n);
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntegerInRange(0, elements.length - 1)];
};

const tempLat = getRandomFloat(LAT_MIN, LAT_MAX, 5);
const tempLng = getRandomFloat(LNG_MIN, LNG_MAX, 5);

let author;
let cardElement;

function createAdvert() {
  return {
    author: {
      avatar: chooseAvatar(),
    },

    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${tempLat} , ${tempLng}`,
      price: getRandomIntegerInRange(0, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomIntegerInRange(0, MAX_ROOMS),
      guests: getRandomIntegerInRange(0, MAX_GUESTS),
      checkin: getRandomArrayElement(CHECKIN_TIMES),
      checkout: getRandomArrayElement(CHECKOUT_TIMES),
      features: getFirst(FEATURES),
      description: 'Расскажите подробнее о вашем жилье',
      photos: getFirst(PHOTOS),
    },

    location: {
      lat: tempLat,
      lng: tempLng,
    },
  };
}

const similarAdverts = new Array(SIMILAR_ADVERT_COUNT).fill(null).map(() => createAdvert());

function createPopup(advert) {
  const cardTemplate = document.querySelector('#card');
  cardElement = cardTemplate.cloneNode(true);

  const popup = cardElement.content.querySelector('.popup');

  const popupTitle = popup.querySelector('.popup__title');
  popupTitle.textContent = advert.offer.title;

  const popupTextAddrress = popup.querySelector('.popup__text--address');
  popupTextAddrress.textContent = advert.offer.address;

  const popupTextPrice = popup.querySelector('.popup__text--price ');
  popupTextPrice.textContent = `${advert.offer.price} ₽/ночь`;

  const popupType = popup.querySelector('.popup__type ');
  popupType.textContent = `${advert.offer.type}  ${typesRussian[advert.offer.type]}`;

  const popupTextCapacity = popup.querySelector('.popup__text--capacity');
  popupTextCapacity.textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;

  const popupTextTime = popup.querySelector('.popup__text--time ');
  popupTextTime.textContent = `Заезд после ${advert.offer.checkin} , выезд до ${advert.offer.checkout}`;


  const popupDescription = popup.querySelector('.popup__description');
  popupDescription.textContent = advert.description;

  const featuresElement = popup.querySelector('.popup__features');
  featuresElement.innerHTML = '';
  const featuresFragment = document.createDocumentFragment();
  advert.offer.features.forEach((feature) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature','popup__feature--' + feature);
    featuresFragment.appendChild(li);
  });
  featuresElement.appendChild(featuresFragment);

  const photosElement = popup.querySelector('.popup__photos');
  photosElement.innerHTML = '';
  const photosFragment = document.createDocumentFragment();
  advert.offer.photos.forEach((photo) => {
    const img = document.createElement('img');
    img.classList.add('popup__photo');
    img.alt = 'Фотография жилья';
    img.src = photo;
    photosFragment.appendChild(img);
  });
  photosElement.appendChild(photosFragment);

  return popup;
}

const mapCanvas = document.querySelector('#map-canvas');

const x = createPopup(similarAdverts[0]);
mapCanvas.appendChild(x);

export {createAdvert, createPopup};*/
