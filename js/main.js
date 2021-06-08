const getRandomArrayElement = (elements) => {
  return elements[getRandomIntegerInRange(0, elements.length - 1)];
};
const MAX_PRICE = 10000;
const MAX_ROOMS = 10000;
const MAX_GUESTS = 10000;
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const CHECKIN_TIMES = ['12:00','13:00','14:00'];
const CHECKOUT_TIMES = ['12:00','13:00','14:00'];
const TITLES = ['Квартира', 'Отель', 'Комната', 'Кемпинг', 'Трейлер'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

function chooseAvatar () {
  const i = Math.round(Math.random() * (8 - 1) + 1);
    const link = 'img/avatars/user0' + i + '.png';
    return link;
}

const author = {
  avatar: chooseAvatar()
};

const offer = {
  title: getRandomArrayElement(TITLES),

  address: location.x, location.y,

  price: getRandomIntegerInRange(0, MAX_PRICE),

  type: getRandomArrayElement(TYPES),

  rooms: getRandomIntegerInRange(0, MAX_ROOMS),

  guests: getRandomIntegerInRange(0, MAX_GUESTS),

  checkin: getRandomArrayElement(CHECKIN_TIMES),

  checkout: getRandomArrayElement(CHECKIN_TIMES),

  features: getRandomArrayElement(FEATURES),

  description: 'Расскажите подробнее о вашем жилье',

  photos: getRandomArrayElement(PHOTOS)
};

const location = {
  lat: getRandomFloat(35.65000, 35.70000),
  lng: getRandomFloat(139.70000, 139.80000)
};


function getRandomIntegerInRange (min, max) {
  if (max <= min) {
    return 'Второе число не может быть меньше первого!';
  }
  if (min < 0 || max < 0) {
    return 'Нельзя использовать отрицательное число!';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
 if (max <= min) {
    return 'Второе число не может быть меньше первого!';
  }
  if (min < 0 || max < 0) {
    return 'Нельзя использовать отрицательное число!';
  }
 return Math.floor(Math.random() * (max - min)) + min;
}

function chooseAvatar () {
  const i = Math.round(Math.random() * (8 - 1) + 1);
    const link = 'img/avatars/user0' + i + '.png';
    return link;
}
