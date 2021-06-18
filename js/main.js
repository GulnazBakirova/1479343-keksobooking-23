const SIMILAR_ADVERT_COUNT = 10;

const MAX_PRICE = 10000;
const MAX_ROOMS = 10000;
const MAX_GUESTS = 10000;

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const TITLES = ['Квартира', 'Отель', 'Комната', 'Кемпинг', 'Трейлер'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const typesRussian = {
  palace: 'дворец',
  flat: 'квартира',
  house: 'дома',
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
  elements[getRandomIntegerInRange(0, elements.length - 1)];
};

const tempLat = getRandomFloat(LAT_MIN, LAT_MAX, 5);
const tempLng = getRandomFloat(LNG_MIN, LNG_MAX, 5);

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
similarAdverts;


const popup = document.querySelector('.popup');

const popupTitle = popup.querySelector('.popup__title');
popupTitle.textContent = offer.title;

const popupTextAddrress = popup.querySelector('.popup__text--address');
popupTextAddrress.textContent = offer.address;

const popupTextPrice = popup.querySelector('.popup__text--price ');
popupTextPrice.textContent = offer.price + '₽/ночь';

const popupType = popup.querySelector('.popup__type ');
popupType.textContent = offer.type + typesRussian;

const popupTextCapacity = popup.querySelector('.popup__text--capacity');
popupTextCapacity.textContent = offer.rooms + 'комнаты для' + offer.guests + 'гостей';

const popupTextTime = popup.querySelector('.popup__text--time ');
popupTextTime.textContent = 'Заезд после' + offer.checkin + ' , выезд до' + offer.checkout;

const popupDescription = popup.querySelector('.popup__description');
popupDescription.textContent = offer.description;

const featuresElement = popup.getElementById('ul');
const featuresFragment = document.createDocumentFragment();
FEATURES.forEach(function (features) {
  const li = document.createElement('li');
  li.classList.add('popup__feature', 'popup__feature--' + features);
  li.textContent = feature;
  featuresFragment.appendChild(li);
});
featuresElement.appendChild(featuresFragment);

const photosElement = popup.getElementById('div');
const photosFragment = document.createDocumentFragment();
FEATURES.forEach(function (photo) {
  const img = document.createElement('img');
  img.classList.add('popup__photo');
  img.alt = 'Фотография жилья';
  img.src = author.avatar;
  photosFragment.appendChild(img);
});
photosElement.appendChild(photosFragment);


function createPopup() {
  popupTitle,
  popupTextAddrress,
  popupTextPrice,
  popupType,
  popupTextCapacity,
  popupTextTime,
  popupDescription,
  featureElement,
  photoElement,
}


const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const cardElement = cardTemplate.cloneNode(true);
createPopup(cardElement);
cardTemplate.appendChild(cardElement);
