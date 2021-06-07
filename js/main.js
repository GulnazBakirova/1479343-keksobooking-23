//function getRandomInRange(min, max) {
//  if (max <= min) {
//    return 'Второе число не может быть меньше первого!';
//  }
//  if (min < 0 || max < 0) {
//    return 'Нельзя использовать отрицательное число!';
//  }
//  return Math.floor(Math.random() * (max - min + 1)) + min;
//}
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

const getRandomIntegerInRange = (elements) => {
  return elements[_.random(0, elements.length - 1)];
};
const FEATURES = [wifi, dishwasher, parking, washer, elevator, conditioner];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const CHECKIN = ['12:00','13:00','14:00'];
const CHECKOUT = ['12:00','13:00','14:00'];
const TITLE = ['Квартира', 'Отель', 'Комната', 'Кемпинг', 'Трейлер'];

function price (min, max) {
  const MAX_PRICE = 10000;
    if (min < 0 || max < 0) {
    return 'Цена не может быть меньше 0!';
     }
  return Math.floor(Math.random() * (max - min + 1)) + min;
  };
function rooms (min, max) {
  const MAX_ROOMS = 10000;
    if (min < 0 || max < 0) {
    return 'Количество комнат не может быть меньше 0!';
     }
  return Math.floor(Math.random() * (max - min + 1)) + min;
  };
function guests (min, max) {
  const MAX_GUESTS = 10000;
    if (min < 0 || max < 0) {
    return 'Количество гостей не может быть меньше 0!';
     }
  return Math.floor(Math.random() * (max - min + 1)) + min;
  };

let author = {
  avatar: function () {
    let i = Math.round(Math.random() * (8 - 1) + 1);
    let link = 'img/avatars/user0' + i + '.png';
    return link;
  }

};


let offer = {
  title,

  address: location.x, location.y,

  getRandomIntegerInRange(0, MAX_PRICE),

  type: {
    palace,
    flat,
    house,
    bungalow,
    hotel
  },

  getRandomIntegerInRange(0, MAX_ROOMS),

  getRandomIntegerInRange(0, MAX_GUESTS),

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

let location = {
  lat: 0,
  lng: 0
};









