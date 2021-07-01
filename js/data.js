import {
  getRandomIntegerInRange,
  getRandomFloat,
  chooseAvatar,
  getFirst,
  getRandomArrayElement
} from './util.js';

const SIMILAR_ADVERT_COUNT = 10;

const MAX_PRICE = 10000;
const MAX_ROOMS = 10000;
const MAX_GUESTS = 10000;

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

const ERROR_POST_MESSAGE = 'Не удалось отправить форму. Попробуйте ещё раз.';
const ERROR_GET_MESSAGE = 'Ошибка загрузки данных с сервера.';

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
  house: 'дом',
  bungalow: 'бунгало',
  hotel: 'отель',
};

function createAdvert() {
const tempLat = getRandomFloat(LAT_MIN, LAT_MAX, 5);
const tempLng = getRandomFloat(LNG_MIN, LNG_MAX, 5);
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

export {SIMILAR_ADVERT_COUNT, MAX_PRICE, MAX_ROOMS, MAX_GUESTS, LAT_MIN, LAT_MAX, LNG_MIN, LNG_MAX, ERROR_POST_MESSAGE,
  ERROR_GET_MESSAGE, FEATURES, PHOTOS, CHECKIN_TIMES, CHECKOUT_TIMES, TITLES, TYPES, typesRussian, createAdvert};
