const getRandomArrayElement = (elements) => {
  return elements[getRandomIntegerInRange(0, elements.length - 1)];
};
const MAX_PRICE = 10000;
const MAX_ROOMS = 10000;
const MAX_GUESTS = 10000;

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

const tempLat = getRandomFloat(LAT_MIN, LAT_MAX, 5);
const tempLng = getRandomFloat(LNG_MIN, LNG_MAX, 5)

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const CHECKIN_TIMES = ['12:00','13:00','14:00'];
const CHECKOUT_TIMES = ['12:00','13:00','14:00'];
const TITLES = ['Квартира', 'Отель', 'Комната', 'Кемпинг', 'Трейлер'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];


const advert {
  author: {
  avatar: chooseAvatar()
  },

  offer: {
  title: getRandomArrayElement(TITLES),

  address: tempLat + ', ' + tempLng,

  price: getRandomIntegerInRange(0, MAX_PRICE),

  type: getRandomArrayElement(TYPES),

  rooms: getRandomIntegerInRange(0, MAX_ROOMS),

  guests: getRandomIntegerInRange(0, MAX_GUESTS),

  checkin: getRandomArrayElement(CHECKIN_TIMES),

  checkout: getRandomArrayElement(CHECKIN_TIMES),

  features: getFirst(FEATURES),

  description: 'Расскажите подробнее о вашем жилье',

  photos: getFirst(PHOTOS)
  },

  location: {
  lat: tempLat,
  lng: tempLng,
  }
};

function chooseAvatar () {
  const i = Math.round(Math.random() * (8 - 1) + 1);
    const link = 'img/avatars/user0' + i + '.png';
    return link;
};

function getRandomIntegerInRange (min, max) {
  if (max <= min) {
    return 'Второе число не может быть меньше первого!';
  }
  if (min < 0 || max < 0) {
    return 'Нельзя использовать отрицательное число!';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandomFloat(min, max, num) {
 if (max <= min) {
    return 'Второе число не может быть меньше первого!';
  }
  if (min < 0 || max < 0) {
    return 'Нельзя использовать отрицательное число!';
  }
 return (Math.random() * (max - min) + min).toFixed(num);
};


function chooseAvatar () {
  const i = Math.round(Math.random() * (8 - 1) + 1);
    const link = 'img/avatars/user0' + i + '.png';
    return link;
};

function getFirst(array) {
 if (!array) {
       return [];
     }

const n = getRandomIntegerInRange(0, array.length - 1);

     return array.slice(0, n);
};
