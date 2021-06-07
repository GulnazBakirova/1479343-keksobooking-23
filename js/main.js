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


let author = {
  avatar: function () {
    let i = Math.round(Math.random() * (8 - 1) + 1);
    let link = "img/avatars/user0" + i + ".png";
    return link;
  }

};



const features = [wifi, dishwasher, parking, washer, elevator, conditioner];
const photos = [https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg,
https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg,
https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg];

let offer = {
  title: 'Заголовок',

  address: location.x, location.y,

  price: function (min, max) {
    if (min < 0 || max < 0) {
    return 'Цена не может быть меньше 0!';
     }
  return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  type: {
    palace,
    flat,
    house,
    bungalow,
    hotel
  },

  rooms: function(min, max) {
    if (min < 0 || max < 0) {
    return 'Количество комнат не может быть меньше 0!';
     }
  return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  guests: function (min, max) {
    if (min < 0 || max < 0) {
    return 'Количество гостей не может быть меньше 0!';
     }
  return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  checkin: {
  '12:00',
  '13:00',
  '14:00'},

  checkout: {
  '12:00',
  '13:00',
  '14:00'},

  getFeatures: function () {
    Math.floor(Math.random() * features.length);
  },

  description: 'Описание',

  getPhotos: function () {
    Math.floor(Math.random() * photos.length);
  }
};

let location = {
  lat: function(min, max) {
  min = 35.65000;
  max = 35.70000;
  return Math.random() * (max - min) + min;
  },

  lng: function(min, max) {
  min = 139.70000;
  max = 139.80000;
  return Math.random() * (max - min) + min;
  }
};









