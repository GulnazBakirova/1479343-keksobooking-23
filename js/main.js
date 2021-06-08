function getRandomIntegerInRange (min, max) {
  if (max <= min) {
    return 'Второе число не может быть меньше первого!';
  }
  if (min < 0 || max < 0) {
    return 'Нельзя использовать отрицательное число!';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//getRandomInRange(0, 3)


//function getRandomFloat(min, max, num) {
// if (max <= min) {
//    return 'Второе число не может быть меньше первого!';
//  }
//  if (min < 0 || max < 0) {
//    return 'Нельзя использовать отрицательное число!';
//  }
// return (Math.random() * (max - min) + min).toFixed(num);
//}
//getRandomFloat(1, 3, 3)

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
  title: '',

  address: location.x, location.y,

  price: getRandomIntegerInRange(0, MAX_PRICE),

  type: '',

  rooms: getRandomIntegerInRange(0, MAX_ROOMS),

  guests: getRandomIntegerInRange(0, MAX_GUESTS),

  checkin: {
  '12:00',
  '13:00',
  '14:00'},

  checkout: {
  '12:00',
  '13:00',
  '14:00'},

  features: [],

  description: 'Расскажите подробнее о вашем жилье',

  photos: []
};

const location = {
  lat: 0,
  lng: 0
};

