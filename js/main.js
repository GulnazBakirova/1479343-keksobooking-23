import {
  showPins,
  getOffers,
  getMarkers
} from './map.js';

import {
  mapFiltersChildren,
  changeFilterState
} from './form.js';

import {
  getData
} from './api.js';

import {
  errorGetData,
  openModal
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
  () => {
    openModal(errorGetData);
    changeFilterState(mapFiltersChildren, true);
  },
);
