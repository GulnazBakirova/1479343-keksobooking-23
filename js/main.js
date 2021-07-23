import {
  showPins,
  getOffers,
  getMarkers
} from './map.js';

import {
  getData
} from './api.js';

import {
  createErrorMesage
} from './user-modal.js';

import {
  filterPins
} from './filter.js';

getData(
  (offers) => {
    const dataOffers = getOffers(offers);
    const markers = getMarkers(dataOffers);
    showPins(markers);
    filterPins(dataOffers, markers);
  },
  createErrorMesage,
);
