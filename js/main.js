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



const popupTitle = document.querySelector('.popup__title');
popupTitle.textContent = offer.title;
const popupTextAddrress = document.querySelector('.popup__text--address');
popupTextAddrress.textContent = offer.address;
const popupTextPrice = document.querySelector('.popup__text--price ');
popupTextPrice.textContent = offer.price + '₽/ночь';

const popupTextCapacity = document.querySelector('.popup__text--capacity');
popupTextCapacity.textContent = offer.rooms + 'комнаты для' + offer.guests + 'гостей';
const popupTextTime = document.querySelector('..popup__text--time ');
popupTextTime.textContent = 'Заезд после' + offer.checkin + ' , выезд до' + offer.checkout;

const popupDescription = document.querySelector('.popup__description');
popupDescription.textContent = offer.description;


const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');


const similarListElement = userDialog.querySelector('.setup-similar-list');
const cardElement = cardTemplate.cloneNode(true);
similarListElement.appendChild(cardElement);


const featuresContainer = document.createElement('ul');
featuresContainer.classList.add('popup__features');
features.forEach(function (features) {
  const featureElement = document.createElement('li');
  featureElement.classList.add('popup__feature', 'popup__feature--' + features);
  featuresContainer.appendChild(featureElement);
});
cardElement.appendChild(featuresContainer);

const photosContainer = document.createElement('div');
photosContainer.classList.add('popup__photos');
photos.forEach(function (photo) {
  const photoElement = document.createElement('img');
  photoElement.classList.add('popup__photo');
  photoElement.alt = 'Фотография жилья';
  photoElement.src = author.avatar;
  photosContainer.appendChild(photoElement);
});
cardElement.appendChild(photosContainer);