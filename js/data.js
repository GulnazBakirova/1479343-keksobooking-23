export const PINS_AMOUNT = 10;

export const MIN_PRICES = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};
export const PRICES = {
  low: 10000,
  high: 50000,
};

export const AVATAR_DEFAULT = 'img/muffin-grey.svg';

export const MAX_DECIMAL_NUMBERS = 5;
export const MIN_TITLE_LENGTH = 30;
export const MAX_TITLE_LENGTH = 100;

export const TOKYO_LAT = 35.6895;
export const TOKYO_LNG = 139.69171;
export const START_POINTS = `${TOKYO_LAT.toFixed(MAX_DECIMAL_NUMBERS)}, ${TOKYO_LNG}`;
export const START_POINTS_OBJECT = {
  lat: TOKYO_LAT,
  lng: TOKYO_LNG,
};
export const ZOOM = 13;

export const MAIN_PIN = 52;
export const PIN = 40;

export const SERVER = 'https://23.javascript.pages.academy/keksobooking';
export const DATA = 'https://23.javascript.pages.academy/keksobooking/data';


export const RERENDER_DELAY = 500;

export const ERROR_POST_MESSAGE = 'Не удалось отправить форму. Попробуйте ещё раз';
export const ERROR = 'Ошибка!';

export const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
export const DEFAULT_AVATAR = 'img/muffin-grey.svg';

export  const housingTypes = {
  palace: 'Дворец',
  house: 'Дом',
  flat: 'Квартира',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

export  const checkInOut = [
  'checkin',
  'checkout',
];

export const NumberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};
