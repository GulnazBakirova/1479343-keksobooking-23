/*import {
  SIMILAR_ADVERT_COUNT,
  createAdvert
} from './data.js';

import {
  getData,
  sendOfferFormSubmit
} from './api.js';

import {
  closeModal
} from './map.js';


export const similarAdverts = new Array(SIMILAR_ADVERT_COUNT).fill(null).map(() => createAdvert());
getData();



getData((offers) => {
  similarAdverts(offers.slice(0, 5));
});

sendOfferFormSubmit(closeModal);*/

import {
  sendOfferFormSubmit,
  getData
} from './api.js';

import {
  SIMILAR_ADVERT_COUNT,
  createAdvert
} from './data.js';

import {
  createMarker,
  openModal,
} from './map.js';

const errorGetData = document.querySelector('.error-data');
const showPins = (markers) => markers.forEach(marker => marker.addTo(map));
const similarAdverts = offers => offers.map(item => createAdvert(item));

getData(
  (offers) => {
    const structuredOffers = similarAdverts(offers);
    const markers = createMarker(structuredOffers);
    showPins(markers);
  },
  () => {
    openModal(errorGetData);
  },
);

/*import {
  getData,
  sendOfferFormSubmit
} from './api.js';

import {
  closeModal
} from './map.js';


getData();

sendOfferFormSubmit(closeModal);
*/
