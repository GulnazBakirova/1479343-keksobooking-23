import './data.js';
import './util.js';

import {getRandomIntegerInRange, getRandomFloat, getFirst, getRandomArrayElement} from './util.js';
import {SIMILAR_ADVERT_COUNT, MAX_PRICE, MAX_ROOMS, MAX_GUESTS, LAT_MIN, LAT_MAX, LNG_MIN, LNG_MAX, FEATURES,
  PHOTOS, CHECKIN_TIMES, CHECKOUT_TIMES, TITLES, TYPES} from './data.js';

const tempLat = getRandomFloat(LAT_MIN, LAT_MAX, 5);
const tempLng = getRandomFloat(LNG_MIN, LNG_MAX, 5);

function chooseAvatar() {
  const i = Math.round(Math.random() * (8 - 1) + 1);
  const link = `img/avatars/user0 + ${i} + .png`;
  return link;
}

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
